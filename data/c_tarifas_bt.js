window.PW_DATA.c_tarifas_bt = {
 "generado": "2026-11-04",
 "vigencia": "2026-11-01",
 "vigencia_por_distribuidor": {
  "cge": "2026-10-01",
  "edelaysen": "2026-11-01",
  "edelmag": "2026-11-01",
  "enel-distribucion": "2026-11-01",
  "frontel": "2026-11-01",
  "luz-osorno": "2026-11-01",
  "saesa": "2026-11-01"
 },
 "nota": "Tarifas del último pliego publicado de cada distribuidora (CGE con sus filiales, Enel, Saesa, Frontel, Luz Osorno, Edelaysén y Edelmag; el mes de cada una figura junto a su fuente), red aérea, con IVA salvo el cargo por servicio público. Cada región es el promedio simple de sus comunas, sin ponderar por clientes. BT4 es una referencia industrial (promedio de todas las redes en CGE y Enel; en las demás, el BT4 de su propio pliego). Una comuna atendida por dos distribuidoras aparece en ambas y no se promedian entre sí. En Magallanes solo están las 5 localidades del pliego de Edelmag (Punta Arenas, Natales, Torres del Paine, Porvenir y Cabo de Hornos); Porvenir y Cabo de Hornos no pagan IVA por ley. Para la tarifa de un suministro concreto, consulte el pliego de su distribuidora.",
 "unidades": {
  "cargo_fijo_clp_mes": "$/cliente/mes",
  "variable_clp_kwh_tramo1": "$/kWh (consumo hasta 350 kWh)",
  "energia_total_clp_kwh": "$/kWh",
  "potencia_clp_kw": "$/kW/mes"
 },
 "fuente": [
  {
   "distribuidora": "CGE y filiales",
   "documento": "Tarifas de suministro eléctrico vigentes en octubre de 2026",
   "url": "https://www.cge.cl/informacion-comercial/tarifas-y-procesos-tarifarios/tarifa-de-suministro/"
  },
  {
   "distribuidora": "Enel Distribución",
   "documento": "Tarifas de suministro eléctrico vigentes en noviembre de 2026",
   "url": "https://www.enel.cl/es/clientes/tarifas-y-regulacion/conceptos-tarifas.html"
  },
  {
   "distribuidora": "Saesa",
   "documento": "Tarifas de suministro eléctrico vigentes en noviembre de 2026",
   "url": "https://web.gruposaesa.cl/web/saesa/pago-y-boleta/tarifas-vigentes"
  },
  {
   "distribuidora": "Frontel",
   "documento": "Tarifas de suministro eléctrico vigentes en noviembre de 2026",
   "url": "https://web.gruposaesa.cl/web/frontel/pago-y-boleta/tarifas-vigentes"
  },
  {
   "distribuidora": "Luz Osorno",
   "documento": "Tarifas de suministro eléctrico vigentes en noviembre de 2026",
   "url": "https://web.gruposaesa.cl/web/luz-osorno/pago-y-boleta/tarifas-vigentes"
  },
  {
   "distribuidora": "Edelaysén",
   "documento": "Tarifas de suministro eléctrico vigentes en noviembre de 2026",
   "url": "https://web.gruposaesa.cl/web/edelaysen/pago-y-boleta/tarifas-vigentes"
  },
  {
   "distribuidora": "Edelmag",
   "documento": "Tarifas de suministro eléctrico vigentes en noviembre de 2026",
   "url": "https://www.edelmag.cl/wp-content/uploads/2026/10/EDELMAG-Tarifas-Suministro-noviembre-2026-PNP.8T.pdf"
  }
 ],
 "segmentos_info": {
  "BT1": "Domiciliario (BT1)",
  "BT2": "Potencia contratada, general (BT2)",
  "BT3": "Potencia leída, general (BT3)",
  "BT4": "Referencia industrial (BT4)"
 },
 "regiones_sin_dato": [],
 "distribuidoras_incluidas": [
  "cge",
  "edelaysen",
  "edelmag",
  "enel-distribucion",
  "frontel",
  "luz-osorno",
  "saesa"
 ],
 "distribuidoras_nombre": {
  "cge": "CGE y filiales",
  "edelaysen": "Edelaysén",
  "edelmag": "Edelmag",
  "enel-distribucion": "Enel Distribución",
  "frontel": "Frontel",
  "luz-osorno": "Luz Osorno",
  "saesa": "Saesa"
 },
 "regiones": [
  {
   "region_cut": "01",
   "region": "Tarapacá",
   "region_kit": "Tarapacá",
   "comunas": 6,
   "distribuidoras": [
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 6
   }
  },
  {
   "region_cut": "02",
   "region": "Antofagasta",
   "region_kit": "Antofagasta",
   "comunas": 6,
   "distribuidoras": [
    "cge",
    "saesa"
   ],
   "comunas_por_distribuidora": {
    "cge": 6,
    "saesa": 2
   }
  },
  {
   "region_cut": "03",
   "region": "Atacama",
   "region_kit": "Atacama",
   "comunas": 9,
   "distribuidoras": [
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 9
   }
  },
  {
   "region_cut": "04",
   "region": "Coquimbo",
   "region_kit": "Coquimbo",
   "comunas": 15,
   "distribuidoras": [
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 15
   }
  },
  {
   "region_cut": "05",
   "region": "Valparaíso",
   "region_kit": "Valparaíso",
   "comunas": 12,
   "distribuidoras": [
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 12
   }
  },
  {
   "region_cut": "06",
   "region": "O'Higgins",
   "region_kit": "OHiggins",
   "comunas": 33,
   "distribuidoras": [
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 33
   }
  },
  {
   "region_cut": "07",
   "region": "Maule",
   "region_kit": "Maule",
   "comunas": 30,
   "distribuidoras": [
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 30
   }
  },
  {
   "region_cut": "08",
   "region": "Biobío",
   "region_kit": "Biobío",
   "comunas": 33,
   "distribuidoras": [
    "cge",
    "frontel"
   ],
   "comunas_por_distribuidora": {
    "cge": 12,
    "frontel": 27
   }
  },
  {
   "region_cut": "09",
   "region": "La Araucanía",
   "region_kit": "La Araucanía",
   "comunas": 32,
   "distribuidoras": [
    "cge",
    "frontel",
    "saesa"
   ],
   "comunas_por_distribuidora": {
    "cge": 10,
    "frontel": 29,
    "saesa": 4
   }
  },
  {
   "region_cut": "10",
   "region": "Los Lagos",
   "region_kit": "Los Lagos",
   "comunas": 30,
   "distribuidoras": [
    "edelaysen",
    "luz-osorno",
    "saesa"
   ],
   "comunas_por_distribuidora": {
    "edelaysen": 3,
    "luz-osorno": 9,
    "saesa": 27
   }
  },
  {
   "region_cut": "11",
   "region": "Aysén",
   "region_kit": "Aysén",
   "comunas": 7,
   "distribuidoras": [
    "edelaysen"
   ],
   "comunas_por_distribuidora": {
    "edelaysen": 7
   }
  },
  {
   "region_cut": "12",
   "region": "Magallanes",
   "region_kit": "Magallanes",
   "comunas": 5,
   "distribuidoras": [
    "edelmag"
   ],
   "comunas_por_distribuidora": {
    "edelmag": 5
   }
  },
  {
   "region_cut": "13",
   "region": "Metropolitana",
   "region_kit": "Metropolitana",
   "comunas": 52,
   "distribuidoras": [
    "cge",
    "enel-distribucion"
   ],
   "comunas_por_distribuidora": {
    "cge": 19,
    "enel-distribucion": 33
   }
  },
  {
   "region_cut": "14",
   "region": "Los Ríos",
   "region_kit": "Los Ríos",
   "comunas": 12,
   "distribuidoras": [
    "luz-osorno",
    "saesa"
   ],
   "comunas_por_distribuidora": {
    "luz-osorno": 2,
    "saesa": 12
   }
  },
  {
   "region_cut": "15",
   "region": "Arica y Parinacota",
   "region_kit": "Arica y Parinacota",
   "comunas": 3,
   "distribuidoras": [
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 3
   }
  },
  {
   "region_cut": "16",
   "region": "Ñuble",
   "region_kit": "Ñuble",
   "comunas": 21,
   "distribuidoras": [
    "cge",
    "frontel"
   ],
   "comunas_por_distribuidora": {
    "cge": 15,
    "frontel": 9
   }
  }
 ],
 "tarifas": {
  "01": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 267.19
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 192.4,
     "potencia_punta_clp_kw": 29177.0,
     "potencia_parcial_punta_clp_kw": 20551.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 192.4,
     "potencia_leida_punta_clp_kw": 29177.0,
     "potencia_leida_parcial_punta_clp_kw": 20551.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5973.0,
     "energia_clp_kwh": 161.12
    }
   }
  },
  "02": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 219.1
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 145.93,
     "potencia_punta_clp_kw": 28605.0,
     "potencia_parcial_punta_clp_kw": 20136.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 145.93,
     "potencia_leida_punta_clp_kw": 28605.0,
     "potencia_leida_parcial_punta_clp_kw": 20136.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5902.0,
     "energia_clp_kwh": 114.38
    }
   },
   "saesa": {
    "BT1": {
     "cargo_fijo_clp_mes": 1246.48,
     "variable_clp_kwh_tramo1": 264.91
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1246.48,
     "energia_total_clp_kwh": 184.47,
     "potencia_punta_clp_kw": 34157.0,
     "potencia_parcial_punta_clp_kw": 22383.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1246.48,
     "energia_total_clp_kwh": 184.47,
     "potencia_leida_punta_clp_kw": 34157.0,
     "potencia_leida_parcial_punta_clp_kw": 22383.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 7927.0,
     "energia_clp_kwh": 151.55
    }
   }
  },
  "03": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 249.39
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 180.99,
     "potencia_punta_clp_kw": 27145.0,
     "potencia_parcial_punta_clp_kw": 19016.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 180.99,
     "potencia_leida_punta_clp_kw": 27145.0,
     "potencia_leida_parcial_punta_clp_kw": 19016.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5468.0,
     "energia_clp_kwh": 148.06
    }
   }
  },
  "04": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 263.73
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 195.38,
     "potencia_punta_clp_kw": 26414.0,
     "potencia_parcial_punta_clp_kw": 18533.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 195.38,
     "potencia_leida_punta_clp_kw": 26414.0,
     "potencia_leida_parcial_punta_clp_kw": 18533.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5235.0,
     "energia_clp_kwh": 162.46
    }
   }
  },
  "05": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 257.44
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 188.59,
     "potencia_punta_clp_kw": 27032.0,
     "potencia_parcial_punta_clp_kw": 18902.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 188.59,
     "potencia_leida_punta_clp_kw": 27032.0,
     "potencia_leida_parcial_punta_clp_kw": 18902.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5991.0,
     "energia_clp_kwh": 154.26
    }
   }
  },
  "06": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 249.47
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 184.32,
     "potencia_punta_clp_kw": 25744.0,
     "potencia_parcial_punta_clp_kw": 17986.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 184.32,
     "potencia_leida_punta_clp_kw": 25744.0,
     "potencia_leida_parcial_punta_clp_kw": 17986.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5365.0,
     "energia_clp_kwh": 151.95
    }
   }
  },
  "07": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 255.32
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 185.83,
     "potencia_punta_clp_kw": 27766.0,
     "potencia_parcial_punta_clp_kw": 19315.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 185.83,
     "potencia_leida_punta_clp_kw": 27766.0,
     "potencia_leida_parcial_punta_clp_kw": 19315.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 6421.0,
     "energia_clp_kwh": 153.46
    }
   }
  },
  "08": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 257.75
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 177.77,
     "potencia_punta_clp_kw": 33350.0,
     "potencia_parcial_punta_clp_kw": 22987.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 177.77,
     "potencia_leida_punta_clp_kw": 33350.0,
     "potencia_leida_parcial_punta_clp_kw": 22987.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 9717.0,
     "energia_clp_kwh": 145.4
    }
   },
   "frontel": {
    "BT1": {
     "cargo_fijo_clp_mes": 1319.14,
     "variable_clp_kwh_tramo1": 290.94
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1319.14,
     "energia_total_clp_kwh": 167.71,
     "potencia_punta_clp_kw": 63544.0,
     "potencia_parcial_punta_clp_kw": 46655.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1319.14,
     "energia_total_clp_kwh": 167.71,
     "potencia_leida_punta_clp_kw": 63544.0,
     "potencia_leida_parcial_punta_clp_kw": 46655.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 12304.0,
     "energia_clp_kwh": 135.34
    }
   }
  },
  "09": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 270.91
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 189.27,
     "potencia_punta_clp_kw": 34256.0,
     "potencia_parcial_punta_clp_kw": 23583.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 189.27,
     "potencia_leida_punta_clp_kw": 34256.0,
     "potencia_leida_parcial_punta_clp_kw": 23583.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 9927.0,
     "energia_clp_kwh": 156.9
    }
   },
   "frontel": {
    "BT1": {
     "cargo_fijo_clp_mes": 1319.14,
     "variable_clp_kwh_tramo1": 300.4
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1319.14,
     "energia_total_clp_kwh": 177.16,
     "potencia_punta_clp_kw": 56419.0,
     "potencia_parcial_punta_clp_kw": 41346.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1319.14,
     "energia_total_clp_kwh": 177.16,
     "potencia_leida_punta_clp_kw": 56419.0,
     "potencia_leida_parcial_punta_clp_kw": 41346.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 8907.0,
     "energia_clp_kwh": 144.79
    }
   },
   "saesa": {
    "BT1": {
     "cargo_fijo_clp_mes": 1246.48,
     "variable_clp_kwh_tramo1": 263.17
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1246.48,
     "energia_total_clp_kwh": 173.14,
     "potencia_punta_clp_kw": 36869.0,
     "potencia_parcial_punta_clp_kw": 24287.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1246.48,
     "energia_total_clp_kwh": 173.14,
     "potencia_leida_punta_clp_kw": 36869.0,
     "potencia_leida_parcial_punta_clp_kw": 24287.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 9789.0,
     "energia_clp_kwh": 140.81
    }
   }
  },
  "10": {
   "edelaysen": {
    "BT1": {
     "cargo_fijo_clp_mes": 1319.13,
     "variable_clp_kwh_tramo1": 287.77
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1319.13,
     "energia_total_clp_kwh": 173.74,
     "potencia_punta_clp_kw": 65432.0,
     "potencia_parcial_punta_clp_kw": 51546.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1319.13,
     "energia_total_clp_kwh": 173.74,
     "potencia_leida_punta_clp_kw": 65432.0,
     "potencia_leida_parcial_punta_clp_kw": 51546.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 18820.0,
     "energia_clp_kwh": 172.89
    }
   },
   "luz-osorno": {
    "BT1": {
     "cargo_fijo_clp_mes": 1319.13,
     "variable_clp_kwh_tramo1": 269.53
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1319.13,
     "energia_total_clp_kwh": 156.99,
     "potencia_punta_clp_kw": 71051.0,
     "potencia_parcial_punta_clp_kw": 41833.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1319.13,
     "energia_total_clp_kwh": 156.99,
     "potencia_leida_punta_clp_kw": 71051.0,
     "potencia_leida_parcial_punta_clp_kw": 41833.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 10638.0,
     "energia_clp_kwh": 124.8
    }
   },
   "saesa": {
    "BT1": {
     "cargo_fijo_clp_mes": 1246.49,
     "variable_clp_kwh_tramo1": 257.98
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1246.49,
     "energia_total_clp_kwh": 165.19,
     "potencia_punta_clp_kw": 34298.0,
     "potencia_parcial_punta_clp_kw": 22534.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1246.49,
     "energia_total_clp_kwh": 165.19,
     "potencia_leida_punta_clp_kw": 34298.0,
     "potencia_leida_parcial_punta_clp_kw": 22534.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 8534.0,
     "energia_clp_kwh": 135.33
    }
   }
  },
  "11": {
   "edelaysen": {
    "BT1": {
     "cargo_fijo_clp_mes": 1319.13,
     "variable_clp_kwh_tramo1": 287.77
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1319.13,
     "energia_total_clp_kwh": 173.74,
     "potencia_punta_clp_kw": 65432.0,
     "potencia_parcial_punta_clp_kw": 51546.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1319.13,
     "energia_total_clp_kwh": 173.74,
     "potencia_leida_punta_clp_kw": 65432.0,
     "potencia_leida_parcial_punta_clp_kw": 51546.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 18820.0,
     "energia_clp_kwh": 172.89
    }
   }
  },
  "12": {
   "edelmag": {
    "BT1": {
     "cargo_fijo_clp_mes": 2186.04,
     "variable_clp_kwh_tramo1": 231.51
    },
    "BT2": {
     "cargo_fijo_clp_mes": 2186.04,
     "energia_total_clp_kwh": 122.33,
     "potencia_punta_clp_kw": 29397.0,
     "potencia_parcial_punta_clp_kw": 19823.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 2186.04,
     "energia_total_clp_kwh": 122.33,
     "potencia_leida_punta_clp_kw": 29397.0,
     "potencia_leida_parcial_punta_clp_kw": 19823.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5543.0,
     "energia_clp_kwh": 121.47
    }
   }
  },
  "13": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 244.25
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 179.27,
     "potencia_punta_clp_kw": 25844.0,
     "potencia_parcial_punta_clp_kw": 18037.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 179.27,
     "potencia_leida_punta_clp_kw": 25844.0,
     "potencia_leida_parcial_punta_clp_kw": 18037.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5399.0,
     "energia_clp_kwh": 152.99
    }
   },
   "enel-distribucion": {
    "BT1": {
     "cargo_fijo_clp_mes": 734.64,
     "variable_clp_kwh_tramo1": 238.45
    },
    "BT2": {
     "cargo_fijo_clp_mes": 734.64,
     "energia_total_clp_kwh": 182.96,
     "potencia_punta_clp_kw": 22032.0,
     "potencia_parcial_punta_clp_kw": 12610.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 906.29,
     "energia_total_clp_kwh": 182.96,
     "potencia_leida_punta_clp_kw": 22032.0,
     "potencia_leida_parcial_punta_clp_kw": 12610.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 4623.0,
     "energia_clp_kwh": 161.36
    }
   }
  },
  "14": {
   "luz-osorno": {
    "BT1": {
     "cargo_fijo_clp_mes": 1319.13,
     "variable_clp_kwh_tramo1": 269.31
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1319.13,
     "energia_total_clp_kwh": 156.78,
     "potencia_punta_clp_kw": 77784.0,
     "potencia_parcial_punta_clp_kw": 45617.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1319.13,
     "energia_total_clp_kwh": 156.78,
     "potencia_leida_punta_clp_kw": 77784.0,
     "potencia_leida_parcial_punta_clp_kw": 45617.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 11793.0,
     "energia_clp_kwh": 124.59
    }
   },
   "saesa": {
    "BT1": {
     "cargo_fijo_clp_mes": 1246.49,
     "variable_clp_kwh_tramo1": 263.77
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1246.49,
     "energia_total_clp_kwh": 169.5,
     "potencia_punta_clp_kw": 37159.0,
     "potencia_parcial_punta_clp_kw": 24498.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1246.49,
     "energia_total_clp_kwh": 169.5,
     "potencia_leida_punta_clp_kw": 37159.0,
     "potencia_leida_parcial_punta_clp_kw": 24498.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 10313.0,
     "energia_clp_kwh": 137.29
    }
   }
  },
  "15": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 271.63
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 195.66,
     "potencia_punta_clp_kw": 28541.0,
     "potencia_parcial_punta_clp_kw": 20158.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 195.66,
     "potencia_leida_punta_clp_kw": 28541.0,
     "potencia_leida_parcial_punta_clp_kw": 20158.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5693.0,
     "energia_clp_kwh": 164.39
    }
   }
  },
  "16": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1071.14,
     "variable_clp_kwh_tramo1": 274.96
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 189.19,
     "potencia_punta_clp_kw": 36384.0,
     "potencia_parcial_punta_clp_kw": 24982.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1071.14,
     "energia_total_clp_kwh": 189.19,
     "potencia_leida_punta_clp_kw": 36384.0,
     "potencia_leida_parcial_punta_clp_kw": 24982.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 11019.0,
     "energia_clp_kwh": 156.83
    }
   },
   "frontel": {
    "BT1": {
     "cargo_fijo_clp_mes": 1319.13,
     "variable_clp_kwh_tramo1": 300.24
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1319.13,
     "energia_total_clp_kwh": 177.0,
     "potencia_punta_clp_kw": 67071.0,
     "potencia_parcial_punta_clp_kw": 49284.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1319.13,
     "energia_total_clp_kwh": 177.0,
     "potencia_leida_punta_clp_kw": 67071.0,
     "potencia_leida_parcial_punta_clp_kw": 49284.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 13608.0,
     "energia_clp_kwh": 144.63
    }
   }
  }
 },
 "comunas": {
  "01101": {
   "nombre": "Iquique",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 266.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 192.22,
    "potencia_punta_clp_kw": 28958.0,
    "potencia_parcial_punta_clp_kw": 20408.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 192.22,
    "potencia_leida_punta_clp_kw": 28958.0,
    "potencia_leida_parcial_punta_clp_kw": 20408.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6747.0,
    "energia_clp_kwh": 160.94
   }
  },
  "01107": {
   "nombre": "Alto Hospicio",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 272.7
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.35,
    "potencia_punta_clp_kw": 28958.0,
    "potencia_parcial_punta_clp_kw": 20408.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.35,
    "potencia_leida_punta_clp_kw": 28958.0,
    "potencia_leida_parcial_punta_clp_kw": 20408.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6747.0,
    "energia_clp_kwh": 167.07
   }
  },
  "01401": {
   "nombre": "Pozo Almonte",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 257.91
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 183.56,
    "potencia_punta_clp_kw": 28958.0,
    "potencia_parcial_punta_clp_kw": 20408.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 183.56,
    "potencia_leida_punta_clp_kw": 28958.0,
    "potencia_leida_parcial_punta_clp_kw": 20408.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5480.0,
    "energia_clp_kwh": 152.29
   }
  },
  "01403": {
   "nombre": "Colchane",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.32
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.35,
    "potencia_punta_clp_kw": 30268.0,
    "potencia_parcial_punta_clp_kw": 21268.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.35,
    "potencia_leida_punta_clp_kw": 30268.0,
    "potencia_leida_parcial_punta_clp_kw": 21268.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5907.0,
    "energia_clp_kwh": 167.07
   }
  },
  "01404": {
   "nombre": "Huara",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 272.7
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.35,
    "potencia_punta_clp_kw": 28958.0,
    "potencia_parcial_punta_clp_kw": 20408.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.35,
    "potencia_leida_punta_clp_kw": 28958.0,
    "potencia_leida_parcial_punta_clp_kw": 20408.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5480.0,
    "energia_clp_kwh": 167.07
   }
  },
  "01405": {
   "nombre": "Pica",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 257.91
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 183.56,
    "potencia_punta_clp_kw": 28958.0,
    "potencia_parcial_punta_clp_kw": 20408.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 183.56,
    "potencia_leida_punta_clp_kw": 28958.0,
    "potencia_leida_parcial_punta_clp_kw": 20408.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5480.0,
    "energia_clp_kwh": 152.29
   }
  },
  "02101": {
   "nombre": "Antofagasta",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.17
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 197.25,
    "potencia_punta_clp_kw": 28531.0,
    "potencia_parcial_punta_clp_kw": 20079.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 197.25,
    "potencia_leida_punta_clp_kw": 28531.0,
    "potencia_leida_parcial_punta_clp_kw": 20079.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6747.0,
    "energia_clp_kwh": 165.97
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 270.17
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 197.25,
      "potencia_punta_clp_kw": 28531.0,
      "potencia_parcial_punta_clp_kw": 20079.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 197.25,
      "potencia_leida_punta_clp_kw": 28531.0,
      "potencia_leida_parcial_punta_clp_kw": 20079.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 6747.0,
      "energia_clp_kwh": 165.97
     }
    },
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 287.88
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 207.44,
      "potencia_punta_clp_kw": 34157.0,
      "potencia_parcial_punta_clp_kw": 22383.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 207.44,
      "potencia_leida_punta_clp_kw": 34157.0,
      "potencia_leida_parcial_punta_clp_kw": 22383.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 7927.0,
      "energia_clp_kwh": 174.52
     }
    }
   }
  },
  "02102": {
   "nombre": "Mejillones",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 136.11
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 63.19,
    "potencia_punta_clp_kw": 28531.0,
    "potencia_parcial_punta_clp_kw": 20079.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 63.19,
    "potencia_leida_punta_clp_kw": 28531.0,
    "potencia_leida_parcial_punta_clp_kw": 20079.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5480.0,
    "energia_clp_kwh": 31.91
   }
  },
  "02103": {
   "nombre": "Sierra Gorda",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 227.24
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 154.32,
    "potencia_punta_clp_kw": 28531.0,
    "potencia_parcial_punta_clp_kw": 20079.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 154.32,
    "potencia_leida_punta_clp_kw": 28531.0,
    "potencia_leida_parcial_punta_clp_kw": 20079.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5480.0,
    "energia_clp_kwh": 123.04
   }
  },
  "02104": {
   "nombre": "Taltal",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 236.52
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 162.11,
    "potencia_punta_clp_kw": 28976.0,
    "potencia_parcial_punta_clp_kw": 20421.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 162.11,
    "potencia_leida_punta_clp_kw": 28976.0,
    "potencia_leida_parcial_punta_clp_kw": 20421.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5480.0,
    "energia_clp_kwh": 129.19
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 236.52
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 162.11,
      "potencia_punta_clp_kw": 28976.0,
      "potencia_parcial_punta_clp_kw": 20421.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 162.11,
      "potencia_leida_punta_clp_kw": 28976.0,
      "potencia_leida_parcial_punta_clp_kw": 20421.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 5480.0,
      "energia_clp_kwh": 129.19
     }
    },
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 241.94
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 161.5,
      "potencia_punta_clp_kw": 34157.0,
      "potencia_parcial_punta_clp_kw": 22383.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 161.5,
      "potencia_leida_punta_clp_kw": 34157.0,
      "potencia_leida_parcial_punta_clp_kw": 22383.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 7927.0,
      "energia_clp_kwh": 128.58
     }
    }
   }
  },
  "02201": {
   "nombre": "Calama",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.17
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 197.25,
    "potencia_punta_clp_kw": 28531.0,
    "potencia_parcial_punta_clp_kw": 20079.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 197.25,
    "potencia_leida_punta_clp_kw": 28531.0,
    "potencia_leida_parcial_punta_clp_kw": 20079.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6747.0,
    "energia_clp_kwh": 165.97
   }
  },
  "02301": {
   "nombre": "Tocopilla",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 174.38
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 101.46,
    "potencia_punta_clp_kw": 28531.0,
    "potencia_parcial_punta_clp_kw": 20079.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 101.46,
    "potencia_leida_punta_clp_kw": 28531.0,
    "potencia_leida_parcial_punta_clp_kw": 20079.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5480.0,
    "energia_clp_kwh": 70.19
   }
  },
  "03101": {
   "nombre": "Copiapó",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 266.49
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.08,
    "potencia_punta_clp_kw": 27188.0,
    "potencia_parcial_punta_clp_kw": 19044.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.08,
    "potencia_leida_punta_clp_kw": 27188.0,
    "potencia_leida_parcial_punta_clp_kw": 19044.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5481.0,
    "energia_clp_kwh": 165.16
   }
  },
  "03102": {
   "nombre": "Caldera",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 282.86
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 214.45,
    "potencia_punta_clp_kw": 27188.0,
    "potencia_parcial_punta_clp_kw": 19044.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 214.45,
    "potencia_leida_punta_clp_kw": 27188.0,
    "potencia_leida_parcial_punta_clp_kw": 19044.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5481.0,
    "energia_clp_kwh": 181.52
   }
  },
  "03103": {
   "nombre": "Tierra Amarilla",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 253.71
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 185.31,
    "potencia_punta_clp_kw": 27188.0,
    "potencia_parcial_punta_clp_kw": 19044.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 185.31,
    "potencia_leida_punta_clp_kw": 27188.0,
    "potencia_leida_parcial_punta_clp_kw": 19044.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5481.0,
    "energia_clp_kwh": 152.38
   }
  },
  "03201": {
   "nombre": "Chañaral",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 266.49
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.08,
    "potencia_punta_clp_kw": 27188.0,
    "potencia_parcial_punta_clp_kw": 19044.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.08,
    "potencia_leida_punta_clp_kw": 27188.0,
    "potencia_leida_parcial_punta_clp_kw": 19044.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5481.0,
    "energia_clp_kwh": 165.16
   }
  },
  "03202": {
   "nombre": "Diego de Almagro",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 228.16
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 159.75,
    "potencia_punta_clp_kw": 27188.0,
    "potencia_parcial_punta_clp_kw": 19044.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 159.75,
    "potencia_leida_punta_clp_kw": 27188.0,
    "potencia_leida_parcial_punta_clp_kw": 19044.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5481.0,
    "energia_clp_kwh": 126.83
   }
  },
  "03301": {
   "nombre": "Vallenar",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 266.49
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.08,
    "potencia_punta_clp_kw": 27188.0,
    "potencia_parcial_punta_clp_kw": 19044.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 198.08,
    "potencia_leida_punta_clp_kw": 27188.0,
    "potencia_leida_parcial_punta_clp_kw": 19044.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5481.0,
    "energia_clp_kwh": 165.16
   }
  },
  "03302": {
   "nombre": "Alto del Carmen",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 282.86
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 214.45,
    "potencia_punta_clp_kw": 27188.0,
    "potencia_parcial_punta_clp_kw": 19044.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 214.45,
    "potencia_leida_punta_clp_kw": 27188.0,
    "potencia_leida_parcial_punta_clp_kw": 19044.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5481.0,
    "energia_clp_kwh": 181.52
   }
  },
  "03303": {
   "nombre": "Freirina",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 224.38
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 156.0,
    "potencia_punta_clp_kw": 26801.0,
    "potencia_parcial_punta_clp_kw": 18789.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 156.0,
    "potencia_leida_punta_clp_kw": 26801.0,
    "potencia_leida_parcial_punta_clp_kw": 18789.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5358.0,
    "energia_clp_kwh": 123.08
   }
  },
  "03304": {
   "nombre": "Huasco",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 173.11
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 104.7,
    "potencia_punta_clp_kw": 27188.0,
    "potencia_parcial_punta_clp_kw": 19044.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 104.7,
    "potencia_leida_punta_clp_kw": 27188.0,
    "potencia_leida_parcial_punta_clp_kw": 19044.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5481.0,
    "energia_clp_kwh": 71.78
   }
  },
  "04101": {
   "nombre": "La Serena",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.99
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 169.72
   }
  },
  "04102": {
   "nombre": "Coquimbo",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.99
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 169.72
   }
  },
  "04103": {
   "nombre": "Andacollo",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.99
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 169.72
   }
  },
  "04104": {
   "nombre": "La Higuera",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 244.14
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 175.79,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 175.79,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 142.87
   }
  },
  "04105": {
   "nombre": "Paihuano",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.99
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 169.72
   }
  },
  "04106": {
   "nombre": "Vicuña",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 261.79
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 160.52
   }
  },
  "04201": {
   "nombre": "Illapel",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.99
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 169.72
   }
  },
  "04202": {
   "nombre": "Canela",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.91
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 187.56,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 187.56,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 154.64
   }
  },
  "04203": {
   "nombre": "Los Vilos",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.91
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 187.56,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 187.56,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 154.64
   }
  },
  "04204": {
   "nombre": "Salamanca",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.99
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 169.72
   }
  },
  "04301": {
   "nombre": "Ovalle",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.91
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 187.56,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 187.56,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 154.64
   }
  },
  "04302": {
   "nombre": "Combarbalá",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 261.79
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 160.52
   }
  },
  "04303": {
   "nombre": "Monte Patria",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 261.79
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 160.52
   }
  },
  "04304": {
   "nombre": "Punitaqui",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 261.79
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 160.52
   }
  },
  "04305": {
   "nombre": "Río Hurtado",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.99
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 169.72
   }
  },
  "05101": {
   "nombre": "Valparaíso",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 277.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 200.77,
    "potencia_punta_clp_kw": 31648.0,
    "potencia_parcial_punta_clp_kw": 21931.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 200.77,
    "potencia_leida_punta_clp_kw": 31648.0,
    "potencia_leida_parcial_punta_clp_kw": 21931.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7935.0,
    "energia_clp_kwh": 161.67
   }
  },
  "05105": {
   "nombre": "Puchuncaví",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 181.58
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 113.23,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 113.23,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6446.0,
    "energia_clp_kwh": 80.31
   }
  },
  "05109": {
   "nombre": "Viña del Mar",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 267.82
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 200.77,
    "potencia_punta_clp_kw": 26454.0,
    "potencia_parcial_punta_clp_kw": 18516.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 200.77,
    "potencia_leida_punta_clp_kw": 26454.0,
    "potencia_leida_parcial_punta_clp_kw": 18516.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6618.0,
    "energia_clp_kwh": 161.67
   }
  },
  "05401": {
   "nombre": "La Ligua",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 261.79
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 160.52
   }
  },
  "05402": {
   "nombre": "Cabildo",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 261.79
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 160.52
   }
  },
  "05403": {
   "nombre": "Papudo",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.99
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 169.72
   }
  },
  "05404": {
   "nombre": "Petorca",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 261.79
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 193.44,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5235.0,
    "energia_clp_kwh": 160.52
   }
  },
  "05405": {
   "nombre": "Zapallar",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 270.99
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_punta_clp_kw": 26414.0,
    "potencia_parcial_punta_clp_kw": 18533.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 202.64,
    "potencia_leida_punta_clp_kw": 26414.0,
    "potencia_leida_parcial_punta_clp_kw": 18533.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6446.0,
    "energia_clp_kwh": 169.72
   }
  },
  "05601": {
   "nombre": "San Antonio",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "05603": {
   "nombre": "Cartagena",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 265.02
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 29850.0,
    "potencia_parcial_punta_clp_kw": 20685.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 29850.0,
    "potencia_leida_parcial_punta_clp_kw": 20685.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7484.0,
    "energia_clp_kwh": 157.74
   }
  },
  "05606": {
   "nombre": "Santo Domingo",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "05801": {
   "nombre": "Quilpué",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 267.82
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 200.77,
    "potencia_punta_clp_kw": 26454.0,
    "potencia_parcial_punta_clp_kw": 18516.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 200.77,
    "potencia_leida_punta_clp_kw": 26454.0,
    "potencia_leida_parcial_punta_clp_kw": 18516.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5374.0,
    "energia_clp_kwh": 161.67
   }
  },
  "06101": {
   "nombre": "Rancagua",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6560.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06102": {
   "nombre": "Codegua",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06103": {
   "nombre": "Coinco",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06104": {
   "nombre": "Coltauco",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06105": {
   "nombre": "Doñihue",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06106": {
   "nombre": "Graneros",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06107": {
   "nombre": "Las Cabras",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 241.5
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 143.98
   }
  },
  "06108": {
   "nombre": "Machalí",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06109": {
   "nombre": "Malloa",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06110": {
   "nombre": "Mostazal",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 241.5
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 143.98
   }
  },
  "06111": {
   "nombre": "Olivar",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06112": {
   "nombre": "Peumo",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06113": {
   "nombre": "Pichidegua",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 241.5
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 143.98
   }
  },
  "06114": {
   "nombre": "Quinta de Tilcoco",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06115": {
   "nombre": "Rengo",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06116": {
   "nombre": "Requínoa",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06117": {
   "nombre": "San Vicente",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06201": {
   "nombre": "Pichilemu",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06202": {
   "nombre": "La Estrella",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 230.75
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 165.6,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 165.6,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 133.23
   }
  },
  "06203": {
   "nombre": "Litueche",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 230.75
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 165.6,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 165.6,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 133.23
   }
  },
  "06204": {
   "nombre": "Marchihue",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06205": {
   "nombre": "Navidad",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06206": {
   "nombre": "Paredones",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06301": {
   "nombre": "San Fernando",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06302": {
   "nombre": "Chépica",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06303": {
   "nombre": "Chimbarongo",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06304": {
   "nombre": "Lolol",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06305": {
   "nombre": "Nancagua",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06306": {
   "nombre": "Palmilla",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06307": {
   "nombre": "Peralillo",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "06308": {
   "nombre": "Placilla",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06309": {
   "nombre": "Pumanque",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "06310": {
   "nombre": "Santa Cruz",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07101": {
   "nombre": "Talca",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6149.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07102": {
   "nombre": "Constitución",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 256.62
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 29850.0,
    "potencia_parcial_punta_clp_kw": 20685.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 29850.0,
    "potencia_leida_parcial_punta_clp_kw": 20685.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7484.0,
    "energia_clp_kwh": 149.34
   }
  },
  "07103": {
   "nombre": "Curepto",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07104": {
   "nombre": "Empedrado",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07105": {
   "nombre": "Maule",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "07106": {
   "nombre": "Pelarco",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07107": {
   "nombre": "Pencahue",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "07108": {
   "nombre": "Río Claro",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07109": {
   "nombre": "San Clemente",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 241.5
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 143.98
   }
  },
  "07110": {
   "nombre": "San Rafael",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "07201": {
   "nombre": "Cauquenes",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07202": {
   "nombre": "Chanco",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "07203": {
   "nombre": "Pelluhue",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07301": {
   "nombre": "Curicó",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07302": {
   "nombre": "Hualañé",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07303": {
   "nombre": "Licantén",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07304": {
   "nombre": "Molina",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07305": {
   "nombre": "Rauco",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07306": {
   "nombre": "Romeral",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "07307": {
   "nombre": "Sagrada Familia",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07308": {
   "nombre": "Teno",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 241.5
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 143.98
   }
  },
  "07309": {
   "nombre": "Vichuquén",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07401": {
   "nombre": "Linares",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 265.02
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 29850.0,
    "potencia_parcial_punta_clp_kw": 20685.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 29850.0,
    "potencia_leida_parcial_punta_clp_kw": 20685.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7484.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07402": {
   "nombre": "Colbún",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 231.3
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 156.39,
    "potencia_punta_clp_kw": 29850.0,
    "potencia_parcial_punta_clp_kw": 20685.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 156.39,
    "potencia_leida_punta_clp_kw": 29850.0,
    "potencia_leida_parcial_punta_clp_kw": 20685.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7484.0,
    "energia_clp_kwh": 124.02
   }
  },
  "07403": {
   "nombre": "Longaví",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 265.02
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 29850.0,
    "potencia_parcial_punta_clp_kw": 20685.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 29850.0,
    "potencia_leida_parcial_punta_clp_kw": 20685.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7484.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07404": {
   "nombre": "Parral",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07405": {
   "nombre": "Retiro",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 267.47
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 149.34
   }
  },
  "07406": {
   "nombre": "San Javier",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 265.02
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 29850.0,
    "potencia_parcial_punta_clp_kw": 20685.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 29850.0,
    "potencia_leida_parcial_punta_clp_kw": 20685.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7484.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07407": {
   "nombre": "Villa Alegre",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 265.02
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 29850.0,
    "potencia_parcial_punta_clp_kw": 20685.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 29850.0,
    "potencia_leida_parcial_punta_clp_kw": 20685.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7484.0,
    "energia_clp_kwh": 157.74
   }
  },
  "07408": {
   "nombre": "Yerbas Buenas",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 256.62
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 29850.0,
    "potencia_parcial_punta_clp_kw": 20685.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 29850.0,
    "potencia_leida_parcial_punta_clp_kw": 20685.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7484.0,
    "energia_clp_kwh": 149.34
   }
  },
  "08101": {
   "nombre": "Concepción",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6560.0,
    "energia_clp_kwh": 157.74
   }
  },
  "08102": {
   "nombre": "Coronel",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 194.24
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 108.47,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 108.47,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 11930.0,
    "energia_clp_kwh": 76.11
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 194.24
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 108.47,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 108.47,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 11930.0,
      "energia_clp_kwh": 76.11
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 228.57
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 105.34,
      "potencia_punta_clp_kw": 49747.0,
      "potencia_parcial_punta_clp_kw": 36374.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 105.34,
      "potencia_leida_punta_clp_kw": 49747.0,
      "potencia_leida_parcial_punta_clp_kw": 36374.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 5225.0,
      "energia_clp_kwh": 72.98
     }
    }
   }
  },
  "08103": {
   "nombre": "Chiguayante",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "08104": {
   "nombre": "Florida",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 293.96
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 45526.0,
    "potencia_parcial_punta_clp_kw": 30994.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 45526.0,
    "potencia_leida_parcial_punta_clp_kw": 30994.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 16111.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 293.96
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 45526.0,
      "potencia_parcial_punta_clp_kw": 30994.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 45526.0,
      "potencia_leida_parcial_punta_clp_kw": 30994.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 16111.0,
      "energia_clp_kwh": 157.74
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 85045.0,
      "potencia_parcial_punta_clp_kw": 62678.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 85045.0,
      "potencia_leida_parcial_punta_clp_kw": 62678.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 22610.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "08105": {
   "nombre": "Hualqui",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 293.96
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 45526.0,
    "potencia_parcial_punta_clp_kw": 30994.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 45526.0,
    "potencia_leida_parcial_punta_clp_kw": 30994.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 16111.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 293.96
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 45526.0,
      "potencia_parcial_punta_clp_kw": 30994.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 45526.0,
      "potencia_leida_parcial_punta_clp_kw": 30994.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 16111.0,
      "energia_clp_kwh": 157.74
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 59833.0,
      "potencia_parcial_punta_clp_kw": 43890.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 59833.0,
      "potencia_leida_parcial_punta_clp_kw": 43890.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10193.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "08106": {
   "nombre": "Lota",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "08107": {
   "nombre": "Penco",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "08108": {
   "nombre": "San Pedro de La Paz",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6560.0,
    "energia_clp_kwh": 157.74
   }
  },
  "08109": {
   "nombre": "Santa Juana",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "08110": {
   "nombre": "Talcahuano",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "08111": {
   "nombre": "Tomé",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 275.87
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 157.74
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 59833.0,
      "potencia_parcial_punta_clp_kw": 43890.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 59833.0,
      "potencia_leida_parcial_punta_clp_kw": 43890.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10193.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "08112": {
   "nombre": "Hualpén",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 205.58
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 140.43,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 140.43,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 108.06
   }
  },
  "08201": {
   "nombre": "Lebu",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 295.65
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 140.05
   }
  },
  "08202": {
   "nombre": "Arauco",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 295.65
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 140.05
   }
  },
  "08203": {
   "nombre": "Cañete",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "08204": {
   "nombre": "Contulmo",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "08205": {
   "nombre": "Curanilahue",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "08206": {
   "nombre": "Los Álamos",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "08207": {
   "nombre": "Tirúa",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "08301": {
   "nombre": "Los Ángeles",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 285.56
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 45526.0,
    "potencia_parcial_punta_clp_kw": 30994.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 45526.0,
    "potencia_leida_parcial_punta_clp_kw": 30994.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 16111.0,
    "energia_clp_kwh": 149.34
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 285.56
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 181.71,
      "potencia_punta_clp_kw": 45526.0,
      "potencia_parcial_punta_clp_kw": 30994.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 181.71,
      "potencia_leida_punta_clp_kw": 45526.0,
      "potencia_leida_parcial_punta_clp_kw": 30994.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 16111.0,
      "energia_clp_kwh": 149.34
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 295.65
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 172.42,
      "potencia_punta_clp_kw": 59833.0,
      "potencia_parcial_punta_clp_kw": 43890.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 172.42,
      "potencia_leida_punta_clp_kw": 59833.0,
      "potencia_leida_parcial_punta_clp_kw": 43890.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10193.0,
      "energia_clp_kwh": 140.05
     }
    }
   }
  },
  "08302": {
   "nombre": "Antuco",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 261.22
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 137.98,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 137.98,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 105.61
   }
  },
  "08303": {
   "nombre": "Cabrero",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 290.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_punta_clp_kw": 80000.0,
    "potencia_parcial_punta_clp_kw": 58918.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_leida_punta_clp_kw": 80000.0,
    "potencia_leida_parcial_punta_clp_kw": 58918.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 20125.0,
    "energia_clp_kwh": 135.14
   }
  },
  "08304": {
   "nombre": "Laja",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 295.65
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_punta_clp_kw": 69914.0,
    "potencia_parcial_punta_clp_kw": 51402.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_leida_punta_clp_kw": 69914.0,
    "potencia_leida_parcial_punta_clp_kw": 51402.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 15158.0,
    "energia_clp_kwh": 140.05
   }
  },
  "08305": {
   "nombre": "Mulchén",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 267.47
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 149.34
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 267.47
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 181.71,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 181.71,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 149.34
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 295.65
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 172.42,
      "potencia_punta_clp_kw": 49747.0,
      "potencia_parcial_punta_clp_kw": 36374.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 172.42,
      "potencia_leida_punta_clp_kw": 49747.0,
      "potencia_leida_parcial_punta_clp_kw": 36374.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 5225.0,
      "energia_clp_kwh": 140.05
     }
    }
   }
  },
  "08306": {
   "nombre": "Nacimiento",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 295.65
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_punta_clp_kw": 80000.0,
    "potencia_parcial_punta_clp_kw": 58918.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_leida_punta_clp_kw": 80000.0,
    "potencia_leida_parcial_punta_clp_kw": 58918.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 20125.0,
    "energia_clp_kwh": 140.05
   }
  },
  "08307": {
   "nombre": "Negrete",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 290.73
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_punta_clp_kw": 50248.0,
    "potencia_parcial_punta_clp_kw": 36747.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_leida_punta_clp_kw": 50248.0,
    "potencia_leida_parcial_punta_clp_kw": 36747.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5472.0,
    "energia_clp_kwh": 135.14
   }
  },
  "08308": {
   "nombre": "Quilaco",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 252.78
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 129.54,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 129.54,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 97.18
   }
  },
  "08309": {
   "nombre": "Quilleco",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 290.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_punta_clp_kw": 69914.0,
    "potencia_parcial_punta_clp_kw": 51402.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_leida_punta_clp_kw": 69914.0,
    "potencia_leida_parcial_punta_clp_kw": 51402.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 15158.0,
    "energia_clp_kwh": 135.14
   }
  },
  "08310": {
   "nombre": "San Rosendo",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "08311": {
   "nombre": "Santa Bárbara",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 290.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_punta_clp_kw": 69914.0,
    "potencia_parcial_punta_clp_kw": 51402.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_leida_punta_clp_kw": 69914.0,
    "potencia_leida_parcial_punta_clp_kw": 51402.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 15158.0,
    "energia_clp_kwh": 135.14
   }
  },
  "08312": {
   "nombre": "Tucapel",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 290.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_punta_clp_kw": 80000.0,
    "potencia_parcial_punta_clp_kw": 58918.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_leida_punta_clp_kw": 80000.0,
    "potencia_leida_parcial_punta_clp_kw": 58918.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 20125.0,
    "energia_clp_kwh": 135.14
   }
  },
  "08313": {
   "nombre": "Yumbel",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 295.65
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_punta_clp_kw": 80000.0,
    "potencia_parcial_punta_clp_kw": 58918.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_leida_punta_clp_kw": 80000.0,
    "potencia_leida_parcial_punta_clp_kw": 58918.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 20125.0,
    "energia_clp_kwh": 140.05
   }
  },
  "08314": {
   "nombre": "Alto Biobío",
   "region_cut": "08",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 252.78
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 129.54,
    "potencia_punta_clp_kw": 80000.0,
    "potencia_parcial_punta_clp_kw": 58918.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 129.54,
    "potencia_leida_punta_clp_kw": 80000.0,
    "potencia_leida_parcial_punta_clp_kw": 58918.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 20125.0,
    "energia_clp_kwh": 97.18
   }
  },
  "09101": {
   "nombre": "Temuco",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 11930.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 275.87
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 11930.0,
      "energia_clp_kwh": 157.74
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 49747.0,
      "potencia_parcial_punta_clp_kw": 36374.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 49747.0,
      "potencia_leida_parcial_punta_clp_kw": 36374.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 5225.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "09102": {
   "nombre": "Carahue",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09103": {
   "nombre": "Cunco",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09104": {
   "nombre": "Curarrehue",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "09105": {
   "nombre": "Freire",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 275.87
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 157.74
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 59833.0,
      "potencia_parcial_punta_clp_kw": 43890.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 59833.0,
      "potencia_leida_parcial_punta_clp_kw": 43890.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10193.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "09106": {
   "nombre": "Galvarino",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09107": {
   "nombre": "Gorbea",
   "region_cut": "09",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 262.24
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 173.38,
    "potencia_punta_clp_kw": 41397.0,
    "potencia_parcial_punta_clp_kw": 27396.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 173.38,
    "potencia_leida_punta_clp_kw": 41397.0,
    "potencia_leida_parcial_punta_clp_kw": 27396.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 12816.0,
    "energia_clp_kwh": 141.01
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 262.24
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 173.38,
      "potencia_punta_clp_kw": 41397.0,
      "potencia_parcial_punta_clp_kw": 27396.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 173.38,
      "potencia_leida_punta_clp_kw": 41397.0,
      "potencia_leida_parcial_punta_clp_kw": 27396.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 12816.0,
      "energia_clp_kwh": 141.01
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 59833.0,
      "potencia_parcial_punta_clp_kw": 43890.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 59833.0,
      "potencia_leida_parcial_punta_clp_kw": 43890.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10193.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "09108": {
   "nombre": "Lautaro",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 267.47
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 149.34
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 267.47
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 181.71,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 181.71,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 149.34
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 295.65
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 172.42,
      "potencia_punta_clp_kw": 59833.0,
      "potencia_parcial_punta_clp_kw": 43890.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 172.42,
      "potencia_leida_punta_clp_kw": 59833.0,
      "potencia_leida_parcial_punta_clp_kw": 43890.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10193.0,
      "energia_clp_kwh": 140.05
     }
    }
   }
  },
  "09109": {
   "nombre": "Loncoche",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 275.87
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 157.74
     }
    },
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 262.24
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 173.38,
      "potencia_punta_clp_kw": 35180.0,
      "potencia_parcial_punta_clp_kw": 23122.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 173.38,
      "potencia_leida_punta_clp_kw": 35180.0,
      "potencia_leida_parcial_punta_clp_kw": 23122.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9321.0,
      "energia_clp_kwh": 141.01
     }
    }
   }
  },
  "09110": {
   "nombre": "Melipeuco",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 290.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 135.14
   }
  },
  "09111": {
   "nombre": "Nueva Imperial",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.34
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 59833.0,
    "potencia_parcial_punta_clp_kw": 43890.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 59833.0,
    "potencia_leida_parcial_punta_clp_kw": 43890.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10193.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09112": {
   "nombre": "Padre Las Casas",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 275.87
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 157.74
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 49747.0,
      "potencia_parcial_punta_clp_kw": 36374.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 49747.0,
      "potencia_leida_parcial_punta_clp_kw": 36374.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 5225.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "09113": {
   "nombre": "Perquenco",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09114": {
   "nombre": "Pitrufquén",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 275.87
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 157.74
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 49747.0,
      "potencia_parcial_punta_clp_kw": 36374.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 49747.0,
      "potencia_leida_parcial_punta_clp_kw": 36374.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 5225.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "09115": {
   "nombre": "Pucón",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "09116": {
   "nombre": "Saavedra",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09117": {
   "nombre": "Teodoro Schmidt",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09118": {
   "nombre": "Toltén",
   "region_cut": "09",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 265.98
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35366.0,
    "potencia_parcial_punta_clp_kw": 23267.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35366.0,
    "potencia_leida_parcial_punta_clp_kw": 23267.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8510.0,
    "energia_clp_kwh": 140.21
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 265.98
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_punta_clp_kw": 35366.0,
      "potencia_parcial_punta_clp_kw": 23267.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_leida_punta_clp_kw": 35366.0,
      "potencia_leida_parcial_punta_clp_kw": 23267.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 8510.0,
      "energia_clp_kwh": 140.21
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 50248.0,
      "potencia_parcial_punta_clp_kw": 36747.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 50248.0,
      "potencia_leida_parcial_punta_clp_kw": 36747.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 5472.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "09119": {
   "nombre": "Vilcún",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 275.87
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 157.74
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 49747.0,
      "potencia_parcial_punta_clp_kw": 36374.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 49747.0,
      "potencia_leida_parcial_punta_clp_kw": 36374.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 5225.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "09120": {
   "nombre": "Villarrica",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 275.87
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 157.74
     }
    },
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 262.24
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 173.38,
      "potencia_punta_clp_kw": 35533.0,
      "potencia_parcial_punta_clp_kw": 23365.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 173.38,
      "potencia_leida_punta_clp_kw": 35533.0,
      "potencia_leida_parcial_punta_clp_kw": 23365.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 8509.0,
      "energia_clp_kwh": 141.01
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 59833.0,
      "potencia_parcial_punta_clp_kw": 43890.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 59833.0,
      "potencia_leida_parcial_punta_clp_kw": 43890.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10193.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "09121": {
   "nombre": "Cholchol",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09201": {
   "nombre": "Angol",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09202": {
   "nombre": "Collipulli",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 290.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 167.5,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 135.14
   }
  },
  "09203": {
   "nombre": "Curacautín",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09204": {
   "nombre": "Ercilla",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09205": {
   "nombre": "Lonquimay",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 280.9
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 157.66,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 157.66,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 125.3
   }
  },
  "09206": {
   "nombre": "Los Sauces",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 295.65
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 140.05
   }
  },
  "09207": {
   "nombre": "Lumaco",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09208": {
   "nombre": "Purén",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09209": {
   "nombre": "Renaico",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 280.89
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 157.66,
    "potencia_punta_clp_kw": 50248.0,
    "potencia_parcial_punta_clp_kw": 36747.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 157.66,
    "potencia_leida_punta_clp_kw": 50248.0,
    "potencia_leida_parcial_punta_clp_kw": 36747.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5472.0,
    "energia_clp_kwh": 125.3
   }
  },
  "09210": {
   "nombre": "Traiguén",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "09211": {
   "nombre": "Victoria",
   "region_cut": "09",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "10101": {
   "nombre": "Puerto Montt",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 256.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_punta_clp_kw": 35366.0,
    "potencia_parcial_punta_clp_kw": 23267.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_leida_punta_clp_kw": 35366.0,
    "potencia_leida_parcial_punta_clp_kw": 23267.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8510.0,
    "energia_clp_kwh": 130.47
   }
  },
  "10102": {
   "nombre": "Calbuco",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 261.68
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 140.21
   }
  },
  "10103": {
   "nombre": "Cochamó",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 220.05
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 131.37,
    "potencia_punta_clp_kw": 32385.0,
    "potencia_parcial_punta_clp_kw": 21238.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 131.37,
    "potencia_leida_punta_clp_kw": 32385.0,
    "potencia_leida_parcial_punta_clp_kw": 21238.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7571.0,
    "energia_clp_kwh": 130.52
   }
  },
  "10104": {
   "nombre": "Fresia",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 140.21
   }
  },
  "10105": {
   "nombre": "Frutillar",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 253.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 156.43,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 156.43,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 124.24
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 253.26
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 156.43,
      "potencia_punta_clp_kw": 35011.0,
      "potencia_parcial_punta_clp_kw": 23023.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 156.43,
      "potencia_leida_punta_clp_kw": 35011.0,
      "potencia_leida_parcial_punta_clp_kw": 23023.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9321.0,
      "energia_clp_kwh": 124.24
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 259.32
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 146.79,
      "potencia_punta_clp_kw": 71051.0,
      "potencia_parcial_punta_clp_kw": 41833.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 146.79,
      "potencia_leida_punta_clp_kw": 71051.0,
      "potencia_leida_parcial_punta_clp_kw": 41833.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10638.0,
      "energia_clp_kwh": 114.6
     }
    }
   }
  },
  "10106": {
   "nombre": "Los Muermos",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 140.21
   }
  },
  "10107": {
   "nombre": "Llanquihue",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 253.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 156.43,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 156.43,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 124.24
   }
  },
  "10108": {
   "nombre": "Maullín",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 140.21
   }
  },
  "10109": {
   "nombre": "Puerto Varas",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 265.98
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35366.0,
    "potencia_parcial_punta_clp_kw": 23267.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35366.0,
    "potencia_leida_parcial_punta_clp_kw": 23267.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8510.0,
    "energia_clp_kwh": 140.21
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 265.98
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_punta_clp_kw": 35366.0,
      "potencia_parcial_punta_clp_kw": 23267.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_leida_punta_clp_kw": 35366.0,
      "potencia_leida_parcial_punta_clp_kw": 23267.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 8510.0,
      "energia_clp_kwh": 140.21
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 273.69
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_punta_clp_kw": 71051.0,
      "potencia_parcial_punta_clp_kw": 41833.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_leida_punta_clp_kw": 71051.0,
      "potencia_leida_parcial_punta_clp_kw": 41833.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10638.0,
      "energia_clp_kwh": 128.97
     }
    }
   }
  },
  "10201": {
   "nombre": "Castro",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 261.68
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 140.21
   }
  },
  "10202": {
   "nombre": "Ancud",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 251.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 130.47
   }
  },
  "10203": {
   "nombre": "Chonchi",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 251.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 130.47
   }
  },
  "10204": {
   "nombre": "Curaco de Vélez",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 261.68
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 140.21
   }
  },
  "10205": {
   "nombre": "Dalcahue",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 245.71
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 156.43,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 156.43,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 124.24
   }
  },
  "10206": {
   "nombre": "Puqueldón",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 261.68
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 140.21
   }
  },
  "10207": {
   "nombre": "Queilén",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 261.68
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 140.21
   }
  },
  "10208": {
   "nombre": "Quellón",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 251.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 130.47
   }
  },
  "10209": {
   "nombre": "Quemchi",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 261.68
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 140.21
   }
  },
  "10210": {
   "nombre": "Quinchao",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 261.68
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 140.21
   }
  },
  "10301": {
   "nombre": "Osorno",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 265.98
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35366.0,
    "potencia_parcial_punta_clp_kw": 23267.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35366.0,
    "potencia_leida_parcial_punta_clp_kw": 23267.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8510.0,
    "energia_clp_kwh": 140.21
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 265.98
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_punta_clp_kw": 35366.0,
      "potencia_parcial_punta_clp_kw": 23267.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_leida_punta_clp_kw": 35366.0,
      "potencia_leida_parcial_punta_clp_kw": 23267.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 8510.0,
      "energia_clp_kwh": 140.21
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 273.69
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_punta_clp_kw": 71051.0,
      "potencia_parcial_punta_clp_kw": 41833.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_leida_punta_clp_kw": 71051.0,
      "potencia_leida_parcial_punta_clp_kw": 41833.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10638.0,
      "energia_clp_kwh": 128.97
     }
    }
   }
  },
  "10302": {
   "nombre": "Puerto Octay",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 259.48
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 130.47
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 259.48
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 162.66,
      "potencia_punta_clp_kw": 35011.0,
      "potencia_parcial_punta_clp_kw": 23023.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 162.66,
      "potencia_leida_punta_clp_kw": 35011.0,
      "potencia_leida_parcial_punta_clp_kw": 23023.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9321.0,
      "energia_clp_kwh": 130.47
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 264.92
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 152.39,
      "potencia_punta_clp_kw": 71051.0,
      "potencia_parcial_punta_clp_kw": 41833.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 152.39,
      "potencia_leida_punta_clp_kw": 71051.0,
      "potencia_leida_parcial_punta_clp_kw": 41833.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10638.0,
      "energia_clp_kwh": 120.2
     }
    }
   }
  },
  "10303": {
   "nombre": "Purranque",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 140.21
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 269.23
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_punta_clp_kw": 35011.0,
      "potencia_parcial_punta_clp_kw": 23023.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_leida_punta_clp_kw": 35011.0,
      "potencia_leida_parcial_punta_clp_kw": 23023.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9321.0,
      "energia_clp_kwh": 140.21
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 273.69
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_punta_clp_kw": 71051.0,
      "potencia_parcial_punta_clp_kw": 41833.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_leida_punta_clp_kw": 71051.0,
      "potencia_leida_parcial_punta_clp_kw": 41833.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10638.0,
      "energia_clp_kwh": 128.97
     }
    }
   }
  },
  "10304": {
   "nombre": "Puyehue",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 253.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 156.43,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 156.43,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 124.24
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 253.26
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 156.43,
      "potencia_punta_clp_kw": 35011.0,
      "potencia_parcial_punta_clp_kw": 23023.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 156.43,
      "potencia_leida_punta_clp_kw": 35011.0,
      "potencia_leida_parcial_punta_clp_kw": 23023.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9321.0,
      "energia_clp_kwh": 124.24
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 259.32
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 146.79,
      "potencia_punta_clp_kw": 71051.0,
      "potencia_parcial_punta_clp_kw": 41833.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 146.79,
      "potencia_leida_punta_clp_kw": 71051.0,
      "potencia_leida_parcial_punta_clp_kw": 41833.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10638.0,
      "energia_clp_kwh": 114.6
     }
    }
   }
  },
  "10305": {
   "nombre": "Río Negro",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 140.21
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 269.23
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_punta_clp_kw": 35011.0,
      "potencia_parcial_punta_clp_kw": 23023.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_leida_punta_clp_kw": 35011.0,
      "potencia_leida_parcial_punta_clp_kw": 23023.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9321.0,
      "energia_clp_kwh": 140.21
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 273.69
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_punta_clp_kw": 71051.0,
      "potencia_parcial_punta_clp_kw": 41833.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_leida_punta_clp_kw": 71051.0,
      "potencia_leida_parcial_punta_clp_kw": 41833.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10638.0,
      "energia_clp_kwh": 128.97
     }
    }
   }
  },
  "10306": {
   "nombre": "San Juan de la Costa",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 140.21
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 269.23
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_punta_clp_kw": 35011.0,
      "potencia_parcial_punta_clp_kw": 23023.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_leida_punta_clp_kw": 35011.0,
      "potencia_leida_parcial_punta_clp_kw": 23023.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9321.0,
      "energia_clp_kwh": 140.21
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 273.69
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_punta_clp_kw": 71051.0,
      "potencia_parcial_punta_clp_kw": 41833.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_leida_punta_clp_kw": 71051.0,
      "potencia_leida_parcial_punta_clp_kw": 41833.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10638.0,
      "energia_clp_kwh": 128.97
     }
    }
   }
  },
  "10307": {
   "nombre": "San Pablo",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 140.21
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 269.23
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_punta_clp_kw": 35011.0,
      "potencia_parcial_punta_clp_kw": 23023.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_leida_punta_clp_kw": 35011.0,
      "potencia_leida_parcial_punta_clp_kw": 23023.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9321.0,
      "energia_clp_kwh": 140.21
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 273.69
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_punta_clp_kw": 71051.0,
      "potencia_parcial_punta_clp_kw": 41833.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_leida_punta_clp_kw": 71051.0,
      "potencia_leida_parcial_punta_clp_kw": 41833.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10638.0,
      "energia_clp_kwh": 128.97
     }
    }
   }
  },
  "10401": {
   "nombre": "Chaitén",
   "region_cut": "10",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 287.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_punta_clp_kw": 65432.0,
    "potencia_parcial_punta_clp_kw": 51546.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_leida_punta_clp_kw": 65432.0,
    "potencia_leida_parcial_punta_clp_kw": 51546.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 18820.0,
    "energia_clp_kwh": 172.89
   }
  },
  "10402": {
   "nombre": "Futaleufú",
   "region_cut": "10",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 287.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_punta_clp_kw": 65432.0,
    "potencia_parcial_punta_clp_kw": 51546.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_leida_punta_clp_kw": 65432.0,
    "potencia_leida_parcial_punta_clp_kw": 51546.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 18820.0,
    "energia_clp_kwh": 172.89
   }
  },
  "10403": {
   "nombre": "Hualaihué",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 220.05
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 131.37,
    "potencia_punta_clp_kw": 32385.0,
    "potencia_parcial_punta_clp_kw": 21238.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 131.37,
    "potencia_leida_punta_clp_kw": 32385.0,
    "potencia_leida_parcial_punta_clp_kw": 21238.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7571.0,
    "energia_clp_kwh": 130.52
   }
  },
  "10404": {
   "nombre": "Palena",
   "region_cut": "10",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 287.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_punta_clp_kw": 65432.0,
    "potencia_parcial_punta_clp_kw": 51546.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_leida_punta_clp_kw": 65432.0,
    "potencia_leida_parcial_punta_clp_kw": 51546.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 18820.0,
    "energia_clp_kwh": 172.89
   }
  },
  "11101": {
   "nombre": "Coyhaique",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 287.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_punta_clp_kw": 65432.0,
    "potencia_parcial_punta_clp_kw": 51546.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_leida_punta_clp_kw": 65432.0,
    "potencia_leida_parcial_punta_clp_kw": 51546.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 18820.0,
    "energia_clp_kwh": 172.89
   }
  },
  "11102": {
   "nombre": "Lago Verde",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 287.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_punta_clp_kw": 65432.0,
    "potencia_parcial_punta_clp_kw": 51546.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_leida_punta_clp_kw": 65432.0,
    "potencia_leida_parcial_punta_clp_kw": 51546.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 18820.0,
    "energia_clp_kwh": 172.89
   }
  },
  "11201": {
   "nombre": "Aysén",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 287.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_punta_clp_kw": 65432.0,
    "potencia_parcial_punta_clp_kw": 51546.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_leida_punta_clp_kw": 65432.0,
    "potencia_leida_parcial_punta_clp_kw": 51546.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 18820.0,
    "energia_clp_kwh": 172.89
   }
  },
  "11202": {
   "nombre": "Cisnes",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 287.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_punta_clp_kw": 65432.0,
    "potencia_parcial_punta_clp_kw": 51546.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_leida_punta_clp_kw": 65432.0,
    "potencia_leida_parcial_punta_clp_kw": 51546.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 18820.0,
    "energia_clp_kwh": 172.89
   }
  },
  "11301": {
   "nombre": "Cochrane",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 287.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_punta_clp_kw": 65432.0,
    "potencia_parcial_punta_clp_kw": 51546.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_leida_punta_clp_kw": 65432.0,
    "potencia_leida_parcial_punta_clp_kw": 51546.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 18820.0,
    "energia_clp_kwh": 172.89
   }
  },
  "11401": {
   "nombre": "Chile Chico",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 287.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_punta_clp_kw": 65432.0,
    "potencia_parcial_punta_clp_kw": 51546.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_leida_punta_clp_kw": 65432.0,
    "potencia_leida_parcial_punta_clp_kw": 51546.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 18820.0,
    "energia_clp_kwh": 172.89
   }
  },
  "11402": {
   "nombre": "Río Ibáñez",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 287.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_punta_clp_kw": 65432.0,
    "potencia_parcial_punta_clp_kw": 51546.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 173.74,
    "potencia_leida_punta_clp_kw": 65432.0,
    "potencia_leida_parcial_punta_clp_kw": 51546.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 18820.0,
    "energia_clp_kwh": 172.89
   }
  },
  "12101": {
   "nombre": "Punta Arenas",
   "region_cut": "12",
   "distribuidor": "edelmag",
   "BT1": {
    "cargo_fijo_clp_mes": 2335.18,
    "variable_clp_kwh_tramo1": 247.25
   },
   "BT2": {
    "cargo_fijo_clp_mes": 2335.18,
    "energia_total_clp_kwh": 130.62,
    "potencia_punta_clp_kw": 31403.0,
    "potencia_parcial_punta_clp_kw": 21176.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 2335.18,
    "energia_total_clp_kwh": 130.62,
    "potencia_leida_punta_clp_kw": 31403.0,
    "potencia_leida_parcial_punta_clp_kw": 21176.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5921.0,
    "energia_clp_kwh": 129.76
   }
  },
  "12201": {
   "nombre": "Cabo de Hornos",
   "region_cut": "12",
   "distribuidor": "edelmag",
   "BT1": {
    "cargo_fijo_clp_mes": 1962.34,
    "variable_clp_kwh_tramo1": 207.91
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1962.34,
    "energia_total_clp_kwh": 109.89,
    "potencia_punta_clp_kw": 26389.0,
    "potencia_parcial_punta_clp_kw": 17795.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1962.34,
    "energia_total_clp_kwh": 109.89,
    "potencia_leida_punta_clp_kw": 26389.0,
    "potencia_leida_parcial_punta_clp_kw": 17795.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4976.0,
    "energia_clp_kwh": 109.04
   }
  },
  "12301": {
   "nombre": "Porvenir",
   "region_cut": "12",
   "distribuidor": "edelmag",
   "BT1": {
    "cargo_fijo_clp_mes": 1962.34,
    "variable_clp_kwh_tramo1": 207.91
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1962.34,
    "energia_total_clp_kwh": 109.89,
    "potencia_punta_clp_kw": 26389.0,
    "potencia_parcial_punta_clp_kw": 17795.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1962.34,
    "energia_total_clp_kwh": 109.89,
    "potencia_leida_punta_clp_kw": 26389.0,
    "potencia_leida_parcial_punta_clp_kw": 17795.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4976.0,
    "energia_clp_kwh": 109.04
   }
  },
  "12401": {
   "nombre": "Natales",
   "region_cut": "12",
   "distribuidor": "edelmag",
   "BT1": {
    "cargo_fijo_clp_mes": 2335.18,
    "variable_clp_kwh_tramo1": 247.25
   },
   "BT2": {
    "cargo_fijo_clp_mes": 2335.18,
    "energia_total_clp_kwh": 130.62,
    "potencia_punta_clp_kw": 31403.0,
    "potencia_parcial_punta_clp_kw": 21176.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 2335.18,
    "energia_total_clp_kwh": 130.62,
    "potencia_leida_punta_clp_kw": 31403.0,
    "potencia_leida_parcial_punta_clp_kw": 21176.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5921.0,
    "energia_clp_kwh": 129.76
   }
  },
  "12402": {
   "nombre": "Torres del Paine",
   "region_cut": "12",
   "distribuidor": "edelmag",
   "BT1": {
    "cargo_fijo_clp_mes": 2335.18,
    "variable_clp_kwh_tramo1": 247.25
   },
   "BT2": {
    "cargo_fijo_clp_mes": 2335.18,
    "energia_total_clp_kwh": 130.62,
    "potencia_punta_clp_kw": 31403.0,
    "potencia_parcial_punta_clp_kw": 21176.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 2335.18,
    "energia_total_clp_kwh": 130.62,
    "potencia_leida_punta_clp_kw": 31403.0,
    "potencia_leida_parcial_punta_clp_kw": 21176.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5921.0,
    "energia_clp_kwh": 129.76
   }
  },
  "13101": {
   "nombre": "Santiago",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13102": {
   "nombre": "Cerrillos",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13103": {
   "nombre": "Cerro Navia",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13104": {
   "nombre": "Conchalí",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13105": {
   "nombre": "El Bosque",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 240.83
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_punta_clp_kw": 25826.0,
    "potencia_parcial_punta_clp_kw": 18013.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_leida_punta_clp_kw": 25826.0,
    "potencia_leida_parcial_punta_clp_kw": 18013.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5431.0,
    "energia_clp_kwh": 155.12
   }
  },
  "13106": {
   "nombre": "Estación Central",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13107": {
   "nombre": "Huechuraba",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13108": {
   "nombre": "Independencia",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13109": {
   "nombre": "La Cisterna",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13110": {
   "nombre": "La Florida",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13111": {
   "nombre": "La Granja",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13112": {
   "nombre": "La Pintana",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 240.83
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_punta_clp_kw": 25826.0,
    "potencia_parcial_punta_clp_kw": 18013.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_leida_punta_clp_kw": 25826.0,
    "potencia_leida_parcial_punta_clp_kw": 18013.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5431.0,
    "energia_clp_kwh": 155.12
   }
  },
  "13113": {
   "nombre": "La Reina",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13114": {
   "nombre": "Las Condes",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13115": {
   "nombre": "Lo Barnechea",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13116": {
   "nombre": "Lo Espejo",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13117": {
   "nombre": "Lo Prado",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13118": {
   "nombre": "Macul",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13119": {
   "nombre": "Maipú",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13120": {
   "nombre": "Ñuñoa",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13121": {
   "nombre": "Pedro Aguirre Cerda",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13122": {
   "nombre": "Peñalolén",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13123": {
   "nombre": "Providencia",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13124": {
   "nombre": "Pudahuel",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13125": {
   "nombre": "Quilicura",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13126": {
   "nombre": "Quinta Normal",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13127": {
   "nombre": "Recoleta",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13128": {
   "nombre": "Renca",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 228.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 174.61,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 174.61,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 153.27
   }
  },
  "13129": {
   "nombre": "San Joaquín",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13130": {
   "nombre": "San Miguel",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13131": {
   "nombre": "San Ramón",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13132": {
   "nombre": "Vitacura",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13201": {
   "nombre": "Puente Alto",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 236.12
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_punta_clp_kw": 24031.0,
    "potencia_parcial_punta_clp_kw": 16833.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_leida_punta_clp_kw": 24031.0,
    "potencia_leida_parcial_punta_clp_kw": 16833.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 3955.0,
    "energia_clp_kwh": 155.12
   }
  },
  "13202": {
   "nombre": "Pirque",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 232.61
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 168.24,
    "potencia_punta_clp_kw": 25826.0,
    "potencia_parcial_punta_clp_kw": 18013.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 168.24,
    "potencia_leida_punta_clp_kw": 25826.0,
    "potencia_leida_parcial_punta_clp_kw": 18013.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5431.0,
    "energia_clp_kwh": 146.89
   }
  },
  "13203": {
   "nombre": "San José de Maipo",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 216.83
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 152.46,
    "potencia_punta_clp_kw": 25826.0,
    "potencia_parcial_punta_clp_kw": 18013.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 152.46,
    "potencia_leida_punta_clp_kw": 25826.0,
    "potencia_leida_parcial_punta_clp_kw": 18013.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5431.0,
    "energia_clp_kwh": 131.12
   }
  },
  "13301": {
   "nombre": "Colina",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 257.9
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 27986.0,
    "potencia_parcial_punta_clp_kw": 16088.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 27986.0,
    "potencia_leida_parcial_punta_clp_kw": 16088.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9492.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13302": {
   "nombre": "Lampa",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 237.64
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 183.38,
    "potencia_punta_clp_kw": 21627.0,
    "potencia_parcial_punta_clp_kw": 12374.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 183.38,
    "potencia_leida_punta_clp_kw": 21627.0,
    "potencia_leida_parcial_punta_clp_kw": 12374.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4285.0,
    "energia_clp_kwh": 162.04
   }
  },
  "13303": {
   "nombre": "Til Til",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 734.64,
    "variable_clp_kwh_tramo1": 252.79
   },
   "BT2": {
    "cargo_fijo_clp_mes": 734.64,
    "energia_total_clp_kwh": 178.19,
    "potencia_punta_clp_kw": 28633.0,
    "potencia_parcial_punta_clp_kw": 16466.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 906.29,
    "energia_total_clp_kwh": 178.19,
    "potencia_leida_punta_clp_kw": 28633.0,
    "potencia_leida_parcial_punta_clp_kw": 16466.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10221.0,
    "energia_clp_kwh": 148.27
   }
  },
  "13401": {
   "nombre": "San Bernardo",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 240.83
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_punta_clp_kw": 25826.0,
    "potencia_parcial_punta_clp_kw": 18013.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_leida_punta_clp_kw": 25826.0,
    "potencia_leida_parcial_punta_clp_kw": 18013.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5431.0,
    "energia_clp_kwh": 155.12
   }
  },
  "13402": {
   "nombre": "Buin",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "13403": {
   "nombre": "Calera de Tango",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 240.83
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_punta_clp_kw": 25826.0,
    "potencia_parcial_punta_clp_kw": 18013.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_leida_punta_clp_kw": 25826.0,
    "potencia_leida_parcial_punta_clp_kw": 18013.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5431.0,
    "energia_clp_kwh": 155.12
   }
  },
  "13404": {
   "nombre": "Paine",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "13501": {
   "nombre": "Melipilla",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "13502": {
   "nombre": "Alhué",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 246.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 181.71,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 149.34
   }
  },
  "13503": {
   "nombre": "Curacaví",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 250.59
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_punta_clp_kw": 29930.0,
    "potencia_parcial_punta_clp_kw": 20712.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_leida_punta_clp_kw": 29930.0,
    "potencia_leida_parcial_punta_clp_kw": 20712.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7599.0,
    "energia_clp_kwh": 155.12
   }
  },
  "13504": {
   "nombre": "María Pinto",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 239.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 174.97,
    "potencia_punta_clp_kw": 25785.0,
    "potencia_parcial_punta_clp_kw": 17999.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 174.97,
    "potencia_leida_punta_clp_kw": 25785.0,
    "potencia_leida_parcial_punta_clp_kw": 17999.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5379.0,
    "energia_clp_kwh": 148.12
   }
  },
  "13505": {
   "nombre": "San Pedro",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 241.5
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 143.98
   }
  },
  "13601": {
   "nombre": "Talagante",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 248.05
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 183.29,
    "potencia_punta_clp_kw": 25785.0,
    "potencia_parcial_punta_clp_kw": 17999.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 183.29,
    "potencia_leida_punta_clp_kw": 25785.0,
    "potencia_leida_parcial_punta_clp_kw": 17999.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5379.0,
    "energia_clp_kwh": 156.43
   }
  },
  "13602": {
   "nombre": "El Monte",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "13603": {
   "nombre": "Isla de Maipo",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 255.26
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 25744.0,
    "potencia_parcial_punta_clp_kw": 17986.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 25744.0,
    "potencia_leida_parcial_punta_clp_kw": 17986.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5328.0,
    "energia_clp_kwh": 157.74
   }
  },
  "13604": {
   "nombre": "Padre Hurtado",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 240.83
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_punta_clp_kw": 25826.0,
    "potencia_parcial_punta_clp_kw": 18013.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.46,
    "potencia_leida_punta_clp_kw": 25826.0,
    "potencia_leida_parcial_punta_clp_kw": 18013.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5431.0,
    "energia_clp_kwh": 155.12
   }
  },
  "13605": {
   "nombre": "Peñaflor",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 248.05
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 183.29,
    "potencia_punta_clp_kw": 24520.0,
    "potencia_parcial_punta_clp_kw": 17167.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 183.29,
    "potencia_leida_punta_clp_kw": 24520.0,
    "potencia_leida_parcial_punta_clp_kw": 17167.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4967.0,
    "energia_clp_kwh": 156.43
   }
  },
  "14101": {
   "nombre": "Valdivia",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 255.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 165.78,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 165.78,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 133.59
   }
  },
  "14102": {
   "nombre": "Corral",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 261.68
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 140.21
   }
  },
  "14103": {
   "nombre": "Lanco",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 262.24
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 173.38,
    "potencia_punta_clp_kw": 33807.0,
    "potencia_parcial_punta_clp_kw": 22178.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 173.38,
    "potencia_leida_punta_clp_kw": 33807.0,
    "potencia_leida_parcial_punta_clp_kw": 22178.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7927.0,
    "energia_clp_kwh": 141.01
   }
  },
  "14104": {
   "nombre": "Los Lagos",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 41228.0,
    "potencia_parcial_punta_clp_kw": 27297.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 41228.0,
    "potencia_leida_parcial_punta_clp_kw": 27297.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 12816.0,
    "energia_clp_kwh": 140.21
   }
  },
  "14105": {
   "nombre": "Máfil",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 41228.0,
    "potencia_parcial_punta_clp_kw": 27297.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 41228.0,
    "potencia_leida_parcial_punta_clp_kw": 27297.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 12816.0,
    "energia_clp_kwh": 140.21
   }
  },
  "14106": {
   "nombre": "Mariquina",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 251.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_punta_clp_kw": 33642.0,
    "potencia_parcial_punta_clp_kw": 22082.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_leida_punta_clp_kw": 33642.0,
    "potencia_leida_parcial_punta_clp_kw": 22082.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7928.0,
    "energia_clp_kwh": 130.47
   }
  },
  "14107": {
   "nombre": "Paillaco",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 41228.0,
    "potencia_parcial_punta_clp_kw": 27297.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 41228.0,
    "potencia_leida_parcial_punta_clp_kw": 27297.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 12816.0,
    "energia_clp_kwh": 140.21
   }
  },
  "14108": {
   "nombre": "Panguipulli",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 259.49
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_punta_clp_kw": 41228.0,
    "potencia_parcial_punta_clp_kw": 27297.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_leida_punta_clp_kw": 41228.0,
    "potencia_leida_parcial_punta_clp_kw": 27297.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 12816.0,
    "energia_clp_kwh": 130.47
   }
  },
  "14201": {
   "nombre": "La Unión",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 140.21
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 269.23
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_punta_clp_kw": 35011.0,
      "potencia_parcial_punta_clp_kw": 23023.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 172.4,
      "potencia_leida_punta_clp_kw": 35011.0,
      "potencia_leida_parcial_punta_clp_kw": 23023.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9321.0,
      "energia_clp_kwh": 140.21
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 273.69
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_punta_clp_kw": 71051.0,
      "potencia_parcial_punta_clp_kw": 41833.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 161.16,
      "potencia_leida_punta_clp_kw": 71051.0,
      "potencia_leida_parcial_punta_clp_kw": 41833.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10638.0,
      "energia_clp_kwh": 128.97
     }
    }
   }
  },
  "14202": {
   "nombre": "Futrono",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 41228.0,
    "potencia_parcial_punta_clp_kw": 27297.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 41228.0,
    "potencia_leida_parcial_punta_clp_kw": 27297.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 12816.0,
    "energia_clp_kwh": 140.21
   }
  },
  "14203": {
   "nombre": "Lago Ranco",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 269.23
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 172.4,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 140.21
   }
  },
  "14204": {
   "nombre": "Río Bueno",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1246.48,
    "variable_clp_kwh_tramo1": 259.48
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_punta_clp_kw": 35011.0,
    "potencia_parcial_punta_clp_kw": 23023.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1246.48,
    "energia_total_clp_kwh": 162.66,
    "potencia_leida_punta_clp_kw": 35011.0,
    "potencia_leida_parcial_punta_clp_kw": 23023.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9321.0,
    "energia_clp_kwh": 130.47
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1246.48,
      "variable_clp_kwh_tramo1": 259.48
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 162.66,
      "potencia_punta_clp_kw": 35011.0,
      "potencia_parcial_punta_clp_kw": 23023.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1246.48,
      "energia_total_clp_kwh": 162.66,
      "potencia_leida_punta_clp_kw": 35011.0,
      "potencia_leida_parcial_punta_clp_kw": 23023.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9321.0,
      "energia_clp_kwh": 130.47
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 264.92
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 152.39,
      "potencia_punta_clp_kw": 84518.0,
      "potencia_parcial_punta_clp_kw": 49400.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 152.39,
      "potencia_leida_punta_clp_kw": 84518.0,
      "potencia_leida_parcial_punta_clp_kw": 49400.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 12947.0,
      "energia_clp_kwh": 120.2
     }
    }
   }
  },
  "15101": {
   "nombre": "Arica",
   "region_cut": "15",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 200.68,
    "potencia_punta_clp_kw": 29181.0,
    "potencia_parcial_punta_clp_kw": 20579.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 200.68,
    "potencia_leida_punta_clp_kw": 29181.0,
    "potencia_leida_parcial_punta_clp_kw": 20579.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6747.0,
    "energia_clp_kwh": 169.4
   }
  },
  "15102": {
   "nombre": "Camarones",
   "region_cut": "15",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 260.73
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 185.64,
    "potencia_punta_clp_kw": 29181.0,
    "potencia_parcial_punta_clp_kw": 20579.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 185.64,
    "potencia_leida_punta_clp_kw": 29181.0,
    "potencia_leida_parcial_punta_clp_kw": 20579.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5480.0,
    "energia_clp_kwh": 154.36
   }
  },
  "15202": {
   "nombre": "General Lagos",
   "region_cut": "15",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 278.4
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 200.68,
    "potencia_punta_clp_kw": 27260.0,
    "potencia_parcial_punta_clp_kw": 19316.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 200.68,
    "potencia_leida_punta_clp_kw": 27260.0,
    "potencia_leida_parcial_punta_clp_kw": 19316.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4853.0,
    "energia_clp_kwh": 169.4
   }
  },
  "16101": {
   "nombre": "Chillán",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 11930.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16102": {
   "nombre": "Bulnes",
   "region_cut": "16",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 295.65
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 140.05
   }
  },
  "16103": {
   "nombre": "Chillán Viejo",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 275.87
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 157.74
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 71058.0,
      "potencia_parcial_punta_clp_kw": 52255.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 71058.0,
      "potencia_leida_parcial_punta_clp_kw": 52255.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 12462.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "16104": {
   "nombre": "El Carmen",
   "region_cut": "16",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "16105": {
   "nombre": "Pemuco",
   "region_cut": "16",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 80000.0,
    "potencia_parcial_punta_clp_kw": 58918.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 80000.0,
    "potencia_leida_parcial_punta_clp_kw": 58918.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 20125.0,
    "energia_clp_kwh": 147.74
   }
  },
  "16106": {
   "nombre": "Pinto",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 275.87
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 190.11,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 157.74
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 303.34
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_punta_clp_kw": 59833.0,
      "potencia_parcial_punta_clp_kw": 43890.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 180.11,
      "potencia_leida_punta_clp_kw": 59833.0,
      "potencia_leida_parcial_punta_clp_kw": 43890.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10193.0,
      "energia_clp_kwh": 147.74
     }
    }
   }
  },
  "16107": {
   "nombre": "Quillón",
   "region_cut": "16",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 80000.0,
    "potencia_parcial_punta_clp_kw": 58918.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 80000.0,
    "potencia_leida_parcial_punta_clp_kw": 58918.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 20125.0,
    "energia_clp_kwh": 147.74
   }
  },
  "16108": {
   "nombre": "San Ignacio",
   "region_cut": "16",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 303.35
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_punta_clp_kw": 57639.0,
    "potencia_parcial_punta_clp_kw": 42255.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 180.11,
    "potencia_leida_punta_clp_kw": 57639.0,
    "potencia_leida_parcial_punta_clp_kw": 42255.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9749.0,
    "energia_clp_kwh": 147.74
   }
  },
  "16109": {
   "nombre": "Yungay",
   "region_cut": "16",
   "distribuidor": "frontel",
   "BT1": {
    "cargo_fijo_clp_mes": 1319.13,
    "variable_clp_kwh_tramo1": 295.65
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_punta_clp_kw": 80000.0,
    "potencia_parcial_punta_clp_kw": 58918.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1319.13,
    "energia_total_clp_kwh": 172.42,
    "potencia_leida_punta_clp_kw": 80000.0,
    "potencia_leida_parcial_punta_clp_kw": 58918.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 20125.0,
    "energia_clp_kwh": 140.05
   }
  },
  "16201": {
   "nombre": "Quirihue",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16202": {
   "nombre": "Cobquecura",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16203": {
   "nombre": "Coelemu",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16204": {
   "nombre": "Ninhue",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16205": {
   "nombre": "Portezuelo",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16206": {
   "nombre": "Ránquil",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 262.11
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 176.34,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 143.98
   },
   "por_distribuidor": {
    "cge": {
     "BT1": {
      "cargo_fijo_clp_mes": 1071.14,
      "variable_clp_kwh_tramo1": 262.11
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 176.34,
      "potencia_punta_clp_kw": 36384.0,
      "potencia_parcial_punta_clp_kw": 24982.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1071.14,
      "energia_total_clp_kwh": 176.34,
      "potencia_leida_punta_clp_kw": 36384.0,
      "potencia_leida_parcial_punta_clp_kw": 24982.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10954.0,
      "energia_clp_kwh": 143.98
     }
    },
    "frontel": {
     "BT1": {
      "cargo_fijo_clp_mes": 1319.13,
      "variable_clp_kwh_tramo1": 290.74
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 167.5,
      "potencia_punta_clp_kw": 59833.0,
      "potencia_parcial_punta_clp_kw": 43890.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1319.13,
      "energia_total_clp_kwh": 167.5,
      "potencia_leida_punta_clp_kw": 59833.0,
      "potencia_leida_parcial_punta_clp_kw": 43890.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10193.0,
      "energia_clp_kwh": 135.14
     }
    }
   }
  },
  "16207": {
   "nombre": "Treguaco",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16301": {
   "nombre": "San Carlos",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16302": {
   "nombre": "Coihueco",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16303": {
   "nombre": "Ñiquén",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16304": {
   "nombre": "San Fabián",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  },
  "16305": {
   "nombre": "San Nicolás",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1071.14,
    "variable_clp_kwh_tramo1": 275.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_punta_clp_kw": 36384.0,
    "potencia_parcial_punta_clp_kw": 24982.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1071.14,
    "energia_total_clp_kwh": 190.11,
    "potencia_leida_punta_clp_kw": 36384.0,
    "potencia_leida_parcial_punta_clp_kw": 24982.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10954.0,
    "energia_clp_kwh": 157.74
   }
  }
 }
};
