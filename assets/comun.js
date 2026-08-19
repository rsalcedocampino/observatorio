/* Energías Futuro — utilidades compartidas: navegacion, formato,
   tablas ordenables y graficos SVG propios (sin dependencias externas). */
(function () {
  "use strict";

  // Blindaje de Leaflet contra una carrera del renderer canvas: si un _redraw quedó agendado
  // (requestAnimFrame) y el mapa/renderer ya se removió (map.remove(), p.ej. al recrear el mapa
  // al cambiar de territorio), this._ctx queda undefined y _clear() revienta con
  // "Cannot read properties of undefined (reading 'clearRect'/'save')". Volvemos _redraw/_clear
  // no-op cuando el renderer ya está desmontado (no afecta la operación normal, donde _ctx y _map
  // existen). Solo aplica en páginas con Leaflet cargado.
  if (window.L && L.Canvas && !L.Canvas.__pwGuarded) {
    L.Canvas.__pwGuarded = true;
    const cp = L.Canvas.prototype;
    ["_redraw", "_clear"].forEach(function (nombre) {
      const orig = cp[nombre];
      if (typeof orig === "function") {
        cp[nombre] = function () {
          if (!this._ctx || !this._map || !this._container) return;
          return orig.apply(this, arguments);
        };
      }
    });
  }

  const GRUPOS = [
    ["Mapas", [
      ["mapas.html", "Mapas Interactivos con Capas"],
      ["cargadores-cortes.html", "Cargadores Públicos y Cortes de Energía"],
      ["mapa-carga.html", "Infraestructura de Carga"],
    ]],
    ["Reporte Regional", [
      ["reporte-regional.html", "Reporte Regional"],
      ["vulnerabilidad.html", "Vulnerabilidad energética"],
      ["valor-parque.html", "Valor del parque"],
      ["censo-electricidad.html", "Electricidad en las viviendas"],
    ]],
    ["Mercado", [
      ["tracker.html", "Meta 2035"],
      ["vehiculo.html", "Vehículo 360"],
      ["rotacion.html", "Rotación de inventario"],
      ["elasticidad.html", "Elasticidad bencina-EV"],
      ["buses.html", "Buses eléctricos"],
      ["grupoauto.html", "Grupo automotriz 360"],
      ["inversion.html", "Inversión verde"],
      ["permisos.html", "Parque de vehículos"],
    ]],
    ["TCO/Costos", [
      ["tco.html", "Costo total (TCO)"],
    ]],
    ["Importaciones", [
      ["radar.html", "Vehículos"],
      ["baterias.html", "Baterías de litio"],
    ]],
    ["Carga", [
      ["operadores.html", "Operadores"],
      ["infraestructura.html", "Infraestructura (SEC)"],
      ["sitios.html", "Selector de sitios"],
      ["costo.html", "Bencina vs Enchufe"],
      ["horas.html", "Mejor hora"],
      ["duales.html", "Estaciones duales"],
      ["autonomia.html", "Brechas de autonomía"],
      ["conectores-red.html", "Conectores flota-red"],
      ["resiliencia.html", "Resiliencia ante cortes"],
      ["concentracion.html", "Concentración del mercado"],
      ["petroleras.html", "Transición de las petroleras"],
      ["combustible.html", "Precio de combustible"],
    ]],
    ["Energía", [
      ["riesgo.html", "Cortes de energía"],
      ["probabilidad-cortes.html", "Probabilidad de cortes"],
      ["bess-cortes.html", "Almacenamiento (BESS)"],
      ["demanda-ev.html", "Demanda del parque EV"],
      ["red-electrica.html", "Red eléctrica y potencial"],
      ["pelp.html", "Chile vs PELP"],
      ["integracion.html", "Integración vertical"],
      ["generacion.html", "Parque de generación"],
    ]],
    ["Censo Nacional", [
      ["censo.html", "Censo Nacional"],
      ["censo-proyectado.html", "Censo proyectado"],
    ]],
    ["Normativa", [
      ["normativa.html", "Metas y marco legal"],
      ["reporte-energetico.html", "Reporte Energético 2026 CCGE"],
    ]],
    ["Seguridad", [
      ["rescate.html", "Fichas de rescate"],
      ["fichacober.html", "Cobertura de rescate"],
      ["seguros.html", "Coberturas EV"],
    ]],
  ];

  // Compatibilidad: no todos los navegadores disparan "input" al cambiar un <select>.
  // Puente global: cuando un select dispara "change", re-emitimos "input" para que
  // todos los filtros del sitio reaccionen igual en cualquier navegador.
  document.addEventListener("change", ev => {
    const t = ev.target;
    if (t && t.tagName === "SELECT") {
      t.dispatchEvent(new Event("input", { bubbles: false }));
    }
  }, true);

  const CSS = getComputedStyle(document.documentElement);
  function color(v) { return CSS.getPropertyValue(v).trim() || v; }
  const SERIES = ["--s1", "--s2", "--s3", "--s4", "--s5", "--s6"];

  // ---------- iconos SVG por modulo (monocromos, stroke actual)
  const IC = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICONOS = {
    "index.html": IC('<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>'),
    "mapas.html": IC('<path d="M9 3L3 5.5v15L9 18l6 3 6-2.5v-15L15 6z"/><path d="M9 3v15M15 6v15"/>'),
    "reporte-regional.html": IC('<path d="M12 21s-6-5.2-6-9.5A6 6 0 0 1 18 11.5c0 4.3-6 9.5-6 9.5z"/><path d="M9.5 11.3v-1.8M12 11.3V8M14.5 11.3v-1"/>'),
    "radar.html": IC('<path d="M3 15h18l-2 4H5z"/><path d="M7 15V9h4v6M11 9l6-3v9"/>'),
    "tracker.html": IC('<path d="M5 21V4"/><path d="M5 4h13l-2.5 3.5L18 11H5"/>'),
    "vehiculo.html": IC('<path d="M4 15l1.5-5.5C5.8 8.6 6.6 8 7.5 8h9c.9 0 1.7.6 2 1.5L20 15"/><rect x="3" y="14" width="18" height="4" rx="1.5"/><circle cx="7.5" cy="18.5" r="1.4"/><circle cx="16.5" cy="18.5" r="1.4"/>'),
    "operadores.html": IC('<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>'),
    "sitios.html": IC('<path d="M12 21s-6.5-5.6-6.5-10.4A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.6C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.2"/>'),
    "costo.html": IC('<circle cx="12" cy="12" r="9"/><path d="M12 6.5v11M14.8 8.7c-.6-.9-1.6-1.4-2.8-1.4-1.7 0-3 .9-3 2.3 0 2.9 6 1.7 6 4.6 0 1.4-1.3 2.3-3 2.3-1.2 0-2.2-.5-2.8-1.4"/>'),
    "horas.html": IC('<circle cx="12" cy="12" r="9"/><path d="M12 6.5V12l3.5 2.5"/>'),
    "riesgo.html": IC('<path d="M12 3L2.5 20h19z"/><path d="M12 9.5v5M12 17.6v.4"/>'),
    "baterias.html": IC('<rect x="3" y="8" width="16" height="10" rx="2"/><path d="M21 11.5v3M6.5 11l-1.5 3h3l-1.5 3"/>'),
    "rescate.html": IC('<path d="M12 3l8 3v6c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V6z"/><path d="M12 8.5v5M9.5 11h5"/>'),
  };
  // paginas de cruces: reutilizan iconos afines
  ICONOS["rotacion.html"] = ICONOS["radar.html"];
  ICONOS["elasticidad.html"] = ICONOS["costo.html"];
  ICONOS["valor-parque.html"] = ICONOS["vehiculo.html"];
  ICONOS["buses.html"] = ICONOS["vehiculo.html"];
  ICONOS["inversion.html"] = IC('<path d="M3 17l5-5 3 3 4-4.5"/><path d="M15 10.5h4v4"/><path d="M3 21h18"/>');
  ICONOS["generacion.html"] = IC('<path d="M12 2v6M12 8l-4 6h8l-4 6"/><path d="M5 5l1.5 1.5M19 5l-1.5 1.5"/>');
  ICONOS["combustible.html"] = IC('<path d="M5 21V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16H4"/><path d="M14 8h2.5a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 0 3 0V8l-2.5-2.5"/><path d="M7 8h5"/>');
  ICONOS["permisos.html"] = IC('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 15V9h3a2 2 0 0 1 0 4H8"/>');
  ICONOS["duales.html"] = ICONOS["costo.html"];
  ICONOS["autonomia.html"] = ICONOS["sitios.html"];
  ICONOS["conectores-red.html"] = ICONOS["operadores.html"];
  ICONOS["tco.html"] = ICONOS["costo.html"];
  ICONOS["resiliencia.html"] = ICONOS["riesgo.html"];
  ICONOS["probabilidad-cortes.html"] = ICONOS["riesgo.html"];
  ICONOS["red-electrica.html"] = ICONOS["operadores.html"];
  ICONOS["censo-electricidad.html"] = ICONOS["sitios.html"];
  ICONOS["normativa.html"] = IC('<path d="M12 3v18M5 21h14"/><path d="M5 7h14M7 7l-3 6h6zM17 7l-3 6h6z"/>');
  ICONOS["reporte-energetico.html"] = IC('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M12 10l-2 4h3l-1 4"/>');
  ICONOS["seguros.html"] = IC('<path d="M12 3l8 3v6c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V6z"/><path d="M12 8v7M14.6 9.8c-.5-.7-1.4-1.2-2.6-1.2-1.4 0-2.5.8-2.5 1.9 0 2.4 5 1.4 5 3.8 0 1.1-1.1 1.9-2.5 1.9-1.2 0-2.1-.5-2.6-1.2"/>');
  ICONOS["vulnerabilidad.html"] = ICONOS["riesgo.html"];
  ICONOS["bess-cortes.html"] = ICONOS["baterias.html"];
  ICONOS["demanda-ev.html"] = ICONOS["operadores.html"];
  ICONOS["pelp.html"] = ICONOS["tracker.html"];
  ICONOS["integracion.html"] = IC('<path d="M6 3v6a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v6"/><circle cx="6" cy="3" r="1.6"/><circle cx="18" cy="21" r="1.6"/><circle cx="18" cy="9" r="1.6"/><circle cx="6" cy="15" r="1.6"/>');
  ICONOS["concentracion.html"] = IC('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>');
  ICONOS["grupoauto.html"] = IC('<circle cx="12" cy="6" r="2.6"/><circle cx="6" cy="17" r="2.6"/><circle cx="18" cy="17" r="2.6"/><path d="M12 8.5v3.5M12 12l-4.4 2.8M12 12l4.4 2.8"/>');
  ICONOS["petroleras.html"] = IC('<path d="M5 20V7l6-3 6 3v13M3 20h18M9 11h4M9 15h4"/><path d="M19 20v-6l2 1v5"/>');
  ICONOS["fichacober.html"] = IC('<path d="M12 3l8 3v6c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>');
  ICONOS["infraestructura.html"] = IC('<rect x="4" y="20" width="4" height="1.5"/><rect x="10" y="16" width="4" height="5.5"/><rect x="16" y="10" width="4" height="11.5"/><path d="M4 20V9l3-2 3 2M7 7V4"/>');
  ICONOS["censo.html"] = IC('<circle cx="9" cy="7" r="3"/><path d="M3.5 21v-1.5a5.5 5.5 0 0 1 11 0V21"/><path d="M16 4.2a3 3 0 0 1 0 5.6"/><path d="M18 14.2a5 5 0 0 1 2.5 4.3V21"/>');
  ICONOS["censo-proyectado.html"] = ICONOS["censo.html"];
  ICONOS["cargadores-cortes.html"] = IC('<path d="M13 2L4 14h6l-1 8 9-12h-6z"/><path d="M3 3l18 18"/>');
  ICONOS["mapa-carga.html"] = IC('<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>');
  function icono(pagina) { return ICONOS[pagina] || ""; }

  // ---------- colaboradores (empresas / instituciones): banda de logos ARRIBA del pie.
  // Para agregar uno: deja el archivo en web/assets/colaboradores/ y suma una linea aqui:
  //   { nombre: "Nombre visible", logo: "assets/colaboradores/archivo.svg", url: "https://..." }
  // (url es opcional). Si la lista esta vacia, la seccion NO se muestra.
  const COLABORADORES = [
    { nombre: "ANDES Rental", logo: "assets/colaboradores/andes-rental.jpg", url: "https://www.linkedin.com/company/andes-rental/" },
    { nombre: "Representaciones RB", logo: "assets/colaboradores/representaciones-rb.jpg", url: "https://www.linkedin.com/company/representaciones-r-b/" },
    { nombre: "AVEC — Asociación Gremial de Vehículos Eléctricos de Chile", logo: "assets/colaboradores/avec.jpg", url: "https://www.linkedin.com/company/avec-ag/" },
  ];
  function renderColaboradores(lista) {
    const prev = document.getElementById("colaboradores");
    if (prev) prev.remove();
    if (!lista || !lista.length) return;
    const sec = document.createElement("section");
    sec.className = "colaboradores pw";
    sec.id = "colaboradores";
    // [CACHE-BUSTER] los logos son assets sin ?v=; si se agrega/cambia uno, un navegador que cacheó el
    // 404 previo (o la versión vieja) lo sigue mostrando ROTO. Reusamos el token de comun.js en la URL
    // del <img> para forzar una relectura fresca cuando cambia el token.
    const _cj = document.querySelector('script[src*="comun.js"]');
    const _ver = (_cj && (_cj.src.match(/[?&]v=([^&]+)/) || [])[1]) || "";
    const _q = _ver ? "?v=" + _ver : "";
    const chips = lista.map(c => {
      const img = `<img src="${esc(c.logo)}${_q}" alt="${esc(c.nombre)}" loading="lazy">`;
      return c.url
        ? `<a class="colab-logo" href="${esc(c.url)}" target="_blank" rel="noopener" title="${esc(c.nombre)}">${img}</a>`
        : `<span class="colab-logo" title="${esc(c.nombre)}">${img}</span>`;
    }).join("");
    sec.innerHTML = `<h3>Empresas e instituciones colaboradoras</h3><div class="colab-grid">${chips}</div>`;
    const f = document.querySelector("footer.pw");
    if (f) document.body.insertBefore(sec, f); else document.body.appendChild(sec);
  }

  // ---------- navegacion + pie
  function montarNav(activa) {
    const h = document.createElement("header");
    h.className = "pw";
    let nav = `<a href="index.html" class="${activa === "index.html" ? "activo" : ""}">Inicio</a>`;
    GRUPOS.forEach(([grupo, items]) => {
      const contiene = items.some(([f]) => f === activa);
      const sub = items.map(([f, t]) =>
        `<a href="${f}" class="${f === activa ? "activo" : ""}">${t}</a>`).join("");
      nav += `<div class="nav-grupo"><a class="${contiene ? "activo" : ""}" tabindex="0">${grupo}</a><div class="submenu">${sub}</div></div>`;
    });
    h.innerHTML = `<a href="index.html" class="marca"><img src="assets/logo-icon.png" alt="" width="28" height="28"><span>Energías Futuro</span></a><nav>${nav}</nav>`;
    document.body.prepend(h);

    // icono junto al titulo de la seccion
    const h1 = document.querySelector("main h1");
    if (h1 && ICONOS[activa] && activa !== "index.html") {
      h1.insertAdjacentHTML("afterbegin", `<span class="icono-h1">${ICONOS[activa]}</span>`);
    }

    const f = document.createElement("footer");
    f.className = "pw";
    f.innerHTML = "<strong>Desarrollado por <a href='https://www.linkedin.com/in/rsalcedoc/' target='_blank' rel='noopener'>Rodrigo Salcedo Campino</a> - Energías Futuro</strong><br>" +
      "Fuentes oficiales: ACERA, ANB (Academia Nacional de Bomberos), BCN – LeyChile, " +
      "CMF (Comisión para el Mercado Financiero), CNE (Comisión Nacional de Energía), " +
      "Coordinador Eléctrico Nacional, Euro NCAP, INE (Instituto Nacional de Estadísticas), " +
      "Ministerio de Energía (EcoCarga / PELP / IDE), SEC (Superintendencia de Electricidad " +
      "y Combustibles), Servicio Nacional de Aduanas y los operadores de carga. Cada cifra es " +
      "trazable a su fuente y está homologada por comuna (CUT INE), tipo de conector, estado " +
      "y tecnología.<br>" +
      "Elaboración propia.";
    document.body.appendChild(f);

    renderColaboradores(COLABORADORES);   // banda de logos arriba del pie (vacia -> no se muestra)
  }

  // ---------- formato
  const nf0 = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 1 });
  function fmt(v, dec) {
    if (v === null || v === undefined || Number.isNaN(v)) return "—";
    return (dec ? nf1 : nf0).format(v);
  }
  function clp(v) { return v == null ? "—" : "$" + nf0.format(Math.round(v)); }
  function pct(v) { return v == null ? "—" : nf1.format(v) + "%"; }

  // Escapa texto de DATOS antes de interpolarlo en HTML (innerHTML/bindPopup).
  // Neutraliza markup que pudiera colarse desde fuentes externas mutables (nombre de
  // estacion, operador, direccion de feeds de operadores/Aduana, etc.). NO aplicar
  // sobre HTML que arma el propio sitio: los `fmt` de las tablas producen markup
  // intencional. Expuesto en PW.esc para que los builders por pagina lo usen.
  function esc(v) {
    if (v == null) return "";
    return String(v).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ---------- tooltip compartido
  function crearTip(wrap) {
    const tip = document.createElement("div");
    tip.className = "chart-tip";
    wrap.appendChild(tip);
    return {
      mostrar(html, x, y) {
        tip.innerHTML = html;
        tip.style.display = "block";
        const r = wrap.getBoundingClientRect();
        let px = x + 14, py = y - 10;
        tip.style.left = "0px"; tip.style.top = "0px";
        const tr = tip.getBoundingClientRect();
        if (px + tr.width > r.width) px = x - tr.width - 14;
        if (py + tr.height > r.height) py = r.height - tr.height - 4;
        tip.style.left = Math.max(0, px) + "px";
        tip.style.top = Math.max(0, py) + "px";
      },
      ocultar() { tip.style.display = "none"; },
    };
  }

  function svgEl(tag, attrs) {
    const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  // ---------- etiquetas de eje temporal
  const MESES_ABR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  function etiquetaEje(lb) {
    const m = /^(\d{4})-(\d{2})/.exec(lb);
    if (m) return MESES_ABR[+m[2] - 1] + " " + m[1].slice(2);
    return lb;
  }
  // Indices a rotular: espaciado minimo en px, sin choques y con el ultimo siempre legible
  function indicesEje(n, X, anchoDisp) {
    const minPx = 56;
    const idx = [];
    const paso = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(anchoDisp / minPx))));
    let ultimaX = -Infinity;
    for (let i = 0; i < n; i += paso) {
      const x = X(i);
      if (x - ultimaX >= minPx) { idx.push(i); ultimaX = x; }
    }
    // el ultimo punto siempre se rotula; si choca con el anterior, se quita el anterior
    if (idx[idx.length - 1] !== n - 1) {
      while (idx.length && X(n - 1) - X(idx[idx.length - 1]) < minPx) idx.pop();
      idx.push(n - 1);
    }
    return new Set(idx);
  }
  function ponerEtiquetaX(svg, texto, x, y, esUltima, W) {
    const attrs = { y, "font-size": 11, fill: color("--ink-3") };
    if (esUltima && x > W - 40) {
      attrs.x = W - 2; attrs["text-anchor"] = "end";
    } else {
      attrs.x = x; attrs["text-anchor"] = "middle";
    }
    const t = svgEl("text", attrs);
    t.textContent = texto;
    svg.appendChild(t);
  }

  // ---------- grafico de lineas (series: [{nombre, valores}], labels: [..])
  function lineas(cont, cfg) {
    const el = typeof cont === "string" ? document.getElementById(cont) : cont;
    el.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "chart-wrap";
    el.appendChild(wrap);
    const W = el.clientWidth || 640, H = cfg.alto || 260;
    const m = { t: 14, r: 12, b: 26, l: 52 };
    const labels = cfg.labels, series = cfg.series;
    const todos = series.flatMap(s => s.valores).filter(v => v != null);
    const maxV = cfg.max != null ? cfg.max : Math.max(...todos, 1);
    const minV = cfg.min != null ? cfg.min : 0;
    const X = i => m.l + (W - m.l - m.r) * (labels.length === 1 ? 0.5 : i / (labels.length - 1));
    const Y = v => m.t + (H - m.t - m.b) * (1 - (v - minV) / (maxV - minV || 1));

    const svg = svgEl("svg", { width: "100%", viewBox: `0 0 ${W} ${H}` });
    wrap.appendChild(svg);
    const nTicks = 4;
    for (let i = 0; i <= nTicks; i++) {
      const v = minV + (maxV - minV) * i / nTicks;
      const y = Y(v);
      svg.appendChild(svgEl("line", { x1: m.l, x2: W - m.r, y1: y, y2: y, stroke: color("--grid"), "stroke-width": 1 }));
      const t = svgEl("text", { x: m.l - 7, y: y + 4, "text-anchor": "end", "font-size": 11, fill: color("--ink-3") });
      t.textContent = cfg.fmtY ? cfg.fmtY(v) : nf0.format(Math.round(v));
      svg.appendChild(t);
    }
    const rotular = indicesEje(labels.length, X, W - m.l - m.r);
    labels.forEach((lb, i) => {
      if (!rotular.has(i)) return;
      ponerEtiquetaX(svg, etiquetaEje(lb), X(i), H - 8, i === labels.length - 1, W);
    });
    series.forEach((s, si) => {
      const c = s.color || color(SERIES[si % SERIES.length]);
      let d = "", pen = false, primero = null, ultimo = null;
      s.valores.forEach((v, i) => {
        if (v == null) { pen = false; return; }
        d += (pen ? "L" : "M") + X(i).toFixed(1) + " " + Y(v).toFixed(1);
        pen = true;
        if (primero === null) primero = i;
        ultimo = i;
      });
      // relleno suave bajo la curva (opcional, para destacar brechas)
      if (s.area && primero !== null && ultimo !== null && ultimo > primero) {
        const base = Y(minV);
        const dArea = d + `L${X(ultimo).toFixed(1)} ${base.toFixed(1)}L${X(primero).toFixed(1)} ${base.toFixed(1)}Z`;
        svg.appendChild(svgEl("path", { d: dArea, fill: c, "fill-opacity": 0.12, stroke: "none" }));
      }
      const atributos = { d, fill: "none", stroke: c, "stroke-width": 2, "stroke-linejoin": "round" };
      if (s.dash) atributos["stroke-dasharray"] = "6 5";
      svg.appendChild(svgEl("path", atributos));
    });
    // separador vertical (ej. "Hoy"): cfg.lineaX = {i, texto}
    if (cfg.lineaX && cfg.lineaX.i != null && cfg.lineaX.i >= 0) {
      const x = X(cfg.lineaX.i);
      svg.appendChild(svgEl("line", {
        x1: x, x2: x, y1: m.t, y2: H - m.b,
        stroke: color("--ink-3"), "stroke-width": 1, "stroke-dasharray": "3 3",
      }));
      const t = svgEl("text", {
        x: x + 5, y: m.t + 11, "font-size": 10.5, "font-weight": 600, fill: color("--ink-2"),
      });
      t.textContent = cfg.lineaX.texto || "";
      svg.appendChild(t);
    }
    // linea de meta horizontal: cfg.lineaY = {v, texto}
    if (cfg.lineaY && cfg.lineaY.v != null) {
      const y = Y(cfg.lineaY.v);
      svg.appendChild(svgEl("line", {
        x1: m.l, x2: W - m.r, y1: y, y2: y,
        stroke: color("--ink-2"), "stroke-width": 1.2, "stroke-dasharray": "5 4",
      }));
      const t = svgEl("text", {
        x: W - m.r - 4, y: y - 5, "text-anchor": "end",
        "font-size": 11, "font-weight": 600, fill: color("--ink-2"),
      });
      t.textContent = cfg.lineaY.texto || "";
      svg.appendChild(t);
    }
    // capa hover: crosshair + tooltip
    const tip = crearTip(wrap);
    const linea = svgEl("line", { y1: m.t, y2: H - m.b, stroke: color("--axis"), "stroke-width": 1, opacity: 0 });
    svg.appendChild(linea);
    svg.addEventListener("mousemove", ev => {
      const r = svg.getBoundingClientRect();
      const x = (ev.clientX - r.left) * (W / r.width);
      let mejor = 0, dist = 1e9;
      labels.forEach((_, i) => { const d2 = Math.abs(X(i) - x); if (d2 < dist) { dist = d2; mejor = i; } });
      linea.setAttribute("x1", X(mejor)); linea.setAttribute("x2", X(mejor));
      linea.setAttribute("opacity", 1);
      const filas = series.map((s, si) => {
        const c = s.color || color(SERIES[si % SERIES.length]);
        const v = s.valores[mejor];
        return `<span style="color:${c}">●</span> ${s.nombre}: ${v == null ? "—" : (cfg.fmtV || (x2 => nf1.format(x2)))(v)}`;
      }).join("<br>");
      tip.mostrar(`<b>${etiquetaEje(labels[mejor])}</b>${filas}`,
        (ev.clientX - wrap.getBoundingClientRect().left),
        (ev.clientY - wrap.getBoundingClientRect().top));
    });
    svg.addEventListener("mouseleave", () => { tip.ocultar(); linea.setAttribute("opacity", 0); });

    if (series.length > 1) {
      const ley = document.createElement("div");
      ley.className = "leyenda";
      series.forEach((s, si) => {
        const c = s.color || color(SERIES[si % SERIES.length]);
        const sp = document.createElement("span");
        sp.style.setProperty("--c", c);
        sp.textContent = s.nombre;
        ley.appendChild(sp);
      });
      el.appendChild(ley);
    }
  }

  // ---------- barras horizontales (items: [{nombre, valor, extra}])
  function barras(cont, cfg) {
    const el = typeof cont === "string" ? document.getElementById(cont) : cont;
    el.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "chart-wrap";
    el.appendChild(wrap);
    const items = cfg.items;
    const W = el.clientWidth || 640;
    const alto = 26, m = { t: 4, r: 60, b: 4, l: Math.min(230, Math.max(...items.map(i => i.nombre.length)) * 7 + 14) };
    const H = m.t + m.b + items.length * alto;
    const maxV = Math.max(...items.map(i => i.valor || 0), 1);
    const svg = svgEl("svg", { width: "100%", viewBox: `0 0 ${W} ${H}` });
    wrap.appendChild(svg);
    const tip = crearTip(wrap);
    items.forEach((it, i) => {
      const y = m.t + i * alto;
      const w = (W - m.l - m.r) * (it.valor || 0) / maxV;
      const c = it.color || cfg.color || color("--s1");
      const t = svgEl("text", { x: m.l - 8, y: y + alto / 2 + 4, "text-anchor": "end", "font-size": 12, fill: color("--ink-2") });
      t.textContent = it.nombre.length > 30 ? it.nombre.slice(0, 29) + "…" : it.nombre;
      svg.appendChild(t);
      const r = svgEl("rect", { x: m.l, y: y + 5, width: Math.max(w, 1.5), height: alto - 10, rx: 4, fill: c });
      svg.appendChild(r);
      const tv = svgEl("text", { x: m.l + Math.max(w, 1.5) + 7, y: y + alto / 2 + 4, "font-size": 11.5, fill: color("--ink-2") });
      tv.textContent = (cfg.fmtV || (v => nf0.format(v)))(it.valor);
      svg.appendChild(tv);
      r.addEventListener("mousemove", ev => tip.mostrar(
        `<b>${it.nombre}</b>${(cfg.fmtV || (v => nf0.format(v)))(it.valor)}${it.extra ? "<br>" + it.extra : ""}`,
        ev.clientX - wrap.getBoundingClientRect().left,
        ev.clientY - wrap.getBoundingClientRect().top));
      r.addEventListener("mouseleave", () => tip.ocultar());
    });
  }

  // ---------- columnas verticales (labels + valores, una serie)
  function columnas(cont, cfg) {
    const el = typeof cont === "string" ? document.getElementById(cont) : cont;
    el.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "chart-wrap";
    el.appendChild(wrap);
    const W = el.clientWidth || 640, H = cfg.alto || 220;
    const m = { t: 12, r: 10, b: 26, l: 48 };
    const vals = cfg.valores, labels = cfg.labels;
    const maxV = Math.max(...vals.filter(v => v != null), 1);
    const n = vals.length;
    const ancho = (W - m.l - m.r) / n;
    const svg = svgEl("svg", { width: "100%", viewBox: `0 0 ${W} ${H}` });
    wrap.appendChild(svg);
    for (let i = 0; i <= 3; i++) {
      const v = maxV * i / 3, y = m.t + (H - m.t - m.b) * (1 - i / 3);
      svg.appendChild(svgEl("line", { x1: m.l, x2: W - m.r, y1: y, y2: y, stroke: color("--grid") }));
      const t = svgEl("text", { x: m.l - 6, y: y + 4, "text-anchor": "end", "font-size": 11, fill: color("--ink-3") });
      t.textContent = cfg.fmtY ? cfg.fmtY(v) : nf0.format(Math.round(v));
      svg.appendChild(t);
    }
    const tip = crearTip(wrap);
    vals.forEach((v, i) => {
      if (v == null) return;
      const h = (H - m.t - m.b) * v / maxV;
      const x = m.l + i * ancho + ancho * 0.15;
      const r = svgEl("rect", {
        x, y: H - m.b - h, width: ancho * 0.7, height: Math.max(h, 1), rx: Math.min(4, ancho * 0.3),
        fill: cfg.color || color("--s1"),
      });
      svg.appendChild(r);
      r.addEventListener("mousemove", ev => tip.mostrar(
        `<b>${etiquetaEje(labels[i])}</b>${(cfg.fmtV || (x2 => nf1.format(x2)))(v)}`,
        ev.clientX - wrap.getBoundingClientRect().left,
        ev.clientY - wrap.getBoundingClientRect().top));
      r.addEventListener("mouseleave", () => tip.ocultar());
    });
    const Xc = i => m.l + i * ancho + ancho / 2;
    const rotular = indicesEje(n, Xc, W - m.l - m.r);
    labels.forEach((lb, i) => {
      if (!rotular.has(i)) return;
      ponerEtiquetaX(svg, etiquetaEje(lb), Xc(i), H - 8, i === n - 1, W);
    });
    // anotaciones de contexto: [{i, texto}]
    (cfg.anotaciones || []).forEach(a => {
      if (a.i == null || a.i < 0 || a.i >= n) return;
      const x = m.l + a.i * ancho + ancho / 2;
      svg.appendChild(svgEl("line", {
        x1: x, x2: x, y1: m.t + 12, y2: H - m.b,
        stroke: color("--ink-3"), "stroke-width": 1, "stroke-dasharray": "3 3",
      }));
      const t = svgEl("text", {
        x: Math.min(x, W - 6), y: m.t + 8,
        "text-anchor": x > W * 0.7 ? "end" : "middle",
        "font-size": 10.5, fill: color("--ink-2"), "font-weight": 600,
      });
      t.textContent = a.texto;
      svg.appendChild(t);
    });
  }

  // ---------- tabla ordenable con buscador integrado
  // cols: [{k, titulo, num, fmt}] ; filas: array de objetos
  // opciones: {orden, asc, max, buscador: true por defecto (false para desactivar)}
  function tabla(cont, cols, filas, opciones) {
    const el = typeof cont === "string" ? document.getElementById(cont) : cont;
    opciones = opciones || {};
    let orden = opciones.orden || null;
    let asc = !!opciones.asc;
    let filtro = "";

    // estructura fija: [barra buscador][contenedor re-renderizable]
    el.innerHTML = "";
    let inputBusca = null;
    if (opciones.buscador !== false) {
      const barra = document.createElement("div");
      barra.className = "tabla-busca";
      inputBusca = document.createElement("input");
      inputBusca.type = "search";
      inputBusca.placeholder = "Buscar en la tabla...";
      const contador = document.createElement("span");
      contador.className = "pill";
      barra.appendChild(inputBusca);
      barra.appendChild(contador);
      el.appendChild(barra);
      inputBusca.addEventListener("input", () => {
        filtro = inputBusca.value.trim().toLowerCase();
        render();
      });
      el._contadorBusca = contador;
    }
    const contTabla = document.createElement("div");
    el.appendChild(contTabla);

    function normaliza(s) {
      return String(s).normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();
    }

    function render() {
      let datos = filas.slice();
      if (filtro) {
        const q = normaliza(filtro);
        datos = datos.filter(f => cols.some(c => {
          const v = f[c.k];
          return v != null && normaliza(v).includes(q);
        }));
      }
      const totalFiltrado = datos.length;
      if (orden) {
        datos.sort((a, b) => {
          const va = a[orden], vb = b[orden];
          if (va == null) return 1;
          if (vb == null) return -1;
          if (typeof va === "number") return asc ? va - vb : vb - va;
          return asc ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
        });
      }
      if (opciones.max) datos = datos.slice(0, opciones.max);
      if (el._contadorBusca) {
        el._contadorBusca.textContent = filtro
          ? totalFiltrado + " de " + filas.length
          : PW_fmtEntero(filas.length) + " filas";
      }
      const th = cols.map(c =>
        `<th class="${c.num ? "num" : ""} ${orden === c.k ? "orden" + (asc ? " asc" : "") : ""}" data-k="${c.k}">${c.titulo}</th>`
      ).join("");
      const cuerpo = datos.map(f => "<tr>" + cols.map(c => {
        const v = f[c.k];
        const txt = c.fmt ? c.fmt(v, f) : (v == null ? "—" : esc(v));
        return `<td class="${c.num ? "num" : ""}">${txt}</td>`;
      }).join("") + "</tr>").join("");
      contTabla.innerHTML = `<div class="scroll-x"><table class="pw"><thead><tr>${th}</tr></thead><tbody>${cuerpo}</tbody></table></div>`;
      contTabla.querySelectorAll("th").forEach(t => t.addEventListener("click", () => {
        const k = t.dataset.k;
        if (orden === k) asc = !asc; else { orden = k; asc = false; }
        render();
      }));
    }
    function PW_fmtEntero(n) { return new Intl.NumberFormat("es-CL").format(n); }
    render();
    return { actualizar(nuevas) { filas = nuevas; render(); } };
  }

  // =====================================================================
  // COMPONENTE MAPA — partes identificables para iterar mejoras:
  //   [BASE]      capas base seleccionables via basesMapa(): Mapa (CARTO claro/oscuro
  //               segun tema) · Satélite (Esri) · Relieve (OpenTopoMap) · Calles (OSM),
  //               todas sin API key + escala metrica. Puntos validados con enChile().
  //   [CONTROLES] barra comun controlesMapa(): pantalla completa, vista inicial,
  //               ver todo (encuadra), mi ubicacion (geo + punto más cercano).
  //               La comparten mapa() y choropleth() -> tocar una vez, afecta todos.
  //   [CAPAS]     grupos de puntos con selector cuando hay mas de una
  //   [CLUSTER]   agrupacion automatica sobre cfg.clusterDesde puntos (250)
  //   [PUNTOS]    circulos canvas con color/radio por dato
  //   [HOVER]     el punto/comuna crece o se resalta al pasar el mouse
  //   [TOOLTIP]   nombre al pasar el mouse (sin clic)
  //   [POPUP]     tarjeta al hacer clic (estilada en estilo.css)
  //   [LEYENDA]   leyendaMapa() bajo el mapa
  //   [FILTROS]   filtrosTerritorio() + filtros propios de cada pagina
  // API: mapa(cont, {capas, centro, zoom, alto, clusterDesde, sinCluster, comunas, lineas, foco, vacioMsg})
  // =====================================================================

  // [TERRITORIO] bounding box canonico de Chile — MISMO criterio que dentro_chile()
  // del pipeline (generar_datos.py): lat -56..-17, lon -76..-66. Red de seguridad en
  // el render para que ningun punto con coordenada corrupta se dibuje fuera del pais.
  // No inventa coordenadas: un punto malo simplemente no se mapea.
  function enChile(lat, lon) {
    return lat != null && lon != null && !Number.isNaN(lat) && !Number.isNaN(lon) &&
      lat >= -56 && lat <= -17 && lon >= -76 && lon <= -66;
  }

  // [BASE] fuentes cartograficas homologadas para TODOS los mapas del sitio.
  // Todas son raster sin API key -> funcionan en GitHub Pages sin exponer secretos.
  //   Mapa      CARTO claro/oscuro segun el tema (limpio, para leer datos encima)
  //   Satélite  Esri World Imagery (imagen real, gratis, sin token)
  //   Relieve   OpenTopoMap (curvas de nivel; util para red electrica y potencial)
  //   Calles    OpenStreetMap estandar (detalle urbano a color)
  // Tocar aqui cambia las capas base de mapa() y choropleth() a la vez.
  // [BASE ELEGIDA] base cartografica por defecto del sitio: "Calles" (OSM). La eleccion del usuario
  // PERSISTE entre re-renders (las paginas recrean el mapa al filtrar; sin esto, el selector de base
  // se reseteaba con cada filtro). Cada mapa nuevo arranca en la ultima base elegida en la pagina.
  let baseElegida = "Calles";
  function basesMapa(oscuro) {
    const bases = {};
    bases["Mapa"] = L.tileLayer(
      `https://{s}.basemaps.cartocdn.com/${oscuro ? "dark_all" : "light_all"}/{z}/{x}/{y}{r}.png`,
      { maxZoom: 19, attribution: "© OpenStreetMap © CARTO" });
    bases["Satélite"] = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, attribution: "Imágenes © Esri, Maxar, Earthstar Geographics" });
    bases["Relieve"] = L.tileLayer(
      "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      { maxZoom: 17, subdomains: "abc", attribution: "© OpenStreetMap, SRTM · © OpenTopoMap (CC-BY-SA)" });
    bases["Calles"] = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxZoom: 19, attribution: "© OpenStreetMap" });
    return bases;
  }

  // distancia haversine en km (para "el punto más cercano")
  function distKm(a, b) {
    const R = 6371, r = x => x * Math.PI / 180;
    const dLat = r(b[0] - a[0]), dLon = r(b[1] - a[1]);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  // [CONTROLES] barra comun a todos los mapas (mapa de puntos + coropletico):
  //   pantalla completa · vista inicial · ver todo (encuadra) · mi ubicacion.
  // opts: { centro, zoom, puntos?:[{ll,nombre}], bounds?:L.LatLngBounds }
  function controlesMapa(m, el, opts) {
    let miUbic = null;
    let btnFs = null;   // boton de pantalla completa (toggle: se le refleja aria-pressed)
    const Botones = L.Control.extend({
      options: { position: "topleft" },
      onAdd() {
        const div = L.DomUtil.create("div", "leaflet-bar pw-mapa-botones");
        // [A11Y] grupo etiquetado; cada boton es role=button con nombre accesible y teclado (Enter/Space)
        div.setAttribute("role", "group");
        div.setAttribute("aria-label", "Controles del mapa");
        const boton = (glifo, titulo, fn) => {
          const a = L.DomUtil.create("a", "", div);
          a.href = "#";
          a.setAttribute("role", "button");
          a.setAttribute("aria-label", titulo);
          a.title = titulo;
          // el glifo es decorativo: aria-hidden para que el lector use el aria-label, no el simbolo
          a.innerHTML = `<span aria-hidden="true">${glifo}</span>`;
          const activar = ev => { L.DomEvent.stop(ev); fn(a); };
          L.DomEvent.on(a, "click", activar);
          // teclado: en un <a> Enter ya dispara "click"; Space no (haria scroll) -> lo activamos aqui
          L.DomEvent.on(a, "keydown", ev => {
            if (ev.key === " " || ev.key === "Spacebar" || ev.keyCode === 32) activar(ev);
          });
          return a;
        };
        btnFs = boton("&#x26F6;", "Pantalla completa", () => {
          if (document.fullscreenElement) document.exitFullscreen();
          else el.requestFullscreen && el.requestFullscreen();
        });
        btnFs.setAttribute("aria-pressed", "false");
        boton("&#x2302;", "Vista inicial", () => m.setView(opts.centro, opts.zoom));
        boton("&#x2922;", "Ver todo", () => {
          const b = (opts.puntos && opts.puntos.length)
            ? L.latLngBounds(opts.puntos.map(p => p.ll))
            : (opts.bounds || null);
          if (b && b.isValid()) m.fitBounds(b.pad(0.12));
          else m.setView(opts.centro, opts.zoom);
        });
        if (navigator.geolocation) {
          boton("&#x2316;", "Mi ubicación" + (opts.puntos ? " (y punto más cercano)" : ""), a => {
            a.classList.add("cargando");
            a.setAttribute("aria-busy", "true");
            navigator.geolocation.getCurrentPosition(pos => {
              a.classList.remove("cargando"); a.removeAttribute("aria-busy");
              const ll = [pos.coords.latitude, pos.coords.longitude];
              if (miUbic) m.removeLayer(miUbic);
              miUbic = L.layerGroup([
                L.circle(ll, { radius: pos.coords.accuracy || 200, color: color("--s2"), weight: 1, fillOpacity: 0.08 }),
                L.circleMarker(ll, { radius: 7, color: "#fff", weight: 2, fillColor: color("--s2"), fillOpacity: 1 }),
              ]).addTo(m);
              let html = "<b>Estás aquí</b>";
              if (opts.puntos && opts.puntos.length) {
                let cerca = null, dmin = Infinity;
                opts.puntos.forEach(p => { const d = distKm(ll, p.ll); if (d < dmin) { dmin = d; cerca = p; } });
                if (cerca) html += `<br>Más cercano: ${cerca.nombre || "punto"} a ${dmin < 1 ? Math.round(dmin * 1000) + " m" : dmin.toFixed(1) + " km"}`;
              }
              miUbic.getLayers()[1].bindPopup(html).openPopup();
              m.setView(ll, 11);
            }, () => {
              a.classList.remove("cargando"); a.removeAttribute("aria-busy");
              alert("No se pudo obtener tu ubicación. Revisa los permisos del navegador.");
            }, { enableHighAccuracy: true, timeout: 8000 });
          });
        }
        return div;
      },
    });
    m.addControl(new Botones());
    document.addEventListener("fullscreenchange", () => {
      setTimeout(() => m.invalidateSize(), 120);
      // [A11Y] reflejar el estado del toggle de pantalla completa (salir con Esc es nativo del navegador)
      if (btnFs) {
        const activo = document.fullscreenElement === el;
        btnFs.setAttribute("aria-pressed", activo ? "true" : "false");
        const t = activo ? "Salir de pantalla completa" : "Pantalla completa";
        btnFs.setAttribute("aria-label", t); btnFs.title = t;
      }
    });
  }

  // [ZOOM TERRITORIO] bounds de un conjunto de comunas (por cut) usando geo_comunas.
  // Lo usan mapa() y choropleth() para el auto-zoom al filtrar por region/comuna, y esta
  // exportado en PW para los mapas con capa persistente que hacen fitBounds a mano.
  function boundsComunas(cuts) {
    const geo = window.PW_DATA && window.PW_DATA.geo_comunas;
    if (typeof L === "undefined" || !geo || !cuts || !cuts.length) return null;
    const set = new Set(cuts.map(c => String(c)));
    const fs = (geo.features || []).filter(f => set.has(String(f.properties.cut)));
    if (!fs.length) return null;
    const b = L.geoJSON({ type: "FeatureCollection", features: fs }).getBounds();
    return b && b.isValid() ? b : null;
  }

  // [NOTA PRECISION] aviso estandar bajo cada mapa del sitio (pedido del usuario 2026-08-18).
  // UNA vez por pagina (guard por clase) e idempotente entre re-renders al filtrar.
  function notaPrecisionMapa(el) {
    const main = el.closest("main") || document.body;
    if (main.querySelector(".pw-nota-precision")) return;
    const p = document.createElement("p");
    p.className = "nota pw-nota-precision";
    p.textContent = "Los puntos del mapa pueden estar corridos por tipo de capa y año de actualización.";
    el.insertAdjacentElement("afterend", p);
  }

  function mapa(cont, cfg) {
    const el = typeof cont === "string" ? document.getElementById(cont) : cont;
    if (typeof L === "undefined") {
      el.innerHTML = '<p class="nota">Mapa no disponible sin conexión (Leaflet/OSM se cargan de internet).</p>';
      return null;
    }
    el.innerHTML = "";
    el.classList.add("pw-mapa");
    el.style.height = (cfg.alto || 480) + "px";

    const centro = cfg.centro || [-33.45, -70.66];
    const zoom = cfg.zoom || 5;
    const m = L.map(el, { preferCanvas: true, zoomSnap: 0.5 }).setView(centro, zoom);

    // [BASE] capas base homologadas (Mapa/Satélite/Relieve/Calles) + escala
    const raiz = document.documentElement;
    const oscuro = raiz.dataset.theme === "dark" ||
      (raiz.dataset.theme !== "light" && window.matchMedia &&
       window.matchMedia("(prefers-color-scheme: dark)").matches);
    const bases = basesMapa(oscuro);
    (bases[baseElegida] || bases["Calles"] || bases["Mapa"]).addTo(m);
    m.on("baselayerchange", e => { baseElegida = e.name; });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(m);

    // pane para el coropletico de fondo (debajo de todo lo demas)
    m.createPane("pw-comunas").style.zIndex = 250;

    // acumula todos los puntos para "ver todo" y para "punto más cercano"
    const todosPts = [];   // {ll:[lat,lon], nombre}
    let fueraChile = 0;    // puntos descartados por caer fuera del territorio

    // [CONTROLES] pantalla completa · vista inicial · ver todo · mi ubicacion
    controlesMapa(m, el, { centro, zoom, puntos: todosPts });

    // [CAPAS] + [CLUSTER] + [PUNTOS] + [TOOLTIP] + [POPUP]
    // un solo canvas para puntos Y lineas: si estuvieran en canvas separados, el de arriba
    // interceptaria los eventos del mouse del de abajo (por eso las lineas no respondian).
    // tolerance da un margen de acierto (~10 px) para trazos finos y puntos pequeños.
    const renderer = L.canvas({ padding: 0.3, tolerance: 10 });
    const clusterDesde = cfg.clusterDesde || 250;
    const control = {};

    // [COMUNAS] capa coroplética de fondo opcional (cfg.comunas = {nombre, valores, fmt, visible, tip})
    //   valores: {cut -> numero}. Colorea los poligonos de geo_comunas por quintiles.
    //   tip (opcional): (cut, comuna, valor) -> string HTML para un tooltip enriquecido por comuna;
    //   sin tip, cae al formato simple "comuna: fmt(valor)".
    //   colorNulo (opcional): color de relleno para las comunas SIN valor (por defecto gris); p.ej.
    //   amarillo claro para marcar "con luz / sin corte" cuando los valores son las zonas con corte.
    if (cfg.comunas && window.PW_DATA && window.PW_DATA.geo_comunas) {
      const cc = cfg.comunas;
      const vals = Object.values(cc.valores).filter(v => v != null && !Number.isNaN(v)).sort((a, b) => a - b);
      const qn = p => vals.length ? vals[Math.min(vals.length - 1, Math.floor(p * vals.length))] : 0;
      const cortes = [qn(0.2), qn(0.4), qn(0.6), qn(0.8)];
      const colorDe = v => {
        if (v == null || Number.isNaN(v)) return cc.colorNulo || (oscuro ? "#2c2c2a" : "#e8e7e2");
        let i = 0; while (i < 4 && v > cortes[i]) i++;
        return SEQ[i];
      };
      const fmtc = cc.fmt || (v => v == null ? "sin dato" : nf1.format(v));
      const capaC = L.geoJSON(window.PW_DATA.geo_comunas, {
        pane: "pw-comunas",
        style: f => ({ fillColor: colorDe(cc.valores[f.properties.cut]), fillOpacity: 0.72,
                       color: oscuro ? "#0d0d0d" : "#ffffff", weight: 0.5 }),
        onEachFeature: (f, capa) => capa.bindTooltip(
          cc.tip ? cc.tip(f.properties.cut, f.properties.comuna, cc.valores[f.properties.cut])
                 : `${f.properties.comuna}: ${fmtc(cc.valores[f.properties.cut])}`,
          { sticky: true }),
      });
      control[cc.nombre || "Comunas (Censo)"] = capaC;
      if (cc.visible) capaC.addTo(m);
    }
    (cfg.capas || []).forEach(capa => {
      const usarCluster = !cfg.sinCluster && capa.cluster !== false &&
        capa.puntos.length >= clusterDesde && typeof L.markerClusterGroup === "function";
      // color del cluster = color de la capa (si se declara), oscurecido segun el tamaño.
      const colCluster = capa.color || color("--s1");
      const grupo = usarCluster
        ? L.markerClusterGroup({
            maxClusterRadius: 46,
            disableClusteringAtZoom: 12,
            showCoverageOnHover: false,
            spiderfyOnMaxZoom: true,
            iconCreateFunction(cl) {
              const n = cl.getChildCount();
              const t = n >= 100 ? "grande" : (n >= 25 ? "media" : "chica");
              const pct = n >= 100 ? 52 : (n >= 25 ? 70 : 88);
              const bg = `color-mix(in srgb, ${colCluster} ${pct}%, #000)`;
              return L.divIcon({
                html: `<div style="background:${bg}"><span>${n}</span></div>`,
                className: "pw-cluster pw-cluster-" + t,
                iconSize: L.point(t === "grande" ? 42 : 36, t === "grande" ? 42 : 36),
              });
            },
          })
        : L.layerGroup();
      capa.puntos.forEach(p => {
        if (p.lat == null || p.lon == null) return;
        if (!enChile(p.lat, p.lon)) { fueraChile++; return; }
        const rBase = p.r || 5;
        const mk = L.circleMarker([p.lat, p.lon], {
          renderer: usarCluster ? undefined : renderer,
          radius: rBase,
          color: "#ffffff",
          weight: 1,
          fillColor: p.color || color("--s1"),
          fillOpacity: 0.85,
        });
        if (p.popup) {
          // [POPUP] "como llegar" homologado: se inyecta a TODO punto con coordenada
          // (Waze + Maps), salvo que el popup ya lo traiga. Antes se pegaba a mano por
          // pagina y quedaban mapas sin el (p.ej. operadores). Aqui es automatico.
          let ph = p.popup;
          if (!/waze\.com|maps\/dir/.test(ph)) ph += waze(p.lat, p.lon);
          mk.bindPopup(ph, { maxWidth: 300 });
        }
        const tip = p.tip || (p.popup ? (p.popup.match(/<b>(.*?)<\/b>/) || [])[1] : null);
        if (tip) mk.bindTooltip(tip, { direction: "top", offset: [0, -6], opacity: 0.95 });
        // [HOVER] resaltar el punto al pasar el mouse
        mk.on("mouseover", () => mk.setStyle({ radius: rBase + 3, weight: 2, fillOpacity: 1 }));
        mk.on("mouseout", () => mk.setStyle({ radius: rBase, weight: 1, fillOpacity: 0.85 }));
        grupo.addLayer(mk);
        if (capa.visible !== false) todosPts.push({ ll: [p.lat, p.lon], nombre: tip });
      });
      control[`${capa.nombre} (${capa.puntos.length})`] = grupo;
      if (capa.visible !== false) grupo.addTo(m);
    });

    // [LINEAS] capas de trazados geojson opcionales
    //   cfg.lineas = [{nombre, geojson, color, weight, dash, visible, tip}]
    (cfg.lineas || []).forEach(lc => {
      if (!lc.geojson) return;
      const estiloBase = f => (typeof lc.color === "function"
        ? lc.color(f.properties)
        : { color: lc.color || color("--ink-3"), weight: lc.weight || 1.4,
            opacity: lc.opacity || 0.7, dashArray: lc.dash || null });
      const capaL = L.geoJSON(lc.geojson, {
        renderer: renderer,
        style: estiloBase,
        onEachFeature: (f, c) => {
          const t = lc.tip ? lc.tip(f.properties) : (f.properties.n || lc.nombre);
          if (t) c.bindTooltip(t, { sticky: true });
          // [POPUP] click en el tramo abre su ficha
          const html = lc.popup ? lc.popup(f.properties) : (t ? `<b>${t}</b>` : null);
          if (html) c.bindPopup(html, { maxWidth: 300 });
          // [HOVER/SELECCION] hover = mas grueso mismo color; seleccion (click) = cambia de
          // color (lc.colorSel) para diferenciar el tramo elegido de los demas, y queda asi
          // mientras el popup este abierto.
          const baseW = (estiloBase(f).weight) || 1.4;
          const colSel = lc.colorSel || color("--ink-1");
          c.on("mouseover", () => { if (!c._sel) c.setStyle({ weight: baseW + 3, opacity: 1 }); c.bringToFront(); });
          c.on("mouseout",  () => { if (!c._sel) capaL.resetStyle(c); });
          c.on("click",     () => { c._sel = true; c.setStyle({ color: colSel, weight: baseW + 4, opacity: 1 }); c.bringToFront(); });
          c.on("popupclose", () => { c._sel = false; capaL.resetStyle(c); });
        },
      });
      const n = (lc.geojson.features || []).length;
      control[`${lc.nombre}${n ? " (" + n + ")" : ""}`] = capaL;
      if (lc.visible) capaL.addTo(m);
    });

    // [CONTROLES] un solo selector: capas base (Mapa/Satélite/Relieve/Calles) siempre
    // disponibles como radios, mas los overlays de puntos/lineas como checkboxes si hay.
    const overlays = (!cfg.sinSelector && Object.keys(control).length > 1) ? control : null;
    L.control.layers(bases, overlays, { collapsed: !overlays }).addTo(m);

    if (fueraChile) {
      console.warn(`PW.mapa: ${fueraChile} punto(s) descartado(s) por coordenada fuera de Chile (bbox lat -56..-17, lon -76..-66).`);
    }
    // [FOCO] auto-zoom al territorio filtrado (region/comuna): cfg.foco = lista de cuts de comuna.
    // animate:false: el fit corre sincronicamente al crear el mapa (antes de asentar el layout);
    // con animacion la vista a veces se descarta por una carrera con el setView inicial.
    if (cfg.foco && cfg.foco.length) {
      const b = boundsComunas(cfg.foco);
      if (b) m.fitBounds(b.pad(0.15), { animate: false });
    }

    // [VACIO] estado "sin datos": si tras filtrar no queda NINGUN punto visible (y no hay lineas ni
    //   comunas visibles que muestren algo), sobrepone un aviso en vez de dejar el mapa en blanco.
    //   mapa() se reconstruye en cada llamada (el.innerHTML=""), asi que el aviso aparece/desaparece
    //   solo cuando la pagina re-renderiza al cambiar el filtro territorial. pointer-events:none => no
    //   estorba el paneo/zoom. Solo aplica si el mapa TIENE capas de puntos (no en mapas de solo
    //   lineas/comunas). Mensaje configurable con cfg.vacioMsg. Temas via variables (surface/ink/border).
    const hayLineasVis = (cfg.lineas || []).some(lc => lc.visible && lc.geojson && (lc.geojson.features || []).length);
    const hayComunasVis = !!(cfg.comunas && cfg.comunas.visible && window.PW_DATA && window.PW_DATA.geo_comunas);
    const hayCapasPuntos = (cfg.capas || []).some(c => c.visible !== false);
    if (hayCapasPuntos && !todosPts.length && !hayLineasVis && !hayComunasVis) {
      const av = document.createElement("div");
      av.className = "pw-mapa-vacio";
      av.textContent = cfg.vacioMsg || "Sin datos en esta zona.";
      av.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);" +
        "z-index:800;pointer-events:none;max-width:80%;text-align:center;" +
        "background:var(--surface-1);color:var(--ink-1);border:1px solid var(--border);" +
        "border-radius:10px;padding:9px 14px;font-size:13px;font-weight:600;" +
        "box-shadow:0 2px 12px rgba(0,0,0,.18)";
      el.appendChild(av);
    }
    notaPrecisionMapa(el);
    return m;
  }

  // [POPUP] tarjeta estandar de una estacion de carga (usa los campos de mapa.carga)
  const ESTADO_TXT = {
    disponible: ["Disponible", "var(--good)"],
    ocupado: ["Ocupado", "var(--s1)"],
    fuera_de_servicio: ["Fuera de servicio", "var(--critical)"],
    no_disponible: ["No disponible", "var(--ink-3)"],
    desconocido: ["Sin dato", "var(--ink-3)"],
  };
  function popupEstacion(p) {
    const [estTxt, estColor] = ESTADO_TXT[p.est] || ["Sin dato", "var(--ink-3)"];
    const fila = (etq, val) => val
      ? `<div class="pop-linea"><span>${etq}</span><div>${val}</div></div>` : "";
    const conectores = p.nc
      ? (p.nc === 1 ? "1 conector" : p.nc + " conectores") +
        (p.tipos ? `<div class="pop-detalle">${esc(p.tipos)}</div>` : "")
      : null;
    return `<div class="pop-est">` +
      `<div class="pop-titulo">${esc(p.n) || (p.op ? "Estación " + esc(p.op) : "Estación de carga")}</div>` +
      `<div class="pop-sub">${[esc(p.dir), [esc(p.com), esc(p.reg)].filter(Boolean).join(", ")].filter(Boolean).join("<br>")}</div>` +
      fila("Operador", esc(p.op)) +
      `<div class="pop-linea"><span>Estado</span><div><b style="color:${estColor}">${estTxt}</b></div></div>` +
      fila("Potencia", p.kw ? nf0.format(p.kw) + " kW" + (p.cor ? " (" + esc(p.cor) + ")" : "") : null) +
      fila("Conectores", conectores) +
      fila("Precio", p.pkwh ? "$" + nf0.format(p.pkwh) + "/kWh" : null) +
      fila("Horario", esc(p.hor)) +
      fila("Pago", esc(p.pago)) +
      (p.ofi ? `<div class="pop-detalle">En registro oficial IRVE</div>` : "") +
      waze(p.lat, p.lon) +
      `</div>`;
  }

  // [VOCABULARIO HOMOLOGADO] estado de un proyecto/instalacion (subestaciones,
  // centrales, BESS): normaliza cualquier variante cruda al mismo termino legible
  // (EN_OPERACION / operacion / "En Operación" -> "En operación"). Los popups y
  // tablas de toda la web deben mostrar ESTO, no el codigo canonico crudo.
  function estadoProyecto(x) {
    if (x == null || x === "") return null;
    const s = String(x).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
    if (/operaci/.test(s)) return "En operación";
    if (/construcci/.test(s)) return "En construcción";
    if (/prueba/.test(s)) return "En pruebas";
    if (/calificaci/.test(s)) return "En calificación";
    if (/aprobad/.test(s)) return "Aprobado";
    if (/revisi/.test(s)) return "En revisión";
    if (/terminad|finaliz/.test(s)) return "Terminado";
    if (/rechaza/.test(s)) return "Rechazado";
    if (/desisti/.test(s)) return "Desistido";
    if (/no admitid|no_admitid|inadmisib/.test(s)) return "No admitido";
    return String(x); // no reconocido: no inventar, devolver tal cual
  }

  // enlace "como llegar" (Waze) + Google Maps de respaldo
  function waze(lat, lon) {
    return `<div style="margin-top:6px"><a href="https://waze.com/ul?ll=${lat},${lon}&navigate=yes" target="_blank" rel="noopener"><b>Como llegar (Waze)</b></a>` +
      ` · <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}" target="_blank" rel="noopener">Maps</a></div>`;
  }

  // Selectores region/comuna encadenados a partir de una lista de puntos {reg, rcut, com}
  // cont: id del contenedor .filtros donde insertar; alCambiar(filtro) se llama con {rcut, com}
  function filtrosTerritorio(cont, puntos, alCambiar, extraHtml) {
    const el = typeof cont === "string" ? document.getElementById(cont) : cont;
    const regiones = [...new Map(puntos.filter(p => p.rcut && p.reg).map(p => [p.rcut, p.reg])).entries()]
      .sort((a, b) => a[0].localeCompare(b[0]));
    el.insertAdjacentHTML("afterbegin",
      `<label>Region <select data-f="reg"><option value="">Todas</option>` +
      regiones.map(([cut, nom]) => `<option value="${esc(cut)}">${esc(nom)}</option>`).join("") +
      `</select></label>` +
      `<label>Comuna <select data-f="com" disabled><option value="">Todas</option></select></label>` +
      (extraHtml || ""));
    const selR = el.querySelector('select[data-f="reg"]');
    const selC = el.querySelector('select[data-f="com"]');
    function pobComunas() {
      const rc = selR.value;
      const coms = [...new Set(puntos.filter(p => (!rc || p.rcut === rc) && p.com).map(p => p.com))].sort();
      selC.innerHTML = `<option value="">Todas</option>` + coms.map(c => `<option>${esc(c)}</option>`).join("");
      selC.disabled = !rc;
    }
    pobComunas();
    function emitir() { alCambiar({ rcut: selR.value || null, com: selC.value || null }); }
    selR.addEventListener("input", () => { pobComunas(); emitir(); });
    selC.addEventListener("input", emitir);
    return { emitir };
  }

  // [CHOROPLETH] mapa de comunas coloreadas por valor (requiere geo_comunas.js cargado)
  // cfg: {valores: {cut: numero}, fmt, alto, titulo}
  const SEQ = ["#cde2fb", "#9ec5f4", "#5598e7", "#256abf", "#0d366b"];
  function choropleth(cont, cfg) {
    const el = typeof cont === "string" ? document.getElementById(cont) : cont;
    const geo = window.PW_DATA && window.PW_DATA.geo_comunas;
    if (typeof L === "undefined" || !geo) {
      el.innerHTML = '<p class="nota">Mapa comunal no disponible (falta Leaflet o la cartografía).</p>';
      return null;
    }
    el.innerHTML = "";
    el.classList.add("pw-mapa");
    el.style.height = (cfg.alto || 520) + "px";
    const m = L.map(el, { zoomSnap: 0.5 }).setView([-38, -72], 4.5);
    const raiz = document.documentElement;
    const oscuro = raiz.dataset.theme === "dark" ||
      (raiz.dataset.theme !== "light" && window.matchMedia &&
       window.matchMedia("(prefers-color-scheme: dark)").matches);
    const bases = basesMapa(oscuro);
    (bases[baseElegida] || bases["Calles"] || bases["Mapa"]).addTo(m);
    m.on("baselayerchange", e => { baseElegida = e.name; });
    L.control.scale({ imperial: false, position: "bottomleft" }).addTo(m);
    L.control.layers(bases, null, { collapsed: true }).addTo(m);

    // cortes por quintiles sobre los valores presentes
    const vals = Object.values(cfg.valores).filter(v => v != null && !Number.isNaN(v)).sort((a, b) => a - b);
    const q = p => vals[Math.min(vals.length - 1, Math.floor(p * vals.length))];
    const cortes = [q(0.2), q(0.4), q(0.6), q(0.8)];
    const colorDe = v => {
      if (v == null) return oscuro ? "#2c2c2a" : "#e8e7e2";
      let i = 0;
      while (i < 4 && v > cortes[i]) i++;
      return SEQ[i];
    };
    const fmt = cfg.fmt || (v => v == null ? "sin dato" : nf1.format(v));
    const bordeBase = oscuro ? "#0d0d0d" : "#ffffff";
    const capaGeo = L.geoJSON(geo, {
      style: f => ({
        fillColor: colorDe(cfg.valores[f.properties.cut]),
        fillOpacity: 0.78,
        color: bordeBase,
        weight: 0.6,
      }),
      onEachFeature: (f, capa) => {
        const v = cfg.valores[f.properties.cut];
        capa.bindTooltip(`${f.properties.comuna}: ${fmt(v)}`, { sticky: true });
        // [HOVER] resaltar la comuna bajo el mouse
        capa.on("mouseover", () => { capa.setStyle({ weight: 2, color: color("--ink-1") }); capa.bringToFront(); });
        capa.on("mouseout", () => capa.setStyle({ weight: 0.6, color: bordeBase }));
      },
    }).addTo(m);

    // [CONTROLES] misma barra que los mapas de puntos (encuadra a las comunas con dato)
    controlesMapa(m, el, { centro: [-38, -72], zoom: 4.5, bounds: capaGeo.getBounds() });

    // leyenda de la escala
    const ley = document.createElement("div");
    ley.className = "leyenda";
    const rangos = [
      ["hasta " + fmt(cortes[0]), SEQ[0]],
      [fmt(cortes[0]) + " - " + fmt(cortes[1]), SEQ[1]],
      [fmt(cortes[1]) + " - " + fmt(cortes[2]), SEQ[2]],
      [fmt(cortes[2]) + " - " + fmt(cortes[3]), SEQ[3]],
      ["sobre " + fmt(cortes[3]), SEQ[4]],
    ];
    rangos.forEach(([etq, c]) => {
      const sp = document.createElement("span");
      sp.style.setProperty("--c", c);
      sp.textContent = etq;
      ley.appendChild(sp);
    });
    el.insertAdjacentElement("afterend", ley);
    notaPrecisionMapa(ley);
    // [FOCO] auto-zoom al territorio filtrado (region/comuna): cfg.foco = lista de cuts de comuna.
    // animate:false: el fit corre sincronicamente al crear el mapa (antes de asentar el layout);
    // con animacion la vista a veces se descarta por una carrera con el setView inicial.
    // cfg.focoPad (default 0.15) da un zoom mas ajustado; cfg.focoMaxZoom evita sobre-zoom en comunas chicas.
    if (cfg.foco && cfg.foco.length) {
      const b = boundsComunas(cfg.foco);
      if (b) m.fitBounds(b.pad(cfg.focoPad != null ? cfg.focoPad : 0.15),
                         { animate: false, maxZoom: cfg.focoMaxZoom || 12 });
    }
    // [RESALTAR] borde rojo sobre la(s) comuna(s) seleccionada(s). cfg.resaltar = cut o [cut].
    if (cfg.resaltar) {
      const cuts = Array.isArray(cfg.resaltar) ? cfg.resaltar : [cfg.resaltar];
      const feats = geo.features.filter(f => cuts.indexOf(f.properties.cut) >= 0);
      if (feats.length) L.geoJSON({ type: "FeatureCollection", features: feats },
        { style: { color: "#e11d48", weight: 3, opacity: 1, fill: false } }).addTo(m).bringToFront();
    }
    return m;
  }

  // leyenda simple de colores bajo el mapa
  function leyendaMapa(cont, items) {
    const el = typeof cont === "string" ? document.getElementById(cont) : cont;
    el.className = "leyenda";
    el.innerHTML = "";
    items.forEach(([etq, c]) => {
      const sp = document.createElement("span");
      sp.style.setProperty("--c", c);
      sp.textContent = etq;
      el.appendChild(sp);
    });
  }

  // [TERRITORIO] recorte EXACTO de una linea al territorio por CUT. La linea debe traer en sus
  //   props una lista `cuts` (comunas que atraviesa, homologacion oficial multi-comuna, p.ej. la que
  //   pone modulo_geo_lineas en geo_lineas.js). filtro = {cut?: "01101", rcut?: "01"} (cut resuelto
  //   por el consumidor). Sin cuts en la feature => no pertenece a un territorio (excepto "todas").
  function lineaEnTerritorio(feature, filtro) {
    if (!filtro || (!filtro.cut && !filtro.rcut)) return true;
    const cuts = feature && feature.properties && feature.properties.cuts;
    if (!cuts) return false;
    if (filtro.cut) return cuts.indexOf(filtro.cut) >= 0;
    return cuts.some(c => String(c).slice(0, 2) === filtro.rcut);
  }

  // [MAPA] colapsa un arreglo de segmentos [[[lon,lat],...],...] en UN Feature MultiLineString
  //   (1 tooltip, mucho mas liviano de pintar que N features). Para redes densas via cfg.lineas.
  function multiLinea(segs, props) {
    return { type: "FeatureCollection", features: [{ type: "Feature", properties: props || {},
      geometry: { type: "MultiLineString", coordinates: segs || [] } }] };
  }

  // [MAPA] capa por comuna/region con CARGA DIFERIDA (bajo demanda). Encapsula cache + fetch + scope +
  //   combinar + muestreo. cfg: {dir, indice, campo:'pts'|'segs', contarKey, region:bool, cap, alRefrescar}
  //   - indice: { cut: {rcut, [contarKey]:n, ...} } (liviano, cargado upfront).
  //   - archivos: data/<dir>/<cut>.json = { n, [campo]:[...] }.
  //   - filtro: {cut?, rcut?} (cut resuelto por el consumidor; region solo si cfg.region).
  //   Devuelve { scope(filtro), sincronizar(filtro)->Promise, datos(filtro)->[...] , total(filtro) }.
  function capaComunaOnDemand(cfg) {
    const cache = {}, cargando = {};
    function scope(filtro) {
      filtro = filtro || {};
      if (filtro.cut) return cfg.indice[filtro.cut] ? [filtro.cut] : [];
      if (filtro.rcut && cfg.region) return Object.keys(cfg.indice).filter(c => cfg.indice[c].rcut === filtro.rcut);
      return [];
    }
    async function sincronizar(filtro) {
      const faltan = scope(filtro).filter(c => !(c in cache) && !cargando[c]);
      if (!faltan.length) return;
      await Promise.all(faltan.map(async c => {
        cargando[c] = true;
        try { cache[c] = await fetch("data/" + cfg.dir + "/" + c + ".json").then(r => r.json()); }
        catch (e) { cache[c] = null; }
        cargando[c] = false;
      }));
      if (cfg.alRefrescar) cfg.alRefrescar();
    }
    function datos(filtro) {
      const cuts = scope(filtro);
      if (!cuts.length) return null;
      let arr = [];
      for (const c of cuts) { const d = cache[c]; if (d && d[cfg.campo]) arr = arr.concat(d[cfg.campo]); }
      if (!arr.length) return null;
      if (cfg.cap && arr.length > cfg.cap) {
        const step = arr.length / cfg.cap, s = [];
        for (let i = 0; i < cfg.cap; i++) s.push(arr[Math.floor(i * step)]);
        arr = s;
      }
      return arr;
    }
    function total(filtro) {
      return scope(filtro).reduce((s, c) => {
        const d = cache[c];
        return s + (d ? d.n : (cfg.indice[c] ? (cfg.indice[c][cfg.contarKey] || 0) : 0));
      }, 0);
    }
    return { scope, sincronizar, datos, total };
  }

  // [MAPA] Los data\*.js se sirven SIN ?v=: una cache vieja puede carecer de un campo de ESQUEMA nuevo
  //   del que depende el front (p.ej. geo_lineas gano `cuts`; postes_index gano `mt`/`bt`). Detecta la
  //   ausencia con el predicado `tiene(dataset)`, recarga el .js fresco UNA vez (query anticache =>
  //   re-asigna window.PW_DATA[clave]) y llama a `onload(dataset)`. Idempotente por clave (no reintenta
  //   en bucle). Devuelve true si disparo la recarga. Homologa el `asegurarCuts()` inline de mapas.html.
  const _recargadosSchema = {};
  function recargarSiFaltaCampo(clave, tiene, onload) {
    const d = window.PW_DATA && window.PW_DATA[clave];
    if (d && tiene && tiene(d)) return false;    // ya trae el campo: nada que hacer
    if (_recargadosSchema[clave]) return false;  // ya se intento (evita bucle)
    _recargadosSchema[clave] = true;
    const s = document.createElement("script");
    s.src = "data/" + clave + ".js?recarga=1";
    s.onload = () => { if (onload) onload(window.PW_DATA && window.PW_DATA[clave]); };
    document.head.appendChild(s);
    return true;
  }

  // [MAPA] banda de tension de una linea de transmision: "a" (>=200 kV) / "m" (66-154 kV) / "b" (<66 kV).
  function bandaTension(kv) { kv = +kv || 0; return kv >= 200 ? "a" : (kv >= 66 ? "m" : "b"); }

  // [MAPA] estilo Leaflet homologado de una linea de transmision segun banda de tension + `fuente`:
  //   IDE (fuente sin prefijo "kmz") naranjo --s2 solido; nuevas KMZ 2019 (fuente que empieza con "kmz")
  //   verde --s6 punteado. weight/opacity escalan con la banda. Un solo lugar para todos los mapas de red.
  function estiloTransmision(props) {
    const kv = +((props && props.kv) || 0);
    const nueva = String((props && props.fuente) || "").indexOf("kmz") === 0;
    return nueva
      ? { color: color("--s6"), weight: kv >= 200 ? 2.6 : (kv >= 66 ? 2.0 : 1.6), opacity: 0.95, dashArray: "5 4" }
      : { color: color("--s2"), weight: kv >= 200 ? 2.4 : (kv >= 66 ? 1.6 : 1.1), opacity: kv >= 200 ? 0.85 : 0.6 };
  }

  // [MAPA] leyenda homologada de lineas de transmision, CONSISTENTE con estiloTransmision(): dibuja
  //   swatches de LINEA (no el punto cuadrado de leyendaMapa) para las 3 bandas de tension (grosor
  //   creciente, IDE naranjo solido) y, opcional, la fuente "nueva" (KMZ 2019, verde punteado). Los
  //   colores/grosor/trazo salen de estiloTransmision(), asi la leyenda calza SIEMPRE con el mapa; es
  //   la fuente unica de la leyenda para cualquier mapa de transmision (mapas.html, red-electrica) en
  //   vez de texto a mano. Layout inline (mismo look que .leyenda, sin el ::before cuadrado). cont =
  //   id|elemento; opts = { nuevas?: bool (incluir la entrada KMZ 2019) }. Devuelve el elemento.
  function leyendaTransmision(cont, opts) {
    opts = opts || {};
    const el = typeof cont === "string" ? document.getElementById(cont) : cont;
    if (!el) return null;
    el.className = "pw-leyenda-lineas";
    el.style.display = "flex";
    el.style.gap = "16px";
    el.style.flexWrap = "wrap";
    el.style.margin = "6px 0 2px";
    el.style.fontSize = "12.5px";
    el.style.color = "var(--ink-2)";
    el.innerHTML = "";
    const filas = [
      [estiloTransmision({ kv: 500, fuente: "ide" }), "≥200 kV"],
      [estiloTransmision({ kv: 154, fuente: "ide" }), "66–154 kV"],
      [estiloTransmision({ kv: 33,  fuente: "ide" }), "<66 kV"],
    ];
    if (opts.nuevas) filas.push([estiloTransmision({ kv: 220, fuente: "kmz2019_nueva" }), "Nueva (KMZ 2019)"]);
    filas.forEach(([est, etq]) => {
      const item = document.createElement("span");
      item.style.whiteSpace = "nowrap";
      const sw = document.createElement("i");
      sw.style.display = "inline-block";
      sw.style.width = "24px";
      sw.style.verticalAlign = "middle";
      sw.style.marginRight = "7px";
      sw.style.borderTopStyle = est.dashArray ? "dashed" : "solid";
      // el swatch escala ~1.3x el weight del mapa (piso 1.5px) para que el gradiente por banda
      // se lea en la leyenda; color y trazo (solido/punteado) quedan EXACTOS al mapa.
      sw.style.borderTopWidth = Math.max(1.5, est.weight * 1.3).toFixed(1) + "px";
      sw.style.borderTopColor = est.color;
      if (est.opacity != null) sw.style.opacity = String(est.opacity);
      item.appendChild(sw);
      item.appendChild(document.createTextNode(etq));
      el.appendChild(item);
    });
    return el;
  }

  window.PW = { montarNav, fmt, clp, pct, esc, lineas, barras, columnas, tabla, color, mapa, choropleth, boundsComunas, leyendaMapa, waze, enChile, filtrosTerritorio, icono, popupEstacion, estadoProyecto, lineaEnTerritorio, multiLinea, capaComunaOnDemand, recargarSiFaltaCampo, bandaTension, estiloTransmision, leyendaTransmision, renderColaboradores };
})();

