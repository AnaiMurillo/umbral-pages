# Umbral · Artículo 01 v6 · Texto final por capas

Nov 9, 2026 · @Ana Isabel

Reemplaza a la v5. Estado: **borrador con datos pendientes**. Lo que falta y por qué está en la última sección. Solo cambian texto y datos; no toqué la parte visual ni el código. Misma estructura de dos capas: capa visible (se lee de corrido) y acordeones (profundizan, nada esencial vive solo ahí).

## Registro de cambios de v5 a v6

**Agregado**

- Bloque "Lo que te llevas" (tres líneas) justo después de la tarjeta "Cómo se llama esto".
- Bloque "Si te sirvió" entre "Para llevarte" y "Sigue explorando".
- "Lo que esta prueba simula, y lo que no" para las tres interacciones (en la 1 se aclara que el 9,5 y el 4,2 vienen de una encuesta de 48 personas).
- Tarjeta "Cómo lo cuentan por aquí" en la escena 4, marcada como borrador con datos pendientes, y acordeón "El marco legal en la región".
- Párrafo regional en la escena 2 (qué hay y qué no hay medido en Colombia y la región) y el dato del Sernac traído a la escena 3.
- Campos de frontmatter: `llevas`, `escuchaSocial`, `actualizado`, `tituloAlternativas` y `nivel` en cada fuente.
- Tres titulares alternativos de 6 a 14 palabras, sin elegir.
- En el acordeón del experimento de Luguri: 65 abandonos en el grupo agresivo frente a 9 en el de control (verificado en el resumen publicado).

**Movido**

- Interacción 1 antes de las cifras de 2,3 meses y 187 dólares; la encuesta de 48 personas queda como cierre de la interacción. Decisión: lo hice porque el hilo se sostiene (primero la intuición, luego la revelación) y la mecánica no cambia.
- Detalle normativo de Argentina, México, Colombia (CRC) y la sanción de la SIC: de la escena 4 visible al acordeón "El marco legal en la región".

**Quitado o corregido**

- Quitado el nombre de la firma de investigación de mercado del acordeón de suscripciones (queda solo en Fuentes).
- Corregido el caso de la FTC: la acusación dice que la empresa prometía cancelación fácil pero exigía entre seis y nueve pantallas; v5 decía "varias páginas de promociones", que el informe no sostiene.
- Escena 4 reescrita alrededor de la psicología (qué sienten, a quién lo atribuyen, qué hacen) y de "Lo que nadie ha medido", reajustado a lo que la revisión de publicaciones puede y no puede decir.
- Bajada: añadida una frase sobre la mirada regional, sin afirmar resultados.
- "Cómo se hizo" reescrito con el texto del protocolo y las fechas de trabajo.
- Sin cambios: mecánica de las tres interacciones y cifras que ya tenían fuente.

**Actualización del 19 de noviembre:** la tarjeta de la escena 4 pasa de "Cómo lo cuentan por aquí" (borrador con datos pendientes) a "Cuatro relatos de la región", presentada como casos y no como tendencia, porque no se llegó al mínimo de 30 publicaciones. Se actualizaron la tarjeta, "Lo que nadie ha medido", los acordeones de la escena 4, "Cómo se hizo", la bajada y el frontmatter.

## Datos del artículo

