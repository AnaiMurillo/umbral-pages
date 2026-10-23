## Auditoría de accesibilidad: Umbral (rediseño v2)
**Estándar:** WCAG 2.1 AA | **Fecha:** 2026-10-23
**Alcance:** `/`, `/pilares`, las 5 páginas de pilar, `/articulos/ejemplo`, `/investigacion`, `/colabora`, `/sobre-mi` y 404. Modo claro y oscuro, computador (1440 px) y móvil (390 px), con y sin `prefers-reduced-motion`.
**Método:** axe-core 4 (reglas WCAG 2.0/2.1 A y AA + buenas prácticas) en las 12 páginas y los 4 modos; recorrido con teclado; medición de objetivos táctiles; zoom al 200 % (720 px); contraste de la paleta calculado. Pendiente: prueba con lectores de pantalla reales (VoiceOver, TalkBack, NVDA).

### Resumen
**Violaciones automáticas:** 0 · **Objetivos táctiles < 44 px:** 0 · **Scroll horizontal con zoom 200 %:** 0
**Hallazgos abiertos:** 2 (por decisión de diseño) · **Corregidos en esta revisión:** 3

### Hallazgos

| # | Hallazgo | Criterio | Severidad | Estado |
|---|---|---|---|---|
| 1 | El cerebro de partículas se anima sin fin y no tiene botón de pausa. | 2.2.2 Pausar, detener, ocultar (A) | 🟡 Mayor | **Abierto por decisión de Isabel.** Mitigación: imagen fija con `prefers-reduced-motion` o `?estatico=1`; se detiene fuera de pantalla y con la pestaña oculta. |
| 2 | Las paradas inactivas bajan al 55 %: el texto atenuado queda en 3,7:1 (principal) y 2,8:1 (secundario). | 1.4.3 Contraste | 🟡 Mayor | **Abierto por decisión de Isabel.** Vuelve a 100 % en la zona de lectura; nunca se atenúa con movimiento reducido o "Ver sin animación". Pasaría todo desde 75 %. |
| 3 | En el modo oscuro, títulos y filtros de bloques sin tarjeta quedaban sobre la cinta color crema. | 1.4.3 Contraste | 🔴 Crítico | Corregido: banda del color del fondo detrás de esos bloques y de la presentación del mapa. |
| 4 | El título "Investigación" se partía a mitad de palabra en computador. | 1.4.10 Reflujo / legibilidad | 🟢 Menor | Corregido: los títulos nunca cortan palabras. |
| 5 | Cinco enlaces "Ver el pilar →" con el mismo texto. | 2.4.4 Propósito del enlace | 🟢 Menor | Corregido: nombre del pilar oculto para lectores de pantalla. |

### Contraste de la paleta
| Elemento | Texto | Fondo | Relación | ¿Pasa AA? |
|---|---|---|---|---|
| Texto principal | tinta `#1F2120` | crema / blanco | 15,7 / 16,2:1 | ✅ |
| Texto secundario | gris `#464746` | crema / blanco | 9,0 / 9,3:1 | ✅ |
| Tinta sobre colores de pilar | tinta | celeste-v / rosa-v / mantequilla / menta / coral | 8,9 / 7,6 / 12,7 / 12,3 / 7,0:1 | ✅ |
| Texto oscuro | `#F3F3E6` | `#181A19` / `#252928` | 15,6 / 13,2:1 | ✅ |
| Secundario oscuro | `#B5B8AE` | `#181A19` / `#252928` | 8,7 / 7,3:1 | ✅ |
| Gris sobre rosa vivo | gris | rosa-v | 4,39:1 | ❌ → regla: sobre colores vivos solo tinta |

### Teclado
Orden en el Inicio: saltar al contenido → logo → menú → botón de tema → Recorrer los pilares → Cómo investigamos → Ver el pilar (×5) → Colabora → Ver la investigación. Todos los controles muestran foco de 3 px. El botón de tema funciona con Enter y actualiza su nombre ("Cambiar a modo claro/oscuro"). La tarjeta de fuente del modo evidencia se abre con Enter, mueve el foco al botón de cerrar y Esc lo devuelve. Los filtros del catálogo son `select` nativos con etiqueta y anuncian el número de resultados.

### Lector de pantalla (revisión de marcado)
| Elemento | Se anuncia como | Observación |
|---|---|---|
| Camino, criaturas, formas del retrato | (oculto) | `aria-hidden`: decorativos |
| Cerebro | imagen con descripción | `role="img"` y `aria-label` |
| Foto de Sobre mí | "Retrato de Ana Isabel Murillo Murillo" | `alt` |
| Menú móvil (píldora) | navegación "Principal (móvil)" | `aria-current` en la página activa |
| Paradas | región con su título o nombre | `section` con `aria-labelledby` o `aria-label` |
| Copiar correo / enlace | botón + estado "Copiado." / "Enlace copiado." | `role="status"` |

### Prioridades
1. Decidir los dos hallazgos abiertos (pausa del cerebro y opacidad de paradas) antes del primer artículo real.
2. Probar con VoiceOver (iPhone) y TalkBack (Android).
