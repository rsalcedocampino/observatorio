/* Indicadores del Banco Central en la web (#25 - Banco Central y Monedas, CAMBIOS 1502 y 1507).
   Dos cosas, en un solo archivo para que no haya dos copias que diverjan:

   1. window.PWMacro: el formato de numeros y fechas de los indicadores. Lo usan la franja de
      abajo y la pagina indicadores.html.
        PWMacro.num(valor, decimales)  -> "1.100,46" (es-CL, decimales fijos)
        PWMacro.fecha(serie)           -> "9 oct 2026"; en series mensuales "sep 2026"
        PWMacro.pintar()               -> (re)pinta las franjas de la pagina

   2. La franja de contexto: dentro de cada <div class="franja-macro" data-claves="usd,cny,uf">
      pinta los indicadores pedidos con su ultimo valor y la fecha del dato, mas un enlace a
      indicadores.html. Atributo opcional: data-nota="texto fijo al pie de la franja".

   Autonomo: no depende de comun.js ni de PW. No carga nada de fuera del sitio. Los valores y
   las fechas vienen de PW_DATA.macro (data/macro.js, que escribe modulo_macro() de
   generar_datos.py): aqui no se calcula nada. Todo texto que viene del dato pasa por esc().
   Si data/macro.js no responde, o ninguna clave pedida existe, la franja queda con hidden:
   sin hueco y sin excepcion. Probado el 2026-10-12 en las dos ramas de carga, apuntando el
   dato a un archivo que no existe y sin PW en la pagina: hidden, alto 0, cero excepciones.
   El navegador igual anota el 404 de red en la consola; eso no se puede evitar desde aqui.
   Para no empujar el contenido despues del primer pintado, mientras el HTML aun se esta
   leyendo el dato se pide con document.write, en la misma secuencia sincrona que los scripts
   de la pagina; solo si este archivo se inyecta tarde se pide de forma asincrona. */