```yaml
# titulo: elegido por Isabel el 19 de noviembre (opción 1 de tituloAlternativas).
titulo: "¿Descuido tuyo o diseño? Por qué sigues pagando lo que no usas"
tituloAlternativas:
  - "¿Descuido tuyo o diseño? Por qué sigues pagando lo que no usas"            # 12 palabras. Recomendada
  - "¿Por qué sigues pagando lo que ya no usas?"  # 9 palabras
  - "¿Por qué cancelar una suscripción cuesta más que contratarla?"       # 9 palabras
slug: sigues-pagando-lo-que-no-usas
pilar: persuasion
familiaDeMecanismos: "Trampas de suscripción"
tipoInteraccion: [predecir-vs-realidad, encuentra-el-boton, plan-de-salida]
fecha: 2026-11-09
actualizado: 2026-11-09
tiempoLectura: 7
estado: borrador
briefSlug: trampas-de-suscripcion
llevas:
  reconocer: "Vas a reconocer por qué se te olvida lo que pagas y por qué el botón de cancelar parece esconderse."
  entender: "Vas a entender qué es un patrón oscuro y qué midió la investigación sobre el olvido y sobre la fricción para salir."
  poder: "Vas a poder revisar tus suscripciones con una lista de cinco pasos y decidir hoy cuáles conservas."
escuchaSocial:
  estado: muestra-insuficiente-leida-como-casos
  protocolo: 2026-11-09
  pregunta: "¿Cómo se nombra y se vive el cobro de suscripciones que no se usan, y la dificultad para cancelar, en Colombia y Latinoamérica?"
  ventana: "2024-11 a 2026-11"
  publicacionesIncluidas: 4        # mínimo del protocolo: 30
  tiposDeFuente: [foro-de-comunidad-de-un-proveedor, foro-publico]
  mesesDistintos: no-se-publica
  vocesContrarias: 3
  paises: [Chile, México, Colombia]
  limites: "No se pudo consultar X, TikTok, Facebook ni Instagram; Reddit lo leyó Isabel a mano. Muestra por debajo del mínimo del protocolo (30): se presenta como casos, no como tendencia."
fuentes: [dellavigna-malmendier, sunstein-sludge, icpen, ftc-2022, luguri, cr-research, ocde, sic-sancion, sernac, crc-oficio, mexico-dof, escucha-publica]
nivelPorFuente:
  dellavigna-malmendier: estudio-experimental   # observacional con datos de registros; ver nota en Pendientes
  sunstein-sludge: marco-conceptual
  icpen: dato-institucional
  ftc-2022: dato-institucional                    # los casos son acusaciones
  luguri: estudio-experimental
  cr-research: dato-de-industria
  ocde: dato-institucional
  sic-sancion: caso-documental
  sernac: dato-institucional
  crc-oficio: dato-institucional
  mexico-dof: dato-institucional
  escucha-publica: discurso-publico-observado
```

Nota: los valores de `nivel` siguen la tabla de jerarquía de la metodología (más "Discurso público observado" del protocolo). Hay que igualar los slugs exactos con §7 de la guía al pasar a Code.

## Portada

**Titular:** ¿Descuido tuyo o diseño? Por qué sigues pagando lo que no usas

**Bajada:** Se te olvida que estás pagando, el botón de cancelar no se ve y, cuando por fin lo encuentras, te ofrecen todo menos irte. Revisé qué dice la psicología sobre por qué nos pasa, qué midieron los estudios que existen y cómo lo cuentan algunas personas de Colombia y la región.

**Tarjeta celeste, "Cómo se llama esto":** *Patrones oscuros* (en inglés, *dark patterns*). Son decisiones de diseño en una app o una página web que empujan a las personas a hacer algo que quizá no harían si el camino fuera neutro. La OCDE los describe como prácticas que subvierten o dañan la autonomía y la capacidad de decisión de las personas consumidoras.

**Lo que te llevas** (tres líneas, justo después de la tarjeta):

- **Vas a reconocer** por qué se te olvida lo que pagas y por qué el botón de cancelar parece esconderse.
- **Vas a entender** qué es un patrón oscuro y qué midió la investigación sobre el olvido y sobre la fricción para salir.
- **Vas a poder** revisar tus suscripciones con una lista de cinco pasos y decidir hoy cuáles conservas.

## Escena 1 · Para empezar

*Experiencia personal de Isabel, confirmada el 19 de noviembre; sin nombre de empresa.*

A mí me pasa con una app de música. El cobro automático entra de madrugada, cuando no estoy pendiente, y durante el día la notificación del pago se pierde entre todas las demás que llegan. Cuando por fin me acuerdo de que tengo una suscripción activa, el cobro ya ocurrió.

Con otras apps me ha pasado algo distinto, y es que cuando quiero cancelar el botón está al fondo de la pantalla, en un color que se confunde con el resto, mientras que la opción de "suspender la cuenta" aparece grande y llamativa. Y no siempre hay dinero de por medio: a veces es solo una cuenta que quiero cerrar.

Me pregunté si era descuido mío, mala suerte o algo con nombre propio. Quise saber, además, si les pasa a otras personas por aquí, así que, junto con los estudios, busqué cómo lo cuentan en Colombia y en la región. Lo que encontré es que se trata de todo un conjunto de trampas y que empieza mucho antes de que intentes salir.

