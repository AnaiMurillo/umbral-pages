# Umbral · Guía de interfaz y contenido

Complementa a `DESIGN.md`. El DESIGN.md manda en colores, tipografía, camino grueso y movimiento. Esta guía define qué páginas existen, qué lleva cada espacio de texto y qué es común a todos los artículos.

Convenciones: `[Borrador]` es texto propuesto que Isabel puede cambiar. `[Isabel completa]` es información que solo ella tiene; no se inventa.

---

## 0. Mapa del sitio

| Página | Ruta | Para qué sirve |
|---|---|---|
| Inicio | `/` | Entender qué es Umbral y entrar a un pilar |
| Pilares (mapa) | `/pilares` | Ver los 5 pilares como un camino |
| Pilar | `/pilares/[slug]` | Catálogo de artículos de un mecanismo |
| Artículo | `/articulos/[slug]` | La experiencia interactiva del fenómeno |
| Investigación | `/investigacion` | Research briefs completos (lectura larga) |
| Brief | `/investigacion/[slug]` | Un brief completo |
| Sobre mí | `/sobre-mi` | Quién investiga y con qué criterio |
| Colabora | `/colabora` | Cómo trabajar o conversar con Umbral |

Diferencia clave: **artículo** = experiencia interactiva y corta (5 a 8 min). **Brief** = documento completo con metodología y fuentes, para audiencia académica o técnica. Cada artículo enlaza a su brief.

Rutas actuales del piloto: `/modulos/plantilla-ejemplo` pasa a ser `/articulos/[slug]`.

---

## 1. Investigación, Sobre mí y Colabora

### 1.1 Investigación (`/investigacion`)

Objetivo: mostrar rigor. Es la página que revisa una persona de academia, una fundación o un equipo de producto antes de escribirte.

**Estructura**
1. **Cabecera.** Título: "Investigación". Bajada [Borrador]: "Cada artículo de Umbral sale de un documento completo, con fuentes y límites a la vista. Aquí están todos."
2. **Cómo investigamos** (bloque corto, 4 principios, en tarjetas):
   - Ninguna afirmación sin respaldo: dato, estudio o caso verificable.
   - Evidencia local primero: cada brief incluye al menos una fuente de Colombia o LatAm.
   - Siempre una fuente que matice: buscamos activamente lo que contradice el hallazgo.
   - Sin datos de lectores: Umbral no recoge información de quien lo visita.
3. **Listado de briefs.** Filtros: pilar, año. Orden: más reciente primero.
4. **Vacíos que vemos** (bloque pequeño): "Preguntas que la región aún no ha investigado". Ejemplo real del primer brief: no se encontró investigación publicada sobre aversión al algoritmo en billeteras digitales latinoamericanas. Este bloque es un gancho natural para Colabora.

**Tarjeta de brief:** título · chip de pilar · mecanismo · fecha · "Qué encontramos" en una frase · fuentes (número) · botón "Leer brief" · enlace "Ver el artículo interactivo".

**Página de brief (`/investigacion/[slug]`)**
- Formato de lectura larga, ancho de 65 caracteres, índice lateral fijo en computador y desplegable en móvil.
- Secciones (las del formato ya definido): Contexto · Metodología · Evidencia · Problemas encontrados · Oportunidades · Recomendaciones · Fuentes.
- Arriba: ficha con pilar, mecanismo, fecha, última actualización y tipo de fuentes ("Fuentes secundarias abiertas").
- Abajo: caja "Cómo citar" con el texto listo para copiar, y enlace al artículo interactivo.
- Sin camino grueso: es la página sobria de la plataforma. Mantiene paleta y tipografía.

**Estado vacío** (mientras haya un solo brief): mostrarlo grande, con un texto "Los siguientes briefs se publican cada 4 a 6 semanas."

### 1.2 Sobre mí (`/sobre-mi`)

Objetivo: que se entienda quién investiga y por qué confiar en el criterio. Sin tono de currículum ni de venta.

**Estructura**
1. **Afirmación de apertura** (titular grande). [Borrador]: "Investigo cómo las personas se relacionan con la tecnología, y por qué lo hacen así."
2. **Quién soy** (3 a 4 frases). [Isabel completa]: psicóloga, formación, qué te llevó a la interacción humano-tecnología. Una anécdota concreta vale más que una lista de títulos.
3. **Mi enfoque** (tres tarjetas):
   - Comportamiento primero: parto del mecanismo humano, no de la herramienta.
   - Evidencia, no opinión: lo que publico tiene fuente.
   - Mirada desde LatAm: busco datos y casos de la región.