(function () {
  "use strict";

  var MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  var NF = {};

  function num(v, d) {
    if (v == null || Number.isNaN(v)) return "—";
    NF[d] = NF[d] || new Intl.NumberFormat("es-CL", { minimumFractionDigits: d, maximumFractionDigits: d });
    return NF[d].format(v);
  }
  // "2026-10-09" -> "9 oct 2026"; mensual -> "sep 2026"
  function fecha(s) {
    var p = String(s.fecha).split("-");
    var mes = MESES[+p[1] - 1] + " " + p[0];
    return s.frecuencia === "mensual" ? mes : (+p[2]) + " " + mes;
  }
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // clave -> [nombre corto, texto antes del valor, texto despues del valor, decimales]
  var FORMA = {
    usd: ["Dólar", "$", "", 2], eur: ["Euro", "$", "", 2], cny: ["Yuan", "$", "", 2],
    uf: ["UF", "$", "", 2], utm: ["UTM", "$", "", 0], ipc: ["IPC", "", "", 2],
    // Quinto elemento, opcional: nombre corto para telefono (bajo 520 px). El nombre oficial
    // completo queda siempre en el title del enlace.
    tpm: ["Tasa de política monetaria", "", " %", 2, "TPM"],
    bono10_cl: ["Bono Chile 10 años", "", " %", 2, "Bono Chile 10a"],
    bono10_us: ["Bono EE.UU. 10 años", "", " %", 2, "Bono EE.UU. 10a"],
    cobre: ["Cobre", "US$ ", " /lb", 3], litio: ["Litio", "US$ ", " /kg", 2],
    wti: ["Petróleo WTI", "US$ ", "", 2], brent: ["Petróleo Brent", "US$ ", "", 2],
    gas_natural: ["Gas natural", "US$ ", " /MMBtu", 2], carbon: ["Carbón", "US$ ", " /t", 2],
    diesel: ["Diésel internacional", "US$ ", " /gal", 3],
    gasolina: ["Gasolina EE.UU.", "US$ ", " /m3", 2]
  };

  function estilo() {
    if (document.getElementById("franja-macro-css")) return;
    var st = document.createElement("style");
    st.id = "franja-macro-css";
    st.textContent =
      ".franja-macro[hidden]{display:none}" +
      ".franja-macro{display:flex;flex-wrap:wrap;align-items:stretch;gap:8px;margin:12px 0 4px;font-size:12.5px}" +
      ".franja-macro .fm-t{align-self:center;color:var(--ink-3);font-weight:600;margin-right:2px}" +
      ".franja-macro a.fm-c{display:flex;flex-direction:column;gap:1px;padding:6px 11px;border:1px solid var(--border);" +
      "border-radius:8px;background:var(--surface-1);color:var(--ink-1);text-decoration:none;min-width:0}" +
      ".franja-macro a.fm-c:hover{border-color:var(--ink-3)}" +
      ".franja-macro a.fm-c:focus-visible,.franja-macro a.fm-mas:focus-visible{outline:2px solid var(--accion);outline-offset:2px}" +
      ".franja-macro .fm-n{color:var(--ink-2)}" +
      ".franja-macro .fm-v{font-size:14.5px;font-weight:700}" +
      ".franja-macro .fm-f{color:var(--ink-3);font-size:11.5px}" +
      ".franja-macro .fm-viejo{color:var(--ink-baja);font-weight:600}" +
      ".franja-macro a.fm-mas{align-self:center;color:var(--accion);font-weight:600}" +
      ".franja-macro .fm-nota{flex-basis:100%;color:var(--ink-3);font-size:11.5px;margin:0}" +
      // En telefono el rotulo va en su propia linea: asi no le quita lugar a los indicadores en
      // la primera fila (medido a 375 px el 2026-10-12: tres indicadores bajan de 181 a 153 px).
      // y los nombres largos se cambian por su version corta (inversion.html pasa de dos filas
      // de indicadores a una).
      ".franja-macro .fm-corto{display:none}" +
      "@media (max-width:520px){.franja-macro .fm-t{flex-basis:100%;margin:0}" +
      ".franja-macro .fm-largo{display:none}.franja-macro .fm-corto{display:inline}}";
    document.head.appendChild(st);
  }

  function franjas() { return document.querySelectorAll(".franja-macro[data-claves]"); }

  function pintar() {
    var D = window.PW_DATA && window.PW_DATA.macro;
    if (!D || !D.series) return;
    var S = {};
    D.series.forEach(function (s) { S[s.clave] = s; });
    estilo();
    franjas().forEach(function (el) {
      var fichas = el.getAttribute("data-claves").split(",").map(function (c) {
        c = c.trim();
        var s = S[c], f = FORMA[c];
        if (!s || !f || s.valor == null) return "";
        var viejo = s.atrasada ? ' <span class="fm-viejo">· sin actualizar hace ' + esc(s.dias_de_atraso) + " días</span>" : "";
        return '<a class="fm-c" href="indicadores.html" title="' + esc(s.nombre + " (" + s.unidad + ")" +
          (s.aclaracion ? ". " + s.aclaracion : "")) + '">' +
          '<span class="fm-n">' + (f[4]
            ? '<span class="fm-largo">' + esc(f[0]) + '</span><span class="fm-corto">' + esc(f[4]) + "</span>"
            : esc(f[0])) + "</span>" +
          '<span class="fm-v">' + esc(f[1] + num(s.valor, f[3]) + f[2]) + "</span>" +
          '<span class="fm-f">' + esc(fecha(s)) + viejo + "</span></a>";
      }).filter(Boolean);
      if (!fichas.length) return;
      var nota = el.getAttribute("data-nota");
      el.innerHTML = '<span class="fm-t">Contexto económico</span>' + fichas.join("") +
        '<a class="fm-mas" href="indicadores.html">Ver todos los indicadores</a>' +
        '<p class="fm-nota">Último dato publicado por el Banco Central de Chile.' +
        (nota ? " " + esc(nota) : "") + "</p>";
      el.setAttribute("role", "group");
      el.setAttribute("aria-label", "Indicadores económicos de contexto");
      el.hidden = false;
    });
  }

  window.PWMacro = { num: num, fecha: fecha, pintar: pintar };

  var hay = franjas();
  if (!hay.length) return;
  hay.forEach(function (el) { el.hidden = true; });
  if (window.PW_DATA && window.PW_DATA.macro) { pintar(); return; }
  var src = "data/macro.js?v=" + (window._pwv || Math.floor(Date.now() / 6e5));
  if (document.readyState === "loading") {
    // El segundo <script> corre despues del primero, cargue o no: si macro.js falla, pintar()
    // no encuentra el dato y la franja sigue oculta.
    document.write('<script src="' + src + '"><\/script><script>PWMacro.pintar()<\/script>');
  } else {
    var sc = document.createElement("script");
    sc.src = src;
    sc.onload = pintar;
    document.head.appendChild(sc);
  }
})();