## Escena 2 · Primero, se te olvida

Una parte de esto no es culpa del diseño, sino de cómo funciona la cabeza. Dos economistas, Stefano DellaVigna y Ulrike Malmendier, revisaron los registros de pagos y asistencia de 7.752 socios de tres gimnasios de EE. UU. y compararon lo que cada persona pagaba con lo que habría pagado comprando entradas sueltas. Los socios con cuota mensual pagaban en promedio más de 17 dólares por visita, cuando el pase de diez entradas costaba 10 dólares por visita. Para el 80% habría salido más barato pagar entrada por entrada. Esto significa que pagar de más no era un accidente de unos pocos: era lo normal en ese grupo.

Antes de contarte qué pasó cuando esas personas dejaban de ir, te pido que hagas algo.

*Interacción 1, "Tu predicción contra la realidad":* elige un servicio que pagas, mueve un control para decir cuántas veces crees que lo usarás este mes y otro para cuántas lo usaste el mes pasado. Verás tu propia brecha junto a la del estudio (9,5 esperadas, 4,2 reales). Todo ocurre en tu navegador; no se guarda nada.

**Lo que esta prueba simula, y lo que no.** Simula el momento de predecir tu uso y compararlo con lo que recuerdas haber hecho. No mide tu sesgo ni te compara con otras personas, y lo que escribes no se guarda ni se envía. El 9,5 viene de una encuesta pequeña de 48 personas en un centro comercial y el 4,2, de los registros de asistencia de los gimnasios, así que sirven para ilustrar una brecha, no para decir cuánto se equivoca la gente en general.

En esa encuesta, las personas esperaban ir 9,5 veces al mes, mientras que en los registros de los gimnasios la asistencia real promedio era de 4,2. La brecha significa que calculábamos el futuro con más optimismo del que después cumplíamos.

Lo más revelador fue lo que pasaba al final. Cuando alguien dejaba de ir, tardaba en promedio 2,3 meses en cancelar y, mientras tanto, pagaba unos 187 dólares sin asistir. Los autores estiman que cancelar les costaba menos de 15 dólares, así que no era el trámite lo que los frenaba. Su explicación más plausible es otra: sobreestimamos cuánto vamos a usar un servicio y cuánto nos vamos a ocupar de cancelarlo.

> **Pull quote:** No encontraron gente a la que cancelar le costara mucho. Encontraron gente que creía que iba a usarlo más de lo que lo usaba.

Ese estudio es de EE. UU. y de gimnasios. En Colombia y en la región no encontré mediciones equivalentes sobre suscripciones. Eso no significa que aquí no pase; significa que, por ahora, lo que tenemos son relatos de personas, y los reviso más adelante.

**Acordeón · Y la cantidad de suscripciones:** Una encuesta encargada por una firma de investigación de mercado a 1.000 consumidores en EE. UU. encontró que el 54% subestimaba en al menos 100 dólares lo que gastaba al mes en suscripciones y que, en promedio, gastaban unos 133 dólares más de lo que calculaban. Es una encuesta comercial y de autorreporte, así que la leo como una señal y no como una medición firme.

**Acordeón · Los cobros de madrugada:** No encontré ningún estudio que mida si la hora del cobro o la acumulación de notificaciones influyen en que lo olvidemos. Lo que cuento en la primera escena es mi experiencia y lo dejo como una pregunta abierta: ¿cuántas personas pierden de vista un cobro porque su aviso llega mezclado con el resto?

## Escena 3 · Después, el diseño lo aprovecha

Cuando por fin te decides a salir, entran en juego otras cosas. El economista Cass Sunstein llama *sludge* (algo así como "lodo") a las fricciones innecesarias: pasos, esperas o papeleo que cuestan tiempo, frustran y a veces humillan. Según él, hacen más daño del que se supone, porque nuestros sesgos y nuestra atención limitada los agravan.

Las autoridades de consumo llevan años catalogando cómo se ve eso. En 2024, 27 autoridades de 26 países revisaron 642 comercios que venden suscripciones. El 75,7% usó al menos un patrón oscuro y el 66,8% usó dos o más. Según el informe, dos tipos fueron especialmente frecuentes: ocultar cosas (por ejemplo, no poder desactivar la renovación automática) e interferir con la interfaz (por ejemplo, destacar más visualmente la opción que le conviene al comercio). Esto significa que lo que describí en la primera escena no es una rareza de una sola app.