4. **Qué estoy construyendo.** Línea de tiempo corta: un artículo cada 4 a 6 semanas, con los pilares en los que se trabaja ahora. Se actualiza solo cuando algo cambia.
5. **Dónde encontrarme.** Correo (texto visible, con botón "Copiar") y LinkedIn.

**Imagen.** Foto de Isabel en PNG recortado y sin fondo, con formas geométricas detrás y movimiento al hacer scroll, igual que los personajes del resto del sitio (detalle en `TEXTOS_FINALES.md`, sección 7).

**No incluir:** lista de servicios, precios, "contrátame", ni métricas de seguidores.

### 1.3 Colabora (`/colabora`)

Objetivo: abrir conversaciones con las personas correctas. Umbral es independiente: no vende auditorías ni servicios por encargo. Colaborar es investigar o construir algo juntas.

**Estructura**
1. **Cabecera.** Título: "¿Investigamos juntos?". Bajada [Borrador]: "Umbral crece con preguntas reales y con datos de la región. Si tienes una, escríbeme."
2. **Cuatro formas de colaborar** (tarjetas con color distinto; cada una con "Qué buscamos", "Qué hacemos juntos" y "Cómo empezar"):

| Para quién | Qué se hace juntos |
|---|---|
| Fundaciones y organizaciones sociales | Investigar un fenómeno que afecta a una comunidad y convertirlo en un artículo interactivo abierto |
| Equipos de producto y empresas | Conversar sobre un fenómeno de comportamiento que observan en su producto; acceso a casos o datos agregados para un brief. No es consultoría ni auditoría |
| Academia y comunidades de HCI | Co-autoría, revisión de metodología, replicaciones con datos de la región |
| Medios y eventos | Entrevistas, charlas o paneles sobre un mecanismo; uso de los artículos con cita |

3. **Cómo trabajamos** (3 reglas visibles): la investigación es independiente, las conclusiones no se negocian, todo lo publicado lleva sus fuentes.
4. **Contacto.** Correo en texto visible con botón "Copiar", más LinkedIn. **Sin formulario**: el sitio no recoge datos de lectores y un formulario sin servidor no funciona en el piloto.
5. **Preguntas frecuentes** (acordeón, 4 preguntas): ¿Cobran por los artículos? ¿Aceptan temas por encargo? ¿Puedo usar un artículo en mi clase o medio? ¿Cómo se financia Umbral? [Isabel completa las respuestas.]

---

## 2. Página de pilar (`/pilares/[slug]`)

Objetivo: que el lector entienda el mecanismo del pilar y encuentre su siguiente artículo. Cada pilar tiene su color y su criatura grande.

### 2.1 Estructura (de arriba a abajo)

1. **Hero del pilar.** Número, nombre, y **una pregunta** que organiza el pilar (mejor que una definición). Criatura grande del pilar y cinta de su color. Ejemplos de pregunta en la sección 2.3.
2. **Qué explora.** Un párrafo corto (el texto del documento de pilares, recortado a 3 o 4 líneas).
3. **Cómo lo notas en tu día.** Tres frases cortas con situaciones cotidianas. Sirve de gancho antes del catálogo.
4. **Catálogo de artículos.** Ver 2.2.
5. **En el radar.** Lista de lo que viene (los temas del documento de pilares, uno por línea, con el mecanismo). Evita que un pilar con un solo artículo se vea vacío y muestra dirección.
6. **Palabras del pilar.** Glosario en acordeón: 3 a 5 términos con una definición de una línea y su fuente. Ejemplo para Confianza: aversión al algoritmo, apreciación del algoritmo, dependencia estructural.
7. **Lo que aún no sabemos.** Los vacíos de investigación de la región en este pilar. Enlaza a Colabora.
8. **Siguiente pilar.** Tira con el pilar que sigue y el anterior.

### 2.2 Catálogo

