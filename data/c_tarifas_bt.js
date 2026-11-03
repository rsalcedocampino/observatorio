window.PW_DATA.c_tarifas_bt = {
 "generado": "2026-11-03",
 "vigencia": "2026-08-01",
 "nota": "Tarifas de los pliegos de agosto de 2026 de CGE (con sus filiales), Enel, Saesa, Luz Osorno y Edelaysén, red aérea, con IVA salvo el cargo por servicio público. Cada región es el promedio simple de sus comunas, sin ponderar por clientes. BT4 es una referencia industrial (promedio de todas las redes en CGE y Enel; en las demás, el BT4 de su propio pliego). Una comuna atendida por dos distribuidoras aparece en ambas y no se promedian entre sí. Sin datos de Magallanes. Para la tarifa de un suministro concreto, consulte el pliego de su distribuidora.",
 "unidades": {
  "cargo_fijo_clp_mes": "$/cliente/mes",
  "variable_clp_kwh_tramo1": "$/kWh (consumo hasta 350 kWh)",
  "energia_total_clp_kwh": "$/kWh",
  "potencia_clp_kw": "$/kW/mes"
 },
 "fuente": [
  {
   "distribuidora": "CGE y filiales",
   "documento": "Tarifas de Suministro Eléctrico vigentes a partir del 1 de agosto de 2026",
   "url": "https://www.cge.cl/informacion-comercial/tarifas-y-procesos-tarifarios/tarifa-de-suministro/"
  },
  {
   "distribuidora": "Enel Distribución",
   "documento": "Tarifas Suministro Eléctrico, Decretos 24T y 5T, agosto de 2026",
   "url": "https://www.enel.cl/es/clientes/tarifas-y-regulacion/conceptos-tarifas.html"
  },
  {
   "distribuidora": "Saesa",
   "documento": "Tarifas de Suministro Eléctrico, agosto de 2026 (Decretos 24T y 5T)",
   "url": "https://web.gruposaesa.cl/web/saesa/pago-y-boleta/tarifas-vigentes"
  },
  {
   "distribuidora": "Luz Osorno",
   "documento": "Tarifas de Suministro Eléctrico, agosto de 2026 (Decretos 24T y 5T)",
   "url": "https://web.gruposaesa.cl/web/luz-osorno/pago-y-boleta/tarifas-vigentes"
  },
  {
   "distribuidora": "Edelaysén",
   "documento": "Tarifas de Suministro Eléctrico, agosto de 2026 (Decretos 24T y 5T)",
   "url": "https://web.gruposaesa.cl/web/edelaysen/pago-y-boleta/tarifas-vigentes"
  }
 ],
 "segmentos_info": {
  "BT1": "Domiciliario (BT1)",
  "BT2": "Potencia contratada, general (BT2)",
  "BT3": "Potencia leída, general (BT3)",
  "BT4": "Referencia industrial (BT4)"
 },
 "regiones_sin_dato": [
  "12"
 ],
 "distribuidoras_incluidas": [
  "cge",
  "edelaysen",
  "enel-distribucion",
  "luz-osorno",
  "saesa"
 ],
 "distribuidoras_nombre": {
  "cge": "CGE y filiales",
  "edelaysen": "Edelaysén",
  "enel-distribucion": "Enel Distribución",
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
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 6
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
   "comunas": 12,
   "distribuidoras": [
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 12
   }
  },
  {
   "region_cut": "09",
   "region": "La Araucanía",
   "region_kit": "La Araucanía",
   "comunas": 10,
   "distribuidoras": [
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 10
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
   "comunas": 15,
   "distribuidoras": [
    "cge"
   ],
   "comunas_por_distribuidora": {
    "cge": 15
   }
  }
 ],
 "tarifas": {
  "01": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 271.57
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 195.7,
     "potencia_punta_clp_kw": 28730.0,
     "potencia_parcial_punta_clp_kw": 20308.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 195.7,
     "potencia_leida_punta_clp_kw": 28730.0,
     "potencia_leida_parcial_punta_clp_kw": 20308.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5662.0,
     "energia_clp_kwh": 164.43
    }
   }
  },
  "02": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 218.24
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 144.48,
     "potencia_punta_clp_kw": 28058.0,
     "potencia_parcial_punta_clp_kw": 19810.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 144.48,
     "potencia_leida_punta_clp_kw": 28058.0,
     "potencia_leida_parcial_punta_clp_kw": 19810.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5606.0,
     "energia_clp_kwh": 112.93
    }
   }
  },
  "03": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 255.49
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 186.57,
     "potencia_punta_clp_kw": 26927.0,
     "potencia_parcial_punta_clp_kw": 18903.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 186.57,
     "potencia_leida_punta_clp_kw": 26927.0,
     "potencia_leida_parcial_punta_clp_kw": 18903.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5306.0,
     "energia_clp_kwh": 153.64
    }
   }
  },
  "04": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 262.63
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 194.0,
     "potencia_punta_clp_kw": 27588.0,
     "potencia_parcial_punta_clp_kw": 19328.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 194.0,
     "potencia_leida_punta_clp_kw": 27588.0,
     "potencia_leida_parcial_punta_clp_kw": 19328.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5551.0,
     "energia_clp_kwh": 161.08
    }
   }
  },
  "05": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 258.2
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 188.52,
     "potencia_punta_clp_kw": 27506.0,
     "potencia_parcial_punta_clp_kw": 19255.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 188.52,
     "potencia_leida_punta_clp_kw": 27506.0,
     "potencia_leida_parcial_punta_clp_kw": 19255.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 6025.0,
     "energia_clp_kwh": 154.19
    }
   }
  },
  "06": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 248.8
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 182.14,
     "potencia_punta_clp_kw": 25810.0,
     "potencia_parcial_punta_clp_kw": 18093.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 182.14,
     "potencia_leida_punta_clp_kw": 25810.0,
     "potencia_leida_parcial_punta_clp_kw": 18093.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5199.0,
     "energia_clp_kwh": 149.78
    }
   }
  },
  "07": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 253.99
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 183.04,
     "potencia_punta_clp_kw": 27612.0,
     "potencia_parcial_punta_clp_kw": 19278.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 183.04,
     "potencia_leida_punta_clp_kw": 27612.0,
     "potencia_leida_parcial_punta_clp_kw": 19278.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 6157.0,
     "energia_clp_kwh": 150.68
    }
   }
  },
  "08": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 256.22
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 174.92,
     "potencia_punta_clp_kw": 31913.0,
     "potencia_parcial_punta_clp_kw": 22106.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 174.92,
     "potencia_leida_punta_clp_kw": 31913.0,
     "potencia_leida_parcial_punta_clp_kw": 22106.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 8864.0,
     "energia_clp_kwh": 142.55
    }
   }
  },
  "09": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 267.77
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 184.82,
     "potencia_punta_clp_kw": 32604.0,
     "potencia_parcial_punta_clp_kw": 22561.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 184.82,
     "potencia_leida_punta_clp_kw": 32604.0,
     "potencia_leida_parcial_punta_clp_kw": 22561.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 9022.0,
     "energia_clp_kwh": 152.46
    }
   }
  },
  "10": {
   "edelaysen": {
    "BT1": {
     "cargo_fijo_clp_mes": 1304.7,
     "variable_clp_kwh_tramo1": 278.94
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1304.7,
     "energia_total_clp_kwh": 212.82,
     "potencia_punta_clp_kw": 68812.0,
     "potencia_parcial_punta_clp_kw": 54169.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1304.7,
     "energia_total_clp_kwh": 212.82,
     "potencia_leida_punta_clp_kw": 68812.0,
     "potencia_leida_parcial_punta_clp_kw": 54169.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 19833.0,
     "energia_clp_kwh": 211.97
    }
   },
   "luz-osorno": {
    "BT1": {
     "cargo_fijo_clp_mes": 1304.7,
     "variable_clp_kwh_tramo1": 281.27
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1304.7,
     "energia_total_clp_kwh": 154.13,
     "potencia_punta_clp_kw": 72845.0,
     "potencia_parcial_punta_clp_kw": 42919.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1304.7,
     "energia_total_clp_kwh": 154.13,
     "potencia_leida_punta_clp_kw": 72845.0,
     "potencia_leida_parcial_punta_clp_kw": 42919.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 10863.0,
     "energia_clp_kwh": 121.94
    }
   },
   "saesa": {
    "BT1": {
     "cargo_fijo_clp_mes": 1232.84,
     "variable_clp_kwh_tramo1": 261.11
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1232.84,
     "energia_total_clp_kwh": 165.3,
     "potencia_punta_clp_kw": 35645.0,
     "potencia_parcial_punta_clp_kw": 23416.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1232.84,
     "energia_total_clp_kwh": 165.3,
     "potencia_leida_punta_clp_kw": 35645.0,
     "potencia_leida_parcial_punta_clp_kw": 23416.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 8869.0,
     "energia_clp_kwh": 135.43
    }
   }
  },
  "11": {
   "edelaysen": {
    "BT1": {
     "cargo_fijo_clp_mes": 1304.7,
     "variable_clp_kwh_tramo1": 278.94
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1304.7,
     "energia_total_clp_kwh": 212.83,
     "potencia_punta_clp_kw": 68812.0,
     "potencia_parcial_punta_clp_kw": 54169.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1304.7,
     "energia_total_clp_kwh": 212.83,
     "potencia_leida_punta_clp_kw": 68812.0,
     "potencia_leida_parcial_punta_clp_kw": 54169.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 19833.0,
     "energia_clp_kwh": 211.97
    }
   }
  },
  "13": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 243.2
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 176.78,
     "potencia_punta_clp_kw": 25758.0,
     "potencia_parcial_punta_clp_kw": 18042.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 176.78,
     "potencia_leida_punta_clp_kw": 25758.0,
     "potencia_leida_parcial_punta_clp_kw": 18042.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5193.0,
     "energia_clp_kwh": 150.5
    }
   },
   "enel-distribucion": {
    "BT1": {
     "cargo_fijo_clp_mes": 726.6,
     "variable_clp_kwh_tramo1": 232.77
    },
    "BT2": {
     "cargo_fijo_clp_mes": 726.6,
     "energia_total_clp_kwh": 176.94,
     "potencia_punta_clp_kw": 21959.0,
     "potencia_parcial_punta_clp_kw": 12558.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 896.37,
     "energia_total_clp_kwh": 176.94,
     "potencia_leida_punta_clp_kw": 21959.0,
     "potencia_leida_parcial_punta_clp_kw": 12558.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 4378.0,
     "energia_clp_kwh": 155.34
    }
   }
  },
  "14": {
   "luz-osorno": {
    "BT1": {
     "cargo_fijo_clp_mes": 1304.7,
     "variable_clp_kwh_tramo1": 280.19
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1304.7,
     "energia_total_clp_kwh": 153.05,
     "potencia_punta_clp_kw": 72845.0,
     "potencia_parcial_punta_clp_kw": 42919.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1304.7,
     "energia_total_clp_kwh": 153.05,
     "potencia_leida_punta_clp_kw": 72845.0,
     "potencia_leida_parcial_punta_clp_kw": 42919.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 10863.0,
     "energia_clp_kwh": 120.86
    }
   },
   "saesa": {
    "BT1": {
     "cargo_fijo_clp_mes": 1232.84,
     "variable_clp_kwh_tramo1": 270.42
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1232.84,
     "energia_total_clp_kwh": 167.46,
     "potencia_punta_clp_kw": 38867.0,
     "potencia_parcial_punta_clp_kw": 25629.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1232.84,
     "energia_total_clp_kwh": 167.46,
     "potencia_leida_punta_clp_kw": 38867.0,
     "potencia_leida_parcial_punta_clp_kw": 25629.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 10816.0,
     "energia_clp_kwh": 135.26
    }
   }
  },
  "15": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 274.2
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 197.12,
     "potencia_punta_clp_kw": 28859.0,
     "potencia_parcial_punta_clp_kw": 20419.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 197.12,
     "potencia_leida_punta_clp_kw": 28859.0,
     "potencia_leida_parcial_punta_clp_kw": 20419.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 5630.0,
     "energia_clp_kwh": 165.84
    }
   }
  },
  "16": {
   "cge": {
    "BT1": {
     "cargo_fijo_clp_mes": 1063.59,
     "variable_clp_kwh_tramo1": 271.73
    },
    "BT2": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 184.72,
     "potencia_punta_clp_kw": 34303.0,
     "potencia_parcial_punta_clp_kw": 23678.0
    },
    "BT3": {
     "cargo_fijo_clp_mes": 1063.59,
     "energia_total_clp_kwh": 184.72,
     "potencia_leida_punta_clp_kw": 34303.0,
     "potencia_leida_parcial_punta_clp_kw": 23678.0
    },
    "BT4": {
     "potencia_contratada_clp_kw": 9936.0,
     "energia_clp_kwh": 152.35
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
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 268.01
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 192.57,
    "potencia_punta_clp_kw": 28614.0,
    "potencia_parcial_punta_clp_kw": 20232.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 192.57,
    "potencia_leida_punta_clp_kw": 28614.0,
    "potencia_leida_parcial_punta_clp_kw": 20232.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6429.0,
    "energia_clp_kwh": 161.3
   }
  },
  "01107": {
   "nombre": "Alto Hospicio",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 276.25
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.81,
    "potencia_punta_clp_kw": 28614.0,
    "potencia_parcial_punta_clp_kw": 20232.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.81,
    "potencia_leida_punta_clp_kw": 28614.0,
    "potencia_leida_parcial_punta_clp_kw": 20232.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6429.0,
    "energia_clp_kwh": 169.53
   }
  },
  "01401": {
   "nombre": "Pozo Almonte",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 268.01
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 192.57,
    "potencia_punta_clp_kw": 28614.0,
    "potencia_parcial_punta_clp_kw": 20232.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 192.57,
    "potencia_leida_punta_clp_kw": 28614.0,
    "potencia_leida_parcial_punta_clp_kw": 20232.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5222.0,
    "energia_clp_kwh": 161.3
   }
  },
  "01403": {
   "nombre": "Colchane",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 278.84
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.81,
    "potencia_punta_clp_kw": 29309.0,
    "potencia_parcial_punta_clp_kw": 20688.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.81,
    "potencia_leida_punta_clp_kw": 29309.0,
    "potencia_leida_parcial_punta_clp_kw": 20688.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5448.0,
    "energia_clp_kwh": 169.53
   }
  },
  "01404": {
   "nombre": "Huara",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 276.25
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.81,
    "potencia_punta_clp_kw": 28614.0,
    "potencia_parcial_punta_clp_kw": 20232.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.81,
    "potencia_leida_punta_clp_kw": 28614.0,
    "potencia_leida_parcial_punta_clp_kw": 20232.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5222.0,
    "energia_clp_kwh": 169.53
   }
  },
  "01405": {
   "nombre": "Pica",
   "region_cut": "01",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 262.08
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 186.64,
    "potencia_punta_clp_kw": 28614.0,
    "potencia_parcial_punta_clp_kw": 20232.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 186.64,
    "potencia_leida_punta_clp_kw": 28614.0,
    "potencia_leida_parcial_punta_clp_kw": 20232.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5222.0,
    "energia_clp_kwh": 155.36
   }
  },
  "02101": {
   "nombre": "Antofagasta",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 269.37
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 195.67,
    "potencia_punta_clp_kw": 28068.0,
    "potencia_parcial_punta_clp_kw": 19814.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 195.67,
    "potencia_leida_punta_clp_kw": 28068.0,
    "potencia_leida_parcial_punta_clp_kw": 19814.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6419.0,
    "energia_clp_kwh": 164.4
   }
  },
  "02102": {
   "nombre": "Mejillones",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 136.42
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 62.72,
    "potencia_punta_clp_kw": 28068.0,
    "potencia_parcial_punta_clp_kw": 19814.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 62.72,
    "potencia_leida_punta_clp_kw": 28068.0,
    "potencia_leida_parcial_punta_clp_kw": 19814.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5214.0,
    "energia_clp_kwh": 31.45
   }
  },
  "02103": {
   "nombre": "Sierra Gorda",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 221.41
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 147.71,
    "potencia_punta_clp_kw": 28068.0,
    "potencia_parcial_punta_clp_kw": 19814.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 147.71,
    "potencia_leida_punta_clp_kw": 28068.0,
    "potencia_leida_parcial_punta_clp_kw": 19814.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5214.0,
    "energia_clp_kwh": 116.43
   }
  },
  "02104": {
   "nombre": "Taltal",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 248.86
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 174.75,
    "potencia_punta_clp_kw": 28008.0,
    "potencia_parcial_punta_clp_kw": 19788.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 174.75,
    "potencia_leida_punta_clp_kw": 28008.0,
    "potencia_leida_parcial_punta_clp_kw": 19788.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5154.0,
    "energia_clp_kwh": 141.83
   }
  },
  "02201": {
   "nombre": "Calama",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 261.44
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 187.74,
    "potencia_punta_clp_kw": 28068.0,
    "potencia_parcial_punta_clp_kw": 19814.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 187.74,
    "potencia_leida_punta_clp_kw": 28068.0,
    "potencia_leida_parcial_punta_clp_kw": 19814.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6419.0,
    "energia_clp_kwh": 156.47
   }
  },
  "02301": {
   "nombre": "Tocopilla",
   "region_cut": "02",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 171.97
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 98.27,
    "potencia_punta_clp_kw": 28068.0,
    "potencia_parcial_punta_clp_kw": 19814.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 98.27,
    "potencia_leida_punta_clp_kw": 28068.0,
    "potencia_leida_parcial_punta_clp_kw": 19814.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5214.0,
    "energia_clp_kwh": 67.0
   }
  },
  "03101": {
   "nombre": "Copiapó",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 269.01
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.07,
    "potencia_punta_clp_kw": 26888.0,
    "potencia_parcial_punta_clp_kw": 18878.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.07,
    "potencia_leida_punta_clp_kw": 26888.0,
    "potencia_leida_parcial_punta_clp_kw": 18878.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5292.0,
    "energia_clp_kwh": 167.15
   }
  },
  "03102": {
   "nombre": "Caldera",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 277.62
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 208.68,
    "potencia_punta_clp_kw": 26888.0,
    "potencia_parcial_punta_clp_kw": 18878.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 208.68,
    "potencia_leida_punta_clp_kw": 26888.0,
    "potencia_leida_parcial_punta_clp_kw": 18878.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5292.0,
    "energia_clp_kwh": 175.75
   }
  },
  "03103": {
   "nombre": "Tierra Amarilla",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 269.01
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.07,
    "potencia_punta_clp_kw": 26888.0,
    "potencia_parcial_punta_clp_kw": 18878.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.07,
    "potencia_leida_punta_clp_kw": 26888.0,
    "potencia_leida_parcial_punta_clp_kw": 18878.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5292.0,
    "energia_clp_kwh": 167.15
   }
  },
  "03201": {
   "nombre": "Chañaral",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 269.01
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.07,
    "potencia_punta_clp_kw": 26888.0,
    "potencia_parcial_punta_clp_kw": 18878.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.07,
    "potencia_leida_punta_clp_kw": 26888.0,
    "potencia_leida_parcial_punta_clp_kw": 18878.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5292.0,
    "energia_clp_kwh": 167.15
   }
  },
  "03202": {
   "nombre": "Diego de Almagro",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 250.4
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 181.45,
    "potencia_punta_clp_kw": 26888.0,
    "potencia_parcial_punta_clp_kw": 18878.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 181.45,
    "potencia_leida_punta_clp_kw": 26888.0,
    "potencia_leida_parcial_punta_clp_kw": 18878.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5292.0,
    "energia_clp_kwh": 148.53
   }
  },
  "03301": {
   "nombre": "Vallenar",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 269.01
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.07,
    "potencia_punta_clp_kw": 26888.0,
    "potencia_parcial_punta_clp_kw": 18878.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 200.07,
    "potencia_leida_punta_clp_kw": 26888.0,
    "potencia_leida_parcial_punta_clp_kw": 18878.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5292.0,
    "energia_clp_kwh": 167.15
   }
  },
  "03302": {
   "nombre": "Alto del Carmen",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 277.62
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 208.68,
    "potencia_punta_clp_kw": 26888.0,
    "potencia_parcial_punta_clp_kw": 18878.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 208.68,
    "potencia_leida_punta_clp_kw": 26888.0,
    "potencia_leida_parcial_punta_clp_kw": 18878.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5292.0,
    "energia_clp_kwh": 175.75
   }
  },
  "03303": {
   "nombre": "Freirina",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 245.83
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 177.04,
    "potencia_punta_clp_kw": 27238.0,
    "potencia_parcial_punta_clp_kw": 19103.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 177.04,
    "potencia_leida_punta_clp_kw": 27238.0,
    "potencia_leida_parcial_punta_clp_kw": 19103.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5421.0,
    "energia_clp_kwh": 144.12
   }
  },
  "03304": {
   "nombre": "Huasco",
   "region_cut": "03",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 171.9
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 102.96,
    "potencia_punta_clp_kw": 26888.0,
    "potencia_parcial_punta_clp_kw": 18878.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 102.96,
    "potencia_leida_punta_clp_kw": 26888.0,
    "potencia_leida_parcial_punta_clp_kw": 18878.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5292.0,
    "energia_clp_kwh": 70.03
   }
  },
  "04101": {
   "nombre": "La Serena",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "04102": {
   "nombre": "Coquimbo",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "04103": {
   "nombre": "Andacollo",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "04104": {
   "nombre": "La Higuera",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 184.11,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 184.11,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 151.19
   }
  },
  "04105": {
   "nombre": "Paihuano",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "04106": {
   "nombre": "Vicuña",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "04201": {
   "nombre": "Illapel",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "04202": {
   "nombre": "Canela",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 184.11,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 184.11,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 151.19
   }
  },
  "04203": {
   "nombre": "Los Vilos",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 184.11,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 184.11,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 151.19
   }
  },
  "04204": {
   "nombre": "Salamanca",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "04301": {
   "nombre": "Ovalle",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 258.48
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 189.85,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 189.85,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 156.92
   }
  },
  "04302": {
   "nombre": "Combarbalá",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "04303": {
   "nombre": "Monte Patria",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "04304": {
   "nombre": "Punitaqui",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 258.48
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 189.85,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 189.85,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 156.92
   }
  },
  "04305": {
   "nombre": "Río Hurtado",
   "region_cut": "04",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "05101": {
   "nombre": "Valparaíso",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 279.73
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 201.74,
    "potencia_punta_clp_kw": 31120.0,
    "potencia_parcial_punta_clp_kw": 21642.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 201.74,
    "potencia_leida_punta_clp_kw": 31120.0,
    "potencia_leida_parcial_punta_clp_kw": 21642.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7555.0,
    "energia_clp_kwh": 162.64
   }
  },
  "05105": {
   "nombre": "Puchuncaví",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 180.03
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 111.4,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 111.4,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6835.0,
    "energia_clp_kwh": 78.48
   }
  },
  "05109": {
   "nombre": "Viña del Mar",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 270.09
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 201.74,
    "potencia_punta_clp_kw": 25954.0,
    "potencia_parcial_punta_clp_kw": 18244.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 201.74,
    "potencia_leida_punta_clp_kw": 25954.0,
    "potencia_leida_parcial_punta_clp_kw": 18244.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6211.0,
    "energia_clp_kwh": 162.64
   }
  },
  "05401": {
   "nombre": "La Ligua",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "05402": {
   "nombre": "Cabildo",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "05403": {
   "nombre": "Papudo",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "05404": {
   "nombre": "Petorca",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5551.0,
    "energia_clp_kwh": 164.88
   }
  },
  "05405": {
   "nombre": "Zapallar",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 266.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_punta_clp_kw": 27588.0,
    "potencia_parcial_punta_clp_kw": 19328.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 197.8,
    "potencia_leida_punta_clp_kw": 27588.0,
    "potencia_leida_parcial_punta_clp_kw": 19328.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6835.0,
    "energia_clp_kwh": 164.88
   }
  },
  "05601": {
   "nombre": "San Antonio",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "05603": {
   "nombre": "Cartagena",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 261.85
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 29894.0,
    "potencia_parcial_punta_clp_kw": 20778.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 29894.0,
    "potencia_leida_parcial_punta_clp_kw": 20778.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7291.0,
    "energia_clp_kwh": 153.18
   }
  },
  "05606": {
   "nombre": "Santo Domingo",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "05801": {
   "nombre": "Quilpué",
   "region_cut": "05",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 270.09
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 201.74,
    "potencia_punta_clp_kw": 25954.0,
    "potencia_parcial_punta_clp_kw": 18244.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 201.74,
    "potencia_leida_punta_clp_kw": 25954.0,
    "potencia_leida_parcial_punta_clp_kw": 18244.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5045.0,
    "energia_clp_kwh": 162.64
   }
  },
  "06101": {
   "nombre": "Rancagua",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6357.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06102": {
   "nombre": "Codegua",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06103": {
   "nombre": "Coinco",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06104": {
   "nombre": "Coltauco",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06105": {
   "nombre": "Doñihue",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06106": {
   "nombre": "Graneros",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06107": {
   "nombre": "Las Cabras",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 239.72
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 173.06,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 173.06,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 140.69
   }
  },
  "06108": {
   "nombre": "Machalí",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 244.95
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 145.92
   }
  },
  "06109": {
   "nombre": "Malloa",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06110": {
   "nombre": "Mostazal",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 239.72
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 173.06,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 173.06,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 140.69
   }
  },
  "06111": {
   "nombre": "Olivar",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06112": {
   "nombre": "Peumo",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06113": {
   "nombre": "Pichidegua",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 239.72
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 173.06,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 173.06,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 140.69
   }
  },
  "06114": {
   "nombre": "Quinta de Tilcoco",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06115": {
   "nombre": "Rengo",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06116": {
   "nombre": "Requínoa",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 244.95
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 145.92
   }
  },
  "06117": {
   "nombre": "San Vicente",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06201": {
   "nombre": "Pichilemu",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06202": {
   "nombre": "La Estrella",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 229.24
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 162.58,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 162.58,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 130.22
   }
  },
  "06203": {
   "nombre": "Litueche",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 229.24
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 162.58,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 162.58,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 130.22
   }
  },
  "06204": {
   "nombre": "Marchihue",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 244.95
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 145.92
   }
  },
  "06205": {
   "nombre": "Navidad",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06206": {
   "nombre": "Paredones",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06301": {
   "nombre": "San Fernando",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 244.95
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 145.92
   }
  },
  "06302": {
   "nombre": "Chépica",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06303": {
   "nombre": "Chimbarongo",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06304": {
   "nombre": "Lolol",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06305": {
   "nombre": "Nancagua",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06306": {
   "nombre": "Palmilla",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06307": {
   "nombre": "Peralillo",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06308": {
   "nombre": "Placilla",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06309": {
   "nombre": "Pumanque",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "06310": {
   "nombre": "Santa Cruz",
   "region_cut": "06",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07101": {
   "nombre": "Talca",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5959.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07102": {
   "nombre": "Constitución",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 254.59
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_punta_clp_kw": 29894.0,
    "potencia_parcial_punta_clp_kw": 20778.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_leida_punta_clp_kw": 29894.0,
    "potencia_leida_parcial_punta_clp_kw": 20778.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7291.0,
    "energia_clp_kwh": 145.92
   }
  },
  "07103": {
   "nombre": "Curepto",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07104": {
   "nombre": "Empedrado",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07105": {
   "nombre": "Maule",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07106": {
   "nombre": "Pelarco",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07107": {
   "nombre": "Pencahue",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07108": {
   "nombre": "Río Claro",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07109": {
   "nombre": "San Clemente",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 239.72
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 173.06,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 173.06,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 140.69
   }
  },
  "07110": {
   "nombre": "San Rafael",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07201": {
   "nombre": "Cauquenes",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07202": {
   "nombre": "Chanco",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07203": {
   "nombre": "Pelluhue",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07301": {
   "nombre": "Curicó",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07302": {
   "nombre": "Hualañé",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07303": {
   "nombre": "Licantén",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07304": {
   "nombre": "Molina",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07305": {
   "nombre": "Rauco",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07306": {
   "nombre": "Romeral",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07307": {
   "nombre": "Sagrada Familia",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07308": {
   "nombre": "Teno",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 244.95
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 145.92
   }
  },
  "07309": {
   "nombre": "Vichuquén",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07401": {
   "nombre": "Linares",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 261.85
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 29894.0,
    "potencia_parcial_punta_clp_kw": 20778.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 29894.0,
    "potencia_leida_parcial_punta_clp_kw": 20778.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7291.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07402": {
   "nombre": "Colbún",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 220.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 144.62,
    "potencia_punta_clp_kw": 29894.0,
    "potencia_parcial_punta_clp_kw": 20778.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 144.62,
    "potencia_leida_punta_clp_kw": 29894.0,
    "potencia_leida_parcial_punta_clp_kw": 20778.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7291.0,
    "energia_clp_kwh": 112.26
   }
  },
  "07403": {
   "nombre": "Longaví",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 261.85
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 29894.0,
    "potencia_parcial_punta_clp_kw": 20778.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 29894.0,
    "potencia_leida_parcial_punta_clp_kw": 20778.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7291.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07404": {
   "nombre": "Parral",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07405": {
   "nombre": "Retiro",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07406": {
   "nombre": "San Javier",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 261.85
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 29894.0,
    "potencia_parcial_punta_clp_kw": 20778.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 29894.0,
    "potencia_leida_parcial_punta_clp_kw": 20778.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7291.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07407": {
   "nombre": "Villa Alegre",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 261.85
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 29894.0,
    "potencia_parcial_punta_clp_kw": 20778.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 29894.0,
    "potencia_leida_parcial_punta_clp_kw": 20778.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7291.0,
    "energia_clp_kwh": 153.18
   }
  },
  "07408": {
   "nombre": "Yerbas Buenas",
   "region_cut": "07",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 254.59
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_punta_clp_kw": 29894.0,
    "potencia_parcial_punta_clp_kw": 20778.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_leida_punta_clp_kw": 29894.0,
    "potencia_leida_parcial_punta_clp_kw": 20778.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7291.0,
    "energia_clp_kwh": 145.92
   }
  },
  "08101": {
   "nombre": "Concepción",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6357.0,
    "energia_clp_kwh": 153.18
   }
  },
  "08102": {
   "nombre": "Coronel",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 193.74
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 106.72,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 106.72,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10757.0,
    "energia_clp_kwh": 74.35
   }
  },
  "08103": {
   "nombre": "Chiguayante",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "08104": {
   "nombre": "Florida",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 290.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 41732.0,
    "potencia_parcial_punta_clp_kw": 28563.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 41732.0,
    "potencia_leida_parcial_punta_clp_kw": 28563.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 14163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "08105": {
   "nombre": "Hualqui",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 290.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 41732.0,
    "potencia_parcial_punta_clp_kw": 28563.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 41732.0,
    "potencia_leida_parcial_punta_clp_kw": 28563.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 14163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "08107": {
   "nombre": "Penco",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "08108": {
   "nombre": "San Pedro de La Paz",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6357.0,
    "energia_clp_kwh": 153.18
   }
  },
  "08110": {
   "nombre": "Talcahuano",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "08111": {
   "nombre": "Tomé",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "08112": {
   "nombre": "Hualpén",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 203.48
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 136.82,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 136.82,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 104.46
   }
  },
  "08301": {
   "nombre": "Los Ángeles",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 290.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 41732.0,
    "potencia_parcial_punta_clp_kw": 28563.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 41732.0,
    "potencia_leida_parcial_punta_clp_kw": 28563.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 14163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "08305": {
   "nombre": "Mulchén",
   "region_cut": "08",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "09101": {
   "nombre": "Temuco",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10757.0,
    "energia_clp_kwh": 153.18
   }
  },
  "09104": {
   "nombre": "Curarrehue",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "09105": {
   "nombre": "Freire",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "09108": {
   "nombre": "Lautaro",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 265.31
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 145.92
   }
  },
  "09109": {
   "nombre": "Loncoche",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "09112": {
   "nombre": "Padre Las Casas",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "09114": {
   "nombre": "Pitrufquén",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "09115": {
   "nombre": "Pucón",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "09119": {
   "nombre": "Vilcún",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "09120": {
   "nombre": "Villarrica",
   "region_cut": "09",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "10101": {
   "nombre": "Puerto Montt",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 255.87
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_punta_clp_kw": 32927.0,
    "potencia_parcial_punta_clp_kw": 21547.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_leida_punta_clp_kw": 32927.0,
    "potencia_leida_parcial_punta_clp_kw": 21547.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7546.0,
    "energia_clp_kwh": 130.81
   }
  },
  "10102": {
   "nombre": "Calbuco",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10103": {
   "nombre": "Cochamó",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 223.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 135.06,
    "potencia_punta_clp_kw": 31686.0,
    "potencia_parcial_punta_clp_kw": 20694.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 135.06,
    "potencia_leida_punta_clp_kw": 31686.0,
    "potencia_leida_parcial_punta_clp_kw": 20694.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7128.0,
    "energia_clp_kwh": 134.21
   }
  },
  "10104": {
   "nombre": "Fresia",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10105": {
   "nombre": "Frutillar",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 274.36
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_punta_clp_kw": 37207.0,
      "potencia_parcial_punta_clp_kw": 24489.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_leida_punta_clp_kw": 37207.0,
      "potencia_leida_parcial_punta_clp_kw": 24489.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9988.0,
      "energia_clp_kwh": 137.16
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 282.93
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 123.59
     }
    }
   }
  },
  "10106": {
   "nombre": "Los Muermos",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10107": {
   "nombre": "Llanquihue",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10108": {
   "nombre": "Maullín",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10109": {
   "nombre": "Puerto Varas",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 262.22
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 32927.0,
    "potencia_parcial_punta_clp_kw": 21547.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 32927.0,
    "potencia_leida_parcial_punta_clp_kw": 21547.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7546.0,
    "energia_clp_kwh": 137.16
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 262.22
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_punta_clp_kw": 32927.0,
      "potencia_parcial_punta_clp_kw": 21547.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_leida_punta_clp_kw": 32927.0,
      "potencia_leida_parcial_punta_clp_kw": 21547.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 7546.0,
      "energia_clp_kwh": 137.16
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 282.93
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 123.59
     }
    }
   }
  },
  "10201": {
   "nombre": "Castro",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10202": {
   "nombre": "Ancud",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 251.71
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 130.81
   }
  },
  "10203": {
   "nombre": "Chonchi",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10204": {
   "nombre": "Curaco de Vélez",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10205": {
   "nombre": "Dalcahue",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 247.13
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 158.42,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 158.42,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 126.23
   }
  },
  "10206": {
   "nombre": "Puqueldón",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10207": {
   "nombre": "Queilén",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10208": {
   "nombre": "Quellón",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10209": {
   "nombre": "Quemchi",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10210": {
   "nombre": "Quinchao",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "10301": {
   "nombre": "Osorno",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 262.22
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 32927.0,
    "potencia_parcial_punta_clp_kw": 21547.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 32927.0,
    "potencia_leida_parcial_punta_clp_kw": 21547.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7546.0,
    "energia_clp_kwh": 137.16
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 262.22
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_punta_clp_kw": 32927.0,
      "potencia_parcial_punta_clp_kw": 21547.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_leida_punta_clp_kw": 32927.0,
      "potencia_leida_parcial_punta_clp_kw": 21547.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 7546.0,
      "energia_clp_kwh": 137.16
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 282.93
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 123.59
     }
    }
   }
  },
  "10302": {
   "nombre": "Puerto Octay",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 268.01
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 130.81
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 268.01
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 163.0,
      "potencia_punta_clp_kw": 37207.0,
      "potencia_parcial_punta_clp_kw": 24489.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 163.0,
      "potencia_leida_punta_clp_kw": 37207.0,
      "potencia_leida_parcial_punta_clp_kw": 24489.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9988.0,
      "energia_clp_kwh": 130.81
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 277.46
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 150.32,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 150.32,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 118.13
     }
    }
   }
  },
  "10303": {
   "nombre": "Purranque",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 274.36
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_punta_clp_kw": 37207.0,
      "potencia_parcial_punta_clp_kw": 24489.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_leida_punta_clp_kw": 37207.0,
      "potencia_leida_parcial_punta_clp_kw": 24489.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9988.0,
      "energia_clp_kwh": 137.16
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 282.93
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 123.59
     }
    }
   }
  },
  "10304": {
   "nombre": "Puyehue",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 263.43
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 158.42,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 158.42,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 126.23
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 263.43
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 158.42,
      "potencia_punta_clp_kw": 37207.0,
      "potencia_parcial_punta_clp_kw": 24489.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 158.42,
      "potencia_leida_punta_clp_kw": 37207.0,
      "potencia_leida_parcial_punta_clp_kw": 24489.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9988.0,
      "energia_clp_kwh": 126.23
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 273.53
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 146.38,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 146.38,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 114.19
     }
    }
   }
  },
  "10305": {
   "nombre": "Río Negro",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 274.36
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_punta_clp_kw": 37207.0,
      "potencia_parcial_punta_clp_kw": 24489.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_leida_punta_clp_kw": 37207.0,
      "potencia_leida_parcial_punta_clp_kw": 24489.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9988.0,
      "energia_clp_kwh": 137.16
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 282.93
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 123.59
     }
    }
   }
  },
  "10306": {
   "nombre": "San Juan de la Costa",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 274.36
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_punta_clp_kw": 37207.0,
      "potencia_parcial_punta_clp_kw": 24489.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_leida_punta_clp_kw": 37207.0,
      "potencia_leida_parcial_punta_clp_kw": 24489.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9988.0,
      "energia_clp_kwh": 137.16
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 282.93
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 123.59
     }
    }
   }
  },
  "10307": {
   "nombre": "San Pablo",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 274.36
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_punta_clp_kw": 37207.0,
      "potencia_parcial_punta_clp_kw": 24489.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_leida_punta_clp_kw": 37207.0,
      "potencia_leida_parcial_punta_clp_kw": 24489.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9988.0,
      "energia_clp_kwh": 137.16
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 282.93
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 123.59
     }
    }
   }
  },
  "10401": {
   "nombre": "Chaitén",
   "region_cut": "10",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1304.7,
    "variable_clp_kwh_tramo1": 278.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_punta_clp_kw": 68812.0,
    "potencia_parcial_punta_clp_kw": 54169.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_leida_punta_clp_kw": 68812.0,
    "potencia_leida_parcial_punta_clp_kw": 54169.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 19833.0,
    "energia_clp_kwh": 211.97
   }
  },
  "10402": {
   "nombre": "Futaleufú",
   "region_cut": "10",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1304.7,
    "variable_clp_kwh_tramo1": 278.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_punta_clp_kw": 68812.0,
    "potencia_parcial_punta_clp_kw": 54169.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_leida_punta_clp_kw": 68812.0,
    "potencia_leida_parcial_punta_clp_kw": 54169.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 19833.0,
    "energia_clp_kwh": 211.97
   }
  },
  "10403": {
   "nombre": "Hualaihué",
   "region_cut": "10",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 223.77
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 135.06,
    "potencia_punta_clp_kw": 31686.0,
    "potencia_parcial_punta_clp_kw": 20694.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 135.06,
    "potencia_leida_punta_clp_kw": 31686.0,
    "potencia_leida_parcial_punta_clp_kw": 20694.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7128.0,
    "energia_clp_kwh": 134.21
   }
  },
  "10404": {
   "nombre": "Palena",
   "region_cut": "10",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1304.7,
    "variable_clp_kwh_tramo1": 278.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_punta_clp_kw": 68812.0,
    "potencia_parcial_punta_clp_kw": 54169.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_leida_punta_clp_kw": 68812.0,
    "potencia_leida_parcial_punta_clp_kw": 54169.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 19833.0,
    "energia_clp_kwh": 211.97
   }
  },
  "11101": {
   "nombre": "Coyhaique",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1304.7,
    "variable_clp_kwh_tramo1": 278.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_punta_clp_kw": 68812.0,
    "potencia_parcial_punta_clp_kw": 54169.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_leida_punta_clp_kw": 68812.0,
    "potencia_leida_parcial_punta_clp_kw": 54169.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 19833.0,
    "energia_clp_kwh": 211.97
   }
  },
  "11102": {
   "nombre": "Lago Verde",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1304.7,
    "variable_clp_kwh_tramo1": 278.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_punta_clp_kw": 68812.0,
    "potencia_parcial_punta_clp_kw": 54169.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_leida_punta_clp_kw": 68812.0,
    "potencia_leida_parcial_punta_clp_kw": 54169.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 19833.0,
    "energia_clp_kwh": 211.97
   }
  },
  "11201": {
   "nombre": "Aysén",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1304.7,
    "variable_clp_kwh_tramo1": 278.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_punta_clp_kw": 68812.0,
    "potencia_parcial_punta_clp_kw": 54169.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_leida_punta_clp_kw": 68812.0,
    "potencia_leida_parcial_punta_clp_kw": 54169.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 19833.0,
    "energia_clp_kwh": 211.97
   }
  },
  "11202": {
   "nombre": "Cisnes",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1304.7,
    "variable_clp_kwh_tramo1": 278.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_punta_clp_kw": 68812.0,
    "potencia_parcial_punta_clp_kw": 54169.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_leida_punta_clp_kw": 68812.0,
    "potencia_leida_parcial_punta_clp_kw": 54169.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 19833.0,
    "energia_clp_kwh": 211.97
   }
  },
  "11301": {
   "nombre": "Cochrane",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1304.7,
    "variable_clp_kwh_tramo1": 278.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_punta_clp_kw": 68812.0,
    "potencia_parcial_punta_clp_kw": 54169.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_leida_punta_clp_kw": 68812.0,
    "potencia_leida_parcial_punta_clp_kw": 54169.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 19833.0,
    "energia_clp_kwh": 211.97
   }
  },
  "11401": {
   "nombre": "Chile Chico",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1304.7,
    "variable_clp_kwh_tramo1": 278.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_punta_clp_kw": 68812.0,
    "potencia_parcial_punta_clp_kw": 54169.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_leida_punta_clp_kw": 68812.0,
    "potencia_leida_parcial_punta_clp_kw": 54169.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 19833.0,
    "energia_clp_kwh": 211.97
   }
  },
  "11402": {
   "nombre": "Río Ibáñez",
   "region_cut": "11",
   "distribuidor": "edelaysen",
   "BT1": {
    "cargo_fijo_clp_mes": 1304.7,
    "variable_clp_kwh_tramo1": 278.94
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_punta_clp_kw": 68812.0,
    "potencia_parcial_punta_clp_kw": 54169.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1304.7,
    "energia_total_clp_kwh": 212.82,
    "potencia_leida_punta_clp_kw": 68812.0,
    "potencia_leida_parcial_punta_clp_kw": 54169.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 19833.0,
    "energia_clp_kwh": 211.97
   }
  },
  "13101": {
   "nombre": "Santiago",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13102": {
   "nombre": "Cerrillos",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13103": {
   "nombre": "Cerro Navia",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13104": {
   "nombre": "Conchalí",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13105": {
   "nombre": "El Bosque",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 237.98
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_punta_clp_kw": 25509.0,
    "potencia_parcial_punta_clp_kw": 17865.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_leida_punta_clp_kw": 25509.0,
    "potencia_leida_parcial_punta_clp_kw": 17865.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5152.0,
    "energia_clp_kwh": 150.87
   }
  },
  "13106": {
   "nombre": "Estación Central",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13107": {
   "nombre": "Huechuraba",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13108": {
   "nombre": "Independencia",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13109": {
   "nombre": "La Cisterna",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13110": {
   "nombre": "La Florida",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13111": {
   "nombre": "La Granja",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13112": {
   "nombre": "La Pintana",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 237.98
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_punta_clp_kw": 25509.0,
    "potencia_parcial_punta_clp_kw": 17865.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_leida_punta_clp_kw": 25509.0,
    "potencia_leida_parcial_punta_clp_kw": 17865.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5152.0,
    "energia_clp_kwh": 150.87
   }
  },
  "13113": {
   "nombre": "La Reina",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13114": {
   "nombre": "Las Condes",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13115": {
   "nombre": "Lo Barnechea",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13116": {
   "nombre": "Lo Espejo",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13117": {
   "nombre": "Lo Prado",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13118": {
   "nombre": "Macul",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13119": {
   "nombre": "Maipú",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13120": {
   "nombre": "Ñuñoa",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13121": {
   "nombre": "Pedro Aguirre Cerda",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13122": {
   "nombre": "Peñalolén",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13123": {
   "nombre": "Providencia",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13124": {
   "nombre": "Pudahuel",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13125": {
   "nombre": "Quilicura",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13126": {
   "nombre": "Quinta Normal",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13127": {
   "nombre": "Recoleta",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13128": {
   "nombre": "Renca",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 224.41
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 169.78,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 169.78,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 148.44
   }
  },
  "13129": {
   "nombre": "San Joaquín",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13130": {
   "nombre": "San Miguel",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13131": {
   "nombre": "San Ramón",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13132": {
   "nombre": "Vitacura",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13201": {
   "nombre": "Puente Alto",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 233.32
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_punta_clp_kw": 23558.0,
    "potencia_parcial_punta_clp_kw": 16582.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_leida_punta_clp_kw": 23558.0,
    "potencia_leida_parcial_punta_clp_kw": 16582.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 3686.0,
    "energia_clp_kwh": 150.87
   }
  },
  "13202": {
   "nombre": "Pirque",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 230.86
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 165.1,
    "potencia_punta_clp_kw": 25509.0,
    "potencia_parcial_punta_clp_kw": 17865.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 165.1,
    "potencia_leida_punta_clp_kw": 25509.0,
    "potencia_leida_parcial_punta_clp_kw": 17865.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5152.0,
    "energia_clp_kwh": 143.75
   }
  },
  "13203": {
   "nombre": "San José de Maipo",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 225.72
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 159.97,
    "potencia_punta_clp_kw": 25509.0,
    "potencia_parcial_punta_clp_kw": 17865.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 159.97,
    "potencia_leida_punta_clp_kw": 25509.0,
    "potencia_leida_parcial_punta_clp_kw": 17865.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5152.0,
    "energia_clp_kwh": 138.62
   }
  },
  "13301": {
   "nombre": "Colina",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 251.56
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 28470.0,
    "potencia_parcial_punta_clp_kw": 16361.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 28470.0,
    "potencia_leida_parcial_punta_clp_kw": 16361.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9499.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13302": {
   "nombre": "Lampa",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 231.92
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 177.28,
    "potencia_punta_clp_kw": 21516.0,
    "potencia_parcial_punta_clp_kw": 12299.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 177.28,
    "potencia_leida_punta_clp_kw": 21516.0,
    "potencia_leida_parcial_punta_clp_kw": 12299.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 4021.0,
    "energia_clp_kwh": 155.94
   }
  },
  "13303": {
   "nombre": "Til Til",
   "region_cut": "13",
   "distribuidor": "enel-distribucion",
   "BT1": {
    "cargo_fijo_clp_mes": 726.6,
    "variable_clp_kwh_tramo1": 247.95
   },
   "BT2": {
    "cargo_fijo_clp_mes": 726.6,
    "energia_total_clp_kwh": 173.56,
    "potencia_punta_clp_kw": 29201.0,
    "potencia_parcial_punta_clp_kw": 16787.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 896.37,
    "energia_total_clp_kwh": 173.56,
    "potencia_leida_punta_clp_kw": 29201.0,
    "potencia_leida_parcial_punta_clp_kw": 16787.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10311.0,
    "energia_clp_kwh": 143.64
   }
  },
  "13401": {
   "nombre": "San Bernardo",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 237.98
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_punta_clp_kw": 25509.0,
    "potencia_parcial_punta_clp_kw": 17865.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_leida_punta_clp_kw": 25509.0,
    "potencia_leida_parcial_punta_clp_kw": 17865.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5152.0,
    "energia_clp_kwh": 150.87
   }
  },
  "13402": {
   "nombre": "Buin",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "13403": {
   "nombre": "Calera de Tango",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 237.98
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_punta_clp_kw": 25509.0,
    "potencia_parcial_punta_clp_kw": 17865.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_leida_punta_clp_kw": 25509.0,
    "potencia_leida_parcial_punta_clp_kw": 17865.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5152.0,
    "energia_clp_kwh": 150.87
   }
  },
  "13404": {
   "nombre": "Paine",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "13501": {
   "nombre": "Melipilla",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "13502": {
   "nombre": "Alhué",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "13503": {
   "nombre": "Curacaví",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 247.62
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_punta_clp_kw": 29842.0,
    "potencia_parcial_punta_clp_kw": 20714.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_leida_punta_clp_kw": 29842.0,
    "potencia_leida_parcial_punta_clp_kw": 20714.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 7370.0,
    "energia_clp_kwh": 150.87
   }
  },
  "13504": {
   "nombre": "María Pinto",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 245.09
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.88,
    "potencia_punta_clp_kw": 25659.0,
    "potencia_parcial_punta_clp_kw": 17979.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.88,
    "potencia_leida_punta_clp_kw": 25659.0,
    "potencia_leida_parcial_punta_clp_kw": 17979.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5158.0,
    "energia_clp_kwh": 152.03
   }
  },
  "13505": {
   "nombre": "San Pedro",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 244.95
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.29,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 145.92
   }
  },
  "13601": {
   "nombre": "Talagante",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 245.09
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.88,
    "potencia_punta_clp_kw": 25659.0,
    "potencia_parcial_punta_clp_kw": 17979.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.88,
    "potencia_leida_punta_clp_kw": 25659.0,
    "potencia_leida_parcial_punta_clp_kw": 17979.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5158.0,
    "energia_clp_kwh": 152.03
   }
  },
  "13602": {
   "nombre": "El Monte",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "13603": {
   "nombre": "Isla de Maipo",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 252.21
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 25810.0,
    "potencia_parcial_punta_clp_kw": 18093.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 25810.0,
    "potencia_leida_parcial_punta_clp_kw": 18093.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5163.0,
    "energia_clp_kwh": 153.18
   }
  },
  "13604": {
   "nombre": "Padre Hurtado",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 237.98
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_punta_clp_kw": 25509.0,
    "potencia_parcial_punta_clp_kw": 17865.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 172.22,
    "potencia_leida_punta_clp_kw": 25509.0,
    "potencia_leida_parcial_punta_clp_kw": 17865.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5152.0,
    "energia_clp_kwh": 150.87
   }
  },
  "13605": {
   "nombre": "Peñaflor",
   "region_cut": "13",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 245.09
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.88,
    "potencia_punta_clp_kw": 25465.0,
    "potencia_parcial_punta_clp_kw": 17851.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 178.88,
    "potencia_leida_punta_clp_kw": 25465.0,
    "potencia_leida_parcial_punta_clp_kw": 17851.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5094.0,
    "energia_clp_kwh": 152.03
   }
  },
  "14101": {
   "nombre": "Valdivia",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 251.71
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 130.81
   }
  },
  "14102": {
   "nombre": "Corral",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "14103": {
   "nombre": "Lanco",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 255.07
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 165.72,
    "potencia_punta_clp_kw": 31511.0,
    "potencia_parcial_punta_clp_kw": 20552.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 165.72,
    "potencia_leida_punta_clp_kw": 31511.0,
    "potencia_leida_parcial_punta_clp_kw": 20552.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6997.0,
    "energia_clp_kwh": 133.35
   }
  },
  "14104": {
   "nombre": "Los Lagos",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 282.34
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 43330.0,
    "potencia_parcial_punta_clp_kw": 28699.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 43330.0,
    "potencia_leida_parcial_punta_clp_kw": 28699.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 13510.0,
    "energia_clp_kwh": 137.16
   }
  },
  "14105": {
   "nombre": "Máfil",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 282.34
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 43330.0,
    "potencia_parcial_punta_clp_kw": 28699.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 43330.0,
    "potencia_leida_parcial_punta_clp_kw": 28699.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 13510.0,
    "energia_clp_kwh": 137.16
   }
  },
  "14106": {
   "nombre": "Mariquina",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 258.06
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 35544.0,
    "potencia_parcial_punta_clp_kw": 23346.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 35544.0,
    "potencia_leida_parcial_punta_clp_kw": 23346.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 8429.0,
    "energia_clp_kwh": 137.16
   }
  },
  "14107": {
   "nombre": "Paillaco",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 282.34
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 43330.0,
    "potencia_parcial_punta_clp_kw": 28699.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 43330.0,
    "potencia_leida_parcial_punta_clp_kw": 28699.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 13510.0,
    "energia_clp_kwh": 137.16
   }
  },
  "14108": {
   "nombre": "Panguipulli",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 275.99
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_punta_clp_kw": 43330.0,
    "potencia_parcial_punta_clp_kw": 28699.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_leida_punta_clp_kw": 43330.0,
    "potencia_leida_parcial_punta_clp_kw": 28699.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 13510.0,
    "energia_clp_kwh": 130.81
   }
  },
  "14201": {
   "nombre": "La Unión",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 274.36
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_punta_clp_kw": 37207.0,
      "potencia_parcial_punta_clp_kw": 24489.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 169.35,
      "potencia_leida_punta_clp_kw": 37207.0,
      "potencia_leida_parcial_punta_clp_kw": 24489.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9988.0,
      "energia_clp_kwh": 137.16
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 282.93
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 155.78,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 123.59
     }
    }
   }
  },
  "14202": {
   "nombre": "Futrono",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 282.34
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 43330.0,
    "potencia_parcial_punta_clp_kw": 28699.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 43330.0,
    "potencia_leida_parcial_punta_clp_kw": 28699.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 13510.0,
    "energia_clp_kwh": 137.16
   }
  },
  "14203": {
   "nombre": "Lago Ranco",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 274.36
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 169.35,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 137.16
   }
  },
  "14204": {
   "nombre": "Río Bueno",
   "region_cut": "14",
   "distribuidor": "saesa",
   "BT1": {
    "cargo_fijo_clp_mes": 1232.84,
    "variable_clp_kwh_tramo1": 268.01
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_punta_clp_kw": 37207.0,
    "potencia_parcial_punta_clp_kw": 24489.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1232.84,
    "energia_total_clp_kwh": 163.0,
    "potencia_leida_punta_clp_kw": 37207.0,
    "potencia_leida_parcial_punta_clp_kw": 24489.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9988.0,
    "energia_clp_kwh": 130.81
   },
   "por_distribuidor": {
    "saesa": {
     "BT1": {
      "cargo_fijo_clp_mes": 1232.84,
      "variable_clp_kwh_tramo1": 268.01
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 163.0,
      "potencia_punta_clp_kw": 37207.0,
      "potencia_parcial_punta_clp_kw": 24489.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1232.84,
      "energia_total_clp_kwh": 163.0,
      "potencia_leida_punta_clp_kw": 37207.0,
      "potencia_leida_parcial_punta_clp_kw": 24489.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 9988.0,
      "energia_clp_kwh": 130.81
     }
    },
    "luz-osorno": {
     "BT1": {
      "cargo_fijo_clp_mes": 1304.7,
      "variable_clp_kwh_tramo1": 277.46
     },
     "BT2": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 150.32,
      "potencia_punta_clp_kw": 72845.0,
      "potencia_parcial_punta_clp_kw": 42919.0
     },
     "BT3": {
      "cargo_fijo_clp_mes": 1304.7,
      "energia_total_clp_kwh": 150.32,
      "potencia_leida_punta_clp_kw": 72845.0,
      "potencia_leida_parcial_punta_clp_kw": 42919.0
     },
     "BT4": {
      "potencia_contratada_clp_kw": 10863.0,
      "energia_clp_kwh": 118.13
     }
    }
   }
  },
  "15101": {
   "nombre": "Arica",
   "region_cut": "15",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 278.1
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 201.88,
    "potencia_punta_clp_kw": 28937.0,
    "potencia_parcial_punta_clp_kw": 20470.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 201.88,
    "potencia_leida_punta_clp_kw": 28937.0,
    "potencia_leida_parcial_punta_clp_kw": 20470.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 6465.0,
    "energia_clp_kwh": 170.6
   }
  },
  "15102": {
   "nombre": "Camarones",
   "region_cut": "15",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 263.82
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 187.6,
    "potencia_punta_clp_kw": 28937.0,
    "potencia_parcial_punta_clp_kw": 20470.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 187.6,
    "potencia_leida_punta_clp_kw": 28937.0,
    "potencia_leida_parcial_punta_clp_kw": 20470.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5251.0,
    "energia_clp_kwh": 156.32
   }
  },
  "15202": {
   "nombre": "General Lagos",
   "region_cut": "15",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 280.69
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 201.88,
    "potencia_punta_clp_kw": 28703.0,
    "potencia_parcial_punta_clp_kw": 20316.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 201.88,
    "potencia_leida_punta_clp_kw": 28703.0,
    "potencia_leida_parcial_punta_clp_kw": 20316.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 5174.0,
    "energia_clp_kwh": 170.6
   }
  },
  "16101": {
   "nombre": "Chillán",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 10757.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16103": {
   "nombre": "Chillán Viejo",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16106": {
   "nombre": "Pinto",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16201": {
   "nombre": "Quirihue",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16202": {
   "nombre": "Cobquecura",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16203": {
   "nombre": "Coelemu",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16204": {
   "nombre": "Ninhue",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16205": {
   "nombre": "Portezuelo",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16206": {
   "nombre": "Ránquil",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 260.08
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 173.06,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 173.06,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 140.69
   }
  },
  "16207": {
   "nombre": "Treguaco",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16301": {
   "nombre": "San Carlos",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16302": {
   "nombre": "Coihueco",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16303": {
   "nombre": "Ñiquén",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16304": {
   "nombre": "San Fabián",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  },
  "16305": {
   "nombre": "San Nicolás",
   "region_cut": "16",
   "distribuidor": "cge",
   "BT1": {
    "cargo_fijo_clp_mes": 1063.59,
    "variable_clp_kwh_tramo1": 272.57
   },
   "BT2": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_punta_clp_kw": 34303.0,
    "potencia_parcial_punta_clp_kw": 23678.0
   },
   "BT3": {
    "cargo_fijo_clp_mes": 1063.59,
    "energia_total_clp_kwh": 185.55,
    "potencia_leida_punta_clp_kw": 34303.0,
    "potencia_leida_parcial_punta_clp_kw": 23678.0
   },
   "BT4": {
    "potencia_contratada_clp_kw": 9877.0,
    "energia_clp_kwh": 153.18
   }
  }
 }
};