También hay una señal de la región: en 2021 el Sernac, la autoridad de consumo de Chile, revisó 107 sitios de comercio electrónico y encontró algún patrón oscuro en 69. Es un conteo de sitios, no de cómo lo vive quien los usa, pero muestra que lo que se mide afuera también aparece en sitios que se usan aquí.

En el día a día, esas trampas se ven así *(cuatro tarjetas que se voltean)*:

- **El cobro silencioso.** La renovación es automática y no hay una forma clara de desactivarla. El informe completo del barrido de 2024 registró que el 81% de los comercios con renovación automática no permitía desactivarla al comprar y que el 70% no informaba cómo cancelar al inscribirse.
- **El botón que no se ve.** El botón de cancelar queda abajo, pequeño o de un color que se confunde, mientras otras opciones se destacan. Es la "interferencia de interfaz" del barrido. Que lo que se destaque sea "suspender" es mi observación, no un dato medido.
- **El desvío.** Antes de dejarte salir te llevan por pasos y pantallas que no son cancelar. La FTC, la autoridad de consumo de EE. UU., acusó a una empresa de prometer "cancelación fácil" mientras exigía entre seis y nueve pantallas para cancelar. Es una acusación de la autoridad, no un hecho probado en este texto.
- **Los pasos de más.** Cada pantalla extra es otra oportunidad de arrepentirse. Es lo que midió el experimento que sigue.

Creo que es la evidencia más directa de lo que provoca esto. Luguri y Strahilevitz reclutaron a cerca de 1.760 adultos en EE. UU. y les dijeron que ya estaban inscritos en un plan ficticio de protección de datos. Lo único que cambiaba entre grupos era qué tan difícil era decir que no. Cuando bastaba con decir sí o no, aceptó el plan el 11,3%. Con trucos suaves, como un botón de "aceptar (recomendado)" ya marcado y razones para declinar que avergonzaban, subió a 25,8%. Con trucos agresivos, como pantallas con cuenta regresiva y una pregunta confusa de confirmación, llegó a 41,9%. En ese último grupo también hubo más malestar declarado (3,94 en una escala de 1 a 7, frente a 2,96 en el grupo de control), más expresiones de enojo en los comentarios abiertos y más abandono: la presión funciona, pero la mente también la nota y se rebela.

> **Pull quote:** Con solo hacer más difícil decir que no, la aceptación pasó de 11% a 26%.

Y no todo es dinero. Ese experimento trataba de un plan de datos personales, y la FTC incluye entre sus categorías de patrones oscuros el engañar a las personas para que compartan datos. Cancelar una cuenta, borrar una app o cerrar un perfil puede esconder el mismo laberinto sin que haya un cobro de por medio.

*Interacción 2, "Encuentra el botón":* una pantalla ficticia de ajustes de cuenta, con "Suspender cuenta" grande y llamativo y "Cancelar" pequeño y gris al fondo. Mide cuánto tardas en cancelar y cuántas veces tocas otra cosa; luego te muestra la misma pantalla con el botón visible. Banner fijo: "Esto es una simulación. No se guarda nada." y botón "Salir de la demostración" siempre visible.

**Lo que esta prueba simula, y lo que no.** Simula la sensación de buscar una salida escondida entre opciones más llamativas, y te muestra tu tiempo y tus toques solo en pantalla. No mide cuánto te pasaría en una app real ni con qué frecuencia ocurre: es una sola pantalla ficticia, y tu tiempo no se guarda ni se compara con el de nadie.

**Acordeón · Cómo se hizo el experimento y qué no dice:** Es una muestra representativa de adultos de EE. UU. reclutada por una empresa de encuestas; la muestra final fue de 1.963 personas y 1.762 entran en el análisis de aceptación. El plan era ficticio y las personas fueron informadas al final. Triplicar el precio mensual anunciado (de 2,99 a 8,99 dólares) no cambió la aceptación. En el grupo suave, el 75,5% de las aceptaciones ocurrió en la primera pantalla. Abandonaron el experimento 65 personas en el grupo agresivo frente a 9 en el suave; en el de control no había cómo abandonar. Las cifras de aceptación, la muestra, la primera pantalla, el precio y los abandonos coinciden con la versión publicada. No sé si el efecto se repite en Latinoamérica.