**Tarjeta de artículo** (mismos bordes y estructura en todas):
- Miniatura: criatura pequeña del artículo sobre fondo del color del pilar.
- Título magnético (el del artículo).
- Bajada de una línea.
- Etiqueta del **mecanismo** (por ejemplo "Aversión al algoritmo").
- Etiqueta del **tipo de interacción**: Decisión forzada, Antes y después, Explorar datos, Simular una interfaz, Predecir antes de ver.
- Tiempo de lectura y fecha.
- Estado: Publicado o En preparación.

**Disposición:** móvil, una columna. Computador, rejilla de dos columnas con el artículo más reciente destacado y a doble ancho.

**Filtros:** mecanismo y tipo de interacción, con orden por fecha o alfabético (no hay "más leídos", porque el sitio no recoge datos). Con menos de 4 artículos, los filtros se ocultan.

**Estado con un solo artículo:** una tarjeta destacada, el bloque "En el radar" justo debajo y un mensaje "Siguiente artículo en preparación".

**Tarjeta "En preparación":** título de trabajo, la pregunta que responderá y una silueta de criatura sin colorear. No lleva enlace.

### 2.3 Contenido propuesto por pilar

Texto base tomado de `Pilares_de_Investigacion.md`. Las preguntas y situaciones son [Borrador].

| Pilar | Pregunta que organiza | Color sugerido de la cinta | Interacción que mejor encaja |
|---|---|---|---|
| 1 · Confianza | ¿En quién o en qué confiamos cuando ya no podemos verificar? | `--celeste-v` | Decisión forzada |
| 2 · Persuasión | ¿Cuándo un diseño deja de ayudarte a decidir y empieza a decidir por ti? | `--rosa-v` | Simular una interfaz con patrones oscuros |
| 3 · Comprensión | ¿Por qué necesitamos una razón antes de aceptar un resultado? | `--mantequilla` | Elegir la explicación que quisieras recibir |
| 4 · Atención | ¿Quién decide hacia dónde miras? | `--menta` | Medir cuánto recuerdas de lo que scrolleaste |
| 5 · Identidad digital | ¿Cómo sabes que lo que ves en línea es real? | Decisión abierta (ver abajo) | Real o generado, con tu porcentaje de acierto |

Situaciones cotidianas [Borrador], tres por pilar:
- **Confianza:** la app falla y sigues usándola porque no hay otra; le crees más a un amigo que a una recomendación automática; revisas dos veces lo que te dice un chatbot.
- **Persuasión:** el botón de cancelar está escondido; un temporizador te apura; el "no, gracias" te hace sentir mal.
- **Comprensión:** te preguntas por qué te salió ese anuncio; no sabes por qué te rechazaron un trámite; inventas tu propia teoría de cómo funciona el algoritmo.
- **Atención:** abres el teléfono para algo y media hora después sigues ahí; una notificación te hace sentir que te pierdes algo; no recuerdas lo que viste.
- **Identidad digital:** dudas de un video; eres otra persona en cada red; una plataforma cree saber quién eres.

**Decisión de color.** Los cuatro primeros usan los colores vivos del DESIGN.md. Para el quinto hay dos caminos: (a) añadir un color nuevo, por ejemplo coral `#FF8A6B`, o (b) usar `--tinta` con detalles en rosa y celeste. Recomendación: (a), para que cada pilar tenga color propio. Si se aprueba, se agrega al DESIGN.md.

---

## 3. El artículo (plantilla común)

El tema cambia y la interacción cambia. Lo común es el esqueleto, el orden y las piezas fijas, para que el lector sepa dónde encontrar cada cosa en cualquier artículo.

### 3.1 Esqueleto

**Cabecera (fija en todos)**
- Ruta: Pilar › Mecanismo.
- Título magnético y bajada.
- Ficha: tiempo de lectura (5 a 8 min), fecha, número de fuentes, tipo de interacción.
- Interruptor **Modo evidencia** (resalta cada afirmación y muestra su fuente).
- Cinta y criatura del color del pilar. Es la primera parada del camino.

**Las cinco escenas** (ya definidas en el DESIGN.md)
1. **Gancho.** Una situación concreta que genera fricción o curiosidad. Máximo 60 palabras.
2. **Escena jugable.** Una sola interacción principal. Se resuelve en menos de 2 minutos.
3. **Revelación.** El hallazgo, en una frase grande (pull quote), más 2 o 3 frases que lo explican.
4. **Evidencia.** Los datos, con sus fuentes en acordeones. Incluye las dos piezas fijas de 3.2.
5. **Qué hacer.** Recomendaciones separadas por quien las usa (equipos de producto, personas usuarias, quienes investigan).

