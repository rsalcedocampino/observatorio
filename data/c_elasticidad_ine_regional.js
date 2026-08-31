// Datos Elasticidad Regional - INE Cuadro 4 Desagregado
// Stock 2024 (real INE) desagregado por proporciones venta 2025
// Proyectado 2025-2027 con tasas por segmento

window.ElasticidadINERegional = {
  "metadata": {
    "titulo": "Elasticidad Tarifa × Stock EV Regional (Proyectado)",
    "fecha_generacion": "2026-08-31",
    "fuente_stock": "INE Cuadro 4 - Vehículos por tipo motor y región (2024)",
    "metodologia": "Stock 2024 desagregado usando proporciones venta 2025, proyectado con tasas por segmento",
    "nota": "Stock desagregado por segmento (BEV/PHEV/Buses/Trucks) usando proporciones de venta 2025",
    "cobertura": "16 regiones + nacional"
  },
  "stock_nacional": {
    "2024": 33853,
    "2025": 59235,
    "2026": 122218,
    "2027": 290528,
    "crecimiento_2024_2025": 75.0
  },
  "regiones": [
    {
      "cut": "01",
      "region": "Arica-Parinacota",
      "stock_2024": {
        "total": 303,
        "bev": 153,
        "phev": 90,
        "buses": 55,
        "trucks": 2
      },
      "stock_2025": {
        "total": 525,
        "bev": 197,
        "phev": 259,
        "buses": 68,
        "trucks": 1
      },
      "stock_2026": {
        "total": 1085,
        "bev": 254,
        "phev": 746,
        "buses": 85,
        "trucks": 0
      },
      "stock_2027": {
        "total": 2583,
        "bev": 327,
        "phev": 2150,
        "buses": 106,
        "trucks": 0
      }
    },
    {
      "cut": "02",
      "region": "Antofagasta",
      "stock_2024": {
        "total": 605,
        "bev": 306,
        "phev": 180,
        "buses": 111,
        "trucks": 5
      },
      "stock_2025": {
        "total": 1054,
        "bev": 394,
        "phev": 518,
        "buses": 138,
        "trucks": 4
      },
      "stock_2026": {
        "total": 2176,
        "bev": 508,
        "phev": 1493,
        "buses": 172,
        "trucks": 3
      },
      "stock_2027": {
        "total": 5176,
        "bev": 655,
        "phev": 4304,
        "buses": 215,
        "trucks": 2
      }
    },
    {
      "cut": "03",
      "region": "Atacama",
      "stock_2024": {
        "total": 247,
        "bev": 125,
        "phev": 73,
        "buses": 45,
        "trucks": 2
      },
      "stock_2025": {
        "total": 428,
        "bev": 161,
        "phev": 210,
        "buses": 56,
        "trucks": 1
      },
      "stock_2026": {
        "total": 882,
        "bev": 207,
        "phev": 605,
        "buses": 70,
        "trucks": 0
      },
      "stock_2027": {
        "total": 2098,
        "bev": 267,
        "phev": 1744,
        "buses": 87,
        "trucks": 0
      }
    },
    {
      "cut": "04",
      "region": "Coquimbo",
      "stock_2024": {
        "total": 918,
        "bev": 465,
        "phev": 273,
        "buses": 169,
        "trucks": 9
      },
      "stock_2025": {
        "total": 1604,
        "bev": 599,
        "phev": 787,
        "buses": 211,
        "trucks": 7
      },
      "stock_2026": {
        "total": 3308,
        "bev": 772,
        "phev": 2268,
        "buses": 263,
        "trucks": 5
      },
      "stock_2027": {
        "total": 7865,
        "bev": 995,
        "phev": 6538,
        "buses": 328,
        "trucks": 4
      }
    },
    {
      "cut": "05",
      "region": "Valparaiso",
      "stock_2024": {
        "total": 2515,
        "bev": 1275,
        "phev": 749,
        "buses": 464,
        "trucks": 24
      },
      "stock_2025": {
        "total": 4402,
        "bev": 1644,
        "phev": 2159,
        "buses": 580,
        "trucks": 19
      },
      "stock_2026": {
        "total": 9084,
        "bev": 2120,
        "phev": 6224,
        "buses": 725,
        "trucks": 15
      },
      "stock_2027": {
        "total": 21595,
        "bev": 2734,
        "phev": 17943,
        "buses": 906,
        "trucks": 12
      }
    },
    {
      "cut": "06",
      "region": "O'Higgins",
      "stock_2024": {
        "total": 976,
        "bev": 494,
        "phev": 290,
        "buses": 180,
        "trucks": 9
      },
      "stock_2025": {
        "total": 1705,
        "bev": 637,
        "phev": 836,
        "buses": 225,
        "trucks": 7
      },
      "stock_2026": {
        "total": 3517,
        "bev": 821,
        "phev": 2410,
        "buses": 281,
        "trucks": 5
      },
      "stock_2027": {
        "total": 8362,
        "bev": 1059,
        "phev": 6948,
        "buses": 351,
        "trucks": 4
      }
    },
    {
      "cut": "07",
      "region": "Maule",
      "stock_2024": {
        "total": 3482,
        "bev": 1765,
        "phev": 1037,
        "buses": 643,
        "trucks": 34
      },
      "stock_2025": {
        "total": 6095,
        "bev": 2276,
        "phev": 2989,
        "buses": 803,
        "trucks": 27
      },
      "stock_2026": {
        "total": 12578,
        "bev": 2936,
        "phev": 8617,
        "buses": 1003,
        "trucks": 22
      },
      "stock_2027": {
        "total": 29900,
        "bev": 3787,
        "phev": 24842,
        "buses": 1253,
        "trucks": 18
      }
    },
    {
      "cut": "08",
      "region": "Biobio",
      "stock_2024": {
        "total": 1131,
        "bev": 573,
        "phev": 336,
        "buses": 209,
        "trucks": 11
      },
      "stock_2025": {
        "total": 1977,
        "bev": 739,
        "phev": 968,
        "buses": 261,
        "trucks": 9
      },
      "stock_2026": {
        "total": 4076,
        "bev": 953,
        "phev": 2790,
        "buses": 326,
        "trucks": 7
      },
      "stock_2027": {
        "total": 9684,
        "bev": 1229,
        "phev": 8043,
        "buses": 407,
        "trucks": 5
      }
    },
    {
      "cut": "09",
      "region": "Araucania",
      "stock_2024": {
        "total": 348,
        "bev": 176,
        "phev": 103,
        "buses": 64,
        "trucks": 3
      },
      "stock_2025": {
        "total": 605,
        "bev": 227,
        "phev": 296,
        "buses": 80,
        "trucks": 2
      },
      "stock_2026": {
        "total": 1246,
        "bev": 292,
        "phev": 853,
        "buses": 100,
        "trucks": 1
      },
      "stock_2027": {
        "total": 2960,
        "bev": 376,
        "phev": 2459,
        "buses": 125,
        "trucks": 0
      }
    },
    {
      "cut": "10",
      "region": "Los Lagos",
      "stock_2024": {
        "total": 460,
        "bev": 233,
        "phev": 137,
        "buses": 85,
        "trucks": 4
      },
      "stock_2025": {
        "total": 803,
        "bev": 300,
        "phev": 394,
        "buses": 106,
        "trucks": 3
      },
      "stock_2026": {
        "total": 1656,
        "bev": 387,
        "phev": 1135,
        "buses": 132,
        "trucks": 2
      },
      "stock_2027": {
        "total": 3937,
        "bev": 499,
        "phev": 3272,
        "buses": 165,
        "trucks": 1
      }
    },
    {
      "cut": "11",
      "region": "Aysen",
      "stock_2024": {
        "total": 108,
        "bev": 54,
        "phev": 32,
        "buses": 19,
        "trucks": 1
      },
      "stock_2025": {
        "total": 184,
        "bev": 69,
        "phev": 92,
        "buses": 23,
        "trucks": 0
      },
      "stock_2026": {
        "total": 382,
        "bev": 89,
        "phev": 265,
        "buses": 28,
        "trucks": 0
      },
      "stock_2027": {
        "total": 912,
        "bev": 114,
        "phev": 763,
        "buses": 35,
        "trucks": 0
      }
    },
    {
      "cut": "12",
      "region": "Magallanes",
      "stock_2024": {
        "total": 201,
        "bev": 101,
        "phev": 59,
        "buses": 37,
        "trucks": 1
      },
      "stock_2025": {
        "total": 346,
        "bev": 130,
        "phev": 170,
        "buses": 46,
        "trucks": 0
      },
      "stock_2026": {
        "total": 714,
        "bev": 167,
        "phev": 490,
        "buses": 57,
        "trucks": 0
      },
      "stock_2027": {
        "total": 1698,
        "bev": 215,
        "phev": 1412,
        "buses": 71,
        "trucks": 0
      }
    },
    {
      "cut": "13",
      "region": "Metropolitana",
      "stock_2024": {
        "total": 21971,
        "bev": 11141,
        "phev": 6545,
        "buses": 4060,
        "trucks": 217
      },
      "stock_2025": {
        "total": 38493,
        "bev": 14371,
        "phev": 18869,
        "buses": 5075,
        "trucks": 178
      },
      "stock_2026": {
        "total": 79426,
        "bev": 18538,
        "phev": 54399,
        "buses": 6343,
        "trucks": 146
      },
      "stock_2027": {
        "total": 188794,
        "bev": 23914,
        "phev": 156832,
        "buses": 7928,
        "trucks": 120
      }
    },
    {
      "cut": "14",
      "region": "Los Rios",
      "stock_2024": {
        "total": 291,
        "bev": 147,
        "phev": 86,
        "buses": 53,
        "trucks": 2
      },
      "stock_2025": {
        "total": 503,
        "bev": 189,
        "phev": 247,
        "buses": 66,
        "trucks": 1
      },
      "stock_2026": {
        "total": 1037,
        "bev": 243,
        "phev": 712,
        "buses": 82,
        "trucks": 0
      },
      "stock_2027": {
        "total": 2467,
        "bev": 313,
        "phev": 2052,
        "buses": 102,
        "trucks": 0
      }
    },
    {
      "cut": "15",
      "region": "Arica Interior",
      "stock_2024": {
        "total": 56,
        "bev": 28,
        "phev": 16,
        "buses": 10,
        "trucks": 0
      },
      "stock_2025": {
        "total": 94,
        "bev": 36,
        "phev": 46,
        "buses": 12,
        "trucks": 0
      },
      "stock_2026": {
        "total": 193,
        "bev": 46,
        "phev": 132,
        "buses": 15,
        "trucks": 0
      },
      "stock_2027": {
        "total": 457,
        "bev": 59,
        "phev": 380,
        "buses": 18,
        "trucks": 0
      }
    },
    {
      "cut": "16",
      "region": "Nuble",
      "stock_2024": {
        "total": 241,
        "bev": 122,
        "phev": 71,
        "buses": 44,
        "trucks": 2
      },
      "stock_2025": {
        "total": 417,
        "bev": 157,
        "phev": 204,
        "buses": 55,
        "trucks": 1
      },
      "stock_2026": {
        "total": 858,
        "bev": 202,
        "phev": 588,
        "buses": 68,
        "trucks": 0
      },
      "stock_2027": {
        "total": 2040,
        "bev": 260,
        "phev": 1695,
        "buses": 85,
        "trucks": 0
      }
    }
  ],
  "segmentacion_nacional": {
    "2024": {
      "bev": 17158,
      "phev": 10077,
      "buses": 6248,
      "trucks": 326
    },
    "2025": {
      "bev": 22126,
      "phev": 29044,
      "buses": 7805,
      "trucks": 260
    },
    "2027": {
      "bev": 36803,
      "phev": 241377,
      "buses": 12182,
      "trucks": 166
    }
  }
};