**Acordeón · Otras voces:** Un estudio con personas en línea (Sin et al.) encontró efectos pequeños para otros patrones (escasez, prueba social), así que no todos los trucos pesan igual. Y qué cuenta como patrón oscuro se discute: según comentaristas citados por la OCDE, hacer difícil cancelar no siempre es engañoso en sentido estricto.

## Escena 4 · ¿Y aquí?

Todo lo anterior se midió afuera. Mi pregunta fue cómo se vive aquí y, como no encontré mediciones, hice otra cosa: leí cómo lo cuentan las personas cuando lo cuentan por su cuenta, en espacios públicos. No es una encuesta ni representa a nadie; es una forma de escuchar con qué palabras y con qué emociones se cuenta.

**Tarjeta "Cuatro relatos de la región" · casos, no tendencia**

Busqué cómo lo cuentan personas de Colombia y la región en espacios públicos entre noviembre de 2024 y noviembre de 2026, pero solo encontré cuatro publicaciones que cumplieran todos mis criterios: una de Chile, una de México y dos de Colombia. Cuatro no alcanzan para decir qué se repite ni cuánta gente lo vive, así que las leo como casos que ilustran, no como una tendencia.

- **Qué sienten.** En los cuatro relatos aparece frustración, sospecha o indignación. Una persona sospecha que la empresa esconde el botón de cancelar; otra se indigna por un cobro anual que no esperaba.
- **A quién se lo atribuyen.** Sobre todo a la empresa, pero en dos relatos la persona deja abierta la duda de si fue un descuido propio: una dice que terminó con la membresía "sin darse cuenta" y otra reconoce que quizá debía leer los términos, aunque se pregunta quién lo hace. Es justo la pregunta con la que empecé este artículo.
- **Qué hacen.** Buscan el botón, escriben a un soporte, llaman al banco o cancelan la tarjeta, y piden ayuda en un foro público. En tres de los cuatro, el soporte no resuelve: es un asistente automático, un correo lento o no hay forma de contactarlo.
- **Voces que matizan.** En uno de los relatos, la propia persona reconoce que a otros usuarios sí les aparece el botón; en otro, alguien de la comunidad no encontró ninguna suscripción activa asociada a la cuenta. No toda queja se explica por una trampa de diseño.

*Paráfrasis de cuatro publicaciones públicas de Chile, México y Colombia,:* todo lo anterior es mi resumen. No cito textualmente, no identifico a nadie y no enlazo las publicaciones.

Lo que sí puedo decir con evidencia publicada es lo que le pasa a la mente cuando salir se vuelve difícil. En el experimento de Luguri y Strahilevitz, el grupo con trucos agresivos aceptó más y también expresó más enojo. En los cuatro relatos de por aquí aparece algo parecido: frustración, sospecha o indignación. Cuatro casos no prueban que sea lo habitual, pero muestran cómo se cuenta cuando pasa.

Varios países de la región ya escriben reglas sobre el camino para cancelar, y eso muestra que el problema se reconoce; el detalle está en el acordeón de abajo.

**Tarjeta destacada · Lo que nadie ha medido:** cuánto tardamos aquí en cancelar, qué proporción de personas lo vive y a quién le pasa más. Mi revisión son cuatro relatos: muestra cómo lo cuentan algunas personas que deciden contarlo, no cuántas lo viven ni qué trampas pesan más.

**Acordeón · El marco legal en la región:** En Colombia, la Superintendencia de Industria y Comercio (SIC) sancionó en 2020 a un operador móvil por dificultar solicitudes de sus usuarios, entre ellas cancelar, con base en quince quejas: les pedían ir a una oficina, firmar o llevar documentos. Un juzgado administrativo de Bogotá negó anular esa sanción en primera instancia, el 19 de diciembre de 2023, y señaló que exigirle a quien pide terminar un contrato que pruebe su titularidad es desproporcionado. Ojo: la SIC no lo calificó como patrón oscuro, y se rige por el régimen de telecomunicaciones. Desde el 1 de octubre de 2026, los operadores móviles deben ofrecer un canal digital para cancelar, según la CRC (detalle práctico en la escena 5). Argentina tiene un botón de baja desde 2018 y, desde septiembre de 2025, una disposición que lo hace obligatorio, con alta visibilidad en el primer acceso a la web y confirmación en 24 horas, y México reformó su ley de protección al consumidor con un decreto publicado el 12 de diciembre de 2025 (el decreto no fija multas). Que se legisle sobre un botón indica que se reconoce que el diseño de salir importa.

