## Auditoría de accesibilidad: Umbral (rediseño "camino grueso")
**Estándar:** WCAG 2.1 AA | **Fecha:** 2026-10-20
**Alcance:** `/`, `/modulos/plantilla-ejemplo`, `/pilares`, `/investigacion`, `/investigacion/brief-ejemplo`, `/colabora`. Modo claro y oscuro, computador (1440px) y móvil (390px), con y sin `prefers-reduced-motion`.
**Método:** escaneo automático axe-core 4 (reglas WCAG 2.0/2.1 A y AA + buenas prácticas), recorrido con teclado, medición de objetivos táctiles, zoom al 200 % (720px), cálculo de contraste de la paleta. No se probó con lectores de pantalla reales (VoiceOver/NVDA): queda pendiente.

### Resumen
**Hallazgos:** 6 | **Críticos:** 1 | **Mayores:** 2 | **Menores:** 3 · Corregidos: 5 · Pendiente de decisión: 1

### Hallazgos

#### Perceptible
| # | Hallazgo | Criterio | Severidad | Estado |
|---|---|---|---|---|
| 1 | Las paradas inactivas bajan a 35 % de opacidad (DESIGN §8). Mientras están atenuadas, el texto queda cerca de 2,4:1. | 1.4.3 Contraste | 🟡 Mayor | **Decisión pendiente.** El texto vuelve a 100 % al llegar a la zona de lectura, y con movimiento reducido o "Ver sin animación" nunca se atenúa. Opción: subir a 55 % (≈4,6:1), que cumple AA incluso atenuado. |
| 2 | El texto secundario `#464746` no pasa AA sobre el fondo oscuro. | 1.4.3 | 🔴 Crítico (prevenido) | Corregido antes de construir: en oscuro se usa `--muted: #B5B8AE` (8,7:1). |

#### Operable
| # | Hallazgo | Criterio | Severidad | Estado |
|---|---|---|---|---|
| 3 | El cerebro de partículas se anima sin fin y no se podía pausar. | 2.2.2 Pausar, detener, ocultar (A) | 🟡 Mayor | Corregido: botón "Pausar animación" (44px, `aria-pressed`). También se detiene solo fuera de pantalla y con movimiento reducido. |
| 4 | La tarjeta de fuente se cerraba sola al abrirla con el teclado (el foco desplazaba la página y eso la cerraba). | 2.1.1 Teclado | 🟢 Menor | Corregido: solo se cierra tras desplazarse más de 200px. |
| 5 | El logo (40px) y "Saltar al contenido" (42px) medían menos de 44px de alto. | 2.5.5 Tamaño del objetivo | 🟢 Menor | Corregido: `min-height: 44px`. |

#### Comprensible
Sin hallazgos. La decisión forzada usa `fieldset` + `legend` y anuncia el resultado con `aria-live`.

#### Robusto
| # | Hallazgo | Criterio | Severidad | Estado |
|---|---|---|---|---|
| 6 | En `/pilares` se pasaba de h1 a h3. | 1.3.1 Información y relaciones | 🟢 Menor | Corregido: los pilares usan h2 cuando el título de página es h1. |

### Contraste de la paleta
| Elemento | Texto | Fondo | Relación | Requerido | ¿Pasa? |
|---|---|---|---|---|---|
| Texto principal | `#1F2120` | crema `#FCFCF0` | 15,7:1 | 4,5:1 | ✅ |
| Texto secundario | `#464746` | crema / blanco | 9,0 / 9,3:1 | 4,5:1 | ✅ |
| Tinta sobre colores vivos | `#1F2120` | celeste-v / rosa-v / mantequilla / menta | 8,9 / 7,6 / 12,7 / 12,3:1 | 4,5:1 | ✅ |
| Gris sobre rosa vivo | `#464746` | `#FF8DC7` | 4,39:1 | 4,5:1 | ❌ → regla: sobre colores vivos solo tinta |
| Texto oscuro | `#F3F3E6` | `#181A19` / `#252928` | 15,6 / 13,2:1 | 4,5:1 | ✅ |
| Secundario oscuro | `#B5B8AE` | `#181A19` / `#252928` | 8,7 / 7,3:1 | 4,5:1 | ✅ |
| Botón oscuro | tinta | crema | 15,7:1 | 4,5:1 | ✅ |

### Teclado (módulo)
Orden: saltar al contenido → logo → menú → tema → modo evidencia → ver sin animación → interruptor del sello → opciones de la decisión → afirmaciones con fuente → acordeón → publicación de X → llamados a la acción. Es lógico y sin trampas de foco. Todos los controles muestran el contorno de foco de 3px. La tarjeta de fuente se abre con Enter, mueve el foco al botón de cerrar y Esc devuelve el foco a la afirmación.

### Lector de pantalla (revisión de marcado)
| Elemento | Se anuncia como | Observación |
|---|---|---|
| Camino, criaturas y objetos | (oculto) | `aria-hidden`: decorativos, como pide DESIGN §8 |
| Cerebro | imagen, "Un cerebro hecho de cientos de puntos…" | `role="img"` con descripción |
| Parada | región con el título de la tarjeta | `section` con `aria-labelledby` |
| Afirmación | botón, "texto (ver fuente)" | `aria-haspopup="dialog"` |
| Interruptor del sello | botones con `aria-pressed` | dentro de un grupo con nombre |

### Otras comprobaciones
- **Zoom 200 % / reflujo:** sin scroll horizontal en 720px ni en 390px.
- **Movimiento reducido:** camino completo, criaturas armadas, cerebro fijo; ningún contenido depende de la animación.
- **Sin JavaScript:** el camino no se dibuja (es decorativo) y todo el contenido se lee.

### Prioridades
1. **Decidir la opacidad de las paradas inactivas** (hallazgo 1): 35 % según DESIGN, o 55 % para cumplir AA también mientras están atenuadas.
2. **Probar con VoiceOver (iPhone) y NVDA o TalkBack** antes de publicar el primer módulo real.