**Cierre (fijo en todos)**
- **Para llevarte:** el hallazgo en una frase, lista para compartir.
- **Cómo compartir:** botón "Copiar enlace" y una tarjeta de resultado (la que se muestra al terminar la interacción, sin guardar nada del lector).
- **Cómo se hizo:** 2 líneas sobre metodología y tipo de fuentes, con enlace al brief completo.
- **Fuentes:** lista completa.
- **Sigue explorando:** siguiente artículo del pilar y un artículo de otro pilar.
- Remate del camino (nubes o colinas) con el llamado a la acción.

### 3.2 Piezas fijas dentro de Evidencia

Salen de la lista de calidad de la metodología y siempre aparecen:
- **Caso de la región.** Tarjeta con un caso, dato o noticia de Colombia o LatAm. Mínimo uno por artículo.
- **Lo que matiza.** Tarjeta con la fuente que contradice o limita el hallazgo (por ejemplo, el caso de Nequi frente a la aversión al algoritmo). Mínimo una por artículo.
- **Qué simula y qué no.** Acordeón junto a la escena jugable o en Evidencia: explica qué representa fielmente la interacción y qué es simplificación. Responde a la pregunta crítica sobre fidelidad.

### 3.3 Contrato de la escena jugable

- Una sola interacción principal por artículo. Una línea de instrucciones al empezar ("Elige una opción.").
- Respuesta inmediata y siempre ligada a un dato real, nunca a un efecto vistoso.
- El resultado se muestra al lector y **no se guarda ni se envía** (el sitio no recoge datos).
- Accesible con teclado y lector de pantalla. Alternativa en texto si el lector no puede jugar.
- Con `prefers-reduced-motion`, sin animación, con el mismo contenido.

Tipos reutilizables (para no rehacer desde cero):

| Tipo | Cómo funciona | Encaja con |
|---|---|---|
| Decisión forzada | Dos opciones, respuesta con el dato | Confianza |
| Antes y después | Deslizador que contrasta dos versiones | Persuasión |
| Explorar datos | Un gráfico que se descubre con el scroll | Cualquiera |
| Simular una interfaz | Una pantalla falsa con el patrón, y el lector intenta salir | Persuasión, Atención |
| Predecir antes de ver | El lector adivina un resultado y luego ve el real | Comprensión, Identidad digital |

### 3.4 Datos de cada artículo (para Code)

Cada artículo es un archivo MDX con este frontmatter:

```yaml
titulo: ""
bajada: ""
pilar: confianza            # slug del pilar
mecanismo: ""               # ej. Aversión al algoritmo
tipoInteraccion: decision-forzada
fecha: 2026-09-19
actualizado: 2026-09-19
tiempoLectura: 6
estado: publicado           # publicado | en-preparacion
hallazgoUnaFrase: ""
casoLocal: { titulo: "", fuente: "" }
matiz: { titulo: "", fuente: "" }
briefSlug: ""
fuentes:
  - { id: "dietvorst", titulo: "", url: "" }
```

`pilares.json` suma por pilar: `pregunta`, `color`, `situaciones[]`, `enElRadar[]`, `glosario[]`, `vacios[]`.

---

## 4. Elementos comunes a todas las páginas

- **Navegación:** Pilares · Investigación · Sobre mí · Colabora. En móvil, menú flotante tipo píldora (como MindMarket).
- **Pie de página:** nombre, lema, aviso de que el sitio no recoge datos y que las simulaciones corren solo en el navegador, y correo visible.
- **Estados:** páginas sin contenido, "Próximamente" y 404 con criatura y mensaje corto.
- Todo respeta `DESIGN.md`: paleta, tipografía, accesibilidad, `prefers-reduced-motion`, sin recoger datos.

---

## 5. Decisiones pendientes de Isabel

1. Color del quinto pilar (Identidad digital): añadir coral o usar tinta.
2. Sobre mí: resuelto. Foto de Isabel en PNG sin fondo, con formas detrás.
3. Cómo se hace Umbral: resuelto. Se elimina la nota sobre IA.
4. Respuestas de las preguntas frecuentes de Colabora: redactadas en `TEXTOS_FINALES.md`.
