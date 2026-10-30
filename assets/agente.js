/* Asistente de datos de Energias Futuro: paquete generado por agente_web/construir.mjs (no editar a mano). */
(function () {
"use strict";
const __mod = Object.create(null);
const __req = (id) => __mod[id];
__mod["servidor/src/config.js"] = (function () {
// Configuracion y limites del conector. Sin dependencias: corre igual en Cloudflare Workers y en Node 20+.

// Marca: «Energías Futuro», sin segundo nombre de producto (Manual de Marca, aprobado 2026-10-09). Para explicar qué es se usa el descriptor
// «Observatorio de electromovilidad, transporte y energía en Chile» (vigente desde 2026-10-17). El identificador va sin tilde: es un nombre técnico.
const NOMBRE_SERVIDOR = "energias-futuro";
const TITULO_SERVIDOR = "Energías Futuro";
const DESCRIPTOR_MARCA = "Observatorio de electromovilidad, transporte y energía en Chile";
const VERSION_SERVIDOR = "0.1.0";
const DESCRIPCION_SERVIDOR =
  DESCRIPTOR_MARCA + ". Consulta de solo lectura de los indicadores que Energías Futuro ya publica en su sitio: infraestructura de carga, " +
  "vehículos, energía, precios y cortes de suministro. Cada respuesta trae definición, universo, fuente y fecha de corte.";
const URL_SITIO_DEFECTO = "https://observatorio.energiasfuturo.com";

// Epocas del protocolo MCP que atiende este servidor (ver notas en mcp.js).
const VERSIONES_MODERNAS = ["2026-07-28"];
const VERSIONES_LEGADAS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];

const INSTRUCCIONES =
  "Servidor de solo lectura con los indicadores que Energías Futuro (" + DESCRIPTOR_MARCA + ") ya publica. Comience con listar_indicadores " +
  "o buscar_territorio. Cada respuesta incluye la definición, el universo, la fuente y la fecha de corte de las cifras; una misma " +
  "palabra (por ejemplo «cargadores») puede tener más de una cifra publicada con universos distintos: ver el campo " +
  "tambien_publicado. Las cifras del texto usan el formato chileno (punto para los miles, coma para los decimales: 1.234 es mil doscientos treinta " +
  "y cuatro); los campos numéricos de structuredContent traen el número exacto. No hay descarga masiva: las consultas son puntuales.";

// Limites estructurales (acotan lo que puede salir en cada llamada) y de uso. Se pueden ajustar con variables de entorno.
const LIMITES_BASE = {
  cuerpo_max_bytes: 16384,        // tamano maximo de la peticion
  texto_max: 80,                  // largo maximo de un texto de entrada (entidad, busqueda)
  filas_max: 24,                  // filas por respuesta
  top_max: 20,                    // tamano maximo de un ranking
  ultimos_max: 24,                // periodos maximos en una serie
  respuesta_max_bytes: 60000,     // tamano maximo del JSON de una respuesta
  por_minuto: 120,                // peticiones por minuto por origen (los asistentes en la nube comparten rangos de IP: no ajustar a la baja sin medir)
  global_por_minuto: 1500,        // peticiones por minuto en total (por ubicacion de Cloudflare)
  justo_por_minuto: 10,           // si el total se agota, quien lleva hasta esto en el minuto igual se atiende (el limite global no deja fuera a quien usa poco)
  ttl_datos_ms: 300000,           // cuanto se reutiliza un archivo de datos dentro del mismo proceso
  ttl_viejo_max_ms: 3600000,      // cuanto se tolera servir un archivo viejo si el sitio no responde
  timeout_datos_ms: 8000,         // espera maxima al sitio
  datos_max_bytes: 1500000,       // tamano maximo aceptado de un archivo de datos
  antiguedad_aviso_h: 36,         // si el catalogo lleva mas horas sin regenerarse, cada respuesta lo advierte (el sitio lo renueva cada 2 h)
  antiguedad_error_h: 72,         // si lleva mas, /health informa falla
};

function limites(env) {
  const L = { ...LIMITES_BASE };
  if (env) {
    for (const k of Object.keys(L)) {
      const v = env["LIM_" + k.toUpperCase()];
      if (v !== undefined && v !== null && v !== "" && Number.isFinite(Number(v))) L[k] = Number(v);
    }
  }
  return L;
}

function urlSitio(env) {
  return ((env && env.SITIO_BASE) || URL_SITIO_DEFECTO).replace(/\/+$/, "");
}

// URL publica del sitio para citar paginas (no cambia en desarrollo local).
function urlPublica(env) {
  return ((env && env.SITIO_PUBLICO) || URL_SITIO_DEFECTO).replace(/\/+$/, "");
}

// Origenes de navegador aceptados. Ausente = cliente de servidor a servidor (Claude, ChatGPT): se acepta.
function origenPermitido(origen, env) {
  if (!origen) return true;
  if (origen === "null") return false;
  let u;
  try { u = new URL(origen); } catch { return false; }
  const extra = ((env && env.ORIGENES_PERMITIDOS) || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (extra.length) return extra.includes(u.origin);
  // Servidor publico sin credenciales ni cookies: no hay recurso privado que proteger de un rebinding, pero se rechaza lo malformado.
  if (u.protocol === "https:") return true;
  if (u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1" || u.hostname === "[::1]")) return true;
  return false;
}
return { NOMBRE_SERVIDOR, TITULO_SERVIDOR, DESCRIPTOR_MARCA, VERSION_SERVIDOR, DESCRIPCION_SERVIDOR, URL_SITIO_DEFECTO, VERSIONES_MODERNAS, VERSIONES_LEGADAS, INSTRUCCIONES, LIMITES_BASE, limites, urlSitio, urlPublica, origenPermitido };
})();
__mod["agente_web/src/datos_navegador.js"] = (function () {
// Acceso a los datos publicados desde el NAVEGADOR: lee data/ia_*.json del mismo sitio con fetch. Misma interfaz que servidor/src/datos.js
// (el empaquetador reemplaza ese modulo por este). Para demostraciones y pruebas, env.CARGADOR(ruta) puede entregar los datos incrustados.
const { limites, urlSitio } = __req("servidor/src/config.js");

class ErrorDatos extends Error {}

const memoria = new Map(); // ruta -> { t, v }
const RUTA_VALIDA = /^ia_(catalogo|territorios)\.json$|^ia_ind_[a-z0-9_]+__[a-z_]+\.json$/;

async function traer(env, ruta) {
  if (env && typeof env.CARGADOR === "function") return await env.CARGADOR(ruta);
  const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const corte = ctrl ? setTimeout(() => ctrl.abort(), limites(env).timeout_datos_ms) : null;
  try {
    const resp = await fetch(`${urlSitio(env)}/data/${ruta}`, { headers: { accept: "application/json" }, signal: ctrl ? ctrl.signal : undefined });
    if (!resp.ok) throw new ErrorDatos(`el sitio respondió HTTP ${resp.status}`);
    return await resp.json();
  } finally {
    if (corte) clearTimeout(corte);
  }
}

// Lee un archivo de datos; lo guarda en memoria 30 minutos (una pagina abierta mucho rato no se queda con cifras viejas).
async function obtenerJSON(env, ruta) {
  if (!RUTA_VALIDA.test(ruta)) throw new ErrorDatos("ruta de datos no permitida");
  const ahora = Date.now();
  const previo = memoria.get(ruta);
  if (previo && ahora - previo.t < 1800000) return { v: previo.v, desactualizado: false };
  try {
    const v = await traer(env, ruta);
    if (!v || v.esquema !== "ia-v1") throw new ErrorDatos("esquema de datos inesperado");
    memoria.set(ruta, { t: ahora, v });
    return { v, desactualizado: false };
  } catch (e) {
    if (previo) return { v: previo.v, desactualizado: true };
    throw new ErrorDatos(`No se pudo leer ${ruta}: ${e && e.message ? e.message : e}`);
  }
}

async function obtenerCatalogo(env) {
  const r = await obtenerJSON(env, "ia_catalogo.json");
  return { cat: r.v, desactualizado: r.desactualizado };
}

function edadCatalogoHoras(cat, ahora = Date.now()) {
  const t = Date.parse(cat && cat.generado_ia);
  return Number.isFinite(t) ? Math.max(0, (ahora - t) / 3600000) : null;
}

async function obtenerTerritorios(env) {
  const r = await obtenerJSON(env, "ia_territorios.json");
  return r.v;
}

async function obtenerParte(env, ind, nivel) {
  const p = ind.partes && ind.partes[nivel];
  if (!p) throw new ErrorDatos(`el indicador ${ind.id} no tiene nivel ${nivel}`);
  const r = await obtenerJSON(env, p.archivo);
  if (r.v.id !== ind.id || r.v.nivel !== nivel) throw new ErrorDatos(`el archivo ${p.archivo} no corresponde a ${ind.id}/${nivel}`);
  return { parte: r.v, desactualizado: r.desactualizado };
}

function vaciarMemoria() {
  memoria.clear();
}
return { ErrorDatos, obtenerJSON, obtenerCatalogo, edadCatalogoHoras, obtenerTerritorios, obtenerParte, vaciarMemoria };
})();
__mod["servidor/src/util.js"] = (function () {
// Utilidades comunes (APIs web estandar: sin Node ni Workers especificos).
// Nota de higiene: no se escriben caracteres invisibles ni secuencias \u en el codigo; se usan propiedades Unicode (\p{...}).

// Minusculas, sin tildes, solo letras y numeros separados por un espacio. "Biobío" -> "biobio".
function norm(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Texto de entrada o de salida: sin caracteres de control ni de formato (incluye los de direccion de texto y los de ancho cero),
// espacios colapsados y largo acotado.
function sanitizar(s, max = 200) {
  let t = String(s ?? "").replace(/[\p{Cc}\p{Cf}]/gu, " ").replace(/\s+/g, " ").trim();
  if (t.length > max) t = t.slice(0, max - 1) + "…";
  return t;
}

// Limpia recursivamente todos los textos de un objeto (control, formato, espacios). Se aplica a lo que se va a ENTREGAR (pocas filas), no a los archivos de datos completos.
function sanitizarProfundo(o, max = 2000, prof = 0) {
  if (typeof o === "string") return sanitizar(o, max);
  if (prof > 8 || o === null || typeof o !== "object") return o;
  if (Array.isArray(o)) return o.map((x) => sanitizarProfundo(x, max, prof + 1));
  const r = {};
  for (const [k, v] of Object.entries(o)) r[sanitizar(k, 80)] = sanitizarProfundo(v, max, prof + 1);
  return r;
}

function escHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

// Una pagina citada solo puede ser un archivo .html simple del sitio (nada de rutas, esquemas ni parametros).
function paginaValida(p) {
  return typeof p === "string" && /^[a-z0-9_-]{1,60}\.html$/.test(p) ? p : "index.html";
}

// Clave de limite por origen: una IPv4 completa; una IPv6 se agrupa por su prefijo /64 (quien controla un /64 tiene 2^64 direcciones).
function claveOrigen(ip) {
  const s = String(ip || "").toLowerCase().split("%")[0].trim();
  if (!s.includes(":")) return s || "sin-ip";
  const m4 = /(\d{1,3}(?:\.\d{1,3}){3})$/.exec(s);
  if (m4) return m4[1];                                   // IPv4 mapeada en IPv6
  const mitades = s.split("::");
  if (mitades.length > 2) return s;
  const izq = mitades[0] ? mitades[0].split(":") : [];
  const der = mitades.length === 2 && mitades[1] ? mitades[1].split(":") : [];
  const relleno = mitades.length === 2 ? new Array(Math.max(0, 8 - izq.length - der.length)).fill("0") : [];
  const todo = [...izq, ...relleno, ...der];
  if (todo.length !== 8 || todo.some((h) => !/^[0-9a-f]{1,4}$/.test(h))) return s;
  return "v6:" + todo.slice(0, 4).map((h) => h.padStart(4, "0")).join(":");
}

// Lee el cuerpo de una Request o Response con tope de bytes; devuelve null si lo supera (y corta la lectura).
async function leerTextoAcotado(fuente, max) {
  const lector = fuente.body && fuente.body.getReader ? fuente.body.getReader() : null;
  if (!lector) {
    const t = await fuente.text();
    return t.length > max ? null : t;
  }
  const trozos = [];
  let total = 0;
  for (;;) {
    const { done, value } = await lector.read();
    if (done) break;
    total += value.length;
    if (total > max) {
      try { await lector.cancel(); } catch { /* ya cerrado */ }
      return null;
    }
    trozos.push(value);
  }
  const todo = new Uint8Array(total);
  let pos = 0;
  for (const t of trozos) { todo.set(t, pos); pos += t.length; }
  return new TextDecoder().decode(todo);
}

const NF0 = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });
const NF1 = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 1 });
const NF2 = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 2 });

function fmtNumero(v) {
  if (typeof v !== "number" || !Number.isFinite(v)) return String(v);
  if (Number.isInteger(v)) return NF0.format(v);
  return Math.abs(v) >= 100 ? NF1.format(v) : NF2.format(v);
}

function familiaCliente(ua) {
  const u = String(ua || "").toLowerCase();
  if (!u) return "desconocido";
  if (u.includes("claude") || u.includes("anthropic")) return "claude";
  if (u.includes("chatgpt") || u.includes("openai")) return "openai";
  if (u.includes("mcp-inspector") || u.includes("inspector")) return "inspector";
  if (u.includes("node") || u.includes("undici")) return "node";
  if (u.includes("python")) return "python";
  if (u.includes("curl")) return "curl";
  if (u.includes("mozilla")) return "navegador";
  return "otro";
}

// Hash corto para contar origenes distintos sin guardar la direccion: lleva sal (variable SAL_METRICAS, secreta) y rota cada dia; 6 bytes.
async function hashCorto(texto, sal = "") {
  const datos = new TextEncoder().encode(String(sal) + "|" + String(texto));
  const h = await crypto.subtle.digest("SHA-256", datos);
  return [...new Uint8Array(h)].slice(0, 6).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Tamano en bytes UTF-8 de un texto (los acentos pesan 2): solo se codifica si el largo en caracteres ya se acerca al tope.
function bytesUtf8(texto, max) {
  if (texto.length > max) return texto.length;
  if (texto.length * 3 <= max) return texto.length * 3;
  return new TextEncoder().encode(texto).length;
}

const CABECERAS_BASE = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type, accept, authorization, mcp-protocol-version, mcp-method, mcp-name, mcp-session-id, last-event-id",
  "access-control-allow-methods": "POST, GET, OPTIONS",
  "access-control-expose-headers": "mcp-protocol-version, retry-after",
  "access-control-max-age": "86400",
  "x-content-type-options": "nosniff",
  "referrer-policy": "no-referrer",
};

function jsonTexto(texto, status = 200, extra = {}) {
  return new Response(texto, {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...CABECERAS_BASE, ...extra },
  });
}

function jsonResp(obj, status = 200, extra = {}) {
  return jsonTexto(JSON.stringify(obj), status, extra);
}

function textoResp(txt, status = 200, tipo = "text/plain; charset=utf-8", extra = {}) {
  return new Response(txt, { status, headers: { "content-type": tipo, "cache-control": "public, max-age=60", ...CABECERAS_BASE, ...extra } });
}

function vacioResp(status, extra = {}) {
  return new Response(null, { status, headers: { "cache-control": "no-store", ...CABECERAS_BASE, ...extra } });
}
return { norm, sanitizar, sanitizarProfundo, escHtml, paginaValida, claveOrigen, leerTextoAcotado, fmtNumero, familiaCliente, hashCorto, bytesUtf8, CABECERAS_BASE, jsonTexto, jsonResp, textoResp, vacioResp };
})();
__mod["servidor/src/territorio.js"] = (function () {
// Resolucion de nombres de regiones y comunas (sin tildes ni mayusculas) contra la tabla publicada en ia_territorios.json.
const { norm } = __req("servidor/src/util.js");

const PREFIJOS = ["region de los", "region de las", "region del", "region de la", "region de", "region",
                  "comuna de", "comuna", "ciudad de", "provincia de"];

// «la región de Los Lagos» → «los lagos»; «región metropolitana de santiago» → «metropolitana de santiago».
function quitarPrefijo(q) {
  const sinArticulo = q.replace(/^(la|el) (?=region |comuna |ciudad |provincia )/, "");
  for (const p of PREFIJOS) {
    if (sinArticulo.startsWith(p + " ")) return sinArticulo.slice(p.length + 1).trim();
  }
  return sinArticulo;
}

let _indice = null;
let _terrRef = null;

function indice(terr) {
  if (_indice && _terrRef === terr) return _indice;
  const entidades = [...terr.regiones, ...terr.comunas].map((e) => ({
    tipo: e.tipo, codigo: e.codigo, nombre: e.nombre, region: e.region || null, region_codigo: e.region_codigo || null,
    claves: [...new Set(e.claves.map((c) => norm(c)))],
  }));
  _indice = { entidades, porCodigo: new Map(entidades.map((e) => [`${e.tipo}:${e.codigo}`, e])) };
  _terrRef = terr;
  return _indice;
}

function etiqueta(e) {
  return { tipo: e.tipo, codigo: e.codigo, nombre: e.nombre, ...(e.tipo === "comuna" ? { region: e.region, region_codigo: e.region_codigo } : {}) };
}

// Busca por codigo (2 digitos = region, 5 = comuna) o por nombre. Devuelve candidatos ordenados por calidad del calce.
function buscarTerritorios(terr, texto, max = 8) {
  const ix = indice(terr);
  let q = norm(texto);
  if (!q) return [];
  const resultados = new Map();
  const poner = (e, score) => {
    const k = `${e.tipo}:${e.codigo}`;
    if (!resultados.has(k) || resultados.get(k).score < score) resultados.set(k, { e, score });
  };
  const soloDigitos = String(texto).trim().replace(/\s+/g, "");
  if (/^\d{2}$/.test(soloDigitos)) { const e = ix.porCodigo.get(`region:${soloDigitos}`); if (e) poner(e, 100); }
  if (/^\d{5}$/.test(soloDigitos)) { const e = ix.porCodigo.get(`comuna:${soloDigitos}`); if (e) poner(e, 100); }
  if (/^\d{4}$/.test(soloDigitos)) { const e = ix.porCodigo.get(`comuna:0${soloDigitos}`); if (e) poner(e, 95); }
  const qs = [q];
  const sinPref = quitarPrefijo(q);
  if (sinPref !== q && sinPref) qs.push(sinPref);
  for (const e of ix.entidades) {
    for (const k of e.claves) {
      for (const cand of qs) {
        if (k === cand) poner(e, 90 + (e.tipo === "region" ? 1 : 0));
        else if (k.startsWith(cand + " ") || k.endsWith(" " + cand)) poner(e, 70);
        else if (cand.length >= 4 && k.includes(cand)) poner(e, 50);
      }
    }
  }
  return [...resultados.values()]
    .sort((a, b) => b.score - a.score || (a.e.tipo === b.e.tipo ? a.e.nombre.localeCompare(b.e.nombre, "es") : a.e.tipo === "region" ? -1 : 1))
    .slice(0, max)
    .map((r) => ({ ...etiqueta(r.e), calce: r.score >= 90 ? "exacto" : r.score >= 70 ? "parcial" : "aproximado" }));
}

// Territorios mencionados dentro de una frase libre ("cargadores en Biobío y Ñuble"): nombres completos, el mas largo primero.
// Si un nombre corresponde a varios territorios (Maule es region y comuna), se devuelven todos: la ambiguedad se ve desde la busqueda.
function detectarEnTexto(terr, texto) {
  const ix = indice(terr);
  const q = ` ${norm(texto)} `;
  const porClave = new Map(); // clave -> entidades con ese nombre
  for (const e of ix.entidades) {
    for (const k of e.claves) {
      if (k.length < 4) continue;
      if (!porClave.has(k)) porClave.set(k, []);
      porClave.get(k).push(e);
    }
  }
  const claves = [...porClave.keys()].sort((a, b) => b.length - a.length || (a < b ? -1 : 1));
  const hallados = [];
  const vistos = new Set();
  let resto = q;
  for (const k of claves) {
    const pat = ` ${k} `;
    if (!resto.includes(pat)) continue;
    for (const e of porClave.get(k)) {
      const id = `${e.tipo}:${e.codigo}`;
      if (vistos.has(id)) continue;
      vistos.add(id);
      hallados.push(etiqueta(e));
    }
    resto = resto.split(pat).join(" ");
  }
  return hallados;
}

function porCodigo(terr, tipo, codigo) {
  const e = indice(terr).porCodigo.get(`${tipo}:${codigo}`);
  return e ? etiqueta(e) : null;
}
return { buscarTerritorios, detectarEnTexto, porCodigo };
})();
__mod["servidor/src/consulta.js"] = (function () {
// Nucleo del conector: consulta de un indicador. Solo selecciona y ordena filas YA publicadas; no calcula cifras.
const { limites, urlPublica } = __req("servidor/src/config.js");
const { edadCatalogoHoras, obtenerCatalogo, obtenerParte, obtenerTerritorios } = __req("agente_web/src/datos_navegador.js");
const { buscarTerritorios, detectarEnTexto } = __req("servidor/src/territorio.js");
const { fmtNumero, norm, paginaValida, sanitizar, sanitizarProfundo } = __req("servidor/src/util.js");

class ErrorConsulta extends Error {
  constructor(mensaje, extra = {}) {
    super(mensaje);
    this.extra = extra;
  }
}

const NIVELES = ["nacional", "region", "comuna", "operador", "categoria", "tecnologia", "clase", "marca", "modelo"];
const CLAVES = ["indicador", "entidad", "nivel", "periodo", "ultimos", "top", "orden", "medida"];
const NOMBRES_NACIONAL = new Set(["chile", "pais", "nacional", "total pais", "todo el pais", "a nivel nacional", "total nacional", "total"]);
const PARADA = new Set(("de la el en los las y por cuantos cuantas cuanto cuanta hay que es son del al a un una para con cual cuales como donde " +
  "tiene tienen total numero cantidad dato datos sobre segun mas menos ultimo ultima ultimos actual actuales hoy region regiones comuna comunas pais chile " +
  "cuantos cuanto me dame dime quiero saber sus su lo le se mi").split(" "));

// ---- validacion de argumentos ------------------------------------------------------------------------------------
function validarArgs(args, L) {
  const a = {};
  if (args === null || typeof args !== "object" || Array.isArray(args)) throw new ErrorConsulta("Los argumentos deben ser un objeto con los parámetros de la consulta.");
  for (const k of Object.keys(args)) {
    if (!CLAVES.includes(k)) throw new ErrorConsulta(`Parámetro desconocido: «${sanitizar(k, 30)}». Parámetros válidos: ${CLAVES.join(", ")}.`);
  }
  if (typeof args.indicador !== "string" || !/^[a-z][a-z0-9_]{2,59}$/.test(args.indicador)) {
    throw new ErrorConsulta("Falta el parámetro «indicador» (identificador en minúsculas, por ejemplo red_carga_viva). Use listar_indicadores para ver los disponibles.");
  }
  a.indicador = args.indicador;
  if (args.entidad !== undefined && args.entidad !== null && args.entidad !== "") {
    if (typeof args.entidad !== "string" || args.entidad.length > L.texto_max) throw new ErrorConsulta(`«entidad» debe ser un texto de hasta ${L.texto_max} caracteres.`);
    a.entidad = sanitizar(args.entidad, L.texto_max);
    // Si al limpiar caracteres invisibles no queda texto, NO se interpreta como «sin entidad» (entregaria el total nacional sin que se haya pedido).
    if (!norm(a.entidad)) throw new ErrorConsulta("«entidad» no contiene texto utilizable (use un nombre o código, por ejemplo Biobío, 08, Providencia).");
  }
  if (args.nivel !== undefined && args.nivel !== null && args.nivel !== "") {
    if (!NIVELES.includes(args.nivel)) throw new ErrorConsulta(`«nivel» debe ser uno de: ${NIVELES.join(", ")}.`);
    a.nivel = args.nivel;
  }
  if (args.periodo !== undefined && args.periodo !== null && args.periodo !== "") {
    if (typeof args.periodo !== "string" || !/^[0-9A-Za-z:\-/ ]{1,24}$/.test(args.periodo)) throw new ErrorConsulta("«periodo» debe ser un texto corto como 2026, 2026-08 o 2026-10-18.");
    a.periodo = args.periodo.trim();
    if (!a.periodo) throw new ErrorConsulta("«periodo» no puede ir vacío: use 2026, 2026-08 o 2026-10-18, o no lo indique para el último disponible.");
  }
  for (const [k, max] of [["ultimos", L.ultimos_max], ["top", L.top_max]]) {
    if (args[k] !== undefined && args[k] !== null) {
      if (!Number.isInteger(args[k]) || args[k] < 1 || args[k] > max) throw new ErrorConsulta(`«${k}» debe ser un entero entre 1 y ${max}.`);
      a[k] = args[k];
    }
  }
  if (args.orden !== undefined && args.orden !== null && args.orden !== "") {
    if (!["mayor", "menor"].includes(args.orden)) throw new ErrorConsulta("«orden» debe ser «mayor» o «menor».");
    a.orden = args.orden;
  }
  if (args.medida !== undefined && args.medida !== null && args.medida !== "") {
    if (typeof args.medida !== "string" || !/^[a-z][a-z0-9_]{1,59}$/.test(args.medida)) throw new ErrorConsulta("«medida» debe ser el identificador de una medida del indicador (por ejemplo cargadores).");
    a.medida = args.medida;
  }
  if (a.ultimos && a.periodo) throw new ErrorConsulta("Use «periodo» o «ultimos», no ambos.");
  if (a.top && (a.ultimos || a.entidad)) throw new ErrorConsulta("«top» (ranking) no se combina con «entidad» ni con «ultimos».");
  if (a.orden && !a.top) throw new ErrorConsulta("«orden» solo se usa junto con «top».");
  return a;
}

// ---- busqueda de indicadores (sugerencias y search) --------------------------------------------------------------
function tokens(txt) {
  return norm(txt).split(" ").filter((t) => t.length > 1 && !PARADA.has(t));
}

// `raiz` (opcional) lleva cada palabra a su raiz, tanto en la pregunta como en el catalogo, para que «concentrada» calce con «concentracion».
// Sin ella (las herramientas del conector) se compara palabra por palabra, como siempre.
// `idf` (opcional) pesa menos las palabras que estan en casi todos los indicadores («electrico», «vehiculo») y mas las que distinguen a uno.
function puntuarIndicadores(cat, texto, raiz = null, idf = false) {
  const mapa = raiz ? (ts) => ts.map(raiz) : (ts) => ts;
  const q = mapa(tokens(texto));
  if (!q.length) return [];
  const qn = norm(texto);
  const res = [];
  const bolsas = cat.indicadores.map((i) => ({
    i,
    nombre: new Set(mapa(tokens(i.nombre))), id: new Set(mapa(i.id.split("_").filter((t) => t.length > 1))),
    sin: new Set(mapa(i.sinonimos.flatMap((s) => tokens(s)))), def: new Set(mapa(tokens(i.definicion))), tema: new Set(mapa([norm(i.tema)])),
  }));
  let peso = () => 1;
  if (idf) {
    const df = new Map();
    for (const b of bolsas) for (const t of new Set([...b.nombre, ...b.id, ...b.sin, ...b.def, ...b.tema])) df.set(t, (df.get(t) || 0) + 1);
    const N = bolsas.length;
    peso = (t) => (df.get(t) ? 0.25 + 1.5 * Math.log((N + 1) / df.get(t)) / Math.log(N + 1) : 1);
  }
  for (const bolsa of bolsas) {
    const i = bolsa.i;
    let s = 0;
    for (const t of q) {
      const w = peso(t);
      if (bolsa.nombre.has(t)) s += 3 * w;
      if (bolsa.id.has(t)) s += 3 * w;
      if (bolsa.sin.has(t)) s += 3 * w;
      if (bolsa.def.has(t)) s += 2 * w;
      if (bolsa.tema.has(t)) s += 1 * w;
    }
    for (const sinon of i.sinonimos) { const sn = norm(sinon); if (sn.length > 3 && qn.includes(sn)) s += 5; }
    if (s > 0) res.push({ i, s });
  }
  res.sort((a, b) => b.s - a.s || a.i.id.localeCompare(b.i.id));
  // Solo lo relevante: se descarta lo que puntua menos de 40% del mejor (evita que «energia solar» traiga cortes de luz por compartir una palabra suelta).
  const umbral = res.length ? Math.max(2, res[0].s * 0.4) : 0;
  return res.filter((r) => r.s >= umbral);
}

function sugerirIndicadores(cat, texto, max = 5) {
  const porPuntaje = puntuarIndicadores(cat, String(texto).replace(/_/g, " ")).slice(0, max).map((r) => r.i);
  const lista = porPuntaje.length ? porPuntaje : cat.indicadores.slice(0, max);
  return lista.map((i) => ({ id: i.id, nombre: i.nombre }));
}

// ---- seleccion de filas -------------------------------------------------------------------------------------------
function agrupar(filas, clave) {
  const m = new Map();
  for (const f of filas) {
    const k = f[clave];
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(f);
  }
  return m;
}

function periodosOrdenados(filas) {
  return [...new Set(filas.map((f) => f.periodo))].sort();
}

// «2023-01 a 2026-08 (44 períodos)»; si son pocos, se listan todos.
function resumenPeriodos(ps) {
  if (!ps.length) return "ninguno";
  if (ps.length <= 6) return ps.join(", ");
  return `${ps[0]} a ${ps[ps.length - 1]} (${ps.length} períodos)`;
}

function granularidadDominante(filas) {
  const por = new Map();
  for (const f of filas) {
    const g = f.granularidad || "";
    if (!por.has(g)) por.set(g, new Set());
    por.get(g).add(f.periodo);
  }
  let mejor = "", n = -1;
  for (const [g, ps] of por) if (ps.size > n || (ps.size === n && g > mejor)) { mejor = g; n = ps.size; }
  return mejor;
}

function seleccionar(ind, nivel, filas, codigos, a) {
  const base = codigos ? filas.filter((f) => codigos.has(f.codigo)) : filas;
  if (!base.length) return { filas: [], disponibles: [], criterio: "" };
  const defecto = ind.periodo_defecto[nivel];
  if (a.periodo) {
    let sel = base.filter((f) => f.periodo === a.periodo);
    // un año o un mes selecciona los periodos que cuelgan de el («2026» → «2026-08»; «2026-10-18» → «2026-10-18 22:45»)
    if (!sel.length) sel = base.filter((f) => ["-", "/", " ", "T"].some((s) => f.periodo.startsWith(a.periodo + s)));
    return { filas: sel, disponibles: periodosOrdenados(base), criterio: `período ${a.periodo}` };
  }
  const porEntidad = agrupar(base, "codigo");
  if (a.ultimos) {
    const gran = granularidadDominante(base);
    const sel = [];
    for (const rs of porEntidad.values()) {
      const ordenadas = rs.filter((f) => (f.granularidad || "") === gran).sort((x, y) => (x.periodo < y.periodo ? -1 : 1));
      sel.push(...ordenadas.slice(-a.ultimos));
    }
    return { filas: sel, disponibles: periodosOrdenados(base), criterio: `últimos ${a.ultimos} períodos` };
  }
  const fDef = base.find((f) => f.periodo === defecto);
  const granDef = fDef ? fDef.granularidad || "" : granularidadDominante(base);
  const sel = [];
  for (const rs of porEntidad.values()) {
    const exacta = rs.filter((f) => f.periodo === defecto);
    if (exacta.length) { sel.push(...exacta); continue; }
    const misma = rs.filter((f) => (f.granularidad || "") === granDef).sort((x, y) => (x.periodo < y.periodo ? -1 : 1));
    if (misma.length) sel.push(misma[misma.length - 1]);
  }
  return { filas: sel, disponibles: periodosOrdenados(base), criterio: "último período disponible" };
}

function coincideNombre(texto, f) {
  const q = norm(texto);
  if (!q) return false;
  const n = norm(f.nombre);
  return n === q || norm(f.codigo) === q || (q.length >= 3 && (n.startsWith(q) || n.includes(q))) || (f.etiquetas && Object.values(f.etiquetas).some((v) => norm(v) === q));
}

// ---- resolucion de entidades --------------------------------------------------------------------------------------
async function resolverObjetivos(env, ind, a) {
  const objetivos = []; // { nivel, codigos:Set|null }
  const avisos = [];
  let resueltas = [];
  if (a.entidad) {
    const qn = norm(a.entidad);
    if (NOMBRES_NACIONAL.has(qn)) {
      if (!ind.niveles.includes("nacional")) throw new ErrorConsulta(`El indicador ${ind.id} no tiene nivel nacional. Niveles disponibles: ${ind.niveles.join(", ")}.`);
      objetivos.push({ nivel: "nacional", codigos: new Set(["CL"]) });
      resueltas.push({ tipo: "pais", codigo: "CL", nombre: "Chile" });
    } else {
      const terr = await obtenerTerritorios(env);
      let cand = buscarTerritorios(terr, a.entidad, 8);
      const exactos = cand.filter((c) => c.calce === "exacto");
      if (exactos.length) cand = exactos;
      const usables = cand.filter((c) => ind.niveles.includes(c.tipo) && (!a.nivel || a.nivel === c.tipo));
      if (usables.length) {
        if (!exactos.length && usables.length > 1) {
          throw new ErrorConsulta(`El nombre «${a.entidad}» es ambiguo. Indique uno de los candidatos (use el código o el nombre completo).`,
            { candidatos: usables.slice(0, 6) });
        }
        const porTipo = agrupar(usables, "tipo");
        for (const [tipo, lista] of porTipo) {
          objetivos.push({ nivel: tipo, codigos: new Set(lista.map((c) => c.codigo)) });
          resueltas.push(...lista);
        }
        if (porTipo.size > 1) avisos.push(`«${a.entidad}» es a la vez región y comuna: se muestran ambas. Use el parámetro «nivel» para elegir una.`);
      } else {
        // entidades que no son territorios: operador, categoria, tecnologia, clase, marca, modelo
        for (const nv of ind.niveles.filter((n) => !["nacional", "region", "comuna"].includes(n))) {
          if (a.nivel && a.nivel !== nv) continue;
          const { parte } = await obtenerParte(env, ind, nv);
          let hit = parte.filas.filter((f) => coincideNombre(a.entidad, f));
          // un nombre exacto manda sobre los que solo lo contienen («Térmica» no trae también «Geotérmica»)
          const exactos = hit.filter((f) => norm(f.nombre) === qn || norm(f.codigo) === qn);
          if (exactos.length) hit = exactos;
          if (hit.length) {
            const cods = new Set(hit.map((f) => f.codigo));
            objetivos.push({ nivel: nv, codigos: cods });
            resueltas.push(...[...new Map(hit.map((f) => [f.codigo, { tipo: nv, codigo: f.codigo, nombre: f.nombre }])).values()]);
          }
        }
      }
      if (!objetivos.length) {
        const sug = cand.slice(0, 5);
        throw new ErrorConsulta(
          sug.length && !cand.some((c) => ind.niveles.includes(c.tipo))
            ? `El indicador ${ind.id} no tiene datos para el nivel de «${a.entidad}» (${[...new Set(cand.map((c) => c.tipo))].join("/")}). Niveles disponibles: ${ind.niveles.join(", ")}.`
            : `No encontré «${a.entidad}» en el indicador ${ind.id}. Niveles disponibles: ${ind.niveles.join(", ")}.`,
          { candidatos: sug, niveles: ind.niveles });
      }
    }
  } else if (a.top) {
    const nivel = a.nivel || (ind.niveles.includes("region") ? "region" : ind.niveles.find((n) => n !== "nacional") || ind.niveles[0]);
    if (!ind.niveles.includes(nivel)) throw new ErrorConsulta(`El indicador ${ind.id} no tiene nivel ${nivel}. Niveles disponibles: ${ind.niveles.join(", ")}.`);
    objetivos.push({ nivel, codigos: null });
  } else {
    const nivel = a.nivel || (ind.niveles.includes("nacional") ? "nacional" : ind.niveles.length === 1 ? ind.niveles[0] : null);
    if (!nivel) throw new ErrorConsulta(`Indique «entidad» o «nivel». Niveles disponibles en ${ind.id}: ${ind.niveles.join(", ")}.`, { niveles: ind.niveles });
    if (!ind.niveles.includes(nivel)) throw new ErrorConsulta(`El indicador ${ind.id} no tiene nivel ${nivel}. Niveles disponibles: ${ind.niveles.join(", ")}.`);
    if (nivel === "comuna") throw new ErrorConsulta("En el nivel comuna indique una comuna (parámetro «entidad») o un ranking (parámetro «top»): no se entrega el listado completo.");
    objetivos.push({ nivel, codigos: null });
  }
  return { objetivos, resueltas, avisos };
}

// ---- consulta principal -------------------------------------------------------------------------------------------
function recortarMedidas(filas, a, ind) {
  if (!a.medida) return filas;
  if (!ind.medidas.some((m) => m.id === a.medida)) {
    throw new ErrorConsulta(`La medida «${a.medida}» no existe en ${ind.id}. Medidas: ${ind.medidas.map((m) => m.id).join(", ")}.`);
  }
  return filas.map((f) => ({ ...f, valores: f.valores[a.medida] !== undefined ? { [a.medida]: f.valores[a.medida] } : {} })).filter((f) => Object.keys(f.valores).length);
}

function formaFila(f) {
  const o = { nivel: f.nivel, codigo: f.codigo, nombre: f.nombre, periodo: f.periodo, valores: f.valores };
  if (f.granularidad) o.granularidad = f.granularidad;
  if (f.etiquetas) o.etiquetas = f.etiquetas;
  if (f.nota) o.nota = f.nota;
  return o;
}

async function equivalentes(env, cat, ind, resultado, objetivos) {
  const out = [];
  if (resultado.length === 0 || resultado.length > 2) return out;
  for (const spec of (ind.equivalentes || []).slice(0, 2)) {
    const [eqId, medidaEq] = spec.split(":");
    const eq = cat.indicadores.find((i) => i.id === eqId);
    if (!eq) continue;
    const nivel = resultado[0].nivel;
    if (!eq.niveles.includes(nivel)) continue;
    try {
      const { parte } = await obtenerParte(env, eq, nivel);
      const codigos = new Set(resultado.map((f) => f.codigo));
      const def = eq.periodo_defecto[nivel];
      const filas = parte.filas.filter((f) => codigos.has(f.codigo) && f.periodo === def);
      for (const f of filas) {
        const idMedida = medidaEq || eq.medida_principal;
        const m = eq.medidas.find((x) => x.id === idMedida);
        const valor = f.valores[idMedida];
        if (valor === undefined) continue;
        out.push({ indicador: eq.id, nombre: eq.nombre, entidad: f.nombre, periodo: f.periodo, medida: m.nombre, unidad: m.unidad, valor,
                   universo_breve: eq.universo_breve, pagina: `${urlPublica(env)}/${paginaValida(eq.pagina)}` });
      }
    } catch {
      // un equivalente que no se pueda leer no impide responder lo pedido
    }
  }
  return out;
}

async function consultar(env, args) {
  const L = limites(env);
  const a = validarArgs(args, L);
  const { cat, desactualizado } = await obtenerCatalogo(env);
  const ind = cat.indicadores.find((i) => i.id === a.indicador);
  if (!ind) throw new ErrorConsulta(`No existe el indicador «${a.indicador}».`, { sugerencias: sugerirIndicadores(cat, a.indicador) });
  const { objetivos, resueltas, avisos } = await resolverObjetivos(env, ind, a);
  if (desactualizado) avisos.push("El sitio no respondió y se usan datos guardados hace menos de una hora.");
  const edad = edadCatalogoHoras(cat);
  if (edad !== null && edad > L.antiguedad_aviso_h) avisos.push(`Los datos publicados no se actualizan desde hace ${Math.round(edad)} horas: pueden estar desactualizados.`);
  // Las «fotos» (red en vivo, cortes en vivo, conectores disponibles) pierden sentido con las horas: se advierte si su archivo es mas viejo que su vigencia.
  const tGenerado = Date.parse(ind.generado_iso);
  if (ind.vigencia_horas && Number.isFinite(tGenerado)) {
    const horas = (Date.now() - tGenerado) / 3600000;
    if (horas > ind.vigencia_horas) avisos.push(`Esta cifra es una foto generada hace ${Math.round(horas)} horas: puede no reflejar el estado actual.`);
  }

  let filas = [];
  let criterio = "";
  let disponibles = [];
  for (const ob of objetivos) {
    const { parte, desactualizado: viejo } = await obtenerParte(env, ind, ob.nivel);
    if (viejo && !desactualizado) avisos.push("El sitio no respondió y se usan datos guardados hace menos de una hora.");
    if (a.top) {
      let medida = a.medida || ind.medida_principal;
      if (!ind.medidas.some((m) => m.id === medida)) throw new ErrorConsulta(`La medida «${medida}» no existe en ${ind.id}. Medidas: ${ind.medidas.map((m) => m.id).join(", ")}.`);
      const def = a.periodo || ind.periodo_defecto[ob.nivel];
      const delPeriodo = parte.filas.filter((f) => f.periodo === def);
      const conDatos = ind.medidas.filter((m) => delPeriodo.some((f) => f.valores[m.id] !== undefined));
      // Si no se pidio una medida y la principal del indicador no se publica en este nivel (por ejemplo, por tecnologia solo hay unidades), se usa la primera
      // que si tiene datos y se dice: el ranking no falla por una eleccion que el usuario no hizo.
      if (!a.medida && !conDatos.some((m) => m.id === medida) && conDatos.length) {
        avisos.push(`En el nivel ${ob.nivel} no se publica «${medida}»; el ranking usa «${conDatos[0].id}» (${conDatos[0].nombre}).`);
        medida = conDatos[0].id;
      }
      let cand = delPeriodo.filter((f) => f.valores[medida] !== undefined);
      if (!cand.length) {
        const ps = periodosOrdenados(parte.filas);
        throw new ErrorConsulta(
          `No hay datos de «${medida}» para el período ${def} en el nivel ${ob.nivel}.` +
            (conDatos.length ? ` Medidas con datos en este nivel: ${conDatos.map((m) => m.id).join(", ")}.` : "") +
            ` Períodos disponibles: ${resumenPeriodos(ps)}.`,
          { periodos: ps, notas: ind.advertencias.slice(0, 2) });
      }
      if (a.top) cand = cand.filter((f) => f.codigo !== "todas");
      cand.sort((x, y) => (a.orden === "menor" ? x.valores[medida] - y.valores[medida] : y.valores[medida] - x.valores[medida]) || x.nombre.localeCompare(y.nombre, "es"));
      const elegidas = cand.slice(0, a.top);
      filas.push(...elegidas);
      criterio = `ranking de los ${Math.min(a.top, cand.length)} ${a.orden === "menor" ? "menores" : "mayores"} por «${medida}», período ${def}`;
      disponibles = periodosOrdenados(parte.filas);
      // Empates en el limite del ranking: las entidades que comparten el valor del ultimo puesto no caben todas; se muestran por orden alfabetico, no por un orden de la fuente.
      const valorCorte = elegidas[elegidas.length - 1].valores[medida];
      const empatadas = cand.filter((f) => f.valores[medida] === valorCorte).length;
      const mostradas = elegidas.filter((f) => f.valores[medida] === valorCorte).length;
      if (empatadas > mostradas) {
        avisos.push(`Empate en el límite del ranking: ${empatadas} entidades tienen el mismo valor (${fmtNumero(valorCorte)}); se muestran ${mostradas} por orden alfabético, no por un orden de la fuente.`);
      }
    } else {
      const s = seleccionar(ind, ob.nivel, parte.filas, ob.codigos, a);
      filas.push(...s.filas);
      criterio = s.criterio;
      disponibles = s.disponibles;
      if (!s.filas.length) {
        const ent = resueltas.map((r) => r.nombre).join(", ") || ob.nivel;
        throw new ErrorConsulta(
          a.periodo
            ? `No hay datos de ${ind.id} para «${ent}» en el período ${a.periodo}. Períodos disponibles: ${resumenPeriodos(s.disponibles)}.`
            : `No hay datos de ${ind.id} para «${ent}».`,
          { periodos: s.disponibles, notas: ind.advertencias.slice(0, 2) });
      }
    }
  }
  filas = recortarMedidas(filas, a, ind);
  if (!filas.length) throw new ErrorConsulta(`La medida «${a.medida}» no tiene valores para esta consulta. Medidas con datos: ${ind.medidas.map((m) => m.id).join(", ")}.`);
  if (filas.length > L.filas_max) {
    throw new ErrorConsulta(`La consulta devolvería ${filas.length} filas (máximo ${L.filas_max}). Reduzca «ultimos», consulte una entidad a la vez o use «top».`);
  }
  const presentes = new Set(filas.flatMap((f) => Object.keys(f.valores)));
  const medidas = ind.medidas.filter((m) => presentes.has(m.id));
  const notas = [...new Set(filas.map((f) => f.nota).filter(Boolean))];
  // Una misma respuesta con filas de granularidades distintas (por ejemplo un año con meses y un dia suelto) no es comparable fila a fila.
  const granularidades = [...new Set(filas.map((f) => f.granularidad).filter(Boolean))];
  if (granularidades.length > 1) avisos.push(`Las filas mezclan granularidades (${granularidades.join(", ")}): no son comparables entre sí; cada fila indica la suya.`);
  const tambien = a.top || a.ultimos ? [] : await equivalentes(env, cat, ind, filas, objetivos);
  const citaPlantilla = cat.cita_plantilla || "Fuente: Energías Futuro. Corte: {fecha_corte}.";
  const pagina = paginaValida(ind.pagina);
  // Funciones como reemplazo: el texto de la fuente puede traer «$&», «$'» o «$$» y no debe interpretarse como patron.
  const cita = citaPlantilla.replace("{fuente_original}", () => sinPuntoFinal(ind.fuente_original)).replace("{fecha_corte}", () => String(ind.fecha_corte));
  // Todo lo que sale pasa por el saneo (control, formato, direccion de texto): los archivos de datos son nuestros, pero si el origen se contaminara, la
  // respuesta no debe llevar caracteres ocultos ni texto con formato de instruccion fuera de los campos de datos.
  return sanitizarProfundo({
    indicador: {
      id: ind.id, nombre: ind.nombre, tema: ind.tema, definicion: ind.definicion, universo: ind.universo, medida_principal: ind.medida_principal,
      fuente_original: ind.fuente_original, periodicidad: ind.periodicidad, fecha_corte: ind.fecha_corte, generado: ind.generado, generado_iso: ind.generado_iso,
      pagina, url: `${urlPublica(env)}/${pagina}`, advertencias: ind.advertencias, etiquetas_def: ind.etiquetas_def || {},
    },
    consulta: {
      entidad_pedida: a.entidad || null, entidades_resueltas: resueltas, niveles: [...new Set(filas.map((f) => f.nivel))],
      criterio, periodos: [...new Set(filas.map((f) => f.periodo))].sort(),
    },
    medidas,
    filas: filas.map(formaFila),
    ...(tambien.length ? { tambien_publicado: tambien } : {}),
    avisos: [...new Set([...avisos, ...notas])],
    cita,
    politica_uso: cat.politica_uso,
  });
}

// ---- redaccion de la respuesta ------------------------------------------------------------------------------------
function sinPuntoFinal(s) {
  return String(s || "").replace(/[.\s]+$/, "");
}

// La unidad se omite cuando el nombre de la medida ya la dice («Cargadores (total): 39»).
function unidadVisible(m) {
  const unidad = m && m.unidad ? m.unidad : "";
  return unidad && !(norm(unidad) !== "" && norm(m.nombre).includes(norm(unidad))) ? unidad : "";
}

function vTxt(valor, m) {
  const u = unidadVisible(m);
  return `${fmtNumero(valor)}${u ? (u === "%" ? " %" : " " + u) : ""}`;
}

function redactar(res) {
  const L = [];
  const i = res.indicador;
  const med = new Map(res.medidas.map((m) => [m.id, m]));
  const entidades = res.consulta.entidades_resueltas.map((e) => e.nombre).join(" y ");
  L.push(`${i.nombre}${entidades ? " — " + entidades : ""} (${res.consulta.criterio}).`);
  const filas = res.filas;
  const unaEntidad = new Set(filas.map((f) => `${f.nivel}|${f.codigo}`)).size === 1;
  const periodos = [...new Set(filas.map((f) => f.periodo))];
  const unPeriodo = periodos.length === 1;
  const mixtas = new Set(filas.map((f) => f.granularidad || "")).size > 1;   // filas de granularidades distintas: cada una dice la suya
  const sufijo = (f) => (mixtas && f.granularidad ? ` (${f.granularidad})` : "");
  const ids = res.medidas.map((m) => m.id);
  const nombreEt = (k) => (i.etiquetas_def && i.etiquetas_def[k]) || k;
  const et = (f) => (f.etiquetas ? ` (${Object.entries(f.etiquetas).map(([k, v]) => `${nombreEt(k)}: ${v}`).join("; ")})` : "");
  if (filas.length === 1) {
    const f = filas[0];
    for (const [k, v] of Object.entries(f.valores)) L.push(`• ${med.get(k)?.nombre || k}: ${vTxt(v, med.get(k))}`);
    L.push(`Período: ${f.periodo}${f.granularidad ? " (" + f.granularidad + ")" : ""}.${et(f)}`);
  } else {
    const principal = ids.includes(i.medida_principal) ? i.medida_principal : ids[0];
    const todas = ids.length <= 3;
    const mostrar = todas ? ids : [principal];
    if (ids.length === 1) L.push(`Medida: ${med.get(ids[0]).nombre}${unidadVisible(med.get(ids[0])) ? " — " + unidadVisible(med.get(ids[0])) : ""}.`);
    else if (!todas) L.push(`Medida mostrada: ${med.get(principal).nombre}. Otras medidas disponibles: ${ids.filter((x) => x !== principal).join(", ")} (parámetro medida).`);
    for (const f of filas) {
      const etiqueta = (unaEntidad ? f.periodo : unPeriodo ? f.nombre : `${f.nombre} · ${f.periodo}`) + sufijo(f);
      const vals = mostrar.filter((k) => f.valores[k] !== undefined)
        .map((k) => (ids.length === 1 || !todas ? vTxt(f.valores[k], med.get(k)) : `${med.get(k).nombre}: ${vTxt(f.valores[k], med.get(k))}`)).join("; ");
      L.push(`• ${etiqueta}: ${vals || "sin dato"}${et(f)}`);
    }
    if (unPeriodo) L.push(`Período: ${periodos[0]}.`);
  }
  if (res.tambien_publicado) {
    L.push("También publicado con otra definición:");
    for (const t of res.tambien_publicado) L.push(`• ${t.nombre} — ${t.entidad}: ${t.medida}: ${fmtNumero(t.valor)}${unidadVisible({ nombre: t.medida, unidad: t.unidad }) ? (t.unidad === "%" ? " %" : " " + t.unidad) : ""} (${t.periodo}). Universo: ${t.universo_breve}.`);
  }
  for (const av of res.avisos) L.push(`Aviso: ${av}`);
  L.push(`Definición: ${i.definicion}`);
  L.push(`Universo: ${i.universo}`);
  if (i.advertencias.length) L.push(`Advertencias: ${i.advertencias.join(" · ")}`);
  L.push(`Fuente: ${sinPuntoFinal(i.fuente_original)}. Corte: ${i.fecha_corte}. Más detalle: ${i.url}`);
  L.push(`Cita sugerida: ${res.cita}`);
  return L.join("\n");
}

// ---- listado, busqueda de territorios y search/fetch ------------------------------------------------------------
async function listar(env, args) {
  const { cat } = await obtenerCatalogo(env);
  if (args === null || typeof args !== "object" || Array.isArray(args)) throw new ErrorConsulta("Los argumentos deben ser un objeto.");
  for (const k of Object.keys(args)) if (k !== "tema") throw new ErrorConsulta(`Parámetro desconocido: «${sanitizar(k, 30)}». El único parámetro es «tema».`);
  let lista = cat.indicadores;
  if (args.tema !== undefined && args.tema !== null && args.tema !== "") {
    if (!cat.temas.includes(args.tema)) throw new ErrorConsulta(`Tema desconocido. Temas disponibles: ${cat.temas.join(", ")}.`);
    lista = lista.filter((i) => i.tema === args.tema);
  }
  return sanitizarProfundo({
    total: lista.length, temas: cat.temas,
    indicadores: lista.map((i) => ({
      id: i.id, nombre: i.nombre, tema: i.tema, definicion_breve: i.definicion.split(". ")[0].replace(/\.$/, "") + ".",
      niveles: i.niveles, medida_principal: i.medida_principal, fecha_corte: i.fecha_corte,
      equivalentes: i.equivalentes && i.equivalentes.length ? i.equivalentes : undefined,
    })),
    politica_uso: cat.politica_uso,
  });
}

async function territorios(env, args, L) {
  if (args === null || typeof args !== "object" || Array.isArray(args)) throw new ErrorConsulta("Los argumentos deben ser un objeto.");
  for (const k of Object.keys(args)) if (k !== "texto") throw new ErrorConsulta(`Parámetro desconocido: «${sanitizar(k, 30)}». El único parámetro es «texto».`);
  if (typeof args.texto !== "string" || args.texto.trim().length < 2 || args.texto.length > L.texto_max) {
    throw new ErrorConsulta(`«texto» es obligatorio: entre 2 y ${L.texto_max} caracteres (nombre o código de región o comuna).`);
  }
  const terr = await obtenerTerritorios(env);
  const r = buscarTerritorios(terr, sanitizar(args.texto, L.texto_max), 8);
  return sanitizarProfundo({ texto: sanitizar(args.texto, L.texto_max), candidatos: r, total: r.length });
}

// search/fetch con el formato que ChatGPT espera. El id identifica indicador y, si corresponde, territorio: «indicador» o «indicador|codigo».
async function buscarParaChatGPT(env, args, L) {
  if (args === null || typeof args !== "object" || Array.isArray(args)) throw new ErrorConsulta("Los argumentos deben ser un objeto.");
  for (const k of Object.keys(args)) if (k !== "query") throw new ErrorConsulta(`Parámetro desconocido: «${sanitizar(k, 30)}». El único parámetro es «query».`);
  if (typeof args.query !== "string" || args.query.trim().length < 2 || args.query.length > 200) throw new ErrorConsulta("«query» es obligatorio: entre 2 y 200 caracteres.");
  const { cat } = await obtenerCatalogo(env);
  const terr = await obtenerTerritorios(env);
  const consulta = sanitizar(args.query, 200);
  const terrs = detectarEnTexto(terr, consulta);
  let sinTerritorios = norm(consulta);
  for (const t of terrs) sinTerritorios = sinTerritorios.split(norm(t.nombre)).join(" ");
  // Los mejores indicadores y, junto a cada uno, los que responden la misma pregunta con otro universo: asi la ambiguedad se ve desde la busqueda.
  const elegidos = [];
  for (const { i } of puntuarIndicadores(cat, sinTerritorios).slice(0, 5)) {
    if (!elegidos.includes(i)) elegidos.push(i);
    for (const spec of i.equivalentes || []) {
      const eq = cat.indicadores.find((x) => x.id === spec.split(":")[0]);
      if (eq && !elegidos.includes(eq)) elegidos.push(eq);
    }
  }
  const results = [];
  for (const i of elegidos.slice(0, 6)) {
    const urlI = `${urlPublica(env)}/${paginaValida(i.pagina)}`;
    const aptos = terrs.filter((t) => i.niveles.includes(t.tipo));
    if (aptos.length) {
      // hasta 4 por indicador: un nombre que es region y comuna a la vez (Maule) aparece con ambos significados
      for (const t of aptos.slice(0, 4)) results.push({ id: `${i.id}|${t.codigo}|${t.tipo}`, title: `${i.nombre} — ${t.nombre}${t.tipo === "comuna" ? " (comuna)" : t.tipo === "region" ? " (región)" : ""}`, url: urlI });
    } else {
      results.push({ id: i.id, title: i.nombre, url: urlI });
    }
    if (results.length >= 8) break;
  }
  return sanitizarProfundo({ results: results.slice(0, 8) });
}

async function traerParaChatGPT(env, args) {
  if (args === null || typeof args !== "object" || Array.isArray(args)) throw new ErrorConsulta("Los argumentos deben ser un objeto.");
  for (const k of Object.keys(args)) if (k !== "id") throw new ErrorConsulta(`Parámetro desconocido: «${sanitizar(k, 30)}». El único parámetro es «id».`);
  if (typeof args.id !== "string" || !/^[a-z][a-z0-9_]{2,59}(\|[0-9]{2,5}\|(region|comuna))?$/.test(args.id)) {
    throw new ErrorConsulta("«id» no es válido: use un id devuelto por search (por ejemplo red_carga_viva|08|region).");
  }
  const [indicador, codigo, tipo] = args.id.split("|");
  const params = { indicador };
  if (codigo) { params.entidad = codigo; params.nivel = tipo; }
  const res = await consultar(env, params);
  const texto = redactar(res) + "\n\nDatos estructurados (JSON):\n" + JSON.stringify({ medidas: res.medidas, filas: res.filas, tambien_publicado: res.tambien_publicado || [] });
  return {
    id: args.id, title: res.indicador.nombre + (res.consulta.entidades_resueltas[0] ? " — " + res.consulta.entidades_resueltas[0].nombre : ""),
    text: texto, url: res.indicador.url,
    metadata: { fecha_corte: res.indicador.fecha_corte, generado: res.indicador.generado, fuente: res.indicador.fuente_original, tema: res.indicador.tema },
  };
}
return { ErrorConsulta, NIVELES, validarArgs, puntuarIndicadores, sugerirIndicadores, resumenPeriodos, coincideNombre, consultar, unidadVisible, vTxt, redactar, listar, territorios, buscarParaChatGPT, traerParaChatGPT };
})();
__mod["agente_web/src/enlaces.js"] = (function () {
// Enlaces que el asistente puede dibujar FUERA del sitio (fichas de rescate y etiquetas de eficiencia de los vehiculos): solo https y solo de estos
// sitios, que son los mismos que el sitio ya enlaza en rescate.html y padron-ev.html. Lo demas se descarta.
// La lista es la misma de capa_vehiculos.py (HOSTS_ENLACES): una prueba comprueba que sean iguales.
const HOSTS_ENLACES = [
  "api.rescue.euroncap.com", "www.sec.cl", "www.anb.cl", "drive.google.com",
  "www.kia.com", "www.honda.de", "www.honda.at", "www.hyundai.com", "www.changan.cl",
  "h2tools.org", "til.scania.com", "busdoc.buses.daimlertruck.com", "daimleradsmart.com", "morongocsd.specialdistrict.org",
  "energysecurityagency.com", "www.bcn.cl",
];

// Devuelve la URL normalizada si es https de un sitio permitido, sin usuario, contrasena ni puerto distinto del normal; si no, null.
function urlExterna(u) {
  try {
    const x = new URL(String(u));
    if (x.protocol !== "https:" || x.username || x.password || x.port) return null;
    return HOSTS_ENLACES.includes(x.hostname.toLowerCase()) ? x.href : null;
  } catch {
    return null;
  }
}
return { HOSTS_ENLACES, urlExterna };
})();
__mod["agente_web/src/lector.js"] = (function () {
// Lector de los archivos ia_*.json de un tema del asistente (vehiculos, normativa): los trae del mismo sitio (o de env.CARGADOR en pruebas y demostraciones),
// comprueba su esquema y los guarda en memoria 30 minutos, como los demas datos del asistente.
const { limites, urlSitio } = __req("servidor/src/config.js");

// rutas: { clave: "ia_xxx.json" }; esquema: texto que debe traer el archivo («ia-veh-v1»); ErrorClase: la excepcion propia del tema.
function crearLector(rutas, esquema, ErrorClase, nombreTema) {
  const memoria = new Map();          // ruta -> { t, v }

  async function traer(env, ruta) {
    if (env && typeof env.CARGADOR === "function") return await env.CARGADOR(ruta);
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const corte = ctrl ? setTimeout(() => ctrl.abort(), limites(env).timeout_datos_ms) : null;
    try {
      const resp = await fetch(`${urlSitio(env)}/data/${ruta}`, { headers: { accept: "application/json" }, signal: ctrl ? ctrl.signal : undefined });
      if (!resp.ok) throw new ErrorClase(`el sitio respondió HTTP ${resp.status}`);
      return await resp.json();
    } finally {
      if (corte) clearTimeout(corte);
    }
  }

  async function leer(env, cual) {
    const ruta = rutas[cual];
    if (!ruta) throw new ErrorClase(`archivo de ${nombreTema} desconocido`);
    const previo = memoria.get(ruta);
    if (previo && Date.now() - previo.t < 1800000) return previo.v;
    try {
      const v = await traer(env, ruta);
      if (!v || v.esquema !== esquema || v.id !== cual) throw new ErrorClase("esquema de datos inesperado");
      memoria.set(ruta, { t: Date.now(), v });
      return v;
    } catch (e) {
      if (previo) return previo.v;
      throw new ErrorClase(`No se pudo leer ${ruta}: ${e && e.message ? e.message : e}`);
    }
  }

  return { leer, vaciar: () => memoria.clear() };
}
return { crearLector };
})();
__mod["agente_web/src/vehiculos.js"] = (function () {
// Capa de vehiculos del asistente: lee los tres archivos ia_veh_*.json (modelos, TCO y seguros), busca marcas y modelos en lo que escribe la persona y arma
// las tarjetas de respuesta. No interpreta frases (eso es nlu_veh.js). Todo lo que muestra sale de esos archivos, que a su vez son copia fiel de lo que el sitio
// ya publica (padron-ev.html, tco.html, seguros.html); la UNICA cuenta que hace es el TCO, con la misma formula de tco.html (ver calcularTCO).
const { fmtNumero, norm } = __req("servidor/src/util.js");
const { urlExterna } = __req("agente_web/src/enlaces.js");
const { crearLector } = __req("agente_web/src/lector.js");

class ErrorVehiculos extends Error {}

const lector = crearLector({ modelos: "ia_veh_modelos.json", tco: "ia_veh_tco.json", seguros: "ia_veh_seguros.json" }, "ia-veh-v1", ErrorVehiculos, "vehículos");
const indices = new WeakMap();      // archivo -> indice ya armado

function vaciarMemoriaVehiculos() {
  lector.vaciar();
}

// Lee uno de los tres archivos (en memoria 30 minutos, como los demas datos del asistente).
const leerArchivo = (env, cual) => lector.leer(env, cual);

// ---- texto -------------------------------------------------------------------------------------------------------------------------------
const tokens = (s) => norm(s).split(" ").filter(Boolean);
const sinParentesis = (s) => String(s || "").replace(/\([^)]*\)/g, " ");

// Marcas con otra grafia en los datos (el padron y el TCO escriben distinto) o que la gente abrevia.
const ALIAS_MARCA = {
  "m benz": "mercedes benz", "mercedes": "mercedes benz", "benz": "mercedes benz", "vw": "volkswagen", "chevy": "chevrolet", "gac motor": "gac",
  "ssangyong": "kgm", "alfa": "alfa romeo", "rolls": "rolls royce", "land": "land rover", "zna dongfeng": "zna",
};
const marcaClave = (nombre) => {
  const n = norm(sinParentesis(nombre));
  return ALIAS_MARCA[n] || n;
};

// Palabras que NO forman parte del nombre de un modelo (preguntas, verbos, atributos y categorias): se descartan antes de buscarlo.
const PALABRAS_NO_MODELO = new Set((
  "el la los las un una unos unas de del al en con sin por para y o u a que cual cuales cuanto cuanta cuantos cuantas como donde quien quienes es son ser esta estan " +
  "tiene tienen tener trae traen cuesta cuestan costo costos vale valen sale salen sirve dura rinde consume consumo usa usan hay existe existen dime dame quiero saber " +
  "me mi mis tu su sus lo le se mas menos muy mejor peor ver mostrar muestra muestrame compara comparar comparacion versus vs contra entre " +
  "precio precios valor autonomia rango alcance bateria baterias capacidad conector conectores enchufe enchufes carga cargar rendimiento eficiencia emisiones co2 " +
  "ficha fichas rescate seguridad seguro seguros prima primas asegurar asegurado aseguradora aseguradoras cobertura coberturas tco mantencion mantener mantenimiento permiso " +
  "impuesto etiqueta certificado certificada homologado homologada cit datos dato informacion info especificaciones especificacion caracteristicas detalles detalle " +
  "modelo modelos marca marcas version versiones ano anos mes meses km kilometros kwh kw auto autos vehiculo vehiculos carro carros coche coches " +
  "electrico electricos electrica electricas hibrido hibridos hibrida enchufable enchufables bencina diesel gasolina combustion " +
  "suv sedan hatchback camioneta camionetas station wagon furgon pickup " +
  "todos todas todo cada otro otra mismo misma tambien ademas solo cuando mensual anual gasto gastos uso tener costos total completo " +
  "bajo sobre desde hasta maximo minimo millones millon top primeros ultimos mejores peores barato baratos barata caro caros cara economico economicos " +
  "eficiente eficientes grande grandes principales ranking lista catalogo como hay " +
  "guia guias emergencia emergencias bomberos energetica energetico energia chile chilena chileno homologacion certificacion rinde rinden pesa pesan plazas asientos conviene " +
  "potencia caballos hp velocidad punta aceleracion garantia largo ancho dimensiones medidas color colores peso kilos kilogramos maletero baul pasajeros 3cv cit ahorro ahorrar ahorra cargador cargadores estacion estaciones electrolinera electrolineras"
).split(" "));

// Siglas de tecnologia que la gente agrega al nombre («MG ZS EV»): no se avisa si no estan en el nombre del modelo.
const RUIDO_TECNOLOGIA = new Set(["ev", "bev", "phev", "hev", "mhev", "erev", "electric", "hybrid"]);

// ---- formatos --------------------------------------------------------------------------------------------------------------------------
const clp = (n) => "$" + fmtNumero(Math.round(n));
const NOMBRE_TEC = {
  BEV: "Eléctrico a batería (BEV)", PHEV: "Híbrido enchufable (PHEV)", HEV: "Híbrido convencional (HEV)", MHEV: "Microhíbrido (MHEV)",
  FCEV: "Celda de combustible, hidrógeno (FCEV)", EREV: "Eléctrico de rango extendido (EREV)", ICE: "Combustión (ICE)",
};
const nombreTec = (t) => NOMBRE_TEC[t] || t || "";
const NOMBRE_CONECTOR = {
  "tipo-2": "Tipo 2", "tipo-1": "Tipo 1", ccs2: "CCS2", ccs1: "CCS1", chademo: "CHAdeMO", "gbt-ac": "GB/T (AC)", "gbt-dc": "GB/T (DC)",
  "sin-conector-estandar": "sin conector estándar",
};
const conector = (c) => (c && c !== "no-aplica" ? NOMBRE_CONECTOR[c] || c : "");
const nombreCompleto = (r) => `${r.marca} ${r.modelo}`.replace(new RegExp(`^(${escapar(r.marca)}) \\1 `, "i"), "$1 ");
function escapar(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---- indices y busqueda ----------------------------------------------------------------------------------------------------------------
// norm() convierte «20.000» en «20 000»: el separador de miles puede ser punto, coma o espacio.
const CANT = "(?:\\d{1,3}(?:[.,\\s]\\d{3})+|\\d+(?:[.,]\\d+)?|un|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)";

// Quita de la frase (ya normalizada) las cantidades que NO son parte de un nombre: «a 10 años», «20.000 km al año», «bajo 30 millones», «los 5», «bencina 95».
// «Ioniq 5», «Model 3» o «ID 4» se conservan: un numero solo se quita si lo acompana una unidad o un «los/top» delante.
function quitarCantidades(q) {
  return String(q)
    .replace(new RegExp(`\\b${CANT}\\s*(?:anos?|meses|mes)\\b`, "g"), " ")
    .replace(new RegExp(`\\b${CANT}\\s*(?:mil\\s*)?(?:km|kms|kilometros?)\\b(?:\\s+(?:al|por|cada|anual\\w*|mensual\\w*|ano|mes))*`, "g"), " ")
    .replace(new RegExp(`\\b${CANT}\\s*(?:millones|millon|mm)\\b`, "g"), " ")
    .replace(new RegExp(`\\b(?:top|los|las)\\s+${CANT}\\b`, "g"), " ")
    .replace(/\b(?:bencina|gasolina|octanaje)\s+(?:93|95|97)\b/g, " ")
    .replace(/\s+/g, " ").trim();
}

function registros(arch) {
  return arch.filas.map((f, i) => {
    const o = { _i: i };
    arch.campos.forEach((c, j) => { o[c] = f[j]; });
    return o;
  });
}

// Nombre del modelo sin la marca repetida ("BYD D1" -> "d1") y en fichas de tokens: se busca por ellos en lo que escribe la persona.
function prepararNombre(marca, modelo) {
  const mt = tokens(modelo);
  const bt = tokens(sinParentesis(marca));
  let t = mt;
  if (bt.length && bt.every((x, i) => mt[i] === x) && mt.length > bt.length) t = mt.slice(bt.length);
  return { tokens: t, compacto: t.join("") };
}

async function indiceModelos(env) {
  const arch = await leerArchivo(env, "modelos");
  if (indices.has(arch)) return indices.get(arch);
  const filas = registros(arch).map((r) => ({ ...r, _clave: marcaClave(r.marca), ...prepararNombre(r.marca, r.modelo) }));
  const marcas = new Map();   // clave -> { nombre, frases }
  for (const r of filas) {
    if (!marcas.has(r._clave)) marcas.set(r._clave, { clave: r._clave, nombre: r.marca, frases: new Set([r._clave]) });
  }
  for (const [alias, destino] of Object.entries(ALIAS_MARCA)) if (marcas.has(destino)) marcas.get(destino).frases.add(alias);
  const idx = { arch, filas, marcas };
  indices.set(arch, idx);
  return idx;
}

async function indiceTco(env) {
  const arch = await leerArchivo(env, "tco");
  if (indices.has(arch)) return indices.get(arch);
  const modelos = await indiceModelos(env);
  const bonita = new Map();   // clave de marca -> nombre como lo muestra el padron
  for (const m of modelos.marcas.values()) bonita.set(m.clave, m.nombre);
  const filas = registros(arch).map((r) => {
    const clave = marcaClave(r.mk);
    const nombre = bonita.get(clave) || (/^[A-Z0-9 .&-]+$/.test(r.mk) ? r.mk.toLowerCase().replace(/(^|[ .-])([a-z])/g, (m, a, b) => a + b.toUpperCase()) : r.mk);
    return { ...r, marca: nombre, modelo: r.md, _clave: clave, ...prepararNombre(r.mk, r.md) };
  });
  const marcas = new Map();
  for (const r of filas) if (!marcas.has(r._clave)) marcas.set(r._clave, { clave: r._clave, nombre: r.marca, frases: new Set([r._clave]) });
  for (const [alias, destino] of Object.entries(ALIAS_MARCA)) if (marcas.has(destino)) marcas.get(destino).frases.add(alias);
  const idx = { arch, filas, marcas };
  indices.set(arch, idx);
  return idx;
}

// Todas las palabras que aparecen en nombres de modelos de un indice (se arma una vez).
const vocabularios = new WeakMap();
function vocabulario(idx) {
  if (!vocabularios.has(idx)) vocabularios.set(idx, new Set(idx.filas.flatMap((r) => r.tokens)));
  return vocabularios.get(idx);
}

// ¿Aparece la frase (varias palabras) completa dentro del texto normalizado? Las palabras deben ir juntas y enteras.
const contiene = (q, frase) => frase !== "" && new RegExp("(^| )" + escapar(frase) + "( |$)").test(q);

// Marcas que nombra la pregunta (por marca, la frase mas larga). «mini» puede ser una marca o parte de «Dolphin Mini»: por eso son varias opciones.
function detectarMarcas(indices_, q) {
  const hallas = [];
  for (const m of indices_.marcas.values()) {
    let mejor = null;
    for (const f of m.frases) if (contiene(q, f) && (!mejor || f.length > mejor.length)) mejor = f;
    if (mejor) hallas.push({ clave: m.clave, nombre: m.nombre, frase: mejor });
  }
  return hallas;
}

// Modelos del indice que calzan con lo escrito, con la marca dada (o sin marca). Cada candidato se mide por:
//   cubre = cuantas de las palabras escritas (sin marca ni palabras corrientes) estan en su nombre
//   extra = cuantas palabras de su nombre NO se escribieron
// Sin marca, un modelo solo vale si algo en su nombre es una palabra de verdad (no «es», «up», «5»).
//   exacto    = todo lo escrito esta en el nombre y el nombre no trae mas
//   variantes = todo lo escrito esta en el nombre y este trae mas DESPUES («dolphin mini» -> «Dolphin Mini GL»)
//   parecido  = todo lo escrito esta en el nombre pero este trae palabras ANTES («yaris» -> «GR Yaris»): probablemente es otro modelo
//   contenido = el nombre completo esta en la pregunta pero no cubre todo lo escrito (la persona dio mas detalle)
function buscarModelos(idx, q, marca = null) {
  const qt = tokens(quitarCantidades(q));
  const qset = new Set(qt);
  const unidos = new Map();                                                   // «ioniq 5» tambien se escribe «ioniq5», «e tron» «etron»
  for (let i = 0; i + 1 < qt.length; i++) { qset.add(qt[i] + qt[i + 1]); unidos.set(qt[i] + qt[i + 1], [qt[i], qt[i + 1]]); }
  const marcaTokens = marca ? new Set(tokens(marca.frase)) : new Set();
  // un numero de 4 cifras es un año solo si es reciente (2010 a 2029): «2008» y «3008» son modelos de Peugeot
  const residual = qt.filter((t) => !marcaTokens.has(t) && !PALABRAS_NO_MODELO.has(t) && !/^20[12]\d$/.test(t));
  const rset = new Set(residual);
  // sin marca, lo escrito tiene que traer al menos una palabra de verdad (no solo numeros o letras sueltas: «los 5», «id 4»)
  if (!marca && !residual.some((t) => t.length >= 3 && /[a-z]/.test(t))) return { nivel: null, filas: [], residual, puntaje: 0 };
  const medidos = [];
  for (const r of idx.filas) {
    if (marca && r._clave !== marca.clave) continue;
    const mt = r.tokens;
    if (!mt.length) continue;
    if (!marca && !mt.some((t) => t.length >= 3 && !PALABRAS_NO_MODELO.has(t))) continue;
    const compacto = mt.length > 1 && qset.has(r.compacto);
    const enQ = compacto ? mt.length : mt.filter((t) => qset.has(t)).length;
    const extra = mt.length - enQ;
    const cubiertas = new Set();
    for (const t of mt) {
      if (rset.has(t)) cubiertas.add(t);
      else if (unidos.has(t)) unidos.get(t).forEach((x) => { if (rset.has(x)) cubiertas.add(x); });
    }
    const cubre = compacto ? residual.length : cubiertas.size;
    if (!compacto && cubre === 0 && !(extra === 0 && !residual.length)) continue;
    // palabras del nombre que van ANTES de lo escrito («GR Yaris» para «yaris»): suele ser otro modelo, no una version
    const primero = compacto ? 0 : mt.findIndex((t) => rset.has(t) || (unidos.has(t) && unidos.get(t).some((x) => rset.has(x))));
    // «sinCubrir»: lo escrito que el nombre no trae. Solo se menciona si parece una version o un acabado (alguna palabra que aparece en nombres de modelos: «GT», «Line»);
    // palabras sueltas de la pregunta («tan rapido») no son parte de ningun nombre y no se avisan.
    medidos.push({ r, enQ, extra, cubre, todo: cubre === residual.length, sinCubrir: residual.filter((t) => !cubiertas.has(t) && !compacto && !RUIDO_TECNOLOGIA.has(t) && vocabulario(idx).has(t)), antes: Math.max(0, primero) });
  }
  if (!medidos.length) return { nivel: null, filas: [], residual, puntaje: 0 };
  const mejores = (lista, clave) => {
    const m = Math.min(...lista.map(clave));
    return lista.filter((x) => clave(x) === m);
  };
  const conTodo = medidos.filter((x) => x.todo && (residual.length || x.extra === 0));
  if (conTodo.length) {
    const sinExtra = conTodo.filter((x) => x.extra === 0);
    if (sinExtra.length) {
      const g = mejores(sinExtra, (x) => -x.enQ);       // entre los que no traen palabras de mas, el de nombre mas largo
      return { nivel: "exacto", filas: g.map((x) => x.r), residual, puntaje: 1000 + g[0].enQ * 10 };
    }
    const ordenados = conTodo.sort((a, b) => a.extra - b.extra);
    const alInicio = ordenados.filter((x) => x.antes === 0);
    if (alInicio.length) return { nivel: "variantes", filas: alInicio.map((x) => x.r), residual, puntaje: 600 - alInicio[0].extra };
    return { nivel: "parecido", filas: ordenados.map((x) => x.r), residual, puntaje: 450 - ordenados[0].extra };
  }
  const parciales = medidos.filter((x) => x.extra === 0 && x.enQ > 0);
  if (parciales.length) {
    const g = mejores(parciales, (x) => -x.cubre * 10 - x.enQ);
    // «sinCubrir»: palabras que la persona escribio y el nombre elegido no trae (una version, un acabado): se le dice
    return { nivel: "contenido", filas: g.map((x) => x.r), residual, puntaje: 300 + g[0].cubre * 10 + g[0].enQ, sinCubrir: g[0].sinCubrir };
  }
  return { nivel: null, filas: [], residual, puntaje: 0 };
}

// Reconoce lo que nombra la pregunta en un indice: prueba cada marca mencionada y tambien sin marca, y se queda con la mejor lectura.
// Si la pregunta solo nombra una marca («byd», «kia»), devuelve esa marca sin modelos (sirve para listar sus modelos).
function reconocer(idx, q) {
  const marcas = detectarMarcas(idx, q).sort((a, b) => b.frase.length - a.frase.length);
  const tokensMarcas = new Set(marcas.flatMap((m) => tokens(m.frase)));
  const opciones = marcas.map((m) => {
    const r = buscarModelos(idx, q, m);
    return { ...r, marca: m, puntaje: r.puntaje + 5 };
  });
  const libre = buscarModelos(idx, q, null);
  const soloMarca = libre.residual.length > 0 && libre.residual.every((t) => tokensMarcas.has(t));   // «byd»: la palabra es la marca, no un modelo
  // Si la pregunta nombra una marca, un modelo de OTRA marca solo vale cuando el nombre de la primera es parte de su nombre («mini» en «Dolphin Mini»);
  // «Kia EV3» no puede resolverse como el «EV3» de otra marca.
  if (libre.filas.length && marcas.length) {
    const coherente = marcas.every((m) => libre.filas.every((r) => r._clave === m.clave || tokens(m.frase).every((t) => r.tokens.includes(t))));
    if (!coherente) { libre.filas = []; libre.nivel = null; libre.puntaje = 0; }
  }
  if (!soloMarca) opciones.push({ ...libre, marca: libre.filas.length ? { clave: libre.filas[0]._clave, nombre: libre.filas[0].marca, frase: "" } : null });
  opciones.sort((a, b) => b.puntaje - a.puntaje);
  const mejor = opciones[0];
  if (mejor && mejor.filas.length) return mejor;
  return { nivel: null, filas: [], residual: libre.residual, puntaje: 0, marca: marcas.length ? marcas[0] : null };
}

// Claves estables de una fila (no dependen de la posicion en el archivo): los botones las llevan para encontrar el mismo vehiculo aunque el sitio haya publicado datos nuevos.
const claveModelo = (r) => `${r.marca}|${r.modelo}|${r.tec}`;
const claveTco = (v) => `${v.mk}|${v.md}|${v.yr}|${v.tp}|${v.pr}`;

// ---- errores de tipeo ----------------------------------------------------------------------------------------------------------------
// Forma «fonetica» de una palabra: la gente escribe «dolfin» por «dolphin», «hiunday» por «hyundai», «mercedez» por «mercedes».
const fonetica = (t) => t.replace(/ph/g, "f").replace(/ck/g, "k").replace(/qu/g, "k").replace(/c(?=[aou])/g, "k").replace(/c(?=[ei])/g, "s")
  .replace(/z/g, "s").replace(/v/g, "b").replace(/y/g, "i").replace(/ll/g, "i").replace(/h/g, "").replace(/(.)\1+/g, "$1");

// Distancia de edicion entre dos palabras cortas (una letra de mas, de menos, distinta o dos juntas cambiadas cuentan 1). Corta en cuanto pasa de `max`.
function distancia(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d = [];
  for (let i = 0; i <= a.length; i++) { d[i] = [i]; }
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let minimo = Infinity;
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      minimo = Math.min(minimo, d[i][j]);
    }
    if (minimo > max) return max + 1;
  }
  return d[a.length][b.length];
}

const palabrasDeMarcas = new WeakMap();
function tokensDeMarcas(idx) {
  if (!palabrasDeMarcas.has(idx)) palabrasDeMarcas.set(idx, new Set([...idx.marcas.values()].flatMap((m) => [...m.frases].flatMap((f) => tokens(f)))));
  return palabrasDeMarcas.get(idx);
}

// Palabra conocida (de un nombre de modelo o de una marca) que mas se parece a `t`, o null si no hay una sola clara. Solo palabras de 5 letras o mas, sin numeros.
function vecinoMasCercano(idx, t) {
  const max = 1;                       // sobre la forma fonetica: «dolfin»/«dolphin» y «hiunday»/«hyundai» ya son iguales; mas distancia confunde palabras corrientes con modelos
  const ft = fonetica(t);
  let mejor = null, mejorD = Infinity, empate = false;
  for (const v of new Set([...vocabulario(idx), ...tokensDeMarcas(idx)])) {
    if (v.length < 4 || /\d/.test(v) || PALABRAS_NO_MODELO.has(v)) continue;
    const d = distancia(ft, fonetica(v), max);
    if (d > max) continue;
    if (d < mejorD) { mejor = v; mejorD = d; empate = false; } else if (d === mejorD && v !== mejor) empate = true;
  }
  return mejor && !empate ? mejor : null;
}

// Si la pregunta trae palabras desconocidas muy parecidas a una marca o un modelo, devuelve el reconocimiento de la frase corregida: { ...reconocer, cambios, corregida }.
// Nunca elige por la persona: quien llama ofrece lo que se parece y espera que toque uno.
function sugerirPorTipografia(idx, q) {
  const qt = tokens(quitarCantidades(q));
  const marcasT = tokensDeMarcas(idx);
  const vocab = vocabulario(idx);
  const cambios = [];
  const nuevo = qt.map((t) => {
    if (t.length < 5 || /\d/.test(t) || vocab.has(t) || marcasT.has(t) || PALABRAS_NO_MODELO.has(t)) return t;
    const v = vecinoMasCercano(idx, t);
    if (!v) return t;
    cambios.push([t, v]);
    return v;
  });
  if (!cambios.length) return null;
  const corregida = nuevo.join(" ");
  const r = reconocer(idx, corregida);
  return r.filas.length && ["exacto", "variantes", "contenido"].includes(r.nivel) ? { ...r, cambios, corregida } : null;
}

// Quita repetidos del mismo (marca, modelo, tecnologia) que el padron publica dos veces con los mismos datos.
function sinRepetidos(filas) {
  const vistos = new Set();
  return filas.filter((r) => {
    const k = `${r._clave}|${r.tokens.join(" ")}|${r.tec || r.tp}|${r.precio_min || r.pr || ""}|${r.yr || ""}`;
    if (vistos.has(k)) return false;
    vistos.add(k);
    return true;
  });
}

// ---- tarjetas -------------------------------------------------------------------------------------------------------------------------
const filaDato = (etiqueta, valor) => (valor === null || valor === undefined || valor === "" ? null : [etiqueta, valor]);

function textoPrecio(r) {
  if (!r.precio_min) return "";
  if (r.precio_max && r.precio_max !== r.precio_min) return `${clp(r.precio_min)} a ${clp(r.precio_max)}`;
  return clp(r.precio_min);
}

// Campos que la persona puede pedir por separado y la fila de la tarjeta que los muestra.
const CAMPOS_FICHA = {
  autonomia: (r) => filaDato("Autonomía", r.autonomia ? `${fmtNumero(r.autonomia)} km` : ""),
  bateria: (r) => filaDato("Batería", r.bateria ? `${fmtNumero(r.bateria)} kWh` : ""),
  precio: (r) => filaDato("Precio", textoPrecio(r)),
  rendimiento: (r) => filaDato("Rendimiento", r.rendimiento ? `${fmtNumero(r.rendimiento)} km/kWh` : ""),
  conector: (r) => filaDato("Conector de carga", [conector(r.conector_ac) && `AC ${conector(r.conector_ac)}`, conector(r.conector_dc) && `DC ${conector(r.conector_dc)}`].filter(Boolean).join(" · ")),
  co2: (r) => filaDato("Emisiones de CO2", r.co2 !== null && r.co2 !== undefined ? `${fmtNumero(r.co2)} g/km` : ""),
  tecnologia: (r) => filaDato("Tecnología", nombreTec(r.tec)),
  carroceria: (r) => filaDato("Carrocería", r.carroceria && r.carroceria !== "N/A" ? r.carroceria : ""),
  origen: (r) => filaDato("Origen", [r.pais, r.grupo && r.grupo !== r.marca ? `grupo ${r.grupo}` : ""].filter(Boolean).join(" · ")),
  anios: (r) => filaDato("Años publicados", r.anio_min ? (r.anio_max && r.anio_max !== r.anio_min ? `${r.anio_min} a ${r.anio_max}` : String(r.anio_min)) : ""),
  norma: (r) => filaDato("Norma de emisiones", r.norma),
  certificado: (r) => filaDato("Certificado en Chile (CIT)", r.cit ? "Sí" : "No consta"),
  rescate: (r) => filaDato("Ficha de rescate", r.rescate ? "Sí" : "No consta"),
  seguro: (r) => filaDato("Seguro para EV", r.seguro_ev ? (r.seguro_min ? `Sí; prima mensual estimada ${clp(r.seguro_min)}${r.seguro_max && r.seguro_max !== r.seguro_min ? ` a ${clp(r.seguro_max)}` : ""}` : "Sí") : "No consta"),
};
const ORDEN_FICHA = ["tecnologia", "carroceria", "precio", "autonomia", "bateria", "rendimiento", "conector", "co2", "norma", "anios", "origen", "certificado", "rescate", "seguro"];

function titulo(r) {
  return nombreCompleto(r);
}

// Tarjeta de un modelo. `destacar` (ids de CAMPOS_FICHA) los pone primero; con `solo` muestra unicamente esos.
const ETIQUETA_CAMPO = {
  autonomia: "Autonomía", bateria: "Batería", precio: "Precio", rendimiento: "Rendimiento", conector: "Conector de carga", co2: "Emisiones de CO2",
  tecnologia: "Tecnología", carroceria: "Carrocería", origen: "Origen", anios: "Años publicados",
};

function bloqueFicha(r, destacar = [], solo = false) {
  const pedidos = solo && destacar.length;
  const orden = pedidos ? destacar : [...destacar, ...ORDEN_FICHA.filter((k) => !destacar.includes(k))];
  // si pidieron un dato concreto y el padron no lo trae, se dice (en vez de omitirlo)
  const filas = orden.map((k) => CAMPOS_FICHA[k](r) || (pedidos && ETIQUETA_CAMPO[k] ? [ETIQUETA_CAMPO[k], "sin dato en el padrón"] : null)).filter(Boolean);
  return {
    tipo: "cifras", verificar: true, titulo: titulo(r),
    subtitulo: [nombreTec(r.tec), r.carroceria && r.carroceria !== "N/A" ? r.carroceria : ""].filter(Boolean).join(" · "),
    filas: filas.length ? filas : [["Datos", "El padrón no trae cifras para este modelo"]],
  };
}

// Modelos que estan en los datos de costo (TCO) pero no en el padron (casi todos de combustion): el TCO trae algunas cifras tecnicas propias.
const CAMPOS_FICHA_TCO = {
  tecnologia: (v) => filaDato("Tecnología", nombreTec(v.tp)),
  precio: (v) => filaDato("Precio", v.pr ? `${clp(v.pr)}${v.pcf === "baja" ? " (estimado desde la tasación fiscal)" : ""}` : ""),
  autonomia: (v) => filaDato("Autonomía", v.au ? `${fmtNumero(v.au)} km` : ""),
  bateria: (v) => filaDato("Batería", v.bt ? `${fmtNumero(v.bt)} kWh` : ""),
  rendimiento: (v) => filaDato("Rendimiento", [v.ke ? `${fmtNumero(v.ke)} km/kWh` : "", v.kl ? `${fmtNumero(v.kl)} km/L` : ""].filter(Boolean).join(" y ")),
  conector: (v) => filaDato("Potencia de carga", [v.pac ? `AC ${fmtNumero(v.pac)} kW` : "", v.pdc ? `DC ${fmtNumero(v.pdc)} kW` : ""].filter(Boolean).join(" · ")),
  co2: (v) => filaDato("Emisiones de CO2", v.co ? `${fmtNumero(v.co)} g/km` : ""),
};
const ORDEN_FICHA_TCO = ["tecnologia", "precio", "autonomia", "bateria", "rendimiento", "conector", "co2"];

function bloqueFichaTco(v, destacar = [], solo = false) {
  const validos = destacar.filter((k) => CAMPOS_FICHA_TCO[k]);
  const orden = solo && validos.length ? validos : [...validos, ...ORDEN_FICHA_TCO.filter((k) => !validos.includes(k))];
  const filas = orden.map((k) => CAMPOS_FICHA_TCO[k](v)).filter(Boolean);
  return {
    tipo: "cifras", verificar: true, titulo: `${nombreVersion(v)} ${v.yr}`, subtitulo: nombreTec(v.tp),
    filas: filas.length ? filas : [["Datos", "Los datos de costo no traen cifras técnicas para este modelo"]],
  };
}

// Varios modelos que calzan con lo escrito: una tabla corta con lo esencial.
function bloqueVariantes(filas, max = 8) {
  const mostrar = filas.slice(0, max);
  return {
    tipo: "tabla", verificar: true, titulo: "Modelos que calzan con lo que escribiste",
    subtitulo: filas.length > max ? `Los ${max} primeros de ${filas.length}` : `${filas.length} modelos`,
    columnas: ["Modelo", "Tecnología", "Precio", "Autonomía"],
    filas: mostrar.map((r) => [titulo(r), r.tec || "", textoPrecio(r) || "sin dato", r.autonomia ? `${fmtNumero(r.autonomia)} km` : "sin dato"]),
  };
}

// Enlaces de un modelo (ficha de rescate y etiqueta de eficiencia). Solo salen si el enlace es de un sitio permitido.
function bloquesEnlaces(r, quiere = { rescate: true, etiqueta: true }) {
  const out = [];
  const rescate = r.rescate_url ? urlExterna(r.rescate_url) : null;
  const etiqueta = r.etiqueta_url ? urlExterna(r.etiqueta_url) : null;
  if (quiere.rescate) {
    if (rescate) out.push({ tipo: "texto", verificar: false, texto: `Sí, hay ficha de rescate de «${titulo(r)}».` }, { tipo: "enlace", texto: "Abrir la ficha de rescate", url: rescate, externo: true });
    else if (r.rescate) out.push({ tipo: "texto", verificar: false, texto: `El padrón registra una ficha de rescate de «${titulo(r)}», pero no tengo el enlace.` });
    else out.push({ tipo: "texto", verificar: false, texto: `No tengo una ficha de rescate registrada para «${titulo(r)}».` });
  }
  if (quiere.etiqueta) {
    if (etiqueta) out.push({ tipo: "texto", verificar: false, texto: `Etiqueta de eficiencia energética oficial de «${titulo(r)}»${r.cit ? " (modelo certificado en Chile)" : ""}:` }, { tipo: "enlace", texto: "Abrir la etiqueta de eficiencia", url: etiqueta, externo: true });
    else out.push({ tipo: "texto", verificar: false, texto: `No tengo la etiqueta de eficiencia de «${titulo(r)}».` });
  }
  return out;
}

// ---- TCO ------------------------------------------------------------------------------------------------------------------------------
// Misma formula que tco.html (funciones costoEnergiaAnio, permisoTotal y tco): costo de USO acumulado (energia + mantencion + seguro + permiso + impuesto verde),
// SIN precio de compra ni depreciacion. agente_web/pruebas/tco.test.mjs ejecuta las funciones de la pagina y comprueba que den lo mismo que esta.
function calcularTCO(v, E, P) {
  const kmAnio = P.kmm * 12;
  const kwhAnio = v.ke > 0 ? (kmAnio / v.ke) * (1 + P.pc / 100) : 0;
  const litrosAnio = v.kl > 0 ? kmAnio / v.kl : 0;
  const elec = kwhAnio * E.e_rm;
  const comb = litrosAnio * (v.ds ? E.die : E[P.oct] || E.b93);
  const energiaAnio = v.tp === "BEV" ? elec : v.tp === "PHEV" ? P.uf * elec + (1 - P.uf) * comb : comb;
  const permiso = v.p5 > 0 ? (v.p5 / 5) * P.ny : (v.p1 || 0) * (v.b21 ? P.pev : P.pice) * P.ny;
  const c = { energia: energiaAnio * P.ny, mant: (v.ma || 0) * P.ny, seguro: (v.sg || 0) * P.ny, permiso, ivpv: (v.iv || 0) * P.utm };
  const total = c.energia + c.mant + c.seguro + c.permiso + c.ivpv;
  return { total, mensual: total / (P.ny * 12), porKm: total / (kmAnio * P.ny), c, energiaAnio };
}

// Supuestos de partida = los CON QUE PARTE la calculadora «Comparar EV vs combustion» de tco.html (`pagina` en ia_veh_tco.json: km por año, años, $ por kWh y $ por litro): la
// pagina usa lo que dice cada campo y no los parametros del modulo, asi que es lo que ve la persona al abrirla, y el asistente parte de lo mismo para que sus cifras se puedan
// comparar con las de la pagina. Si el archivo no los trae (no se pudieron leer), se usan los del modulo. La persona puede cambiar años, kilometros y octanaje.
function parametrosTCO(arch, cambios = {}) {
  const P = { ...arch.parametros };
  if (arch.pagina) { P.kmm = arch.pagina.km_anio / 12; P.ny = arch.pagina.anios; }
  if (cambios.ny) P.ny = cambios.ny;
  if (cambios.kmm) P.kmm = cambios.kmm;
  if (cambios.oct) P.oct = cambios.oct;
  P.kmAnio = Math.round(P.kmm * 12);          // lo que se muestra («20.000 km al año»); la cuenta usa kmm
  P.desdePagina = Boolean(arch.pagina);
  return P;
}

// Precios de la energia: los de la pagina para la electricidad y para el combustible (la pagina usa UN solo precio por litro para todo combustible); si la persona pide otro
// combustible (bencina 95, 97 o diesel) se usan los precios publicados en el modulo (mediana nacional de la CNE), porque la pagina no distingue.
function energiaTCO(arch, cambios = {}) {
  const E = { ...arch.energia };
  const pag = arch.pagina;
  if (!pag) return E;
  E.e_rm = pag.kwh; E.e_norte = pag.kwh; E.e_sur = pag.kwh;
  if (!cambios.oct) { E.b93 = pag.litro; E.b95 = pag.litro; E.b97 = pag.litro; E.die = pag.litro; }
  return E;
}

// La pagina solo ofrece (y solo calcula) las versiones que traen precio y consumo: electricos con km/kWh, hibridos enchufables con km/kWh y km/L, y combustion (ICE, HEV, MHEV) con km/L.
// Sin consumo la cuenta de energia da $0 (o la mitad, en un enchufable) y el total parece mucho menor que el real: el asistente tampoco las calcula, y manda a la pagina.
function calculable(v) {
  return v.pr > 0 && ((v.tp === "BEV" && v.ke > 0) || (v.tp === "PHEV" && v.ke > 0 && v.kl > 0) || ((v.tp === "ICE" || v.tp === "HEV" || v.tp === "MHEV") && v.kl > 0));
}

// Por que no se calcula una version (para decirlo con palabras).
function motivoNoCalculable(v) {
  if (!(v.pr > 0)) return "no tengo su precio";
  if (v.tp === "FCEV") return "no tengo su consumo de hidrógeno";
  if (v.tp === "BEV") return "no tengo su consumo eléctrico (km por kWh)";
  if (v.tp === "PHEV") return "sus datos de consumo están incompletos (faltan los km por kWh o los km por litro)";
  if (v.tp === "ICE" || v.tp === "HEV" || v.tp === "MHEV") return "no tengo su rendimiento (km por litro)";
  return `el sitio no calcula el costo de los vehículos de tipo ${v.tp}`;
}

// Los enchufables mezclan electricidad y combustible: el sitio supone una parte de los kilometros con electricidad (parametro `uf`). Se dice, porque cambia mucho el resultado.
function notaEnchufables(P) {
  const parte = P.uf === 0.5 ? "la mitad" : `el ${Math.round(P.uf * 100)} %`;
  return `En los híbridos enchufables el cálculo del sitio supone que ${parte} de los kilómetros se recorre con electricidad y el resto con bencina; el costo real depende de cuánto cargues.`;
}

// El TCO redondeado como se muestra: los numeros del resultado son los que salen en pantalla (asi se puede comprobar que ninguno sobra).
function tcoRedondeado(t) {
  const r = (x) => Math.round(x);
  return { total: r(t.total), mensual: r(t.mensual), porKm: r(t.porKm), energia: r(t.c.energia), mant: r(t.c.mant), seguro: r(t.c.seguro), permiso: r(t.c.permiso), ivpv: r(t.c.ivpv) };
}

const nombreVersion = (v) => `${v.marca} ${v.modelo}`.replace(new RegExp(`^(${escapar(v.marca)}) \\1 `, "i"), "$1 ");

function supuestosTexto(P, E) {
  const comb = { b93: "bencina 93", b95: "bencina 95", b97: "bencina 97", die: "diésel" }[P.oct] || "bencina 93";
  const origen = P.desdePagina ? "Parten de los valores de la calculadora «Comparar EV vs combustión» del sitio, donde puedes cambiarlos." : "Son los supuestos del sitio.";
  return `Supuestos: ${fmtNumero(P.kmAnio)} km al año, ${P.ny} años, ${comb} a ${clp(E[P.oct] || E.b93)} por litro y electricidad a ${clp(E.e_rm)} por kWh. ${origen} Es el costo de uso: no incluye el precio de compra ni la depreciación.`;
}

// Tarjeta de un TCO. `res` es tcoRedondeado(...).
function bloqueTCO(v, res, P) {
  const filas = [
    ["Total a " + P.ny + (P.ny === 1 ? " año" : " años"), clp(res.total)],
    ["Por mes", clp(res.mensual)],
    ["Por kilómetro", clp(res.porKm)],
    ["Energía", clp(res.energia)],
    ["Mantención", clp(res.mant)],
    ["Seguro", clp(res.seguro)],
    ["Permiso de circulación", clp(res.permiso)],
  ];
  if (res.ivpv > 0) filas.push(["Impuesto verde", clp(res.ivpv)]);
  // el rendimiento con que el sitio calcula la energia: se muestra para que la cuenta se pueda revisar
  const rend = CAMPOS_FICHA_TCO.rendimiento(v);
  if (rend) filas.push(["Rendimiento que supone el cálculo", rend[1]]);
  return { tipo: "cifras", verificar: false, titulo: `Costo de tener un ${nombreVersion(v)} ${v.yr}`, subtitulo: `${nombreTec(v.tp)} · precio ${clp(v.pr)}`, filas };
}

// Comparacion de dos versiones: una tabla con lo esencial y la diferencia (la diferencia tambien es una cuenta de esta funcion).
function bloqueComparacion(a, ra, b, rb, P) {
  const dif = ra.total - rb.total;
  const rend = [CAMPOS_FICHA_TCO.rendimiento(a), CAMPOS_FICHA_TCO.rendimiento(b)];
  const filas = [
    ["Tecnología", nombreTec(a.tp), nombreTec(b.tp)],
    ["Precio de compra (no entra en el costo de uso)", clp(a.pr), clp(b.pr)],
    ["Costo total a " + P.ny + " años", clp(ra.total), clp(rb.total)],
    ["Por mes", clp(ra.mensual), clp(rb.mensual)],
    ["Por kilómetro", clp(ra.porKm), clp(rb.porKm)],
    ["Energía", clp(ra.energia), clp(rb.energia)],
    ["Mantención", clp(ra.mant), clp(rb.mant)],
    ["Seguro", clp(ra.seguro), clp(rb.seguro)],
    ["Permiso de circulación", clp(ra.permiso), clp(rb.permiso)],
  ];
  if (rend[0] || rend[1]) filas.push(["Rendimiento que supone el cálculo", rend[0] ? rend[0][1] : "sin dato", rend[1] ? rend[1][1] : "sin dato"]);
  const gana = dif === 0 ? null : dif < 0 ? a : b;
  return {
    bloque: { tipo: "tabla", verificar: false, titulo: "Costo de uso, lado a lado", subtitulo: `${P.ny} años · ${fmtNumero(P.kmAnio)} km al año`, columnas: ["", `${nombreVersion(a)} ${a.yr}`, `${nombreVersion(b)} ${b.yr}`], filas },
    diferencia: Math.abs(Math.round(dif)),
    ganador: gana,
  };
}

// La version mas reciente de una lista (a igual anio, la de menor precio): para comparar dos modelos se usa una sola version de cada uno.
function masReciente(versiones) {
  return versiones.slice().sort((a, b) => b.yr - a.yr || a.pr - b.pr)[0] || null;
}

// Versiones del TCO de un modelo: la del anio pedido o la mas reciente; si el mismo anio tiene variantes de precio distinto, hasta `max` (las de menor precio primero).
function versionesDeTco(filas, anio = null, max = 3) {
  const porTipo = new Map();
  for (const v of filas) {
    const k = `${v._clave}|${v.tokens.join(" ")}|${v.tp}`;
    if (!porTipo.has(k)) porTipo.set(k, []);
    porTipo.get(k).push(v);
  }
  const salida = [];
  for (const grupo of porTipo.values()) {
    const anios = [...new Set(grupo.map((v) => v.yr))].sort((x, y) => y - x);
    const elegido = anio && anios.includes(anio) ? anio : anios[0];
    const delAnio = grupo.filter((v) => v.yr === elegido).sort((x, y) => x.pr - y.pr);
    salida.push(...delAnio.slice(0, max));
  }
  return salida;
}

// ---- seguros --------------------------------------------------------------------------------------------------------------------------
async function datosSeguros(env) {
  const arch = await leerArchivo(env, "seguros");
  if (indices.has(arch)) return indices.get(arch);
  const matriz = arch.matriz.map((f) => Object.fromEntries(arch.matriz_campos.map((c, i) => [c, f[i]])));
  const idx = { arch, matriz, productos: arch.productos, aseguradoras: arch.aseguradoras };
  indices.set(arch, idx);
  return idx;
}

const VALOR_COBERTURA = { si: "Sí", no: "No", opcional: "Opcional", "S/I": "Sin información", parcial: "Parcial" };
return { ErrorVehiculos, vaciarMemoriaVehiculos, leerArchivo, tokens, marcaClave, PALABRAS_NO_MODELO, clp, nombreTec, quitarCantidades, indiceModelos, indiceTco, detectarMarcas, buscarModelos, reconocer, claveModelo, claveTco, sugerirPorTipografia, sinRepetidos, CAMPOS_FICHA, titulo, bloqueFicha, CAMPOS_FICHA_TCO, bloqueFichaTco, bloqueVariantes, bloquesEnlaces, calcularTCO, parametrosTCO, energiaTCO, calculable, motivoNoCalculable, notaEnchufables, tcoRedondeado, supuestosTexto, bloqueTCO, bloqueComparacion, masReciente, versionesDeTco, datosSeguros, VALOR_COBERTURA };
})();
__mod["agente_web/src/respuesta.js"] = (function () {
// Respuesta: convierte el resultado de consultar() en bloques para mostrar en el chat (sin DOM) y comprueba que ninguna cifra sea inventada.
// Todo lo que se muestra sale del resultado del conector: aqui no se calcula ninguna cifra.
const { fmtNumero } = __req("servidor/src/util.js");
const { vTxt } = __req("servidor/src/consulta.js");

const MAX_MEDIDAS = 6;
const ROTULO_DE_NIVEL = { tecnologia: "Tecnología", marca: "Marca", modelo: "Modelo", operador: "Operador", categoria: "Categoría", clase: "Clase" };

function ordenarMedidas(r) {
  const principal = r.indicador.medida_principal;
  const lista = r.medidas.slice();
  lista.sort((a, b) => (a.id === principal ? -1 : 0) - (b.id === principal ? -1 : 0));
  return lista;
}

function medidaDelRanking(r) {
  const m = /por «([a-z0-9_]+)»/.exec(r.consulta.criterio || "");
  return m ? m[1] : r.indicador.medida_principal;
}

// Bloques del resultado. Los que llevan `verificar: true` salen de cifras del conector y se comprueban contra el resultado.
function bloquesDeResultado(r) {
  const i = r.indicador;
  const med = new Map(r.medidas.map((m) => [m.id, m]));
  const filas = r.filas;
  const entidades = [...new Map(filas.map((f) => [`${f.nivel}|${f.codigo}`, f.nombre])).values()];
  const periodos = [...new Set(filas.map((f) => f.periodo))];
  const esRanking = /^ranking de los /.test(r.consulta.criterio || "");
  const bloques = [];

  if (esRanking) {
    const id = medidaDelRanking(r);
    const m = med.get(id) || { id, nombre: id, unidad: "" };
    const mayor = /mayores/.test(r.consulta.criterio);
    bloques.push({
      tipo: "ranking", verificar: true, titulo: i.nombre,
      subtitulo: `Los ${filas.length} ${mayor ? "mayores" : "menores"} según «${m.nombre}» · ${periodos.join(", ")}`,
      items: filas.map((f) => ({ nombre: f.nombre, valor: vTxt(f.valores[id], m), nota: f.etiquetas && f.etiquetas.atipica ? "comuna con flotas atípicas" : "" })),
    });
  } else if (filas.length === 1) {
    const f = filas[0];
    const ms = ordenarMedidas(r).filter((m) => f.valores[m.id] !== undefined);
    const ver = ms.slice(0, MAX_MEDIDAS);
    bloques.push({
      tipo: "cifras", verificar: true, titulo: i.nombre,
      subtitulo: `${f.nombre} · ${f.periodo}${f.granularidad ? " (" + f.granularidad + ")" : ""}`,
      filas: ver.map((m) => [m.nombre, vTxt(f.valores[m.id], m)]),
      ...(ms.length > ver.length ? { nota: "Hay más medidas publicadas; pregunta por una en particular." } : {}),
    });
  } else {
    // varias filas: una entidad en varios periodos (serie) o varias entidades (comparacion / listado)
    const ms = ordenarMedidas(r).filter((m) => filas.some((f) => f.valores[m.id] !== undefined)).slice(0, 3);
    const unaEntidad = entidades.length === 1;
    const unPeriodo = periodos.length === 1;
    const rotulo = ROTULO_DE_NIVEL[filas[0].nivel] || "Territorio";     // «Territorio» en una tabla de tecnologias o de marcas no se entiende
    const columnas = [unaEntidad ? "Período" : unPeriodo ? rotulo : `${rotulo} y período`, ...ms.map((m) => m.nombre)];
    // El período más reciente ARRIBA (pedido del usuario, 2026-10-25: «sí, el mes más reciente arriba»; vale también para los años, es la misma idea de la regla 19: lo más actualizado primero).
    // Solo cambia el orden en que se muestran las filas: las cuentas de calculos.js trabajan siempre del mes más antiguo al más nuevo y buscan cada mes por su período, no por su posición.
    // El orden es estable: con varias entidades en varios períodos quedan agrupadas por período (el más reciente primero) y, dentro de cada uno, como venían.
    const masRecienteArriba = (a, b) => (a.periodo < b.periodo ? 1 : a.periodo > b.periodo ? -1 : 0);
    const ordenadas = periodos.length > 1 ? filas.slice().sort(masRecienteArriba) : filas;
    // «de X a Y» se dice siempre del más antiguo al más nuevo, sea cual sea el orden en que llegaron o en que se muestran
    const cronologicos = [...periodos].sort();
    const subtitulo = unaEntidad ? `${entidades[0]} · ${periodos.length > 1 ? cronologicos[0] + " a " + cronologicos[cronologicos.length - 1] : periodos[0]}` : unPeriodo ? periodos[0] : "";
    const etiquetaDe = (f) => (unaEntidad ? f.periodo : unPeriodo ? f.nombre : `${f.nombre} · ${f.periodo}`);
    if (ms.length >= 3) {
      // cuatro columnas no se leen en un panel de 410 px (la tercera queda cortada): cada fila pasa a una tarjeta apilada, con su etiqueta arriba y sus cifras debajo
      bloques.push({
        tipo: "cifras", verificar: true, estilo: "lista", titulo: i.nombre, subtitulo,
        filas: ordenadas.map((f) => [etiquetaDe(f), ms.map((m) => `${m.nombre}: ${f.valores[m.id] !== undefined ? vTxt(f.valores[m.id], m) : "sin dato"}`).join(" · ")]),
      });
    } else {
      bloques.push({
        tipo: "tabla", verificar: true, titulo: i.nombre, subtitulo, columnas,
        filas: ordenadas.map((f) => [etiquetaDe(f), ...ms.map((m) => (f.valores[m.id] !== undefined ? vTxt(f.valores[m.id], m) : "sin dato"))]),
      });
    }
  }

  // Solo las notas «Ojo» propias de la consulta. NO se muestran (decisiones del usuario): el «Como se calculo» (definicion, universo, advertencias,
  // cita; 2026-10-19), el aviso «Tambien publicado, con otro universo» y la linea de fuente con su enlace (2026-10-20). El periodo de cada cifra
  // queda en el encabezado de su tarjeta o tabla.
  if (r.avisos && r.avisos.length) bloques.push({ tipo: "avisos", verificar: true, items: r.avisos.slice() });
  return bloques;
}

// ---- texto plano y comprobacion de cifras ---------------------------------------------------------------------------
function textoDeBloque(b) {
  const partes = [];
  const ag = (t) => { if (t) partes.push(String(t)); };
  ag(b.titulo); ag(b.subtitulo); ag(b.texto); ag(b.nota);
  (b.filas || []).forEach((f) => (Array.isArray(f) ? f.forEach(ag) : ag(f)));
  (b.columnas || []).forEach(ag);
  (b.items || []).forEach((x) => (typeof x === "string" ? ag(x) : Array.isArray(x) ? x.forEach(ag) : (ag(x.nombre), ag(x.valor), ag(x.nota), ag(x.texto), ag(x.desc))));
  return partes.join("\n");
}

function textoPlano(bloques, soloVerificables = false) {
  return bloques.filter((b) => !soloVerificables || b.verificar).map(textoDeBloque).join("\n");
}

// Numeros en formato chileno (1.234,5) o plano (1234.5).
// «CO2» y «H2» son nombres de gases, no cantidades: su digito no se cuenta como cifra.
const FORMULAS = /\b(CO2|H2)\b/g;

function numerosDeTexto(texto) {
  const out = [];
  for (const m of String(texto).replace(FORMULAS, " ").matchAll(/\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?/g)) out.push(Number(m[0].replace(/\./g, "").replace(",", ".")));
  return out;
}

// Claves internas de las filas de vehiculos (posicion en el archivo, palabras del nombre): no son datos y no deben servir de respaldo a ninguna cifra.
const CLAVES_INTERNAS = new Set(["tokens", "compacto"]);

function numerosPermitidos(o, acum = new Set()) {
  if (typeof o === "number" && Number.isFinite(o)) {
    acum.add(o);
    for (const n of numerosDeTexto(fmtNumero(o))) acum.add(n);   // el numero tal como se muestra (redondeado)
  } else if (typeof o === "string") numerosDeTexto(o).forEach((n) => acum.add(n));
  else if (Array.isArray(o)) o.forEach((x) => numerosPermitidos(x, acum));
  else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) if (!k.startsWith("_") && !CLAVES_INTERNAS.has(k)) numerosPermitidos(v, acum);
  return acum;
}

// Cifras que aparecen en los bloques verificables y NO salen del resultado del conector (debe ser lista vacia).
function cifrasSinRespaldo(bloques, resultado) {
  const permitidos = numerosPermitidos(resultado);
  return numerosDeTexto(textoPlano(bloques, true)).filter((n) => !permitidos.has(n));
}

// Si algo no cuadra, se muestra lo que dice el conector sin reformatear las cifras, pero sin lo que el asistente no muestra: las lineas de definicion,
// universo, advertencias, cita y fuente, y el aviso «También publicado con otra definición» con sus viñetas.
const LINEA_OMITIDA = /^(Definición|Universo|Advertencias|Cita sugerida|Fuente):/;
function bloquesDeRespaldo(textoConector) {
  const salida = [];
  let enOtraCifra = false;
  for (const linea of String(textoConector).split("\n")) {
    if (/^También publicado con otra definición:/.test(linea)) { enOtraCifra = true; continue; }
    if (enOtraCifra && linea.startsWith("• ")) continue;
    enOtraCifra = false;
    if (LINEA_OMITIDA.test(linea)) continue;
    salida.push(linea);
  }
  return [{ tipo: "texto", verificar: false, texto: salida.join("\n") }];
}
return { medidaDelRanking, bloquesDeResultado, textoDeBloque, textoPlano, numerosDeTexto, numerosPermitidos, cifrasSinRespaldo, bloquesDeRespaldo };
})();
__mod["agente_web/src/bloques.js"] = (function () {
// Piezas comunes de las respuestas del asistente por tema (vehiculos, normativa): bloques simples y la comprobacion de cifras antes de mostrar.
const { urlPublica } = __req("servidor/src/config.js");
const { cifrasSinRespaldo } = __req("agente_web/src/respuesta.js");

const texto = (t) => ({ tipo: "texto", verificar: false, texto: t });
const nota = (t) => ({ tipo: "nota", verificar: false, texto: t });
const sinDato = (t, siguientes = []) => ({ tipo: "sin_dato", bloques: [texto(t)], opciones: siguientes });

// Las pestañas de la pagina tco.html del sitio, donde se puede revisar el costo de tener un vehiculo y hacer lo que el asistente no hace. Los nombres son los de las pestañas
// y los textos resumen lo que la propia pagina dice de cada una; una prueba comprueba que cada direccion exista en el menu del sitio (ia_norm_nav.json).
const PESTANAS_TCO = {
  comparador: { texto: "Comparar EV vs combustión", href: "tco.html#comparador", desc: "Elige un eléctrico y uno a combustión, cambia kilómetros, años y precios, y mira el costo de uso año a año." },
  miVehiculo: { texto: "Desde mi vehículo", href: "tco.html#mi-vehiculo", desc: "Elige tu auto a combustión actual y mira qué eléctricos te harían ahorrar, cuánto por año y en cuántos años recuperarías la diferencia de compra." },
  recomendar: { texto: "Recomiéndame un EV", href: "tco.html#recomendar", desc: "Indica tu presupuesto y cómo usas el auto: la página ordena los eléctricos por un puntaje que combina costo total, autonomía y ajuste a tu uso." },
  solar: { texto: "Simulador solar", href: "tco.html#solar", desc: "Estima cuántos paneles solares necesitas para cargar tu eléctrico, cuánto ahorrarías frente a la red y en cuántos años se paga la inversión." },
};

// Lista de paginas (bloque `paginas`) hacia las pestañas del TCO que se pidan: es lo que el asistente muestra cuando no puede calcular algo o cuando quiere que la persona revise la cuenta.
function bloquePaginasTco(env, cuales = ["comparador"], titulo = "Para revisar el cálculo y cambiar los supuestos, abre esta página del sitio") {
  return { tipo: "paginas", verificar: false, titulo, items: cuales.map((c) => ({ texto: PESTANAS_TCO[c].texto, url: `${urlPublica(env)}/${PESTANAS_TCO[c].href}`, desc: PESTANAS_TCO[c].desc })) };
}

// Una respuesta «no puedo» que, en vez de quedarse en el rechazo, manda a la pagina del sitio donde se puede revisar.
const sinDatoConPagina = (env, t, siguientes = [], cuales = ["comparador"], titulo = undefined) => ({ tipo: "sin_dato", bloques: [texto(t), bloquePaginasTco(env, cuales, titulo)], opciones: siguientes });

// Crea la funcion que comprueba y entrega una respuesta. `marca` es la clave que queda en `depuracion` («vehiculo», «normativa»).
// `resultado` son los datos de los que salen las cifras (filas usadas, supuestos, resultado de la cuenta): ninguna cifra de un bloque `verificar` puede faltar ahi.
function crearResponder(marca) {
  return function responder({ entendi, bloques, resultado, opciones = [], siguientes = [], depuracion = {}, previo = null }, estado) {
    const sinRespaldo = cifrasSinRespaldo(bloques, resultado);
    if (sinRespaldo.length) {
      return { tipo: "sin_dato", bloques: [texto("No pude armar esa respuesta con seguridad. Prueba con otra pregunta.")], opciones: [], depuracion: { [marca]: true, sinRespaldo } };
    }
    if (previo && estado) estado.previo = previo;
    return { tipo: "respuesta", entendi, bloques, opciones, siguientes, verificacion: { ok: true, sinRespaldo: [] }, depuracion: { [marca]: true, ...depuracion } };
  };
}
return { texto, nota, sinDato, PESTANAS_TCO, bloquePaginasTco, sinDatoConPagina, crearResponder };
})();
__mod["agente_web/src/raices.js"] = (function () {
// Raiz aproximada de una palabra, la misma para la pregunta y para lo que se busca (catalogo de indicadores, normas): sin plural («buses» y «bus»,
// «regiones» y «region»), sin vocal final («cliente» y «clientes») y recortada a 8 letras («concentrada» y «concentracion» comparten raiz).
function raizEs(t) {
  let r = t;
  if (r.length > 4) {
    if (/[^aeiou]es$/.test(r)) r = r.slice(0, -2);
    else if (r.endsWith("s")) r = r.slice(0, -1);
  }
  if (r.length > 4 && /[aeo]$/.test(r)) r = r.slice(0, -1);
  return r.length > 8 ? r.slice(0, 8) : r;
}
return { raizEs };
})();
__mod["agente_web/src/normativa.js"] = (function () {
// Capa de normativa del asistente: lee los tres archivos ia_norm_*.json (normas, marco y menu del sitio), busca normas, metas, brechas y proyectos en lo que
// escribe la persona y arma las tarjetas de respuesta. No interpreta frases (eso es nlu_norm.js). Todo lo que muestra sale de esos archivos, que son copia fiel
// de lo que el sitio ya publica (normativa.html, bodegaje.html y su menu); aqui no se calcula nada.
const { norm } = __req("servidor/src/util.js");
const { urlPublica } = __req("servidor/src/config.js");
const { crearLector } = __req("agente_web/src/lector.js");
const { raizEs } = __req("agente_web/src/raices.js");
const { urlExterna } = __req("agente_web/src/enlaces.js");

class ErrorNormativa extends Error {}

const lector = crearLector({ normas: "ia_norm_normas.json", marco: "ia_norm_marco.json", nav: "ia_norm_nav.json" }, "ia-norm-v1", ErrorNormativa, "normativa");
const indices = new WeakMap();      // archivo -> indice ya armado

function vaciarMemoriaNormativa() {
  lector.vaciar();
}

const leerNorm = (env, cual) => lector.leer(env, cual);

// ---- texto -------------------------------------------------------------------------------------------------------------------------------
const tokens = (s) => norm(s).split(" ").filter(Boolean);
const capital = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const corto = (s, n) => (s && s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "").replace(/[,;:. ]+$/, "") + "…" : s || "");
function escapar(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const contiene = (q, frase) => frase !== "" && new RegExp("(^| )" + escapar(frase) + "( |$)").test(q);

// Palabras que no dicen de que trata una norma (preguntas, verbos y las propias palabras de «ley», «norma», «decreto»): se descartan antes de buscar.
const RUIDO = new Set((
  "el la los las un una unos unas de del al en con sin por para y o u a e que cual cuales cuanto cuantos como donde cuando quien quienes es son ser esta estan hay existe existen " +
  "me mi mis tu su sus lo le se mas menos muy ya si no ni sobre segun entre hacia desde hasta tambien solo todo todos toda todas cada otro otra otros otras algun alguna algunos algunas " +
  "dime dame quiero saber puedo puede pueden debo debe deben tengo tiene tienen tener hacer hace dice dicen decir habla hablan trata tratan " +
  "ley leyes norma normas normativa normativas decreto decretos reglamento reglamentos resolucion resoluciones legal legales legislacion regula regulan regulacion regulatorio regulatoria " +
  "obliga obligan obligatorio obligatoria obligatorios obligatorias obligacion obligaciones exige exigen exigencia permite permiten prohibe prohiben prohibido prohibida vigente vigentes " +
  "puedo podemos puede pueden debo debemos deben necesito necesitamos marco pagina paginas seccion menu establece establecen senala indica contempla define eso esto esa ese esos esas aquello casa casas hogar estado situacion " +
  "chile chileno chilena chilenos chilenas pais nacional oficial oficiales catalogo sitio pagina paginas " +
  "supremo exenta exento dfl ds res art articulo articulos numero nro n"
).split(" "));

// Grupos de palabras que significan lo mismo en las normas: si la pregunta trae alguna de `dispara`, se buscan tambien las de `suma` (con menos peso).
const GRUPOS_SIN = [
  { dispara: ["auto electrico", "autos electricos", "vehiculo electrico", "vehiculos electricos", "coche electrico", "coches electricos", "carro electrico", "carros electricos", "ev", "evs", "bev", "movilidad electrica"], suma: ["electromovilidad", "ev", "vehiculo"] },
  { dispara: ["cargador", "cargadores", "cargar", "cargo", "recarga", "recargar", "enchufe", "enchufes", "wallbox", "electrolinera", "electrolineras", "irve", "punto de carga", "puntos de carga", "estacion de carga", "estaciones de carga", "infraestructura de carga", "carga de autos"], suma: ["recarga", "cargador", "carga", "irve", "interoperabilidad", "ric"] },
  { dispara: ["edificio", "edificios", "condominio", "condominios", "copropiedad", "copropietarios", "comunidad", "estacionamiento", "estacionamientos", "departamento", "departamentos", "vivienda", "viviendas", "administrador"], suma: ["copropiedad", "edificio", "edificacion", "vivienda", "urbanismo", "construccion"] },
  { dispara: ["bateria", "baterias", "pila", "pilas", "litio", "bess", "reciclaje", "reciclar", "residuo", "residuos", "rep"], suma: ["bateria", "pila", "almacenamiento", "residuo", "productor", "bess"] },
  { dispara: ["patente", "patentes", "placa", "placas", "permiso de circulacion", "permisos de circulacion"], suma: ["patente", "placa", "circulacion", "permiso"] },
  { dispara: ["impuesto", "impuestos", "tributario", "tributaria", "tributos", "exencion", "exenciones", "impuesto verde", "tributacion"], suma: ["impuesto", "tributaria", "exencion", "tributario"] },
  { dispara: ["bencina", "bencinas", "gasolina", "diesel", "petroleo", "combustible", "combustibles", "parafina"], suma: ["combustible", "mepco", "bencina", "diesel"] },
  { dispara: ["tarifa", "tarifas", "precio de la luz", "cuenta de la luz", "boleta de la luz", "costo de la luz", "tarifario", "tarifaria"], suma: ["tarifa", "tarifario", "precio", "tarifaria", "estabilizacion"] },
  { dispara: ["emision", "emisiones", "contaminacion", "contaminante", "contaminantes", "euro", "humo", "calidad del aire", "ppda", "descontaminacion", "smog"], suma: ["emision", "contamina", "euro", "descontam", "atmosfer", "aire"] },
  { dispara: ["bus", "buses", "microbus", "microbuses", "taxi", "taxis", "colectivo", "colectivos", "transporte publico", "locomocion colectiva", "licitacion", "licitaciones"], suma: ["transporte", "bus", "licitaci", "publico", "taxi"] },
  { dispara: ["clima", "climatico", "cambio climatico", "carbono", "neutralidad", "ndc", "mitigacion", "adaptacion"], suma: ["climatic", "carbono", "neutrali", "ndc", "mitigaci", "adaptaci"] },
  { dispara: ["eficiencia", "etiquetado", "etiqueta", "rendimiento", "consumo energetico"], suma: ["eficienc", "etiquetad", "rendimie", "energeti"] },
  { dispara: ["generacion distribuida", "netbilling", "net billing", "paneles", "panel solar", "paneles solares", "autoconsumo", "pmgd", "inyeccion", "v2g", "vehiculo a la red"], suma: ["distribui", "netbilli", "pmgd", "generaci", "v2g", "autoconsu"] },
  { dispara: ["retrofit", "conversion", "convertir", "reconversion", "transformar", "transformacion"], suma: ["retrofit", "conversi", "electrico"] },
  { dispara: ["hidrogeno", "celda de combustible", "h2"], suma: ["hidrogen", "celda", "combustible"] },
  { dispara: ["seguridad", "instalacion", "instalaciones", "instalar", "instalador", "superintendencia", "sec", "pliego", "pliego tecnico"], suma: ["seguridad", "instalaci", "sec", "pliego"] },
  { dispara: ["transmision", "distribucion", "distribuidora", "distribuidoras", "red electrica", "sistema electrico", "lgse", "servicios electricos", "valor agregado"], suma: ["transmisi", "distribuc", "servicio", "lgse", "vad"] },
  { dispara: ["urbanismo", "construccion", "edificacion", "oguc", "permiso de edificacion"], suma: ["urbanism", "construcc", "edificac", "oguc"] },
];

// ---- indices -----------------------------------------------------------------------------------------------------------------------------
function registros(arch, campos = "campos", filas = "filas") {
  return arch[filas].map((f, i) => {
    const o = { _i: i };
    arch[campos].forEach((c, j) => { o[c] = f[j]; });
    return o;
  });
}

// Las palabras de una pregunta que dicen de que trata (sin las de relleno ni los numeros): sirven para decir «No encontre una norma sobre ...».
const palabrasClave = (q) => tokens(q).filter((t) => t.length >= 3 && !RUIDO.has(t) && !/^\d+$/.test(t));

const raices = (texto) => new Set(tokens(texto).filter((t) => t.length >= 3 && !RUIDO.has(t) && !/^\d+$/.test(t)).map(raizEs));

// Numero de una norma segun su rotulo («Ley 21.505» -> 21505, «Decreto 8T/2026» -> 8 con sufijo T, «DFL 4/20.018 (2006)» -> 4, «Instructivo 41.458/2026» -> 41458):
// es lo que escribe la gente para nombrarla («ley 21505», «decreto 114», «ds 8t»).
function numDeRotulo(rotulo) {
  const m = /(\d{1,3}(?:\.\d{3})+|\d+)([A-Za-z])?(?![A-Za-z])/.exec(String(rotulo));
  return m ? { num: Number(m[1].replace(/\./g, "")), suf: (m[2] || "").toUpperCase() } : { num: null, suf: "" };
}

async function indiceNormas(env) {
  const arch = await leerNorm(env, "normas");
  if (indices.has(arch)) return indices.get(arch);
  const filas = registros(arch).map((r) => ({
    ...r, _k: r.rotulo, ...numDeRotulo(r.rotulo), _t: ` ${tokens(`${r.nombre} ${r.rotulo}`).join(" ")} `,
    f_titulo: raices(`${r.nombre} ${r.rotulo}`), f_materia: raices(r.materia), f_org: raices(`${r.organismo} ${r.sigla}`),
    f_otros: raices(`${r.disposiciones} ${r.vacios} ${r.propuesta}`),
  }));
  const df = new Map();
  for (const r of filas) for (const t of new Set([...r.f_titulo, ...r.f_materia, ...r.f_org, ...r.f_otros])) df.set(t, (df.get(t) || 0) + 1);
  const idx = { arch, filas, df, N: filas.length };
  indices.set(arch, idx);
  return idx;
}

// Pesos por campo en que aparece la palabra: titulo 3, materia 2, organismo 1, lo demas (disposiciones, vacios, propuesta) 0,5.
function pesoDeCampo(r, t) {
  return r.f_titulo.has(t) ? 3 : r.f_materia.has(t) ? 2 : r.f_org.has(t) ? 1 : r.f_otros.has(t) ? 0.5 : 0;
}

// Palabras de la pregunta (raices, sin ruido) con peso 1 y, aparte, los grupos de sinonimos que dispara (peso 0,6, y cada grupo cuenta una sola vez: la mejor de sus palabras).
// Devuelve un Map raiz -> peso (los sinonimos llevan 0,6) con la propiedad `grupos` (lista de listas de raices) para puntuar.
function terminosDeBusqueda(q) {
  const base = new Map();
  for (const t of tokens(q)) {
    if (t.length < 3 || RUIDO.has(t) || /^\d+$/.test(t)) continue;
    base.set(raizEs(t), 1);
  }
  const grupos = [];
  for (const g of GRUPOS_SIN) {
    const activas = g.dispara.filter((f) => contiene(q, f));
    if (!activas.length) continue;
    const raicesNuevas = [];
    for (const s of g.suma) { const r = raizEs(s); if (!base.has(r)) { base.set(r, 0.6); raicesNuevas.push(r); } }
    if (!raicesNuevas.length) continue;
    // las palabras de la pregunta que activaron el grupo (su «concepto»): si una norma trae un sinonimo de ese concepto, el concepto cuenta como cubierto
    raicesNuevas.disparadas = new Set(activas.flatMap((f) => tokens(f).filter((x) => x.length >= 3 && !RUIDO.has(x)).map(raizEs)));
    grupos.push(raicesNuevas);
  }
  base.grupos = grupos;
  return base;
}

// Suma de lo que aporta cada palabra: las de la pregunta una a una y de cada grupo de sinonimos solo la que mas aporta. `aporte(raiz)` es 0 si la fila no la trae.
// `cubiertas` cuenta los conceptos de la pregunta que la fila trae: cada palabra directa, y cada grupo de sinonimos cuya palabra clave la fila no trae pero si un sinonimo
// («cargador» cubierto por «recarga»).
function sumarTerminos(terminos, aporte) {
  let total = 0, cubiertas = 0;
  const cubiertasDirectas = new Set();
  for (const [t, w] of terminos) {
    if (w !== 1) continue;
    const a = aporte(t);
    if (a) { total += a; cubiertas += 1; cubiertasDirectas.add(t); }
  }
  for (const g of terminos.grupos || []) {
    const mejor = Math.max(0, ...g.map(aporte));
    total += 0.6 * mejor;
    if (mejor > 0 && g.disparadas && ![...g.disparadas].some((t) => cubiertasDirectas.has(t))) cubiertas += 1;
  }
  return { total, cubiertas };
}

// Pares de palabras seguidas de la pregunta que son nombre o numero («euro 6», «plan nacional»): si aparecen igual en el titulo de una norma, la norma sube.
function paresDe(q) {
  const t = tokens(q).filter((x) => /^\d+$/.test(x) || !RUIDO.has(x));
  const pares = [];
  for (let i = 0; i + 1 < t.length; i++) pares.push(` ${t[i]} ${t[i + 1]} `);
  return pares;
}

// Normas que mas calzan con la pregunta: [{ n, puntaje, cubiertas }] de mayor a menor. `cubiertas` = palabras directas de la pregunta que la norma trae.
function buscarNormas(idx, q) {
  const terminos = terminosDeBusqueda(q);
  if (!terminos.size) return { terminos, directas: 0, ranking: [] };
  const directas = [...terminos.values()].filter((w) => w === 1).length;
  const pares = paresDe(q);
  const ranking = [];
  for (const r of idx.filas) {
    const { total, cubiertas } = sumarTerminos(terminos, (t) => {
      const campo = pesoDeCampo(r, t);
      return campo ? campo * Math.log(1 + idx.N / (idx.df.get(t) || 1)) : 0;
    });
    const puntaje = total + 3 * pares.filter((p) => r._t.includes(p)).length;
    if (puntaje > 0) ranking.push({ n: r, puntaje: puntaje * (r.relevancia === "alta" ? 1.12 : r.relevancia === "baja" ? 0.92 : 1), cubiertas });
  }
  ranking.sort((a, b) => b.puntaje - a.puntaje || b.n.anio - a.n.anio);
  return { terminos, directas, ranking };
}

// Familias de numero de una norma segun como la nombra la gente.
const FAMILIAS = {
  ley: (r) => r.tipo === "ley", decreto: (r) => r.tipo === "decreto", resolucion: (r) => r.tipo === "resolucion", dfl: (r) => r.tipo === "dfl", nch: (r) => r.tipo === "nch",
  ric: (r) => /^RIC /.test(r.rotulo), rgr: (r) => /^RGR /.test(r.rotulo), instructivo: (r) => /^Instructivo /.test(r.rotulo),
};

// Normas con ese numero (y esa letra y ese ano, si se dieron): `ent` = { clase, numero, sufijo, anio }.
function normasPorNumero(idx, ent) {
  const familia = FAMILIAS[ent.clase];
  if (!familia) return [];
  return idx.filas.filter((r) => familia(r) && r.num === ent.numero && (!ent.sufijo || r.suf === ent.sufijo.toUpperCase()) && (!ent.anio || r.anio === ent.anio));
}

// Clave de la fila: el rotulo («Ley 21.505») no cambia con el orden de los archivos.
const claveNorma = (r) => r._k;
function normaPorRef(idx, ref) {
  if (ref.k) return idx.filas.find((r) => r._k === ref.k) || null;
  return idx.filas.find((r) => r._i === ref.i) || null;
}

// ---- marco: metas, brechas, proyectos y bodegaje ---------------------------------------------------------------------------------------
async function datosMarco(env) {
  const arch = await leerNorm(env, "marco");
  if (indices.has(arch)) return indices.get(arch);
  const metas = registros(arch, "metas_campos", "metas").map((r) => ({ ...r, f: raices(`${r.meta} ${r.documento} ${r.unidad}`) }));
  const brechas = registros(arch, "brechas_campos", "brechas").map((r) => ({ ...r, f: raices(`${r.brecha} ${r.instrumento} ${r.detalle} ${r.via}`) }));
  const monitoreo = registros(arch, "monitoreo_campos", "monitoreo").map((r) => ({ ...r, f: raices(r.item) }));
  const idx = { arch, metas, brechas, monitoreo };
  indices.set(arch, idx);
  return idx;
}

// Filas de una tabla pequena que calzan con los terminos de la pregunta, de mas a menos (sin umbral: la persona ya pidio ese tema).
function filasQueCalzan(filas, terminos) {
  const df = new Map();
  for (const r of filas) for (const t of r.f) df.set(t, (df.get(t) || 0) + 1);
  const out = [];
  for (const r of filas) {
    const { total } = sumarTerminos(terminos, (t) => (r.f.has(t) ? Math.log(1 + filas.length / (df.get(t) || 1)) : 0));
    if (total > 0) out.push({ r, p: total });
  }
  return out.sort((a, b) => b.p - a.p).map((x) => x.r);
}

const ORDEN_URGENCIA = { maxima: 0, alta: 1, media: 2, baja: 3 };

// ---- menu del sitio ----------------------------------------------------------------------------------------------------------------------
async function datosNav(env) {
  return await leerNorm(env, "nav");
}

// Paginas recomendadas para uno o varios temas: [{ texto, url, desc }]. Se toma la primera de cada tema, luego la segunda de cada uno, y asi hasta `max` (sin repetir),
// para que un tema no tape a los demas. Si el menu no trae un tema, simplemente no aporta paginas.
function paginasDeTemas(env, nav, temas, max = 4) {
  const porHref = new Map(nav.paginas.map((p) => [p.href, p]));
  const listas = temas.map((t) => nav.temas[t] || []);
  const hrefs = [];
  for (let k = 0; hrefs.length < max && listas.some((l) => k < l.length); k++) {
    for (const l of listas) if (k < l.length && !hrefs.includes(l[k]) && hrefs.length < max) hrefs.push(l[k]);
  }
  return hrefs.map((h) => porHref.get(h)).filter(Boolean).map((p) => ({ texto: p.etiqueta, url: `${urlPublica(env)}/${p.href}`, desc: corto(p.descripcion, 130) }));
}

// Paginas del menu que se parecen a lo que se pregunta (por el nombre de la pagina o su descripcion): sirve cuando el asistente no tiene el dato pero el sitio si tiene una
// pagina del tema («que es el PELP» -> «Chile vs PELP»). Solo se recomiendan las que calzan bien; si ninguna lo hace, la lista queda vacia.
function paginasParecidas(env, nav, q, max = 3) {
  const t = [...new Set(tokens(q).filter((x) => x.length >= 3 && !RUIDO.has(x) && !/^\d+$/.test(x)).map(raizEs))];
  if (!t.length) return [];
  const docs = nav.paginas.map((p) => ({ p, tit: raices(`${p.etiqueta} ${p.titulo}`), desc: raices(p.descripcion) }));
  const df = new Map();
  for (const d of docs) for (const s of new Set([...d.tit, ...d.desc])) df.set(s, (df.get(s) || 0) + 1);
  const vistas = new Set();
  const buenas = [];
  for (const d of docs) {
    let puntaje = 0, enTitulo = 0, total = 0, rara = false;
    for (const s of t) {
      const idf = Math.log(1 + docs.length / (df.get(s) || 1));
      if (d.tit.has(s)) { puntaje += 3 * idf; enTitulo += 1; total += 1; } else if (d.desc.has(s)) { puntaje += idf; total += 1; }
      if ((d.tit.has(s) || d.desc.has(s)) && df.get(s) === 1) rara = true;       // una palabra que solo esa pagina trae («subestaciones»)
    }
    // calza si una palabra esta en el nombre de la pagina, o si trae dos palabras de la pregunta, o una sola pero que ninguna otra pagina tiene
    if (((enTitulo >= 1 && puntaje >= 5) || (total >= 2 && puntaje >= 5) || (rara && puntaje >= 3.7)) && !vistas.has(d.p.descripcion)) {
      vistas.add(d.p.descripcion);       // varias entradas del menu apuntan a la misma pagina con la misma descripcion (tco.html#...): se muestra una
      buenas.push({ d, puntaje });
    }
  }
  buenas.sort((a, b) => b.puntaje - a.puntaje);
  // solo las que calzan casi tan bien como la mejor (no se rellena con paginas que solo comparten una palabra suelta)
  const tope = buenas.length ? buenas[0].puntaje : 0;
  return buenas.filter((x) => x.puntaje >= 0.6 * tope).slice(0, max).map(({ d }) => ({ texto: d.p.etiqueta, url: `${urlPublica(env)}/${d.p.href}`, desc: corto(d.p.descripcion, 130) }));
}

// ---- tarjetas ----------------------------------------------------------------------------------------------------------------------------
const filaDato = (etiqueta, valor) => (valor === null || valor === undefined || valor === "" ? null : [etiqueta, valor]);
const importancia = (r) => capital(r.relevancia);

// Una norma: que regula, importancia segun el sitio y, si se pide, sus disposiciones clave.
function bloqueNorma(r, { completo = false } = {}) {
  const generico = r.nombre === r.materia || r.materia.startsWith(r.nombre.replace(/…$/, ""));
  return {
    tipo: "cifras", verificar: true, estilo: "texto", titulo: r.rotulo,
    subtitulo: [generico ? "" : r.nombre, r.organismo, String(r.anio)].filter(Boolean).join(" · "),
    filas: [
      filaDato("Qué regula", r.materia),
      filaDato("Importancia para la electromovilidad (según el sitio)", importancia(r)),
      completo ? filaDato("Disposiciones clave", r.disposiciones) : null,
    ].filter(Boolean),
  };
}

// Lo que le falta a una norma: es el analisis del sitio, no texto oficial.
function bloqueVacios(r) {
  return {
    tipo: "cifras", verificar: true, estilo: "texto", titulo: `Qué le falta a ${r.rotulo}`, subtitulo: "Análisis del sitio, no texto oficial",
    filas: [filaDato("Vacíos que identifica el sitio", r.vacios), filaDato("Propuesta de actualización del sitio", r.propuesta)].filter(Boolean),
  };
}

// Enlace al documento (externo y de la lista de sitios); las normas chilenas (NCh) se citan sin enlace por derechos de autor.
function etiquetaDocumento(url) {
  const host = new URL(url).hostname;
  if (host === "www.bcn.cl") return "Abrir el texto en la Biblioteca del Congreso Nacional";
  if (host === "drive.google.com") return "Abrir el documento (copia en la biblioteca del sitio)";
  return "Abrir el documento";
}

function bloquesDocumento(r) {
  const url = r.url ? urlExterna(r.url) : null;
  if (url) return [{ tipo: "enlace", texto: etiquetaDocumento(url), url, externo: true }];
  if (r.tipo === "nch") return [{ tipo: "nota", verificar: false, texto: "Esta norma chilena (NCh) tiene derechos de autor: el sitio la cita, pero no la enlaza." }];
  return [];
}

// Lo que SI se enlaza de una NCh: el decreto publico que la hace obligatoria (decision del usuario, 2026-10-21). `decretos` son filas del mismo catalogo (las que nombra el campo
// `obligatoria_por` de la norma) y cada una lleva su propio enlace, de la lista de sitios; nunca se enlaza el texto de la NCh.
function etiquetaDecreto(rotulo, url) {
  const host = new URL(url).hostname;
  if (host === "www.bcn.cl") return `Abrir ${rotulo} en la Biblioteca del Congreso Nacional`;
  if (host === "drive.google.com") return `Abrir ${rotulo} (copia en la biblioteca del sitio)`;
  return `Abrir ${rotulo}`;
}

function bloquesDecretos(r, decretos) {
  if (!decretos.length) return [];
  const out = [{ tipo: "texto", verificar: false, texto: decretos.length === 1 ? "Es obligatoria por este decreto, que sí puedes abrir:" : "Es obligatoria por estos decretos, que sí puedes abrir:" }];
  for (const d of decretos) {
    const url = d.url ? urlExterna(d.url) : null;
    out.push(url ? { tipo: "enlace", texto: etiquetaDecreto(d.rotulo, url), url, externo: true } : { tipo: "nota", verificar: false, texto: `El catálogo no trae el documento de ${d.rotulo}.` });
  }
  return out;
}

// Lista corta de normas: cada una con su rotulo en negrita y debajo organismo, ano e importancia (apilada: en el panel angosto una tabla de cuatro columnas no se lee).
function bloqueLista(filas, { titulo, subtitulo }) {
  return {
    tipo: "cifras", verificar: true, estilo: "lista", titulo, subtitulo,
    filas: filas.map((r) => [`${r.rotulo}${r.nombre && !r.materia.startsWith(r.nombre.replace(/…$/, "")) ? " · " + corto(r.nombre, 70) : ""}`, `${r.sigla || r.organismo} · ${String(r.anio)} · Importancia ${importancia(r)}`]),
  };
}

// Paginas del sitio que pueden servir para profundizar (se dibujan como lista de enlaces).
function bloquePaginas(paginas, titulo = "Para profundizar, estas páginas del sitio pueden servirte") {
  return paginas.length ? { tipo: "paginas", verificar: false, titulo, items: paginas } : null;
}
return { ErrorNormativa, vaciarMemoriaNormativa, leerNorm, tokens, contiene, palabrasClave, indiceNormas, terminosDeBusqueda, paresDe, buscarNormas, normasPorNumero, claveNorma, normaPorRef, datosMarco, filasQueCalzan, ORDEN_URGENCIA, datosNav, paginasDeTemas, paginasParecidas, importancia, bloqueNorma, bloqueVacios, etiquetaDocumento, bloquesDocumento, etiquetaDecreto, bloquesDecretos, bloqueLista, bloquePaginas };
})();
__mod["agente_web/src/dialogo_veh.js"] = (function () {
// Respuestas del asistente sobre vehiculos: arma las tarjetas segun la intencion que dejo nlu_veh.js. Cada respuesta se comprueba antes de mostrarse:
// ninguna cifra puede faltar en los datos usados (o, en el TCO, en el resultado de la cuenta). Si algo no calza, no se muestra.
const { bloquePaginasTco, crearResponder, nota, sinDato, sinDatoConPagina, texto } = __req("agente_web/src/bloques.js");
const { CAMPOS_FICHA, CAMPOS_FICHA_TCO, VALOR_COBERTURA, bloqueComparacion, bloqueFicha, bloqueFichaTco, bloqueTCO, bloqueVariantes, bloquesEnlaces, calcularTCO, calculable, clp, datosSeguros, energiaTCO, indiceModelos, indiceTco, claveModelo, claveTco, leerArchivo, marcaClave, masReciente, motivoNoCalculable, nombreTec, notaEnchufables, parametrosTCO, reconocer, sinRepetidos, supuestosTexto, tcoRedondeado, titulo, versionesDeTco } = __req("agente_web/src/vehiculos.js");
const { fmtNumero, norm } = __req("servidor/src/util.js");

const chip = (etiqueta, vehiculo) => ({ etiqueta, accion: { vehiculo } });
// Los botones llevan una clave estable del modelo ademas de su posicion en el archivo: si el sitio publica datos nuevos entre que se muestra el boton y se toca
// (la conversacion se guarda al cambiar de pagina), la posicion podria apuntar a otro vehiculo; con la clave se encuentra el mismo modelo o se avisa.
const refM = (r) => ({ i: r._i, k: claveModelo(r) });
const refT = (vs) => ({ tcoIds: vs.map((v) => v._i), tcoK: vs.map(claveTco) });
const refParT = (a, b) => ({ ids: [a._i, b._i], ks: [claveTco(a), claveTco(b)] });
const refPar = (a, b) => ({ ids: [a._i, b._i], ks: [claveModelo(a), claveModelo(b)] });

// Las preguntas armadas no nombran marcas ni modelos (decision del usuario, 2026-10-22): la persona escribe la marca o el modelo despues de elegir una (previo.pedirVehiculo).
const EJEMPLOS_VEHICULOS = [
  "Revisa la autonomía de los vehículos",
  "Revisa el costo de tener un vehículo",
  "Los 5 eléctricos con más autonomía",
  "¿Qué seguros cubren la batería de un auto eléctrico?",
];
const preguntaChip = (p) => ({ etiqueta: p, accion: { pregunta: p } });

// Comprueba y entrega. `resultado` son los datos de los que salen las cifras (filas usadas, supuestos, resultado de la cuenta).
const responder = crearResponder("vehiculo");

function notasDeCoincidencia(sinCubrir, filas) {
  const out = [];
  if (sinCubrir && sinCubrir.length) out.push(nota(`Te muestro «${titulo(filas[0])}»; no encontré «${sinCubrir.join(" ")}» en el nombre de ese modelo.`));
  return out;
}

const nombreExacto = (r) => titulo(r);

// ---- ficha -------------------------------------------------------------------------------------------------------------------------------
function siguientesDeModelo(r) {
  const s = [];
  if (r.en_tco) s.push(chip(`Costo de tener un ${nombreExacto(r)}`, { intencion: "tco", ...refM(r) }));
  if (r.rescate) s.push(chip(`Ficha de rescate de ${nombreExacto(r)}`, { intencion: "rescate", ...refM(r) }));
  s.push(chip(`Seguro de ${nombreExacto(r)}`, { intencion: "seguro_modelo", ...refM(r) }));
  return s.slice(0, 3);
}

// El padron no trae rendimiento, autonomia, bateria ni CO2 de todos los modelos; si se pidio alguno que falta y el modelo esta enlazado con los datos de costo (TCO),
// se muestra lo que el TCO publica para las versiones de ese modelo, con su nombre (puede haber varias con cifras distintas).
async function complementoDesdeTco(env, r, campos) {
  const pedidos = campos.filter((c) => ["rendimiento", "autonomia", "bateria", "co2"].includes(c) && !CAMPOS_FICHA[c](r));
  if (!pedidos.length || !r.modelo_id) return null;
  const tco = await indiceTco(env);
  const versiones = versionesDeTco(tco.filas.filter((v) => v.mid === r.modelo_id), null, 1).slice(0, 4);
  const filas = [];
  const usadas = [];
  for (const v of versiones) {
    const valores = pedidos.map((c) => CAMPOS_FICHA_TCO[c](v)).filter(Boolean);
    if (!valores.length) continue;
    usadas.push(v);
    filas.push([`${titulo(v)} ${v.yr} (${nombreTec(v.tp).replace(/\s*\(.*\)$/, "").toLowerCase()})`, valores.map((x) => `${x[0].toLowerCase()} ${x[1]}`).join(" · ")]);
  }
  if (!filas.length) return null;
  return { bloque: { tipo: "cifras", verificar: true, titulo: "Según los datos de costo (TCO) del sitio", subtitulo: `Versiones de ${titulo(r)} que trae esa sección`, filas }, usadas };
}

const notaParecido = (interp, filas) => (interp.nivel === "parecido" && filas.length ? [nota(`No encontré un modelo llamado exactamente «${interp.escrito || "eso"}»; te muestro «${titulo(filas[0])}», que es lo más parecido y puede ser otro modelo.`)] : []);

// Piden algo que no se puede dar con un modelo que solo "se parece" (ficha de rescate, etiqueta, seguro): se pregunta cual es.
function preguntarCual(interp, filas) {
  return sinDato(`No encontré un modelo llamado exactamente «${interp.escrito || "eso"}». ¿Te refieres a alguno de estos?`, filas.slice(0, 4).map((r) => chip(nombreExacto(r), { intencion: interp.intencion, ...refM(r) })));
}

async function ficha(env, interp, estado) {
  const filas = interp.filas.slice(0, interp.nivel === "variantes" || interp.nivel === "parecido" ? 12 : 3);
  if (!filas.length) return sinDato("No encontré ese modelo en el padrón de vehículos electrificados.");
  if ((interp.nivel === "variantes" || interp.nivel === "parecido") && filas.length > 1) {
    const bloques = [bloqueVariantes(filas, 8)];
    const resultado = { filas, meta: { mostrados: Math.min(filas.length, 8), total: filas.length } };
    const opciones = filas.slice(0, 4).map((r) => chip(nombreExacto(r), { intencion: "ficha", ...refM(r) }));
    bloques[0].subtitulo = filas.length > 8 ? `Los 8 primeros de ${filas.length}` : `${filas.length} modelos`;
    const entendi = interp.nivel === "parecido" ? `Entendí tu pregunta como: modelos que se parecen a «${interp.escrito}»` : `Entendí tu pregunta como: modelos de ${interp.marca || "vehículos"} que calzan con lo que escribiste`;
    return responder({ entendi, bloques: [...bloques, texto("¿Cuál quieres ver? Toca uno o escribe el nombre completo.")], resultado, opciones, depuracion: { intencion: "ficha", n: filas.length } }, estado);
  }
  const campos = interp.campos || [];
  const bloques = [];
  const unicos = filas;
  for (const r of unicos) bloques.push(bloqueFicha(r, campos, interp.soloCampos));
  const extra = unicos.length === 1 ? siguientesDeModelo(unicos[0]) : [];
  if (interp.soloCampos && unicos.length === 1) extra.unshift(chip(`Ficha completa de ${nombreExacto(unicos[0])}`, { intencion: "ficha", ...refM(unicos[0]), completa: true }));
  const faltan = interp.faltantes && interp.faltantes.length ? [nota(`No tengo ${interp.faltantes.join(" ni ")} de este modelo entre los datos del sitio. Esto es lo que sí tengo:`)] : [];
  const aviso = [...notaParecido(interp, unicos), ...notasDeCoincidencia(interp.sinCubrir, unicos), ...faltan];
  const comp = unicos.length === 1 && campos.length ? await complementoDesdeTco(env, unicos[0], campos) : null;
  return responder({
    entendi: `Entendí tu pregunta como: ficha de ${unicos.map(nombreExacto).join(" y ")}`, bloques: [...aviso, ...bloques, ...(comp ? [comp.bloque] : [])], resultado: { filas: unicos, tco: comp ? comp.usadas : [] },
    siguientes: extra.slice(0, 3), depuracion: { intencion: "ficha", campos }, previo: { vehiculo: { i: unicos[0]._i } },
  }, estado);
}

// ---- rescate y etiqueta ------------------------------------------------------------------------------------------------------------
async function rescateOEtiqueta(env, interp, estado) {
  const quiere = interp.intencion === "rescate" ? { rescate: true, etiqueta: false } : { rescate: false, etiqueta: true };
  const arch = await leerArchivo(env, "modelos");
  if (!interp.filas.length) {
    const m = arch.meta;
    const t = quiere.rescate
      ? `La ficha de rescate es la hoja que usan bomberos y equipos de emergencia para actuar con seguridad ante un vehículo eléctrico. El padrón trae ficha de rescate de ${fmtNumero(m.n_rescate)} de ${fmtNumero(m.total)} modelos.`
      : `El padrón marca ${fmtNumero(m.n_cit)} de ${fmtNumero(m.total)} modelos como certificados en Chile (con CIT), y varios traen su etiqueta de eficiencia energética oficial.`;
    // sin ejemplos con marcas: se pide la marca o el modelo y lo que la persona escriba despues completa la pregunta (previo.pedirVehiculo)
    return responder({
      entendi: `Entendí tu pregunta como: ${quiere.rescate ? "fichas de rescate" : "etiqueta y certificado"}`, bloques: [{ tipo: "texto", verificar: true, texto: t }, texto(`¿De qué vehículo? Escribe la marca o el modelo y te muestro ${quiere.rescate ? "su ficha de rescate" : "su etiqueta y certificado"}.`)], resultado: { meta: m },
      previo: { pedirVehiculo: interp.intencion }, depuracion: { intencion: interp.intencion, sinModelo: true },
    }, estado);
  }
  const filas = interp.filas.slice(0, 3);
  const bloques = [];
  for (const r of filas) bloques.push(...bloquesEnlaces(r, quiere));
  if (quiere.rescate && bloques.some((b) => b.tipo === "enlace")) bloques.push(nota("La ficha de rescate es la hoja que usan los equipos de emergencia (bomberos, rescate) para actuar con seguridad ante el vehículo."));
  return responder({
    entendi: `Entendí tu pregunta como: ${quiere.rescate ? "ficha de rescate" : "etiqueta de eficiencia"} de ${filas.map(nombreExacto).join(" y ")}`,
    bloques: [...notasDeCoincidencia(interp.sinCubrir, filas), ...bloques], resultado: { filas }, siguientes: siguientesDeModelo(filas[0]).filter((s) => s.accion.vehiculo.intencion !== interp.intencion),
    depuracion: { intencion: interp.intencion }, previo: { vehiculo: { i: filas[0]._i } },
  }, estado);
}

// ---- seguros -----------------------------------------------------------------------------------------------------------------------
async function seguroDeModelo(env, interp, estado) {
  const filas = interp.filas.slice(0, 2);
  const tco = await indiceTco(env);
  const bloques = [];
  for (const r of filas) {
    const t = versionesDeTco(reconocer(tco, norm(titulo(r))).filas, null, 1)[0];
    const filasCard = [CAMPOS_FICHA.seguro(r)];
    if (t && t.sg) filasCard.push(["Seguro anual que supone el TCO del sitio", clp(t.sg)]);
    bloques.push({ tipo: "cifras", verificar: true, titulo: `Seguro de ${titulo(r)}`, subtitulo: nombreTec(r.tec), filas: filasCard.filter(Boolean), _tco: t ? t.sg : null });
  }
  const resultado = { filas, tco: bloques.map((b) => b._tco) };
  for (const b of bloques) delete b._tco;
  return responder({
    entendi: `Entendí tu pregunta como: seguro de ${filas.map(nombreExacto).join(" y ")}`,
    bloques: [...bloques, nota("Las primas son referenciales, no cotizaciones.")], resultado,
    siguientes: [{ etiqueta: "¿Qué aseguradoras tienen seguro para eléctricos?", accion: { pregunta: "¿Qué aseguradoras tienen seguro para eléctricos?" } }],
    depuracion: { intencion: "seguro_modelo" }, previo: { vehiculo: { i: filas[0]._i } },
  }, estado);
}

// Nombres cortos de las coberturas (los de la matriz vienen sin tildes y con explicaciones largas); si aparece una nueva, se usa el texto de la matriz.
const NOMBRE_COBERTURA = {
  bateria_hv: "Batería de alta tensión", degradacion_bateria: "Degradación de la batería", cable_cargador_portatil: "Cable o cargador portátil",
  wallbox_domicilio: "Cargador domiciliario (wallbox)", carga_publica: "Daños durante la carga pública", asistencia_descarga: "Asistencia por batería descargada",
  incendio_origen_electrico: "Incendio de origen eléctrico", software_actualizaciones: "Software y actualizaciones", danos_propios: "Daños propios",
  perdida_total: "Pérdida total", robo_hurto: "Robo o hurto", rc_danos_terceros: "Responsabilidad civil por daños a terceros",
  rc_lesiones_muerte: "Responsabilidad civil por lesiones o muerte", danos_naturaleza: "Riesgos de la naturaleza", actos_maliciosos: "Actos maliciosos",
  incendio: "Incendio", cristales: "Cristales", neumaticos_llantas: "Neumáticos y llantas", asistencia_grua: "Asistencia en ruta y grúa",
  vehiculo_reemplazo: "Vehículo de reemplazo", auto_nuevo_perdida_total: "Auto nuevo en pérdida total", taller_marca: "Taller de la marca", conductor_habitual: "Conductor habitual",
};
const etiquetaCobertura = (seg, id) => NOMBRE_COBERTURA[id] || String((seg.arch.coberturas_ev[id] || seg.arch.coberturas_base[id] || id)).split(":")[0];
const cortar = (s, n = 90) => (s && s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s || "");
const CUBRE = ["si", "opcional", "parcial"];
// «S/I» es «sin informacion» en la matriz; un limite vacio tambien se dice
const limiteTexto = (l) => (!l || l === "S/I" ? "sin dato" : cortar(l, 40));
// Tipos de plan tal como los trae la matriz (sin tildes en el origen): se muestran con ellas; lo que no se conoce se deja igual.
const TIPOS_PLAN = { "Perdida total": "Pérdida total", Generico: "Genérico", "EV especifico": "Específico para eléctricos", "RC basico": "Responsabilidad civil básica", "Antiguos 13-20 anios": "Autos de 13 a 20 años" };
const tipoPlan = (t) => (t ? TIPOS_PLAN[t] || t : "sin dato");

// Coberturas de eléctricos que al menos un producto confirma: sirven de sugerencias para seguir preguntando.
function coberturasConfirmadas(seg) {
  return Object.keys(seg.arch.coberturas_ev).filter((c) => seg.matriz.some((m) => m.cobertura === c && CUBRE.includes(m.incluida)));
}
const chipCobertura = (seg, c) => ({ etiqueta: `¿Qué seguros cubren «${etiquetaCobertura(seg, c).toLowerCase()}»?`, accion: { pregunta: `¿Qué seguros cubren ${etiquetaCobertura(seg, c).toLowerCase()}?` } });

async function segurosMercado(env, interp, estado) {
  const seg = await datosSeguros(env);
  const por = new Map(seg.productos.map((p) => [p.id, p]));
  // 1. cobertura concreta: que productos la cubren
  if (interp.coberturas && interp.coberturas.length) {
    const bloques = [];
    const usados = [];
    const meta = [];
    for (const c of interp.coberturas.slice(0, 2)) {
      const filas = seg.matriz.filter((m) => m.cobertura === c);
      const cubren = filas.filter((m) => CUBRE.includes(m.incluida)).sort((a, b) => (a.incluida === "si" ? 0 : 1) - (b.incluida === "si" ? 0 : 1));
      usados.push(...filas);
      if (!cubren.length) {
        const sinInfo = filas.filter((m) => m.incluida === "S/I").length;
        const excluyen = filas.filter((m) => m.incluida === "no").length;
        const total = seg.productos.length;
        const detalle = filas.length ? `de los ${total} productos de la matriz, ${filas.length} la registran y ninguno la confirma (${sinInfo} figuran «sin información»${excluyen ? ` y ${excluyen} la excluyen` : ""})` : `la matriz no la registra en ninguno de los ${total} productos`;
        meta.push({ cobertura: c, total, registradas: filas.length, sinInfo, excluyen });
        bloques.push({ tipo: "texto", verificar: true, texto: `Ningún producto confirma la cobertura «${etiquetaCobertura(seg, c)}»: ${detalle}. «Sin información» significa que la fuente no lo dice; no es lo mismo que «no cubre», así que conviene consultarlo con la aseguradora.` });
        continue;
      }
      bloques.push({
        tipo: "tabla", verificar: true, titulo: `Seguros que cubren «${etiquetaCobertura(seg, c)}»`, subtitulo: `Productos con cobertura incluida u opcional`,
        columnas: ["Producto", "Aseguradora", "Cobertura", "Límite"],
        filas: cubren.slice(0, 10).map((m) => { const p = por.get(m.producto); return [p ? cortar(p.nombre, 48) : m.producto, p ? p.aseguradora : "", VALOR_COBERTURA[m.incluida] || m.incluida, limiteTexto(m.limite)]; }),
      });
    }
    const otras = coberturasConfirmadas(seg).filter((c) => !interp.coberturas.includes(c)).slice(0, 3);
    return responder({
      entendi: "Entendí tu pregunta como: seguros y coberturas para vehículos eléctricos", bloques: [...bloques, nota("«Sin información» significa que la fuente no lo menciona; no es lo mismo que «no cubre». Las primas y coberturas son las que publican las aseguradoras y el depósito de pólizas de la CMF.")],
      resultado: { matriz: usados, productos: seg.productos, meta }, siguientes: otras.map((c) => chipCobertura(seg, c)), depuracion: { intencion: "seguros", coberturas: interp.coberturas },
    }, estado);
  }
  // 2. un producto: sus coberturas para vehiculos electricos
  if (interp.producto) {
    const p = interp.producto;
    const filas = Object.keys(seg.arch.coberturas_ev).map((c) => {
      const m = seg.matriz.find((x) => x.producto === p.id && x.cobertura === c);
      return [etiquetaCobertura(seg, c), m ? VALOR_COBERTURA[m.incluida] || m.incluida : "Sin información"];
    });
    const datos = [["Aseguradora", p.aseguradora], ["Tipo de plan", tipoPlan(p.tipo)]];
    if (p.prima_ref && p.prima_ref !== "S/I") datos.push(["Prima mensual de referencia", clp(Number(p.prima_ref))]);
    if (p.deducibles && p.deducibles !== "S/I") datos.push(["Deducibles (UF)", p.deducibles]);
    return responder({
      entendi: `Entendí tu pregunta como: seguro «${p.nombre}»`,
      bloques: [
        { tipo: "cifras", verificar: true, titulo: p.nombre, subtitulo: "Producto de la matriz de coberturas", filas: datos },
        { tipo: "tabla", verificar: true, titulo: "Coberturas para vehículos eléctricos", subtitulo: "Lo que publica la matriz", columnas: ["Cobertura", "Incluida"], filas },
        nota("«Sin información» significa que la fuente no lo menciona; no es lo mismo que «no cubre»."),
      ],
      resultado: { producto: p, matriz: seg.matriz.filter((m) => m.producto === p.id) }, depuracion: { intencion: "seguros", producto: p.id },
    }, estado);
  }
  // 3. una aseguradora: sus productos
  if (interp.aseguradora) {
    const a = interp.aseguradora;
    const productos = seg.productos.filter((p) => p.aseg_id === a.id);
    return responder({
      entendi: `Entendí tu pregunta como: seguros de ${a.nombre}`,
      bloques: [
        { tipo: "tabla", verificar: true, titulo: a.nombre, subtitulo: a.oferta_ev ? "Tiene un producto específico para vehículos eléctricos" : "No tiene un producto específico para vehículos eléctricos", columnas: ["Producto", "Tipo", "Prima mensual ref."], filas: productos.map((p) => [cortar(p.nombre, 48), tipoPlan(p.tipo), p.prima_ref && p.prima_ref !== "S/I" ? clp(Number(p.prima_ref)) : "sin dato"]) },
        nota("Las primas son referenciales públicas, no cotizaciones."),
      ],
      resultado: { aseguradora: a, productos }, depuracion: { intencion: "seguros", aseguradora: a.id },
    }, estado);
  }
  // 4. general: quienes tienen oferta especifica para electricos
  const delEv = seg.productos.find((p) => /\bEV\b/i.test(p.tipo || ""));
  const sugerencias = coberturasConfirmadas(seg).slice(0, 2).map((c) => chipCobertura(seg, c));
  if (delEv) sugerencias.push({ etiqueta: `¿Qué cubre el ${delEv.nombre}?`, accion: { pregunta: `¿Qué cubre el ${delEv.nombre}?` } });
  return responder({
    entendi: "Entendí tu pregunta como: seguros para vehículos eléctricos",
    bloques: [
      { tipo: "tabla", verificar: true, titulo: "Aseguradoras y seguros específicos para vehículos eléctricos", subtitulo: "Matriz de seguros y coberturas", columnas: ["Aseguradora", "Producto específico para EV"], filas: seg.aseguradoras.map((a) => [a.nombre, a.oferta_ev ? "Sí" : "No"]) },
      nota("Que una aseguradora no tenga un producto específico no significa que no asegure eléctricos: el seguro automotriz corriente también se contrata para ellos. Pregúntame por una cobertura, por ejemplo «¿qué seguros cubren la batería?», o por el seguro de un modelo escribiendo «seguro de» y su marca y modelo."),
    ],
    resultado: { aseguradoras: seg.aseguradoras }, siguientes: sugerencias, depuracion: { intencion: "seguros" },
  }, estado);
}

// ---- TCO --------------------------------------------------------------------------------------------------------------------------
// El modelo pedido no esta en los datos de costo: se dice, y se ofrecen su ficha (si esta en el padron) y los modelos de la misma marca que si tienen costo.
// `semejantes`: versiones del TCO que solo se parecen al nombre pedido («GR Yaris» para «Yaris»); se ofrecen, no se calculan.
async function tcoSinModelo(env, interp, idx, semejantes = []) {
  const pad = (interp.filasPadron || [])[0];
  const clave = pad ? pad._clave : interp.marca ? marcaClave(interp.marca) : null;
  const porModelo = (filas) => {
    const m = new Map();
    for (const v of filas) {
      const k = `${v._clave}|${v.tokens.join(" ")}`;
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(v);
    }
    return [...m.values()];
  };
  const peso = (tp) => (tp === "BEV" ? 0 : tp === "PHEV" || tp === "EREV" || tp === "FCEV" ? 1 : tp === "ICE" ? 3 : 2);
  const ordenar = (grupos) => grupos.sort((a, b) => peso(a[0].tp) - peso(b[0].tp) || titulo(a[0]).localeCompare(titulo(b[0]), "es"));
  const parecidos = ordenar(porModelo(semejantes)).slice(0, 3);
  const mismaMarca = ordenar(porModelo(clave ? idx.filas.filter((v) => v._clave === clave) : [])).slice(0, 3);
  const opciones = [];
  const chipTco = (g) => chip(`Costo de tener un ${titulo(g[0])}`, { intencion: "tco", ...refT(versionesDeTco(g, null, 1)) });
  let t;
  if (parecidos.length) {
    parecidos.forEach((g) => opciones.push(chipTco(g)));
    if (pad) opciones.push(chip(`Ficha de ${nombreExacto(pad)}`, { intencion: "ficha", ...refM(pad) }));
    t = `No encontré «${interp.escritoTco || interp.escrito || "ese modelo"}» con ese nombre exacto en los datos de costo (TCO) del sitio. Lo más parecido es otro modelo; si es el que buscas, tócalo:`;
  } else {
    if (pad) opciones.push(chip(`Ficha de ${nombreExacto(pad)}`, { intencion: "ficha", ...refM(pad) }));
    mismaMarca.forEach((g) => opciones.push(chipTco(g)));
    const marca = interp.marca ? ` de ${interp.marca}` : "";
    t = pad
      ? `El «${titulo(pad)}» está en el padrón, pero el sitio todavía no calcula su costo de tener (TCO)${mismaMarca.length ? `; de ${pad.marca} sí lo tengo para otros modelos.` : "."}`
      : `No encontré ese modelo${marca} en los datos de costo (TCO) del sitio.${mismaMarca.length ? ` De ${interp.marca} sí tengo otros modelos, por ejemplo:` : " Prueba con el nombre completo: la marca y el modelo."}`;
  }
  // si el asistente no puede darlo, se dice en que pagina se puede revisar: la calculadora lista los vehiculos por marca, modelo y año
  return sinDatoConPagina(env, t, opciones.slice(0, 4), ["comparador"], "Para buscar el vehículo y revisar su costo, abre esta página del sitio");
}

// Versiones de las que el sitio no tiene el consumo (o el precio): ni la calculadora de la pagina las ofrece, asi que no se calcula una cifra que parezca completa.
async function tcoSinConsumo(env, sinCalculo, pad) {
  const v = sinCalculo[0];
  const t = `No calculo el costo de tener ${titulo(v)}: ${motivoNoCalculable(v)}. Tampoco lo calcula la calculadora del sitio, que necesita el consumo del vehículo; sin ese dato la energía saldría en $0 y el total parecería mucho menor que el real.`;
  const opciones = pad ? [chip(`Ficha de ${nombreExacto(pad)}`, { intencion: "ficha", ...refM(pad) })] : [];
  return sinDatoConPagina(env, t, opciones, ["comparador"], "Para comparar otros vehículos, abre esta página del sitio");
}

async function tco(env, interp, estado) {
  const arch = await leerArchivo(env, "tco");
  const idx = await indiceTco(env);
  const P = parametrosTCO(arch, interp.parametros || {});
  const E = energiaTCO(arch, interp.parametros || {});
  let versiones;
  if (interp.tcoIds && interp.tcoIds.length) versiones = versionesPorRef(idx, interp.tcoIds, interp.tcoK);
  else versiones = versionesDeTco(interp.filasTco || [], interp.anio, 3);
  if (!versiones.length) return await tcoSinModelo(env, interp, idx);
  if (interp.nivelTco === "parecido" && !(interp.tcoIds && interp.tcoIds.length)) return await tcoSinModelo(env, interp, idx, interp.filasTco || []);
  // solo se calcula lo que la calculadora del sitio tambien calcula (versiones con precio y consumo); de las demas se dice por que no
  const sinCalculo = versiones.filter((v) => !calculable(v));
  versiones = versiones.filter(calculable);
  if (!versiones.length) return await tcoSinConsumo(env, sinCalculo, (interp.filasPadron || [])[0]);
  // si el nombre del TCO trae menos palabras que el del padron (el registro del sitio lo escribe abreviado), se avisa
  const avisos = [];
  const pad = (interp.filasPadron || [])[0];
  const modelosDistintos = new Set(versiones.map((v) => v.tokens.join(" ")));
  if (modelosDistintos.size > 1 && interp.nivelTco !== "exacto" && !(interp.tcoIds && interp.tcoIds.length)) avisos.push(nota(`Hay varios modelos que calzan con «${interp.escritoTco || interp.escrito || "lo que escribiste"}» en los datos de costo; te muestro los primeros. Escribe el nombre completo, por ejemplo «${titulo(versiones[0])}», para ver uno en particular.`));
  else if (pad && interp.nivelTco !== "exacto") avisos.push(nota(`En los datos de costo el sitio lista este vehículo como «${titulo(versiones[0])}»; puede incluir otras versiones.`));
  else if (pad && versiones[0].tokens.length < pad.tokens.length) avisos.push(nota(`En los datos de costo el sitio lo lista como «${titulo(versiones[0])}», sin el detalle de la versión; puede incluir otras.`));
  if (pad && !versiones.some((v) => v.tp === pad.tec) && pad.tec !== "HEV") avisos.push(nota(`No encontré la versión ${nombreTec(pad.tec).toLowerCase()} en los datos de costo: lo que ves es de ${[...new Set(versiones.map((v) => nombreTec(v.tp).toLowerCase()))].join(" / ")}.`));
  if (interp.sinCubrirTco && interp.sinCubrirTco.length && interp.nivelTco === "contenido") avisos.push(nota(`No encontré «${interp.sinCubrirTco.join(" ")}» en el nombre; te muestro «${titulo(versiones[0])}».`));
  for (const v of sinCalculo.slice(0, 2)) avisos.push(nota(`No calculo «${titulo(v)} ${v.yr}»: ${motivoNoCalculable(v)}. Tampoco lo calcula la calculadora del sitio.`));
  const bloques = [];
  const resultados = [];
  for (const v of versiones.slice(0, 3)) {
    const res = tcoRedondeado(calcularTCO(v, E, P));
    resultados.push({ v, res });
    const b = bloqueTCO(v, res, P);
    b.verificar = true;
    bloques.push(b);
  }
  if (versiones.some((v) => v.pcf === "baja")) avisos.push(nota("El precio de algunas versiones es una estimación desde la tasación fiscal, no un precio de mercado citado: el seguro y el permiso pueden variar."));
  if (versiones.slice(0, 3).some((v) => v.tp === "PHEV")) avisos.push(nota(notaEnchufables(P)));
  const pie = nota(supuestosTexto(P, E));
  const resultado = { vehiculos: versiones.slice(0, 3), calculos: resultados.map((r) => r.res), parametros: P, energia: E };
  const tcoIds = versiones.slice(0, 3).map((v) => v._i);
  const refTco = refT(versiones.slice(0, 3));
  const primera = versiones[0];
  // los botones ofrecen el otro lado de lo que ya se mostro (si se pidieron 10 años, 5; si se pidieron 12.000 km al año, 20.000)
  const sig = [
    P.ny === 10 ? chip("A 5 años", { intencion: "tco", ...refTco, parametros: { ny: 5 } }) : chip("A 10 años", { intencion: "tco", ...refTco, parametros: { ny: 10 } }),
    P.kmAnio === 12000 ? chip("Con 20.000 km al año", { intencion: "tco", ...refTco, parametros: { kmm: 20000 / 12 } }) : chip("Con 12.000 km al año", { intencion: "tco", ...refTco, parametros: { kmm: 1000 } }),
  ];
  if (pad) sig.push(chip(`Ficha de ${nombreExacto(pad)}`, { intencion: "ficha", ...refM(pad) }));
  return responder({
    entendi: `Entendí tu pregunta como: costo de tener ${versiones.slice(0, 3).map((v) => `${titulo(v)} ${v.yr}`).join(", ")}`,
    bloques: [...avisos, ...bloques, pie, bloquePaginasTco(env)], resultado, siguientes: sig.slice(0, 3), depuracion: { intencion: "tco", versiones: tcoIds, parametros: P.ny + "/" + P.kmm },
    previo: { vehiculo: { i: pad ? pad._i : null, tco: tcoIds } },
  }, estado);
}

async function compararTco(env, interp, estado) {
  const arch = await leerArchivo(env, "tco");
  const P = parametrosTCO(arch, interp.parametros || {});
  const E = energiaTCO(arch, interp.parametros || {});
  const elegidas = [];
  for (const lectura of interp.pares) {
    const v = masReciente(versionesDeTco(lectura.tco.filas, null, 1));
    if (!v) return sinDatoConPagina(env, `No encontré «${lectura.texto}» en los datos de costo (TCO) del sitio, así que no puedo compararlo. Prueba con el nombre completo.`, [], ["comparador"], "Para buscar los vehículos y compararlos, abre esta página del sitio");
    if (lectura.tco.nivel === "parecido") return sinDatoConPagina(env, `No encontré «${lectura.texto}» con ese nombre exacto en los datos de costo (TCO); lo más parecido es «${titulo(v)}», que es otro modelo, así que no lo comparo. Prueba con el nombre completo.`, [], ["comparador"], "Para buscar los vehículos y compararlos, abre esta página del sitio");
    // la calculadora del sitio solo ofrece versiones con precio y consumo: sin ellos no se compara una cifra que pareceria completa
    if (!calculable(v)) return sinDatoConPagina(env, `No puedo comparar «${titulo(v)} ${v.yr}»: ${motivoNoCalculable(v)}. Tampoco lo calcula la calculadora del sitio.`, [], ["comparador"], "Para comparar otros vehículos, abre esta página del sitio");
    elegidas.push(v);
  }
  const [a, b] = elegidas;
  const ra = tcoRedondeado(calcularTCO(a, E, P));
  const rb = tcoRedondeado(calcularTCO(b, E, P));
  const c = bloqueComparacion(a, ra, b, rb, P);
  c.bloque.verificar = true;
  const dif = Math.abs(ra.total - rb.total);
  const frase = ra.total === rb.total ? "Tienen el mismo costo de uso." : `${titulo(ra.total < rb.total ? a : b)} ${ra.total < rb.total ? a.yr : b.yr} cuesta ${clp(dif)} menos de usar en ${P.ny} años.`;
  const resultado = { vehiculos: elegidas, calculos: [ra, rb], diferencia: dif, parametros: P, energia: E };
  const avisoPadron = interp.porFaltaDePadron ? [nota("Uno de los dos no está en el padrón de vehículos electrificados, así que comparo el costo de tener (TCO), que también cubre los de combustión.")] : [];
  const avisoEnchufable = elegidas.some((v) => v.tp === "PHEV") ? [nota(notaEnchufables(P))] : [];
  return responder({
    entendi: `Entendí tu pregunta como: comparar el costo de tener ${titulo(a)} y ${titulo(b)}`,
    bloques: [...avisoPadron, c.bloque, { tipo: "texto", verificar: true, texto: frase }, ...avisoEnchufable, nota(supuestosTexto(P, E)), bloquePaginasTco(env)], resultado,
    siguientes: [chip("A 10 años", { intencion: "comparar_tco_ids", ...refParT(a, b), parametros: { ny: 10 } })],
    depuracion: { intencion: "comparar_tco", versiones: [a._i, b._i] },
  }, estado);
}

async function compararFichas(env, interp, estado) {
  const filas = [];
  for (const l of interp.pares) {
    const r = l.padron.filas[0];
    if (!r) return sinDato(`No encontré «${l.texto}» en el padrón de vehículos electrificados, así que no puedo comparar sus datos. Para el costo de tener un vehículo, pregunta por el TCO.`);
    filas.push(r);
  }
  const [a, b] = filas;
  const celdas = ["tecnologia", "precio", "autonomia", "bateria", "rendimiento", "conector"].map((k) => {
    const fa = CAMPOS_FICHA[k](a), fb = CAMPOS_FICHA[k](b);
    return fa || fb ? [(fa || fb)[0], fa ? fa[1] : "sin dato", fb ? fb[1] : "sin dato"] : null;
  }).filter(Boolean);
  return responder({
    entendi: `Entendí tu pregunta como: comparar ${titulo(a)} y ${titulo(b)}`,
    bloques: [{ tipo: "tabla", verificar: true, titulo: "Datos lado a lado", subtitulo: "Padrón de vehículos electrificados", columnas: ["", titulo(a), titulo(b)], filas: celdas }],
    resultado: { filas }, siguientes: [chip(`Comparar el costo de tener ${titulo(a)} y ${titulo(b)}`, { intencion: "comparar_tco_pares", ...refPar(a, b) })].slice(0, 1), depuracion: { intencion: "comparar" },
  }, estado);
}

// ---- rankings y listas -------------------------------------------------------------------------------------------------------------
const CARROCERIA_DATOS = {
  suv: ["SUV"], hatchback: ["Hatchback"], sedan: ["Sedán", "Sedan"], camioneta: ["Camioneta", "Pickup", "Pick-up"], furgon: ["Furgón", "Van"],
  station: ["Station Wagon", "Stationwagon"], coupe: ["Coupé", "Coupe"],
};
const NOMBRE_CARROCERIA = { suv: "SUV", hatchback: "hatchback", sedan: "sedán", camioneta: "camioneta", furgon: "furgón", station: "station wagon", coupe: "coupé" };

function filtrarPadron(filas, interp, marcaClave) {
  return sinRepetidos(filas).filter((r) => {
    if (interp.tecnologias && interp.tecnologias.length && !interp.tecnologias.includes(r.tec)) return false;
    if (interp.carroceria && !(CARROCERIA_DATOS[interp.carroceria] || []).includes(r.carroceria)) return false;
    if (marcaClave && r._clave !== marcaClave) return false;
    return true;
  });
}

function textoFiltros(interp, marcaNombre) {
  const t = [];
  if (interp.tecnologias && interp.tecnologias.length) t.push(interp.tecnologias.map(nombreTec).join(" / "));
  if (interp.carroceria) t.push(NOMBRE_CARROCERIA[interp.carroceria]);
  if (marcaNombre) t.push(marcaNombre);
  if (interp.precio && interp.precio.min && interp.precio.max) t.push(`entre ${clp(interp.precio.min)} y ${clp(interp.precio.max)}`);
  else if (interp.precio && interp.precio.max) t.push(`hasta ${clp(interp.precio.max)}`);
  else if (interp.precio && interp.precio.min) t.push(`desde ${clp(interp.precio.min)}`);
  if (interp.autonomiaMin) t.push(`autonomía desde ${fmtNumero(interp.autonomiaMin)} km`);
  return t.join(" · ");
}

// Años en que el padron publica el modelo («2014 a 2026»); si no los trae, se dice.
function textoAnios(r) {
  if (!r.anio_min) return "año no informado";
  return r.anio_max && r.anio_max !== r.anio_min ? `${r.anio_min} a ${r.anio_max}` : String(r.anio_min);
}

// Los rankings y las listas por categoria muestran por defecto los modelos VIGENTES: con datos de los ultimos años del padron o sin año informado (no se puede saber).
// Un «eléctrico más barato» no debe ser un modelo que se dejó de vender hace diez años. Un boton permite incluir los antiguos.
const ANIOS_VIGENCIA = 2;
const referencias = new WeakMap();
function anioDesde(idx) {
  if (!referencias.has(idx)) referencias.set(idx, idx.filas.reduce((m, r) => Math.max(m, r.anio_max || 0), 0));
  const ref = referencias.get(idx);
  return ref ? ref - ANIOS_VIGENCIA : null;
}
const esVigente = (r, desde) => !desde || r.anio_max === null || r.anio_max === undefined || r.anio_max >= desde;

// Modelos del padron que cumplen los filtros del ranking y tienen la medida publicada.
function candidatosDelRanking(idx, interp) {
  let filas = filtrarPadron(idx.filas, interp, interp.marcaFiltro).filter((r) => r[interp.campo] !== null && r[interp.campo] !== undefined && r[interp.campo] !== "" && r[interp.campo] !== 0);
  // un modelo sin dato del filtro no cumple el filtro (null <= tope daria verdadero en JS)
  if (interp.precio) {
    if (interp.precio.max) filas = filas.filter((r) => r.precio_min && r.precio_min <= interp.precio.max);
    if (interp.precio.min) filas = filas.filter((r) => r.precio_min && r.precio_min >= interp.precio.min);
  }
  if (interp.autonomiaMin) filas = filas.filter((r) => r.autonomia && r.autonomia >= interp.autonomiaMin);
  return filas;
}

async function ranking(env, interp, estado) {
  const idx = await indiceModelos(env);
  let filas = candidatosDelRanking(idx, interp);
  const avisosRanking = [];
  // «los hibridos con mas autonomia»: los convencionales no publican autonomia electrica; se muestran los enchufables y se dice
  const soloConvencionales = interp.tecnologias && interp.tecnologias.length && interp.tecnologias.every((t) => t === "HEV" || t === "MHEV");
  if (!filas.length && soloConvencionales && (interp.medida === "autonomia" || interp.medida === "bateria")) {
    interp = { ...interp, tecnologias: ["PHEV", "EREV"] };
    filas = candidatosDelRanking(idx, interp);
    if (filas.length) avisosRanking.push(nota("Los híbridos convencionales no publican autonomía eléctrica ni batería; te muestro los híbridos enchufables."));
  }
  const marcaNombre = interp.marcaFiltro ? (idx.marcas.get(interp.marcaFiltro) || {}).nombre : null;
  // modelos vigentes (si no queda ninguno, se muestran los que haya)
  const desde = interp.antiguos ? null : anioDesde(idx);
  const vigentes = desde ? filas.filter((r) => esVigente(r, desde)) : filas;
  const aplicoVigencia = Boolean(desde) && vigentes.length > 0 && vigentes.length < filas.length;
  if (aplicoVigencia) filas = vigentes;
  if (!filas.length) return sinDato(`No encontré modelos con ${interp.nombreMedida} publicada que cumplan esos filtros${marcaNombre ? " de " + marcaNombre : ""}.`);
  filas.sort((a, b) => (interp.mayor ? b[interp.campo] - a[interp.campo] : a[interp.campo] - b[interp.campo]) || titulo(a).localeCompare(titulo(b), "es"));
  const total = filas.length;
  const top = filas.slice(0, interp.top);
  // el padron publica un rango de precio por modelo (versiones y años distintos): se muestra «desde» y, en la nota, hasta donde llega
  const enRango = (r) => interp.medida === "precio" && r.precio_max && r.precio_max !== r.precio_min;
  const valor = (r) => (interp.medida === "precio" ? `${enRango(r) ? "desde " : ""}${clp(r.precio_min)}` : `${fmtNumero(r[interp.campo])}${interp.unidad}`);
  const etiquetaOrden = interp.medida === "precio" ? (interp.mayor ? "más caros" : "más baratos") : interp.medida === "co2" ? (interp.mayor ? "con más emisiones" : "con menos emisiones") : (interp.mayor ? "con mayor" : "con menor");
  const unico = top.length === 1;
  const orden = unico ? etiquetaOrden.replace(/s$/, "") : etiquetaOrden;           // «más baratos» -> «más barato»
  const sujeto = unico ? "El modelo" : `Los ${top.length} modelos`;
  const tituloR = interp.medida === "precio" || interp.medida === "co2" ? `${sujeto} ${orden}` : `${sujeto} ${orden} ${interp.nombreMedida}`;
  const filtros = textoFiltros(interp, marcaNombre);
  const hayFiltros = Boolean(filtros);
  const subtitulo = [filtros || "Padrón de vehículos electrificados", hayFiltros && total > top.length ? `${fmtNumero(total)} modelos cumplen` : ""].filter(Boolean).join(" · ");
  const bloques = [{
    tipo: "ranking", verificar: true, titulo: tituloR, subtitulo,
    items: top.map((r) => ({ nombre: titulo(r), valor: valor(r), nota: [r.tec, r.carroceria && r.carroceria !== "N/A" ? r.carroceria : "", textoAnios(r), enRango(r) ? `hasta ${clp(r.precio_max)}` : ""].filter(Boolean).join(" · ") })),
  }];
  bloques.unshift(...avisosRanking);
  if (interp.medida === "autonomia") bloques.push(nota("La autonomía es la que informa el catálogo del sitio para cada modelo (referencial: depende del ciclo de medición y de cómo se maneje)."));
  if (interp.medida === "precio") bloques.push(nota("Es el precio de lista más bajo que publica el padrón para cada modelo («desde»); el padrón mezcla versiones y años distintos, por eso se indica hasta dónde llega y los años publicados."));
  if (aplicoVigencia) bloques.push(nota(`No incluye los modelos cuyo último año publicado es anterior a ${desde}.`));
  if (interp.generico) bloques.push(nota("Para ver los datos de un modelo, escribe su marca y nombre."));
  const sig = top.slice(0, 2).map((r) => chip(`Ficha de ${nombreExacto(r)}`, { intencion: "ficha", ...refM(r) }));
  // «¿cuánto cuesta un auto eléctrico?»: el precio depende del modelo; se ofrece el otro extremo y un tope como ejemplo
  if (interp.medida === "precio" && !(interp.precio && (interp.precio.max || interp.precio.min))) {
    sig.unshift({ etiqueta: interp.mayor ? "Los 5 más baratos" : "Los 5 más caros", accion: { pregunta: interp.mayor ? "Los 5 eléctricos más baratos" : "Los 5 eléctricos más caros" } });
    sig.splice(2);
  }
  if (aplicoVigencia) sig.push(chip("Incluir modelos antiguos", { ...interp, antiguos: true }));
  return responder({
    entendi: `Entendí tu pregunta como: ranking por ${interp.nombreMedida}${filtros ? " · " + filtros : ""}`, bloques,
    resultado: { filas: top, meta: { top: top.length, tope: interp.top, total, desde: aplicoVigencia ? desde : null }, precio: interp.precio || {}, autonomiaMin: interp.autonomiaMin || null }, siguientes: sig,
    depuracion: { intencion: "ranking", medida: interp.medida, n: top.length },
  }, estado);
}

async function listaMarca(env, interp, estado) {
  const idx = await indiceModelos(env);
  const sinMarca = !interp.marcaClave;
  let filas = filtrarPadron(idx.filas, interp, interp.marcaClave);
  // sin marca (una categoria) se muestran los modelos vigentes; de una marca, todo lo que trae el padron
  const desde = sinMarca && !interp.antiguos ? anioDesde(idx) : null;
  const vigentes = desde ? filas.filter((r) => esVigente(r, desde)) : filas;
  const aplicoVigencia = Boolean(desde) && vigentes.length > 0 && vigentes.length < filas.length;
  if (aplicoVigencia) filas = vigentes;
  // de una marca, en orden alfabetico; sin marca, primero los de mayor autonomia (los que no la traen, al final)
  filas.sort((a, b) => (sinMarca ? (b.autonomia || 0) - (a.autonomia || 0) : 0) || titulo(a).localeCompare(titulo(b), "es"));
  const marca = sinMarca ? null : (idx.marcas.get(interp.marcaClave) || {}).nombre || interp.marca;
  const filtros = textoFiltros({ ...interp, precio: null }, null);
  if (!filas.length) return sinDato(sinMarca ? "No encontré modelos con esas características en el padrón de vehículos electrificados." : `No encontré modelos de ${marca} en el padrón de vehículos electrificados${interp.carroceria ? " con ese tipo de carrocería" : ""}.`);
  const b = bloqueVariantes(filas, 12);
  b.titulo = sinMarca ? "Modelos del padrón" : `Modelos de ${marca} en el padrón`;
  b.subtitulo = [filas.length > 12 ? `Los 12 primeros de ${fmtNumero(filas.length)}, ${sinMarca ? "por mayor autonomía" : "en orden alfabético"}` : `${filas.length} modelos`, filtros].filter(Boolean).join(" · ");
  const siguientes = filas.slice(0, 3).map((r) => chip(`Ficha de ${nombreExacto(r)}`, { intencion: "ficha", ...refM(r) }));
  if (aplicoVigencia) siguientes.push(chip("Incluir modelos antiguos", { ...interp, antiguos: true }));
  return responder({
    entendi: sinMarca ? `Entendí tu pregunta como: modelos del padrón${filtros ? " · " + filtros : ""}` : `Entendí tu pregunta como: modelos de ${marca}`,
    bloques: [b, ...(aplicoVigencia ? [nota(`No incluye los modelos cuyo último año publicado es anterior a ${desde}.`)] : [])],
    resultado: { filas: filas.slice(0, 12), meta: { mostrados: Math.min(filas.length, 12), total: filas.length, desde: aplicoVigencia ? desde : null } },
    siguientes, depuracion: { intencion: "lista_marca", n: filas.length },
  }, estado);
}

// Palabras que parecen un error de tipeo en el nombre de un modelo («dolfin», «hiunday»): se ofrece lo que se parece, con botones, y no se elige por la persona.
function sugerencia(interp) {
  const filas = interp.filas || [];
  const mal = (interp.cambios || []).map(([a]) => a).join(" ");
  const extra = {};
  if (interp.parametros && Object.keys(interp.parametros).length) extra.parametros = interp.parametros;
  if (interp.pedido === "ficha" && interp.campos && interp.campos.length) { extra.campos = interp.campos; extra.soloCampos = Boolean(interp.soloCampos); }
  return {
    tipo: "aclaracion", bloques: [texto(`No encontré «${mal}». ${filas.length === 1 ? "¿Quisiste decir este modelo?" : "¿Quisiste decir alguno de estos?"}`)],
    opciones: filas.map((r) => chip(nombreExacto(r), { intencion: interp.pedido, ...refM(r), ...extra })), depuracion: { vehiculo: true, intencion: "sugerencia", pedido: interp.pedido },
  };
}

// Una marca sola con un pedido que necesita un modelo concreto (ficha de rescate, etiqueta, seguro): se pregunta cual, con los modelos de esa marca.
async function marcaElegir(env, interp) {
  const idx = await indiceModelos(env);
  const marca = (idx.marcas.get(interp.marcaClave) || {}).nombre || interp.marca;
  const desde = anioDesde(idx);
  const tiene = (r) => (interp.pedido === "rescate" ? r.rescate : interp.pedido === "etiqueta" ? Boolean(r.etiqueta_url) : true);
  const filas = sinRepetidos(idx.filas.filter((r) => r._clave === interp.marcaClave))
    .sort((a, b) => Number(tiene(b)) - Number(tiene(a)) || Number(esVigente(b, desde)) - Number(esVigente(a, desde)) || titulo(a).localeCompare(titulo(b), "es"))
    .slice(0, 6);
  const que = { rescate: "ficha de rescate", etiqueta: "etiqueta de eficiencia", seguro_modelo: "seguro" }[interp.pedido] || "datos";
  if (!filas.length) return sinDato(`No encontré modelos de ${marca} en el padrón de vehículos electrificados.`);
  return {
    tipo: "aclaracion", bloques: [texto(`¿De qué modelo de ${marca} quieres ver ${interp.pedido === "seguro_modelo" ? "el seguro" : interp.pedido === "rescate" ? "la ficha de rescate" : "la etiqueta de eficiencia"}? Toca uno o escribe su nombre.`)],
    opciones: filas.map((r) => chip(nombreExacto(r), { intencion: interp.pedido, ...refM(r) })), depuracion: { vehiculo: true, intencion: "marca_elegir", pedido: que },
  };
}

// Modelo que esta en los datos de costo (TCO) y no en el padron: se muestran las cifras tecnicas que trae el TCO y se ofrece calcular su costo.
async function soloTco(env, interp, estado) {
  const versiones = versionesDeTco(interp.filasTco || [], null, 2).slice(0, 2);
  if (!versiones.length) return sinDato("No encontré ese modelo.");
  const campos = interp.campos || [];
  const faltan = interp.faltantes && interp.faltantes.length ? [nota(`No tengo ${interp.faltantes.join(" ni ")} de este modelo entre los datos del sitio. Esto es lo que sí tengo:`)] : [];
  const avisos = [nota(`«${titulo(versiones[0])}» no está en el padrón de vehículos electrificados; estas cifras salen de la sección de costo de tener (TCO) del sitio.`)];
  const bloques = versiones.map((v) => bloqueFichaTco(v, campos, interp.soloCampos));
  const versTres = versionesDeTco(interp.filasTco || [], null, 3).slice(0, 3);
  const ids = versTres.map((v) => v._i);
  return responder({
    entendi: `Entendí tu pregunta como: datos de ${versiones.map((v) => titulo(v)).join(" y ")}`, bloques: [...avisos, ...faltan, ...bloques], resultado: { vehiculos: versiones },
    siguientes: [chip(`Costo de tener un ${titulo(versiones[0])}`, { intencion: "tco", ...refT(versTres) })], depuracion: { intencion: "solo_tco" }, previo: { vehiculo: { i: null, tco: ids } },
  }, estado);
}

// Una marca conocida con un modelo que no esta («Tesla Cybertruck»): se dice y se muestran los modelos de esa marca que si estan.
async function marcaSinModelo(env, interp, estado) {
  const idx = await indiceModelos(env);
  const marca = (idx.marcas.get(interp.marcaClave) || {}).nombre || interp.marca;
  const r = await listaMarca(env, { ...interp, intencion: "lista_marca", tecnologias: [], carroceria: null }, estado);
  const que = { rescate: "ficha de rescate", etiqueta: "etiqueta de eficiencia", seguro_modelo: "seguro", ficha: "datos" }[interp.pedido] || "datos";
  const darte = { rescate: "su ficha de rescate", etiqueta: "su etiqueta de eficiencia", seguro_modelo: "su seguro", ficha: "sus datos" }[interp.pedido] || "sus datos";
  if (r.tipo !== "respuesta") return sinDato(`No encontré «${interp.escrito}» entre los modelos de ${marca} del padrón de vehículos electrificados.`);
  r.bloques.unshift(texto(`No encontré «${interp.escrito}» entre los modelos de ${marca} del padrón de vehículos electrificados, así que no puedo darte ${darte}. Estos son los de ${marca} que sí tengo:`));
  r.entendi = `Entendí tu pregunta como: ${que} de ${marca} ${interp.escrito}`;
  r.depuracion = { ...r.depuracion, intencion: "marca_sin_modelo" };
  return r;
}

async function tcoGeneral(env, interp, estado) {
  // sin ejemplos con marcas: se pide la marca o el modelo (o dos, para comparar) y lo que la persona escriba despues completa la pregunta (previo.pedirVehiculo)
  return responder({
    entendi: "Entendí tu pregunta como: costo de tener un vehículo (TCO)",
    bloques: [texto("Calculo el costo de uso de un vehículo (energía, mantención, seguro, permiso de circulación e impuesto verde) con los mismos valores de partida y la misma cuenta que la calculadora del sitio. ¿De qué vehículo? Escribe la marca o el modelo; para comparar dos, escríbelos separados por «vs»."), bloquePaginasTco(env, ["comparador", "miVehiculo"], "Para revisar el cálculo o hacer más pruebas, abre estas páginas del sitio")],
    resultado: {}, previo: { pedirVehiculo: "tco" }, depuracion: { intencion: "tco_general" },
  }, estado);
}

// Un dato de un vehiculo sin decir cual («revisa la autonomia de los vehiculos»): se pide la marca o el modelo, sin ejemplos con marcas, y lo que la persona escriba despues completa la pregunta.
const DATO_QUE_SE_PIDE = { autonomia: "la autonomía" };
function pedirVehiculo(interp, estado) {
  const dato = DATO_QUE_SE_PIDE[interp.pedido] || "ese dato";
  return responder({
    entendi: `Entendí tu pregunta como: ${dato} de un vehículo`,
    bloques: [texto(`¿De qué vehículo quieres ver ${dato}? Escribe la marca o el modelo.`)],
    resultado: {}, siguientes: interp.pedido === "autonomia" ? [preguntaChip("Los 5 eléctricos con más autonomía")] : [],
    previo: { pedirVehiculo: interp.pedido }, depuracion: { intencion: "pedir_vehiculo", pedido: interp.pedido },
  }, estado);
}

// ---- punto de entrada --------------------------------------------------------------------------------------------------------------
// La fila a la que apunta un boton: por su clave estable (si el sitio publico datos nuevos, sigue siendo el mismo modelo) y, sin clave, por su posicion.
const filaPorRef = (modelos, ref) => (ref.k ? modelos.filas.find((x) => claveModelo(x) === ref.k) : modelos.filas.find((x) => x._i === ref.i)) || null;
const versionesPorRef = (idx, ids, ks) => (ks && ks.length ? ks.map((k) => idx.filas.find((v) => claveTco(v) === k)) : (ids || []).map((i) => idx.filas[i])).filter(Boolean);

async function ejecutarVehiculo(env, interp, original, estado) {
  const modelos = await indiceModelos(env);
  if (["rescate", "etiqueta", "seguro_modelo"].includes(interp.intencion) && interp.nivel === "parecido" && interp.filas && interp.filas.length) return preguntarCual(interp, interp.filas);
  // acciones de los botones: llevan el indice del modelo en lugar de un texto
  if (interp.i !== undefined && interp.i !== null && !interp.filas) {
    const r = filaPorRef(modelos, interp);
    if (!r) return sinDato("Ese modelo ya no está en los datos del sitio. Prueba escribiendo su nombre.");
    interp = { ...interp, tipo: "vehiculo", filas: [r], nivel: "exacto", marca: r.marca, campos: interp.campos || [], soloCampos: interp.soloCampos === true, sinCubrir: [] };
    if (interp.intencion === "tco") {
      const tco = await indiceTco(env);
      const t = reconocer(tco, norm(titulo(r)));
      interp = { ...interp, filasTco: t.filas, nivelTco: t.nivel, sinCubrirTco: t.sinCubrir || [], filasPadron: [r], anio: null, parametros: interp.parametros || {} };
    }
  }
  if (interp.intencion === "comparar_tco_ids" || interp.intencion === "comparar_tco_pares") {
    const tco = await indiceTco(env);
    if (interp.intencion === "comparar_tco_ids") {
      const [a, b] = versionesPorRef(tco, interp.ids, interp.ks);
      if (!a || !b) return sinDato("Alguno de esos vehículos ya no está en los datos de costo del sitio. Prueba escribiendo sus nombres.");
      interp = { ...interp, intencion: "comparar_tco", pares: [{ texto: titulo(a), padron: { filas: [] }, tco: { filas: [a] } }, { texto: titulo(b), padron: { filas: [] }, tco: { filas: [b] } }], parametros: interp.parametros || {} };
    } else {
      const [a, b] = (interp.ks || interp.ids.map(() => null)).map((k, j) => (k ? filaPorRef(modelos, { k }) : filaPorRef(modelos, { i: interp.ids[j] })));
      if (!a || !b) return sinDato("Alguno de esos modelos ya no está en los datos del sitio. Prueba escribiendo sus nombres.");
      interp = { ...interp, intencion: "comparar_tco", pares: [a, b].map((r) => ({ texto: titulo(r), padron: { filas: [r] }, tco: reconocer(tco, norm(titulo(r))) })), parametros: {} };
    }
  }
  switch (interp.intencion) {
    case "ficha": return await ficha(env, interp, estado);
    case "rescate": case "etiqueta": return await rescateOEtiqueta(env, interp, estado);
    case "seguro_modelo": return await seguroDeModelo(env, interp, estado);
    case "seguros": return await segurosMercado(env, interp, estado);
    case "tco": return await tco(env, interp, estado);
    case "tco_general": return await tcoGeneral(env, interp, estado);
    case "pedir_vehiculo": return pedirVehiculo(interp, estado);
    case "comparar_tco": return await compararTco(env, interp, estado);
    case "comparar": return await compararFichas(env, interp, estado);
    case "ranking": return await ranking(env, interp, estado);
    case "lista_marca": return await listaMarca(env, interp, estado);
    case "marca_sin_modelo": return await marcaSinModelo(env, interp, estado);
    case "marca_elegir": return await marcaElegir(env, interp);
    case "sugerencia": return sugerencia(interp);
    case "solo_tco": return await soloTco(env, interp, estado);
    default: return sinDato("No entendí esa consulta sobre vehículos.");
  }
}
return { EJEMPLOS_VEHICULOS, ejecutarVehiculo };
})();
__mod["agente_web/src/nlu_norm.js"] = (function () {
// Comprension (sin IA) de preguntas sobre leyes, decretos y normas: una norma por su numero («ley 21.505», «decreto 114»), normas por tema («normas de cargadores»),
// metas y su fuerza juridica, brechas legales, proyectos de ley en seguimiento y normas de bodegaje. Devuelve una intencion ya armada (normas encontradas, tema
// del menu para recomendar paginas); dialogo_norm.js la ejecuta. Si la frase no es de leyes y normas, devuelve null y el asistente sigue con lo demas.
const { buscarNormas, contiene, datosMarco, filasQueCalzan, indiceNormas, normasPorNumero, palabrasClave, paresDe, terminosDeBusqueda, tokens } = __req("agente_web/src/normativa.js");

// El texto tal como lo escribio la persona pero sin tildes ni mayusculas: conserva los puntos de «21.505», que norm() convierte en espacio.
const crudoDe = (texto) => String(texto).toLowerCase().normalize("NFD").replace(/\p{Mn}/gu, "");

// ---- pistas ------------------------------------------------------------------------------------------------------------------------------
const PALABRAS_LEGALES = /\b(ley|leyes|decreto|decretos|reglamento|reglamentos|reglamentario|reglamentaria|normativa|normativas|norma|normas|legal|legales|legislacion|legislativo|legislativa|ordenanza|ordenanzas|regulacion|regulaciones|regulatorio|regulatoria|regula|regulan|regulado|regulada|fiscaliza|fiscalizan|fiscalizacion)\b/;
const NUMEROS_LEGALES = /\b(ley\s*(n[°º.o]?\s*)?\d|d\.?\s?s\.?\s*(n[°º.o]?\s*)?\d|dfl\s*\d|dl\s*\d|decreto\s+ley\s*(n[°º.o]?\s*)?\d|dto\.?\s*\d|decreto\s*(supremo|exento)?\s*(n[°º.o]?\s*)?\d|res(olucion)?\.?\s*(ex(enta)?\.?)?\s*(n[°º.o]?\s*)?\d|(ric|rgr|nch)\s*\d|te-?\d\b)/;
const FRASES_LEGALES = /\b(proyectos? de ley|marco (legal|regulatorio|normativo|juridico)|vacios? (legal|legales|normativos?)|brechas? (legal|legales|normativ\w+)|boletin(es)?\b|radar legislativo|obligatori\w+ (el |la |los |las )?seguro|seguro obligatorio|soap|ley rep|reciclaje de (las )?baterias|reciclar (las )?baterias|responsabilidad extendida|restriccion vehicular|restricciones vehiculares|placa verde|impuesto verde|ppda|plan de descontaminacion|netbilling|net billing|mepco|pmgd|pliego tecnico|instruccion tecnica|norma tecnica|norma de emision|norma primaria)\b/;
const METAS = /\bmetas?\b/;
// Nombres de lo que se prohibe o se obliga a comprar o vender: la respuesta esta en la fuerza juridica de las metas de venta («no hay prohibicion: la meta es declarativa»).
const PROHIBICION_VENTA = /\b(prohib\w+|prohibira\w*|fin de la venta|dejaran de (venderse|vender)|dejara de venderse|vetar\w*|obliga\w*|obligara\w*|obligatori\w+)\b.*\b(venta|vender|ventas|comprar|compra|comprarse|vendan)\b.*\b(combustion|gasolina|bencina|diesel|electricos?|cero emisiones)\b|\b(venta|vender|ventas)\b.*\b(autos?|vehiculos?)\b.*\b(combustion|gasolina|bencina|diesel)\b.*\b(prohib\w+|termina|termine|se acaba|se acabara|hasta cuando|cuando)\b|\b(cuando|hasta cuando)\b.*\b(prohib\w+|dejan de venderse|dejaran de venderse|se acaba la venta)\b/;

// Preguntas deonticas: «puedo instalar...», «necesito permiso...», «es obligatorio...»: piden la regla aunque no digan «ley» ni «norma» (se confirman contra el catalogo).
const DEONTICOS = /\b(puedo|podemos|se puede|se pueden|puede|pueden|debo|debemos|deben|debe|tengo que|necesito|necesitamos|hay que|obligacion|obligaciones|obligan|obliga|exige|exigen|exigencia|exigencias|permite|permiten|prohibe|prohiben|prohibido|prohibida|derecho|derechos|requisito|requisitos|autorizacion|autorizar|permiso|permisos|multa|multas|sancion|sanciones|infraccion|infracciones|ilegal)\b/;
// (sin «auto electrico»: es tan general que toda pregunta de un auto con «puedo» pareceria de leyes)
const TEMA_DEONTICO = /\b(cargador|cargadores|cargar|recargar|carga|enchufe|wallbox|edificio|edificios|condominio|condominios|copropiedad|comunidad|estacionamiento|estacionamientos|bateria|baterias|instalar|instalacion|instalaciones|retrofit|conversion|convertir|panel solar|paneles solares|generacion distribuida)\b/;
// Pregunta por una cifra («cuantos», «ranking», «promedio»): ahi manda el indicador, no la norma.
const PIDE_CIFRA = /\b(cuantos|cuantas|cuanto|cuanta|numero de|total|ranking|promedio|porcentaje|evolucion|serie|cantidad)\b/;

const META_ANIO = /\bmetas?\b.*\b(20[2-5]\d)\b|\b(20[2-5]\d)\b.*\bmetas?\b/;
// La pregunta es por la fuerza juridica de una meta («es obligatoria», «tiene rango de ley», «es vinculante»).
const FUERZA_JURIDICA = /\b(obligatori\w+|vinculant\w+|declarativ\w+|rango de ley|fuerza (legal|juridica)|exigible|se puede exigir|obliga\w*)\b/;

// ¿La frase parece de leyes y normas? (palabras o numeros propios del tema). Es solo una pista: interpretarNorma devuelve null si despues no encuentra nada.
function indiciosNormativos(q, crudo = q) {
  return PALABRAS_LEGALES.test(q) || NUMEROS_LEGALES.test(crudo) || FRASES_LEGALES.test(q) || METAS.test(q) || PROHIBICION_VENTA.test(q) ||
    /\b(bodegaje|sustancias peligrosas|residuos peligrosos|mercancias peligrosas|imdg)\b/.test(q);
}

// Pistas debiles: palabras que tambien se dicen de otras cosas («obligatorio», «incentivo», «patente») o nombres propios de una norma («retrofit», «interoperabilidad»);
// solo valen si ademas calzan bien con una norma del catalogo.
const PISTAS_DEBILES = /\b(obligatori\w+|prohibid\w+|permitid\w+|exig\w+|incentiv\w+|subsidi\w+|beneficio\w*|exencion\w*|impuesto\w*|patente|permiso de circulacion|permisos de circulacion|se puede|esta permitido|copropiedad|interoperabilidad|retrofit|v2g|generacion distribuida|transicion energetica|cambio climatico|descontaminacion|estabilizacion tarifaria|licitacion|licitaciones|homologacion|euro 6|euro vi|norma euro|ndc|tarifa electrica|tarifas electricas|tarifari\w+|valor agregado de distribucion|planee|plan nacional de eficiencia|bases de licitacion|bases definitivas|sustancias peligrosas)\b/;
function indiciosDebiles(q) {
  return PISTAS_DEBILES.test(q);
}

// Las pistas de una frase, para que nlu.js decida cuando mirar este tema: `fuerte` (palabras o numeros propios de leyes), `debil`, y `temprana`: una pregunta de
// regla («puedo instalar...», «es obligatorio...») que no pide una cifra y por eso se confirma contra las normas antes de mirar los indicadores.
function pistasDeNorma(texto, q) {
  const debil = indiciosDebiles(q);
  const deontica = DEONTICOS.test(q) && TEMA_DEONTICO.test(q);
  return { fuerte: indiciosNormativos(q, crudoDe(texto)), debil, deontica, temprana: (debil || deontica) && !PIDE_CIFRA.test(q) };
}

// ---- numeros de norma --------------------------------------------------------------------------------------------------------------------
const anioDe = (s) => (s.length === 4 ? Number(s) : Number(s) >= 50 ? 1900 + Number(s) : 2000 + Number(s));
// ano opcional detras del numero: «/2025», «-25», «de 2025», «2025»
const SUFIJO_ANIO = "(?:\\s*(?:[/-]|de|del)\\s*(\\d{2,4})|\\s+((?:19[5-9]|20[0-3])\\d))?";

// Numero de norma tal como se escribe: «114», «1.698» (con punto de miles), «8t» (con letra).
const NUM = "(\\d{1,3}(?:\\.\\d{3})+|\\d{1,4})([a-z]?)";
const sinPuntos = (s) => Number(s.replace(/\./g, ""));
const PREFIJO_N = "\\s*(?:n[°º.o]?\\s*)?";

// Normas que la pregunta nombra por su numero: [{ clase, numero, sufijo, anio, texto }]. `clase`: ley, decreto, resolucion, dfl, instructivo, ric, rgr, nch, te (sin norma en el catalogo).
function entidadesDeNorma(crudo) {
  const out = [];
  const poner = (clase, numero, anio, texto, sufijo = "") => out.push({ clase, numero, sufijo, anio: anio || null, texto });
  const anioDeGrupos = (a, b) => (a || b ? anioDe(a || b) : null);
  for (const m of crudo.matchAll(new RegExp(`\\bley${PREFIJO_N}(\\d{1,2})[.\\s]?(\\d{3})\\b${SUFIJO_ANIO}`, "g"))) poner("ley", Number(m[1] + m[2]), anioDeGrupos(m[3], m[4]), `Ley ${m[1]}.${m[2]}`);
  for (const m of crudo.matchAll(new RegExp(`\\b(?:decreto(?:\\s+supremo|\\s+exento)?|d\\.?\\s?s\\.?|dto\\.?)${PREFIJO_N}${NUM}\\b${SUFIJO_ANIO}`, "g"))) poner("decreto", sinPuntos(m[1]), anioDeGrupos(m[3], m[4]), `decreto ${m[1]}${m[2]}`, m[2]);
  // decretos con fuerza de ley o decretos ley («DL 2.224/1978», «decreto ley 2224»): en el catalogo son decretos
  for (const m of crudo.matchAll(new RegExp(`\\b(?:decreto\\s+ley|d\\.\\s?l\\.?|dl)${PREFIJO_N}${NUM}\\b${SUFIJO_ANIO}`, "g"))) poner("decreto", sinPuntos(m[1]), anioDeGrupos(m[3], m[4]), `DL ${m[1]}${m[2]}`, m[2]);
  for (const m of crudo.matchAll(new RegExp(`\\bres(?:olucion)?\\.?\\s*(?:ex(?:enta)?\\.?)?${PREFIJO_N}${NUM}\\b${SUFIJO_ANIO}`, "g"))) poner("resolucion", sinPuntos(m[1]), anioDeGrupos(m[3], m[4]), `resolución ${m[1]}${m[2]}`, m[2]);
  // «DFL 4/20.018 (2006)»: despues de la barra puede ir el numero de la ley o el ano; el ano tambien puede ir entre parentesis
  for (const m of crudo.matchAll(new RegExp(`\\bdfl${PREFIJO_N}(\\d{1,4})(?:\\s*/\\s*(\\d{1,2}\\.\\d{3}|\\d{4}))?(?:\\s*\\((\\d{4})\\))?(?:\\s*(?:de|del)\\s*(\\d{4}))?`, "g"))) {
    const anio = m[3] || m[4] || (m[2] && /^(19|20)\d{2}$/.test(m[2]) ? m[2] : null);
    poner("dfl", Number(m[1]), anio ? Number(anio) : null, `DFL ${m[1]}`);
  }
  for (const m of crudo.matchAll(new RegExp(`\\b(?:instructivo|res(?:olucion)?\\.?\\s*sec)${PREFIJO_N}(\\d{1,3}(?:\\.\\d{3})+|\\d{1,5})\\b${SUFIJO_ANIO}`, "g"))) poner("instructivo", sinPuntos(m[1]), anioDeGrupos(m[2], m[3]), `Instructivo ${m[1]}`);
  for (const m of crudo.matchAll(/\b(ric|rgr|nch)\s*(?:n[°º.o]?\s*)?(\d{1,3})\b/g)) poner(m[1], Number(m[2]), null, `${m[1].toUpperCase()} ${m[2]}`);
  for (const m of crudo.matchAll(/\bte-?(\d)\b/g)) poner("te", Number(m[1]), null, `TE${m[1]}`);
  if (!out.length) {
    // «la 21.505» o «21505» con palabras de ley alrededor: un numero de cinco cifras (con punto) es una ley
    for (const m of crudo.matchAll(/\b(\d{2})\.(\d{3})\b/g)) poner("ley", Number(m[1] + m[2]), null, `Ley ${m[1]}.${m[2]}`);
  }
  return out;
}

// ---- temas del menu --------------------------------------------------------------------------------------------------------------------
// Que paginas del sitio recomendar segun de que habla la pregunta (los nombres de los temas son los de ia_norm_nav.json).
const TEMAS_NAV = [
  ["meta_2035", /\bmetas?\b|\b2035\b|\bcarbono neutralidad\b/],
  ["edificios", /\b(edificio|edificios|condominio|condominios|copropiedad|copropietarios|estacionamiento|estacionamientos|departamento|departamentos|administrador)\b/],
  ["carga", /\b(cargador|cargadores|recarga|enchufe|wallbox|electrolinera|electrolineras|punto de carga|puntos de carga|irve|interoperabilidad|infraestructura de carga)\b/],
  ["baterias", /\b(bateria|baterias|litio|bess|pila|pilas|bodegaje|sustancias peligrosas|residuos|rep|reciclaje|almacenamiento|almacenar)\b/],
  ["incentivos", /\b(incentivo|incentivos|subsidio|subsidios|beneficio|beneficios|exencion|exenciones|impuesto|impuestos|tributari[ao]s?|credito|financiamiento|patente|placa verde)\b/],
  ["permisos", /\b(permiso de circulacion|permisos de circulacion)\b/],
  ["emisiones", /\b(emision|emisiones|euro|contaminacion|ppda|homologacion|etiqueta|etiquetado|eficiencia|restriccion vehicular)\b/],
  ["transporte_publico", /\b(bus|buses|taxi|taxis|colectivo|colectivos|transporte publico|licitacion|licitaciones)\b/],
  ["red_tarifas", /\b(tarifa|tarifas|distribucion|transmision|netbilling|net billing|generacion distribuida|pmgd|v2g|lgse|red electrica|precio de la luz|cuenta de la luz)\b/],
  ["seguros_rescate", /\b(seguro|seguros|soap|rescate|bomberos)\b/],
  ["combustibles", /\b(bencina|gasolina|diesel|combustible|combustibles|mepco)\b/],
  ["clima", /\b(clima|climatico|cambio climatico|carbono|neutralidad|ndc)\b/],
];

function temasDeLaPregunta(q) {
  const t = TEMAS_NAV.filter(([, rx]) => rx.test(q)).map(([id]) => id).slice(0, 2);
  return t.length ? [...t, "marco_legal"] : ["marco_legal"];
}

// Temas del menu de los que habla la propia norma (por su nombre y lo que regula), sin el general «marco_legal».
function temasDeNorma(r) {
  return temasDeLaPregunta(tokens(`${r.nombre} ${r.materia}`).join(" ")).filter((t) => t !== "marco_legal");
}

// ---- interpretacion ----------------------------------------------------------------------------------------------------------------------
const RX = {
  bodegaje: /\b(bodegaje|bodegas?|almacenaje|almacenar|guardar)\b.*\b(sustancias?|quimic\w+|residuos?|mercancias?|baterias?|litio|peligros\w+|pilas?)\b|\b(sustancias peligrosas|residuos peligrosos|mercancias peligrosas|imdg|ghs|sga|bodegaje)\b|\b(baterias?|litio|pilas?)\b.*\b(almacen\w+|bodega\w*|guardar|transporte|manejo)\b.*\b(norma\w*|ley|reglamento|regula\w*)\b/,
  proyectos: /\b(proyectos? de ley|en tramite|tramitacion|radar legislativo|se viene|vendra|proxim[ao]s? (ley|leyes|norma|normas)|pendientes?|en mora|sin dictar|por dictar|boletin(es)?|cuando (saldra|saldran|se aprobara|se aprobaran|se aprueba|se publica|se publicara|se promulgara|se dicta|se dictara|habra|existira|estara|entrara en vigencia|entra en vigencia|entra|rige|regira|comienza|empieza|sale)|en que estado|como va (el|la|los|las)|(esta|fue|ya se) (aprobad[ao]|promulgad[ao]|dictad[ao])|se aprobo|se promulgo|hay (un |algun )?proyectos?|existe (un |algun )?proyectos?)\b/,
  brechas: /\b(brechas?|vacios?|falta|faltan|carencias?|deficiencias?|limitaciones|limitacion|no existe|no hay|cambiar|modificar|reformar|corregir|mejorar|falencias)\b/,
  metas: /\b(metas?|objetivos?|compromisos? (de gobierno|oficiales?))\b/,
  detalleDe: /\b(disposiciones?( clave)?|articulos?|que dice|detalle|mas detalle|contenido|resumen)\b/,
  vaciosDe: /\b(vacios?|falta|faltan|limitaciones?|propuestas?|actualiz\w+|mejorar|mejoras)\b/,
  documentoDe: /\b(documento|pdf|texto|enlace|link|abrir|descargar)\b/,
  nav: /\b(donde|en que (pagina|parte|seccion)|que pagina|pagina de|seccion de|menu)\b.*\b(ver|veo|encuentro|encontrar|hay|esta|estan|leer|consultar|busco|buscar|puedo)\b|\b(pagina|paginas|seccion)\b.*\b(norma\w*|ley|leyes|legal\w*|metas?)\b/,
  panorama: /\b(que|cuales|las|los|todas?|todos?|principales)\b.*\b(leyes|normas|decretos|reglamentos|normativa)\b|\b(leyes|normas|normativa|marco legal|marco normativo|marco regulatorio|legislacion)\b/,
};

// La frase sin el comienzo de pregunta («que establece la ley de retrofit» -> «ley de retrofit»): sirve para ver si es el comienzo del titulo de una norma.
const RELLENO_INICIAL = new Set("que cual cuales como donde cuando quien quienes hay existe existen alguna algun es son un una el la lo los las dime dame quiero saber ver mostrar muestrame muestra dice establece establecen regula regulan dicen trata tratan habla hablan".split(" "));
function nucleoDe(q) {
  const t = q.split(" ").filter(Boolean);
  let i = 0;
  while (i < t.length - 1 && RELLENO_INICIAL.has(t[i])) i++;
  return t.slice(i).join(" ");
}

// Proyectos o reglamentos en seguimiento que se parecen a lo que se pregunta (por ejemplo, «ley de incentivo a la electromovilidad»: el proyecto aun no existe): hasta 3.
async function proyectosParecidos(env, terminos, directas) {
  if (!directas) return [];
  const m = await datosMarco(env);
  const exigidas = Math.min(2, directas);
  const base = [...terminos].filter(([, w]) => w === 1).map(([t]) => t);
  return filasQueCalzan(m.monitoreo, terminos).filter((r) => base.filter((t) => r.f.has(t)).length >= exigidas).slice(0, 3);
}

async function interpretarNorma(env, texto, q, { previo = null, debil = false, estricto = false } = {}) {
  const crudo = crudoDe(texto);
  const idx = await indiceNormas(env);
  const entidades = entidadesDeNorma(crudo);
  const temas = temasDeLaPregunta(q);
  const base = { tipo: "norma", temas, escrito: "" };
  const fuerte = indiciosNormativos(q, crudo);
  const contenido = tokens(q).filter((t) => t.length >= 3);

  // seguimiento sobre la ultima norma mostrada («¿y qué le falta?», «¿y sus disposiciones?», «¿y el documento?»): frase corta, que empieza con «y» o que habla de «su», «le», «esa norma»
  const elipsis = /^(y|e|pero|ademas|tambien)\b/.test(q) || /\b(le|les|su|sus|esta|este|esa|ese|dicha|dicho|anterior)\b/.test(q) || contenido.length <= 2;
  if (previo && previo.norma && !entidades.length && elipsis && contenido.length <= 7) {
    if (RX.vaciosDe.test(q)) return { ...base, intencion: "norma_vacios", ref: previo.norma };
    if (RX.detalleDe.test(q)) return { ...base, intencion: "norma_detalle", ref: previo.norma };
    if (RX.documentoDe.test(q)) return { ...base, intencion: "norma_documento", ref: previo.norma };
  }
  if (!fuerte && !debil) return null;

  // la frase nombra por completo el titulo de UNA norma concreta («Reglamento de transporte maritimo de mercancias peligrosas»): es esa norma y no el tema de bodegaje en general
  // (varias normas de bodegaje traen en su titulo las mismas palabras de la pregunta general)
  if (!debil && !entidades.length) {
    const porTitulo = idx.filas.filter((r) => {
      if (r.nombre.endsWith("…")) return false;
      const t = tokens(r.nombre.replace(/ ?\(.*?\)/g, "")).join(" ");
      return t.split(" ").length >= 4 && contiene(q, t);
    });
    if (porTitulo.length === 1) return { ...base, intencion: "norma", filas: porTitulo, temas: temasDeNorma(porTitulo[0]).length ? temasDeNorma(porTitulo[0]) : temas };
  }
  // normas de bodegaje de sustancias peligrosas y baterias
  if (!debil && RX.bodegaje.test(q) && !entidades.length) return { ...base, intencion: "bodegaje", temas: ["baterias", "marco_legal"] };

  // una norma por su numero
  if (entidades.length) {
    const conocidas = entidades.filter((e) => e.clase !== "te");
    const hallazgos = [];
    for (const e of conocidas) for (const n of normasPorNumero(idx, e)) if (!hallazgos.includes(n)) hallazgos.push(n);
    if (hallazgos.length === 1) {
      if (RX.vaciosDe.test(q) && !RX.metas.test(q)) return { ...base, intencion: "norma_vacios", ref: { i: hallazgos[0]._i, k: hallazgos[0]._k } };
      return { ...base, intencion: "norma", filas: hallazgos };
    }
    if (hallazgos.length > 1) return { ...base, intencion: "norma_ambigua", filas: hallazgos, entidad: entidades[0].texto };
    return { ...base, intencion: "sin_norma", escrito: entidades[0].texto, porNumero: true };
  }

  const marco = async () => await datosMarco(env);
  // lo que se prohibe o se obliga a comprar o vender: la respuesta es la fuerza juridica de las metas de venta
  if (!debil && PROHIBICION_VENTA.test(q)) {
    const m = await marco();
    const terminos = terminosDeBusqueda("venta vehiculos cero emisiones");
    const filas = filasQueCalzan(m.metas, terminos).filter((r) => /venta/i.test(r.meta)).slice(0, 4);
    if (filas.length) return { ...base, intencion: "metas", filas, anio: null, total: filas.length, fuerza: true, temas: ["meta_2035", ...temas.filter((t) => t !== "meta_2035")] };
  }
  // proyectos de ley y reglamentos pendientes
  if (!debil && RX.proyectos.test(q)) {
    const m = await marco();
    const filas = filasQueCalzan(m.monitoreo, terminosDeBusqueda(q.replace(RX.proyectos, " ")));
    const todas = filas.length ? filas : m.monitoreo;
    return { ...base, intencion: "proyectos", filas: todas.slice(0, 8), total: todas.length, filtrado: filas.length > 0 };
  }
  // preguntas de navegacion («¿en que pagina esta el marco legal?»): solo si la frase no nombra una norma concreta
  if (!debil && RX.nav.test(q) && !buscarNormas(idx, q).ranking.some((r) => r.cubiertas >= 2)) return { ...base, intencion: "nav" };
  // metas y su fuerza juridica
  if (!debil && (RX.metas.test(q) || META_ANIO.test(q))) {
    const m = await marco();
    const anio = (/\b(20[2-5]\d)\b/.exec(q) || [])[1] || null;
    const terminos = terminosDeBusqueda(q.replace(RX.metas, " "));
    let filas = anio ? m.metas.filter((r) => String(r.anio_objetivo).includes(anio)) : m.metas;
    const porTema = filasQueCalzan(filas, terminos);
    if (terminos.size && porTema.length) filas = porTema;
    return {
      ...base, intencion: "metas", filas: filas.slice(0, 8), anio, total: filas.length, fuerza: FUERZA_JURIDICA.test(q),
      temas: ["meta_2035", ...temas.filter((t) => t !== "meta_2035")],
    };
  }
  // brechas legales (que falta en la ley)
  if (!debil && RX.brechas.test(q) && (PALABRAS_LEGALES.test(q) || FRASES_LEGALES.test(q))) {
    const m = await marco();
    const terminos = terminosDeBusqueda(q.replace(RX.brechas, " "));
    const filas = filasQueCalzan(m.brechas, terminos);
    const orden = { maxima: 0, alta: 1, media: 2, baja: 3 };
    const elegidas = (filas.length ? filas : m.brechas.slice().sort((a, b) => orden[a.urgencia] - orden[b.urgencia])).slice(0, 8);
    return { ...base, intencion: "brechas", filas: elegidas, total: (filas.length ? filas : m.brechas).length, filtrado: filas.length > 0 };
  }

  // normas por tema o por nombre
  const { ranking, directas, terminos } = buscarNormas(idx, q);
  const umbral = fuerte ? 2.2 : 4.5;
  const minimas = Math.min(2, Math.max(1, directas));
  // Con palabras propias de leyes basta una palabra rara y muy especifica; sin ellas (pregunta «debil») hacen falta al menos dos palabras de la pregunta en la norma,
  // o una sola pero que este en el TITULO de la norma («licitacion», «tributaria»); `estricto` (la frase no trae ninguna pista de leyes) exige siempre las dos palabras
  const enTitulo = (n) => [...terminos].some(([t, w]) => w === 1 && n.f_titulo.has(t));
  const mejores = ranking.filter((r) => r.puntaje >= umbral && (r.cubiertas >= minimas || (fuerte ? r.puntaje >= umbral * 2 : !estricto && r.cubiertas >= 1 && enTitulo(r.n))));
  if (mejores.length) {
    // Una sola tarjeta solo si la pregunta apunta a UNA norma: nombra su titulo («reglamento de copropiedad»), es el comienzo de su titulo («ley de retrofit»), repite
    // un par de palabras de su titulo que ninguna otra tiene («euro 6», «impuesto verde»), o es claramente la que mas calza y trae todas las palabras. Si no, una lista.
    const nucleo = nucleoDe(q);
    const pares = paresDe(q);
    const conTitulo = mejores.filter((x) => {
      if (x.n.nombre.endsWith("…")) return false;
      const titulo = tokens(x.n.nombre).join(" ");
      return (tokens(x.n.nombre).length >= 2 && contiene(q, titulo)) || (nucleo.split(" ").length >= 2 && contiene(titulo, nucleo));
    });
    const conPar = mejores.filter((x) => pares.some((p) => x.n._t.includes(p)));
    const nombradas = conTitulo.length ? conTitulo : conPar;
    // TODAS las palabras que se preguntan («SOAP») estan en el TITULO de una sola norma y en el texto de las demas: es esa («¿que ley regula el SOAP?» -> Ley 18.490, no tambien la de
    // Transito). Si alguna palabra no esta en ningun titulo («ley de incentivo a la electromovilidad»: ninguna norma se llama asi) sigue siendo una lista.
    const directos = [...terminos].filter(([, w]) => w === 1).map(([t]) => t);
    // (solo con una palabra: con dos o mas, como «placa verde», es mejor mostrar la lista de las normas que calzan)
    const unicaEnTitulo = nombradas.length !== 1 && mejores.length >= 2 && directos.length === 1 ? mejores.filter((x) => x.n.f_titulo.has(directos[0])) : [];
    const primera = nombradas.length === 1 ? nombradas[0] : unicaEnTitulo.length === 1 ? unicaEnTitulo[0] : mejores[0];
    const otras = mejores.filter((x) => x !== primera);
    const segunda = otras[0];
    const dominante = !segunda || nombradas.length === 1 || unicaEnTitulo.length === 1 || (primera.puntaje >= 2 * segunda.puntaje && primera.cubiertas >= Math.min(2, directas));
    // «que leyes hay sobre ...», «normas de ...»: la persona pide varias; una sola tarjeta solo si de verdad hay una
    const pideVarias = /\b(leyes|normas|decretos|reglamentos|resoluciones|normativas?)\b/.test(q) && mejores.length >= 2 && nombradas.length !== 1;
    const parecidos = await proyectosParecidos(env, terminos, directas);
    if (dominante && !pideVarias) {
      if (RX.vaciosDe.test(q)) return { ...base, intencion: "norma_vacios", ref: { i: primera.n._i, k: primera.n._k } };
      return { ...base, intencion: "norma", filas: [primera.n], relacionadas: otras.slice(0, 3).map((x) => x.n), porTema: true, parecidos };
    }
    return { ...base, intencion: "normas_lista", filas: mejores.slice(0, 6).map((x) => x.n), total: mejores.length, buscado: [...terminos.keys()], parecidos };
  }
  // ninguna norma calza, pero la frase pregunta por un proyecto o reglamento que si esta en seguimiento («ley de incentivo a la electromovilidad»)
  if (!debil) {
    const parecidos = await proyectosParecidos(env, terminos, directas);
    if (parecidos.length) return { ...base, intencion: "proyectos", filas: parecidos, total: parecidos.length, filtrado: true };
  }
  if (debil) return null;

  // panoramas generales
  const sinTema = !terminos.size;
  const anio = (/\b(19[5-9]\d|20[0-3]\d)\b/.exec(q) || [])[1];
  if (sinTema && anio) {
    const delAnio = idx.filas.filter((r) => String(r.anio) === anio);
    if (delAnio.length) return { ...base, intencion: "normas_anio", filas: delAnio.slice().sort((a, b) => (a.relevancia === "alta" ? 0 : a.relevancia === "media" ? 1 : 2) - (b.relevancia === "alta" ? 0 : b.relevancia === "media" ? 1 : 2)).slice(0, 8), total: delAnio.length, anio: Number(anio) };
  }
  if (RX.nav.test(q)) return { ...base, intencion: "nav" };
  // «¿y que ley regula eso?»: sin un tema que buscar se pregunta de que se trata, en vez de listar leyes al azar
  if (sinTema && /\b(eso|esto|esa|ese|esos|esas|aquello|lo anterior)\b/.test(q)) return { ...base, intencion: "sin_norma", escrito: "", aclarar: true };
  if (sinTema || RX.panorama.test(q)) {
    const altas = idx.filas.filter((r) => r.relevancia === "alta" && r.tipo === "ley").sort((a, b) => b.anio - a.anio).slice(0, 8);
    return { ...base, intencion: "normas_panorama", filas: altas };
  }
  return { ...base, intencion: "sin_norma", escrito: palabrasClave(q).slice(0, 5).join(" ") };
}
return { indiciosNormativos, indiciosDebiles, pistasDeNorma, entidadesDeNorma, temasDeLaPregunta, temasDeNorma, interpretarNorma };
})();
__mod["agente_web/src/dialogo_norm.js"] = (function () {
// Respuestas del asistente sobre leyes, decretos y normas: arma las tarjetas segun la intencion que dejo nlu_norm.js. Cada respuesta se comprueba antes de mostrarse
// (ninguna cifra puede faltar en los datos usados) y, cuando el catalogo no tiene todo lo que se pide, recomienda las paginas del menu del sitio que sirven para profundizar.
const { crearResponder, nota, sinDato, texto } = __req("agente_web/src/bloques.js");
const { ErrorNormativa, bloqueLista, bloqueNorma, bloquePaginas, bloqueVacios, bloquesDecretos, bloquesDocumento, datosMarco, datosNav, indiceNormas, normaPorRef, paginasDeTemas, paginasParecidas, palabrasClave } = __req("agente_web/src/normativa.js");
const { urlExterna } = __req("agente_web/src/enlaces.js");
const { temasDeNorma } = __req("agente_web/src/nlu_norm.js");
const { fmtNumero } = __req("servidor/src/util.js");
const { urlPublica } = __req("servidor/src/config.js");

const responder = crearResponder("normativa");
const chip = (etiqueta, norma) => ({ etiqueta, accion: { norma } });
const refN = (r) => ({ i: r._i, k: r._k });

const EJEMPLOS_NORMATIVA = [
  "¿Qué dice la Ley 21.505?",
  "¿Qué normas regulan los cargadores?",
  "¿Es obligatoria la meta 2035?",
  "¿Qué falta en la ley para los cargadores?",
];

const NOTA_LEGAL = "Resumen del catálogo del sitio; no es asesoría legal. Para decidir algo, revisa el texto oficial en el documento enlazado.";
const NOTA_LEGAL_LISTA = "Resumen del catálogo del sitio; no es asesoría legal. Elige una norma para ver su detalle y su documento.";
const NOTA_LEGAL_SIN_ENLACE = "Resumen del catálogo del sitio; no es asesoría legal. Para decidir algo, consulta el texto oficial de la norma.";
const NOTA_LEGAL_NCH_CON_DECRETO = "Resumen del catálogo del sitio; no es asesoría legal. El texto de la NCh es del INN y no se enlaza; el decreto enlazado es el que la hace obligatoria.";
const NOTA_ANALISIS = "«Importancia», «vacíos» y «propuestas» son el análisis del sitio, no texto oficial.";

// Paginas del menu que sirven para profundizar: nunca rompen la respuesta si el menu no se pudo leer.
async function bloqueMenu(env, temas, max, titulo) {
  try {
    const nav = await datosNav(env);
    return bloquePaginas(paginasDeTemas(env, nav, temas, max), titulo);
  } catch (e) {
    if (e instanceof ErrorNormativa) return null;
    throw e;
  }
}

// Paginas del sitio que se parecen a una pregunta que el asistente no sabe responder con datos («que es el PELP»): nunca rompen la respuesta (sin menu, no hay bloque).
async function bloqueDePaginasPara(env, texto) {
  try {
    const nav = await datosNav(env);
    return bloquePaginas(paginasParecidas(env, nav, texto, 3), "Estas páginas del sitio pueden servirte");
  } catch (e) {
    if (e instanceof ErrorNormativa) return null;
    throw e;
  }
}

// Una pagina del menu del sitio por su direccion, con el nombre y la descripcion que el propio menu trae (temas_pagina.js). Si el menu no se pudo leer, un enlace simple con el nombre conocido.
async function bloqueDePagina(env, href, nombre, titulo = "Abre esta página del sitio") {
  try {
    const nav = await datosNav(env);
    const p = nav.paginas.find((x) => x.href === href);
    if (p) return bloquePaginas([{ texto: p.etiqueta, url: `${urlPublica(env)}/${p.href}`, desc: corto(p.descripcion, 130) }], titulo);
  } catch (e) {
    if (!(e instanceof ErrorNormativa)) throw e;
  }
  return { tipo: "enlace", verificar: false, texto: nombre, url: `${urlPublica(env)}/${href}` };
}

// Agrega al final la lista de paginas del menu para los temas dados (`titulo` cambia el encabezado de la lista, p. ej. cuando el texto anterior ya la presenta).
const conMenu = async (env, temas, bloques, max = 4, titulo = undefined) => {
  const m = await bloqueMenu(env, temas, max, titulo);
  return m ? [...bloques, m] : bloques;
};

// Fecha del estado de los proyectos: «2026-07-22» -> «22 de julio de 2026».
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
function fechaLarga(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  return m ? `${Number(m[3])} de ${MESES[Number(m[2]) - 1]} de ${m[1]}` : "";
}

const valorTexto = (v) => (typeof v === "number" ? fmtNumero(v) : String(v));
const corto = (s, n) => (s && s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "").replace(/[,;:. ]+$/, "") + "…" : s || "");

// ---- una norma -----------------------------------------------------------------------------------------------------------------------
function chipsDeNorma(r, { sin = [] } = {}) {
  const s = [];
  if (r.disposiciones && !sin.includes("detalle")) s.push(chip("Ver disposiciones clave", { intencion: "norma_detalle", ...refN(r) }));
  if ((r.vacios || r.propuesta) && !sin.includes("vacios")) s.push(chip("¿Qué le falta a esta norma?", { intencion: "norma_vacios", ...refN(r) }));
  return s;
}

// Temas del menu para una norma: los de la pregunta y los de la propia norma (la Ley 21.505 habla de almacenamiento y de permisos de circulacion), y siempre el marco legal.
const temasDe = (interp, r) => [...new Set([...(interp.temas || []).filter((t) => t !== "marco_legal"), ...temasDeNorma(r).slice(0, 2), "marco_legal"])];

// Proyectos o reglamentos en seguimiento que se parecen a la pregunta: el sitio los registra aparte de las normas vigentes («Proyecto de Ley de Incentivo a la Electromovilidad: NO EXISTE AUN»).
// Devuelve los bloques y lo que respalda sus cifras (las filas y la fecha del estado).
async function datosParecidos(env, parecidos) {
  if (!parecidos || !parecidos.length) return { bloques: [], respaldo: {} };
  const estadoAl = (await datosMarco(env)).arch.monitoreo_estado_al;
  const al = fechaLarga(estadoAl);
  return {
    bloques: [{
      tipo: "cifras", verificar: true, estilo: "lista", titulo: "También en seguimiento, relacionado con tu pregunta", subtitulo: al ? `Proyectos o reglamentos · estado al ${al}, según el sitio` : "Proyectos o reglamentos, según el sitio",
      filas: parecidos.map((m) => [corto(m.item, 90), `${m.estado} · Fecha esperada: ${m.fecha_esperada || "sin fecha"}`]),
    }],
    respaldo: { parecidos, meta: { estado_al: estadoAl } },
  };
}

// Los decretos que hacen obligatoria una norma (campo `obligatoria_por`: rotulos de otras normas del mismo catalogo, que llevan su propio enlace). Sin ellos, la norma se cita como siempre.
async function decretosDe(env, r) {
  if (!r.obligatoria_por || !r.obligatoria_por.length) return [];
  const idx = await indiceNormas(env);
  return r.obligatoria_por.map((k) => normaPorRef(idx, { k })).filter(Boolean);
}

// Bloques del documento de una norma: su enlace (o la nota de las NCh, que no se enlazan) y, si los tiene, los decretos que la hacen obligatoria.
async function documentosDe(env, r) {
  const decretos = await decretosDe(env, r);
  return { bloques: [...bloquesDocumento(r), ...bloquesDecretos(r, decretos)], decretos };
}

const notaLegalDe = (r, documento, decretos) => (r.tipo === "nch" && decretos.length ? NOTA_LEGAL_NCH_CON_DECRETO : documento.some((x) => x.tipo === "enlace") ? NOTA_LEGAL : NOTA_LEGAL_SIN_ENLACE);

async function normaUna(env, interp, estado, { completo = false } = {}) {
  const r = interp.filas[0];
  const pa = await datosParecidos(env, interp.parecidos);
  const { bloques: documento, decretos } = await documentosDe(env, r);
  const bloques = [bloqueNorma(r, { completo }), ...documento, ...pa.bloques, nota(notaLegalDe(r, documento, decretos))];
  const relacionadas = (interp.relacionadas || []).slice(0, 2);
  return responder({
    entendi: `Entendí tu pregunta como: ${r.rotulo}`,
    bloques: await conMenu(env, temasDe(interp, r), bloques), resultado: { filas: [r, ...relacionadas], ...pa.respaldo },
    opciones: [], siguientes: [...chipsDeNorma(r, { sin: completo ? ["detalle"] : [] }), ...decretos.map((d) => chip(d.rotulo, { intencion: "norma", ...refN(d) })), ...relacionadas.map((x) => chip(x.rotulo, { intencion: "norma", ...refN(x) }))].slice(0, 4),
    depuracion: { intencion: "norma", norma: r.rotulo }, previo: { norma: refN(r) },
  }, estado);
}

async function normaDeRef(env, interp) {
  const idx = await indiceNormas(env);
  return { idx, r: normaPorRef(idx, interp.ref || {}) };
}

async function normaDetalle(env, interp, estado) {
  const { r } = await normaDeRef(env, interp);
  if (!r) return sinDato("Esa norma ya no está en el catálogo del sitio. Prueba escribiendo su nombre o su número.");
  if (!r.disposiciones) {
    const { bloques: documento } = await documentosDe(env, r);
    return responder({
      entendi: `Entendí tu pregunta como: disposiciones de ${r.rotulo}`, bloques: await conMenu(env, temasDe(interp, r), [texto(`El catálogo del sitio no trae el detalle de las disposiciones de ${r.rotulo}; sí resume qué regula.`), bloqueNorma(r), ...documento]),
      resultado: { filas: [r] }, siguientes: chipsDeNorma(r, { sin: ["detalle"] }), depuracion: { intencion: "norma_detalle" }, previo: { norma: refN(r) },
    }, estado);
  }
  return normaUna(env, { ...interp, filas: [r], relacionadas: [] }, estado, { completo: true });
}

async function normaVacios(env, interp, estado) {
  const { r } = await normaDeRef(env, interp);
  if (!r) return sinDato("Esa norma ya no está en el catálogo del sitio. Prueba escribiendo su nombre o su número.");
  const hay = Boolean(r.vacios || r.propuesta);
  const bloques = hay ? [bloqueVacios(r), nota(NOTA_ANALISIS)] : [texto(`El catálogo del sitio no identifica vacíos ni propuestas para ${r.rotulo}.`)];
  return responder({
    entendi: `Entendí tu pregunta como: qué le falta a ${r.rotulo}`, bloques: await conMenu(env, temasDe(interp, r), bloques), resultado: { filas: [r] },
    siguientes: [chip(`Ver ${r.rotulo}`, { intencion: "norma", ...refN(r) }), ...chipsDeNorma(r, { sin: ["vacios"] })].slice(0, 3),
    depuracion: { intencion: "norma_vacios", norma: r.rotulo }, previo: { norma: refN(r) },
  }, estado);
}

async function normaDocumento(env, interp, estado) {
  const { r } = await normaDeRef(env, interp);
  if (!r) return sinDato("Esa norma ya no está en el catálogo del sitio. Prueba escribiendo su nombre o su número.");
  const { bloques: docs, decretos } = await documentosDe(env, r);
  return responder({
    entendi: `Entendí tu pregunta como: documento de ${r.rotulo}`,
    bloques: docs.length ? [texto(`Documento de ${r.rotulo}:`), ...docs, nota(r.tipo === "nch" && decretos.length ? NOTA_LEGAL_NCH_CON_DECRETO : NOTA_LEGAL)] : [texto(`El catálogo del sitio no trae un enlace al documento de ${r.rotulo}.`)],
    resultado: { filas: [r] }, siguientes: chipsDeNorma(r), depuracion: { intencion: "norma_documento" }, previo: { norma: refN(r) },
  }, estado);
}

async function normaAmbigua(env, interp, estado) {
  const filas = interp.filas.slice(0, 6);
  return responder({
    entendi: `Entendí tu pregunta como: normas con el número ${interp.entidad}`,
    bloques: [texto("Hay más de una norma que calza con ese número. ¿Cuál buscas?"), bloqueLista(filas, { titulo: "Normas que calzan", subtitulo: "Elige una para ver su detalle" })],
    resultado: { filas }, siguientes: filas.slice(0, 4).map((r) => chip(r.rotulo, { intencion: "norma", ...refN(r) })), depuracion: { intencion: "norma_ambigua" },
  }, estado);
}

// ---- listas de normas -------------------------------------------------------------------------------------------------------------------
async function normasLista(env, interp, estado, original) {
  const filas = interp.filas;
  const pa = await datosParecidos(env, interp.parecidos);
  const tema = palabrasClave(original).slice(0, 4).join(" ") || "tu pregunta";
  const resultado = { filas, ...pa.respaldo, total: { mostradas: filas.length, total: interp.total || filas.length } };
  return responder({
    entendi: `Entendí tu pregunta como: normas sobre ${tema}`,
    bloques: await conMenu(env, interp.temas, [
      bloqueLista(filas, { titulo: `Normas del catálogo sobre «${tema}»`, subtitulo: interp.total > filas.length ? `Las ${filas.length} que más calzan, de ${interp.total}` : `${filas.length} normas` }),
      ...pa.bloques,
      nota(`${NOTA_LEGAL_LISTA} ${NOTA_ANALISIS}`),
    ]),
    resultado, siguientes: filas.slice(0, 4).map((r) => chip(r.rotulo, { intencion: "norma", ...refN(r) })), depuracion: { intencion: "normas_lista", n: filas.length },
  }, estado);
}

async function normasPanorama(env, interp, estado) {
  const marco = await datosMarco(env);
  const filas = interp.filas;
  return responder({
    entendi: "Entendí tu pregunta como: leyes de importancia alta para la electromovilidad",
    bloques: await conMenu(env, interp.temas, [
      texto(`El sitio cataloga ${fmtNumero(marco.arch.kpis.normas)} normas de energía, electromovilidad y transporte. Estas son las leyes de importancia alta, de la más reciente a la más antigua:`),
      bloqueLista(filas, { titulo: "Leyes de importancia alta para la electromovilidad", subtitulo: "Según el análisis del sitio" }),
      nota(NOTA_ANALISIS),
    ]),
    resultado: { filas, kpis: marco.arch.kpis }, siguientes: filas.slice(0, 4).map((r) => chip(r.rotulo, { intencion: "norma", ...refN(r) })), depuracion: { intencion: "normas_panorama" },
  }, estado);
}

async function normasAnio(env, interp, estado) {
  const filas = interp.filas;
  const resultado = { filas, meta: { mostradas: filas.length, total: interp.total, anio: interp.anio } };
  return responder({
    entendi: `Entendí tu pregunta como: normas de ${interp.anio}`,
    bloques: await conMenu(env, interp.temas, [bloqueLista(filas, { titulo: `Normas de ${interp.anio} en el catálogo`, subtitulo: interp.total > filas.length ? `Las ${filas.length} de mayor importancia, de ${interp.total}` : `${filas.length} normas` })]),
    resultado, siguientes: filas.slice(0, 4).map((r) => chip(r.rotulo, { intencion: "norma", ...refN(r) })), depuracion: { intencion: "normas_anio" },
  }, estado);
}

// ---- metas, brechas y proyectos ---------------------------------------------------------------------------------------------------------
async function metas(env, interp, estado) {
  const marco = await datosMarco(env);
  const filas = interp.filas;
  const k = marco.arch.kpis;
  const recorte = interp.total > filas.length ? ` · ${filas.length} de ${interp.total}` : "";
  const tabla = {
    tipo: "cifras", verificar: true, estilo: "lista", titulo: interp.anio ? `Metas oficiales con plazo en ${interp.anio}` : "Metas oficiales", subtitulo: `Y cuánta fuerza jurídica tienen, según el sitio${recorte}`,
    filas: filas.map((m) => [`${corto(m.meta, 90)}: ${valorTexto(m.valor)} ${m.unidad}, plazo ${m.anio_objetivo}`.replace(/ ,/g, ","), m.vinculancia]),
  };
  // La unica meta con rango de ley, tal como la marca el sitio (clase «vinculante»); si el archivo no la trae, solo se da el conteo.
  const unica = marco.metas.find((m) => m.clase === "vinculante");
  const rango = k.metas_vinculantes === 1 ? "solo 1 tiene rango de ley" : `solo ${fmtNumero(k.metas_vinculantes)} tienen rango de ley`;
  const aviso = `De las ${fmtNumero(k.metas)} metas oficiales que cataloga el sitio, ${rango}${unica && k.metas_vinculantes === 1 ? ` (${unica.meta}, ${unica.anio_objetivo})` : ""}; las demás son declarativas, compromisos de gobierno, indicativas o de política.`;
  const cuerpo = interp.fuerza ? [texto(aviso), tabla] : [tabla, nota(aviso)];
  return responder({
    entendi: `Entendí tu pregunta como: metas oficiales${interp.anio ? " de " + interp.anio : ""}`,
    bloques: await conMenu(env, interp.temas, cuerpo), resultado: { filas, kpis: k, unica, meta: { mostradas: filas.length, total: interp.total, anio: interp.anio } },
    siguientes: [{ etiqueta: "¿Qué brechas legales hay para la meta 2035?", accion: { pregunta: "¿Qué brechas legales hay para la meta 2035?" } }],
    depuracion: { intencion: "metas", n: filas.length },
  }, estado);
}

async function brechas(env, interp, estado) {
  const marco = await datosMarco(env);
  const filas = interp.filas;
  const recorte = interp.total > filas.length ? ` · ${filas.length} de ${interp.total}` : "";
  const tabla = {
    tipo: "cifras", verificar: true, estilo: "lista", titulo: "Brechas legales que identifica el sitio", subtitulo: `${interp.filtrado ? "Las que más calzan con tu pregunta" : "Las de mayor urgencia"}${recorte}`,
    filas: filas.map((b) => [corto(b.brecha, 90), `Urgencia ${b.urgencia} · Norma que toca: ${corto(b.instrumento, 70)}`]),
  };
  return responder({
    entendi: "Entendí tu pregunta como: brechas legales de la electromovilidad",
    bloques: await conMenu(env, ["marco_legal", ...interp.temas], [tabla, nota(`${NOTA_ANALISIS} El mapa completo de brechas está en la página «Metas y marco legal».`)]),
    resultado: { filas, kpis: marco.arch.kpis, meta: { mostradas: filas.length, total: interp.total } },
    depuracion: { intencion: "brechas", n: filas.length },
  }, estado);
}

async function proyectos(env, interp, estado) {
  const marco = await datosMarco(env);
  const filas = interp.filas;
  const al = fechaLarga(marco.arch.monitoreo_estado_al);
  const recorte = interp.total > filas.length ? ` · ${filas.length} de ${interp.total}` : "";
  const tabla = {
    tipo: "cifras", verificar: true, estilo: "lista", titulo: "Proyectos de ley y reglamentos en seguimiento", subtitulo: `${al ? `Estado al ${al}, según el sitio` : "Según el sitio"}${recorte}`,
    filas: filas.map((m) => [corto(m.item, 90), `${m.estado} · Fecha esperada: ${m.fecha_esperada || "sin fecha"}`]),
  };
  const aclaracion = filas.some((m) => /NO EXISTE/.test(m.estado)) ? "«NO EXISTE AUN» significa que el proyecto o reglamento todavía no se ha presentado o dictado. " : "";
  return responder({
    entendi: "Entendí tu pregunta como: proyectos de ley y reglamentos pendientes",
    bloques: await conMenu(env, ["marco_legal", ...interp.temas], [tabla, nota(`${aclaracion}El estado puede haber cambiado desde esa fecha: revísalo en la página «Metas y marco legal».`)]),
    resultado: { filas, meta: { estado_al: marco.arch.monitoreo_estado_al, mostradas: filas.length, total: interp.total } }, depuracion: { intencion: "proyectos", n: filas.length },
  }, estado);
}

// ---- bodegaje de sustancias peligrosas y baterias -------------------------------------------------------------------------------------------
async function bodegaje(env, interp, estado) {
  const marco = await datosMarco(env);
  const b = marco.arch.bodegaje;
  const items = b.categorias.map((c) => [c.titulo, corto(c.normas.map((n) => n.nombre).slice(0, 2).join("; "), 150)]);
  return responder({
    entendi: "Entendí tu pregunta como: normas de bodegaje de sustancias peligrosas y baterías",
    bloques: await conMenu(env, interp.temas, [texto(b.nota_baterias), { tipo: "lista", verificar: true, items }, nota(`${NOTA_LEGAL_LISTA.replace("Elige una norma para ver su detalle y su documento.", "Elige una categoría para ver sus normas y sus documentos.")} Las normas destacadas son las que el sitio considera más importantes de ese marco.`)]),
    resultado: { bodegaje: b }, siguientes: b.categorias.slice(0, 4).map((c, i) => chip(`Ver normas: ${corto(c.titulo, 40)}`, { intencion: "bodegaje_categoria", i })),
    depuracion: { intencion: "bodegaje" },
  }, estado);
}

async function bodegajeCategoria(env, interp, estado) {
  const marco = await datosMarco(env);
  const c = marco.arch.bodegaje.categorias[interp.i];
  if (!c) return sinDato("No encontré esa categoría de normas.");
  const bloques = [texto(`${c.titulo}:`)];
  for (const n of c.normas) {
    const oficial = n.url ? urlExterna(n.url) : null;
    const copia = n.drive ? urlExterna(n.drive) : null;
    bloques.push({ tipo: "texto", verificar: false, texto: n.nombre });
    if (oficial) bloques.push({ tipo: "enlace", texto: "Texto oficial en la Biblioteca del Congreso Nacional", url: oficial, externo: true });
    if (copia) bloques.push({ tipo: "enlace", texto: "Copia en PDF", url: copia, externo: true });
  }
  return responder({
    entendi: `Entendí tu pregunta como: normas de «${c.titulo}»`, bloques: await conMenu(env, ["baterias"], [...bloques, nota(NOTA_LEGAL)]), resultado: { categoria: c },
    depuracion: { intencion: "bodegaje_categoria" },
  }, estado);
}

// ---- lo que no se encuentra y la navegacion ---------------------------------------------------------------------------------------------
async function sinNorma(env, interp, estado) {
  const ejemplos = EJEMPLOS_NORMATIVA.slice(0, 3).map((e) => ({ etiqueta: e, accion: { pregunta: e } }));
  // «¿y que ley regula eso?» sin tema: se pregunta de que se trata en vez de listar leyes al azar
  if (interp.aclarar) {
    return responder({
      entendi: "Entendí tu pregunta como: una norma, sin decir cuál", bloques: [texto("No me quedó claro sobre qué tema o qué norma preguntas. Dime el número («Ley 21.505») o el tema («normas de cargadores»).")], resultado: {},
      siguientes: ejemplos, depuracion: { intencion: "sin_norma", aclarar: true },
    }, estado);
  }
  let total = null;
  try { total = (await datosMarco(env)).arch.kpis.normas; } catch (e) { if (!(e instanceof ErrorNormativa)) throw e; }
  const que = interp.porNumero ? `la «${interp.escrito}»` : interp.escrito ? `una norma sobre «${interp.escrito}»` : "esa norma";
  const alcance = total ? `, que reúne ${fmtNumero(total)} normas de energía, electromovilidad y transporte (no todas las leyes de Chile)` : "";
  // si la pregunta no se parece a ningun tema del menu, basta la pagina del marco legal (las demas serian relleno)
  const generico = !(interp.temas || []).some((t) => t !== "marco_legal");
  const bloques = await conMenu(env, interp.temas, [texto(`No encontré ${que} en el catálogo del sitio${alcance}.`)], generico ? 1 : 4, generico ? "La página del marco legal puede orientarte" : "Estas páginas del sitio pueden orientarte");
  return responder({
    entendi: "Entendí tu pregunta como: una norma que el catálogo no tiene", bloques, resultado: total ? { kpis: { normas: total } } : {},
    siguientes: ejemplos, depuracion: { intencion: "sin_norma" },
  }, estado);
}

async function nav(env, interp, estado) {
  const especifico = (interp.temas || []).some((t) => t !== "marco_legal");
  return responder({
    entendi: "Entendí tu pregunta como: dónde ver leyes, normas y metas en el sitio",
    bloques: await conMenu(env, interp.temas && interp.temas.length ? interp.temas : ["marco_legal"], [], 4, especifico ? "Estas páginas del sitio tienen lo que buscas" : "Las leyes, normas y metas están en estas páginas del sitio"), resultado: {},
    siguientes: EJEMPLOS_NORMATIVA.slice(0, 3).map((e) => ({ etiqueta: e, accion: { pregunta: e } })), depuracion: { intencion: "nav" },
  }, estado);
}

// ---- punto de entrada ---------------------------------------------------------------------------------------------------------------------
// `interp.aviso`: texto que va antes de la respuesta cuando se levanto una negativa del asistente (nlu.js: «No hago pronosticos; te muestro lo que el sitio registra hoy»).
async function ejecutarNorma(env, interp, original, estado) {
  const r = await ejecutarIntencion(env, interp, original, estado);
  if (interp.aviso && r.tipo === "respuesta") r.bloques = [nota(interp.aviso), ...r.bloques];
  return r;
}

async function ejecutarIntencion(env, interp, original, estado) {
  switch (interp.intencion) {
    case "norma": return await normaUna(env, interp, estado);
    case "norma_detalle": return await normaDetalle(env, interp, estado);
    case "norma_vacios": return await normaVacios(env, interp, estado);
    case "norma_documento": return await normaDocumento(env, interp, estado);
    case "norma_ambigua": return await normaAmbigua(env, interp, estado);
    case "normas_lista": return await normasLista(env, interp, estado, original);
    case "normas_panorama": return await normasPanorama(env, interp, estado);
    case "normas_anio": return await normasAnio(env, interp, estado);
    case "metas": return await metas(env, interp, estado);
    case "brechas": return await brechas(env, interp, estado);
    case "proyectos": return await proyectos(env, interp, estado);
    case "bodegaje": return await bodegaje(env, interp, estado);
    case "bodegaje_categoria": return await bodegajeCategoria(env, interp, estado);
    case "sin_norma": return await sinNorma(env, interp, estado);
    case "nav": return await nav(env, interp, estado);
    default: return sinDato("No entendí esa consulta sobre leyes y normas.");
  }
}

// Botones: la accion lleva la posicion de la norma y su rotulo (clave estable); si el sitio publico datos nuevos entre que se mostro el boton y se toco, gana el rotulo.
async function ejecutarAccionNorma(env, accion, estado) {
  if (accion.intencion === "bodegaje_categoria") return await bodegajeCategoria(env, accion, estado);
  const idx = await indiceNormas(env);
  const r = normaPorRef(idx, accion);
  if (!r) return sinDato("Esa norma ya no está en el catálogo del sitio. Prueba escribiendo su nombre o su número.");
  const interp = { tipo: "norma", intencion: accion.intencion, filas: [r], ref: { i: r._i, k: r._k }, temas: ["marco_legal"], relacionadas: [] };
  return await ejecutarNorma(env, interp, "", estado);
}
return { EJEMPLOS_NORMATIVA, bloqueDePaginasPara, bloqueDePagina, ejecutarNorma, ejecutarAccionNorma };
})();
__mod["agente_web/src/calculos.js"] = (function () {
// Cuentas de las ventas mensuales: la SEGUNDA excepcion a la regla 3 («nada se calcula»), despues del costo de tener (TCO). La autorizo el usuario el 2026-10-24: «sumar los 12 meses, mostrar la diferencia
// de los 12 meses anteriores y porcentajes entre meses».
// Alcance: solo las series mensuales de ventas de las familias de familias_ventas.js (buses, camiones, BEV, PHEV, HEV, MHEV, hidrogeno y autos), y solo en el asistente: el conector (MCP y REST) y los
// archivos ia_* siguen sin calcular nada. Operaciones permitidas, y ninguna otra:
//   (1) la suma de 12 meses seguidos;
//   (2) la diferencia y la variacion porcentual entre esa suma y la de los 12 meses anteriores;
//   (3) la diferencia y la variacion porcentual entre dos meses (el mes anterior, o dos meses cualesquiera que se comparan).
// Todo con enteros (unidades vendidas), sin decimales intermedios: la variacion se redondea a un decimal y la mitad se aleja de cero. Si falta un mes, los meses no son seguidos o la base es cero, NO se
// calcula (se devuelve null): nunca se rellena ni se estima. Cada resultado se muestra rotulado como cuenta del asistente (dialogo.js) y lo vigila agente_web/pruebas/calculos.test.mjs.
const ES_MES = /^\d{4}-(0[1-9]|1[0-2])$/;
const indiceDeMes = (p) => Number(p.slice(0, 4)) * 12 + Number(p.slice(5, 7)) - 1;

// Una serie valida: meses con formato AAAA-MM, sin repetir, con enteros no negativos (unidades). La devuelve ordenada del mes mas antiguo al mas nuevo; null si algo no cuadra.
function serieValida(serie) {
  if (!Array.isArray(serie)) return null;
  const s = serie.map((x) => ({ periodo: x && x.periodo, valor: x && x.valor }));
  if (!s.every((x) => typeof x.periodo === "string" && ES_MES.test(x.periodo) && Number.isSafeInteger(x.valor) && x.valor >= 0)) return null;
  s.sort((a, b) => indiceDeMes(a.periodo) - indiceDeMes(b.periodo));
  for (let i = 1; i < s.length; i++) if (indiceDeMes(s[i].periodo) === indiceDeMes(s[i - 1].periodo)) return null;
  return s;
}

// El mes inmediatamente anterior a uno dado («2026-01» -> «2025-12»); null si no es un mes valido.
function mesAnterior(periodo) {
  if (typeof periodo !== "string" || !ES_MES.test(periodo)) return null;
  const i = indiceDeMes(periodo) - 1;
  return `${Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, "0")}`;
}

const seguidos = (tramo) => tramo.every((x, i) => i === 0 || indiceDeMes(x.periodo) === indiceDeMes(tramo[i - 1].periodo) + 1);
const suma = (tramo) => tramo.reduce((t, x) => t + x.valor, 0);

// Variacion porcentual de `base` a `nuevo`, en decimas de punto porcentual (un entero: 123 = 12,3 %). El redondeo es exacto (enteros, la mitad se aleja de cero). null si la base es cero.
function variacionEnDecimas(base, nuevo) {
  if (!Number.isSafeInteger(base) || !Number.isSafeInteger(nuevo) || base <= 0 || nuevo < 0) return null;
  const n = Math.abs(nuevo - base) * 1000;
  const q = Math.floor(n / base);
  const redondeado = 2 * (n - q * base) >= base ? q + 1 : q;
  return nuevo >= base || redondeado === 0 ? redondeado : -redondeado;       // un cambio menor a 0,05 % es 0,0 % (sin «-0»)
}

// Suma de los ultimos 12 meses y su comparacion con los 12 anteriores: { actual: {desde, hasta, total}, anterior: {desde, hasta, total} | null, diferencia, decimas }.
// Pide que los ultimos 12 meses sean seguidos; los 12 anteriores solo si tambien lo son y empiezan justo antes (si no, `anterior` es null y no hay comparacion).
function resumenDe12Meses(serie) {
  const s = serieValida(serie);
  if (!s || s.length < 12) return null;
  const actual = s.slice(-12);
  if (!seguidos(actual)) return null;
  const total = suma(actual);
  const salida = { actual: { desde: actual[0].periodo, hasta: actual[11].periodo, total }, anterior: null, diferencia: null, decimas: null };
  if (s.length >= 24) {
    const previo = s.slice(-24, -12);
    if (seguidos(previo) && indiceDeMes(previo[11].periodo) + 1 === indiceDeMes(actual[0].periodo)) {
      const totalPrevio = suma(previo);
      salida.anterior = { desde: previo[0].periodo, hasta: previo[11].periodo, total: totalPrevio };
      salida.diferencia = total - totalPrevio;
      salida.decimas = variacionEnDecimas(totalPrevio, total);
    }
  }
  return salida;
}

// Variacion de cada mes respecto del mes inmediatamente anterior: Map(periodo -> { previo, valor, diferencia, decimas }). Un mes cuyo anterior no esta en la serie no aparece.
function variacionesMensuales(serie) {
  const s = serieValida(serie);
  const salida = new Map();
  if (!s) return salida;
  for (let i = 1; i < s.length; i++) {
    if (indiceDeMes(s[i].periodo) !== indiceDeMes(s[i - 1].periodo) + 1) continue;
    salida.set(s[i].periodo, { previo: s[i - 1].valor, valor: s[i].valor, diferencia: s[i].valor - s[i - 1].valor, decimas: variacionEnDecimas(s[i - 1].valor, s[i].valor) });
  }
  return salida;
}

// Diferencia y variacion entre dos meses cualesquiera (de `a` a `b`): { desde, hasta, previo, valor, diferencia, decimas } o null si algun valor no es valido.
function entreDosMeses(a, b) {
  const s = serieValida([a, b]);
  if (!s || s.length !== 2) return null;
  const [x, y] = [a, b].map((m) => ({ periodo: m.periodo, valor: m.valor }));
  return { desde: x.periodo, hasta: y.periodo, previo: x.valor, valor: y.valor, diferencia: y.valor - x.valor, decimas: variacionEnDecimas(x.valor, y.valor) };
}

// ---- como se escriben (formato chileno: punto de miles y coma decimal) ----------------------------------------------------------------
const NF0 = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });
const NF1 = new Intl.NumberFormat("es-CL", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// 123 -> «+12,3 %»; -467 -> «-46,7 %»; 0 -> «0,0 %»; null (base cero) -> «sin base (el mes anterior fue 0)».
function textoDeVariacion(decimas, sinBase = "sin base (el mes anterior fue 0)") {
  if (decimas === null || decimas === undefined) return sinBase;
  const signo = decimas > 0 ? "+" : decimas < 0 ? "-" : "";
  return `${signo}${NF1.format(Math.abs(decimas) / 10)} %`;
}

// 14 -> «+14», -14 -> «-14», 0 -> «0» (el signo va delante; la unidad la pone quien llama).
function textoDeDiferencia(d) {
  return `${d > 0 ? "+" : d < 0 ? "-" : ""}${NF0.format(Math.abs(d))}`;
}
return { serieValida, mesAnterior, variacionEnDecimas, resumenDe12Meses, variacionesMensuales, entreDosMeses, textoDeVariacion, textoDeDiferencia };
})();
__mod["agente_web/src/familias_ventas.js"] = (function () {
// Clases y tecnologias de las que el sitio publica ventas (2026-10-24; pedido del usuario: «para camiones, bev, phev, hev, mhev, etc.. para todas las variantes de preguntas», despues de hacerlo para
// los buses). Una sola tabla que usan nlu.js (de que clase o tecnologia habla la pregunta) y dialogo.js (que ventas se muestran junto al parque y que se sugiere despues de una respuesta), para que
// agregar una clase sea tocar un solo lugar. Aqui no se calcula nada: cada cifra es una medida ya publicada de su indicador.
//   etiqueta   como se nombra en los titulos y en las preguntas que se sugieren: en plural, y lo entiende el propio asistente (lo comprueba ventas_familias.test.mjs)
//   rx         como la nombra la gente (texto sin tildes); la familia «autos» es la general y no tiene
//   mensual    indicador y medida del total del mes; anual: lo mismo para el total del año (ventas_electrificados_anual). medida null = las medidas del indicador en su orden
//   importa    si el sitio publica sus importaciones (se sugiere «¿Cuantos ... se importaron?»)
const FAMILIAS = {
  buses: {
    etiqueta: "buses eléctricos", rx: /\b(bus|buses|minibus\w*|taxibus\w*|autobus\w*)\b/, importa: true, categorias: "Ventas de buses eléctricos por categoría",
    mensual: { indicador: "ventas_buses_mensual", medida: "buses_electricos", titulo: "Ventas mensuales de buses eléctricos" },
    anual: { indicador: "ventas_electrificados_anual", medida: "buses_electricos", titulo: "Ventas de buses eléctricos por año" },
  },
  camiones: {
    etiqueta: "camiones eléctricos", rx: /\b(camion|camiones|tractocamion\w*)\b/, importa: true,
    mensual: { indicador: "ventas_camiones_mensual", medida: "camiones_electricos", titulo: "Ventas mensuales de camiones eléctricos" },
    anual: { indicador: "ventas_electrificados_anual", medida: "camiones_electricos", titulo: "Ventas de camiones eléctricos por año" },
  },
  bev: {
    etiqueta: "eléctricos a batería (BEV)", rx: /\b(bev|electricos? a bateria|solo electricos|a bateria)\b/, importa: true,
    mensual: { indicador: "ventas_enchufables_mensual", medida: "bev", titulo: "Ventas mensuales de eléctricos a batería (BEV)" },
    anual: { indicador: "ventas_electrificados_anual", medida: "bev", titulo: "Ventas de eléctricos a batería (BEV) por año" },
  },
  phev: {
    etiqueta: "híbridos enchufables (PHEV)", rx: /\b(phev|perev|hibridos? enchufables?)\b/, importa: true,
    mensual: { indicador: "ventas_enchufables_mensual", medida: "phev_perev", titulo: "Ventas mensuales de híbridos enchufables (PHEV)" },
    anual: { indicador: "ventas_electrificados_anual", medida: "phev_perev", titulo: "Ventas de híbridos enchufables (PHEV) por año" },
  },
  hev: {
    etiqueta: "híbridos (HEV)", rx: /\b(hev|erev|hibridos? no enchufables?)\b/, importa: true,
    mensual: { indicador: "ventas_enchufables_mensual", medida: "hev_erev", titulo: "Ventas mensuales de híbridos (HEV)" },
    anual: { indicador: "ventas_electrificados_anual", medida: "hev_erev", titulo: "Ventas de híbridos (HEV) por año" },
  },
  mhev: {
    etiqueta: "microhíbridos (MHEV)", rx: /\b(mhev|micro ?hibridos?|mild hybrid)\b/, importa: true,
    mensual: { indicador: "ventas_enchufables_mensual", medida: "mhev", titulo: "Ventas mensuales de microhíbridos (MHEV)" },
    anual: { indicador: "ventas_electrificados_anual", medida: "mhev", titulo: "Ventas de microhíbridos (MHEV) por año" },
  },
  fcev: {
    etiqueta: "vehículos de hidrógeno (FCEV)", rx: /\b(fcev|hidrogeno|celda de combustible)\b/, importa: false,
    mensual: { indicador: "ventas_enchufables_mensual", medida: "fcev", titulo: "Ventas mensuales de vehículos de hidrógeno (FCEV)" },
    anual: { indicador: "ventas_electrificados_anual", medida: "fcev", titulo: "Ventas de vehículos de hidrógeno (FCEV) por año" },
  },
  // «hibridos» a secas: el usuario pidio los hibridos POR SEPARADO (2026-10-24): una respuesta completa para los no enchufables (HEV) y otra para los enchufables (PHEV). No tiene medida propia; sus
  // `partes` son las familias que se responden una tras otra (nlu.js las separa y dialogo.js las junta). Solo sirve para sugerir y para entender la frase.
  hibridos: {
    etiqueta: "híbridos", rx: null, importa: false, partes: ["hev", "phev"],
    mensual: { indicador: "ventas_enchufables_mensual", medida: null, titulo: "Ventas mensuales de híbridos" },
    anual: { indicador: "ventas_electrificados_anual", medida: null, titulo: "Ventas de híbridos por año" },
  },
  // la general («ventas de autos electricos»): solo sirve para sugerir, porque sus respuestas traen varias medidas
  autos: {
    etiqueta: "autos eléctricos", rx: null, importa: true,
    mensual: { indicador: "ventas_enchufables_mensual", medida: null, titulo: "Ventas mensuales de autos eléctricos" },
    anual: { indicador: "ventas_electrificados_anual", medida: null, titulo: "Ventas de autos eléctricos por año" },
  },
};

// Las tecnologias de los livianos y medianos: de ellas el INE no publica el parque (su «electrico» las junta todas con buses y camiones electricos).
const TECNOLOGIAS = ["bev", "phev", "hev", "mhev", "fcev"];
// Lo mismo, incluida «hibridos» a secas (que se responde por partes): para las reglas que valen para una tecnologia o para los dos tipos de hibridos.
const esTecnologia = (clave) => TECNOLOGIAS.includes(clave) || clave === "hibridos";

// Los indicadores mensuales de ventas de las familias: los unicos con los que el asistente hace las cuentas autorizadas (calculos.js).
const INDICADORES_MENSUALES_DE_VENTAS = new Set(Object.values(FAMILIAS).map((f) => f.mensual.indicador));

// «hibridos» a secas, por separado: la medida de cada parte en cada indicador donde hay cifras de hibridos (en las importaciones los identificadores son otros).
const MEDIDAS_DE_HIBRIDOS = {
  ventas_enchufables_mensual: ["hev_erev", "phev_perev"],
  ventas_electrificados_anual: ["hev_erev", "phev_perev"],
  importaciones_electrificados: ["hev", "phev"],
};

// ¿De que clase o tecnologia habla la frase (texto normalizado)? Una sola o ninguna: «electricos e hibridos» o «buses y camiones» son varias cosas y no se adivina cual.
// «hibridos» a secas (sin «enchufables», «no enchufables» ni «electricos») es la familia «hibridos»: los dos tipos, por separado.
function familiaDeLaFrase(q) {
  let t = ` ${q} `;
  const halladas = [];
  // lo mas especifico primero; cada frase reconocida se quita para que «hibridos enchufables» o «microhibridos» no cuenten tambien como «hibridos»
  for (const clave of ["mhev", "phev", "fcev", "bev", "buses", "camiones"]) {
    if (new RegExp(FAMILIAS[clave].rx.source).test(t)) {
      halladas.push(clave);
      t = t.replace(new RegExp(FAMILIAS[clave].rx.source, "g"), " ");
    }
  }
  if (FAMILIAS.hev.rx.test(t)) halladas.push("hev");
  else if (/\bhibridos?\b/.test(t) && !/\belectric/.test(t)) halladas.push("hibridos");
  return halladas.length === 1 ? halladas[0] : null;
}

// Medidas que no nombran una tecnologia o clase en particular: la respuesta es la general («autos»).
const MEDIDAS_GENERALES = new Set([null, undefined, "enchufables", "no_enchufables", "enchufables_todas_las_clases", "total_electrificados", "meses_con_dato",
  "participacion_enchufables_pct", "participacion_hibridos_pct", "participacion_combustion_pct"]);

// ¿De que familia es una respuesta ya armada (indicador y medida pedida)? null si no es de ventas de una clase, de una tecnologia ni de autos en general.
function familiaDeLaRespuesta(indicador, medida) {
  if (indicador === "ventas_buses_mensual") return "buses";
  if (indicador === "ventas_camiones_mensual") return "camiones";
  if (indicador !== "ventas_enchufables_mensual" && indicador !== "ventas_electrificados_anual") return null;
  const lado = indicador === "ventas_enchufables_mensual" ? "mensual" : "anual";
  for (const clave of Object.keys(FAMILIAS)) {
    const f = FAMILIAS[clave][lado];
    if (f.medida && f.indicador === indicador && f.medida === medida) return clave;       // «hibridos» y «autos» no tienen medida propia
  }
  return MEDIDAS_GENERALES.has(medida) ? "autos" : null;
}
return { FAMILIAS, TECNOLOGIAS, esTecnologia, INDICADORES_MENSUALES_DE_VENTAS, MEDIDAS_DE_HIBRIDOS, familiaDeLaFrase, familiaDeLaRespuesta };
})();
__mod["agente_web/src/nlu_veh.js"] = (function () {
// Comprension (sin IA) de preguntas sobre vehiculos: fichas, precios, autonomia, ficha de rescate, etiqueta, seguros, TCO, comparaciones y rankings.
// Devuelve una consulta ya armada (intencion + modelos reconocidos + parametros); dialogo_veh.js la ejecuta. Si la frase no es de vehiculos, devuelve null
// y el asistente sigue con los indicadores. Las reglas son de palabras, no de IA.
const { PALABRAS_NO_MODELO, indiceModelos, indiceTco, datosSeguros, detectarMarcas, reconocer, sinRepetidos, sugerirPorTipografia, tokens } = __req("agente_web/src/vehiculos.js");
const { norm } = __req("servidor/src/util.js");
const { ErrorVehiculos } = __req("agente_web/src/vehiculos.js");

// ¿Lo que se escribio es un vehiculo y nada mas (un modelo, una marca o un modelo mal escrito)? Sirve para completar un pedido que el asistente dejo abierto: las preguntas armadas
// no nombran marcas («revisa la autonomia de los vehiculos»), el asistente pide «marca o modelo» y lo que la persona escribe despues completa la pregunta.
async function pareceNombreDeVehiculo(env, q) {
  const t = tokens(q);
  if (!t.length || t.length > 6 || indiciosFuertes(q) || PREGUNTA_DE_CIFRAS.test(q) || /\b(que|como|cual|cuales|donde|quien|quienes|porque)\b/.test(q)) return false;
  try {
    const modelos = await indiceModelos(env);
    const p = reconocer(modelos, q);
    return p.filas.length > 0 || Boolean(p.marca) || Boolean(sugerirPorTipografia(modelos, q));
  } catch (e) {
    if (e instanceof ErrorVehiculos) return false;
    throw e;
  }
}

// ¿La frase nombra un modelo concreto del padron («Dolphin Mini», «Tesla Model 3»)? Una marca sola no cuenta. Sirve para no tomar «Mini» de «Dolphin Mini» por la marca Mini.
// (tambien las tecnologias y clases: «ventas de PHEV» o «de camiones» no nombran el modelo que lleva «PHEV» en su nombre; 2026-10-24)
const PALABRAS_DE_VENTAS = /\b(ventas?|vendid[oa]s?|vendieron|vendio|vende|venden|se|han?|cuantos?|cuantas?|de|del|la|el|los|las|en|y|e|o|chile|que|marcas?|mercado|participacion|cuota|top|ranking|mas|menos|autos?|vehiculos?|electricos?|bev|phev|perev|hev|erev|mhev|fcev|hibridos?|enchufables?|microhibridos?|hidrogeno|bateria|camion|camiones|bus|buses|ultimos?|meses|mes|ano|anos)\b/g;
async function nombraUnModelo(env, q) {
  try {
    // sin las palabras de ventas («ventas del dolphin mini» -> «dolphin mini»); una marca con palabras sueltas que no son suyas («tesla cybertruck») tambien es un modelo
    const r = reconocer(await indiceModelos(env), q.replace(PALABRAS_DE_VENTAS, " ").replace(/\s+/g, " ").trim());
    return r.filas.length > 0 || Boolean(r.marca && (r.residual || []).some((t) => !tokens(r.marca.frase).includes(t)));
  } catch (e) {
    if (e instanceof ErrorVehiculos) return false;
    throw e;
  }
}

// ---- indicios -------------------------------------------------------------------------------------------------------------------------
const RX = {
  rescate: /\b(rescate|ficha de seguridad|fichas de seguridad|bomberos|guia de emergencia|equipos de emergencia)\b/,
  etiqueta: /\b(etiqueta|eficiencia energetica|certificad[oa]s?|homologad[oa]s?|cit|3cv)\b/,
  seguro: /\b(seguros?|asegurar|asegura|aseguran|asegurad[oa]s?|aseguradoras?|primas?|coberturas?|deducibles?|polizas?)\b/,
  ahorro: /\b(ahorro|ahorrar|ahorra|ahorraria)\b/,
  tcoFuerte: /\b(tco|costo total|costos? de (tener|tenerlo|tenerla|propiedad)|cuanto cuesta (tener|tenerlo|tenerla))\b/,
  tco: /\b(tco|costo total|costos? de (uso|tener|tenerlo|tenerla|propiedad|mantener|mantenerlo|mantenerla|mantencion|operacion)|mantencion|mantener|mantenerlo|mantenerla|mantenimiento|costo (mensual|anual|por km|por kilometro)|gasto (mensual|anual|al mes|al ano)|cuanto (gasto|gastaria|me cuesta|sale|cuesta|cuestan) (tener|tenerlo|tenerla|mantener|usar|andar|operar|al mes|por mes|al ano|por ano)|cuanto cuesta (tener|tenerlo|tenerla|mantener|usar|andar))\b/,
  comparar: /\b(vs|versus|compara|comparar|comparacion|comparado|comparame|contra|diferencia entre|diferencias entre)\b/,
  ranking: /\b(mas|menos|mayor|menor|mejor|mejores|peor|top|ranking|maximo|minimo|barato|baratos|barata|caro|caros|cara|economico|economicos|eficiente|eficientes|grande|grandes|principales)\b/,
  lista: /\b(modelos|que modelos|cuales modelos|que autos|que vehiculos|que electricos|que suv|lista de|catalogo)\b/,
  ficha: /\b(ficha|ficha tecnica|datos|dato|informacion|info|especificaciones|especificacion|caracteristicas|detalles|detalle|cuentame|hablame|que tal|cuales son los datos)\b/,
};

// Campos que se piden por separado.
const CAMPOS_RX = [
  ["autonomia", /\b(autonomia|rango|alcance|cuantos km|cuantos kilometros|recorre|recorrido)\b/],
  ["bateria", /\b(bateria|baterias|kwh|capacidad)\b/],
  ["precio", /\b(precio|precios|valor|cuesta|cuestan|vale|valen|cuanto sale|cuanto salen|cuanto cuesta|cuanto cuestan|cuanto vale)\b/],
  ["rendimiento", /\b(rendimiento|consumo|consume|rinde|rinden|eficiencia|km por kwh|km\/kwh)\b/],
  ["conector", /\b(conector|conectores|enchufe|enchufes|ccs|chademo|tipo 2|tipo 1|carga rapida|carga lenta)\b/],
  ["co2", /\b(co2|emisiones|contamina|contaminacion)\b/],
  ["carroceria", /\b(carroceria|tipo de auto|es suv|es sedan)\b/],
  ["tecnologia", /\b(tecnologia|es hibrido|es electrico|es un hibrido|es un electrico|tipo de motor|motor)\b/],
  ["origen", /\b(origen|pais|grupo|de que pais|donde se fabrica|fabricado)\b/],
  ["anios", /\b(anos|desde que ano|a partir de que ano)\b/],
];

// Medidas de los rankings: campo, sentido por defecto y palabras que lo piden.
const MEDIDAS_RANKING = [
  { id: "autonomia", campo: "autonomia", rx: /\b(autonomia|rango|alcance|recorre|km de autonomia)\b/, mayor: true, nombre: "autonomía", unidad: " km" },
  { id: "bateria", campo: "bateria", rx: /\b(bateria|baterias|kwh|capacidad)\b/, mayor: true, nombre: "capacidad de batería", unidad: " kWh" },
  { id: "rendimiento", campo: "rendimiento", rx: /\b(rendimiento|eficiente|eficientes|eficiencia|consumo|consume|rinde|rinden|menos consume)\b/, mayor: true, nombre: "rendimiento", unidad: " km/kWh" },
  { id: "co2", campo: "co2", rx: /\b(co2|emisiones|contamina)\b/, mayor: false, nombre: "emisiones de CO2", unidad: " g/km" },
  { id: "precio", campo: "precio_min", rx: /\b(precio|barato|baratos|barata|caro|caros|cara|economico|economicos|cuesta|costo)\b/, mayor: false, nombre: "precio", unidad: "" },
];

// Datos que se preguntan seguido y que el padron NO trae: se dice y se muestra lo que si hay.
const NO_DISPONIBLES = [
  ["el peso", /\b(peso|pesa|pesan|kilos|kilogramos)\b/], ["el número de plazas", /\b(plazas|asientos|pasajeros)\b/], ["el maletero", /\b(maletero|baul)\b/],
  ["la potencia", /\b(potencia|caballos|hp)\b/], ["la velocidad máxima", /\b(velocidad maxima|velocidad punta)\b/], ["la aceleración", /\b(aceleracion|0 a 100)\b/],
  ["el tiempo de carga", /\b(que tan rapido (carga|se carga)|rapido carga|velocidad de carga|tiempo de carga)\b/],
  ["la garantía", /\bgarantia\b/], ["las dimensiones", /\b(largo|ancho|dimensiones|medidas)\b/], ["los colores", /\b(color|colores)\b/],
];

const TEC_RX = [
  ["MHEV", /\b(microhibrido|microhibridos|micro hibrido|micro hibridos|mild hybrid|mhev)\b/],
  ["PHEV", /\b(hibrido enchufable|hibridos enchufables|enchufable|enchufables|phev)\b/],
  ["EREV", /\b(rango extendido|erev)\b/],
  ["FCEV", /\b(hidrogeno|celda de combustible|fcev)\b/],
  ["HEV", /\b(hibrido|hibridos|hev)\b/],
  ["BEV", /\b(electrico|electricos|electrica|electricas|bev|100 electrico)\b/],
];

const CARROCERIAS = [
  ["suv", /\bsuvs?\b/], ["hatchback", /\bhatchbacks?\b/], ["sedan", /\bsedanes?\b|\bsedan\b/], ["camioneta", /\b(camionetas?|pickups?|pick up)\b/],
  ["furgon", /\b(furgon|furgones|vans?)\b/], ["station", /\b(station wagon|familiar|familiares)\b/], ["coupe", /\b(coupes?)\b/],
];
const CARROCERIA_ANY = new RegExp(CARROCERIAS.map(([, rx]) => rx.source).join("|"));
// Preguntas que piden cantidades (de ventas, parque, importaciones, por territorio): son de los indicadores del sitio, no del padron de modelos.
const PREGUNTA_DE_CIFRAS = /\b(cuantos|cuantas|cantidad|total|importa\w*|vend\w*|venta\w*|parque|circula\w*|region\w*|comuna\w*|inscrit\w*|matricul\w*|porcentaje|participacion)\b/;

const NUMEROS = { un: 1, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10 };

// Vehiculos que el padron NO trae (pesados, motos, buses): una pregunta de precio con estas palabras es de otros indicadores del sitio.
const OTROS_VEHICULOS = /\b(bus|buses|minibus|camion|camiones|taxi|taxis|colectivo|colectivos|moto|motos|motocicleta|motocicletas|bicicleta|bicicletas|scooter|scooters|tractor|tractores|maquinaria)\b/;
// Palabras de energia: «precio del kWh», «cuanto cuesta cargar» son de los indicadores de precios, no del padron.
const PALABRAS_ENERGIA = /\b(bencina|bencinas|gasolina|diesel|petroleo|combustible|combustibles|kwh|electricidad|carga|cargar|cargador|cargadores|luz|energia|pasaje|peaje)\b/;

// ¿La frase parece de vehiculos aun sin nombrar un modelo? (palabras propias del tema). Sirve para decidir si vale la pena cargar los datos.
// Es solo una pista: interpretarVehiculo devuelve null si despues no encuentra un modelo, un tema o un filtro de vehiculos.
// «electricos a bateria» y «autos a bateria» son el nombre de la tecnologia (BEV), no una pregunta por la capacidad de la bateria (2026-10-24: «¿cuantos electricos a bateria se vendieron en 2025?»
// salia como un ranking de baterias). Para esta capa se dicen «electricos»: el filtro de tecnologia BEV sale igual y la bateria deja de ser el tema.
function sinEtiquetaBev(q) {
  return q.replace(/\b(electricos?|electricas?)\s+a\s+bateria\b/g, "$1").replace(/\b(vehiculos?|autos?)\s+a\s+bateria\b/g, "$1 electricos");
}

function indiciosFuertes(q) {
  q = sinEtiquetaBev(q);
  // «seguro de cesantia», «eficiencia energetica de viviendas», «autonomia del sistema electrico»: comparten palabras con los vehiculos pero hablan de otra cosa,
  // salvo que la frase tambien traiga palabras de autos («seguro de vida para mi auto»)
  if ((NO_ES_DE_AUTOS.test(q) || ELECTRICO_DE_RED_SIMPLE.test(q)) && !hayContextoDeAutos(q) && !/\b(cargador|cargadores|wallbox|bateria|baterias|enchufable|enchufables)\b/.test(q)) return false;
  if (RX.rescate.test(q) || RX.seguro.test(q) || RX.tco.test(q) || /\b(autonomia|bateria|baterias|conector|conectores|etiqueta|eficiencia energetica|especificaciones|ficha tecnica|caracteristicas|rendimiento|consumo|consume|rinde|rinden|eficiente|eficientes)\b/.test(q) ||
    RX.comparar.test(q) || /\b(que modelos|cuales modelos|modelos de|marcas de|catalogo de)\b/.test(q)) return true;
  // «cuanto me ahorro con un auto electrico»
  if (RX.ahorro.test(q) && hayContextoDeAutos(q) && !PALABRAS_ENERGIA.test(q) && !PREGUNTA_DE_CIFRAS.test(q)) return true;
  // «los 3 modelos con menos emisiones»: las emisiones solo son del padron si la frase habla de autos
  if (/\b(co2|emisiones|emision|contamina|contaminan)\b/.test(q) && hayContextoDeAutos(q) && !OTROS_VEHICULOS.test(q) && !PREGUNTA_DE_CIFRAS.test(q)) return true;
  // «SUV electricos bajo 30 millones»: un tope de precio junto a palabras de autos
  if (PRECIO_TOPE_RX.test(q) && hayContextoDeAutos(q)) return true;
  // «los electricos mas caros», «camionetas electricas»: palabras de precio o de carroceria junto a palabras de autos (y sin pedir cantidades, que son de otros indicadores)
  if (hayContextoDeAutos(q) && !PALABRAS_ENERGIA.test(q) && !OTROS_VEHICULOS.test(q) && !PREGUNTA_DE_CIFRAS.test(q) &&
    (/\b(barato|baratos|barata|baratas|caro|caros|cara|caras|economico|economicos)\b/.test(q) || CARROCERIA_ANY.test(q))) return true;
  // «precio del Hyundai Kona», «cuanto cuesta el Kia EV3»: el precio solo es de vehiculos si la frase no habla de bencina, carga o energia ni de otros vehiculos
  return /\b(precio|precios|cuesta|cuestan|vale|valen|cuanto sale|cuanto salen)\b/.test(q) && !PALABRAS_ENERGIA.test(q) && !OTROS_VEHICULOS.test(q);
}

// Pistas que SOLO son de vehiculos (los indicadores no hablan de ficha de rescate, seguros, TCO ni autonomia). Si fallan los datos de vehiculos y la pregunta trae una,
// se avisa en vez de contestar otra cosa; las demas pistas («conectores», «baterias») tambien las usan los indicadores, que siguen respondiendo.
function indiciosExclusivos(q) {
  return RX.rescate.test(q) || RX.seguro.test(q) || RX.tco.test(q) || /\b(autonomia|etiqueta|eficiencia energetica|ficha tecnica|especificaciones|caracteristicas|rinde|rinden)\b/.test(q);
}

// Palabras que dicen «de autos» (sin nombrar un modelo): dan contexto a medidas ambiguas como bateria, precio o rendimiento.
const CONTEXTO_RX = /\b(auto|autos|vehiculo|vehiculos|electrico|electricos|hibrido|hibridos|enchufable|enchufables|suv|suvs|sedan|sedanes|hatchback|hatchbacks|camioneta|camionetas|modelo|modelos|marca|marcas|carro|carros|coche|coches)\b/;
// «sistema electrico», «red electrica», «generacion electrica»: lo electrico es de la red, no de los autos.
const ELECTRICO_DE_RED = /\b(sistema|sistemas|red|redes|mercado|generacion|energia|sector|consumo|transmision|distribucion|suministro|servicio|tarifa|tarifas|cuenta|cuentas|medidor|medidores|corte|cortes|planta|plantas|central|centrales|linea|lineas|infraestructura|matriz|demanda|potencia|capacidad|nacional|publico|publica)\s+electric[oa]s?\b/g;
const ELECTRICO_DE_RED_SIMPLE = new RegExp(ELECTRICO_DE_RED.source);      // sin la bandera g: .test() con g recuerda la posicion
const hayContextoDeAutos = (q) => CONTEXTO_RX.test(q.replace(ELECTRICO_DE_RED, " "));
// Temas de otras cosas que comparten palabras con los vehiculos (seguros, eficiencia energetica, autonomia).
const NO_ES_DE_AUTOS = /\b(cesantia|vida|salud|dental|hogar|casa|casas|vivienda|viviendas|edificio|edificios|desempleo|afp|isapre|fonasa|mascota|mascotas|electrodomestico|electrodomesticos|ampolleta|ampolletas|refrigerador|refrigeradores|pais|region|regiones|comuna|comunas|planee|plan nacional|estrategia)\b/;
const PRECIO_TOPE_RX = /\b(bajo|menos de|menor a|menor que|hasta|maximo|no mas de|por debajo de|sobre|mas de|mayor a|mayor que|desde|minimo|por sobre|entre)\s+\d{1,3}(?:[., ]\d{1,2})?\s*(?:(?:y|a)\s+\d{1,3}(?:[., ]\d{1,2})?\s*)?(millones|millon|mm)\b/;

// ---- parametros -----------------------------------------------------------------------------------------------------------------------
function numeroLetras(s) {
  return NUMEROS[s] || Number(s) || null;
}

// Cambios del TCO que pide la frase: anos, kilometros y octanaje.
function parametrosDeLaFrase(texto, q) {
  const cambios = {};
  const anos = /(\d{1,2}|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez) anos?\b/.exec(q);
  if (anos) {
    const n = numeroLetras(anos[1]);
    if (n >= 1 && n <= 15) cambios.ny = n;
  }
  const crudo = String(texto).toLowerCase().normalize("NFD").replace(/\p{Mn}/gu, "");
  const km = /(\d{1,3}(?:[.\s]\d{3})+|\d+)\s*(mil\s*)?(?:km|kms|kilometros)\b[^.?!]{0,12}\b(al ano|por ano|anuales|anual|al mes|por mes|mensuales|mensual|cada ano|cada mes)/.exec(crudo);
  if (km) {
    let n = Number(km[1].replace(/[.\s]/g, ""));
    if (km[2]) n *= 1000;
    const porAno = /ano|anual/.test(km[3]);
    // sin redondear: la pagina divide los km por año en 12 tal cual («20.000 km al año» = 1.666,67 al mes); redondear a 1.667 mostraria 20.004 km al año y daria otra cifra
    const mensual = porAno ? n / 12 : n;
    if (mensual >= 100 && mensual <= 10000) cambios.kmm = mensual;
  }
  const oct = /\bbencina (93|95|97)\b|\bgasolina (93|95|97)\b|\boctanaje (93|95|97)\b/.exec(q);
  if (oct) cambios.oct = "b" + (oct[1] || oct[2] || oct[3]);
  return cambios;
}

function tecnologiasDe(q) {
  const t = new Set();
  const enchufables = /\b(enchufables|electrificados)\b/.test(q) && !/\bhibrid/.test(q);
  if (enchufables) { t.add("BEV"); t.add("PHEV"); t.add("EREV"); t.add("FCEV"); }
  for (const [id, rx] of TEC_RX) if (rx.test(q)) {
    if (id === "HEV" && (t.has("PHEV") || /hibrido enchufable|hibridos enchufables/.test(q))) continue;
    if (id === "BEV" && /\b(hibrido|hibridos)\b/.test(q) && !/\belectricos? y hibridos?\b/.test(q)) continue;
    t.add(id);
  }
  return [...t];
}

function topDe(q, porDefecto = 5) {
  const m = /\b(?:top|los|las)\s+(\d{1,2}|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\b/.exec(q);
  const n = m ? numeroLetras(m[1]) : null;
  return Math.max(1, Math.min(10, n || porDefecto));
}

// El texto tal como lo escribio la persona pero sin tildes ni mayusculas: conserva las comas de «25,5 millones», que norm() convierte en espacio.
const crudoDe = (texto) => String(texto).toLowerCase().normalize("NFD").replace(/\p{Mn}/gu, "");
const aNumero = (s) => Number(String(s).replace(",", "."));
const millones = (s) => Math.round(aNumero(s) * 1e6);

// Topes de precio en millones de pesos: «bajo 30 millones», «sobre 20 millones», «entre 20 y 30 millones».
function precioTope(crudo) {
  const N = "(\\d{1,3}(?:[.,]\\d+)?)";
  const entre = new RegExp(`\\bentre\\s+${N}\\s*(?:y|a)\\s+${N}\\s*(?:millones|millon|mm)\\b`).exec(crudo);
  if (entre) {
    const a = millones(entre[1]), b = millones(entre[2]);
    return { min: Math.min(a, b), max: Math.max(a, b) };
  }
  const tope = new RegExp(`\\b(?:bajo|menos de|menor a|menor que|hasta|maximo|no mas de|por debajo de)\\s+${N}\\s*(?:millones|millon|mm)\\b`).exec(crudo);
  const piso = new RegExp(`\\b(?:sobre|mas de|mayor a|mayor que|desde|minimo|por sobre)\\s+${N}\\s*(?:millones|millon|mm)\\b`).exec(crudo);
  return { max: tope ? millones(tope[1]) : null, min: piso ? millones(piso[1]) : null };
}

// Autonomia minima pedida: «con mas de 500 km de autonomia». Solo si la frase habla de autonomia (los «km al año» del TCO son otra cosa).
function autonomiaMinima(crudo, q) {
  if (!/\b(autonomia|rango|alcance|recorr\w*)\b/.test(q)) return null;
  const m = /\b(?:mas de|sobre|mayor a|mayor que|al menos|minimo(?: de)?|por sobre|superior a|desde|con)\s+(\d{1,3}(?:[.]\d{3})+|\d{3,4})\s*(?:km|kms|kilometros)\b/.exec(crudo);
  const n = m ? Number(m[1].replace(/[.]/g, "")) : null;
  return n && n >= 100 && n <= 2000 ? n : null;
}

// ---- seguros ---------------------------------------------------------------------------------------------------------------------------
const COBERTURAS_RX = [
  ["bateria_hv", /\b(bateria de alta tension|bateria de traccion|bateria hv|bateria)\b/],
  ["degradacion_bateria", /\b(degradacion|perdida de capacidad)\b/],
  ["cable_cargador_portatil", /\b(cable|cargador portatil)\b/],
  ["wallbox_domicilio", /\b(wallbox|cargador domiciliario|cargador de la casa|cargador del hogar|cargador en casa)\b/],
  ["carga_publica", /\b(carga publica|puntos de carga|cargando|durante la carga|electrolinera)\b/],
  ["asistencia_descarga", /\b(bateria descargada|asistencia por descarga|grua por bateria|me quedo sin bateria|sin carga)\b/],
  ["incendio_origen_electrico", /\b(incendio electrico|incendio de origen electrico|falla electrica|fallas electricas|cortocircuito)\b/],
  ["software_actualizaciones", /\b(software|actualizaciones|actualizacion)\b/],
  ["robo_hurto", /\b(robo|hurto)\b/], ["danos_propios", /\b(danos propios|colision|choque)\b/], ["perdida_total", /\b(perdida total)\b/],
  ["rc_danos_terceros", /\b(responsabilidad civil|danos a terceros)\b/], ["incendio", /\bincendio\b/], ["cristales", /\b(cristales|parabrisas)\b/],
  ["asistencia_grua", /\b(grua|asistencia en ruta)\b/], ["vehiculo_reemplazo", /\b(vehiculo de reemplazo|auto de reemplazo)\b/],
];

// Palabras que no distinguen un producto de otro («Seguro de Auto» lo tienen varias aseguradoras).
const GENERICAS_SEGURO = new Set(["seguro", "seguros", "auto", "autos", "automotriz", "plan", "cobertura", "full", "premium", "basico", "estandar"]);

async function interpretarSeguros(env, q) {
  const seg = await datosSeguros(env);
  const qt = new Set(tokens(q));
  // aseguradora nombrada
  let aseguradora = null;
  for (const a of seg.aseguradoras) {
    const toks = tokens(a.nombre).filter((t) => t.length >= 3 && !["seguros", "chile", "compania", "general", "generales", "sa", "cia"].includes(t));
    if (toks.length && toks.some((t) => qt.has(t))) { aseguradora = a; break; }
  }
  // producto nombrado: todas las palabras (de 4 letras o mas) de su nombre estan en la frase. Si la frase nombra una aseguradora, solo se miran sus productos;
  // si no, un nombre hecho solo de palabras genericas («Seguro de Auto») no alcanza para saber de cual se habla.
  const candidatos = aseguradora ? seg.productos.filter((p) => p.aseg_id === aseguradora.id) : seg.productos;
  let producto = null;
  for (const p of candidatos) {
    const claves = tokens(p.nombre).filter((t) => t.length >= 4);
    const distintivas = claves.filter((t) => !GENERICAS_SEGURO.has(t));
    if (claves.length >= 2 && claves.every((t) => qt.has(t)) && (aseguradora || distintivas.length)) { producto = p; break; }
  }
  if (!producto && aseguradora) {
    // un producto de esa aseguradora cuyo nombre trae alguna palabra distintiva que esta en la frase
    const hit = candidatos.find((p) => tokens(p.nombre).filter((t) => t.length >= 4 && !GENERICAS_SEGURO.has(t)).some((t) => qt.has(t)));
    if (hit) producto = hit;
  }
  if (producto) aseguradora = null;
  const coberturas = COBERTURAS_RX.filter(([, rx]) => rx.test(q)).map(([id]) => id);
  const ev = /\b(electrico|electricos|ev|bateria|enchufable|enchufables|hibrido enchufable|wallbox|carga|cargador|cargadores)\b/.test(q) || coberturas.some((c) => seg.arch.coberturas_ev[c]);
  return { producto, aseguradora, coberturas, ev };
}

// ---- interpretacion general -----------------------------------------------------------------------------------------------------------
function camposDe(q) {
  return CAMPOS_RX.filter(([, rx]) => rx.test(q)).map(([id]) => id);
}

// `sinIndicios`: la frase no trae palabras del tema; solo se acepta si nombra un modelo (o una marca con «modelos de»).
async function interpretarVehiculo(env, texto, q, { previo = null, sinIndicios = false } = {}) {
  q = sinEtiquetaBev(q);
  const fuerte = indiciosFuertes(q);
  const modelos = await indiceModelos(env);
  const p = reconocer(modelos, q);
  const conModelo = p.filas.length > 0;
  const soloMarca = !conModelo && p.marca && p.residual.every((t) => tokens(p.marca.frase).includes(t));
  const contexto = hayContextoDeAutos(q);
  const crudo = crudoDe(texto);
  const precio = precioTope(crudo);
  const autMin = autonomiaMinima(crudo, q);
  const filtrado = Boolean(precio.max || precio.min || autMin);
  const medidaPedida = medidaDeRanking(q, contexto, filtrado, autMin);
  const ranking = (RX.ranking.test(q) && Boolean(medidaPedida)) || (filtrado && contexto && !OTROS_VEHICULOS.test(q));
  const campos = camposDe(q);
  const parametros = parametrosDeLaFrase(texto, q);

  // «revisa el costo de tener UN vehiculo», «la autonomia de LOS vehiculos»: habla de cualquiera, no del ultimo que se vio (asi son las preguntas armadas, que no nombran marcas)
  const generico = /\b(un|una|algun|alguna|cualquier|otro|otra|los|las)\s+(vehiculo|vehiculos|auto|autos|modelo|modelos|electrico|electricos)\b/.test(q) && !/\b(ese|esa|este|esta|mismo|misma|tenerlo|tenerla|su|sus)\b/.test(q);

  // Seguimientos sobre el ultimo vehiculo.
  // «¿y a 10 años?» o «¿y el costo de tenerlo?» despues de un TCO: el mismo vehiculo, con otros supuestos
  if (!conModelo && !generico && previo && previo.vehiculo && previo.vehiculo.tco && (Object.keys(parametros).length || RX.tco.test(q)) && !ranking && !soloMarca) {
    return { tipo: "vehiculo", marca: null, heredado: true, sinCubrir: [], intencion: "tco", tcoIds: previo.vehiculo.tco, filasTco: [], nivelTco: "exacto", sinCubrirTco: [], filasPadron: [], anio: null, parametros };
  }
  // «¿y el TCO?», «¿tiene ficha de rescate?», «¿y su autonomia?»: el ultimo modelo del padron
  let entidad = conModelo ? p : null;
  let heredado = false;
  if (!entidad && !generico && previo && previo.vehiculo && !ranking && !soloMarca && (RX.tco.test(q) || RX.rescate.test(q) || RX.etiqueta.test(q) || campos.length || RX.seguro.test(q) || /^(y|e)\b/.test(q))) {
    const r = modelos.filas.find((x) => x._i === previo.vehiculo.i);
    if (r) { entidad = { nivel: "exacto", filas: [r], residual: [], marca: { clave: r._clave, nombre: r.marca, frase: "" } }; heredado = true; }
  }

  // una marca conocida con palabras que no calzan con ninguno de sus modelos («Tesla Cybertruck»): se dice y se ofrecen los que si estan
  const palabrasSueltas = p.marca ? (p.residual || []).filter((t) => !tokens(p.marca.frase).includes(t)) : [];
  const marcaSinModelo = !entidad && !soloMarca && Boolean(p.marca) && palabrasSueltas.length > 0 && !ranking && !PREGUNTA_DE_CIFRAS.test(q);
  const pideSeguroDeModelo = RX.seguro.test(q) && /\b(seguro|asegurar|prima|cuesta|cuanto)\b/.test(q) && !/\b(que cubre|que cubren|cubre|cubren|cobertura|coberturas)\b/.test(q);

  // un error de tipeo en el nombre («dolfin», «hiunday», «tesla modle 3»): se ofrece lo que se parece, sin elegir por la persona
  if (!entidad && !soloMarca && !ranking && (fuerte || sinIndicios || campos.length || marcaSinModelo)) {
    const s = sugerirPorTipografia(modelos, q);
    if (s) {
      const pedido = RX.rescate.test(q) ? "rescate" : RX.etiqueta.test(q) ? "etiqueta" : pideSeguroDeModelo ? "seguro_modelo" : RX.tco.test(q) ? "tco" : "ficha";
      return { tipo: "vehiculo", marca: s.marca ? s.marca.nombre : null, heredado: false, sinCubrir: [], escrito: "", intencion: "sugerencia", pedido, filas: sinRepetidos(s.filas).slice(0, 4), cambios: s.cambios, parametros, campos, soloCampos: campos.length > 0 && !RX.ficha.test(q) };
    }
  }

  // el modelo no esta en el padron pero si en los datos de costo (casi siempre uno de combustion): se responde con las cifras del TCO
  let tcoSolo = null;
  if (!entidad && !ranking && !soloMarca && !marcaSinModelo && (fuerte || campos.length || sinIndicios)) {
    const t = reconocer(await indiceTco(env), q);
    if (t.filas.length && t.nivel !== "parecido" && (!sinIndicios || t.marca)) tcoSolo = t;
  }

  // sin palabras del tema y sin modelo: no es de vehiculos
  if (!entidad && !soloMarca && !fuerte && !ranking && !marcaSinModelo && !tcoSolo) return null;
  // una marca sola («Tesla», «BYD») es casi siempre una pregunta por sus modelos; con mas palabras que no son del tema, se deja a los indicadores
  if (sinIndicios && !entidad && !marcaSinModelo && !tcoSolo && !(soloMarca && (RX.lista.test(q) || tokens(q).length <= 3))) return null;

  const base = { tipo: "vehiculo", marca: p.marca ? p.marca.nombre : null, heredado, sinCubrir: p.sinCubrir || [], escrito: entidad && entidad.residual ? entidad.residual.join(" ") : "" };

  if (marcaSinModelo && !RX.tco.test(q) && !RX.comparar.test(q) && !RX.lista.test(q) && (!RX.seguro.test(q) || pideSeguroDeModelo)) {
    return { ...base, intencion: "marca_sin_modelo", marcaClave: p.marca.clave, escrito: palabrasSueltas.join(" "), pedido: RX.rescate.test(q) ? "rescate" : RX.etiqueta.test(q) ? "etiqueta" : pideSeguroDeModelo ? "seguro_modelo" : "ficha" };
  }

  // una marca sola con un pedido que necesita un modelo concreto («seguro de un Tesla», «¿tienen ficha de rescate los BYD?»): se pregunta cual
  const pedidoDeModelo = RX.rescate.test(q) ? "rescate" : RX.etiqueta.test(q) ? "etiqueta" : pideSeguroDeModelo ? "seguro_modelo" : null;
  if (!entidad && soloMarca && p.marca && pedidoDeModelo && !RX.tco.test(q) && !RX.comparar.test(q)) {
    return { ...base, intencion: "marca_elegir", marcaClave: p.marca.clave, pedido: pedidoDeModelo };
  }

  // 1. ficha de rescate
  if (RX.rescate.test(q)) return { ...base, intencion: "rescate", filas: entidad ? sinRepetidos(entidad.filas) : [], nivel: entidad ? entidad.nivel : null };
  // 2. etiqueta de eficiencia / certificado
  if (RX.etiqueta.test(q) && (entidad || !RX.seguro.test(q))) return { ...base, intencion: "etiqueta", filas: entidad ? sinRepetidos(entidad.filas) : [], nivel: entidad ? entidad.nivel : null };
  // 3. seguros
  if (RX.seguro.test(q) && !RX.tco.test(q)) {
    if (entidad && pideSeguroDeModelo) return { ...base, intencion: "seguro_modelo", filas: sinRepetidos(entidad.filas), nivel: entidad.nivel };
    const m = await interpretarSeguros(env, q);
    return { ...base, ...m, intencion: "seguros", filas: [] };
  }
  // 4. TCO (costo de tener) y comparaciones de costo
  const pideTco = RX.tco.test(q) || (RX.ahorro.test(q) && contexto);
  const dos = await dosModelos(env, q, modelos);
  if (dos) {
    const costo = pideTco || Boolean(dos[0].tecnologia) || /\b(barato|caro|conviene|cuesta|gasto|ahorro|ahorrar|economico)\b/.test(q);
    // los datos lado a lado salen del padron (solo electrificados); si uno de los dos no esta, se compara el costo de tener, que tambien cubre los de combustion
    const todosEnPadron = dos.every((l) => l.padron.filas.length);
    const todosEnTco = dos.every((l) => l.tco.filas.length);
    if (costo || !todosEnPadron) return { ...base, intencion: "comparar_tco", pares: dos, parametros, porFaltaDePadron: !costo && !todosEnPadron && todosEnTco };
    return { ...base, intencion: "comparar", pares: dos, parametros };
  }
  if (pideTco) {
    // el TCO tambien cubre vehiculos de combustion, que el padron (solo electrificados) no trae: se reconoce en el propio indice del TCO
    const tco = await indiceTco(env);
    let t = reconocer(tco, q);
    // el padron y el TCO escriben distinto el mismo modelo («Kia EV6» / «EV6 EV»): si la frase no lo nombra (seguimiento) se busca por el nombre del padron
    if (!t.filas.length && entidad && entidad.filas.length) {
      const f = entidad.filas[0];
      const alterno = reconocer(tco, norm(`${f.marca} ${f.modelo}`));
      if (alterno.filas.length) t = alterno;
    }
    if (t.filas.length || entidad || p.marca || t.marca) {
      const anio = /\b(20[12]\d)\b/.exec(q);
      return { ...base, intencion: "tco", filasTco: t.filas, nivelTco: t.nivel, sinCubrirTco: t.sinCubrir || [], escritoTco: (t.residual || []).join(" "), filasPadron: entidad ? sinRepetidos(entidad.filas) : [], anio: anio ? Number(anio[1]) : null, parametros, heredado, marca: base.marca || (t.marca ? t.marca.nombre : null) };
    }
    // sin modelo ni marca: «costo de mantencion» tambien se dice de otras cosas (una central, la red); solo es de vehiculos con palabras de autos o del propio TCO
    if ((RX.tcoFuerte.test(q) || contexto) && !OTROS_VEHICULOS.test(q)) return { ...base, intencion: "tco_general" };
    return null;
  }
  // 5. rankings y listas
  if (ranking && !entidad && medidaPedida) {
    const medida = medidaPedida;
    return {
      ...base, intencion: "ranking", medida: medida.id, campo: medida.campo, nombreMedida: medida.nombre, unidad: medida.unidad,
      mayor: rankingMayor(q, medida), tecnologias: tecnologiasDe(q), carroceria: (CARROCERIAS.find(([, rx]) => rx.test(q)) || [null])[0],
      marcaFiltro: p.marca ? p.marca.clave : null, top: topDe(q, filtrado ? 8 : 5), precio, autonomiaMin: autMin,
    };
  }
  // 6. ficha de un modelo (con o sin campos concretos)
  if (entidad) {
    const faltantes = NO_DISPONIBLES.filter(([, rx]) => rx.test(q)).map(([nombre]) => nombre);
    return { ...base, intencion: "ficha", filas: sinRepetidos(entidad.filas), nivel: entidad.nivel, campos, soloCampos: campos.length > 0 && !RX.ficha.test(q), ultimoVehiculo: heredado, faltantes };
  }
  if (tcoSolo) {
    const faltantes = NO_DISPONIBLES.filter(([, rx]) => rx.test(q)).map(([nombre]) => nombre);
    return { ...base, intencion: "solo_tco", filasTco: tcoSolo.filas, nivelTco: tcoSolo.nivel, sinCubrirTco: tcoSolo.sinCubrir || [], escritoTco: (tcoSolo.residual || []).join(" "), campos, soloCampos: campos.length > 0 && !RX.ficha.test(q), faltantes, marca: base.marca || (tcoSolo.marca ? tcoSolo.marca.nombre : null) };
  }
  // 7. marca sola, «modelos de X» o una categoria sin marca («camionetas electricas», «que modelos electricos hay»)
  const carroceria = (CARROCERIAS.find(([, rx]) => rx.test(q)) || [null])[0];
  if (p.marca && (soloMarca || RX.lista.test(q))) {
    return { ...base, intencion: "lista_marca", marcaClave: p.marca.clave, tecnologias: tecnologiasDe(q), carroceria };
  }
  const tecs = tecnologiasDe(q);
  if (!entidad && contexto && !PREGUNTA_DE_CIFRAS.test(q) && !OTROS_VEHICULOS.test(q) && (carroceria || (RX.lista.test(q) && tecs.length))) {
    return { ...base, intencion: "lista_marca", marcaClave: null, tecnologias: tecs, carroceria };
  }
  // 8. «autonomia de los vehiculos» sin modelo, sin comparativo y sin filtros: se pregunta cual (la persona escribe la marca o el modelo; las preguntas armadas no nombran marcas, decision del usuario
  // 2026-10-22). El ranking se pide con «los 5 con mas autonomia».
  if (campos.includes("autonomia") && !entidad && !filtrado && !tecnologiasDe(q).length && !carroceria && !PREGUNTA_DE_CIFRAS.test(q) && !OTROS_VEHICULOS.test(q) && !PALABRAS_ENERGIA.test(q)) {
    return { ...base, intencion: "pedir_vehiculo", pedido: "autonomia" };
  }
  // «capacidad de bateria de los electricos» sin modelo ni comparativo: un ranking corto. Sin palabras de autos, solo la autonomia (bateria, CO2 y rendimiento tambien son de otros temas del sitio).
  if (campos.length && !entidad && (contexto || campos.includes("autonomia"))) {
    const medida = MEDIDAS_RANKING.find((m) => campos.includes(m.id) || (m.id === "precio" && campos.includes("precio")));
    if (medida) return { ...base, intencion: "ranking", medida: medida.id, campo: medida.campo, nombreMedida: medida.nombre, unidad: medida.unidad, mayor: medida.id !== "precio" && medida.id !== "co2", tecnologias: tecnologiasDe(q), carroceria: (CARROCERIAS.find(([, rx]) => rx.test(q)) || [null])[0], marcaFiltro: null, top: topDe(q), precio, autonomiaMin: autMin, generico: true };
  }
  return null;
}

// Medida por la que se ordena: la que nombra la frase (el precio y las demas medidas ambiguas necesitan palabras de autos) o, si solo hay un filtro, la que corresponde al filtro.
function medidaDeRanking(q, contexto, filtrado, autMin) {
  const nombrada = MEDIDAS_RANKING.find((m) => m.rx.test(q) && (m.id === "autonomia" || contexto));
  if (nombrada) return nombrada;
  if (!filtrado) return null;
  return MEDIDAS_RANKING.find((m) => m.id === (autMin ? "autonomia" : "precio"));
}

// ¿De mayor a menor? Autonomia, bateria y rendimiento: los mayores salvo que pida «menos/peor»; precio: los mas baratos salvo que pida «caro/mayor»; CO2: los que menos emiten.
function rankingMayor(q, medida) {
  const menos = /\b(menos|menor|mas bajo|mas baja|minimo|peor)\b/.test(q);
  if (medida.id === "precio") return /\b(caro|caros|cara|mayor precio|maximo|mas caro|mas caros)\b/.test(q) && !/\b(barato|baratos|barata|economico|economicos|menor precio)\b/.test(q);
  if (medida.id === "co2") return /\b(mas emisiones|mayor emision|mayores emisiones|contamina mas)\b/.test(q);
  if (medida.id === "rendimiento") return !/\b(peor|mas consumo|mayor consumo|menos eficiente|menos eficientes)\b/.test(q);
  return !menos;
}

// Dos modelos nombrados en la misma frase («dolphin vs kia rio», «compara el seal y el ioniq 5»): se parte la frase por el conector y se reconoce cada mitad.
async function dosModelos(env, q, modelos) {
  const partes = q.split(/\b(?:vs|versus|contra| y | o |con|entre|comparado con)\b/).map((s) => s.trim()).filter((s) => tokens(s).length);
  if (partes.length < 2) return null;
  const tco = await indiceTco(env);
  const lecturas = [];
  for (const s of partes) {
    const a = reconocer(modelos, s);
    const b = reconocer(tco, s);
    if (a.filas.length || b.filas.length) lecturas.push({ texto: s, padron: a, tco: b });
  }
  // «el Kona electrico o el hibrido»: la segunda mitad solo nombra una tecnologia; es el mismo modelo
  if (lecturas.length === 1 && tecnologiaPedida(lecturas[0].texto)) {
    const otra = partes.find((s) => s !== lecturas[0].texto && tecnologiaPedida(s) && tokens(s.replace(TEC_PEDIDA_TODAS, " ")).every((t) => PALABRAS_NO_MODELO.has(t)));
    if (otra) lecturas.push({ ...lecturas[0], texto: otra });
  }
  if (lecturas.length < 2) return null;
  // el conector «y»/«o» tambien aparece dentro de un nombre («Model Y»): si las dos mitades dan el mismo modelo, no es una comparacion,
  // salvo que pidan dos tecnologias del mismo modelo («el Kona electrico y el Kona bencina»): se comparan esas dos versiones del costo
  const clave = (l) => (l.padron.filas[0] ? `p${l.padron.filas[0]._i}` : `t${l.tco.filas[0]._i}`);
  const [a, b] = lecturas;
  if (clave(a) === clave(b) || (a.tco.filas.length && b.tco.filas.length && a.tco.filas[0].tokens.join(" ") === b.tco.filas[0].tokens.join(" ") && a.tco.filas[0]._clave === b.tco.filas[0]._clave)) {
    const ta = tecnologiaPedida(a.texto), tb = tecnologiaPedida(b.texto);
    if (!ta || !tb || ta === tb) return null;
    const fa = a.tco.filas.filter((v) => v.tp === ta), fb = b.tco.filas.filter((v) => v.tp === tb);
    if (!fa.length || !fb.length) return null;
    return [{ ...a, tco: { ...a.tco, filas: fa, nivel: "exacto" }, tecnologia: ta }, { ...b, tco: { ...b.tco, filas: fb, nivel: "exacto" }, tecnologia: tb }];
  }
  return lecturas.slice(0, 2);
}

// Tecnologia que nombra una mitad de la frase («kona electrico», «kona bencina»).
const TEC_PEDIDA = [
  ["PHEV", /\b(hibrido enchufable|hibridos enchufables|enchufable|phev)\b/], ["HEV", /\b(hibrido|hibridos|hev|mild hybrid)\b/],
  ["ICE", /\b(bencina|gasolina|diesel|petroleo|combustion|convencional)\b/], ["BEV", /\b(electrico|electrica|bev|ev)\b/],
];
const tecnologiaPedida = (s) => (TEC_PEDIDA.find(([, rx]) => rx.test(s)) || [null])[0];
const TEC_PEDIDA_TODAS = new RegExp(TEC_PEDIDA.map(([, rx]) => rx.source).join("|"), "g");
return { pareceNombreDeVehiculo, nombraUnModelo, sinEtiquetaBev, indiciosFuertes, indiciosExclusivos, parametrosDeLaFrase, interpretarSeguros, interpretarVehiculo, detectarMarcas };
})();
__mod["agente_web/src/temas_pagina.js"] = (function () {
// Temas que el sitio tiene en una pagina y que el asistente NO responde con cifras: en vez de contestar otro dato (o nada), lo dice y lleva a la pagina.
// No agrega ninguna cifra: es el mismo recurso que el costo de tener (TCO) y la meta 2035. Las expresiones van SIN tildes ni ñ (el texto llega normalizado) y son estrechas a proposito.
// Cada elemento de `rx` es una expresion o una lista de expresiones que deben calzar TODAS (una sola palabra comun no basta). Los `ejemplos` (deben calzar) y los `negativos`
// (preguntas parecidas que NO son de este tema) de cada tema viven en pruebas/temas_pagina_casos.mjs, para que el paquete que viaja al sitio no lleve textos de prueba; los comprueba
// temas_pagina.test.mjs, que ademas exige que la pagina exista en el menu del sitio.
// `pagina: null` = no hay pagina del sitio para el tema: solo se avisa. `chips` son preguntas que el asistente si sabe responder y que se ofrecen a continuacion.

const TEMAS_DE_PAGINA = [
  {
    id: "vertimiento", pagina: "vertimiento.html", nombre: "Vertimiento renovable", tema: "el vertimiento de energía renovable (la energía eólica, solar e hidro que el sistema no pudo absorber)",
    rx: [/\bvertimientos?\b/, /\bvertid[oa]s?\b/, /\bse vert(io|ieron|e|en|ia)\b/, /\bverter\b/, /\b(reduccion|reducciones|recorte|recortes) de (la )?(generacion|energia|produccion)( renovable| solar| eolica| hidro)?\b/, /\bcurtailment\b/,
         /\benergia (solar|eolica|renovable|limpia) (desperdiciada|perdida|botada|no aprovechada|que se pierde|que se desperdicia)\b/, /\bdesperdicio de energia\b/],
    chips: ["¿Qué porcentaje de la electricidad es renovable?", "¿Cuánta energía solar se genera?"],
  },
  {
    id: "demanda_ev", pagina: "demanda-ev.html", nombre: "Demanda del parque EV", tema: "la demanda eléctrica del parque de vehículos eléctricos",
    rx: [[/\b(demanda|consumo|gasto) (electric\w+|de (energia|electricidad|luz|potencia))\b/, /\b(parque|flota|autos electricos|vehiculos electricos|electricos|ev|electromovilidad)\b/, /\b(parque|flota|todos|todas|chile|pais|nacional|sistema|red|sen|crecimiento|futuro|proyeccion|conjunto|total)\b/],
         [/\bcuanta (energia|electricidad|luz|potencia)\b/, /\b(consum\w+|usa|usan|gasta\w*|necesit\w+|demand\w+|requier\w+)\b/, /\b(parque|flota|autos|vehiculos|electricos|ev)\b/, /\b(parque|flota|todos|chile|pais|nacional|sistema|red|sen)\b/],
         [/\bimpacto\b/, /\b(autos|vehiculos|parque|electromovilidad|ev)\b/, /\b(red|demanda|sistema electrico|sen)\b/]],
    chips: ["¿Cuántos autos eléctricos hay en Chile?", "¿Cuánta energía solar se genera?"],
  },
  {
    // la proyeccion al 2030 o 2035 de autos, ventas y cargadores la calculan las paginas del sitio con la meta y el ritmo actual (no es un dato publicado); la que SI esta publicada (parque 2025) se responde con su indicador
    id: "trayectoria_2035", pagina: "tracker.html", nombre: "Meta 2035", pagina2: "reporte-regional.html", nombre2: "Reporte Regional", tema: "la proyección de autos eléctricos, ventas y cargadores hacia 2035",
    texto: "No tengo publicada una proyección de autos eléctricos, ventas o cargadores para esos años: la calculan dos páginas del sitio con la meta y el ritmo actual (el país en «Meta 2035» y cada región en «Reporte Regional»), y ahí puedes cambiar los supuestos.",
    rx: [[/\b(habra|habran|seran|llegar\w*|alcanzar\w*|necesit\w+|haran falta|faltaran|proyec\w+|estimac\w+|cuantos|cuantas)\b/, /\b(autos|vehiculos|electricos|ev|parque|cargadores|puntos de carga|estaciones|participacion|ventas|enchufables|buses)\b/, /\b(203\d|204\d|2050|2030)\b/]],
    chips: ["Revisa la proyección del parque de vehículos", "¿Cuántos autos eléctricos hay en Chile?"],
  },
  {
    id: "cargadores_importados", pagina: "cargadores-importacion.html", nombre: "Importación de cargadores EV", tema: "las importaciones de cargadores para vehículos eléctricos",
    rx: [/\b(import\w+|ingresan|ingresaron|ingresados|llegan|llegaron|entran|entraron|traen|trajeron|trae)\b.{0,50}\b(cargadores?|evse|wallbox|wall box|puntos? de carga)\b/, /\b(cargadores?|evse|wallbox|wall box)\b.{0,40}\b(import\w+|aduana|ingresan al pais|traidos|importadores?)\b/],
    chips: ["¿Cuántos cargadores hay en el Biobío?", "Las 5 regiones con más cargadores"],
  },
  {
    id: "baterias_importadas", pagina: "baterias.html", nombre: "Importaciones de baterías de litio", tema: "las importaciones de baterías de litio",
    rx: [/\b(import\w+|ingresan|ingresaron|ingresados|llegan|llegaron|entran|entraron|traen|trajeron)\b.{0,50}\b(baterias?|litio|celdas?)\b/, /\b(baterias?|litio|celdas?)\b.{0,40}\b(import\w+|aduana|ingresan al pais|traidas?|importadores?)\b/],
    chips: ["Capacidad de almacenamiento de baterías", "¿Cuántos autos eléctricos se importaron?"],
  },
  {
    id: "rotacion", pagina: "rotacion.html", nombre: "Rotación de inventario", tema: "la rotación de inventario de las marcas",
    rx: [/\brotacion\b/, /\binventarios?\b/, /\b(stock|autos?|vehiculos?|unidades) (sin vender|acumulad\w+|en bodega|en inventario)\b/, /\bcuanto (tarda|tardan|demora|demoran)\b.{0,25}\b(en )?(vender|venderse)\b/],
    chips: ["Las 5 marcas con más ventas", "¿Cuántos autos eléctricos se vendieron en 2025?"],
  },
  {
    id: "grupos_economicos", pagina: "grupos-economicos.html", nombre: "Grupos económicos", tema: "los grupos económicos presentes en la carga, los combustibles y la energía",
    rx: [/\bgrupos? (economic\w+|empresarial\w*|de poder)\b/, /\bholdings?\b/, /\bconglomerad\w+\b/],
    chips: ["¿Quién tiene más cargadores?", "¿Qué tan concentrada está la carga en Aysén?"],
  },
  {
    id: "horas_de_carga", pagina: "horas.html", nombre: "Mejor hora", tema: "las mejores horas para cargar",
    rx: [/\b(a que hora|en que horario|a que horas|que hora|que horario|cuando)\b.{0,30}\b(conviene|es mejor|mejor|barat\w+|menos (gente|ocupad\w+|congestion\w*|fila)|hay menos fila)\b.{0,30}\b(cargar|recargar|carga|cargadores?)\b/,
         /\b(a que hora|en que horario|a que horas)\b.{0,15}\b(conviene|puedo|debo|deberia|es bueno) (cargar|recargar)\b/, /\bmejor (hora|horario|momento) (para|de) (cargar|recargar|carga)\b/, /\bhora verde\b/,
         /\bhorarios? (de|para) (carga|cargar|recargar)\b/, /\bocupacion (por|a cada) hora\b/, /\bhoras? de (mayor|menor) (ocupacion|uso|demanda)\b/, /\ba que hora (se )?(ocupan|usan|llenan|saturan)\b.{0,20}\b(cargadores|estaciones|red)\b/],
    chips: ["¿Cuántos cargadores están disponibles ahora?", "¿Cuál es el precio de la carga por kWh?"],
  },
  {
    id: "inversion", pagina: "inversion.html", nombre: "Inversión verde", tema: "la inversión y el financiamiento verde",
    rx: [/\binversion(es)?\b.{0,40}\b(electromovilidad|carga|cargadores|verde|verdes|renovables?|energia|energias|solar|almacenamiento|bess|hidrogeno|transporte)\b/, /\b(electromovilidad|cargadores|renovables?|energia|energias|almacenamiento|bess|hidrogeno)\b.{0,40}\binversion(es)?\b/,
         /\b(financiamiento|financiar|creditos? verdes?|bonos? verdes?|instrumentos? (de|para) (inversion|financiamiento)|fondos? (para|de) (inversion|electromovilidad|energia|cargadores))\b/, /\bcuanto se (ha )?invert\w+\b/, /\bcuanta inversion\b/],
    chips: ["¿Cuántos cargadores hay en el Biobío?", "¿Qué normas regulan los cargadores?"],
  },
  {
    id: "reporte_regional", pagina: "reporte-regional.html", nombre: "Reporte Regional", tema: "el reporte de una región o comuna",
    rx: [/\b(reporte|informe|dossier|ficha) (regional|comunal)\b/, /\b(reporte|informe|dossier) (de|por) (la |una |mi |cada )?(region|comuna)\b/],
    chips: ["¿Cuántos cargadores hay en el Biobío?", "¿Cuántos autos eléctricos hay en Concepción?"],
  },
  {
    id: "brecha_en_ruta", pagina: "autonomia.html", nombre: "Brecha de cobertura", tema: "dónde faltan cargadores en las rutas",
    rx: [/\b(donde|en que (tramos?|rutas?|zonas?|carreteras?)) (faltan?|hacen? falta|no hay|hay (pocos|huecos?|vacios)|se queda\w*|se quedan)\b.{0,50}\b(carg\w+|estaciones?|puntos? de carga)\b/, /\bfaltan? (cargadores|estaciones|puntos de carga)\b.{0,40}\b(ruta|rutas|carretera|carreteras|camino|viaje|viajes|norte|sur|ruta 5)\b/,
         /\bbrechas? de (cobertura|carga)\b/, /\bcobertura de (carga|cargadores|la red de carga)\b.{0,30}\b(ruta|rutas|carretera|carreteras|viaje|viajes)\b/, /\bautonomia (en|de) ruta\b/, /\b(me|nos) (alcanza|alcanzara|queda\w*) .{0,15}(bateria|carga)\b.{0,30}\b(viaje|ruta|carretera)\b/],
    chips: ["Las 5 regiones con más cargadores", "Revisa la autonomía de los vehículos"],
  },
  {
    id: "elasticidad", pagina: "elasticidad.html", nombre: "Elasticidad bencina-EV", tema: "cómo reaccionan las ventas de eléctricos al precio de la bencina",
    rx: [/\belasticidad\b/, /\b(sube|suben|aumenta|aumentan|crece|crecen)\b.{0,15}\b(venta|ventas|adopcion|demanda|compra)\b.{0,40}\b(cuando|si|con)\b.{0,15}\b(sube|suba|aumenta|alza)\b.{0,20}\b(bencina|combustibles?|petroleo|gasolina)\b/,
         /\bcuando sube (el precio de )?(la )?(bencina|gasolina|combustibles?)\b/, /\b(efecto|impacto|influencia|relacion) (del )?(precio|alza|valor) (de|del) (la )?(bencina|gasolina|combustibles?|petroleo)\b.{0,30}\b(ventas|adopcion|compra|autos electricos)\b/,
         /\b(ventas|adopcion)\b.{0,40}\b(precio|alza) (de|del) (la )?(bencina|gasolina|combustibles?)\b/],
    chips: ["Tendencia del precio de la bencina", "Evolución de las ventas de autos eléctricos"],
  },
  {
    id: "costo_por_km", pagina: "costo.html", nombre: "Bencina vs Enchufe", tema: "el costo por kilómetro de un eléctrico frente a la bencina", cedeAVehiculos: true,
    rx: [/\b(cuanto|que) (cuesta|sale|gasto|gasta|se gasta|pago|paga|se paga)\b.{0,30}\b(por km|el km|cada km|el kilometro|por kilometro|cada kilometro|100 km|cien kilometros|recorrer)\b/, /\bcosto (por|de cada|del) (km|kilometro)\b/, /\bcosto de recorrer\b/,
         /\b(bencina|combustible|gasolina) (vs|versus|contra) (enchufe|electrico|electricos|cargar)\b/, /\b(electrico|electricos|ev|cargar|enchufe)\b.{0,30}\b(vs|versus|contra|frente a|comparado con)\b.{0,15}\b(bencina|gasolina|combustion|combustible)\b.{0,40}\b(por km|por kilometro|100 km|cien kilometros|recorrer)\b/],
    chips: ["¿Es más barato cargar un auto eléctrico que cargar bencina?", "Revisa el costo de tener un vehículo"],
  },
  {
    id: "almacenamiento", pagina: "bess-cortes.html", nombre: "Almacenamiento (BESS)", tema: "los proyectos de almacenamiento (BESS) y su respaldo ante cortes",
    rx: [/\b(bess|almacenamiento|sistemas? de almacenamiento|baterias? (de|para) (red|almacenamiento))\b.{0,50}\b(proyectos?|donde (estan|hay)|mapa|descarg\w+|inversion|cortes?|apagon\w*|respaldo|resiliencia)\b/, /\b(proyectos?|mapa|inversion) (de )?(bess|almacenamiento)\b/, /\bdonde (estan|hay|se ubican|quedan) (los )?(bess|proyectos de almacenamiento|baterias de almacenamiento)\b/],
    chips: ["Capacidad de almacenamiento de baterías", "¿Cuánta gente está sin luz ahora?"],
  },
  {
    id: "duales", pagina: "duales.html", nombre: "Estaciones duales", tema: "las bencineras que tienen un cargador cerca",
    rx: [/\bduales?\b/, /\bbencineras? con (cargador\w*|carga|puntos? de carga)\b/, /\bcargadores? (en|dentro de|junto a|al lado de|cerca de) (las |la |una |los )?(bencineras?|estaciones? de servicio|servicentros?)\b/],
    chips: ["¿Quién tiene más cargadores?", "¿Cuántos cargadores hay en el Biobío?"],
  },
  {
    id: "homologaciones", pagina: "homologaciones.html", nombre: "Radar de homologaciones", tema: "los modelos que se homologan o certifican en Chile y cuándo",
    rx: [/\bradar de homologaci\w+\b/, /\bque modelos? (se )?(han )?(certific\w+|homolog\w+)\b/, /\bhomologaciones? (por|de|segun) (fecha|mes|ano|marca)\b/, /\bcuando se (certific|homolog)\w+\b/, /\bnuevos? modelos?\b.{0,25}\b(certific\w+|homolog\w+)\b/],
    chips: ["Revisa la etiqueta de eficiencia de un vehículo", "Revisa la autonomía de los vehículos"],
  },
  {
    id: "reporte_energetico", pagina: "reporte-energetico.html", nombre: "Reporte Energético 2026 CCGE", tema: "las empresas obligadas al Reporte Energético",
    rx: [/\breporte energetico\b/, /\bccge\b/, /\bempresas? obligad\w+ (a )?(reportar|al reporte)\b/, /\bproceso de reporte\b/],
    chips: ["¿Qué normas regulan los cargadores?", "¿Cuántos cargadores hay en el Biobío?"],
  },
  {
    id: "red_electrica", pagina: "red-electrica.html", nombre: "Red eléctrica y potencial", tema: "las subestaciones y líneas de transmisión",
    rx: [/\bsubestacion(es)?\b/, /\blineas? de transmision\b/, /\b(red|sistema) de transmision\b/, /\btransmision electrica\b/, /\bque tan lejos de la red\b/, /\bdistancia a la red\b/],
    chips: ["¿Cuánta gente está sin luz ahora?", "¿Qué porcentaje de la electricidad es renovable?"],
  },
  {
    id: "vulnerabilidad", pagina: "vulnerabilidad.html", nombre: "Vulnerabilidad energética", tema: "el índice de vulnerabilidad energética de las comunas",
    rx: [/\bvulnerabilidad (energetica|electrica)\b/, /\bindice de vulnerabilidad\b/, /\bcomunas? (mas )?vulnerables?\b/, /\bpobreza energetica\b/],
    chips: ["Comunas con más cortes de luz en el año", "¿Cuántas horas sin luz ha tenido Temuco?"],
  },
  {
    // la capacidad que proyecta cada escenario SI se responde (indicador proyeccion_pelp, cedeAProyecciones); esta pagina compara lo real con los escenarios
    id: "pelp", pagina: "pelp.html", nombre: "Chile vs PELP", tema: "el plan energético de largo plazo (PELP)", cedeAProyecciones: true,
    texto: "No tengo la comparación de la capacidad real de Chile con los escenarios de la PELP entre las cifras que puedo consultar aquí: la hace una página del sitio. Sí puedo mostrarte la capacidad que proyecta cada escenario.",
    rx: [/\bpelp\b/, /\bplanificacion energetica de largo plazo\b/, /\bplan energetico de largo plazo\b/],
    chips: ["Revisa los escenarios de la PELP", "¿Qué porcentaje de la electricidad es renovable?"],
  },
  {
    id: "cobertura_de_rescate", pagina: "fichacober.html", nombre: "Cobertura de rescate", tema: "qué parte de los eléctricos más vendidos tiene ficha de rescate",
    rx: [/\bcobertura (de )?(las )?fichas? de rescate\b/, /\b(porcentaje|proporcion|cuantos|cuantas|que parte)\b.{0,50}\bfichas? de rescate\b/, /\bque (autos|vehiculos|modelos|marcas) (no )?tienen fichas? de rescate\b/],
    chips: ["Revisa la ficha de rescate de un vehículo", "¿Qué es una ficha de rescate?"],
  },
  {
    id: "mapas_con_capas", pagina: "mapas.html", nombre: "Mapas interactivos con capas", tema: "un mapa que cruza la red de carga con la transmisión, la generación y el almacenamiento",
    rx: [/\bmapas? (interactivos?|con capas)\b/, /\bmapa de (transmision|generacion|distribucion|almacenamiento|bess|postes|lineas)\b/, /\bcapas? (del|de un) mapa\b/],
    chips: ["¿Cuántos cargadores hay en el Biobío?", "¿Qué porcentaje de la electricidad es renovable?"],
  },
  {
    id: "kerosene", pagina: "combustible.html", nombre: "Precio de combustible", tema: "el precio del kerosene",
    rx: [/\b(kerosene|kerosen|parafina)\b/],
    chips: ["¿Cuánto cuesta el diésel en Concepción?", "¿Cuánto cuesta la bencina de 93 en Concepción?"],
  },
  {
    id: "gas_licuado", pagina: null, nombre: "", tema: "el precio del gas licuado ni del gas natural",
    texto: "No tengo el precio del gas licuado ni del gas natural entre las cifras que puedo consultar aquí. Sí publico las bencinas de 93, 95 y 97 y el diésel.",
    rx: [/\b(gas licuado|glp|gnc|gas natural comprimido|autogas)\b/],
    chips: ["¿Cuánto cuesta el diésel en Concepción?", "¿Cuánto cuesta la bencina de 95 en Temuco?"],
  },
  {
    id: "emisiones_evitadas", pagina: null, nombre: "", tema: "las emisiones de CO2 evitadas",
    texto: "No calculo cuánto CO2 se evita ni otras emisiones: el sitio no publica esa cuenta y yo solo muestro cifras ya publicadas. Sí puedo decirte qué porcentaje de la electricidad es renovable.",
    rx: [/\b(co2|co 2|dioxido de carbono|huella de carbono|gases? de efecto invernadero|gei)\b/, /\b(evit\w+|ahorr\w+) .{0,25}\b(emisiones|contaminacion|co2)\b/, /\b(emisiones|contaminacion|co2)\b.{0,25}\b(evit\w+|ahorr\w+)\b/, /\bcuanto contamina\b/],
    chips: ["¿Qué porcentaje de la electricidad es renovable?", "¿Cuánta energía solar se genera?"],
  },
];

const calza = (rx, q) => (Array.isArray(rx) ? rx.every((r) => r.test(q)) : rx.test(q));

// El primer tema cuya pregunta calza (el texto ya viene normalizado: minusculas, sin tildes). Devuelve null si ninguno.
function temaDePagina(q) {
  // «electricos a bateria» es el nombre de la tecnologia (BEV): «¿cuantos electricos a bateria se importaron?» no es una pregunta por la importacion de baterias de litio
  q = q.replace(/\b(electricos?|electricas?|vehiculos?|autos?)\s+a\s+bateria\b/g, "$1");
  for (const t of TEMAS_DE_PAGINA) if (t.rx.some((rx) => calza(rx, q))) return t;
  return null;
}

// El texto con que el asistente avisa; si el tema no trae uno propio, se arma con su nombre.
function textoDeTema(t) {
  if (t.texto) return t.texto;
  return `No tengo ${t.tema} entre las cifras que puedo consultar aquí; el sitio tiene una página sobre eso:`;
}
return { TEMAS_DE_PAGINA, temaDePagina, textoDeTema };
})();
__mod["agente_web/src/nlu.js"] = (function () {
// Comprension de preguntas SIN IA: reglas y diccionarios sobre el catalogo del conector. Convierte una frase en una o varias consultas
// (indicador, territorio, periodo, ranking, medida). Si no esta segura, pregunta; si no sabe, lo dice. Nunca inventa un indicador.
const { norm, sanitizar } = __req("servidor/src/util.js");
const { detectarEnTexto } = __req("servidor/src/territorio.js");
const { puntuarIndicadores } = __req("servidor/src/consulta.js");
const { obtenerParte } = __req("agente_web/src/datos_navegador.js");
const { indiciosExclusivos, indiciosFuertes, interpretarVehiculo, nombraUnModelo, pareceNombreDeVehiculo } = __req("agente_web/src/nlu_veh.js");
const { ErrorVehiculos } = __req("agente_web/src/vehiculos.js");
const { interpretarNorma, pistasDeNorma } = __req("agente_web/src/nlu_norm.js");
const { ErrorNormativa } = __req("agente_web/src/normativa.js");
const { FAMILIAS, INDICADORES_MENSUALES_DE_VENTAS, MEDIDAS_DE_HIBRIDOS, esTecnologia, familiaDeLaFrase } = __req("agente_web/src/familias_ventas.js");
const { raizEs } = __req("agente_web/src/raices.js");
const { temaDePagina, textoDeTema } = __req("agente_web/src/temas_pagina.js");

const MESES = { enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6, julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10, noviembre: 11, diciembre: 12 };
const NUMEROS = { un: 1, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, doce: 12, quince: 15, veinte: 20 };
const TERRITORIAL = new Set(["nacional", "region", "comuna"]);

// Sinonimos de medidas (solo se usan si el indicador elegido tiene esa medida). Las frases genericas van solo donde la medida NO es la principal.
const SIN_MEDIDA = {
  cargadores_publicos: ["publicos", "publico", "acceso publico", "abiertos al publico"],
  estaciones: ["estaciones", "estacion", "electrolineras"],
  estaciones_publicas: ["estaciones publicas"],
  conectores: ["conectores", "enchufes"],
  conectores_publicos: ["conectores publicos"],
  conectores_disponibles: ["disponibles", "libres"],
  potencia_mw: ["potencia", "mw", "megawatts"],
  potencia_prom_kw: ["potencia promedio", "kw", "kilowatts", "cuantos kw", "potencia de un cargador"],
  estaciones_con_precio: ["bencineras", "bencinera", "gasolineras", "gasolinera", "grifos", "servicentros"],
  precio_minimo: ["minimo", "mas barata", "mas barato", "menor precio"],
  precio_maximo: ["maximo", "mas cara", "mas caro", "mayor precio"],
  diesel: ["diesel", "petroleo", "petroleo diesel"],
  bencina_95: ["95", "bencina 95", "bencina de 95", "gasolina 95", "gasolina de 95", "95 octanos"],
  bencina_97: ["97", "bencina 97", "bencina de 97", "gasolina 97", "gasolina de 97", "97 octanos"],
  participacion_pct: ["participacion", "cuota", "cuota de mercado", "participacion de mercado", "proporcion", "porcentaje del mercado", "que porcentaje"],
  ultimos_12m: ["ultimos 12 meses", "ultimos doce meses", "ultimo ano", "en el ultimo ano", "12 meses", "recientemente"],
  bev: ["bev", "electricos a bateria", "solo electricos", "a bateria"],
  phev_perev: ["phev", "perev", "hibridos enchufables", "hibrido enchufable"],
  phev: ["phev", "hibridos enchufables", "hibrido enchufable"],
  hev_erev: ["hibridos no enchufables", "hev", "erev"],       // «hibridos» a secas tambien son los no enchufables, pero esa palabra sola no empuja a ningun indicador (el Kona «electrico o hibrido» es de vehiculos): la reconoce familiaDeLaFrase en armar
  hev: ["hibridos no enchufables", "hev"],                    // lo mismo en las importaciones (importaciones_electrificados)
  mhev: ["microhibridos", "microhibrido", "micro hibridos", "mhev"],
  fcev: ["hidrogeno", "fcev", "celda de combustible"],
  enchufables: ["enchufables"],
  enchufables_todas_las_clases: ["enchufables de todas las clases"],
  total_electrificados: ["electrificados"],
  buses_electricos: ["buses"],
  camiones_electricos: ["camiones"],
  pct_renovable: ["renovable", "renovables", "porcentaje renovable", "limpia", "limpias", "energia limpia", "energias limpias", "ernc"],
  pct_renovable_capacidad: ["renovable", "renovables", "porcentaje renovable"],
  centrales: ["centrales", "plantas"],
  centrales_en_operacion: ["en operacion"],
  centrales_en_construccion: ["en construccion", "construyendo"],
  centrales_en_desarrollo: ["en desarrollo"],
  participacion_enchufables_pct: ["participacion", "cuota", "proporcion", "que porcentaje", "porcentaje de las ventas"],
  participacion_hibridos_pct: ["participacion de hibridos", "porcentaje de hibridos"],
  participacion_combustion_pct: ["participacion de combustion", "porcentaje de combustion", "autos a combustion", "autos a bencina"],
  generacion_gwh: ["gwh", "energia generada", "cuanta energia"],
  pct_operativo: ["operativo", "operativos", "disponibilidad", "funcionando"],
  pct_ocupado: ["ocupado", "ocupados", "ocupacion"],
  pct_electricos: ["porcentaje de electricos", "porcentaje de camiones", "porcentaje de buses", "porcentaje de pesados"],
  conectores_cronicos: ["fuera de servicio", "cronicos", "cronicamente", "no funcionan", "no funciona", "danados", "averiados", "descompuestos", "inoperativos"],
  precio_prom_clp_kwh: ["precio", "cuesta", "tarifa", "kwh"],
  edad_promedio: ["edad", "edad promedio"],
  hogares: ["hogares"],
  viviendas: ["viviendas"],
  pct_65_mas: ["adultos mayores", "tercera edad", "65"],
  poblacion: ["poblacion", "habitantes", "personas"],
  clientes_sin_suministro: ["clientes sin", "sin luz", "sin suministro", "cuanta gente sin", "cuanta gente esta sin", "gente sin luz"],
  hhi: ["hhi", "concentracion", "concentrada", "concentrado"],
  participacion_lider_pct: ["lider", "participacion del lider"],
  cliente_horas: ["cliente horas", "horas sin luz"],
  eventos: ["eventos"],
  almacenamiento_mwh: ["almacenamiento", "baterias", "mwh"],
  capacidad_operando_mw: ["capacidad", "potencia instalada"],
  parque_electrico_ajustado: ["ajustado", "ajustada"],
  variacion_anual: ["variacion", "crecimiento", "cuanto crecio"],
  variacion_anual_pct: ["variacion porcentual", "porcentaje de crecimiento"],
  baja_emision: ["baja emision"],
  pct_baja_emision: ["porcentaje de baja emision"],
  instalaciones: ["instalaciones"],
  // proyecciones que el sitio publica (indicadores proyeccion_*): sin una de estas frases se muestran las medidas del indicador en su orden
  parque_electrico_proyectado_bajo: ["escenario bajo", "proyeccion baja", "caso bajo", "banda baja", "minimo proyectado"],
  parque_electrico_proyectado_alto: ["escenario alto", "proyeccion alta", "caso alto", "banda alta", "maximo proyectado"],
  parque_total_proyectado: ["parque total", "total de vehiculos", "todos los vehiculos"],
  motorizados_proyectado: ["motorizados", "vehiculos motorizados"],
  carbono_neutralidad: ["carbono neutralidad", "neutralidad de carbono", "carbono neutral"],
  recuperacion_lenta: ["recuperacion lenta"],
  transicion_acelerada: ["transicion acelerada"],
  cctp_proyectados: ["centros proyectados", "centros nuevos", "cuantos centros", "centros de carga proyectados"],
  cctp_potencia_proyectada_mw: ["potencia proyectada"],
  flota_buses_proyectada: ["flota proyectada", "buses proyectados", "cuantos buses", "flota de buses"],
  cctp_actuales: ["centros actuales", "centros de carga actuales"],
  cctp_potencia_mw: ["potencia de los centros", "potencia instalada de los centros"],
  flota_buses: ["buses electricos de la red", "flota actual de buses"],
  electroterminales: ["electroterminales", "electroterminal"],
  electroterminales_potencia_mw: ["potencia de los electroterminales"],
  // ventas mensuales de buses electricos (ventas_buses_mensual): sus categorias de servicio
  red_y_regiones: ["sistema red", "red metropolitana", "red de movilidad", "transantiago"],
  interurbano: ["interurbano", "interurbanos"],
  media_distancia: ["media distancia"],
  minibus: ["minibus", "minibuses"],
  taxibus: ["taxibus", "taxibuses"],
};

// Lo que la gente pregunta y los datos NO desglosan: se avisa en vez de responder como si lo hicieran.
// `sin`: si la pregunta lo menciona, el aviso no corresponde. `ind`: solo para esos indicadores.
const ELECTRIFICADOS = ["parque_ev_ine", "ventas_enchufables_mensual", "ventas_electrificados_anual", "importaciones_electrificados"];
const VENTAS_POR_MARCA = ["ventas_marca", "ventas_modelo_mes"];     // indicadores que si desglosan por marca o por modelo (c_ventas)
const NOTA_VENTAS_DE_UN_MODELO = "No tengo las ventas de un modelo en particular (solo el ranking de marcas y los 15 modelos más vendidos del último mes); te muestro la cifra total.";
const CALIFICADORES = [
  { rx: /\b(rapido|rapidos|rapida|rapidas|ultrarrapido|ultrarrapidos|lento|lentos|ccs|chademo|tipo 2|type 2|corriente continua|corriente alterna)\b/, texto: "No tengo el desglose por velocidad ni por tipo de conector; te muestro la cifra total." },
  { rx: /\b(tesla|byd|nissan|kia|hyundai|chevrolet|mg|volvo|bmw|mercedes|audi|renault|peugeot|toyota|marca|marcas|modelo|modelos)\b/, excepto: ["operadores_carga", ...VENTAS_POR_MARCA, "ventas_enchufables_mensual", "ventas_electrificados_anual"], texto: "No tengo el desglose por marca ni por modelo de vehículo; te muestro la cifra total." },
  { rx: /\b(tesla|byd|nissan|kia|hyundai|chevrolet|mg|volvo|bmw|mercedes|audi|renault|peugeot|toyota|marca|marcas|modelo|modelos)\b/, ind: ["ventas_enchufables_mensual", "ventas_electrificados_anual"], texto: NOTA_VENTAS_DE_UN_MODELO },
  { rx: /\b(taxi|taxis|colectivo|colectivos|particular|particulares|uber|cabify)\b/, ind: ["parque_ev_ine"], texto: "No tengo el desglose por tipo de uso (taxis, colectivos, particulares); te muestro la cifra total." },
  { rx: /\b(autos?|vehiculos?|coches?|carros?|automoviles?)\b/, sin: /electric|hibrid|enchufabl|electrific|\bev\b|bev|phev|hev|mhev|fcev|hidrogeno|baja emision/, ind: ELECTRIFICADOS, texto: "Estos datos cuentan solo vehículos eléctricos o electrificados, no el total de vehículos del país." },
  { rx: /\b(solar|solares|fotovoltaic[ao]s?|eolic[ao]s?|hidraulic[ao]s?|termic[ao]s?|geotermic[ao]s?|carbon|biomasa|gas natural)\b/, ind: ["capacidad_sen"], texto: "La capacidad instalada se publica en total, sin desglose por tecnología; te muestro el total." },
];

// Paginas del sitio para lo que el conector no responde (se ofrece el enlace en vez de inventar).
const PAGINAS = {
  mapa: { pagina: "mapa-carga.html", nombre: "Mapa de la red de carga" },       // en el menu del sitio es «Red de carga en vivo»
  tco: { pagina: "tco.html", nombre: "Costo total de propiedad (TCO)" },
  meta: { pagina: "tracker.html", nombre: "Meta 2035" },
  autonomia: { pagina: "autonomia.html", nombre: "Autonomía" },
};

function escapar(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function contiene(q, frase) {
  return new RegExp("(^| )" + escapar(frase) + "( |$)").test(q);
}

// La raiz de una palabra (ver raices.js) es la misma funcion para la pregunta y para el catalogo.


function raices(texto) {
  return norm(texto).split(" ").filter(Boolean).map(raizEs).join(" ");
}

function limpiarPregunta(texto) {
  return sanitizar(texto, 200);
}

// ---- intenciones sin consulta -----------------------------------------------------------------------------------------
function detectarSocial(q) {
  const t = q.split(" ").filter(Boolean);
  if (!t.length) return "vacia";
  if (t.length <= 5 && /^(hola|holi|buenas|buenos|hey|saludos|que tal|buen dia)/.test(q) && !/\d/.test(q)) return "saludo";
  if (t.length <= 6 && /^(muchas gracias|gracias|ok gracias|listo gracias|perfecto|genial|excelente|buenisimo|chao|adios|hasta luego)/.test(q)) return "gracias";
  if (/\b(quien eres|quien sos|que eres|que sos|como te llamas|cual es tu nombre|con quien hablo|eres (un |una )?(robot|bot|humano|humana|persona|ia|inteligencia artificial|chatgpt|claude))\b/.test(q)) return "identidad";
  if (/\b(ayuda|ayudar|ayudame|ayudarme|ayudas|que puedes|que sabes|que datos|que informacion|que preguntas|que puedo preguntar|como funcionas|para que sirves|como te uso|que haces|menu|opciones)\b/.test(q)) return "ayuda";
  return null;
}

// Preguntas de definicion o de concepto («que es un hibrido enchufable»): el asistente responde con cifras, no con glosario.
function esDefinicion(q) {
  return /^(que es|que son|que significa|que significan|que quiere decir|a que se refiere|define|definicion de|explica|explicame|como funciona|como funcionan)\b/.test(q) && !/^que (es|son) (mas|menos|mejor|peor|mayor|menor|lo que|lo mas)\b/.test(q);
}

// «kilowatt hora», «kilovatio-hora», «kw h» -> «kwh» (si no, «hora» empuja hacia las horas sin luz).
function normalizarUnidades(q) {
  return q
    .replace(/\b(kilowatts?|kilovatios?|kw)( por)?[ -]?(horas?|h)\b/g, "kwh")
    .replace(/\bestaciones? de servicio\b/g, "bencineras");   // son bencineras, no las estaciones de carga
}

// Temas cuya pregunta de definicion SI se responde: el asistente explica que datos tiene («que es una ficha de rescate», «que es el TCO», «que dice la ley 21.505»).
const TEMAS_VEHICULOS_DEFINIBLES = /\b(ficha de rescate|fichas de rescate|tco|costo total de propiedad|etiqueta de eficiencia|eficiencia energetica|seguro|seguros|prima|primas|deducible|deducibles)\b/;
const TEMAS_LEGALES_DEFINIBLES = /\b(ley|leyes|decreto|decretos|reglamento|reglamentos|norma|normas|normativa|dfl|nch|ric|rgr|netbilling|net billing|mepco|pmgd|soap|seguro obligatorio|seia|ppda|meta|metas|bodegaje|marco legal|marco normativo)\b/;

// Negativas que se levantan si la pregunta es de leyes y normas: «puedo instalar un cargador segun la ley de copropiedad» (la norma que lo regula), «metas para 2030»,
// «cuando saldra la ley de incentivo» (el estado del proyecto). La de «meta» no se levanta si piden el avance de la meta sin hablar de su fuerza juridica.
const AVISO_CON_LEYES = {
  procedimiento: "No explico cómo hacer trámites paso a paso; sí te muestro qué normas lo regulan.",
  prediccion: "No hago pronósticos; te muestro lo que el sitio registra hoy.",
  tiempos: "No calculo duraciones; te muestro lo que el sitio registra hoy.",
  meta: "",
  economia: "",          // «litio», «euro», «credito»: palabras de economia que tambien son de normas («norma Euro 6», «bodegaje de baterias de litio»)
  fuera_de_tema: "",     // «clima»: la ley marco de cambio climatico
  solar: "",             // «paneles solares en mi casa»: la ley de generacion distribuida (net billing)
  tema_de_pagina: "",    // «incentivos para cargadores», «emisiones de vehiculos»: si la pregunta es claramente de leyes y el catalogo tiene la norma, manda la norma
};
const AVANCE_DE_META = /\b(vamos|llegar|llegaremos|llegara|alcanzar|alcanzaremos|alcanzara|avance|avanzando|avanzamos|cuanto falta|cuanto nos falta|como vamos|que tan cerca|estamos cerca|progreso|cumpliremos|cumplira)\b/;
const FUERZA_JURIDICA = /\b(obligatori\w+|vinculant\w+|declarativ\w+|ley|leyes|legal|legales|decreto|decretos|norma|normas|reglamento|exige|exigen|oficial|oficiales)\b/;
// Respuestas de la capa de leyes que no dicen nada si la pregunta era una definicion general («que es una ley»).
const SIN_TEMA_LEGAL = new Set(["normas_panorama", "sin_norma", "nav"]);

// Cuentas de la pagina tco.html que el asistente NO hace porque dependen de los datos de la persona (su auto actual, su techo, su presupuesto) o porque el sitio no las calcula
// (depreciacion): en vez de contestar con otro dato, se manda a la pestaña que corresponde. `paginasTco` son claves de PESTANAS_TCO (bloques.js).
const AUTO_PROPIO = /\b(mi|mis|nuestro|nuestros) (auto|autos|vehiculo|vehiculos|carro|carros|coche|coches|camioneta|camionetas)\b|\btengo (un|una) (auto|vehiculo|carro|coche|camioneta)\b/;
const CAMBIAR_O_AHORRAR = /\b(cambi\w*|reemplaz\w*|sustitu\w*|vend\w*|pas\w* a|migr\w*|renov\w*|ahorr\w*)\b/;
const PIDE_UN_ELECTRICO = /\b(electric\w*|ev|bev|enchufable\w*|hibrid\w*)\b/;
const OTRO_TEMA_DEL_AUTO = /\b(cargador|cargadores|wallbox|bateria|baterias|aceite|neumatic\w*|llantas?|enchufe|cable|seguro|seguros|permiso|patente|ficha|rescate|etiqueta)\b/;
const RECUPERAR_INVERSION = [
  /\bpayback\b|\bperiodo de recuperacion\b|\bretorno de (la )?inversion\b/,
  /\b(recuper\w*|amortiz\w*|compens\w*) (la |esa |mi |esta |el |lo )?(inversion|diferencia|sobreprecio|mayor precio|costo extra)\b/,
  /\b(en cuantos anos|cuanto tiempo|cuanto tardo|cuanto tarda|cuanto demoro|cuanto demora)\b.{0,40}\b(recuper\w*|amortiz\w*|compens\w*|se paga|pagarse|paga solo|pagaria)\b/,
];
const INVERSION_DE_OTRA_COSA = /\b(cargador|cargadores|electrolinera\w*|estacion|estaciones|bess|central|centrales|proyecto|proyectos|negocio|empresa)\b/;

function herramientaTco(q) {
  if (/\b(deprecia\w*|reventa|revender|valor residual|pierde valor|perdida de valor|desvaloriza\w*)\b/.test(q)) {
    return { motivo: "depreciacion", paginasTco: ["comparador"], tituloPaginas: "Para ver cómo se arma esa cuenta, abre esta página del sitio", texto: "El sitio no calcula la depreciación ni el valor de reventa de un vehículo: su costo de tener es solo el costo de uso (energía, mantención, seguro, permiso de circulación e impuesto verde)." };
  }
  if (/\b(paneles?|placas?) (solar|solares|fotovoltaic\w+)\b/.test(q) && /\b(auto|autos|vehiculo|vehiculos|carro|coche|electrico|electricos|cargar|carga|cargador|casa|hogar|domicilio|techo)\b/.test(q)) {
    return { motivo: "solar", paginasTco: ["solar"], tituloPaginas: "Para estimarlo con tu techo y tu consumo, abre esta página del sitio", texto: "Cuántos paneles solares necesitas y cuánto ahorrarías depende de tu techo y de tu consumo, así que no lo calculo aquí; el sitio tiene un simulador para eso." };
  }
  const cambioDeAuto = AUTO_PROPIO.test(q) && CAMBIAR_O_AHORRAR.test(q) && PIDE_UN_ELECTRICO.test(q) && !OTRO_TEMA_DEL_AUTO.test(q);
  const recuperar = !INVERSION_DE_OTRA_COSA.test(q) && RECUPERAR_INVERSION.some((rx) => rx.test(q));
  if (cambioDeAuto || recuperar) {
    return { motivo: "mi_vehiculo", paginasTco: ["miVehiculo", "comparador"], tituloPaginas: "Para hacerla con tus datos, abre estas páginas del sitio", texto: "Esa cuenta depende de tu auto actual y de cuánto lo usas, así que no la hago aquí; en el sitio la puedes hacer con tus propios datos." };
  }
  return null;
}

// Preguntas por DONDE esta un cargador (y no por cuantos hay): entre los datos no hay ubicaciones, pero el sitio tiene el mapa de la red de carga y se manda ahi («donde estan los
// cargadores publicos», «donde puedo cargar mi auto», «ubicacion de los cargadores», «cargadores cerca de mi casa», «quiero ver los cargadores en un mapa»). Las preguntas que
// comparan o cuentan («donde hay mas cargadores», «cuantos cargadores hay en Temuco», «donde se concentran») son de los indicadores y no se tocan.
const COSA_DE_CARGA = /\b(cargador|cargadores|supercargador\w*|electrolinera\w*|puntos? de carga|estaciones? de carga|estaciones? (publicas?|electricas?)|centros? de carga|red de carga|enchufes? publicos?)\b/;
const CARGAR_EN_ALGUN_LUGAR = /\bdonde (puedo |podria |se puede |tengo que |debo )?(cargar|recargar|enchufar|cargo|enchufo)\b/;
const COMPARA_O_CUENTA = /\b(mas|menos|mayor|mayores|menor|menores|ranking|top|cuantos|cuantas|cantidad|total|numero de|porcentaje|promedio|evolucion|serie|concentracion|concentran|participacion|operador|operadores)\b/;
const PIDE_UBICACION = /\b(donde (esta|estan|queda|quedan|hay|encuentro|encontrar|consigo|veo|ver|ubico|se encuentran?)|ubicacion|ubicaciones|ubicar|ubicados|ubicadas|localizacion|direccion|direcciones|coordenadas|mapa|mapas|cerca|cercano|cercanos|cercana|cercanas|alrededor|en la ruta|en el camino|en la carretera|por la ruta)\b/;

function pideUbicacionDeCargadores(q) {
  // «el cargador mas cercano» lleva «mas» pero no compara; «cerca de 100 cargadores» es una cantidad, no un lugar
  const t = q.replace(/\bmas (cerca|cercan\w+|proxim\w+)\b/g, "cercano").replace(/\bcerca de (los |las )?\d[\d.]*/g, " ");
  if (COMPARA_O_CUENTA.test(t)) return false;
  if (CARGAR_EN_ALGUN_LUGAR.test(t)) return true;
  return COSA_DE_CARGA.test(t) && PIDE_UBICACION.test(t);
}

// ---- proyecciones que el sitio publica (indicadores proyeccion_*) -----------------------------------------------------------------
// El asistente no hace proyecciones por su cuenta: muestra las que Energías Futuro publica en su sitio (propias, del INE, de la PELP o de la SEC) y siempre dice que son proyecciones
// (la nota de cada fila). Las que calcula una pagina en el momento (meta 2035, parque y carga al 2035 del Reporte Regional, demanda del parque) siguen mandando a esa pagina.
const PROYECCIONES = ["proyeccion_parque", "proyeccion_poblacion", "proyeccion_pelp", "proyeccion_transporte_publico"];
// Preguntas armadas (sin marcas) que el asistente sabe responder: se ofrecen cuando se pide una proyeccion que el sitio no publica.
const PREGUNTAS_DE_PROYECCIONES = ["Revisa la proyección del parque de vehículos", "Revisa la población proyectada", "Revisa los escenarios de la PELP", "Revisa la proyección del transporte público"];
const PIDE_PROYECCION = /\b(proyec\w+|pronostic\w+|prediccion\w*|estimacion\w*|estimad[oa]s?|escenarios?|pelp|a futuro|en el futuro|se espera\w*|esperad[oa]s?|previst[oa]s?|habra|habran|seran|sera|tendra|tendran|tendremos|llegara|llegaran|crecera|creceran)\b/;
const GENERACION_O_ALMACENAMIENTO = /\b(solar|solares|fotovoltaic\w+|eolic\w+|hidraulic\w+|termic\w+|geotermic\w+|almacenamiento|baterias?|bess|csp)\b/;
const NO_ES_DE_PROYECCION = /\b(cargadores?|conectores?|estaciones?|bencina\w*|gasolina|diesel|precios?|ventas?|vend\w+|import\w+|marcas?|modelos?|camiones?|pesados|luz|cortes?|suministro|apagon\w*)\b/;

// El indicador de proyecciones que responde la pregunta, o null si no pide una proyeccion que el sitio publique. Una proyeccion se pide con sus palabras («proyeccion», «habra», «escenario»,
// «PELP») o con un año desde 2025 (el ultimo dato real del INE es 2024); sin eso, «poblacion de Temuco» o «capacidad solar» siguen con sus datos reales.
function proyeccionAplicable(q) {
  if (esDefinicion(q)) return null;
  const palabra = PIDE_PROYECCION.test(q);
  const anios = (q.match(/\b20\d{2}\b/g) || []).map(Number);
  const hayAnio = anios.some((a) => a >= 2025);
  const lejano = anios.some((a) => a >= 2027);           // el sitio no publica proyecciones de parque ni de buses mas alla de 2026-2027: esas las calculan sus paginas
  if (!palabra && !hayAnio) return null;
  if (/\b(pelp|planificacion energetica|carbono neutralidad|neutralidad de carbono|recuperacion lenta|transicion acelerada)\b/.test(q)) {
    // «que escenario estamos siguiendo», «como va Chile frente a la PELP» comparan lo real con la PELP: eso lo hace la pagina «Chile vs PELP»
    return /\b(estamos siguiendo|seguimos|siguiendo|vamos|como va|frente a|contra|versus|vs|comparad\w+|comparar|cumpl\w+|avance|cuanto falta|reales?|instalad\w+|diagnostico|emisiones|co2)\b/.test(q) ? null : "proyeccion_pelp";
  }
  if (GENERACION_O_ALMACENAMIENTO.test(q) && /\b(capacidad|potencia|gw|gigawatts?|mw|megawatts?)\b/.test(q) && !/\b(autos?|vehiculos?|buses|bus|cargadores?|conectores?)\b/.test(q) && (palabra || lejano)) return "proyeccion_pelp";
  if (/\b(cctp|electroterminal\w*|transporte publico|buses?|flota de buses|autobuses)\b/.test(q) && !lejano && !/\b(import\w+|vend\w+|ventas?|precios?|luz|cortes?)\b/.test(q)) return "proyeccion_transporte_publico";
  if ((/\b(poblacion|habitantes|chilenos|chilenas|demograf\w+)\b/.test(q) || /\b(cuanta gente|cuantas personas|cuantos chilenos)\b.{0,25}\b(habra|habran|seran|vivira\w*|tendra)\b/.test(q)) && !/\b(luz|cortes?|suministro|apagon\w*)\b/.test(q)) return "proyeccion_poblacion";
  if (/\b(parque|flota|vehiculos?|autos?|automoviles?|carros?|electricos?|electrificad\w+|ev|electromovilidad|motorizados?)\b/.test(q) && !lejano && !NO_ES_DE_PROYECCION.test(q)) return "proyeccion_parque";
  return null;
}

function fueraDeAlcance(q) {
  // un tema que el sitio tiene en una pagina y el asistente no responde con cifras («cuanta energia renovable se vertio», «a que hora conviene cargar»): se dice y se manda a la pagina,
  // en vez de contestar otro dato. Va primero porque palabras como «litio» o «china» de esas preguntas caerian en las negativas de abajo; el costo de tener (TCO) tiene prioridad.
  const tp = temaDePagina(q);
  if (tp && !herramientaTco(q)) return { motivo: "tema_de_pagina", temaId: tp.id, texto: textoDeTema(tp), paginaSitio: tp.pagina, nombreSitio: tp.nombre, chips: tp.chips, ...(tp.cedeAVehiculos ? { cedeAVehiculos: true } : {}), ...(tp.cedeAProyecciones ? { cedeAProyecciones: true } : {}), ...(tp.pagina2 ? { paginaSitio2: tp.pagina2, nombreSitio2: tp.nombre2 } : {}) };
  if (esDefinicion(q) && !TEMAS_VEHICULOS_DEFINIBLES.test(q) && !TEMAS_LEGALES_DEFINIBLES.test(q)) return { motivo: "definicion", texto: "No doy definiciones generales: respondo con cifras ya publicadas." };
  if (/\b(argentina|peru|bolivia|brasil|colombia|ecuador|uruguay|paraguay|venezuela|mexico|espana|china|japon|alemania|francia|italia|noruega|estados unidos|eeuu|europa|america latina|latinoamerica|el mundo|a nivel mundial|otros paises|extranjero)\b/.test(q)) {
    return { motivo: "otro_pais", texto: "Solo tengo cifras de Chile: no tengo comparaciones con otros países ni datos por país de origen." };
  }
  if (/\b(dolar|dolares|euro|euros|uf|utm|ipc|inflacion|sueldo|salario|bitcoin|criptomonedas?|acciones|bolsa|cobre|litio|tasa de interes|credito|hipoteca|pib)\b/.test(q)) {
    return { motivo: "economia", pagina: "indicadores.html", nombre: "Indicadores económicos del sitio (dólar, UF, IPC, cobre, litio)", texto: "No tengo cifras económicas (dólar, UF, inflación, metales) entre los datos que puedo consultar aquí; el sitio las publica en otra página." };
  }
  if (/\b(clima|temperatura|lluvia|pronostico del tiempo|horoscopo|chiste|chistes|cuentame|futbol|partido|receta|cancion|pelicula|noticias|elecciones|candidato|presidente|que hora es|que dia es|que fecha es|capital de)\b/.test(q)) {
    return { motivo: "fuera_de_tema", texto: "Eso queda fuera de lo que puedo responder: solo contesto con cifras de electromovilidad, transporte y energía en Chile." };
  }
  const herramienta = herramientaTco(q);
  if (herramienta) return herramienta;
  if (/^(como|puedo|se puede|que necesito para|que debo hacer|que tramites)\b/.test(q) && /\b(cargo|cargar|cargarlo|instalo|instalar|compro|comprar|conecto|conectar|pago|pagar|inscribo|inscribir|tramito|tramitar|solicito|solicitar|obtengo|obtener|saco|sacar|uso|usar|funciona|funcionan)\b/.test(q)) {
    return { motivo: "procedimiento", texto: "No explico cómo hacer trámites ni cómo usar un cargador: respondo con cifras ya publicadas." };
  }
  if (/\b(cuanto (demora|tarda|dura|se demora|se tarda)|tiempo de carga)\b/.test(q)) {
    return { motivo: "tiempos", texto: "No tengo tiempos de carga ni duraciones entre estos datos." };
  }
  if (/\b(mejor|peor) (region|comuna|lugar|zona|ciudad|operador|empresa)\b|\bdonde (me )?conviene\b|\bdonde es mejor\b|\bdonde vivir\b|\bconviene vivir\b/.test(q)) {
    return { motivo: "recomendacion", texto: "No hago recomendaciones sobre dónde vivir ni qué conviene; sí puedo mostrarte rankings, por ejemplo las regiones con más cargadores o con más autos eléctricos." };
  }
  // el avance hacia la meta (no la meta misma) vive en la pagina de la meta 2035; las metas oficiales y su fuerza juridica las responde la capa de leyes (nlu_norm.js)
  if (/\bmeta(s)? (al |del |para el )?2035\b/.test(q) || (/\bmetas?\b/.test(q) && AVANCE_DE_META.test(q))) return { motivo: "meta", ...PAGINAS.meta, texto: "El avance hacia la meta 2035 y su proyección al ritmo actual los calcula la página «Meta 2035» del sitio, con la meta y el año que elijas; no están entre los datos que puedo consultar aquí. Sí puedo decirte qué metas oficiales hay y cuánta fuerza jurídica tienen." };
  if (pideUbicacionDeCargadores(q)) {
    return { motivo: "ubicacion", ...PAGINAS.mapa, texto: "Para ver dónde están los cargadores, abre el mapa de la red de carga del sitio: cada punto es una estación, con su operador, conectores, potencia, estado, dirección y horario. Yo puedo decirte cuántos hay por región o comuna." };
  }
  if (/\b(me conviene|conviene comprar|recomiendas|recomiendame|recomiendanos|recomendacion|que auto (me )?(compro|comprar)|mejor auto|mejor marca|debo comprar|deberia comprar|vale la pena)\b/.test(q)) {
    return { motivo: "recomendacion", paginasTco: ["recomendar", "comparador"], tituloPaginas: "Para ver opciones según tu presupuesto y tu uso, abre estas páginas del sitio", texto: "No doy recomendaciones de compra. El sitio tiene una herramienta que ordena los eléctricos según tu presupuesto y cómo usas el auto, y otra que compara el costo de tener uno eléctrico y uno a combustión." };
  }
  const futuro = (q.match(/\b20\d{2}\b/g) || []).some((a) => Number(a) > new Date().getFullYear());
  if (futuro || /\b(va a subir|va a bajar|subira|subiran|bajara|bajaran|crecera|creceran|llegara|llegaran|habra|habran|seran|sera|tendra|tendran|tendremos|va a haber|van a haber|costara|costaran|valdra|valdran|aumentara|aumentaran|disminuira|alcanzara|alcanzaran|superara|duplicara|proximo ano|proximos anos|proximo mes|proximos meses|ano que viene|mes que viene|proyeccion|proyecciones|pronostico|prediccion|a futuro|en el futuro|cuanto sera|cuantos habra)\b/.test(q)) {
    return { motivo: "prediccion", texto: "No hago proyecciones ni pronósticos por mi cuenta. Las que muestro son las que Energías Futuro publica en su sitio, elaboradas según las metas, la historia de los datos y las proyecciones de crecimiento y desarrollo, y siempre las señalo como proyección. Para esto no hay una publicada.", chips: PREGUNTAS_DE_PROYECCIONES };
  }
  return null;
}

// ¿Compara el costo de cargar con el de la bencina? Es una pregunta frecuente que los datos no pueden cerrar (falta el rendimiento de cada vehiculo).
function esComparacionDeCostos(q) {
  return /\b(mas barato|mas caro|conviene|cuesta mas|cuesta menos|ahorro|ahorrar|sale mas|sale menos|comparar|comparacion)\b/.test(q) && /\b(cargar|carga|electrico|electricos|kwh)\b/.test(q) && /\b(bencina|gasolina|combustible|diesel|petroleo)\b/.test(q);
}

// ---- piezas de la pregunta -------------------------------------------------------------------------------------------------
function numeroEn(q) {
  const d = /\b(\d{1,2})\b/.exec(q.replace(/\b(19|20)\d{2}\b/g, " ").replace(/\bregion (?:de |numero |n |nro )?\d{1,2}\b/g, " "));
  if (d) return Number(d[1]);
  for (const [w, n] of Object.entries(NUMEROS)) if (new RegExp("\\b" + w + "\\b").test(q)) return n;
  return null;
}

function detectarRanking(q) {
  const unidad = /\b(region(es)?|comuna(s)?|operador(es)?|empresa(s)?|marca(s)?|modelo(s)?)\b/.exec(q);
  const comparativo = /\b(mas|menos|mayor(es)?|menor(es)?|principales|mejores|peores|maximo|minimo)\b/.test(q);
  const rank = /\b(ranking|top|clasificacion|podio)\b/.test(q);
  const verbos = "tiene|tienen|hay|cuenta|posee|registra|lidera|con|opera|operan|domina|vende|venden|vendio|vendieron";
  const singular = new RegExp("\\b(que|cual|cuales|donde|quien|quienes)\\b.*\\b(region|comuna|operador|empresa|lugar|zona|marca|modelo)\\b.*\\b(" + verbos + ")\\b.*\\b(mas|menos|mayor|menor)\\b").test(q);
  const donde = /\b(donde|en que (region|comuna)) (hay|tiene|se)\b.*\b(mas|menos)\b/.test(q);
  const quien = new RegExp("\\b(quien|quienes)\\b.*\\b(" + verbos + ")\\b.*\\b(mas|menos|mayor|menor)\\b").test(q);
  const plural = Boolean(unidad) && /s$/.test(unidad[0]) && comparativo;
  // «la comuna con menos habitantes», «region con mas cargadores»
  const conUnidad = /\b(region|comuna|operador|empresa|marca|modelo)\b (con|que tiene|que tienen|que tenga|donde hay|que registra|que cuenta con|que vende|que vendio) (el |la |los |las )?(mas|menos|mayor|menor)\b/.test(q);
  // «regiones sin cargadores»: no se listan los ceros, se muestran las que tienen menos
  const sin = /\b(regiones|comunas) sin (?!luz\b|suministro\b|electricidad\b|energia\b)/.test(q);
  if (!(rank || singular || donde || plural || quien || conUnidad || sin)) return null;
  const menor = sin || /\b(menos|menor|menores|minimo|minimos|mas bajo|mas baja|peor|peores)\b/.test(q);
  let nivel = null;
  if (unidad) nivel = /region/.test(unidad[0]) ? "region" : /comuna/.test(unidad[0]) ? "comuna" : /marca/.test(unidad[0]) ? "marca" : /modelo/.test(unidad[0]) ? "modelo" : "operador";
  else if (quien) nivel = "operador";
  let top = numeroEn(q);
  if (top === null) top = singular || donde || quien || conUnidad ? 3 : 5;
  top = Math.max(1, Math.min(20, top));
  return { top, orden: menor ? "menor" : "mayor", nivel, ...(sin ? { aviso: "No puedo listar solo las que no tienen ninguno; te muestro las que tienen menos." } : {}) };
}

function detectarSerie(q) {
  const m = /\bultimos? (\d{1,2}|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|doce) (anos?|meses|periodos|dias)\b/.exec(q);
  if (m) {
    const n = /^\d/.test(m[1]) ? Number(m[1]) : NUMEROS[m[1]] || 6;
    return Math.max(2, Math.min(24, n));
  }
  if (/\b(evolucion|historial|historia|tendencia|serie|a lo largo|como ha cambiado|como cambio|mes a mes|ano a ano|desde 20\d\d)\b/.test(q)) return 12;
  if (esPreguntaDeCambio(q)) return 12;
  return null;
}

// «cuanto ha subido la bencina»: el asistente no calcula variaciones, muestra la serie publicada.
function esPreguntaDeCambio(q) {
  return /\b(ha (subido|bajado|aumentado|crecido|variado|disminuido|cambiado)|cuanto (subio|bajo|aumento|crecio|disminuyo|cambio))\b/.test(q);
}

// Periodo pedido: { periodo?, mes?, anterior? }. El mes sin ano y «el ano pasado» se resuelven cuando ya se conoce el indicador.
function detectarPeriodo(q) {
  if (/\bcenso\b/.test(q)) return {};                       // «Censo 2024» es el nombre del indicador, no un periodo
  const mm = new RegExp("\\b(" + Object.keys(MESES).join("|") + ")\\b(?: de| del)? ?(20\\d{2})?").exec(q);
  const ano = /\b(20\d{2}|19\d{2})\b/.exec(q);          // hasta 2099: hay proyecciones a 2040 y 2070
  if (mm && (mm[2] || ano)) return { periodo: `${mm[2] || ano[1]}-${String(MESES[mm[1]]).padStart(2, "0")}` };
  if (mm) return { mes: MESES[mm[1]] };
  if (ano) return { periodo: ano[1] };
  if (/\b(ano pasado|ano anterior|el pasado ano)\b/.test(q)) return { anterior: true };
  return {};
}

// Meses nombrados en la pregunta para compararlos o recorrerlos («julio y agosto de 2026», «agosto de 2025 contra agosto de 2026», «de enero a marzo de 2026»): dos o mas piden mostrarlos juntos. Devuelve
// [{ mes, anio }] en el orden de la frase; el año es el del propio mes o, si no lo trae, el unico año de la frase; sin año, el indicador decide cual (armar). «de enero a marzo» y «entre enero y marzo»
// son un rango (se recorren los meses de en medio, hasta 6); lo demas son los meses nombrados, sin rellenar.
const RX_MES = "(" + Object.keys(MESES).join("|") + ")";
const RX_MES_CON_ANIO = RX_MES + "(?:\\s+(?:de|del)\\s+|\\s+)?(?:(20\\d{2}))?";
function detectarMeses(q) {
  if (/\bcenso\b/.test(q)) return [];
  const anios = [...new Set((q.match(/\b20\d{2}\b/g) || []).map(Number))];
  const unico = anios.length === 1 ? anios[0] : null;
  const rango = new RegExp(`\\b(?:(?:de|desde)\\s+${RX_MES_CON_ANIO}\\s+(?:a|hasta)|entre)\\s+${RX_MES_CON_ANIO}\\s+(?:y|a|hasta)\\s+${RX_MES_CON_ANIO}\\b|\\b(?:de|desde)\\s+${RX_MES_CON_ANIO}\\s+(?:a|hasta)\\s+${RX_MES_CON_ANIO}\\b`).exec(q);
  const nombrados = [...q.matchAll(new RegExp("\\b" + RX_MES_CON_ANIO + "\\b", "g"))].map((m) => ({ mes: MESES[m[1]], anio: m[2] ? Number(m[2]) : unico }));
  const unicos = [];
  for (const m of nombrados) if (!unicos.some((u) => u.mes === m.mes && u.anio === m.anio)) unicos.push(m);
  if (unicos.length < 2) return unicos;
  if (rango && unicos.length === 2) {
    const [a, b] = unicos;
    const anioA = a.anio || b.anio, anioB = b.anio || a.anio;
    if ((anioA === anioB && a.mes < b.mes) || (anioA && anioB && anioA < anioB) || (!anioA && !anioB && a.mes < b.mes)) {
      const salida = [];
      let y = anioA, m = a.mes;
      for (let n = 0; n < 24; n++) {
        salida.push({ mes: m, anio: y });
        if (m === b.mes && y === anioB) break;
        m += 1;
        if (m > 12) { m = 1; y = y ? y + 1 : y; }
      }
      return salida;
    }
  }
  return unicos;
}

function anoDeReferencia(ind) {
  const d = ind.periodo_defecto || {};
  const p = d.nacional || Object.values(d)[0] || "";
  const m = /(20\d{2})/.exec(p);
  return m ? Number(m[1]) : null;
}

function resolverPeriodo(ind, det) {
  if (det.periodo) return det.periodo;
  const ref = anoDeReferencia(ind);
  if (det.anterior && ref) return String(ref - 1);
  if (det.mes && ref) {
    const p = (ind.periodo_defecto.nacional || "").slice(0, 7);
    const mesDef = Number(p.slice(5, 7)) || 12;
    return `${det.mes <= mesDef ? ref : ref - 1}-${String(det.mes).padStart(2, "0")}`;
  }
  return null;
}

// Medidas del indicador que la pregunta menciona, con el largo de la frase que calzo (mas largo = mas especifico).
function medidasMencionadas(q, ind) {
  const ids = new Set(ind.medidas.map((m) => m.id));
  const salida = [];
  for (const id of Object.keys(SIN_MEDIDA)) {
    if (!ids.has(id)) continue;
    let w = 0, palabras = 0;
    for (const frase of SIN_MEDIDA[id]) if (contiene(q, frase) && frase.length >= w) { w = frase.length; palabras = frase.split(" ").length; }
    if (w) salida.push({ id, w, palabras });
  }
  return salida;
}

// La medida de la clase o tecnologia que nombra la frase en este indicador («ventas de hibridos» -> hev_erev), cuando sus palabras solas no la eligen (una palabra comun como «hibridos» no empuja a ningun indicador).
function medidaDeLaFamilia(q, ind) {
  const clave = familiaDeLaFrase(q);
  const f = clave && FAMILIAS[clave];
  const lado = f && (ind.id === f.mensual.indicador ? f.mensual : ind.id === f.anual.indicador ? f.anual : null);
  return lado && lado.medida && ind.medidas.some((m) => m.id === lado.medida) ? lado.medida : null;
}

function detectarMedida(q, ind) {
  const c = medidasMencionadas(q, ind).sort((a, b) => b.w - a.w || (a.id === ind.medida_principal ? 1 : 0) - (b.id === ind.medida_principal ? 1 : 0));
  if (!c.length) return null;
  if (c.length > 1 && c[0].w === c[1].w && c[0].id !== ind.medida_principal && c[1].id !== ind.medida_principal) return null;   // empate entre dos medidas
  return c[0].id;
}

// ---- territorios --------------------------------------------------------------------------------------------------------------
const ROMANOS = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10, xi: 11, xii: 12, xiii: 13, xiv: 14, xv: 15, xvi: 16 };
const ORDINALES = { primera: 1, segunda: 2, tercera: 3, cuarta: 4, quinta: 5, sexta: 6, septima: 7, octava: 8, novena: 9, decima: 10, undecima: 11, duodecima: 12, decimotercera: 13, decimocuarta: 14, decimoquinta: 15, decimosexta: 16 };

// «region 8», «VIII region», «la octava region», «region V»: los chilenos nombran las regiones por su numero.
function numerosDeRegion(q) {
  const nums = new Set();
  const alt = (o) => Object.keys(o).sort((a, b) => b.length - a.length).join("|");
  for (const m of q.matchAll(/\bregion (?:de |numero |n |nro )?(\d{1,2})\b/g)) nums.add(Number(m[1]));
  for (const m of q.matchAll(new RegExp("\\b(" + alt(ROMANOS) + ") region\\b|\\bregion (?:de )?(" + alt(ROMANOS) + ")\\b", "g"))) nums.add(ROMANOS[m[1] || m[2]]);
  for (const m of q.matchAll(new RegExp("\\b(" + alt(ORDINALES) + ") region\\b|\\bregion (" + alt(ORDINALES) + ")\\b", "g"))) nums.add(ORDINALES[m[1] || m[2]]);
  return [...nums];
}

function detectarTerritorios(terr, texto, q) {
  let hallados = detectarEnTexto(terr, texto);
  if (contiene(q, "rm") && !hallados.some((t) => t.codigo === "13" && t.tipo === "region")) {
    const rm = terr.regiones.find((r) => r.codigo === "13");
    if (rm) hallados = [{ tipo: "region", codigo: "13", nombre: rm.nombre }, ...hallados];
  }
  for (const n of numerosDeRegion(q)) {
    const cod = String(n).padStart(2, "0");
    const r = terr.regiones.find((x) => x.codigo === cod);
    if (r && !hallados.some((t) => t.tipo === "region" && t.codigo === cod)) hallados = [...hallados, { tipo: "region", codigo: cod, nombre: r.nombre }];
  }
  return hallados;
}

function sinTerritorios(q, territorios) {
  let t = ` ${q} `;
  for (const x of territorios) t = t.split(` ${norm(x.nombre)} `).join(" ");
  return t.trim();
}

// ---- la ficha de una comuna o region: «cuentame de Temuco», «resumen de la region del Biobio», «que hay en Providencia» --------------------------
// Son las mismas cifras que el asistente responde por separado (poblacion, autos electricos, cargadores, bencina, horas sin luz), juntas, con el enlace al reporte completo del sitio.
// Solo si la frase pide «todo» y no trae otro tema: «cuantos cargadores hay en Temuco» sigue siendo una pregunta normal y un nombre solo («Temuco») sigue preguntando que se quiere saber.
const CLAVES_DE_FICHA = /\b(cuentame|cuentanos|hablame|habla|resumen|ficha|reporte|informe|dossier|panorama|perfil|radiografia|diagnostico|antecedentes)\b|\bque (hay|tienen|tiene|sabes|sabemos)\b|\bcomo (esta|anda|andan|va|van)\b|\b(datos|informacion|todo)( general)? (de|del|sobre|acerca de)\b|\bdime (algo|todo|lo que sepas)\b/;
const SOBRAN_EN_UNA_FICHA = new Set(("cuentame cuentanos dime dame muestrame hablame habla explicame resumen ficha reporte informe dossier panorama perfil radiografia diagnostico datos informacion antecedentes hay tienen tiene tienes sabes sabemos " +
  "como esta anda andan va van que cuales cosas todo algo general completo completa basico rapido breve regional comunal region comuna zona ciudad localidad sector territorio acerca respecto quiero quisiera necesito saber ver conocer poco sepas tengas " +
  "favor porfa por gracias hola buenas de del la el los las en y a al con para un una unos unas mi su sus lo le se me nos sobre pais chile rm").split(" "));

// Un mismo nombre es a la vez region y comuna («Los Lagos», «Maule», «Valparaiso»): la frase lo aclara con «region» o «comuna»; si no, se toma la region.
function unoDelMismoNombre(territorios, q) {
  if (territorios.length < 2 || new Set(territorios.map((t) => norm(t.nombre))).size !== 1) return territorios;
  const tipo = /\bcomuna\b/.test(q) && !/\bregion\b/.test(q) ? "comuna" : "region";
  const elegido = territorios.find((t) => t.tipo === tipo) || territorios[0];
  return [elegido];
}

function pideFicha(q, territorios) {
  if (territorios.length > 1 || !CLAVES_DE_FICHA.test(q)) return false;
  if (!territorios.length && !contiene(q, "chile")) return false;      // sin territorio solo vale «Chile»
  return sinTerritorios(q, territorios).split(" ").filter(Boolean).every((t) => SOBRAN_EN_UNA_FICHA.has(t));
}

// Las cifras de la ficha: [indicador, medida]. Por comuna la red en vivo no publica cargadores, asi que se usa el registro de la SEC (como en «cargadores en Providencia»).
const PIEZAS_DE_FICHA = {
  comuna: [["poblacion_censo2024", "poblacion"], ["parque_ev_ine", "parque_electrico"], ["registro_sec_carga", "cargadores"], ["precio_bencina93", "precio_promedio"], ["cortes_historico", "cliente_horas"]],
  region: [["poblacion_censo2024", "poblacion"], ["parque_ev_ine", "parque_electrico"], ["red_carga_viva", "cargadores_publicos"], ["precio_bencina93", "precio_promedio"], ["cortes_historico", "cliente_horas"]],
};
PIEZAS_DE_FICHA.nacional = PIEZAS_DE_FICHA.region;

// La consulta de la ficha, en la misma forma que una consulta normal (la ejecuta dialogo.js con la misma comprobacion de cifras). `t` es la comuna o region; sin `t`, el pais.
function armarFicha(cat, t) {
  const nivel = t ? t.tipo : "nacional";
  const nombre = t ? t.nombre : "Chile";
  const consultas = PIEZAS_DE_FICHA[nivel].filter(([id]) => cat.indicadores.some((i) => i.id === id))
    .map(([indicador, medida]) => ({ indicador, medida, ...(t ? { entidad: t.nombre, nivel: t.tipo } : {}) }));
  return {
    tipo: "consulta", ficha: { nombre, nivel }, indicador: consultas.length ? consultas[0].indicador : null, consultas, notas: [], heredado: false, parecidos: [], puntajes: [],
    resumen: { indicador: `Resumen de ${nombre}`, territorios: [], periodo: null, ranking: false, serie: null, medida: null },
  };
}

// ---- el parque por tecnologia: el INE no lo separa --------------------------------------------------------------------------
// «cuantos BEV hay», «cuantos autos hibridos circulan»: el INE publica el parque «electrico» en una sola categoria (eléctricos a batería, híbridos enchufables y no enchufables, buses y camiones
// electricos; los microhibridos no parecen entrar, 2026-10-24 con #23). No se contesta con esa cifra como si fuera de la tecnologia: se dice y se muestran las ventas de esa tecnologia, por año y en los ultimos 12 meses (pedido del usuario, 2026-10-24).
function esPreguntaDeParque(q) {
  return (/\b(circulacion|circulan|circulando|parque|flota|existen|ruedan)\b/.test(q) || /\bcuant[oa]s?\b.*\bhay\b/.test(q)) &&
    !/\b(modelos?|marcas?|versiones|opciones|catalogo|que|cual|cuales|autonomia|precio|precios|cuesta|ficha|seguros?|tco|ventas?|vendid\w*|vendieron|importa\w*|carga|cargar|cargador\w*|conector\w*|estacion\w*|electrolinera\w*|enchufe\w*)\b/.test(q);
}

function armarParquePorTecnologia(cat, clave) {
  const f = FAMILIAS[clave];
  if (!f || !esTecnologia(clave)) return null;
  if (f.partes) {
    // «cuantos hibridos hay»: los no enchufables (HEV) y los enchufables (PHEV) son cifras distintas y se muestran por separado, una respuesta completa para cada uno (pedido del usuario, 2026-10-24)
    const partes = f.partes.map((p) => armarParquePorTecnologia(cat, p));
    if (partes.some((x) => !x)) return null;
    return {
      tipo: "consulta", indicador: partes[0].indicador, hibridos: true, modoSiguientes: "parque", consultas: partes.flatMap((x) => x.consultas), notas: [],
      partes: partes.map((x, i) => ({ ...x, notas: i === 0 ? [`No tengo cuántos híbridos hay en circulación. ${NOTA_PARQUE_AMPLIO} Te muestro cuántos se vendieron, por separado los híbridos no enchufables (HEV) y los enchufables (PHEV), por año y en los últimos 12 meses.`] : [] })),
      heredado: false, parecidos: [], puntajes: [],
      resumen: { indicador: "Ventas de híbridos (HEV y PHEV, por separado)", territorios: [], periodo: null, ranking: false, serie: 12, medida: null },
    };
  }
  if (![f.mensual.indicador, f.anual.indicador].every((id) => cat.indicadores.some((i) => i.id === id))) return null;
  return {
    tipo: "consulta", indicador: f.mensual.indicador, familia: clave, modoSiguientes: "parque",
    consultas: [{ indicador: f.anual.indicador, ultimos: 2, medida: f.anual.medida }, { indicador: f.mensual.indicador, ultimos: 12, medida: f.mensual.medida }],
    titulos: { [f.anual.indicador]: f.anual.titulo, [f.mensual.indicador]: f.mensual.titulo },
    notas: [`No tengo cuántos ${f.etiqueta} hay en circulación. ${NOTA_PARQUE_AMPLIO} Te muestro cuántos se vendieron, por año y en los últimos 12 meses.`],
    heredado: false, parecidos: [], puntajes: [],
    resumen: { indicador: `Ventas de ${f.etiqueta}`, territorios: [], periodo: null, ranking: false, serie: 12, medida: f.mensual.medida },
  };
}

// ---- entidades que no son territorios (operador, categoria, tecnologia, clase) -----------------------------------------------
async function entidadNoTerritorial(env, ind, q, forzarNivel) {
  let mejor = null;
  const qr = raices(q);
  for (const nv of ind.niveles.filter((n) => !TERRITORIAL.has(n))) {
    if (forzarNivel && forzarNivel !== nv) continue;
    let parte;
    try { ({ parte } = await obtenerParte(env, ind, nv)); } catch { continue; }
    const vistos = new Set();
    const nombres = [];
    for (const f of parte.filas) if (!vistos.has(f.nombre)) { vistos.add(f.nombre); nombres.push(f); }
    // «Bus (M3, mas de 5 t)» y «Bus transporte colectivo» se reconocen tambien como «bus» (su primera palabra), salvo que esa palabra
    // sirva a dos entidades del nivel («camion mediano», «camion pesado»): ahi no se elige a ciegas
    const cortas = new Map();
    for (const f of nombres) {
      const dentro = /\(([^(),\s]{4,})\)/.exec(f.nombre);   // «Esmax (Petrobras)»: lo que va entre parentesis, si es una sola palabra
      const posibles = [raices(norm(f.nombre).split(" ")[0] || ""), dentro ? raices(norm(dentro[1])) : ""];
      for (const p of posibles) if (p.length >= 3 && p !== raices(f.nombre)) cortas.set(p, [...new Set([...(cortas.get(p) || []), f.nombre])]);
    }
    for (const f of nombres) {
      const claves = [f.nombre, ...(f.etiquetas ? Object.values(f.etiquetas) : [])].map((x) => raices(x)).filter((k) => k.length >= 3).map((k) => ({ k, parcial: false }));
      for (const [corta, noms] of cortas) if (noms.length === 1 && noms[0] === f.nombre) claves.push({ k: corta, parcial: true });
      for (const { k, parcial } of claves) {
        if (!contiene(qr, k)) continue;
        // «electrico» es a la vez una tecnologia y un adjetivo («buses electricos»): si algo mas calza, manda lo otro
        const largo = nv === "tecnologia" && /^electric/.test(k) ? 1 : k.length;
        if (!mejor || largo > mejor.largo) mejor = { nivel: nv, entidad: f.nombre, largo, parcial };
      }
    }
  }
  return mejor;
}

// ---- eleccion del indicador ---------------------------------------------------------------------------------------------------
function relacionados(a, b) {
  const eq = (x, y) => (x.equivalentes || []).some((s) => s.split(":")[0] === y.id) || (x.relacionados || []).includes(y.id);
  return eq(a, b) || eq(b, a);
}

function ajustarPuntajes(res, q, ctx) {
  const por = new Map(res.map((r) => [r.i.id, r]));
  const sumar = (id, n) => { const r = por.get(id); if (r) r.s += n; };
  // un indicador que la frase no menciono con sus palabras pero que es el que corresponde (se agrega con 0 puntos y despues se suma)
  const agregar = (id) => {
    if (por.has(id)) return;
    const i = ctx.cat.indicadores.find((x) => x.id === id);
    if (i) { const r = { i, s: 0 }; res.push(r); por.set(id, r); }
  };
  // una medida que la pregunta nombra con claridad («hogares», «adultos mayores», «baterias») empuja a su indicador
  for (const ind of ctx.cat.indicadores) {
    const m = medidasMencionadas(q, ind).filter((x) => x.id !== ind.medida_principal || x.w >= 8);
    if (!m.length) continue;
    // una frase de dos palabras o mas («adultos mayores», «horas sin luz») es mas especifica que una suelta: pesa un poco mas, para que una palabra comun («porcentaje») no empate con ella
    const w = Math.min(10, Math.round(Math.max(...m.map((x) => x.w)) / 1.5)) + (m.some((x) => x.palabras >= 2) ? 2 : 0);
    if (!por.has(ind.id)) { const r = { i: ind, s: 0 }; res.push(r); por.set(ind.id, r); }
    por.get(ind.id).s += w;
  }
  const k = intencionesDe(q);
  if ((ctx.periodo && /^\d{4}-\d{2}$/.test(ctx.periodo)) || ctx.mes) sumar("ventas_enchufables_mensual", 8);
  else if ((ctx.periodo && /^\d{4}$/.test(ctx.periodo)) || ctx.anterior) { sumar("ventas_electrificados_anual", 8); sumar("ventas_enchufables_mensual", -3); }
  if (k.ventas) { sumar("ventas_enchufables_mensual", 3); sumar("ventas_electrificados_anual", 3); }
  if (/\b(meses|mes a mes|mensual|mensuales|mensualmente|por mes|al mes|cada mes|ultimo mes|este mes|mes pasado)\b/.test(q)) sumar("ventas_enchufables_mensual", 5);
  if (/\b(anos|anual|anuales|por ano|este ano|en el ano|del ano|al ano|durante el ano)\b/.test(q)) sumar("ventas_electrificados_anual", 5);
  if (/\b(ahora|en este momento|en vivo|hoy|actualmente|en estos momentos)\b/.test(q)) { sumar("cortes_en_vivo", 3); sumar("estado_conectores_ahora", 3); }
  if (k.stock && /\b(autos?|vehiculos?|electricos?)\b/.test(q) && !k.conPesados) sumar("parque_ev_ine", 4);
  // «penetracion de electricos», «adopcion de EVs»: es la fraccion del parque en circulacion, no ventas ni generacion electrica
  if (/\bpenetracion\b/.test(q) && /\b(electric[ao]s?|electrificad\w*|evs?\b|bevs?\b|phevs?\b)\b/.test(q)) { agregar("parque_ev_ine"); sumar("parque_ev_ine", 25); sumar("ventas_electrificados_anual", -16); sumar("generacion_electrica", -10); }
  if (/\badopcion\b/.test(q) && /\b(electric[ao]s?|electrificad\w*|evs?\b|bevs?\b|phevs?\b)\b/.test(q) && !k.ventas) { agregar("parque_ev_ine"); sumar("parque_ev_ine", 25); sumar("ventas_electrificados_anual", -16); sumar("generacion_electrica", -8); }
  if (k.importa) { sumar("importaciones_electrificados", 4); sumar("pesados_importacion", 2); }
  if (k.conPesados && k.stock) agregar("pesados_parque");              // «cuantos tractocamiones hay»: ese nombre solo esta en las importaciones, pero el parque de pesados es el que cuenta lo que circula
  if (k.conPesados) { sumar("pesados_parque", 4); sumar("pesados_importacion", 4); }
  // «electrico» tambien es la palabra de la generacion electrica: con vehiculos y sin palabras de generacion, no es ese tema
  if (/\b(autos?|vehiculos?|camiones?|buses|bus|camionetas?|motos?|flota)\b/.test(q) && !/\b(generacion|generar|genera|produce|produccion|energia|electricidad|renovables?|solar|eolic\w*|hidraulic\w*|termic\w*|central\w*)\b/.test(q)) sumar("generacion_electrica", -8);
  if (/\b(bencina|bencinas|gasolina|parafina|combustible|combustibles)\b/.test(q)) sumar("precio_bencina93", 6);
  // diesel y bencinas de 95 y 97 (precio_combustibles); «combustibles» a secas tambien, porque ahi se ven todos; la 93 y su serie siguen siendo de precio_bencina93
  if (/\b(diesel|petroleo)\b|\b(bencina|bencinas|gasolina|gasolinas) (de )?9[57]\b|\b9[57] octanos\b/.test(q)) { sumar("precio_combustibles", 14); sumar("precio_bencina93", -6); }
  else if (/\bcombustibles\b/.test(q) && !/\b(bencina|bencinas|gasolina|gasolinas)\b/.test(q)) sumar("precio_combustibles", 8);
  // ventas por marca y por modelo: solo si se pregunta por ventas o por lo mas vendido. Si no, «model y» o «CIT del Tesla Model 3» (vehiculos) y «autos electricos por comuna» (parque) caerian aqui.
  const lomas = pideLoMasVendido(q);
  const rk = ctx.ranking && ctx.ranking.nivel;
  const territorial = Boolean(ctx.territorios && ctx.territorios.length) || rk === "region" || rk === "comuna";
  if (!(k.ventas || lomas) || territorial) { sumar("ventas_marca", -15); sumar("ventas_modelo_mes", -15); }
  else {
    // sin la palabra «marca», una marca nombrada o «lo mas vendido», las ventas siguen siendo las totales («evolucion de las ventas de autos electricos»); idem para «modelo»
    const marcas = /\bmarcas?\b/.test(q), modelos = /\b(modelo|modelos)\b/.test(q);
    if (rk === "marca" || marcas || ctx.marcaNombrada || lomas) sumar("ventas_marca", 10 + (ctx.marcaNombrada ? 12 : 0)); else sumar("ventas_marca", -15);
    if (rk === "modelo" || modelos || lomas) sumar("ventas_modelo_mes", 10); else sumar("ventas_modelo_mes", -15);
    // «los autos mas vendidos», «el electrico mas vendido»: son modelos, no marcas
    if (lomas && !marcas && !modelos && !ctx.marcaNombrada) { sumar("ventas_modelo_mes", 8); sumar("ventas_marca", -6); }
  }
  if (/\b(operador(es)?|copec|enel|shell|petrobras)\b/.test(q) || (ctx.ranking && ctx.ranking.nivel === "operador")) sumar("operadores_carga", ctx.ranking && ctx.ranking.nivel === "operador" ? 12 : 4);
  // ventas mensuales de una clase (buses, camiones; indicadores ventas_buses_mensual y ventas_camiones_mensual): solo si se habla de ella y de ventas y se piden por mes, en serie o, en los buses, por
  // categoria de servicio; un año solo sigue siendo el total anual de ventas_electrificados_anual, y «cuantos buses hay» es el parque (pesados_parque)
  const familia = familiaDeLaFrase(q);
  const porMes = Boolean(ctx.mes) || Boolean(ctx.periodo && /^\d{4}-\d{2}$/.test(ctx.periodo)) || Boolean(ctx.serie) || /\b(mensual\w*|por mes|cada mes|meses|mes pasado|ultimo mes|este mes)\b/.test(q);
  for (const clave of ["buses", "camiones"]) {
    const id = FAMILIAS[clave].mensual.indicador;
    if (familia === clave && k.ventas && (porMes || (clave === "buses" && PIDE_CATEGORIA_DE_BUS.test(q)))) {
      agregar(id);
      sumar(id, 24); sumar("ventas_electrificados_anual", -10); sumar("ventas_enchufables_mensual", -10);
    } else sumar(id, -30);
  }
  // una tecnologia con solo un año («ventas de PHEV en 2025»): es el total de ese año (ventas_electrificados_anual); por mes o en serie sigue siendo el mensual
  if (esTecnologia(familia) && k.ventas && !porMes && ((ctx.periodo && /^\d{4}$/.test(ctx.periodo)) || /\b(este ano|en el ano|del ano|durante el ano|al ano|por ano|anual\w*)\b/.test(q))) { sumar("ventas_electrificados_anual", 20); sumar("ventas_enchufables_mensual", -20); }
  // «cuantos PHEV hay en Temuco»: el parque es el del INE (la unica cifra de parque por territorio) aunque «PHEV» tambien empuje a las ventas; armar avisa que su cifra no es de esa tecnologia
  if (esTecnologia(familia) && !k.ventas && !k.importa && esPreguntaDeParque(q)) {
    agregar("parque_ev_ine");
    sumar("parque_ev_ine", 20); sumar("ventas_enchufables_mensual", -20); sumar("ventas_electrificados_anual", -20);
  }
  // proyecciones: solo ganan si la pregunta las pide (proyeccionAplicable); si no, «poblacion de Temuco» o «capacidad solar» siguen con sus datos reales
  if (ctx.proy && !por.has(ctx.proy)) {
    const i = ctx.cat.indicadores.find((x) => x.id === ctx.proy);
    if (i) { const r = { i, s: 0 }; res.push(r); por.set(i.id, r); }
  }
  for (const id of PROYECCIONES) sumar(id, id === ctx.proy ? 30 : -30);
  return res.sort((a, b) => b.s - a.s || a.i.id.localeCompare(b.i.id));
}

// Clases de indicadores que responden preguntas distintas aunque compartan palabras (parque vs ventas vs importaciones; cortes ahora vs historia).
const CLASE = {
  parque_ev_ine: "stock", pesados_parque: "stock",
  ventas_enchufables_mensual: "ventas", ventas_electrificados_anual: "ventas", ventas_buses_mensual: "ventas", ventas_camiones_mensual: "ventas",
  importaciones_electrificados: "importacion", pesados_importacion: "importacion",
  cortes_en_vivo: "vivo", cortes_historico: "historia",
};

// «el auto mas vendido», «que marca vende mas», «la cuota de mercado», «los lideres del mercado»: piden un ranking de ventas aunque no digan «ventas».
function pideLoMasVendido(q) {
  return /\b(mas|menos) vendid[oa]s?\b|\bmas se (vende|venden|vendio|vendieron)\b|\bque (se )?(vende|venden|vendio) (mas|menos)\b|\bvende (mas|menos)\b|\blider(es)? del mercado\b|\bcuota de mercado\b|\bparticipacion de mercado\b/.test(q);
}

function intencionesDe(q) {
  const ventas = /\b(se vendieron|vendieron|vendidos|vendidas|vendido|vendida|ha vendido|han vendido|ventas|venta|vendio|venden|vende|se venden|se vende|compraron|comprados|se compran)\b/.test(q);
  const importa = /\b(importaron|importados|importacion|importaciones|aduana|ingresaron)\b/.test(q);
  const conPesados = /\b(camiones?|buses|tractocamiones?|pesados)\b/.test(q);
  const stock = !ventas && !importa && (/\b(circulacion|circulan|parque|flota|hay|existen|tiene|tienen)\b/.test(q) || (/\b(autos?|vehiculos?|camiones?|buses)\b/.test(q) && /\belectric/.test(q)));
  const historia = /\b(historico|historial|historia|acumulado|acumuladas|cliente horas|horas sin|cuantas horas|desde 20\d\d|durante|resiliencia|confiabilidad|por ano|en el ano|este ano|del ano|al ano|anual|en los ultimos|a lo largo)\b/.test(q);
  const cortes = /\b(cortes?|luz|apagon|suministro|sin energia|sin electricidad)\b/.test(q);
  return { ventas, importa, stock, historia, cortes, conPesados };
}

// Deja solo los indicadores de la clase que la pregunta pide (si eso no deja ninguno, no filtra).
function filtrarPorIntencion(res, q, ranking = null) {
  const k = intencionesDe(q);
  const quiere = new Set();
  if (k.ventas) quiere.add("ventas");
  if (k.importa) quiere.add("importacion");
  if (k.stock) quiere.add("stock");
  const flujoOStock = quiere.size > 0;
  if (!flujoOStock && !k.cortes) return res;
  // «comunas con mas cortes»: solo el historial llega a nivel comuna
  const historia = k.historia || Boolean(ranking && ranking.nivel === "comuna");
  const compatibles = res.filter((r) => {
    const c = CLASE[r.i.id];
    if (!c) return true;
    if (c === "vivo" || c === "historia") return !k.cortes || c === (historia ? "historia" : "vivo");
    return !flujoOStock || quiere.has(c);
  });
  return compatibles.length ? compatibles : res;
}

// Si el indicador no tiene el nivel pedido (p. ej. comuna) pero otro, declarado como «la misma pregunta con otro universo», si lo tiene: se usa ese y se dice.
function indicadorConNivel(cat, ind, nivel) {
  for (const spec of ind.equivalentes || []) {
    const o = cat.indicadores.find((x) => x.id === spec.split(":")[0]);
    if (o && o.niveles.includes(nivel)) return o;
  }
  return null;
}

// Al pasar a otro indicador (p. ej. a nivel de comuna: «cargadores publicos en Providencia» pasa de la red en vivo al registro de la SEC), la medida que se pidio puede no existir
// ahi y la consulta fallaba con «la medida no existe»: se pide la del otro indicador (todas las que tenga) y se dice, con lo mas cercano si lo hay («conectores publicos»).
function baseParaIndicador(base, ind, destino, notas, nivel) {
  if (!base.medida || destino.id === ind.id || destino.medidas.some((m) => m.id === base.medida)) return base;
  const pedida = ind.medidas.find((m) => m.id === base.medida);
  const cercana = /public/.test(base.medida) ? destino.medidas.find((m) => /public/.test(m.id)) : null;
  const nota = `No tengo «${pedida ? pedida.nombre : base.medida}» por ${nivel}; ${cercana ? `lo más cercano es «${cercana.nombre}»` : "te muestro lo que sí hay"}.`;
  if (!notas.includes(nota)) notas.push(nota);
  const { medida, ...resto } = base;
  return resto;
}

// ---- armado de consultas para un indicador -----------------------------------------------------------------------------------
const NOMBRE_MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const mesEnTexto = (ym) => { const m = /^(\d{4})-(\d{2})/.exec(ym || ""); return m ? `${NOMBRE_MES[Number(m[2]) - 1]} de ${m[1]}` : null; };
// Indicadores de una sola cifra publicada (no tienen serie ni cortes por periodo): se pide su unico periodo y se dice.
const DE_UN_SOLO_PERIODO = new Set(["ventas_marca", "ventas_modelo_mes", "precio_combustibles"]);
const SERIE_SOLO_DEL_TOTAL = new Set(["ventas_buses_mensual"]);
// Los buses se piden tambien por categoria de servicio (lo unico mensual que tiene mas de una cifra): interurbano, media distancia, minibus, taxibus y sistema RED.
const PIDE_CATEGORIA_DE_BUS = /\b(categoria\w*|tipo de servicio|servicio|interurban\w*|media distancia|minibus\w*|taxibus\w*|sistema red|transantiago)\b/;
// «compara con agosto de 2025», «versus 2023», «frente a julio»: pide poner un periodo junto a otro. Despues de una respuesta de un solo periodo, el otro lado es ese (armar).
const PIDE_COMPARAR = /\b(compara\w*|comparad[oa]s?|versus|vs|contra|frente a|respecto (?:a|de|del)|en comparacion (?:a|con))\b/;
// «ventas de hibridos»: los no enchufables (HEV) y los enchufables (PHEV) se muestran POR SEPARADO (pedido del usuario, 2026-10-24: «los hibridos por separados»): una respuesta completa para cada uno, una tras
// otra (dialogo.js: ejecutarPorSeparado). Aqui la consulta se parte en una por tipo, con la medida que cada indicador le da (MEDIDAS_DE_HIBRIDOS). Si la frase ya pide una medida («participacion de hibridos»)
// o el indicador no tiene cifras de hibridos, no se parte. Tras una respuesta de hibridos, un seguimiento sin otra tecnologia («¿y en 2025?») sigue siendo de los dos.
function separarHibridos(interp, q, ind, medida, heredado, previo) {
  const clave = familiaDeLaFrase(q);
  const pide = clave === "hibridos" || (heredado && previo && previo.hibridos && !clave);
  const medidas = MEDIDAS_DE_HIBRIDOS[ind.id];
  if (!pide || medida || !medidas) return interp;
  const partes = medidas.map((m, i) => ({ ...interp, consultas: interp.consultas.map((c) => ({ ...c, medida: m })), notas: i === 0 ? interp.notas : [], parecidos: [] }));
  return { ...interp, partes, hibridos: true };
}

// El INE publica el parque «electrico» en una sola categoria: no se contesta con esa cifra como si fuera de una tecnologia (armarParquePorTecnologia).
const NOTA_PARQUE_AMPLIO = "El INE no separa el parque por tecnología: su cifra de «eléctricos» incluye eléctricos a batería (BEV), híbridos enchufables (PHEV) e híbridos no enchufables (HEV), además de buses y camiones eléctricos; los microhíbridos (MHEV) no parecen entrar en el registro municipal.";
// Lo que se pide «en vivo»: con alguna de estas palabras un «ahora» al comienzo sigue siendo «en este momento» (interpretar).
const PIDE_LO_EN_VIVO = /\b(en vivo|en este momento|en estos momentos|actualmente|hoy|disponibles?|libres?|ocupad[oa]s?|funcionan\w*|operativ\w+|fuera de servicio|cortes?|sin luz|sin suministro|sin energia)\b/;
// Transporte publico (SEC): cada medida vive en su periodo (lo proyectado en 2026 o 2026/2027, lo actual en 2025); si se pide una medida sin decir el año, se pide el periodo de esa medida.
const PERIODO_DE_MEDIDA = { proyeccion_transporte_publico: { flota_buses_proyectada: "2026", flota_buses: "2025", cctp_actuales: "2025", cctp_potencia_mw: "2025", electroterminales: "2025", electroterminales_potencia_mw: "2025" } };

async function armar(env, cat, ind, e) {
  const { q, territorios, per, ranking, heredado, previo } = e;
  let { serie } = e;
  const notas = [];
  const base = {};
  const periodo = resolverPeriodo(ind, per);
  if (periodo && !(DE_UN_SOLO_PERIODO.has(ind.id) && ind.id !== "ventas_modelo_mes")) base.periodo = periodo;
  if (periodo && ind.id === "ventas_marca") notas.push(`Las ventas por marca se publican acumuladas desde ${mesEnTexto(((ind.cobertura || {}).marca || {}).desde) || "el inicio del detalle"}, sin cortes por año ni por mes; te muestro ese acumulado.`);
  if (periodo && ind.id === "precio_combustibles") notas.push("Los precios de los combustibles se publican con su última captura, sin otros períodos; te muestro esa.");
  if (serie && DE_UN_SOLO_PERIODO.has(ind.id)) {
    notas.push(ind.id === "precio_combustibles" ? "Del diésel y las bencinas de 95 y 97 solo tengo el precio de hoy, sin evolución; la bencina de 93 sí tiene serie." : "Estas ventas se publican como una sola cifra, sin evolución en el tiempo; te muestro la cifra publicada.");
    serie = null;
  }
  const medida = detectarMedida(q, ind) || medidaDeLaFamilia(q, ind) || (heredado && previo && previo.medida && ind.medidas.some((m) => m.id === previo.medida) ? previo.medida : null);
  // la medida principal no restringe (se muestran todas, empezando por ella); solo se pide una en particular cuando es otra
  if (medida && medida !== ind.medida_principal) base.medida = medida;
  if (!base.periodo && base.medida && PERIODO_DE_MEDIDA[ind.id] && PERIODO_DE_MEDIDA[ind.id][base.medida]) base.periodo = PERIODO_DE_MEDIDA[ind.id][base.medida];
  // «cuantos PHEV hay en Temuco»: el INE no separa el parque por tecnologia; la cifra es la del parque «electrico» completo y se dice
  if (ind.id === "parque_ev_ine" && esTecnologia(familiaDeLaFrase(q))) notas.push(NOTA_PARQUE_AMPLIO);

  const consultas = [];
  const noTerr = await entidadNoTerritorial(env, ind, q, null);
  const usables = territorios.filter((t) => ind.niveles.includes(t.tipo));
  // se reconocio una categoria por su primera palabra («camiones» -> «Camión simple»): se dice cual se muestra, porque las otras se cuentan aparte
  const avisoParcial = () => {
    if (noTerr && noTerr.parcial && noTerr.nivel !== "operador") notas.push(`Te muestro «${noTerr.entidad}»; otras categorías de esta misma cifra se cuentan aparte.`);
  };
  // «buses electricos»: la categoria (bus) y la medida de pesados electricos, en vez de la tecnologia «Electrico» de todos los pesados
  let medidaFinal = medida;
  if (noTerr && noTerr.nivel !== "tecnologia" && !base.medida && /electric/.test(q) && ind.medidas.some((m) => m.id === "electricos")) {
    base.medida = "electricos";
    medidaFinal = "electricos";
  }

  if (ranking) {
    let nivel = ranking.nivel;
    let destino = ind;
    if (nivel && !ind.niveles.includes(nivel)) {
      const alt = indicadorConNivel(cat, ind, nivel);
      if (alt) {
        destino = alt;
        notas.push(`Por ${nivel === "comuna" ? "comuna" : "región"} el dato disponible es «${alt.nombre}» (otra definición que la de «${ind.nombre}»).`);
      } else {
        notas.push(`Este indicador no está publicado ${nivel === "comuna" ? "por comuna" : nivel === "region" ? "por región" : "por " + nivel}.`);
        nivel = null;
      }
    }
    const otros = destino.niveles.filter((n) => n !== "nacional");
    if (!nivel) nivel = destino.niveles.includes("region") ? "region" : otros[0] || null;
    if (!nivel) {
      notas.push("Este indicador solo existe a nivel nacional: no hay ranking posible.");
      consultas.push({ ...base });
    } else {
      const c = { ...baseParaIndicador(base, ind, destino, notas, nivel === "comuna" ? "comuna" : "región"), top: ranking.top, orden: ranking.orden, nivel };
      if (destino !== ind) c.indicador = destino.id;
      consultas.push(c);
      if (ranking.aviso) notas.push(ranking.aviso);
    }
  } else if (serie) {
    const c = { ...base, ultimos: serie };
    delete c.periodo;
    if (SERIE_SOLO_DEL_TOTAL.has(ind.id) && !c.medida) c.medida = ind.medida_principal;       // doce meses de seis medidas no se leen: la serie es la del total, salvo que se pida una categoria
    if (usables.length) c.entidad = usables[0].nombre;
    else if (noTerr) { c.entidad = noTerr.entidad; c.nivel = noTerr.nivel; avisoParcial(); }
    consultas.push(c);
    if (esPreguntaDeCambio(q) && !ind.medidas.some((m) => /variacion/.test(m.id)) && !INDICADORES_MENSUALES_DE_VENTAS.has(ind.id)) notas.push("No calculo variaciones por mi cuenta; te muestro la serie publicada para que veas el cambio.");
  } else if (noTerr && !usables.length) {
    consultas.push({ ...base, entidad: noTerr.entidad, nivel: noTerr.nivel });
    avisoParcial();
    if (territorios.length && noTerr.largo > 1) notas.push(`No tengo «${noTerr.entidad}» desglosado por territorio; te muestro su total.`);
  } else if (territorios.length) {
    if (noTerr && noTerr.largo > 1) notas.push(`No puedo combinar «${noTerr.entidad}» con un territorio; te muestro el dato del territorio.`);
    // un mismo nombre (Maule: region y comuna) cuenta una vez; si alguno sirve para este indicador, se usa ese
    const porNombre = new Map();
    for (const t of territorios) {
      const k = norm(t.nombre);
      if (!porNombre.has(k)) porNombre.set(k, []);
      porNombre.get(k).push(t);
    }
    const objetivos = [];
    for (const grupo of porNombre.values()) {
      const util = grupo.find((t) => ind.niveles.includes(t.tipo));
      if (util) { objetivos.push({ nombre: util.nombre }); continue; }
      const t = grupo[0];
      if (t.tipo === "comuna") {
        const alt = indicadorConNivel(cat, ind, "comuna");
        if (alt) {
          objetivos.push({ nombre: t.nombre, indicador: alt.id, destino: alt });
          const aviso = `Por comuna el dato disponible es «${alt.nombre}» (otra definición que la de «${ind.nombre}»).`;
          if (!notas.includes(aviso)) notas.push(aviso);
        } else if (ind.niveles.includes("region") && t.region_codigo) {
          objetivos.push({ nombre: t.region });
          notas.push(`No tengo este dato por comuna: te muestro la región de ${t.nombre} (${t.region}).`);
        }
      }
    }
    if (!objetivos.length) {
      notas.push(ind.niveles.includes("nacional") ? "Este indicador solo está publicado a nivel nacional: te muestro eso." : `Este indicador solo está publicado por ${ind.niveles.join(", ")}.`);
      consultas.push({ ...base });
    } else {
      for (const u of objetivos.slice(0, 3)) consultas.push({ ...(u.destino ? baseParaIndicador(base, ind, u.destino, notas, "comuna") : base), entidad: u.nombre, ...(u.indicador ? { indicador: u.indicador } : {}) });
    }
  } else if (ind.niveles.includes("nacional")) {
    consultas.push({ ...base });
  } else if (ind.id === "proyeccion_pelp") {
    // sin decir una tecnologia: todas, una fila cada una, con los tres escenarios (un ranking mostraria un solo escenario)
    const { parte } = await obtenerParte(env, ind, "tecnologia");
    for (const nombre of [...new Set(parte.filas.map((f) => f.nombre))]) consultas.push({ ...base, entidad: nombre, nivel: "tecnologia" });
    notas.push("No indicaste una tecnología; te muestro todas, con los tres escenarios de la PELP.");
  } else {
    // indicadores sin nivel nacional (operadores, categorias): se muestra un ranking corto
    const nv = ind.niveles.find((n) => !TERRITORIAL.has(n)) || ind.niveles[0];
    const c = { ...base, top: 5, orden: "mayor", nivel: nv };
    // el ranking exige un periodo exacto: un ano suelto sobre datos mensuales no existe, y sumar los meses no es cosa del asistente
    if (c.periodo && /^\d{4}$/.test(c.periodo) && /-/.test((ind.periodo_defecto || {})[nv] || "")) {
      delete c.periodo;
      notas.push("Este dato se publica por mes, no por año; te muestro el último mes disponible.");
    }
    consultas.push(c);
    notas.push("No indicaste uno en particular; te muestro los cinco mayores.");
  }
  // «ventas 2022 vs 2023»: una consulta por ano pedido (hasta cuatro) y se muestran juntas
  if (e.anios && e.anios.length >= 2 && !ranking && !serie) {
    const originales = consultas.splice(0);
    for (const y of e.anios.slice(0, 4).sort()) for (const c of originales.slice(0, 2)) consultas.push({ ...c, periodo: y });       // del mas antiguo al mas nuevo
  } else if (e.meses && e.meses.length >= 2 && !ranking && !serie) {
    // «julio y agosto de 2026», «agosto de 2025 contra agosto de 2026», «de enero a marzo»: una consulta por mes (hasta seis) y se muestran juntas, cada cifra tal como se publica (no se calcula la diferencia)
    const periodos = [...new Set(e.meses.slice(0, 6).map((m) => (m.anio ? `${m.anio}-${String(m.mes).padStart(2, "0")}` : resolverPeriodo(ind, { mes: m.mes }))).filter(Boolean))].sort();   // del mas antiguo al mas nuevo
    if (periodos.length >= 2) {
      const originales = consultas.splice(0);
      for (const p of periodos) for (const c of originales.slice(0, 2)) consultas.push({ ...c, periodo: p });
      if (SERIE_SOLO_DEL_TOTAL.has(ind.id)) for (const c of consultas) if (!c.medida) c.medida = ind.medida_principal;
      if (e.meses.length > 6) notas.push("Nombraste más de seis meses; te muestro los primeros seis.");
    }
  } else if (heredado && previo && previo.periodo && base.periodo && base.periodo !== previo.periodo && base.periodo.length === previo.periodo.length && PIDE_COMPARAR.test(q) && !ranking && !serie && !territorios.length && !noTerr) {
    // «compara con agosto de 2025» justo despues de una respuesta de un solo periodo: se muestran los dos (el que se acaba de ver y el nuevo), cada cifra tal como se publica
    const originales = consultas.splice(0);
    for (const p of [previo.periodo, base.periodo].sort()) for (const c of originales.slice(0, 2)) consultas.push({ ...c, periodo: p });
    if (SERIE_SOLO_DEL_TOTAL.has(ind.id)) for (const c of consultas) if (!c.medida) c.medida = ind.medida_principal;
  }
  return { consultas, notas, medida: medidaFinal, periodo: base.periodo || null };
}

// Anos nombrados en la pregunta (dos o mas = comparacion). «Censo 2024» es el nombre del indicador y un mes concreto ya fija el periodo.
function detectarAnios(q) {
  if (/\bcenso\b/.test(q) || new RegExp("\\b(" + Object.keys(MESES).join("|") + ")\\b").test(q)) return [];
  return [...new Set(q.match(/\b(?:19|20)\d{2}\b/g) || [])];
}

// ---- pedidos que el asistente deja abiertos ----------------------------------------------------------------------------------
// Las preguntas armadas (ejemplos, botones de seguimiento y sugerencias) no nombran marcas ni modelos (decision del usuario, 2026-10-22): el asistente pide «la marca o el modelo» y guarda
// que pidio en previo.pedirVehiculo. Aqui, la frase con que se completa lo que la persona escriba despues.
const COMPLETAR_PEDIDO = {
  autonomia: (t) => `autonomía del ${t}`,
  tco: (t) => `costo de tener un ${t}`,
  rescate: (t) => `ficha de rescate del ${t}`,
  etiqueta: (t) => `etiqueta de eficiencia del ${t}`,
  ventas_marca: (t) => `ventas de ${t}`,
};
// «las ventas de una marca», «cuanto vendio alguna marca»: se habla de una marca sin nombrarla
const PIDE_UNA_MARCA = /\b(ventas?|vendid\w+|vendio|vende|venden)\b.{0,30}\b(una|alguna|cierta|cada) marca\b|\b(una|alguna|cierta) marca\b.{0,30}\b(ventas?|vendid\w+|vendio|vende)\b/;

// ---- interpretacion completa -------------------------------------------------------------------------------------------------
// ctx: { cat, terr, previo?, forzar? }. Devuelve { tipo: ..., ... } (ver dialogo.js). Cada consulta puede traer su propio `indicador`.
async function interpretar(env, texto, ctx) {
  let limpio = limpiarPregunta(texto);
  let q = normalizarUnidades(norm(limpio));
  const social = detectarSocial(q);
  if (social) return { tipo: social };
  // «ahora en Ñuble», «ahora compara con 2023»: al comienzo de un seguimiento «ahora» es «pasemos a…», no «en este momento» (que llevaba a los conectores disponibles ahora o a ninguna respuesta)
  if (ctx.previo && !ctx.forzar && /^ahora\s/.test(q) && !PIDE_LO_EN_VIVO.test(q)) q = q.replace(/^ahora\s+/, "y ");

  // las preguntas armadas no nombran marcas («revisa la autonomia de los vehiculos»): el asistente pidio «la marca o el modelo» (previo.pedirVehiculo) y lo que se escribe ahora, si es un
  // vehiculo, completa esa pregunta («dolphin mini» -> «autonomia del dolphin mini»). Si no es un vehiculo, la frase sigue su camino normal.
  const abierto = !ctx.forzar && ctx.previo && ctx.previo.pedirVehiculo ? COMPLETAR_PEDIDO[ctx.previo.pedirVehiculo] : null;
  if (abierto && await pareceNombreDeVehiculo(env, q)) {
    limpio = abierto(limpio);
    q = normalizarUnidades(norm(limpio));
  }

  // «ventas de una marca» sin decir cual: se pide la marca (sin ejemplos con marcas) en vez de mostrar un ranking
  if (!ctx.forzar && PIDE_UNA_MARCA.test(q) && !detectarRanking(q)) {
    const vm = ctx.cat.indicadores.find((i) => i.id === "ventas_marca");
    if (vm && !(await entidadNoTerritorial(env, vm, q, "marca"))) return { tipo: "pedir", pedido: "ventas_marca" };
  }

  // la ficha de una comuna o region («cuentame de Temuco»): va antes que las negativas (esa frase trae «cuentame», que tambien se dice de chistes)
  const terrFicha = ctx.forzar ? [] : unoDelMismoNombre(detectarTerritorios(ctx.terr, limpio, q), q);
  if (!ctx.forzar && pideFicha(q, terrFicha)) {
    const f = armarFicha(ctx.cat, terrFicha[0] || null);
    if (f.consultas.length) return f;
  }

  // leyes y normas (nlu_norm.js): si los archivos no se pueden leer, la conversacion sigue con lo demas (y solo se avisa si la pregunta era claramente de leyes)
  const pistas = pistasDeNorma(limpio, q);
  let falloNormativa = false;
  const probarNormativa = async (opciones) => {
    try { return await interpretarNorma(env, limpio, q, opciones); } catch (e) {
      if (e instanceof ErrorNormativa) { falloNormativa = true; return null; }
      throw e;
    }
  };
  // una proyeccion que el sitio publica (parque 2025, poblacion del INE, escenarios de la PELP, transporte publico de la SEC): no es un pronostico mio y se responde con su indicador
  let proy = ctx.forzar ? null : proyeccionAplicable(q);
  // seguimiento de una proyeccion («¿y en 2040?», «¿y la solar?»): sin decir de nuevo que es una proyeccion, sigue siendo la misma
  const previoProy = !ctx.forzar && !proy && ctx.previo && PROYECCIONES.includes(ctx.previo.indicador) && /^(y|e|pero|ahora|tambien|entonces)\b/.test(q) ? ctx.cat.indicadores.find((i) => i.id === ctx.previo.indicador) : null;
  if (previoProy && (/\b20\d{2}\b/.test(q) || await entidadNoTerritorial(env, previoProy, q, null))) proy = previoProy.id;
  let fuera = fueraDeAlcance(q);
  // «costo por km del Nissan Leaf»: con un modelo concreto es una pregunta de vehiculos (su costo de tener trae el costo por kilometro), no de la pagina del costo por kilometro
  if (fuera && fuera.cedeAVehiculos && await nombraUnModelo(env, q)) fuera = null;
  if (fuera && proy && (fuera.motivo === "prediccion" || fuera.cedeAProyecciones)) fuera = null;
  if (fuera) {
    // algunas negativas se levantan cuando la pregunta es de leyes y normas (ver AVISO_CON_LEYES)
    const quiereLeyes = pistas.fuerte || pistas.temprana;
    const sePuedeLevantar = !ctx.forzar && quiereLeyes && fuera.motivo in AVISO_CON_LEYES && !(fuera.motivo === "meta" && AVANCE_DE_META.test(q) && !FUERZA_JURIDICA.test(q));
    if (sePuedeLevantar) {
      const n = await probarNormativa({ previo: ctx.previo, debil: !pistas.fuerte });
      if (n && n.intencion !== "sin_norma") return AVISO_CON_LEYES[fuera.motivo] ? { ...n, aviso: AVISO_CON_LEYES[fuera.motivo] } : n;
    }
    return { tipo: "fuera_alcance", ...fuera };
  }
  // una pregunta con palabras o numeros propios de leyes («ley 21.505», «normas de cargadores», «es obligatoria la meta 2035») o un seguimiento sobre la ultima norma mostrada
  if (!ctx.forzar && (pistas.fuerte || (ctx.previo && ctx.previo.norma))) {
    const n = await probarNormativa({ previo: ctx.previo });
    if (n) {
      if (esDefinicion(q) && SIN_TEMA_LEGAL.has(n.intencion)) return { tipo: "fuera_alcance", motivo: "definicion", texto: "No doy definiciones generales: respondo con cifras ya publicadas." };
      return n;
    }
    if (falloNormativa && pistas.fuerte) return { tipo: "error_normativa" };
  }

  const { cat, terr } = ctx;
  if (esComparacionDeCostos(q)) {
    return {
      tipo: "consulta", indicador: "precio_kwh_carga", heredado: false, parecidos: [],
      consultas: [{ indicador: "precio_kwh_carga" }, { indicador: "precio_bencina93" }],
      notas: ["No puedo decir cuál sale más barato por kilómetro en general: eso depende del rendimiento de cada vehículo (kilómetros por kWh y por litro). Estas son las cifras publicadas de la carga y de la bencina; para dos modelos concretos, pídeme la comparación de su costo de uso escribiendo los dos modelos separados por «vs»:"],
      resumen: { indicador: "Precio de la carga y de la bencina", territorios: [], periodo: null, ranking: false, serie: null, medida: null },
    };
  }
  // vehiculos (modelos, fichas, rescate, seguros, TCO): si la frase trae palabras del tema, se mira primero; si no, solo cuando los indicadores no encuentran nada claro.
  // Si los archivos de vehiculos no se pueden leer, la conversacion sigue con los indicadores (y solo se avisa si la pregunta era claramente de vehiculos).
  let falloVehiculos = false;
  const probarVehiculos = async (opciones) => {
    try { return await interpretarVehiculo(env, limpio, q, opciones); } catch (e) {
      if (e instanceof ErrorVehiculos) { falloVehiculos = true; return null; }
      throw e;
    }
  };
  let intentoVehiculos = false;
  let pistaVehiculos = false;
  if (!ctx.forzar && indiciosFuertes(q)) {
    intentoVehiculos = true;
    pistaVehiculos = indiciosExclusivos(q);
    const v = await probarVehiculos({ previo: ctx.previo });
    if (v) return v;
  }
  // reglas dichas sin «ley» ni «norma» («puedo instalar un cargador en mi edificio», «los autos electricos pagan permiso de circulacion»): se confirman contra el catalogo
  // de normas antes de mirar los indicadores (solo si calzan bien; si no, la pregunta sigue su camino)
  let probadoDebil = false;
  if (!ctx.forzar && !pistas.fuerte && pistas.temprana) {
    probadoDebil = true;
    const n = await probarNormativa({ debil: true });
    if (n) return n;
  }
  const territorios = detectarTerritorios(terr, limpio, q);
  const per = detectarPeriodo(q);
  const ranking = detectarRanking(q);
  const serie = detectarSerie(q);
  const resto = sinTerritorios(q, territorios).replace(/\b(20\d{2}|19\d{2})\b/g, " ");

  // «cuantos BEV hay», «cuantos autos hibridos circulan»: el INE no separa el parque por tecnologia; se dice y se muestran las ventas de esa tecnologia (armarParquePorTecnologia)
  const famTec = !ctx.forzar && !territorios.length && !ranking ? familiaDeLaFrase(q) : null;
  if (famTec && esTecnologia(famTec) && esPreguntaDeParque(q)) {
    const p = armarParquePorTecnologia(ctx.cat, famTec);
    if (p) return p;
  }

  // indicador
  let candidatos = puntuarIndicadores(cat, resto, raizEs, true);
  if (ctx.forzar) {
    const f = cat.indicadores.find((i) => i.id === ctx.forzar);
    if (f) candidatos = [{ i: f, s: 100 }];
  }
  const o = cat.indicadores.find((i) => i.id === "operadores_carga");
  const op = !ctx.forzar && o ? await entidadNoTerritorial(env, o, q, "operador") : null;
  // un operador nombrado («Copec», «Esmax») manda; si su nombre tambien es una marca de autos («Tesla»), solo si se habla de carga
  if (op && (!/tesla|byd/.test(norm(op.entidad)) || /\b(cargador|cargadores|conector|conectores|estacion|estaciones|operador|operadores|carga|punto|puntos|red|supercargador\w*|electrolinera\w*)\b/.test(q))) {
    const ya = candidatos.find((c) => c.i.id === o.id);
    if (ya) ya.s += 10; else candidatos.push({ i: o, s: Math.max(11, (candidatos[0] ? candidatos[0].s : 0) + 2) });
  } else if (op && !candidatos.some((c) => c.i.id === o.id)) candidatos.push({ i: o, s: 3 });
  // una marca de autos nombrada junto a una pregunta de ventas («ventas de Tesla», «cuantos BYD se vendieron»): manda el ranking de marcas. Si la frase nombra un modelo del
  // padron («ventas del Dolphin Mini») la marca no es la pregunta (la marca Mini no es el Dolphin Mini)
  let marcaNombrada = false;
  const vm = !ctx.forzar ? cat.indicadores.find((i) => i.id === "ventas_marca") : null;
  if (vm && !territorios.length && (intencionesDe(q).ventas || pideLoMasVendido(q)) && await entidadNoTerritorial(env, vm, q, "marca") && !(await nombraUnModelo(env, q))) {
    marcaNombrada = true;
    if (!candidatos.some((c) => c.i.id === vm.id)) candidatos.push({ i: vm, s: 6 });
  }
  if (!ctx.forzar) candidatos = filtrarPorIntencion(ajustarPuntajes(candidatos, q, { periodo: per.periodo, anterior: per.anterior, mes: per.mes, ranking, serie, cat, territorios, marcaNombrada, proy }), q, ranking);
  else candidatos.sort((a, b) => b.s - a.s);
  candidatos = candidatos.filter((c) => c.s > 0);
  let ind = candidatos.length ? candidatos[0].i : null;
  let heredado = false;

  // seguimiento: «¿y en Ñuble?», «¿y en 2024?», «¿y los publicos?»
  const previo = ctx.previo && cat.indicadores.find((i) => i.id === ctx.previo.indicador);
  const eliptica = Boolean(previo) && /^(y|e|pero|ahora|tambien|entonces)\b/.test(q);   // «y los publicos?»: continua la pregunta anterior si no trae un tema propio claro
  if (!ind || candidatos[0].s < 4 || (eliptica && candidatos[0].s < 12)) {
    const pista = territorios.length || contiene(q, "chile") || per.periodo || per.mes || per.anterior || ranking || serie || (previo && detectarMedida(q, previo));
    if (previo && pista) { ind = previo; heredado = true; candidatos = [{ i: previo, s: 50 }]; }
  }
  // la pregunta era de vehiculos y no se pudieron leer sus datos: mejor decirlo que contestar otra cosa con un indicador de poco puntaje
  if (falloVehiculos && pistaVehiculos && (!ind || candidatos[0].s < 12)) return { tipo: "error_vehiculos" };
  // los indicadores no tienen nada claro: puede ser el nombre de un modelo o de una marca («Dolphin Mini», «Kia»). Si la frase dice «ventas» y lo que gana es un indicador de ventas, es una pregunta de
  // ventas (a la que se avisa que no hay por modelo) y no la ficha del modelo: el piso baja a 8 (al agregar indicadores cambian los pesos de la busqueda y «ventas del Dolphin Mini» bajaba de 12)
  const piso = intencionesDe(q).ventas && ind && CLASE[ind.id] === "ventas" ? 8 : 12;
  if (!ctx.forzar && !intentoVehiculos && !heredado && (!ind || candidatos[0].s < piso)) {
    const v = await probarVehiculos({ previo: ctx.previo, sinIndicios: true });
    if (v) return v;
  }
  // palabras que tambien se dicen de leyes en una pregunta por una cifra («cuantos incentivos hay»): solo si los indicadores no tenian nada claro y la norma calza bien
  if (!ctx.forzar && !pistas.fuerte && pistas.debil && !probadoDebil && !heredado && (!ind || candidatos[0].s < 12)) {
    probadoDebil = true;
    const n = await probarNormativa({ debil: true });
    if (n) return n;
  }
  const puntajes = candidatos.slice(0, 6).map((c) => [c.i.id, Math.round(c.s * 10) / 10]);
  if (!ind || (candidatos[0].s < 4 && !heredado)) {
    // ultimo recurso antes de decir que no hay dato: quizas la frase nombra una norma («restriccion vehicular», «NDC»)
    // (una comuna o region sola, como «Temuco», no se confunde con el plan de descontaminacion que lleva su nombre: ahi se pregunta que quiere saber)
    if (!ctx.forzar && !pistas.fuerte && !probadoDebil && !territorios.length) {
      const n = await probarNormativa({ debil: true, estricto: true });
      if (n) return n;
    }
    return { tipo: "sin_dato", territorios: territorios.map((t) => t.nombre), puntajes, falloVehiculos };
  }

  // ambiguedad entre indicadores no emparentados
  const alternativas = candidatos.filter((c) => c.i.id !== ind.id && c.s >= candidatos[0].s * 0.85 && !relacionados(ind, c.i)).slice(0, 3).map((c) => c.i);
  if (alternativas.length && !ctx.forzar && !heredado) {
    return { tipo: "aclaracion", opciones: [ind, ...alternativas].map((i) => ({ id: i.id, nombre: i.nombre })), puntajes };
  }
  const parecidos = heredado ? [] : candidatos.filter((c) => c.i.id !== ind.id && c.s >= candidatos[0].s * 0.6).slice(0, 2).map((c) => ({ id: c.i.id, nombre: c.i.nombre }));

  const e = { q, territorios, per, ranking, serie, heredado, previo: ctx.previo, anios: detectarAnios(q), meses: detectarMeses(q) };
  const { consultas, notas, medida, periodo } = await armar(env, cat, ind, e);
  for (const c of CALIFICADORES) if (c.rx.test(q) && !(c.sin && c.sin.test(q)) && (!c.ind || c.ind.includes(ind.id)) && !(c.excepto && c.excepto.includes(ind.id))) notas.push(c.texto);
  // ventas de un modelo concreto («ventas del Dolphin Mini»): no hay ventas por modelo salvo los 15 mas vendidos del ultimo mes; se avisa en vez de mostrar el total como si respondiera
  if (!heredado && ["ventas_enchufables_mensual", "ventas_electrificados_anual"].includes(ind.id) && intencionesDe(q).ventas && !notas.includes(NOTA_VENTAS_DE_UN_MODELO) && await nombraUnModelo(env, q)) notas.push(NOTA_VENTAS_DE_UN_MODELO);

  const interp = {
    tipo: "consulta", indicador: ind.id, consultas, notas, heredado, parecidos, puntajes,
    resumen: { indicador: ind.nombre, territorios: territorios.map((t) => t.nombre), periodo: [...new Set(consultas.map((c) => c.periodo).filter(Boolean))].join(" y ") || periodo || null, ranking: Boolean(ranking), serie: serie || null, medida: medida || null },
  };
  return separarHibridos(interp, q, ind, medida, heredado, ctx.previo);
}

const PAGINAS_DERIVACION = PAGINAS;
return { limpiarPregunta, detectarSocial, pideUbicacionDeCargadores, PROYECCIONES, PREGUNTAS_DE_PROYECCIONES, proyeccionAplicable, fueraDeAlcance, esComparacionDeCostos, detectarRanking, detectarSerie, esPreguntaDeCambio, detectarPeriodo, detectarMeses, resolverPeriodo, detectarMedida, numerosDeRegion, detectarTerritorios, unoDelMismoNombre, pideFicha, armarFicha, esPreguntaDeParque, armarParquePorTecnologia, pideLoMasVendido, intencionesDe, detectarAnios, interpretar, PAGINAS_DERIVACION, raizEs };
})();
__mod["agente_web/src/ojo_clave.js"] = (function () {
// Los «Ojo» clave (2026-10-25, decision del usuario: «dejar 3 o 4 avisos «Ojo» clave» → «ok»). El asistente no muestra las advertencias del catalogo (decision del 2026-10-19); estas pocas, las que mas
// confunden porque dos cifras que usan la misma palabra miden cosas distintas, salen como una linea «Ojo» junto a la cifra. Cuatro temas: el total de electrificados no es la cantidad de autos
// electricos; la red de carga en vivo no es lo declarado a la SEC; el porcentaje renovable de la generacion no es el de la capacidad instalada; las importaciones no son ventas.
// Cada texto sale de una advertencia del catalogo (`fuente`: el comienzo de esa advertencia; lo comprueba ojo_clave.test.mjs, asi que si el catalogo la cambia o la quita la prueba avisa), escrita sin los
// identificadores internos del catalogo. `medidas`: solo sale si la respuesta trae alguna de esas cifras. Aqui no se calcula nada ni va ninguna cifra.
const OJO_CLAVE = {
  ventas_electrificados_anual: {
    fuente: ["El total de electrificados NO es la cantidad de autos eléctricos"], medidas: ["total_electrificados"],
    texto: "El total de «electrificados» no es la cantidad de autos eléctricos: incluye híbridos no enchufables y microhíbridos, que no se cargan de la red. Los que se enchufan son los eléctricos a batería (BEV) y los híbridos enchufables (PHEV), más los buses y camiones eléctricos.",
  },
  red_carga_viva: {
    fuente: ["No es el registro declarado a la SEC", "Estaciones, cargadores y conectores son conteos distintos"],
    texto: "La red de carga en vivo no es el registro declarado a la SEC: son universos distintos y sus cifras no coinciden. Además, estaciones, cargadores y conectores son conteos distintos de la misma red: no son intercambiables.",
  },
  registro_sec_carga: {
    fuente: ["No es la red en vivo"],
    texto: "Lo declarado a la SEC no es la red de carga en vivo: es el registro acumulado ante el regulador y sus cifras no coinciden con las de la red en vivo.",
  },
  generacion_electrica: {
    fuente: ["El porcentaje renovable de la generación NO es el de la capacidad instalada"], medidas: ["pct_renovable", "pct_renovable_ultimo_dia"],
    texto: "El porcentaje renovable de la generación (la energía efectivamente generada) no es el de la capacidad instalada (la potencia): miden cosas distintas.",
  },
  capacidad_sen: {
    fuente: ["El porcentaje renovable de la capacidad (potencia instalada) no es el de la generación"], medidas: ["pct_renovable_capacidad"],
    texto: "El porcentaje renovable de la capacidad instalada (la potencia) no es el de la generación (la energía efectivamente generada): miden cosas distintas.",
  },
  importaciones_electrificados: {
    fuente: ["Las importaciones no son ventas"],
    texto: "Las importaciones no son ventas: un vehículo importado en un mes puede venderse meses después.",
  },
  pesados_importacion: {
    fuente: ["El parque, las ventas y la importación miden cosas distintas"],
    texto: "El parque, las ventas y la importación miden cosas distintas y no se suman: el parque es lo que circula, las ventas lo que se vende en el año y la importación lo que entra al país.",
  },
};

// El texto del «Ojo» clave de un indicador para esta respuesta, o null si no corresponde (otro indicador, o no trae la cifra que lo confunde).
function ojoClave(indicadorId, r) {
  const o = OJO_CLAVE[indicadorId];
  if (!o) return null;
  if (o.medidas && !r.filas.some((f) => o.medidas.some((id) => f.valores[id] !== undefined && f.valores[id] !== null))) return null;
  return o.texto;
}
return { OJO_CLAVE, ojoClave };
})();
__mod["agente_web/src/dialogo.js"] = (function () {
// Dialogo: recibe una pregunta, la interpreta (nlu.js), consulta el conector (consulta.js) y arma la respuesta (respuesta.js).
// No toca el DOM: devuelve datos que el widget dibuja. Cada respuesta con cifras se comprueba antes de mostrarse.
const { urlPublica } = __req("servidor/src/config.js");
const { ErrorDatos, obtenerCatalogo, obtenerParte, obtenerTerritorios } = __req("agente_web/src/datos_navegador.js");
const { ErrorConsulta, consultar, redactar, vTxt } = __req("servidor/src/consulta.js");
const { norm } = __req("servidor/src/util.js");
const { ErrorVehiculos } = __req("agente_web/src/vehiculos.js");
const { bloquePaginasTco } = __req("agente_web/src/bloques.js");
const { ErrorNormativa } = __req("agente_web/src/normativa.js");
const { ejecutarVehiculo } = __req("agente_web/src/dialogo_veh.js");
const { bloqueDePagina, bloqueDePaginasPara, ejecutarAccionNorma, ejecutarNorma } = __req("agente_web/src/dialogo_norm.js");
const { entreDosMeses, mesAnterior, resumenDe12Meses, textoDeDiferencia, textoDeVariacion, variacionesMensuales } = __req("agente_web/src/calculos.js");
const { FAMILIAS, INDICADORES_MENSUALES_DE_VENTAS, familiaDeLaRespuesta } = __req("agente_web/src/familias_ventas.js");
const { interpretar, limpiarPregunta } = __req("agente_web/src/nlu.js");
const { ojoClave } = __req("agente_web/src/ojo_clave.js");
const { bloquesDeRespaldo, bloquesDeResultado, cifrasSinRespaldo } = __req("agente_web/src/respuesta.js");

// Las preguntas armadas (estos ejemplos, los botones de «También puedes preguntar» y las sugerencias) no nombran marcas ni modelos (decision del usuario, 2026-10-22): las que necesitan un
// vehiculo piden «la marca o el modelo» y lo escribe la persona. Lo vigila preguntas_armadas.test.mjs.
const EJEMPLOS = [
  "¿Cuántos cargadores hay en el Biobío?",
  "Revisa la autonomía de los vehículos",
  "Revisa el costo de tener un vehículo",
  "Las 5 regiones con más autos eléctricos",
  "¿Cuánto cuesta la bencina de 93 en Concepción?",
  "¿Qué seguros cubren la batería de un auto eléctrico?",
  "¿Qué porcentaje de la electricidad es renovable?",
  "¿Cuánta gente está sin luz ahora?",
  "¿Qué normas regulan los cargadores?",
];

const TEMAS = {
  carga: ["Infraestructura de carga", "cuántos cargadores hay en una región, quién los opera, qué tan concentrada está la red; y los centros de carga del transporte público y su proyección"],
  vehiculos: ["Vehículos", "ventas de autos eléctricos (también por marca y los modelos más vendidos), vehículos en circulación y su proyección, importaciones, camiones y buses (con sus ventas por mes); y por modelo: autonomía, precio, ficha de rescate, seguros y costo de tener (TCO)"],
  precios: ["Precios", "bencinas de 93, 95 y 97, diésel y precio de la carga por kWh"],
  energia: ["Energía", "porcentaje renovable de la generación, capacidad instalada y los escenarios de la PELP"],
  cortes: ["Cortes de luz", "clientes sin luz ahora y el historial de cortes"],
  territorio: ["Territorio", "población de regiones y comunas (Censo 2024) y su proyección"],
};
// Tema que no sale del catalogo de indicadores: las leyes y normas del sector (ia_norm_*.json).
const TEMA_NORMATIVA = ["Leyes y normas", "qué dicen las leyes, decretos y normas de electromovilidad y energía, las metas oficiales, los vacíos legales y los proyectos de ley; y a qué página del sitio ir para profundizar"];

// Preguntas para seguir despues de una respuesta, por indicador: [pregunta, clase]. Las entiende el propio asistente (lo comprueba la prueba del corpus).
// No se repite la que se acaba de hacer ni una de la misma clase (despues de un ranking no se sugiere otro ranking).
const SEGUIMIENTOS = {
  red_carga_viva: [["Las 5 regiones con más cargadores", "ranking"], ["¿Quién tiene más cargadores?", "ranking"], ["¿Cuántos cargadores hay en Ñuble?", "dato"]],
  registro_sec_carga: [["Las 5 comunas con más cargadores", "ranking"], ["¿Cuántos cargadores hay en Las Condes?", "dato"]],
  estado_conectores_ahora: [["¿Cuántos cargadores hay en el Biobío?", "dato"]],
  operadores_carga: [["Cargadores públicos por región", "dato"]],
  concentracion_carga: [["¿Quién tiene más cargadores?", "ranking"], ["¿Qué tan concentrada está la carga en Aysén?", "dato"]],
  ventas_enchufables_mensual: [["Evolución de las ventas de autos eléctricos", "serie"], ["¿Cuántos autos eléctricos se vendieron en 2025?", "dato"]],
  ventas_electrificados_anual: [["Evolución de las ventas de autos eléctricos", "serie"], ["¿Cuántos autos eléctricos se vendieron en 2025?", "dato"]],
  ventas_marca: [["Los 5 modelos más vendidos", "ranking"], ["Revisa las ventas de una marca", "dato"], ["Las 5 marcas con más ventas", "ranking"]],
  ventas_modelo_mes: [["Las 5 marcas con más ventas", "ranking"], ["Revisa las ventas de una marca", "dato"]],
  parque_ev_ine: [["Las 5 regiones con más autos eléctricos", "ranking"], ["Las 5 comunas con más autos eléctricos", "ranking"], ["¿Cuántos autos eléctricos hay en Concepción?", "dato"]],
  importaciones_electrificados: [["¿Cuántos buses eléctricos se importaron?", "dato"]],
  pesados_parque: [["¿Cuántos buses eléctricos hay?", "dato"], ["¿Cuántos camiones eléctricos hay?", "dato"]],
  pesados_importacion: [["Importación de camiones", "dato"]],
  precio_bencina93: [["Tendencia del precio de la bencina", "serie"], ["Las 5 comunas con la bencina más cara", "ranking"], ["¿Cuánto cuesta la bencina de 93 en Concepción?", "dato"]],
  precio_combustibles: [["¿Cuánto cuesta el diésel en Concepción?", "dato"], ["Las 5 comunas con el diésel más caro", "ranking"], ["¿Cuánto cuesta la bencina de 95 en Temuco?", "dato"]],
  precio_kwh_carga: [["¿Es más barato cargar un auto eléctrico que cargar bencina?", "dato"]],
  generacion_electrica: [["¿Cuánta energía solar se genera?", "dato"]],
  capacidad_sen: [["Capacidad de almacenamiento de baterías", "dato"]],
  cortes_en_vivo: [["¿En qué región hay más cortes de luz?", "ranking"], ["¿Cuánta gente está sin luz ahora?", "dato"]],
  cortes_historico: [["Comunas con más cortes de luz en el año", "ranking"], ["¿Cuántas horas sin luz ha tenido Temuco?", "dato"]],
  poblacion_censo2024: [["Las 10 comunas con más habitantes", "ranking"], ["Edad promedio en Chile", "dato"]],
  ventas_buses_mensual: [["¿Cuántos buses eléctricos hay?", "dato"], ["¿Cuántos buses eléctricos se importaron?", "dato"]],
  ventas_camiones_mensual: [["¿Cuántos camiones eléctricos hay?", "dato"], ["¿Cuántos camiones eléctricos se importaron?", "dato"]],
  proyeccion_parque: [["Las 5 regiones con más autos eléctricos", "ranking"], ["Revisa la población proyectada", "dato"]],
  proyeccion_poblacion: [["Las 10 comunas con más habitantes", "ranking"], ["Revisa la proyección del parque de vehículos", "dato"]],
  proyeccion_pelp: [["Capacidad de almacenamiento de baterías", "dato"], ["¿Qué porcentaje de la electricidad es renovable?", "dato"]],
  proyeccion_transporte_publico: [["¿Cuántos buses eléctricos hay?", "dato"], ["Revisa los escenarios de la PELP", "dato"]],
};

function sugerirSiguientes(indicador, resumen, original) {
  const ya = norm(original || "");
  return (SEGUIMIENTOS[indicador] || [])
    .filter(([q, clase]) => norm(q) !== ya && !(resumen && resumen.ranking && clase === "ranking") && !(resumen && resumen.serie && clase === "serie"))
    .slice(0, 2)
    .map(([q]) => ({ etiqueta: q, accion: { pregunta: q } }));
}

// Lo que la ficha de un territorio no pudo mostrar, en palabras («la población y las horas sin luz»).
const PIEZA_DE_FICHA = { poblacion_censo2024: "la población", parque_ev_ine: "los autos eléctricos", registro_sec_carga: "los cargadores", red_carga_viva: "los cargadores", precio_bencina93: "el precio de la bencina", cortes_historico: "las horas sin luz" };
function listaDeFaltantes(ids) {
  const t = [...new Set(ids.map((id) => PIEZA_DE_FICHA[id] || id))];
  return t.length === 1 ? t[0] : t.slice(0, -1).join(", ") + " ni " + t[t.length - 1];
}

const NOMBRE_MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const mesTexto = (ym) => `${NOMBRE_MES[Number(ym.slice(5, 7)) - 1]} de ${ym.slice(0, 4)}`;
const minuscula = (t) => t.charAt(0).toLowerCase() + t.slice(1);
const texto = (t) => ({ tipo: "texto", verificar: false, texto: t });

// ORDEN POR FRESCURA (2026-10-24, pedido del usuario: «cuando se pregunte algo, cualquier cosa, siempre mostrar primero los datos mas actualizados»; «¿cuantos camiones electricos hay? que INE
// aparezca al final, en caso de ser necesario, ya que el usuario quiere saber lo actualizado, las ventas, etc.»). El parque del INE llega a 2024 y las ventas, al ultimo mes publicado: en las
// preguntas de «cuantos hay» las ventas van primero y el parque del INE (con sus notas y su proyeccion) al final. Solo cuando la pregunta es el conteo del parque de hoy: con un periodo, una serie,
// un ranking, un territorio o un porcentaje, la pregunta es de esa cifra y manda su cifra.
const corteDe = (r) => r.consulta.periodos[r.consulta.periodos.length - 1];
const pideConteo = (consultas, medidas) => consultas.every((c) => !c.periodo && !c.ultimos && !c.top && (!c.medida || medidas.includes(c.medida)));
// los autos eléctricos en general: el INE junta todas las tecnologias, y lo mas reciente de los autos son los enchufables (BEV + PHEV/PEREV) por mes; el total de electrificados anual solo existe para el año en curso
const AUTOS_ENCHUFABLES = { medida: "enchufables", titulo: "Ventas mensuales de autos eléctricos enchufables (BEV + PHEV/PEREV)", sinAnual: true, descripcion: "autos eléctricos enchufables (BEV + PHEV/PEREV)" };
const notaDeOrden = ({ clave, descripcion, ultimo, corte, proyeccion }) => ({
  tipo: "nota", verificar: false,
  texto: `Lo más reciente que publica el sitio de ${descripcion || FAMILIAS[clave].etiqueta} son sus ventas, hasta ${mesTexto(ultimo)}: van primero. El parque en circulación lo publica el INE y llega a ${corte}: va al final${proyeccion ? ", con su proyección" : ""}.`,
});
const opcionesEjemplos = () => EJEMPLOS.map((e) => ({ etiqueta: e, accion: { pregunta: e } }));

// Si no se pueden leer los archivos de leyes y normas se dice, con un enlace a la pagina del sitio donde estan.
const errorNormativa = (env) => ({
  tipo: "error", opciones: [],
  bloques: [texto("No pude leer los datos de leyes y normas en este momento. Intenta de nuevo en unos minutos, o míralos directamente en el sitio:"), { tipo: "enlace", verificar: false, texto: "Metas y marco legal", url: `${urlPublica(env)}/normativa.html` }],
});

// El «Ojo» clave del indicador (ojo_clave.js), si corresponde: se suma a la linea «Ojo» de la propia consulta, o la abre si no tenia. Se llama despues de comprobar las cifras (no lleva ninguna).
function agregarOjoClave(bloques, indicadorId, r) {
  const texto = ojoClave(indicadorId, r);
  if (!texto) return;
  const avisos = bloques.find((b) => b.tipo === "avisos" && !b.calculado);
  if (avisos) avisos.items = [...avisos.items, texto];
  else bloques.push({ tipo: "avisos", verificar: false, items: [texto] });
}

// Une varios resultados de un mismo indicador (comparar territorios) en uno solo para mostrarlos en una tabla.
function combinar(rs) {
  if (rs.length === 1) return rs[0];
  const m = JSON.parse(JSON.stringify(rs[0]));
  const medidas = new Map(m.medidas.map((x) => [x.id, x]));
  for (const r of rs.slice(1)) {
    m.filas.push(...r.filas);
    for (const x of r.medidas) if (!medidas.has(x.id)) { medidas.set(x.id, x); m.medidas.push(x); }
    for (const a of r.avisos) if (!m.avisos.includes(a)) m.avisos.push(a);
    for (const t of r.tambien_publicado || []) {
      m.tambien_publicado = m.tambien_publicado || [];
      if (!m.tambien_publicado.some((u) => u.entidad === t.entidad && u.indicador === t.indicador)) m.tambien_publicado.push(t);
    }
    for (const p of r.consulta.periodos) if (!m.consulta.periodos.includes(p)) m.consulta.periodos.push(p);
    m.consulta.entidades_resueltas.push(...r.consulta.entidades_resueltas);
  }
  return m;
}

function crearDialogo(env) {
  const estado = { previo: null, ultima: null };

  async function datosBase() {
    const { cat } = await obtenerCatalogo(env);
    const terr = await obtenerTerritorios(env);
    return { cat, terr };
  }

  // Ejecuta las consultas de un indicador (con un reintento si el conector pide acotar) y devuelve resultados y errores.
  async function consultarIndicador(ind, consultas) {
    const resultados = [];
    const errores = [];
    const notas = [];
    for (const c of consultas) {
      let args = { ...c, indicador: ind.id };
      for (let intento = 0; intento < 2; intento++) {
        try {
          resultados.push(await consultar(env, args));
          break;
        } catch (e) {
          if (!(e instanceof ErrorConsulta)) throw e;
          const msg = String(e.message || "");
          const otros = ind.niveles.filter((n) => n !== "nacional");
          if (intento === 0 && (/Indique «entidad» o «nivel»/.test(msg) || /devolvería/.test(msg)) && otros.length) {
            args = { indicador: ind.id, ...(c.periodo ? { periodo: c.periodo } : {}), ...(c.medida ? { medida: c.medida } : {}), top: 5, orden: "mayor", nivel: ind.niveles.includes("region") ? "region" : otros[0] };
            continue;
          }
          if (intento === 0 && c.medida && /no tiene valores para esta consulta/.test(msg)) {
            // la medida pedida no existe para este territorio o nivel: se muestra lo que si hay y se dice
            const m = ind.medidas.find((x) => x.id === c.medida);
            notas.push(`No tengo «${m ? m.nombre : c.medida}» para esta consulta; te muestro lo que sí hay.`);
            const { medida, ...sinMedida } = c;
            args = { ...sinMedida, indicador: ind.id };
            continue;
          }
          // red de seguridad: una medida que el indicador no tiene (llego por otro camino que armar() de nlu.js): se muestra lo que si hay, en vez de rendirse
          const medidaInexistente = /^La medida «([a-z0-9_]+)» no existe en ([a-z0-9_]+)\./.exec(msg);
          if (intento === 0 && medidaInexistente && c.medida === medidaInexistente[1]) {
            notas.push(`No tengo esa medida en «${ind.nombre}»; te muestro lo que sí hay.`);
            const { medida, ...sinMedida } = c;
            args = { ...sinMedida, indicador: ind.id };
            continue;
          }
          // ranking de una medida que ese nivel no publica («comunas con mas viviendas»): el conector dice cuales si hay; se usa la primera
          const sinMedidaEnNivel = /^No hay datos de «([a-z0-9_]+)» para el período [^ ]+ en el nivel (\w+)\. Medidas con datos en este nivel: ([a-z0-9_, ]+)\./.exec(msg);
          if (intento === 0 && sinMedidaEnNivel && c.medida === sinMedidaEnNivel[1]) {
            const alternativa = sinMedidaEnNivel[3].split(",").map((s) => s.trim()).filter(Boolean)[0];
            const pedida = ind.medidas.find((x) => x.id === c.medida);
            const nueva = ind.medidas.find((x) => x.id === alternativa);
            if (nueva) {
              notas.push(`No tengo «${pedida ? pedida.nombre : c.medida}» por ${sinMedidaEnNivel[2]}; te muestro «${nueva.nombre}».`);
              const { medida, ...sinMedida } = c;
              args = { ...sinMedida, indicador: ind.id, ...(nueva.id !== ind.medida_principal ? { medida: nueva.id } : {}) };
              continue;
            }
          }
          errores.push({ e, c });
          break;
        }
      }
    }
    return { resultados, errores, notas };
  }

  // Junto al parque real del INE (llega a 2024) se muestra la proyeccion propia del año siguiente que publica el sitio (indicador proyeccion_parque), si la hay para ese pais o esa region: pedido
  // del usuario, 2026-10-23. No se calcula nada: son las filas publicadas, con su nota («Ojo»). Un ranking, un año anterior o la ficha de un territorio no la llevan. Si algo no cuadra (una cifra
  // sin respaldo, un indicador que falta), simplemente no se agrega.
  // CORREGIDO el 2026-10-24 (el usuario, antes de publicar: «no calza» 134 vehiculos de Talca en 2024 y 7.063 del Maule en 2025): para una COMUNA ya no se muestra la proyeccion de su region, porque
  // son otro nivel (una comuna de registro frente a toda la region) y la cifra de la region ni siquiera es del tamaño de lo que circula (el Maule trae 3.482 en el INE de 2024, de los que unos 2.750
  // son flotas inscritas en Colbun, Pelarco y Vichuquen). En su lugar se dice que el sitio no proyecta por comuna y, con `info.regionesDeComunas`, se ofrece pedir la de la region. Y si la cifra del INE
  // de la que parte una proyeccion lleva la advertencia de inscripciones atipicas de flotas, la proyeccion lo dice (hereda la sobrestimacion).
  async function bloquesDeLaProyeccion(cat, ind, r, info = {}) {
    const proy = cat.indicadores.find((i) => i.id === "proyeccion_parque");
    if (!proy || /^ranking de los /.test(r.consulta.criterio || "")) return [];
    const ultimoReal = Number(((ind.periodo_defecto || {}).nacional || "").slice(0, 4));
    // contrato nuevo del modulo (#23, 2026-10-24): las proyecciones regionales ya son las del parque AJUSTADO (sin las inscripciones atipicas de flotas, que van como una linea aparte en el total del pais);
    // el indicador lo dice en sus propias notas y la proyeccion ya no hereda la sobrestimacion de la cifra del INE (la medida de la flota delata el contrato nuevo)
    const ajustada = proy.medidas.some((m) => m.id === "flota_atipicas_proyectada");
    const terr = await obtenerTerritorios(env);
    const objetivos = new Map();           // codigo -> { args }
    const regionesDeComunas = [];          // las regiones de las comunas que se muestran: sus proyecciones NO se muestran (otro nivel), se ofrece pedirlas
    for (const f of r.filas) {
      if (!["nacional", "region", "comuna"].includes(f.nivel) || f.periodo !== (ind.periodo_defecto || {})[f.nivel]) continue;   // solo si se muestra el ultimo año real
      if (f.nivel === "nacional") objetivos.set("CL", { args: { entidad: "Chile" } });
      else if (f.nivel === "region") objetivos.set(f.codigo, { args: { entidad: f.codigo, nivel: "region" } });
      else {
        const c = terr.comunas.find((x) => x.codigo === f.codigo);
        if (c && c.region && !regionesDeComunas.includes(c.region)) regionesDeComunas.push(c.region);
      }
    }
    info.regionesDeComunas = regionesDeComunas;
    const tarjetas = [];
    const avisos = [];
    for (const o of [...objetivos.values()].slice(0, 3)) {
      let rp;
      try { rp = await consultar(env, { indicador: "proyeccion_parque", ...o.args }); } catch (e) {
        if (e instanceof ErrorConsulta) continue;
        throw e;
      }
      const f = rp.filas[0];
      if (!f || !(Number(f.periodo) > ultimoReal)) continue;                    // si el INE ya publico ese año, no hay nada que proyectar
      const med = new Map(rp.medidas.map((m) => [m.id, m]));
      // en las regiones, si el modulo la trae, primero la base AJUSTADA de la que parte la proyeccion (la cifra del INE sin las inscripciones atipicas de flotas): asi la proyeccion se lee contra su propia base
      const ids = ["parque_electrico_base_ajustada", "parque_electrico_proyectado", "parque_electrico_proyectado_bajo", "parque_electrico_proyectado_alto"].filter((id) => f.valores[id] !== undefined);
      if (!ids.length) continue;
      const tarjeta = {
        tipo: "cifras", verificar: true, titulo: `Proyección propia de Energías Futuro al ${f.periodo}`, subtitulo: `${f.nombre} · ${f.periodo} (proyección)`,
        filas: ids.map((id) => [med.get(id).nombre, vTxt(f.valores[id], med.get(id))]),
      };
      // la proyeccion parte de la cifra del INE de ese pais o region: si esa cifra lleva la advertencia de flotas inscritas en comunas atipicas, la proyeccion la hereda y se dice
      const sobrestima = !ajustada && r.avisos.some((a) => /inscripciones atípicas de flotas/.test(a) && (o.args.entidad === "Chile" ? /^El total nacional/.test(a) : a.startsWith(`${f.nombre} incluye`)));
      const heredada = sobrestima ? [`La proyección de ${f.nombre} parte de esa cifra del INE, que incluye inscripciones atípicas de flotas de empresas: también sobrestima los vehículos que circularán.`] : [];
      const nota = { tipo: "avisos", verificar: true, items: [...rp.avisos, ...heredada] };
      if (cifrasSinRespaldo([tarjeta, nota], rp).length) continue;               // red de seguridad: ninguna cifra sin respaldo
      tarjetas.push(tarjeta);
      for (const a of nota.items) if (!avisos.includes(a)) avisos.push(a);
    }
    const bloques = tarjetas.length ? [...tarjetas, ...(avisos.length ? [{ tipo: "avisos", verificar: true, items: avisos }] : [])] : [];
    if (regionesDeComunas.length) bloques.push({ tipo: "nota", verificar: false, texto: `El sitio no proyecta el parque por comuna, solo para el país y para cada región. Si quieres la proyección de la región ${regionesDeComunas.slice(0, 3).join(", ")}, pídela aparte (y mírala junto a la cifra de toda la región, no a la de una comuna).` });
    return bloques;
  }

  // Cuentas de las ventas mensuales de una familia (buses, camiones, BEV, PHEV, HEV, MHEV, hidrogeno, autos): la SEGUNDA excepcion a la regla 3 (la primera es el TCO), autorizada por el usuario el 2026-10-24:
  // «sumar los 12 meses, mostrar la diferencia de los 12 meses anteriores y porcentajes entre meses» (calculos.js). Junto a la tabla de una serie va la columna «Variación mensual» (cada mes frente al
  // anterior); si es la serie de los ultimos 12 meses, el total de esos 12 meses y su diferencia con los 12 anteriores; si se comparan dos meses, su diferencia y su variacion. Siempre rotuladas como
  // cuenta del asistente: son bloques `calculado` que NO pasan por la comprobacion de cifras (no son cifras publicadas; las publicadas ya se comprobaron antes de agregar nada). Las cifras de partida salen
  // del conector (los ultimos 24 meses de la medida) y deben coincidir con las de la tabla que se muestra; si algo no calza o falta un mes, no se agrega nada. Devuelve los bloques que van despues de la tabla.
  async function calculosDeVentas(ind, medidaId, bloques, r, { resumen12 = false, entreDos = false } = {}) {
    const med = r.medidas.find((m) => m.id === medidaId);
    const tabla = bloques.find((b) => b.tipo === "tabla" && b.columnas.length === 2 && b.columnas[0] === "Período");
    if (!med || (!tabla && !resumen12 && !entreDos)) return [];
    const mostrados = r.filas.filter((f) => f.valores[medidaId] !== undefined).sort((a, b) => (a.periodo < b.periodo ? -1 : 1));
    // los meses con que se calcula: para el resumen de 12 meses, los ultimos 24 (lo que se muestra debe ser lo mismo que se usa); si no, los que se muestran y, para la variacion del primero, el mes
    // anterior a ese (si el sitio no lo publica, ese primer mes queda sin variacion)
    let serie = mostrados.map((f) => ({ periodo: f.periodo, valor: f.valores[medidaId] }));
    try {
      if (resumen12) {
        const larga = await consultar(env, { indicador: ind.id, ultimos: 24, medida: medidaId });
        serie = larga.filas.filter((f) => f.valores[medidaId] !== undefined).map((f) => ({ periodo: f.periodo, valor: f.valores[medidaId] }));
        const deLarga = new Map(serie.map((x) => [x.periodo, x.valor]));
        if (!mostrados.every((f) => deLarga.get(f.periodo) === f.valores[medidaId])) return [];
      } else if (tabla && !entreDos && mostrados.length) {
        const previo = mesAnterior(mostrados[0].periodo);
        const rp = await consultar(env, { indicador: ind.id, periodo: previo, medida: medidaId }).catch((e) => { if (e instanceof ErrorConsulta) return null; throw e; });
        const f0 = rp && rp.filas.find((f) => f.periodo === previo && f.valores[medidaId] !== undefined);
        if (f0) serie = [{ periodo: previo, valor: f0.valores[medidaId] }, ...serie];
      }
    } catch (e) {
      if (e instanceof ErrorConsulta) return [];
      throw e;
    }
    const unidad = vTxt(0, med).slice(1);                      // « unidades» (o nada, si la medida no tiene unidad visible)
    const extra = [];
    let hay = false;
    if (tabla && !entreDos) {
      const v = variacionesMensuales(serie);
      const celdas = tabla.filas.map((fila) => (v.has(fila[0]) ? textoDeVariacion(v.get(fila[0]).decimas, "sin base") : "—"));
      if (celdas.some((c) => c !== "—")) {
        tabla.columnas = [...tabla.columnas, "Variación mensual"];
        tabla.filas = tabla.filas.map((fila, i) => [...fila, celdas[i]]);
        tabla.verificar = false;
        tabla.calculado = true;
        hay = true;
      }
    }
    if (resumen12) {
      const res = resumenDe12Meses(serie);
      if (res) {
        const filas = [[`Últimos 12 meses (${res.actual.desde} a ${res.actual.hasta})`, vTxt(res.actual.total, med)]];
        if (res.anterior) {
          filas.push([`12 meses anteriores (${res.anterior.desde} a ${res.anterior.hasta})`, vTxt(res.anterior.total, med)]);
          filas.push(["Diferencia", textoDeDiferencia(res.diferencia) + unidad]);
          filas.push(["Variación", textoDeVariacion(res.decimas, "sin base (los 12 meses anteriores sumaron 0)")]);
        }
        extra.push({ tipo: "cifras", verificar: false, calculado: true, titulo: res.anterior ? "Últimos 12 meses frente a los 12 anteriores" : "Total de los últimos 12 meses", subtitulo: `${med.nombre} · Chile`, filas });
        hay = true;
      }
    }
    if (entreDos && mostrados.length === 2) {
      const x = entreDosMeses({ periodo: mostrados[0].periodo, valor: mostrados[0].valores[medidaId] }, { periodo: mostrados[1].periodo, valor: mostrados[1].valores[medidaId] });
      if (x) {
        extra.push({ tipo: "cifras", verificar: false, calculado: true, titulo: `Diferencia entre ${x.desde} y ${x.hasta}`, subtitulo: `${med.nombre} · Chile`,
          filas: [["Diferencia", textoDeDiferencia(x.diferencia) + unidad], ["Variación", textoDeVariacion(x.decimas, `sin base (${x.desde} fue 0)`)]] });
        hay = true;
      }
    }
    return extra;
  }

  // Que cuentas corresponden a una respuesta de ventas mensuales (ver calculosDeVentas): la serie de los ultimos 12 meses lleva el resumen de 12 meses; dos meses comparados, su diferencia; una serie o un rango, la
  // columna de variacion. La medida es la que se pidio, o la principal del indicador (en «autos» en general, la serie muestra varias y el resumen es el de los enchufables).
  async function calculosDeLaRespuesta(ind, consultas, r, bloques) {
    if (!consultas.length || consultas.some((c) => c.top || c.nivel || c.entidad)) return [];
    const medidaId = consultas[0].medida || ind.medida_principal;
    if (consultas.some((c) => (c.medida || ind.medida_principal) !== medidaId)) return [];
    const resumen12 = consultas.length === 1 && consultas[0].ultimos === 12;
    const entreDos = consultas.length === 2 && consultas.every((c) => c.periodo) && r.filas.length === 2;
    return calculosDeVentas(ind, medidaId, bloques, r, { resumen12, entreDos });
  }

  // Junto al parque de una clase del INE (buses, camiones; llega a 2024) se muestran sus ventas, que el sitio publica en las paginas «Buses electricos» y «Camiones»: el total de los dos ultimos años
  // (el en curso es parcial y lo dice) y el de cada uno de los ultimos 12 meses (ventas_electrificados_anual y el indicador mensual de la clase). Pedidos del usuario, 2026-10-24: «¿por que muestra el
  // INE y no las ventas mensuales de buses?», «incluir y/o sugerir las ventas del año, las de los ultimos 12 meses y comparaciones entre meses» y «para camiones, bev, phev, hev, mhev, etc.. para todas
  // las variantes de preguntas». Son ventas, no parque, y la nota lo dice; no se suman al parque ni entre si (las cifras son las publicadas; las cuentas de la regla 18 van aparte y rotuladas). Si algo no cuadra (indicador ausente, cifra
  // sin respaldo) esa tabla no se agrega. `info.ultimo` queda con el ultimo mes de las ventas (para las preguntas que se sugieren despues). Los titulos salen de FAMILIAS (familias_ventas.js).
  //   opc (solo «autos», junto al parque del pais): { medida, titulo, sinAnual }: una sola medida mensual (los enchufables, BEV + PHEV/PEREV) y sin la tabla anual, cuyo total de electrificados solo existe para el año en curso
  async function bloquesDeLasVentas(cat, clave, info, opc = {}) {
    const f = FAMILIAS[clave];
    if (!f || !cat.indicadores.some((i) => i.id === f.mensual.indicador)) return [];
    const bloques = [];
    const medidaMensual = opc.medida || f.mensual.medida;
    if (!opc.sinAnual && cat.indicadores.some((i) => i.id === f.anual.indicador)) {
      try {
        const ra = await consultar(env, { indicador: f.anual.indicador, ultimos: 2, ...(f.anual.medida ? { medida: f.anual.medida } : {}) });
        const porAnio = bloquesDeResultado(ra);
        if (porAnio[0] && porAnio[0].titulo) porAnio[0].titulo = f.anual.titulo;
        if (!cifrasSinRespaldo(porAnio, ra).length) bloques.push(...porAnio);
      } catch (e) { if (!(e instanceof ErrorConsulta)) throw e; }
    }
    try {
      const rv = await consultar(env, { indicador: f.mensual.indicador, ultimos: 12, ...(medidaMensual ? { medida: medidaMensual } : {}) });
      const meses = bloquesDeResultado(rv);
      if (meses[0] && meses[0].titulo) meses[0].titulo = opc.titulo || f.mensual.titulo;
      if (!cifrasSinRespaldo(meses, rv).length) {
        bloques.push(...meses);
        const indMensual = cat.indicadores.find((i) => i.id === f.mensual.indicador);
        bloques.push(...await calculosDeVentas(indMensual, medidaMensual || indMensual.medida_principal, meses, rv, { resumen12: true }));
        if (info) info.ultimo = rv.consulta.periodos[rv.consulta.periodos.length - 1];
      }
    } catch (e) { if (!(e instanceof ErrorConsulta)) throw e; }
    return bloques;
  }

  // Preguntas para seguir despues de una respuesta sobre las ventas de una clase o tecnologia (buses, camiones, BEV, PHEV, HEV, MHEV, hidrogeno o autos en general): el año, los ultimos 12 meses, comparar
  // el ultimo mes con el anterior y, segun la clase, sus categorias o sus importaciones. Los meses y el año salen de lo que se acaba de mostrar (`ultimo`, «2026-08»; si la respuesta fue anual, el ultimo mes
  // publicado); no se sugiere comparar con un mes anterior a que el sitio publica el total del mes (desde 2023). Lo que se sugiere lo entiende el propio asistente (lo comprueba ventas_familias.test.mjs).
  //   modo: «mes» (un mes), «serie» (varios meses), «comparado» (dos meses o dos periodos), «anual» (un año) y «parque» (despues del parque de la clase, que ya trae el año y los 12 meses).
  async function siguientesDeVentas(cat, clave, ultimo, modo, original) {
    const f = FAMILIAS[clave];
    const ind = f && cat.indicadores.find((i) => i.id === f.mensual.indicador);
    if (!ind) return null;
    if (!/^\d{4}-\d{2}$/.test(ultimo || "")) ultimo = ((ind.periodo_defecto || {}).nacional || "").slice(0, 7);
    if (!/^\d{4}-\d{2}$/.test(ultimo)) return null;
    const medida = f.mensual.medida || ind.medida_principal;
    let primero = null;
    try {
      const { parte } = await obtenerParte(env, ind, "nacional");
      primero = (parte.filas.find((x) => x.valores[medida] !== undefined) || {}).periodo || null;
    } catch (e) {
      if (!(e instanceof ErrorDatos)) throw e;
    }
    const a = Number(ultimo.slice(0, 4)), m = Number(ultimo.slice(5, 7));
    const previo = m === 1 ? `${a - 1}-12` : `${a}-${String(m - 1).padStart(2, "0")}`;
    const comparar = primero && previo >= primero ? `Compara las ventas de ${f.etiqueta} de ${mesTexto(previo)} y ${mesTexto(ultimo)}` : null;
    const delAnio = `¿Cuántos ${f.etiqueta} se vendieron en ${a}?`;
    const doce = `Ventas de ${f.etiqueta} de los últimos 12 meses`;
    const importa = f.importa ? `¿Cuántos ${f.etiqueta} se importaron?` : null;
    const lista = {
      mes: [comparar, delAnio, doce],
      serie: [delAnio, comparar, f.categorias || importa],
      comparado: [doce, delAnio, f.categorias || importa],
      anual: [doce, comparar, f.categorias || importa],
      parque: [comparar, f.categorias, importa],
    }[modo].filter((p) => p && norm(p) !== norm(original || "")).slice(0, 3);
    return lista.length ? lista.map((p) => ({ etiqueta: p, accion: { pregunta: p } })) : null;
  }

  async function ejecutar(interp, original) {
    const { cat } = await datosBase();
    // las consultas se agrupan por indicador (casi siempre es uno; comparar carga y bencina son dos)
    const grupos = new Map();
    for (const c of interp.consultas) {
      const id = c.indicador || interp.indicador;
      if (!grupos.has(id)) grupos.set(id, []);
      grupos.get(id).push(c);
    }
    const bloques = [];
    const sinRespaldoTodo = [];
    let ventasDe = null;           // { clave, ultimo, modo }: de que clase o tecnologia son las ventas que se acaban de mostrar, para sugerir lo que sigue (siguientesDeVentas)
    let chipsDeProyeccion = [];    // pedir la proyeccion de la region de una comuna (la de una comuna no existe)
    let periodoUnico = null;       // el periodo de una respuesta nacional de una sola consulta: «compara con agosto de 2025» lo usa como el otro lado de la comparacion
    const recientes = [];          // las ventas que van ANTES del parque del INE en «cuantos hay» (orden por frescura, ver arriba)
    let ordenPorFrescura = null;   // { clave, ultimo, corte, proyeccion }: de que ventas son, hasta cuando llegan y hasta cuando llega el parque del INE; para decirlo y para el «entendi»
    let chipsDeOrden = [];         // la sugerencia de comparar meses que sigue a las ventas del pais (la de «autos» no pasa por ventasDe)
    let hubo = false;
    let primerError = null;
    const sinResultado = [];
    const notas = interp.notas.map((n) => ({ tipo: "nota", verificar: false, texto: n }));
    for (const [id, consultas] of grupos) {
      const ind = cat.indicadores.find((i) => i.id === id);
      if (!ind) continue;
      const { resultados, errores, notas: notasGrupo } = await consultarIndicador(ind, consultas);
      for (const n of notasGrupo) notas.push({ tipo: "nota", verificar: false, texto: n });
      if (!resultados.length) { if (!primerError) primerError = { ind, ...errores[0] }; sinResultado.push(id); continue; }
      hubo = true;
      const r = combinar(resultados);
      if (grupos.size === 1 && consultas.length === 1 && !consultas[0].entidad && !consultas[0].top && !consultas[0].ultimos && r.consulta.periodos.length === 1) periodoUnico = r.consulta.periodos[0];
      const delGrupo = bloquesDeResultado(r);
      if (interp.titulos && interp.titulos[id] && delGrupo[0] && delGrupo[0].titulo) delGrupo[0].titulo = interp.titulos[id];
      const sinRespaldo = cifrasSinRespaldo(delGrupo, r);
      if (sinRespaldo.length) {
        // red de seguridad: si alguna cifra no sale del conector, se muestra el texto del propio conector sin reformatear
        sinRespaldoTodo.push(...sinRespaldo);
        bloques.push(...bloquesDeRespaldo(resultados.map((x) => redactar(x)).join("\n\n")));
      } else {
        if (!interp.ficha) agregarOjoClave(delGrupo, id, r);       // los pocos «Ojo» que mas confunden (decision del usuario, 2026-10-25); la ficha de un territorio es un resumen y no los lleva
        bloques.push(...delGrupo);
        // las ventas mensuales de una familia: la variacion de cada mes, el total de 12 meses y la diferencia entre dos meses (excepcion autorizada por el usuario; calculos.js)
        if (INDICADORES_MENSUALES_DE_VENTAS.has(id) && !interp.ficha) bloques.push(...await calculosDeLaRespuesta(ind, consultas, r, delGrupo));
        // el parque real del INE llega a 2024: junto a el, la proyeccion propia del año siguiente que publica el sitio (la ficha de un territorio es un resumen y no la lleva)
        if (id === "parque_ev_ine" && !interp.ficha) {
          const infoProy = {};
          bloques.push(...await bloquesDeLaProyeccion(cat, ind, r, infoProy));
          chipsDeProyeccion = (infoProy.regionesDeComunas || []).slice(0, 2).map((n) => { const q = `Proyección del parque eléctrico de la región ${n}`; return { etiqueta: q, accion: { pregunta: q } }; });
          // «¿cuantos autos electricos hay en Chile?»: el parque del pais llega a 2024 y sus ventas, al ultimo mes publicado: las ventas van primero y el parque del INE, con su proyeccion, al final
          if (pideConteo(consultas, ["parque_electrico"]) && r.filas.length === 1 && r.filas[0].nivel === "nacional") {
            const info = {};
            const deVentas = await bloquesDeLasVentas(cat, "autos", info, AUTOS_ENCHUFABLES);
            if (deVentas.length && info.ultimo && info.ultimo > corteDe(r)) {
              recientes.push(...deVentas);
              ordenPorFrescura = { clave: "autos", descripcion: AUTOS_ENCHUFABLES.descripcion, ultimo: info.ultimo, corte: corteDe(r), proyeccion: true };
              chipsDeOrden = ((await siguientesDeVentas(cat, "autos", info.ultimo, "parque", original)) || []).slice(0, 1);
            }
          }
        }
        // lo mismo con los buses y los camiones: el parque del INE llega a 2024 y sus ventas (paginas «Buses electricos» y «Camiones») llegan al ultimo mes
        if (id === "pesados_parque" && !interp.ficha) {
          const clases = new Set(r.filas.filter((f) => f.nivel === "clase").map((f) => (/\bbus/.test(norm(f.nombre)) ? "buses" : /\b(camion|camiones|tractocamion\w*)\b/.test(norm(f.nombre)) ? "camiones" : null)));
          const clave = clases.size === 1 ? [...clases][0] : null;
          if (clave) {
            const info = {};
            const deVentas = await bloquesDeLasVentas(cat, clave, info);
            if (deVentas.length && info.ultimo) ventasDe = { clave, ultimo: info.ultimo, modo: "parque" };
            // «¿cuantos camiones electricos hay?»: las ventas llegan al ultimo mes y el parque del INE a 2024: las ventas van primero y el INE al final (orden por frescura). Un porcentaje o un periodo, no
            if (deVentas.length && info.ultimo && pideConteo(consultas, ["electricos", "total_pesados"]) && info.ultimo > corteDe(r)) {
              recientes.push(...deVentas);
              ordenPorFrescura = { clave, ultimo: info.ultimo, corte: corteDe(r), proyeccion: false, notasDelIne: true };   // «Te muestro «Camion simple»…» habla de la tarjeta del INE: va con ella
            } else bloques.push(...deVentas);
          }
        }
        // las ventas de una clase o tecnologia: se sugiere el año, los ultimos 12 meses o comparar el ultimo mes con el anterior, segun lo que se acaba de mostrar
        if (interp.familia) {
          if (id === FAMILIAS[interp.familia].mensual.indicador) ventasDe = { clave: interp.familia, ultimo: r.consulta.periodos[r.consulta.periodos.length - 1], modo: interp.modoSiguientes || "parque" };
        } else if (!interp.ficha && grupos.size === 1) {
          const clave = familiaDeLaRespuesta(id, consultas[0].medida);
          if (clave) {
            const periodos = r.consulta.periodos;
            const modo = id === "ventas_electrificados_anual" ? "anual" : resultados.length >= 2 || periodos.length === 2 ? "comparado" : r.filas.length >= 6 ? "serie" : "mes";
            ventasDe = { clave, ultimo: periodos[periodos.length - 1], modo };
          }
        }
      }
    }
    const chipsDeVentas = ventasDe ? await siguientesDeVentas(cat, ventasDe.clave, ventasDe.ultimo, ventasDe.modo, original) : null;
    if (!hubo) {
      const { ind, e, c } = primerError;
      const msg = String(e.message || "");
      const opciones = [];
      const sinPeriodo = c.periodo && /Períodos disponibles/.test(msg);
      if (sinPeriodo) opciones.push({ etiqueta: "Ver el último período disponible", accion: { consulta: { indicador: ind.id, ...(c.entidad ? { entidad: c.entidad } : {}), ...(c.medida ? { medida: c.medida } : {}) } } });
      const alternativas = (e.extra && e.extra.candidatos ? e.extra.candidatos : []).slice(0, 4);
      for (const a of alternativas) opciones.push({ etiqueta: a.nombre, accion: { consulta: { indicador: ind.id, entidad: a.codigo, nivel: a.tipo } } });
      return { tipo: "sin_dato", entendi: null, bloques: [texto(sinPeriodo ? "No tengo datos para ese período. " + msg : "No pude armar esa consulta: " + msg)], opciones };
    }
    // orden por frescura: lo mas reciente (las ventas) primero y, al final, la cifra del INE con las notas que la acompañan (que categoria se muestra, etc.) y su proyeccion
    const final = ordenPorFrescura
      ? [notaDeOrden(ordenPorFrescura), ...(ordenPorFrescura.notasDelIne ? [] : notas), ...recientes, ...(ordenPorFrescura.notasDelIne ? notas : []), ...bloques]
      : [...notas, ...bloques];
    // la ficha de una comuna o region: lo que no hay se dice, y se manda al reporte completo del sitio
    if (interp.ficha) {
      if (sinResultado.length) final.push({ tipo: "nota", verificar: false, texto: `No tengo ${listaDeFaltantes(sinResultado)} de ${interp.ficha.nombre}.` });
      final.push(await bloqueDePagina(env, "reporte-regional.html", "Reporte Regional", "Para ver el dossier completo, abre esta página del sitio"));
    }
    const sinRespaldo = sinRespaldoTodo;
    const rs = interp.resumen;
    const nombreEntendido = ordenPorFrescura ? `Ventas más recientes de ${ordenPorFrescura.descripcion || FAMILIAS[ordenPorFrescura.clave].etiqueta} y su parque en circulación (INE)` : rs.indicador;
    const entendi = `Entendí tu pregunta como: ${nombreEntendido}${rs.territorios.length ? " · " + rs.territorios.join(", ") : ""}${rs.periodo ? " · " + rs.periodo : ""}${rs.ranking ? " · ranking" : ""}${rs.serie ? " · serie" : ""}`;
    const opciones = (interp.parecidos || []).map((p) => ({ etiqueta: "¿Buscabas «" + p.nombre + "»?", accion: { pregunta: original, forzar: p.id } }));
    estado.previo = interp.ficha ? null : { indicador: interp.indicador, medida: interp.consultas[0] && interp.consultas[0].medida ? interp.consultas[0].medida : null, periodo: periodoUnico };
    const siguientes = interp.ficha
      ? [`¿Cuántos cargadores hay en ${interp.ficha.nombre}?`, `¿Cuántos autos eléctricos hay en ${interp.ficha.nombre}?`, `¿Cuántas horas sin luz ha tenido ${interp.ficha.nombre}?`].map((p) => ({ etiqueta: p, accion: { pregunta: p } }))
      : chipsDeVentas || [...chipsDeOrden, ...chipsDeProyeccion, ...sugerirSiguientes(interp.indicador, rs, original)].slice(0, 3);
    return {
      tipo: "respuesta", entendi, bloques: final, opciones, siguientes, verificacion: { ok: sinRespaldo.length === 0, sinRespaldo },
      depuracion: { indicador: interp.indicador, consultas: interp.consultas, notas: interp.notas, puntajes: interp.puntajes },
      _ventasDe: ventasDe, _periodoUnico: periodoUnico,       // para ejecutarPorSeparado (no se dibujan)
    };
  }

  // «ventas de hibridos»: los no enchufables (HEV) y los enchufables (PHEV) por separado (pedido del usuario, 2026-10-24): una respuesta completa para cada uno, una tras otra y cada una con su rotulo. Las
  // notas generales van arriba, una sola vez; las sugerencias son las de «hibridos» (nlu.js los parte en dos consultas con separarHibridos y armarParquePorTecnologia).
  async function ejecutarPorSeparado(interp, original) {
    const { cat } = await datosBase();
    const ROTULOS = { hev_erev: "Híbridos no enchufables (HEV + EREV)", phev_perev: "Híbridos enchufables (PHEV + PEREV)", hev: "Híbridos no enchufables (HEV)", phev: "Híbridos enchufables (PHEV)" };
    const rs = [];
    for (const parte of interp.partes) rs.push(await ejecutar(parte, original));
    const buenas = rs.map((r, i) => ({ r, i })).filter((x) => x.r.tipo === "respuesta");
    if (!buenas.length) return rs[0];
    const bloques = [];
    buenas.forEach(({ r, i }, k) => {
      const notas = r.bloques.filter((b, j) => b.tipo === "nota" && r.bloques.slice(0, j).every((x) => x.tipo === "nota"));       // las notas del comienzo
      const resto = r.bloques.slice(notas.length);
      const m = interp.partes[i].consultas[0].medida;
      bloques.push(...(k === 0 ? [...notas, texto(ROTULOS[m] || m)] : [texto(ROTULOS[m] || m), ...notas]), ...resto);
    });
    // el «Ojo» de las cuentas sale en cada parte: queda uno solo, el ultimo
    const ultimoOjo = bloques.map((b) => (b.tipo === "avisos" && b.calculado ? 1 : 0)).lastIndexOf(1);
    for (let i = bloques.length - 1; i >= 0; i--) if (i !== ultimoOjo && bloques[i].tipo === "avisos" && bloques[i].calculado) bloques.splice(i, 1);
    const primera = buenas[0].r;
    const periodoUnico = buenas.every((x) => x.r._periodoUnico && x.r._periodoUnico === primera._periodoUnico) ? primera._periodoUnico : null;
    estado.previo = { indicador: interp.indicador, medida: null, periodo: periodoUnico, hibridos: true };
    const v = primera._ventasDe;
    const chips = v ? await siguientesDeVentas(cat, "hibridos", v.ultimo, v.modo, original) : null;
    return {
      tipo: "respuesta", entendi: `${primera.entendi} · HEV y PHEV por separado`, bloques, opciones: primera.opciones, siguientes: chips || primera.siguientes,
      verificacion: { ok: buenas.every((x) => x.r.verificacion.ok), sinRespaldo: buenas.flatMap((x) => x.r.verificacion.sinRespaldo) },
      depuracion: { indicador: interp.indicador, consultas: interp.partes.flatMap((p) => p.consultas), notas: interp.notas, puntajes: interp.puntajes },
    };
  }

  // Un pedido abierto («escribe la marca o el modelo», previo.pedirVehiculo) vale solo para la respuesta que sigue: si esa respuesta no lo renueva, se cierra.
  async function preguntar(textoPregunta, opciones = {}) {
    const antes = estado.previo;
    const r = await preguntarInterno(textoPregunta, opciones);
    if (antes && antes.pedirVehiculo && estado.previo === antes) estado.previo = null;
    return r;
  }

  async function preguntarInterno(textoPregunta, { forzar = null, consulta = null, vehiculo = null, norma = null } = {}) {
    // accion directa de un boton sobre una norma (lleva el rotulo de la norma, no un texto): no necesita el catalogo de indicadores
    if (norma) {
      try { return await ejecutarAccionNorma(env, norma, estado); } catch (e) {
        if (e instanceof ErrorNormativa) return errorNormativa(env);
        throw e;
      }
    }
    let base;
    try { base = await datosBase(); } catch (e) {
      if (e instanceof ErrorDatos) return { tipo: "error", bloques: [texto("No pude leer los datos en este momento. Intenta de nuevo en unos minutos.")], opciones: [] };
      throw e;
    }
    const { cat } = base;
    // accion directa de un boton sobre un vehiculo (lleva el indice del modelo, no un texto)
    if (vehiculo) {
      try { return await ejecutarVehiculo(env, { tipo: "vehiculo", ...vehiculo }, textoPregunta || "", estado); } catch (e) {
        if (e instanceof ErrorVehiculos) return { tipo: "error", bloques: [texto("No pude leer los datos de vehículos en este momento. Intenta de nuevo en unos minutos.")], opciones: [] };
        throw e;
      }
    }
    // accion directa de un boton (ya trae la consulta armada)
    if (consulta) {
      const ind = cat.indicadores.find((i) => i.id === consulta.indicador);
      if (!ind) return { tipo: "error", bloques: [texto("No encontré ese indicador.")], opciones: [] };
      return await ejecutar({ indicador: ind.id, consultas: [{ ...consulta, indicador: undefined }], notas: [], parecidos: [], resumen: { indicador: ind.nombre, territorios: consulta.entidad ? [consulta.entidad] : [], periodo: null, ranking: false, serie: null, medida: consulta.medida || null } }, textoPregunta || "");
    }
    const original = limpiarPregunta(textoPregunta);
    let interp;
    try {
      interp = await interpretar(env, original, { ...base, previo: estado.previo, forzar });
    } catch (e) {
      if (e instanceof ErrorDatos) return { tipo: "error", bloques: [texto("No pude leer los datos en este momento. Intenta de nuevo en unos minutos.")], opciones: [] };
      throw e;
    }
    switch (interp.tipo) {
      case "vacia":
        return { tipo: "vacia", bloques: [texto("Escribe tu pregunta, por ejemplo: «¿Cuántos cargadores hay en el Biobío?»")], opciones: opcionesEjemplos().slice(0, 3) };
      case "saludo":
        return { tipo: "saludo", bloques: [texto("¡Hola! Respondo con las cifras que publica Energías Futuro. Prueba con una pregunta:")], opciones: opcionesEjemplos() };
      case "gracias":
        return { tipo: "gracias", bloques: [texto("¡De nada! Si quieres, pregunta otra cosa.")], opciones: opcionesEjemplos().slice(0, 3) };
      case "identidad":
        return { tipo: "identidad", bloques: [texto("Soy el asistente de datos de Energías Futuro. Funciono con reglas simples, sin inteligencia artificial: entiendo preguntas sobre los datos que el sitio ya publicó y te muestro la respuesta. Prueba con una pregunta:")], opciones: opcionesEjemplos() };
      case "ayuda": {
        const porTema = new Map();
        for (const i of cat.indicadores) porTema.set(i.tema, (porTema.get(i.tema) || 0) + 1);
        const items = [...porTema.keys()].filter((t) => TEMAS[t]).map((t) => [TEMAS[t][0], TEMAS[t][1]]);
        items.push(TEMA_NORMATIVA);
        return { tipo: "ayuda", bloques: [texto("Puedo responder con cifras ya publicadas por Energías Futuro. Estos son los temas:"), { tipo: "lista", verificar: false, items }, texto("Las proyecciones que muestro son las que Energías Futuro publica en su sitio, elaboradas según las metas, la historia de los datos y las proyecciones de crecimiento y desarrollo, y siempre las señalo como proyección. No hago pronósticos por mi cuenta ni recomendaciones. Las únicas cuentas que hago son el costo de uso de un vehículo y, en las ventas mensuales, la suma de 12 meses, su diferencia con los 12 meses anteriores y la variación entre meses: siempre las marco como cálculo.")], opciones: opcionesEjemplos() };
      }
      case "fuera_alcance": {
        const bloques = [texto(interp.texto)];
        // lo que el asistente no hace pero la pagina del costo de tener si: se manda a la pestaña que corresponde
        if (interp.paginasTco) bloques.push(bloquePaginasTco(env, interp.paginasTco, interp.tituloPaginas));
        else if (interp.motivo === "tema_de_pagina") {
          // un tema que el sitio muestra en una pagina y el asistente no responde con cifras: la pagina, con el nombre y la descripcion que trae el menu (temas_pagina.js)
          if (interp.paginaSitio) bloques.push(await bloqueDePagina(env, interp.paginaSitio, interp.nombreSitio));
          if (interp.paginaSitio2) bloques.push(await bloqueDePagina(env, interp.paginaSitio2, interp.nombreSitio2, "Y, por región, abre esta otra página del sitio"));
        } else if (interp.pagina) bloques.push({ tipo: "enlace", verificar: false, texto: interp.nombre, url: `${urlPublica(env)}/${interp.pagina}` });
        else if (interp.motivo === "definicion") {
          // «que es el PELP»: no se define, pero quizas el sitio tiene una pagina del tema
          const paginas = await bloqueDePaginasPara(env, original);
          if (paginas) bloques.push(paginas);
        }
        // sobre la meta 2035 lo que si se responde es que metas hay y cuanta fuerza juridica tienen
        const sugeridas = interp.motivo === "meta" ? [{ etiqueta: "¿Es obligatoria la meta 2035?", accion: { pregunta: "¿Es obligatoria la meta 2035?" } }, ...opcionesEjemplos().slice(0, 2)]
          : (interp.motivo === "tema_de_pagina" || interp.motivo === "prediccion") && interp.chips && interp.chips.length ? interp.chips.map((p) => ({ etiqueta: p, accion: { pregunta: p } }))
          : interp.paginasTco ? ["Revisa el costo de tener un vehículo", "¿Qué es el TCO?"].map((p) => ({ etiqueta: p, accion: { pregunta: p } }))
          : opcionesEjemplos().slice(0, 3);
        return { tipo: "fuera_alcance", bloques, opciones: sugeridas };
      }
      case "sin_dato": {
        const bloques = [texto("No encontré un dato publicado sobre eso.")];
        let opciones = opcionesEjemplos().slice(0, 4);
        if (interp.territorios && interp.territorios.length) {
          const t = interp.territorios[0];
          bloques[0] = texto(`¿Qué quieres saber de ${t}? Por ejemplo:`);
          opciones = [`¿Cuántos cargadores hay en ${t}?`, `¿Cuántos habitantes tiene ${t}?`, `¿Cuántos autos eléctricos hay en ${t}?`].map((p) => ({ etiqueta: p, accion: { pregunta: p } }));
        } else {
          // si el sitio tiene una pagina que se parece a lo preguntado, se recomienda
          const paginas = await bloqueDePaginasPara(env, original);
          if (paginas) bloques.push(paginas);
          bloques.push(texto("Puedo hablar de cargadores, ventas (también por marca) y parque de vehículos eléctricos, datos de cada modelo (autonomía, precio, ficha de rescate), seguros, costo de tener un vehículo (TCO), precios de bencina, diésel y de la carga, generación eléctrica, cortes de luz, población, las proyecciones que publica el sitio, y leyes y normas del sector."));
        }
        if (interp.falloVehiculos) bloques.push(texto("Los datos de modelos de vehículos no están disponibles en este momento."));
        return { tipo: "sin_dato", bloques, opciones };
      }
      case "aclaracion":
        return { tipo: "aclaracion", bloques: [texto("Tu pregunta puede referirse a más de un dato. ¿Cuál quieres ver?")], opciones: interp.opciones.map((o) => ({ etiqueta: o.nombre, accion: { pregunta: original, forzar: o.id } })), depuracion: { puntajes: interp.puntajes } };
      case "consulta":
        return interp.partes ? await ejecutarPorSeparado(interp, original) : await ejecutar(interp, original);
      case "pedir": {
        // un dato que necesita una marca o un modelo y la pregunta no lo trae: se pide, sin ejemplos con marcas (decision del usuario, 2026-10-22)
        const lo = { ventas_marca: ["ventas de una marca", "¿De qué marca quieres ver las ventas? Escribe el nombre de la marca.", ["Las 5 marcas con más ventas", "Los 5 modelos más vendidos"]] }[interp.pedido];
        estado.previo = { pedirVehiculo: interp.pedido };
        return {
          tipo: "respuesta", entendi: `Entendí tu pregunta como: ${lo[0]}`, bloques: [texto(lo[1])], opciones: [], siguientes: lo[2].map((p) => ({ etiqueta: p, accion: { pregunta: p } })),
          verificacion: { ok: true, sinRespaldo: [] }, depuracion: { indicador: interp.pedido, consultas: [], notas: [], puntajes: [], pedir: interp.pedido },
        };
      }
      case "error_vehiculos":
        return { tipo: "error", bloques: [texto("No pude leer los datos de vehículos en este momento. Intenta de nuevo en unos minutos.")], opciones: [] };
      case "error_normativa":
        return errorNormativa(env);
      case "norma":
        try { return await ejecutarNorma(env, interp, original, estado); } catch (e) {
          if (e instanceof ErrorNormativa) return errorNormativa(env);
          throw e;
        }
      case "vehiculo":
        try { return await ejecutarVehiculo(env, interp, original, estado); } catch (e) {
          if (e instanceof ErrorVehiculos) return { tipo: "error", bloques: [texto("No pude leer los datos de vehículos en este momento. Intenta de nuevo en unos minutos.")], opciones: [] };
          throw e;
        }
      default:
        return { tipo: "error", bloques: [texto("No entendí la pregunta.")], opciones: opcionesEjemplos().slice(0, 3) };
    }
  }

  return { preguntar, estado, ejemplos: () => EJEMPLOS.slice() };
}
return { EJEMPLOS, SEGUIMIENTOS, sugerirSiguientes, crearDialogo };
})();
__mod["agente_web/src/estilos_base.js"] = (function () {
// Estilos del boton flotante y de lo que comparten todas las piezas del asistente (variables de color, tema claro/oscuro, reinicio). Los usa el asistente completo (estilos.js) y el cargador
// liviano `agente-boton.js`, que dibuja solo el boton: por eso viven aparte, para que el boton se vea igual con uno y otro.
const ESTILOS_BASE = `
:host {
  all: initial;
  position: fixed;
  z-index: 1400;   /* sobre los mapas y menus del sitio (hasta 1300) y debajo de su aviso de cookies (2000), que nunca debe quedar tapado */
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  --ef-d-fondo: #fcfcfb; --ef-d-plano: #f9f9f7; --ef-d-tinta: #0b0b0b; --ef-d-tinta2: #52514e; --ef-d-tinta3: #6b6a65;
  --ef-d-linea: #e1e0d9; --ef-d-eje: #c3c2b7; --ef-d-borde: rgba(11, 11, 11, 0.12); --ef-d-accion: #2670ca; --ef-d-accion-texto: #ffffff; --ef-d-aviso: #eda100;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 15px;
  line-height: 1.5;
}
@media (prefers-color-scheme: dark) {
  :host(:not([data-tema="claro"])) {
    --ef-d-fondo: #1a1a19; --ef-d-plano: #0d0d0d; --ef-d-tinta: #ffffff; --ef-d-tinta2: #c3c2b7; --ef-d-tinta3: #a3a198;
    --ef-d-linea: #2c2c2a; --ef-d-eje: #4a4a46; --ef-d-borde: rgba(255, 255, 255, 0.14); --ef-d-accion: #3987e5; --ef-d-accion-texto: #0b0b0b; --ef-d-aviso: #c98500;
  }
}
:host([data-tema="oscuro"]) {
  --ef-d-fondo: #1a1a19; --ef-d-plano: #0d0d0d; --ef-d-tinta: #ffffff; --ef-d-tinta2: #c3c2b7; --ef-d-tinta3: #a3a198;
  --ef-d-linea: #2c2c2a; --ef-d-eje: #4a4a46; --ef-d-borde: rgba(255, 255, 255, 0.14); --ef-d-accion: #3987e5; --ef-d-accion-texto: #0b0b0b; --ef-d-aviso: #c98500;
}
:host {
  --ef-fondo: var(--surface-1, var(--ef-d-fondo));
  --ef-plano: var(--plane, var(--ef-d-plano));
  --ef-tinta: var(--ink-1, var(--ef-d-tinta));
  --ef-tinta2: var(--ink-2, var(--ef-d-tinta2));
  --ef-tinta3: var(--ink-3, var(--ef-d-tinta3));
  --ef-linea: var(--grid, var(--ef-d-linea));
  --ef-eje: var(--axis, var(--ef-d-eje));
  --ef-borde: var(--border, var(--ef-d-borde));
  --ef-accion: var(--accion, var(--ef-d-accion));
  --ef-accion-texto: var(--accion-texto, var(--ef-d-accion-texto));
  --ef-aviso: var(--s4, var(--ef-d-aviso));
  color: var(--ef-tinta);
}
:host([hidden]) { display: none !important; }
*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }
button, input { font: inherit; color: inherit; }
button { cursor: pointer; }
:focus-visible { outline: 3px solid var(--ef-accion); outline-offset: 2px; }

:host { --ef-r: max(16px, env(safe-area-inset-right, 0px)); --ef-b: max(16px, env(safe-area-inset-bottom, 0px)); }
.lanzador {
  position: fixed; right: var(--ef-r); bottom: var(--ef-b);
  display: inline-flex; align-items: center; gap: 9px;
  min-height: 48px; padding: 0 20px 0 15px;
  border: 0; border-radius: 999px;
  background: var(--ef-accion); color: var(--ef-accion-texto);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  font-size: 14px; font-weight: 600;
}
.lanzador:hover { filter: brightness(1.07); }
.lanzador svg { width: 22px; height: 22px; flex: none; }
@media (max-width: 640px) {
  :host { --ef-r: max(12px, env(safe-area-inset-right, 0px)); --ef-b: max(12px, env(safe-area-inset-bottom, 0px)); }
  .lanzador { padding: 0; width: 52px; height: 52px; justify-content: center; }
  .lanzador .rotulo { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
}
@media print { :host { display: none; } }
`;
return { ESTILOS_BASE };
})();
__mod["agente_web/src/estilos.js"] = (function () {
// Estilos del asistente. Viven dentro de un Shadow DOM: los estilos del sitio no los alteran y los del asistente no tocan la pagina.
// Los colores salen de las variables del sitio (--surface-1, --plane, --ink-1...) cuando existen, asi sigue su tema claro/oscuro;
// si la pagina no las define (una demostracion suelta), se usan valores propios segun prefers-color-scheme o el atributo data-tema.
const { ESTILOS_BASE } = __req("agente_web/src/estilos_base.js");

const ESTILOS = ESTILOS_BASE + `.globo {
  position: fixed; right: var(--ef-r); bottom: calc(var(--ef-b) + 58px); max-width: 250px;
  padding: 10px 14px; border-radius: 12px 12px 4px 12px;
  background: var(--ef-fondo); color: var(--ef-tinta); border: 1px solid var(--ef-borde);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18); font-size: 13px;
}

.panel {
  position: fixed; right: var(--ef-r); bottom: var(--ef-b);
  width: min(410px, calc(100vw - 32px)); height: min(660px, calc(100vh - 32px));
  display: flex; flex-direction: column; overflow: hidden;
  background: var(--ef-fondo); border: 1px solid var(--ef-borde); border-radius: 16px;
  box-shadow: 0 14px 56px rgba(0, 0, 0, 0.30);
}
.cab { display: flex; align-items: center; gap: 6px; padding: 12px 8px 12px 16px; border-bottom: 1px solid var(--ef-borde); }
.cab .tit { flex: 1; min-width: 0; }
.cab h2 { margin: 0; font-size: 15px; font-weight: 700; line-height: 1.3; }
.cab p { margin: 1px 0 0; font-size: 12px; color: var(--ef-tinta2); }
.ibtn { display: inline-grid; place-items: center; width: 38px; height: 38px; border: 0; border-radius: 9px; background: transparent; color: var(--ef-tinta2); }
.ibtn:hover { background: var(--ef-plano); color: var(--ef-tinta); }
.ibtn svg { width: 20px; height: 20px; }

.mensajes { position: relative; flex: 1; overflow-y: auto; padding: 14px 14px 8px; background: var(--ef-plano); display: flex; flex-direction: column; gap: 14px; overscroll-behavior: contain; }
.msg { max-width: 100%; }
.msg.u { align-self: flex-end; max-width: 88%; }
.msg.u .burbuja { background: var(--ef-accion); color: var(--ef-accion-texto); border-radius: 14px 14px 4px 14px; padding: 8px 13px; overflow-wrap: anywhere; }
.msg.a .burbuja { background: var(--ef-fondo); border: 1px solid var(--ef-borde); border-radius: 14px 14px 14px 4px; padding: 11px 13px; }
.burbuja > * + * { margin-top: 11px; }
.burbuja p { margin: 0; overflow-wrap: anywhere; }
.entendi { margin: 0 0 5px 4px; font-size: 12px; color: var(--ef-tinta2); }

.nota { font-size: 13px; color: var(--ef-tinta2); border-left: 3px solid var(--ef-eje); padding-left: 10px; }
.avisos { font-size: 13px; color: var(--ef-tinta2); border-left: 3px solid var(--ef-aviso); padding-left: 10px; }
.avisos b { color: var(--ef-tinta); }
.avisos ul, .lista ul { margin: 4px 0 0; padding-left: 18px; }
.avisos li + li, .lista li + li { margin-top: 4px; }

.tarjeta { border: 1px solid var(--ef-linea); border-radius: 10px; padding: 10px 12px 6px; background: var(--ef-plano); }
.tarjeta h3 { margin: 0; font-size: 13px; font-weight: 700; line-height: 1.35; }
.tarjeta .sub { margin: 2px 0 6px; font-size: 12px; color: var(--ef-tinta2); }
.fila { display: flex; justify-content: space-between; align-items: baseline; gap: 14px; padding: 7px 0; border-top: 1px solid var(--ef-linea); font-size: 13px; }
.fila .e { color: var(--ef-tinta2); min-width: 0; }
.fila .v { font-weight: 700; font-size: 15px; text-align: right; font-variant-numeric: tabular-nums; flex: none; max-width: 55%; overflow-wrap: anywhere; }
.pie-tarjeta { margin: 4px 0 4px; font-size: 12px; color: var(--ef-tinta2); }
/* tarjeta de texto (leyes y normas): la etiqueta arriba y el texto abajo, sin el formato de cifra */
.tarjeta.texto .fila { display: block; }
.tarjeta.texto .fila .e { display: block; font-size: 12px; }
.tarjeta.texto .fila .v { display: block; margin-top: 2px; max-width: none; text-align: left; font-size: 13.5px; font-weight: 400; line-height: 1.45; }
/* tarjeta de lista: cada elemento con su nombre en negrita y debajo su detalle */
.tarjeta.lista .fila { display: block; }
.tarjeta.lista .fila .e { display: block; font-size: 13.5px; font-weight: 600; color: var(--ef-tinta); }
.tarjeta.lista .fila .v { display: block; margin-top: 2px; max-width: none; text-align: left; font-size: 13px; font-weight: 400; color: var(--ef-tinta2); line-height: 1.4; }

ol.ranking { list-style: none; margin: 0; padding: 0; }
ol.ranking li { display: flex; align-items: baseline; gap: 10px; padding: 7px 0; border-top: 1px solid var(--ef-linea); font-size: 13px; }
ol.ranking .n { width: 20px; flex: none; color: var(--ef-tinta3); font-variant-numeric: tabular-nums; }
ol.ranking .t { flex: 1; min-width: 0; overflow-wrap: anywhere; }
ol.ranking .t small { display: block; color: var(--ef-tinta2); font-size: 11.5px; }
ol.ranking .v { font-weight: 700; font-size: 14px; text-align: right; font-variant-numeric: tabular-nums; flex: none; }

.tabla-scroll { overflow-x: auto; margin: 0 -2px; }
table { border-collapse: collapse; width: 100%; font-size: 12.5px; }
th, td { padding: 6px 8px; border-top: 1px solid var(--ef-linea); text-align: right; vertical-align: top; }
th:first-child, td:first-child { text-align: left; padding-left: 2px; }
th { font-weight: 600; color: var(--ef-tinta2); border-top: 0; }
td { font-variant-numeric: tabular-nums; }
td.per { white-space: nowrap; }

.enlace { color: var(--ef-accion); text-decoration: underline; text-underline-offset: 2px; }
.enlace { display: inline-block; font-size: 13px; font-weight: 600; }

.paginas { border: 1px dashed var(--ef-eje); border-radius: 10px; padding: 9px 12px 7px; }
.paginas .sub { margin: 0 0 3px; font-size: 12px; color: var(--ef-tinta2); }
.paginas ul { list-style: none; margin: 0; padding: 0; }
.paginas li { padding: 7px 0; border-top: 1px solid var(--ef-linea); }
.paginas li:first-child { border-top: 0; }
.paginas .enlace { display: block; }
.paginas .desc { display: block; margin-top: 1px; font-size: 12px; color: var(--ef-tinta2); overflow-wrap: anywhere; }

.chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px; }
.rotulo-chips { margin: 12px 0 0 4px; font-size: 12px; color: var(--ef-tinta2); }
.rotulo-chips + .chips { margin-top: 6px; }
.chip { border: 1px solid var(--ef-eje); background: var(--ef-fondo); color: var(--ef-tinta); border-radius: 999px; padding: 7px 13px; font-size: 13px; line-height: 1.3; text-align: left; }
.chip:hover { border-color: var(--ef-accion); color: var(--ef-accion); }
.chip:disabled { opacity: 0.55; cursor: default; }

.escribiendo { display: inline-flex; gap: 5px; padding: 12px 14px; }
.escribiendo i { width: 7px; height: 7px; border-radius: 50%; background: var(--ef-tinta3); animation: ef-salto 1.1s infinite ease-in-out; }
.escribiendo i:nth-child(2) { animation-delay: 0.15s; }
.escribiendo i:nth-child(3) { animation-delay: 0.3s; }
@keyframes ef-salto { 0%, 70%, 100% { transform: translateY(0); opacity: 0.5; } 35% { transform: translateY(-4px); opacity: 1; } }

.pie { border-top: 1px solid var(--ef-borde); background: var(--ef-fondo); padding: 10px 12px 8px; }
.form { display: flex; gap: 8px; }
.form input { flex: 1; min-width: 0; border: 1px solid var(--ef-eje); border-radius: 11px; padding: 10px 13px; background: var(--ef-plano); font-size: 16px; }
.form input::placeholder { color: var(--ef-tinta3); }
.form input:focus-visible { outline-offset: 0; border-color: var(--ef-accion); }
.enviar { width: 46px; flex: none; border: 0; border-radius: 11px; background: var(--ef-accion); color: var(--ef-accion-texto); display: grid; place-items: center; }
.enviar:hover { filter: brightness(1.07); }
.enviar:disabled { opacity: 0.5; cursor: default; filter: none; }
.enviar svg { width: 20px; height: 20px; }
.aviso-pie { margin: 7px 2px 0; font-size: 11.5px; color: var(--ef-tinta3); }
.solo-lectura { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* «¿Te sirvio?» bajo cada respuesta (opinion.js): discreto, para no competir con las cifras */
.opinion { margin: 6px 2px 0; font-size: 12.5px; color: var(--ef-tinta2); }
.op-fila { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.op-btn { min-height: 34px; padding: 0 16px; border: 1px solid var(--ef-borde); border-radius: 999px; background: transparent; color: var(--ef-tinta); font-size: 13px; }
.op-btn:hover { border-color: var(--ef-accion); color: var(--ef-accion); }
.op-detalle { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
.op-detalle label { display: flex; flex-direction: column; gap: 4px; }
.op-detalle textarea { width: 100%; min-height: 56px; resize: vertical; padding: 8px 10px; border: 1px solid var(--ef-eje); border-radius: 10px; background: var(--ef-plano); color: var(--ef-tinta); font-size: 16px; line-height: 1.4; }
.op-aviso { margin: 0; font-size: 12px; color: var(--ef-tinta3); }
.op-enviar { align-self: flex-start; min-height: 38px; padding: 0 18px; border: 0; border-radius: 999px; background: var(--ef-accion); color: var(--ef-accion-texto); font-size: 13px; font-weight: 600; }
.op-btn:disabled, .op-enviar:disabled, .op-detalle textarea:disabled { opacity: 0.6; cursor: default; }
.op-estado { margin: 4px 0 0; }
.op-estado:empty { display: none; }
.op-gracias { color: var(--ef-tinta2); }
@media (max-width: 640px) {
  .panel { right: 0; left: 0; bottom: 0; width: auto; height: min(84vh, 680px); border-radius: 16px 16px 0 0; }
  .globo { bottom: calc(var(--ef-b) + 60px); }
  .pie { padding-bottom: max(8px, env(safe-area-inset-bottom, 0px)); }
  .msg.u { max-width: 92%; }
}
@media (max-height: 520px) { .panel { height: calc(100vh - 16px); bottom: 8px; } }
@media (prefers-reduced-motion: reduce) {
  .escribiendo i { animation: none; opacity: 0.8; }
  .mensajes { scroll-behavior: auto; }
}
`;
return { ESTILOS };
})();
__mod["agente_web/src/iconos.js"] = (function () {
// Iconos del asistente (trazos SVG de 24x24, dibujados con atributos: nada de HTML armado como texto). Los usan el asistente completo y el cargador liviano del boton.
const NS = "http://www.w3.org/2000/svg";

const ICONOS = {
  chat: ["M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"],
  cerrar: ["M18 6L6 18", "M6 6l12 12"],
  enviar: ["M22 2L11 13", "M22 2l-7 20-4-9-9-4 20-7z"],
  nueva: ["M1 4v6h6", "M3.51 15a9 9 0 1 0 2.13-9.36L1 10"],
};

function icono(nombre) {
  const svg = document.createElementNS(NS, "svg");
  for (const [k, v] of Object.entries({ viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true", focusable: "false" })) svg.setAttribute(k, v);
  for (const d of ICONOS[nombre]) {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", d);
    svg.append(p);
  }
  return svg;
}
return { ICONOS, icono };
})();
__mod["agente_web/src/config_widget.js"] = (function () {
// Configuracion del asistente: los atributos data-* del <script> que lo carga o window.EF_ASISTENTE_CONFIG. La leen igual el asistente completo (agente.js) y el cargador liviano del boton
// (agente-boton.js): por eso viven aparte y sin depender de nada. Funciones puras: reciben el <script> y la configuracion global, no tocan la pagina.
const URL_DE_RESPALDO = "https://observatorio.energiasfuturo.com";

function leerConfig(script, global) {
  const d = script && script.dataset ? script.dataset : {};
  global = typeof global === "object" && global ? global : {};
  // por defecto NO se abre solo (decision del usuario, 2026-10-21): queda el boton y la persona lo abre cuando quiere; `primera-visita` y `siempre` hay que pedirlos
  const apertura = global.apertura || d.apertura || "nunca";
  const noTapar = String(global.noTapar || d.noTapar || "");
  return {
    apertura: ["primera-visita", "siempre", "nunca"].includes(apertura) ? apertura : "nunca",
    sitio: global.sitio || d.sitio || null,
    sitioPublico: global.sitioPublico || d.sitioPublico || null,
    cargador: typeof global.cargador === "function" ? global.cargador : null,
    tema: global.tema || d.tema || null,
    retardoMs: Number.isFinite(Number(global.retardoMs)) ? Number(global.retardoMs) : 1200,
    // selector simple (#id o .clase) de un aviso de la pagina que el asistente no debe tapar (p. ej. el de cookies): mientras exista, el asistente se oculta
    noTapar: /^[#.][A-Za-z0-9_-]{1,60}$/.test(noTapar) ? noTapar : null,
    // adonde van las opiniones de «¿te sirvio?» («prueba» o una direccion https; ver opinion.js); sin destino, el asistente no muestra esos botones
    opiniones: String(global.opiniones || d.opiniones || ""),
    // lo pone el cargador liviano cuando la persona toco el boton: el asistente completo se abre apenas se monta
    abrirAlMontar: global.abrirAlMontar === true || d.efAbrir === "1",
  };
}

function crearEntorno(cfg, ubicacion) {
  const env = {};
  if (cfg.sitio) env.SITIO_BASE = cfg.sitio;
  else if (ubicacion && /^https?:$/.test(ubicacion.protocol)) env.SITIO_BASE = ubicacion.origin;
  if (cfg.sitioPublico) env.SITIO_PUBLICO = cfg.sitioPublico;
  if (cfg.cargador) env.CARGADOR = cfg.cargador;
  return env;
}

// Lo mismo que urlSitio(crearEntorno(cfg, ubicacion)) de servidor/src/config.js, sin traer ese modulo (el cargador del boton debe pesar casi nada); una prueba comprueba que den igual.
function baseDeDatos(cfg, ubicacion) {
  const base = cfg.sitio || (ubicacion && /^https?:$/.test(ubicacion.protocol) ? ubicacion.origin : URL_DE_RESPALDO);
  return String(base).replace(/\/+$/, "");
}
return { URL_DE_RESPALDO, leerConfig, crearEntorno, baseDeDatos };
})();
__mod["agente_web/src/opinion.js"] = (function () {
// Opinion de la persona sobre una respuesta del asistente («¿Te sirvió?»). Pedido de #77 por decision del usuario (2026-10-25): sin registro automatico de preguntas; NO se envia nada mientras
// la persona no toque un boton; el MENSAJE no lleva IP ni identificadores (la conexion, en cambio, le muestra la IP al destino, como a cualquier sitio: el destino no debe guardarla); el campo de texto («¿Qué buscabas?») es opcional y avisa que no se escriban datos personales; retencion propuesta de 90 dias
// (la aplica el destino, que el usuario todavia no elige: este modulo solo arma y envia el mensaje).
// Que se envia: { v, util, tipo, tema, comentario? }. `tipo` y `tema` salen de listas internas (el tipo de respuesta y el id del indicador o de la intencion), JAMAS del texto de la pregunta;
// el comentario es lo unico escrito por la persona y solo va si lo escribio. No se envia la pregunta, ni la pagina, ni la hora (la pone el destino), ni nada que identifique al navegador. El limite del comentario (MAX_COMENTARIO) se aplica aqui, en el navegador: el destino tambien debe rechazar comentarios largos y campos que no conoce.
// El destino lo decide el sitio con `data-opiniones`: una direccion https, o «prueba» (ensayo: no sale nada del navegador). Sin destino, el asistente no muestra los botones.

const MAX_COMENTARIO = 280;
const RX_TEMA = /^[a-z][a-z0-9_]{1,59}$/;
// respuestas sobre las que tiene sentido preguntar «¿te sirvio?» (no el saludo, ni «gracias», ni la pantalla vacia)
const TIPOS_QUE_PIDEN_OPINION = new Set(["respuesta", "sin_dato", "fuera_alcance", "aclaracion"]);
const TIPOS_CONOCIDOS = new Set(["respuesta", "sin_dato", "fuera_alcance", "aclaracion", "identidad", "error"]);

// Lo que queda del comentario: sin caracteres de control ni de direccion de texto, los espacios corridos en uno, y a lo mas MAX_COMENTARIO caracteres.
function limpiarComentario(texto) {
  const t = String(texto === null || texto === undefined ? "" : texto).replace(/[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]+/gu, " ").replace(/\s+/g, " ").trim();
  return Array.from(t).slice(0, MAX_COMENTARIO).join("").trim();
}

// El tema de una respuesta: el id del indicador o de la intencion que la produjo; solo si tiene la forma de un id (nada que venga escrito por la persona).
function temaDe(resp) {
  const d = resp && typeof resp === "object" ? resp.depuracion : null;
  if (!d || typeof d !== "object") return null;
  for (const c of [d.indicador, d.intencion, d.vehiculo ? "vehiculo" : null, d.normativa ? "normativa" : null]) {
    if (typeof c === "string" && RX_TEMA.test(c)) return c;
  }
  return null;
}

function armarOpinion({ util, resp = null, comentario = "" }) {
  const opinion = { v: 1, util: util ? 1 : 0, tipo: resp && TIPOS_CONOCIDOS.has(resp.tipo) ? resp.tipo : "otro", tema: temaDe(resp) };
  const c = limpiarComentario(comentario);
  if (c) opinion.comentario = c;
  return opinion;
}

// El valor de `data-opiniones`: «prueba», una direccion https sin usuario, clave ni fragmento, o nada (null: no se muestran los botones).
function destinoDeOpiniones(valor) {
  const v = String(valor === null || valor === undefined ? "" : valor).trim();
  if (!v) return null;
  if (v === "prueba") return { modo: "prueba" };
  if (v.length > 300) return null;
  try {
    const u = new URL(v);
    if (u.protocol !== "https:" || u.username || u.password || u.hash) return null;
    return { modo: "https", url: u.href };
  } catch {
    return null;
  }
}

// Envia la opinion. Devuelve { ok } sin lanzar nunca: un fallo de red no debe romper el asistente. Una peticion simple (text/plain, sin cookies ni referente) que el destino acepta con CORS.
async function enviarOpinion(destino, opinion, { fetchFn = typeof fetch === "function" ? fetch : null, plazoMs = 8000 } = {}) {
  if (!destino) return { ok: false, motivo: "sin_destino" };
  if (destino.modo === "prueba") return { ok: true, prueba: true };
  if (!fetchFn) return { ok: false, motivo: "sin_red" };
  const ctrl = typeof AbortController === "function" ? new AbortController() : null;
  const reloj = ctrl ? setTimeout(() => ctrl.abort(), plazoMs) : null;
  try {
    const r = await fetchFn(destino.url, {
      method: "POST", mode: "cors", credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer", keepalive: true,
      headers: { "content-type": "text/plain;charset=UTF-8" }, body: JSON.stringify(opinion), signal: ctrl ? ctrl.signal : undefined,
    });
    return r && r.ok ? { ok: true } : { ok: false, motivo: "rechazada" };
  } catch {
    return { ok: false, motivo: "sin_red" };
  } finally {
    if (reloj) clearTimeout(reloj);
  }
}
return { MAX_COMENTARIO, TIPOS_QUE_PIDEN_OPINION, limpiarComentario, temaDe, armarOpinion, destinoDeOpiniones, enviarOpinion };
})();
__mod["agente_web/src/widget.js"] = (function () {
// Interfaz del asistente de datos: boton flotante, panel de conversacion y dibujo de las respuestas.
// Solo DOM con textContent (nunca HTML armado como texto): lo que llega de los datos no puede inyectar marcado. Vive en un Shadow DOM con estilos propios.
// Se carga con un <script> normal; lee su configuracion de los atributos data-* del script o de window.EF_ASISTENTE_CONFIG.
const { urlPublica, urlSitio } = __req("servidor/src/config.js");
const { crearDialogo, EJEMPLOS } = __req("agente_web/src/dialogo.js");
const { ESTILOS } = __req("agente_web/src/estilos.js");
const { urlExterna } = __req("agente_web/src/enlaces.js");
const { icono } = __req("agente_web/src/iconos.js");
const { crearEntorno, leerConfig } = __req("agente_web/src/config_widget.js");
const { armarOpinion, destinoDeOpiniones, enviarOpinion, MAX_COMENTARIO, TIPOS_QUE_PIDEN_OPINION } = __req("agente_web/src/opinion.js");

const VERSION = "0.1.0";
const CLAVE_CHAT = "ef_asistente_chat_v1";
const CLAVE_VISTO = "ef_asistente_visto_v1";
const CLAVE_DATOS = "ef_asistente_datos_v1";
const MAX_GUARDADO = 90000;       // bytes de la conversacion que se recuerdan durante la visita

const TEXTOS = {
  titulo: "Asistente de datos",
  subtitulo: "Cifras publicadas por Energías Futuro",
  lanzador: "Asistente de datos",
  globo: "¿Tienes una pregunta sobre los datos? Pregúntame.",
  saludo: "Hola. Soy el asistente de datos de Energías Futuro. Pregúntame por cargadores, autos eléctricos y sus modelos, precios, energía, cortes de luz, leyes y normas. Elige una pregunta o escribe la tuya:",
  pie: "Respondo con cifras ya publicadas en este sitio; los cálculos (costo de uso, totales y variaciones de ventas) van marcados. Funciono con reglas simples, no con inteligencia artificial.",
  placeholder: "Escribe tu pregunta",
  error: "Tuve un problema para responder. Intenta de nuevo en unos minutos.",
  opinionPregunta: "¿Te sirvió?",
  opinionSi: "Sí",
  opinionNo: "No",
  opinionCampo: "¿Qué buscabas? (opcional)",
  opinionAviso: "No escribas datos personales.",
  opinionEnviar: "Enviar",
  opinionEnviando: "Enviando…",
  opinionGracias: "Gracias por tu opinión.",
  opinionPrueba: "Gracias. Esto es una prueba: no se envió nada.",
  opinionError: "No pude enviar tu opinión. Puedes intentarlo de nuevo.",
};


// ---- utilidades ------------------------------------------------------------------------------------------------------------------
function almacen(tipo) {
  try { return window[tipo]; } catch { return null; }
}
function leer(a, k) {
  try { return a ? a.getItem(k) : null; } catch { return null; }
}
function escribir(a, k, v) {
  try { if (a) a.setItem(k, v); } catch { /* sin almacenamiento (modo privado, bloqueado): el asistente funciona igual */ }
}
function borrar(a, k) {
  try { if (a) a.removeItem(k); } catch { /* idem */ }
}

// Crea un elemento. Los hijos que son texto se insertan como nodos de texto, nunca como HTML.
function h(tag, props = {}, ...hijos) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "texto") el.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? "" : String(v));
  }
  for (const c of hijos.flat()) if (c !== null && c !== undefined && c !== false) el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  return el;
}


// Un enlace solo se dibuja si apunta al sitio (el publico o este mismo): nada de destinos que vengan de otra parte.
function urlSegura(u, env) {
  try {
    const x = new URL(String(u), window.location.href);
    const permitidos = new Set([new URL(urlPublica(env)).origin, window.location.origin]);
    if (env.SITIO_BASE) permitidos.add(new URL(env.SITIO_BASE).origin);
    const protocoloOk = x.protocol === "https:" || (x.protocol === "http:" && /^(localhost|127\.0\.0\.1)$/.test(x.hostname));
    return protocoloOk && permitidos.has(x.origin) ? x.href : null;
  } catch {
    return null;
  }
}

// ---- dibujo de los bloques de una respuesta -------------------------------------------------------------------------------------
function dibujarBloque(b, env) {
  switch (b.tipo) {
    case "texto":
      return h("p", { texto: b.texto });
    case "nota":
      return h("p", { class: "nota", texto: b.texto });
    case "cifras":
      return h("div", { class: b.estilo === "texto" || b.estilo === "lista" ? `tarjeta ${b.estilo}` : "tarjeta" },
        h("h3", { texto: b.titulo }),
        b.subtitulo ? h("p", { class: "sub", texto: b.subtitulo }) : null,
        b.filas.map(([etiqueta, valor]) => h("div", { class: "fila" }, h("span", { class: "e", texto: etiqueta }), h("span", { class: "v", texto: valor }))),
        b.nota ? h("p", { class: "pie-tarjeta", texto: b.nota }) : null);
    case "ranking":
      return h("div", { class: "tarjeta" },
        h("h3", { texto: b.titulo }),
        h("p", { class: "sub", texto: b.subtitulo }),
        h("ol", { class: "ranking" }, b.items.map((it, i) => h("li", {},
          h("span", { class: "n", texto: String(i + 1) }),
          h("span", { class: "t" }, it.nombre, it.nota ? h("small", { texto: it.nota }) : null),
          h("span", { class: "v", texto: it.valor })))));
    case "tabla":
      return h("div", { class: "tarjeta" },
        h("h3", { texto: b.titulo }),
        b.subtitulo ? h("p", { class: "sub", texto: b.subtitulo }) : null,
        h("div", { class: "tabla-scroll", tabindex: "0", role: "region", "aria-label": "Tabla de cifras" },
          h("table", {},
            h("thead", {}, h("tr", {}, b.columnas.map((c) => h("th", { scope: "col", texto: c })))),
            // el periodo («2026-08») no se parte en dos lineas en el guion: con el mas reciente arriba, la tabla se lee de un vistazo
            h("tbody", {}, b.filas.map((fila) => h("tr", {}, fila.map((celda, j) => h("td", { ...(j === 0 && b.columnas[0] === "Período" ? { class: "per" } : {}), texto: celda }))))))));
    case "avisos":
      return h("div", { class: "avisos" }, h("b", { texto: "Ojo:" }), h("ul", {}, b.items.map((t) => h("li", { texto: t }))));
    case "lista":
      return h("div", { class: "lista" }, h("ul", {}, b.items.map(([titulo, desc]) => h("li", {}, h("b", { texto: titulo }), ": " + desc))));
    case "enlace": {
      // un enlace «externo» (ficha de rescate, etiqueta de eficiencia) solo se dibuja si es https de un sitio de la lista; los demas, solo si son de este sitio
      const u = b.externo ? urlExterna(b.url) : urlSegura(b.url, env);
      if (!u) return null;
      return h("a", { class: "enlace", href: u, target: "_blank", rel: "noopener noreferrer", texto: b.texto, ...(b.externo ? { "aria-label": `${b.texto} (se abre en otro sitio)` } : {}) });
    }
    case "paginas": {
      // paginas del menu del sitio que pueden servir para profundizar: solo se dibujan las que apuntan a este sitio
      const items = (b.items || []).map((p) => ({ texto: p && p.texto, desc: p && p.desc, url: p && urlSegura(p.url, env) })).filter((p) => p.url && p.texto);
      if (!items.length) return null;
      return h("div", { class: "paginas" },
        h("p", { class: "sub", texto: b.titulo || "Páginas del sitio" }),
        h("ul", {}, items.map((p) => h("li", {}, h("a", { class: "enlace", href: p.url, target: "_blank", rel: "noopener noreferrer", texto: p.texto }), p.desc ? h("span", { class: "desc", texto: p.desc }) : null))));
    }
    default:
      return null;   // un tipo de bloque desconocido (p. ej. de una conversacion guardada con una version anterior) simplemente no se dibuja
  }
}

// ---- montaje ---------------------------------------------------------------------------------------------------------------------------
// El <script> que cargo este codigo: document.currentScript solo existe mientras se ejecuta, por eso se guarda de inmediato.
const SCRIPT_PROPIO = typeof document !== "undefined" ? document.currentScript : null;
// la configuracion se lee igual aqui y en el cargador liviano del boton (config_widget.js)
const configDeLaPagina = () => leerConfig(SCRIPT_PROPIO || document.querySelector("script[data-ef-asistente]"), window.EF_ASISTENTE_CONFIG);

function aplicarEstilos(raiz) {
  try {
    const hoja = new CSSStyleSheet();
    hoja.replaceSync(ESTILOS);
    raiz.adoptedStyleSheets = [hoja];
    return;
  } catch { /* navegador sin hojas construibles: se usa <style> */ }
  raiz.append(h("style", { texto: ESTILOS }));
}

function montar(cfg = configDeLaPagina()) {
  if (document.querySelector("[data-ef-asistente-raiz]")) return null;
  const env = crearEntorno(cfg, window.location);
  const destinoOpiniones = destinoDeOpiniones(cfg.opiniones);       // sin destino valido no se muestran los botones «¿te sirvio?»
  const local = almacen("localStorage");
  const sesion = almacen("sessionStorage");

  const anfitrion = h("div", { "data-ef-asistente-raiz": VERSION });
  if (cfg.tema === "claro" || cfg.tema === "oscuro") anfitrion.setAttribute("data-tema", cfg.tema);
  const raiz = anfitrion.attachShadow({ mode: "open" });
  aplicarEstilos(raiz);

  const lanzador = h("button", { type: "button", class: "lanzador", "aria-haspopup": "dialog", "aria-expanded": "false", "aria-controls": "ef-panel" }, icono("chat"), h("span", { class: "rotulo", texto: TEXTOS.lanzador }));
  const globo = h("div", { class: "globo", role: "status", hidden: true, texto: TEXTOS.globo });
  const lista = h("div", { class: "mensajes", role: "log", "aria-live": "polite", "aria-relevant": "additions", "aria-label": "Conversación con el asistente", tabindex: "0" });
  const entrada = h("input", { id: "ef-entrada", type: "text", maxlength: "200", autocomplete: "off", enterkeyhint: "send", placeholder: TEXTOS.placeholder });
  const enviarBtn = h("button", { type: "submit", class: "enviar", "aria-label": "Enviar pregunta" }, icono("enviar"));
  const btnNueva = h("button", { type: "button", class: "ibtn", "aria-label": "Empezar una conversación nueva", title: "Conversación nueva" }, icono("nueva"));
  const btnCerrar = h("button", { type: "button", class: "ibtn", "aria-label": "Cerrar el asistente", title: "Cerrar" }, icono("cerrar"));
  const panel = h("section", { class: "panel", id: "ef-panel", role: "dialog", "aria-label": "Asistente de datos de Energías Futuro", hidden: true },
    h("header", { class: "cab" },
      h("div", { class: "tit" }, h("h2", { texto: TEXTOS.titulo }), h("p", { texto: TEXTOS.subtitulo })),
      btnNueva, btnCerrar),
    lista,
    h("footer", { class: "pie" },
      h("form", { class: "form" },
        h("label", { class: "solo-lectura", for: "ef-entrada", texto: "Tu pregunta" }),
        entrada, enviarBtn),
      h("p", { class: "aviso-pie", texto: TEXTOS.pie })));
  raiz.append(lanzador, globo, panel);

  // ---- estado --------------------------------------------------------------------------------------------------------------------------
  let dialogoCache = null;
  let ocupado = false;
  let mensajes = [];            // { r: "u" | "a", t?: texto, resp?: respuesta } lo que se dibuja y se recuerda
  const dialogo = () => dialogoCache || (dialogoCache = crearDialogo(env));

  const marcarVisto = () => escribir(local, CLAVE_VISTO, "1");

  function guardar() {
    let guardados = mensajes.slice(-40);
    let texto = JSON.stringify({ v: 1, msgs: guardados, previo: dialogoCache ? dialogoCache.estado.previo : null });
    while (texto.length > MAX_GUARDADO && guardados.length > 2) {
      guardados = guardados.slice(2);
      texto = JSON.stringify({ v: 1, msgs: guardados, previo: dialogoCache ? dialogoCache.estado.previo : null });
    }
    escribir(sesion, CLAVE_CHAT, texto);
  }

  // ---- dibujo de mensajes ----------------------------------------------------------------------------------------------------------
  function irAlFinal() {
    lista.scrollTop = lista.scrollHeight;
  }
  function irAlInicioDe(el) {
    lista.scrollTop = Math.max(0, el.offsetTop - 10);
  }
  function quitarChips() {
    for (const c of lista.querySelectorAll(".chips, .rotulo-chips")) c.remove();
  }

  function dibujarUsuario(texto) {
    const m = h("div", { class: "msg u" }, h("div", { class: "burbuja", texto }));
    lista.append(m);
    irAlFinal();
    return m;
  }

  // «¿Te sirvio?» bajo una respuesta (pedido de #77 por decision del usuario, 2026-10-25). Nada se envia solo: «Si» envia al tocarlo; «No» abre un campo opcional («¿Que buscabas?») y solo
  // se envia con «Enviar». Lo que se manda lo arma opinion.js (sin la pregunta ni identificadores en el mensaje); `msg.op` recuerda en la visita que esa respuesta ya tuvo su opinion.
  let contadorOpiniones = 0;
  function dibujarOpinion(resp, msg) {
    if (!destinoOpiniones || !msg || !TIPOS_QUE_PIDEN_OPINION.has(resp.tipo)) return null;
    const estado = h("p", { class: "op-estado", role: "status" });          // el mismo aviso se reutiliza: asi los lectores de pantalla anuncian lo que cambia
    const idAviso = `ef-op-aviso-${++contadorOpiniones}`;
    const campo = h("textarea", { rows: "2", maxlength: String(MAX_COMENTARIO), autocomplete: "off", "aria-describedby": idAviso });
    const detalle = h("div", { class: "op-detalle", hidden: true },
      h("label", {}, h("span", { texto: TEXTOS.opinionCampo }), campo),
      h("p", { class: "op-aviso", id: idAviso, texto: TEXTOS.opinionAviso }),
      h("button", { type: "button", class: "op-enviar", texto: TEXTOS.opinionEnviar, onclick: () => enviar(false, campo.value) }));
    const fila = h("div", { class: "op-fila" },
      h("span", { class: "op-pregunta", texto: TEXTOS.opinionPregunta }),
      h("button", { type: "button", class: "op-btn", texto: TEXTOS.opinionSi, onclick: () => enviar(true, "") }),
      h("button", { type: "button", class: "op-btn", texto: TEXTOS.opinionNo, onclick: () => { detalle.hidden = false; campo.focus(); } }));
    const caja = h("div", { class: "opinion", role: "group", "aria-label": "Tu opinión sobre esta respuesta" }, fila, detalle, estado);
    const controles = () => caja.querySelectorAll("button, textarea");
    const gracias = () => {
      fila.hidden = true;
      detalle.hidden = true;
      estado.className = "op-estado op-gracias";
      estado.textContent = destinoOpiniones.modo === "prueba" ? TEXTOS.opinionPrueba : TEXTOS.opinionGracias;
    };
    async function enviar(util, comentario) {
      for (const c of controles()) c.disabled = true;
      estado.className = "op-estado";
      estado.textContent = TEXTOS.opinionEnviando;
      const r = await enviarOpinion(destinoOpiniones, armarOpinion({ util, resp, comentario }));
      if (r.ok) { msg.op = 1; guardar(); gracias(); return; }
      for (const c of controles()) c.disabled = false;
      estado.textContent = TEXTOS.opinionError;
    }
    if (msg.op) gracias();
    return caja;
  }

  function dibujarAsistente(resp, conChips = true, msg = null) {
    const burbuja = h("div", { class: "burbuja" });
    for (const b of resp.bloques || []) {
      const nodo = dibujarBloque(b, env);
      if (nodo) burbuja.append(nodo);
    }
    const m = h("div", { class: "msg a" }, resp.entendi ? h("p", { class: "entendi", texto: resp.entendi }) : null, burbuja, dibujarOpinion(resp, msg));
    const chips = (opciones) => h("div", { class: "chips" }, opciones.map((o) => h("button", { type: "button", class: "chip", texto: o.etiqueta, onclick: () => elegir(o) })));
    if (conChips && resp.opciones && resp.opciones.length) m.append(chips(resp.opciones));
    if (conChips && resp.siguientes && resp.siguientes.length) m.append(h("p", { class: "rotulo-chips", texto: "También puedes preguntar" }), chips(resp.siguientes));
    lista.append(m);
    return m;
  }

  function dibujarEscribiendo() {
    const m = h("div", { class: "msg a" }, h("div", { class: "burbuja escribiendo", "aria-hidden": "true" }, h("i"), h("i"), h("i")), h("span", { class: "solo-lectura", texto: "Buscando la respuesta" }));
    lista.append(m);
    irAlFinal();
    return m;
  }

  function mostrarSaludo() {
    const resp = { tipo: "saludo", bloques: [{ tipo: "texto", texto: TEXTOS.saludo }], opciones: EJEMPLOS.map((e) => ({ etiqueta: e, accion: { pregunta: e } })) };
    dibujarAsistente(resp);
  }

  // ---- preguntar -----------------------------------------------------------------------------------------------------------------------
  async function preguntar(texto, opcion = null) {
    if (ocupado) return;
    const t = String(texto || "").trim();
    if (!opcion && !t) return;
    ocupado = true;
    entrada.disabled = true;
    enviarBtn.disabled = true;
    quitarChips();
    const visible = opcion ? opcion.etiqueta : t;
    mensajes.push({ r: "u", t: visible });
    dibujarUsuario(visible);
    if (!opcion) entrada.value = "";
    const espera = dibujarEscribiendo();
    let resp;
    try {
      const d = dialogo();
      resp = opcion ? await d.preguntar(opcion.accion.pregunta || "", { forzar: opcion.accion.forzar || null, consulta: opcion.accion.consulta || null, vehiculo: opcion.accion.vehiculo || null, norma: opcion.accion.norma || null }) : await d.preguntar(t);
    } catch {
      resp = { tipo: "error", bloques: [{ tipo: "texto", texto: TEXTOS.error }], opciones: [] };
    }
    espera.remove();
    const msg = { r: "a", resp };
    mensajes.push(msg);
    const nodo = dibujarAsistente(resp, true, msg);
    irAlInicioDe(nodo);
    guardar();
    ocupado = false;
    entrada.disabled = false;
    enviarBtn.disabled = false;
    entrada.focus({ preventScroll: true });
  }

  function elegir(opcion) {
    preguntar("", opcion);
  }

  function nuevaConversacion() {
    mensajes = [];
    dialogoCache = null;
    lista.textContent = "";
    borrar(sesion, CLAVE_CHAT);
    mostrarSaludo();
    entrada.focus({ preventScroll: true });
  }

  function restaurar() {
    const crudo = leer(sesion, CLAVE_CHAT);
    if (!crudo) return false;
    try {
      const g = JSON.parse(crudo);
      if (!g || g.v !== 1 || !Array.isArray(g.msgs) || !g.msgs.length) return false;
      mensajes = g.msgs.filter((m) => m && (m.r === "u" || m.r === "a"));
      mensajes.forEach((m, i) => {
        if (m.r === "u") dibujarUsuario(String(m.t || ""));
        else if (m.resp && Array.isArray(m.resp.bloques)) dibujarAsistente(m.resp, i === mensajes.length - 1, m);
      });
      if (g.previo && typeof g.previo === "object") dialogo().estado.previo = g.previo;
      irAlFinal();
      return true;
    } catch {
      borrar(sesion, CLAVE_CHAT);
      return false;
    }
  }

  // ---- abrir / cerrar --------------------------------------------------------------------------------------------------------------------
  let temporizadorGlobo = null;
  function abrir(conFoco = true) {
    clearTimeout(temporizadorGlobo);
    globo.hidden = true;
    panel.hidden = false;
    lanzador.hidden = true;
    lanzador.setAttribute("aria-expanded", "true");
    marcarVisto();
    if (!lista.childElementCount) mostrarSaludo();
    if (conFoco) entrada.focus({ preventScroll: true });
  }
  function cerrar() {
    panel.hidden = true;
    lanzador.hidden = false;
    lanzador.setAttribute("aria-expanded", "false");
    marcarVisto();
    lanzador.focus({ preventScroll: true });
  }

  lanzador.addEventListener("click", () => abrir(true));
  btnCerrar.addEventListener("click", cerrar);
  btnNueva.addEventListener("click", nuevaConversacion);
  // Escape cierra el panel; ninguna tecla escrita aqui llega a los atajos de teclado de la pagina
  raiz.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) cerrar(); e.stopPropagation(); });
  raiz.addEventListener("keyup", (e) => e.stopPropagation());
  raiz.addEventListener("keypress", (e) => e.stopPropagation());
  panel.querySelector("form").addEventListener("submit", (e) => { e.preventDefault(); preguntar(entrada.value); });

  document.body.append(anfitrion);
  restaurar();

  // ---- apertura automatica ----------------------------------------------------------------------------------------------------------
  let aperturaProgramada = false;
  function programarApertura() {
    if (aperturaProgramada) return;
    aperturaProgramada = true;
    const yaVisto = leer(local, CLAVE_VISTO) === "1";
    const quiereAbrir = cfg.apertura === "siempre" || (cfg.apertura === "primera-visita" && !yaVisto);
    if (!quiereAbrir) return;
    if (window.innerWidth >= 900) setTimeout(() => { if (panel.hidden && !anfitrion.hidden) abrir(false); }, cfg.retardoMs);
    else {
      // en pantallas chicas un panel que se abre solo tapa la pagina: solo se muestra un globo discreto
      setTimeout(() => { if (panel.hidden && !anfitrion.hidden) { globo.hidden = false; marcarVisto(); } }, cfg.retardoMs);
      temporizadorGlobo = setTimeout(() => { globo.hidden = true; }, cfg.retardoMs + 9000);
    }
  }

  // Un aviso de la pagina (el de cookies del sitio, que exige una eleccion) tiene prioridad: mientras este en pantalla el asistente
  // queda oculto, y recien cuando la persona elige aparece (y se abre solo, si corresponde). Si el aviso vuelve (se reabre desde el pie), se oculta de nuevo.
  if (cfg.noTapar) {
    const hayAviso = () => { try { return Boolean(document.querySelector(cfg.noTapar)); } catch { return false; } };
    const revisar = () => {
      anfitrion.hidden = hayAviso();
      if (!anfitrion.hidden) programarApertura();
    };
    new MutationObserver(revisar).observe(document.body, { childList: true });
    revisar();
  } else programarApertura();

  const api = { version: VERSION, abrir: () => abrir(true), cerrar, preguntar: (t) => { abrir(false); return preguntar(t); }, anfitrion };
  window.EnergiasFuturoAsistente = api;
  // si lo trajo el cargador liviano del boton, la persona ya lo toco: se abre de inmediato, y el cargador se entera para retirar su boton
  if (cfg.abrirAlMontar) abrir(true);
  try { document.dispatchEvent(new CustomEvent("ef-asistente-listo")); } catch { /* un navegador sin CustomEvent no necesita el aviso */ }
  return api;
}

// Si los datos no estan publicados (o el sitio no responde), el asistente no aparece: un boton que solo da errores seria peor que nada.
async function datosDisponibles(env) {
  if (env.CARGADOR) return true;
  const sesion = almacen("sessionStorage");
  if (leer(sesion, CLAVE_DATOS) === "1") return true;
  try {
    const r = await fetch(`${urlSitio(env)}/data/ia_catalogo.json`, { method: "HEAD" });
    if (r.ok) { escribir(sesion, CLAVE_DATOS, "1"); return true; }
  } catch { /* sin red o sin datos: no se muestra */ }
  return false;
}

async function iniciar() {
  try {
    const cfg = configDeLaPagina();
    if (await datosDisponibles(crearEntorno(cfg, window.location))) montar(cfg);
  } catch (e) {
    if (window.console && console.warn) console.warn("Asistente de datos: no se pudo iniciar", e);
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  else iniciar();
}
return { VERSION, montar };
})();
})();