**Acordeón · Cómo se hizo la lectura de relatos y qué no dice:** Solo contenido público, sin nombres de usuario, enlaces ni capturas. Leí a mano hilos de foros públicos y de la comunidad de una tienda de apps; no pude consultar X, TikTok, Facebook ni Instagram. Mi protocolo pedía al menos 30 publicaciones, de dos tipos de fuente y tres meses distintos; no las encontré. Quedó un conjunto de cuatro con país confirmado. Dejé fuera otras tres publicaciones en español cuyo país no pude determinar, y una que parecía un intento de estafa más que una suscripción difícil de cancelar. Por eso los cuatro relatos ilustran y no prueban: no son un porcentaje de nadie.

**Acordeón · Lo que complica la historia:** El estudio de los gimnasios es de EE. UU., de hace más de veinte años y con gimnasios, no con suscripciones digitales. La encuesta de la firma de mercado es comercial. El barrido de 2024 cuenta cuántos comercios usan patrones, no cuánto cambian las decisiones. Los casos de la FTC son acusaciones. Las cifras de cuánto hay van del 11% al 97% según el método. La hora de los cobros y la pérdida de notificaciones son observaciones mías, no mediciones. Y una publicación no basta para generalizar.

## Escena 5 · Qué hacer con esto

No tengo una receta probada, pero sí algunas ideas que salen de lo que encontré (son ideas prácticas, no resultados de un estudio).

Primero, desconfía de tu predicción y mira cuánto usas de verdad cada servicio. Segundo, cancela en el momento en que lo decides: en el estudio de los gimnasios, la espera entre dejar de ir y cancelar costaba en promedio 187 dólares, y esa espera es justo donde caímos. Tercero, abre de vez en cuando tu extracto o los ajustes de suscripciones de tu tienda de apps, porque el aviso del cobro no siempre llega a tu atención. Y cuarto, si te enojas o te sientes culpable mientras cancelas, recuerda que ese malestar no siempre es tuyo: en el experimento, la presión agresiva produjo enojo.

Si eres quien diseña estos flujos, cuenta los pasos para entrar y para salir, y comprueba que el botón de cancelar no pierda en visibilidad frente a las alternativas. Si la diferencia es grande, no es un detalle de diseño: es una decisión.

*Interacción 3, "Mi plan de salida":* lista con casillas (miro mi uso real, reviso mi extracto, decido hoy, cancelo hoy, guardo la constancia) y botón "Copiar mi lista". Sin guardar nada.

**Lo que esta prueba simula, y lo que no.** Simula una lista de cinco pasos para revisar tus suscripciones y decidir hoy. No sabe cuáles tienes, no se conecta con tu banco ni con tus apps y no verifica que hagas nada; la lista se copia a tu portapapeles y no se guarda en ningún lado.

**Acordeón · Si estás en Colombia:** En servicios móviles, desde el 1 de octubre de 2026 el operador debe tener un canal digital para pedir la cancelación. Según la CRC, la solicitud con al menos tres días hábiles de anticipación al corte aplica en ese corte, y las quejas por incumplimiento van a la SIC. Para operadores que prestan solo servicios fijos (internet, TV y telefonía fija) rige desde el 1 de diciembre de 2026. El canal debe limitarse a tramitar la solicitud: la resolución prohíbe usarlo para ofertas de retención. No es asesoría legal.

## Cierre

**Para llevarte:** Seguimos pagando lo que no usamos porque creemos que lo usaremos más de lo que lo usamos, y porque el diseño de las suscripciones juega con el olvido y con la duda justo cuando intentamos irnos. Lo que falta es saber, con datos, cómo nos pasa a nosotros.

**Si te sirvió:** Compártelo con alguien que pueda necesitarlo, o sigue con otro pilar. Acciones: *Copiar enlace* · *Explorar los pilares*.

