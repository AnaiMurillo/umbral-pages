# Umbral · DESIGN.md

Fuente de verdad del diseño. Si algo no está aquí, se pregunta antes de inventarlo.
Referencia visual aprobada: prototipo "Umbral Prototipo" (paleta ampliada).

## 1. Idea de diseño

Umbral explica investigación en Behavioral HCI y Human-Centered AI para LatAm. Cada módulo es un camino que se recorre con el scroll. El movimiento demuestra el mecanismo que se explica; nunca decora.

Personalidad: cálida y juguetona (referencia: MindMarket) con rigor analítico. Fondo crema, tarjetas blancas, formas geométricas en colores planos, títulos grandes y apretados. Sin sombras, sin degradados.

## 2. Paleta (aprobada)

Se conserva el kit de Wix y se amplía con cuatro colores.

| Token | Hex | Uso |
|---|---|---|
| `--crema` | `#FCFCF0` | Fondo de página |
| `--celeste` | `#D6F7FF` | Bandas, etiquetas, fondos suaves |
| `--rosa` | `#FFCFE9` | Fondos suaves, resaltados de titular |
| `--gris` | `#464746` | Texto secundario sobre claros |
| `--tinta` | `#1F2120` | Texto principal, camino, bordes, botones |
| `--celeste-v` | `#7CCBE8` | Forma principal 1 |
| `--rosa-v` | `#FF8DC7` | Forma principal 2 |
| `--mantequilla` | `#FFE27A` | Forma principal 3, resaltado de dato clave |
| `--menta` | `#BDEBCB` | Forma principal 4, estados positivos |
| `--blanco` | `#FFFFFF` | Tarjetas |

Tokens semánticos: `--bg`, `--band`, `--surface`, `--fg`, `--muted`, `--line`, `--a1..a4` (formas), `--path`, `--outline`.

Reglas:
- Texto siempre en `--tinta` o `--gris`. Nunca texto blanco sobre pasteles ni sobre colores vivos.
- Un solo color vivo dominante por escena; los demás en apoyo.
- Modo oscuro obligatorio: fondo `#181A19`, superficie `#252928`, texto `#F3F3E6`, texto secundario `#B5B8AE` (el gris `#464746` no pasa AA sobre fondo oscuro), camino en crema. Las formas mantienen sus colores.
- Cualquier texto sobre un color pastel o vivo usa `--tinta`, también en modo oscuro.
- Negro y blanco definidos por Umbral (no dependen de Wix): el negro es `--tinta` `#1F2120` y el blanco es `--blanco` `#FFFFFF`.

## 3. Tipografía

- Títulos: **Bricolage Grotesque**, pesos 600 a 800, interletrado `-0.03em`, interlineado `1.02`. (Aether queda descartada fuera de Wix.)
- Cuerpo: **Questrial**, 17px, interlineado 1.55, máximo 65 caracteres por línea.
- Etiquetas: Questrial, 12 a 13px, mayúsculas, interletrado `0.12em`.
- Escala: 13 / 17 / 19 / 28 a 42 (títulos de tarjeta) / 46 a 104 (hero, fluido con `clamp`).
- Los titulares usan `text-wrap: balance`.

## 4. Layout, bordes y formas

- Mobile-first. Márgenes laterales mínimos de 16px con `env(safe-area-inset-*)`. Nada de scroll horizontal.
- Computador: contenedor de 1080px; tarjeta y criatura alternan lados alrededor del camino central.
- Radios: tarjetas 28px, bandas grandes 36px, botones y etiquetas 999px.
- Borde de tarjetas 1.5px en `--outline`. Formas con trazo de 2.5px, esquinas redondeadas.
- Las tarjetas son blancas y planas. Sin sombras.

## 5. Formas y criaturas

No hay ilustración propia: todo se arma con círculos, semicírculos, arcos y cuadrados redondeados.
- Estilo de recorte de papel: colores planos, **sin contorno**. La tinta solo se usa en detalles pequeños (ojos, boca, líneas finas).
- Tamaño grande: en computador cada criatura mide entre 280 y 560px de ancho; en móvil, entre 60% y 90% del ancho de pantalla.
- Cada criatura se arma con 5 a 8 formas, en dos o tres colores vivos. Cada pilar puede tener su propia combinación.
- Se dibujan en SVG inline con tokens de color, para que cambien con la paleta y el modo oscuro.
- El prototipo aprobado sirve solo como referencia de color y tipografía. Sus criaturas pequeñas y con contorno no son el nivel que se busca.

## 5b. El camino grueso (elemento principal de cada módulo)

Es la pieza más importante del diseño. Referencia observada en MindMarket: un camino ancho y orgánico de color plano que cruza la página, con personajes grandes que lo recorren y objetos pequeños que se dibujan alrededor. Umbral lo adapta con formas geométricas.

