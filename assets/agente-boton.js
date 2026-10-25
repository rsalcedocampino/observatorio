/* Cargador del asistente de datos de Energias Futuro (solo el boton): paquete generado por agente_web/construir.mjs (no editar a mano). */
(function () {
"use strict";
const __mod = Object.create(null);
const __req = (id) => __mod[id];
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
__mod["agente_web/src/boton.js"] = (function () {
// Cargador liviano del asistente de datos (agente-boton.js). Las paginas del sitio cargan ESTE archivo (unos pocos KB) y no el asistente completo (agente.js, unos 145 KB con gzip): dibuja solo
// el boton flotante y trae el asistente cuando la persona lo toca; si acerca el cursor o el dedo, empieza a bajarlo antes para que ya este listo. Quien nunca lo abre no descarga ni ejecuta el
// resto (pedido de #1, 2026-10-25: el asistente no debe pesar en las 58 paginas, incluidas las de mapa, si nadie lo usa).
// Mismas reglas que el asistente: no aparece si los datos no estan publicados (un HEAD a ia_catalogo.json), queda oculto mientras este en pantalla el aviso que nombra `data-no-tapar` (el de
// cookies del sitio), todo se dibuja con textContent dentro de un Shadow DOM y el boton usa los mismos estilos. Lee los mismos atributos data-* y se los pasa al asistente completo.
// No hace ninguna otra peticion: el HEAD, la descarga del asistente (y su precarga) y nada mas.
const { baseDeDatos, leerConfig } = __req("agente_web/src/config_widget.js");
const { ESTILOS_BASE } = __req("agente_web/src/estilos_base.js");
const { icono } = __req("agente_web/src/iconos.js");

const CLAVE_DATOS = "ef_asistente_datos_v1";            // la misma marca que usa el asistente completo: el HEAD se hace una sola vez por visita
const SCRIPT_PROPIO = typeof document !== "undefined" ? document.currentScript : null;
const TEXTOS = { boton: "Asistente de datos", abriendo: "Abriendo…", fallo: "No se pudo abrir. Toca para reintentar" };

// La direccion del asistente completo: la misma carpeta y el mismo token ?v= del cargador («assets/agente-boton.js?v=123» -> «assets/agente.js?v=123»).
function urlDelAsistente(srcDelBoton) {
  return String(srcDelBoton).replace(/agente-boton\.js(?=$|[?#])/, "agente.js");
}

// Los atributos data-* del cargador (apertura, no-tapar, opiniones, sitio, tema...) pasan tal cual al asistente completo; la marca propia del cargador no.
function atributosParaElAsistente(atributos) {
  return Array.from(atributos || []).filter((a) => /^data-/.test(a.name) && a.name !== "data-ef-asistente-boton").map((a) => [a.name, a.value]);
}

// ---- utilidades (las mismas del asistente completo, en chico) ----------------------------------------------------------------------------------
function almacen(tipo) {
  try { return window[tipo]; } catch { return null; }
}
function leer(a, k) {
  try { return a ? a.getItem(k) : null; } catch { return null; }
}
function escribir(a, k, v) {
  try { if (a) a.setItem(k, v); } catch { /* sin almacenamiento: funciona igual */ }
}
function elemento(tag, props = {}, ...hijos) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "texto") el.textContent = v;
    else el.setAttribute(k, v === true ? "" : String(v));
  }
  for (const c of hijos) if (c) el.append(c);
  return el;
}

function aplicarEstilos(raiz) {
  try {
    const hoja = new CSSStyleSheet();
    hoja.replaceSync(ESTILOS_BASE);
    raiz.adoptedStyleSheets = [hoja];
    return;
  } catch { /* navegador sin hojas construibles: se usa <style> */ }
  raiz.append(elemento("style", { texto: ESTILOS_BASE }));
}

// Si los datos no estan publicados (o el sitio no responde) no aparece nada: un boton que solo diera errores seria peor que ninguno.
async function datosDisponibles(cfg) {
  if (cfg.cargador) return true;
  const sesion = almacen("sessionStorage");
  if (leer(sesion, CLAVE_DATOS) === "1") return true;
  try {
    const r = await fetch(`${baseDeDatos(cfg, window.location)}/data/ia_catalogo.json`, { method: "HEAD" });
    if (r.ok) { escribir(sesion, CLAVE_DATOS, "1"); return true; }
  } catch { /* sin red o sin datos: no se muestra */ }
  return false;
}

// Trae el asistente completo: un <script> con los mismos atributos data-* (mas la marca del asistente y, si la persona toco el boton, la orden de abrirse apenas se monte).
function cargarAsistente(script, { abrir }) {
  const s = document.createElement("script");
  s.src = urlDelAsistente(script.src);
  for (const [k, v] of atributosParaElAsistente(script.attributes)) s.setAttribute(k, v);
  s.setAttribute("data-ef-asistente", "");
  if (abrir) s.setAttribute("data-ef-abrir", "1");
  s.async = true;
  document.head.append(s);
  return s;
}

function montarBoton(cfg, script) {
  const anfitrion = elemento("div", { "data-ef-asistente-boton-raiz": "1" });
  if (cfg.tema === "claro" || cfg.tema === "oscuro") anfitrion.setAttribute("data-tema", cfg.tema);
  const raiz = anfitrion.attachShadow({ mode: "open" });
  aplicarEstilos(raiz);
  const rotulo = elemento("span", { class: "rotulo", texto: TEXTOS.boton });
  const boton = elemento("button", { type: "button", class: "lanzador", "aria-haspopup": "dialog", "aria-expanded": "false" }, icono("chat"), rotulo);
  raiz.append(boton);

  let precargado = false;
  let cargando = false;
  // la intencion de abrirlo (cursor encima, foco o dedo) basta para empezar a bajar el asistente: cuando se toque el boton ya estara en la memoria del navegador
  const precargar = () => {
    if (precargado) return;
    precargado = true;
    try { fetch(urlDelAsistente(script.src), { credentials: "same-origin" }).catch(() => { precargado = false; }); } catch { precargado = false; }
  };
  for (const evento of ["pointerenter", "focus", "touchstart"]) boton.addEventListener(evento, precargar, { passive: true });

  boton.addEventListener("click", () => {
    if (cargando) return;
    cargando = true;
    boton.setAttribute("aria-busy", "true");
    rotulo.textContent = TEXTOS.abriendo;
    const listo = () => anfitrion.remove();               // el asistente completo ya se monto (y se abrio): este boton sobra
    document.addEventListener("ef-asistente-listo", listo, { once: true });
    const s = cargarAsistente(script, { abrir: true });
    s.addEventListener("error", () => {
      cargando = false;
      precargado = false;
      s.remove();
      document.removeEventListener("ef-asistente-listo", listo);
      boton.removeAttribute("aria-busy");
      rotulo.textContent = TEXTOS.fallo;
    });
  });

  // el aviso de la pagina (el de cookies, que exige una eleccion) tiene prioridad: mientras este en pantalla, el boton queda oculto
  if (cfg.noTapar) {
    const hayAviso = () => { try { return Boolean(document.querySelector(cfg.noTapar)); } catch { return false; } };
    const revisar = () => { anfitrion.hidden = hayAviso(); };
    new MutationObserver(revisar).observe(document.body, { childList: true });
    revisar();
  }
  document.body.append(anfitrion);
  return anfitrion;
}

async function iniciar() {
  try {
    const script = SCRIPT_PROPIO || document.querySelector("script[data-ef-asistente-boton]");
    if (!script) return;
    if (document.querySelector("[data-ef-asistente-raiz], [data-ef-asistente-boton-raiz]")) return;      // ya hay un asistente (o un cargador) en esta pagina
    const cfg = leerConfig(script, window.EF_ASISTENTE_CONFIG);
    if (!(await datosDisponibles(cfg))) return;
    // las aperturas automaticas («primera-visita», «siempre») necesitan el asistente completo desde el principio: no hay nada que dejar para despues
    if (cfg.apertura !== "nunca") { cargarAsistente(script, { abrir: false }); return; }
    montarBoton(cfg, script);
  } catch (e) {
    if (window.console && console.warn) console.warn("Asistente de datos: no se pudo iniciar el boton", e);
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  else iniciar();
}
return { urlDelAsistente, atributosParaElAsistente };
})();
})();