**Cómo se hizo:** Este artículo se basa en estudios académicos, informes oficiales y cobertura de medios, y en la lectura de 4 publicaciones públicas de foros de Colombia, México y Chile entre noviembre de 2024 y noviembre de 2026. Son pocas, así que las leo como casos y no como tendencia. No hay encuestas ni entrevistas propias. La metodología completa está en el brief. Trabajé la revisión de fuentes entre el 4 y el 19 de noviembre de 2026. No nombro empresas. Las observaciones personales de este artículo son mías, no datos.

**Sigue explorando:** Próximamente.

**Remate:** Fin del camino.

**CTA:** ¿Quieres ayudar a medir cómo nos pasa esto en Latinoamérica? Escríbeme →

## Fuentes

- DellaVigna y Malmendier (2006), *Paying Not to Go to the Gym*, American Economic Review 96(3). Nivel: estudio observacional. Copia de la versión de la AER 2006 alojada por la autora: https://eml.berkeley.edu/\~ulrike/Papers/gym.pdf
- Sunstein (2022), *Sludge Audits*, Behavioural Public Policy 6(4). Nivel: marco conceptual. Solo el resumen.
- ICPEN (2024), informe público y comunicado del barrido de suscripciones: https://icpen.org/news/1360. Nivel: dato institucional.
- FTC (2022), informe *Bringing Dark Patterns to Light*: https://www.ftc.gov/node/79647. Nivel: dato institucional; los casos son acusaciones.
- Encuesta de una firma de investigación de mercado (2022), citada por CNBC: https://www.cnbc.com/2022/09/06/consumers-underestimate-monthly-subscription-costs-by-at-least-100.html. Nivel: dato de industria.
- Luguri y Strahilevitz (2021), *Shining a Light on Dark Patterns*, Journal of Legal Analysis. Nivel: estudio experimental. Aceptación contrastada con el resumen publicado; el resto, del borrador de 2019.
- Decreto de México publicado en el DOF el 12 de diciembre de 2025 (art. 76 Bis de la ley federal de protección al consumidor). Nivel: dato institucional.
- Revisión de publicaciones públicas (2024-2026), ver hoja de registro. Nivel: discurso público observado. Sin enlaces por regla del protocolo.
- OCDE, SIC, sentencia de 2023, Sernac, CRC: ver el brief.

## Pendientes de verificación (Parte D)

| Pendiente | Estado | Qué se abrió y qué se encontró |
| --- | --- | --- |
| Gimnasios, versión publicada | Verificado | Resumen de la AER: más de 17 dólares por visita frente a 10, pérdida de unos 600 dólares, 17% más de permanencia con contrato mensual. **Verificado en una copia de la versión AER 2006 alojada por la autora:** 7.752 socios, 80%, 2,31 meses, 187 dólares, menos de 15 dólares de costo de cancelar y la encuesta de 48 personas en un centro comercial (9,5 esperadas; las 4,2 reales vienen de los registros de los gimnasios, no de la encuesta: corregido). La versión de trabajo de NBER trae cifras algo distintas (7.978; 2,29; 185); se usan las de la AER. |
| Luguri y Strahilevitz, versión publicada | Verificado y corregido | Cuerpo del artículo abierto: 11,3 / 25,8 / 41,9; muestra de 1.963 y 1.762 en el análisis; 75,5% de las aceptaciones suaves en la primera pantalla; precio sin efecto significativo; malestar 2,96 / 3,05 / 3,94 (escala de 1 a 7); 9 abandonos en el suave y 65 en el agresivo. Corregido: las cifras de enojo 12,8% frente a 5,7% no están en el artículo publicado y se retiraron; los 9 abandonos eran del grupo suave, no del de control. |
| ICPEN (2024), informe completo | Verificado | 642 comercios, 27 agencias de 26 países, 75,70% y 66,82% coinciden. Cifras nuevas agregadas con su denominador: 81% (renovación automática no desactivable al comprar) y 70% (sin informar cómo cancelar). |
| FTC (2022), informe completo | Verificado y corregido | Los casos son acusaciones. Corregido el desvío: seis a nueve pantallas para cancelar, no "páginas de promociones". La categoría de datos aparece en la sección IV. |
| Gray et al. (2018) | No verificado | No pude abrir el artículo. v6 no lo cita en el texto visible. |
| Saturación de notificaciones | No verificado | No encontré evidencia directa. Se mantiene como observación personal y pregunta abierta. |
| Resolución CRC 8171 | Verificado en el texto | Texto abierto: modifica la Res. 5050/2016, canal digital exclusivo, prohíbe ofertas de retención, 15 días hábiles para responder, móviles desde el 1 de octubre de 2026 y operadores solo fijos desde el 1 de diciembre de 2026. No encontré en el texto los "tres días hábiles" ni el canal de quejas: siguen atribuidos a la CRC y quedan por contrastar. La Resolución 8287 solo corrige el art. 4. |
| México, DOF | Verificado | Decreto del 12 de diciembre de 2025 abierto. El decreto no fija multas; la multa de tres millones de pesos que circuló viene de prensa y no está en el texto. |
| Argentina, Boletín Oficial | Verificado en resumen | No abrí el Boletín Oficial; los datos (publicada el 4 de septiembre de 2025, botón de alta visibilidad en el primer acceso, confirmación en 24 horas, 60 días para adaptarse) vienen de un resumen de estudio jurídico. El botón existe desde 2018 (Res. 316/2018), no 2020: corregido. |
| Sernac, 107 sitios y 69 con patrón | Verificado en prensa | Cobertura periodística confirma 107 sitios de comercio electrónico revisados del 16 al 19 de marzo de 2021 y patrones en 69. La página oficial del Sernac no se pudo abrir. |

