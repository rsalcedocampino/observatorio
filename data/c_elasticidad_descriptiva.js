// Datos Elasticidad Descriptiva - Proyecciones Históricas
// Análisis preliminar, falta causalidad (ventas por región/mes)

window.ElasticidadData = {
  "metadata": {
    "titulo": "Elasticidad Tarifa × Stock EV (Análisis Descriptivo)",
    "fecha_generacion": "2026-08-31",
    "vigencia_tarifas": "2026-08-01",
    "nota": "PROYECCIONES basadas en histórico de ventas 2023-2025. Stock real INE 2024-2025. Análisis descriptivo, sin causalidad verificada.",
    "ultimo_dato_real_ventas": "2025 (año completo)",
    "ultimo_dato_real_stock": "2025 (INE)",
    "cobertura": "Nacional + 16 regiones"
  },
  "historico_ventas": [
    {
      "ano": 2023,
      "ventas": 3558,
      "tipo": "real"
    },
    {
      "ano": 2024,
      "ventas": 5834,
      "tipo": "real"
    },
    {
      "ano": 2025,
      "ventas": 10867,
      "tipo": "real"
    },
    {
      "ano": 2026,
      "ventas": 10367,
      "tipo": "proyectado",
      "nota": "6 meses reales + 6 meses proyectados"
    },
    {
      "ano": 2027,
      "ventas": 15399,
      "tipo": "proyectado"
    }
  ],
  "segmentacion_2025": {
    "BEV": 5512,
    "PHEV": 3239,
    "E-Buses": 2009,
    "E-Trucks": 107
  },
  "proyecciones": {
    "2026": {
      "BEV": 7111,
      "PHEV": 9333,
      "E-Buses": 2511,
      "E-Trucks": 88
    },
    "2027": {
      "BEV": 9175,
      "PHEV": 26894,
      "E-Buses": 3138,
      "E-Trucks": 72
    }
  },
  "stock_acumulado": {
    "2024": 33853,
    "2025": 69596,
    "2026": 143077,
    "2027": 294141
  },
  "crecimiento": {
    "ventas_promedio": 48.5,
    "stock_promedio": 105.6
  },
  "shock_tarifario": {
    "fecha": "2026-01",
    "tipo": "potencia",
    "factor": "85.1x",
    "descripcion": "Shock tarifario de enero 2026 en componente potencia",
    "impacto_esperado": "Requiere validación con ventas por región/mes"
  }
};