Estructura:
- **Camino:** una cinta gruesa y curva de color plano, sin contorno. Ancho en computador: 220 a 340px. En móvil: 96 a 140px, y puede salirse de los bordes de la pantalla. Un color por módulo (`--celeste-v` o `--rosa-v`).
- **Recorrido:** curvas amplias y diagonales (nada de línea recta vertical). Cada giro del camino marca el cambio de escena.
- **Paradas:** en cada giro vive una escena con su criatura grande, que parece salir o apoyarse en el camino, y una tarjeta blanca de texto al lado.
- **Elementos secundarios:** en cada escena, 3 a 6 objetos pequeños de apoyo (círculos, estrellas, notas, flechas, líneas de estela punteadas) en `--mantequilla`, `--menta` o `--tinta`. Algunos se dibujan como trazo; otros flotan.
- **Solapamiento:** las criaturas y el camino pueden invadir la sección vecina, rompiendo el límite entre escenas, como en la referencia.
- **Cierre:** el camino termina en una forma de remate (nubes o colinas hechas con semicírculos) que lleva al llamado a la acción.

Técnica:
- El camino es un `path` SVG con trazo muy ancho (`stroke-width` de 220 a 340 en computador, 96 a 140 en móvil), puntas redondeadas y `stroke-dashoffset` ligado al scroll. Se dibuja a medida que se baja.
- Las criaturas aparecen cuando el borde del camino llega a su parada. Sus formas se arman con desplazamientos y rotaciones cortas ligadas al scroll (`ease: none`), no con un disparo único.
- Las líneas de estela se dibujan con `stroke-dashoffset`; los objetos flotantes tienen parallax suave a distinta velocidad.
- Cada módulo tiene una versión de composición para computador y otra para móvil, dibujadas aparte (no se resuelve solo escalando).
- Con `prefers-reduced-motion`: camino completo y criaturas armadas, sin movimiento.

Límites: máximo dos criaturas animadas a la vez en pantalla. En móvil, máximo una criatura grande y tres objetos secundarios por escena.

## 6. Movimiento

Principios: scrollytelling sí, scrolljacking no. El scroll nunca cambia de velocidad ni se bloquea.

| Efecto | Qué demuestra | Disparo | Móvil | Sin movimiento |
|---|---|---|---|---|
| Camino grueso que se dibuja (ver 5b) | Progreso del módulo | Scroll (ligado al avance) | Cinta de 96 a 140px que puede salirse de pantalla | Camino ya dibujado |
| Línea de estela y objetos secundarios | Que cada idea tiene detalles | Scroll, con parallax | Máximo 3 objetos por escena | Dibujados y fijos |
| Entrada de parada (tarjeta y criatura) | Una idea por pantalla | Cuando el punto llega a la parada | Criatura sobre la tarjeta | Todo visible |
| Formas que se arman | Que la idea se construye | Ligadas al scroll cuando el camino llega a la parada (`ease: none`, ver 5b) | Igual | Formas ya armadas |
| Cerebro de partículas | El enfoque analítico de Umbral | Ambiente, solo en Inicio e Identidad digital | 260 partículas (420 en computador), pausa fuera de pantalla | Imagen fija |

Producción: GSAP con ScrollTrigger solo en el Inicio y en el camino grueso de los módulos (camino, criaturas, estelas y parallax), con trazo dibujado por scroll y `ease: none`. La activación de paradas usa Scrollama; las apariciones simples, CSS `view()`. Sin Lenis.

## 7. Componentes base

Tarjeta de escena (etiqueta, título, texto) · etiqueta de escena · pull quote con resaltado en `--mantequilla` · escena jugable (opciones forzadas con respuesta inmediata) · acordeón de fuente (modo evidencia) · barra de prueba de paleta (solo en prototipos) · botón (fondo `--tinta`, texto `--crema`).

Plantilla de módulo, 5 escenas: Gancho · Escena jugable · Revelación · Evidencia · Qué hacer.

## 8. Accesibilidad

- `prefers-reduced-motion`: todo visible y estático; ningún contenido depende de la animación.
- Contraste AA mínimo. Foco visible de 3px en todos los controles.
- Los gráficos y criaturas son decorativos (`aria-hidden`) salvo el cerebro, que lleva descripción.
- Objetivos táctiles de al menos 44px.
- Contenido completo visible sin scroll de activación (la parada inactiva baja a 35% de opacidad, nunca a 0).

## 9. Prohibido

Sombras, degradados, texto blanco sobre pasteles, scrolljacking, más de un efecto pesado por pantalla, recoger datos de lectores en la versión inicial, costos recurrentes.

## 10. Cómo se verifica

- Playwright en modo móvil (`--mobile`) y computador, con capturas de cada escena.
- Auditoría de accesibilidad y de guías de interfaz al terminar cada módulo.
- Pruebas con `prefers-reduced-motion` activado y con modo oscuro.

## 11. Pendientes

- Primer tema de módulo.
- ~~Confirmar si Bricolage Grotesque se descarga local o desde Google Fonts.~~ Resuelto: local en `public/fonts` (Bricolage Grotesque variable y Questrial, licencia OFL).