Correcciones hechas en el texto: "más de 17" (gimnasios); desvío de la FTC (seis a nueve pantallas); cifras del ICPEN con denominador; 65 y 9 abandonos de Luguri; sin la multa de México.

## Decisiones para Isabel

1. **Titular.** Tres opciones en forma de pregunta, de 6 a 14 palabras; no elijo por ti (Isabel descartó las versiones que describían un hecho). Mi recomendación es la primera, "¿Descuido tuyo o diseño? Por qué sigues pagando lo que no usas" (12 palabras): se entiende sin contexto, nombra la duda con la que empieza el artículo y la evidencia sostiene que pesan las dos cosas. La segunda, "¿Por qué sigues pagando lo que ya no usas?", es la más directa. La tercera, "¿Por qué cancelar una suscripción cuesta más que contratarla?", se centra en la fricción para salir.
2. **Tu experiencia personal (escena 1).** Confirmada por Isabel el 19 de noviembre; se usa sin nombre de empresa.
3. **Orden de la escena 2.** Confirmado por Isabel el 19 de noviembre: la interacción 1 va antes de las cifras de 2,3 meses y 187 dólares, con la encuesta de 48 personas como cierre.
4. **Datos que no puedo sostener hoy.** Las cifras de gimnasios que solo salen del borrador, el enojo de Luguri (12,8% y 5,7%), Argentina y el Sernac. Siguen en el texto con su rotulado; si prefieres, los quito hasta verificarlos.
5. **"Compartir".** La guía lista "Compartir" aparte de "Si te sirvió"; en v6 "Copiar enlace" vive dentro de "Si te sirvió". Confirma si va por separado.

## Qué le falta a la v6 antes de pasar a `en-revision`

- **Escucha social completa.** Hay 4 publicaciones con país confirmado, no las 30 mínimas del protocolo. Decisión con Isabel (19 de noviembre): no hay más, así que el artículo las presenta como cuatro casos y no como escucha social. Las fechas de los hilos no se publican (decisión de Isabel, 19 de noviembre). Falta revisar que ningún texto diga que algo "se repite" más allá de esos cuatro.
- Segunda pasada de codificación sobre el 20% cuando haya más publicaciones (con una no aplica).
- Titular elegido (opción 1); falta solo la revisión externa del texto.
- Abrir: texto completo de la CRC 8171, Boletín Oficial de Argentina, original del Sernac, versión publicada de Luguri (cuerpo) y de los gimnasios (cifras de 2,3 meses, 187 dólares y 48 personas).
- Gray et al. (2018) solo si se va a citar.
- Actualizar el brief y el protocolo con el cambio de "un solo patrón" a la familia de trampas de suscripción.
- Revisión externa.
- Igualar los slugs de `nivel` con §7 de la guía y actualizar la instrucción para Code a partir de esta versión.
