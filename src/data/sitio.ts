// ==========================================================
// Datos y textos globales del sitio (TEXTOS_FINALES.md §1).
// LinkedIn: pega aquí el enlace de tu perfil. Mientras esté vacío,
// el botón de LinkedIn no aparece (pie, Sobre mí y Colabora).
// ==========================================================
export const sitio = {
  nombre: 'Umbral',
  autora: 'Ana Isabel Murillo Murillo',
  correo: 'psi.anamurillo@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anaimurillo',
  lema: 'Behavioral HCI y Human-Centered AI para Latinoamérica.',
  /** Línea en lenguaje sencillo bajo el lema del pie (FLUJO_PROPOSITO_Y_VALOR §4.1). */
  lemaSencillo: 'Evidencia sobre lo que la tecnología hace en nosotros, explicada desde la psicología.',
  avisoPie: 'Este sitio no recoge datos de lectores. Las simulaciones corren solo en tu navegador.',
  licencia: 'Creative Commons BY-NC 4.0',
};

/**
 * Banderas. pruebaRapida: bloque D del Inicio ("Pruébalo en 30 segundos").
 * Queda oculto hasta que el Artículo 01 esté publicado: pon `activa: true` y en
 * `articulo` el nombre de su archivo (sin .mdx). Si el artículo no existe o no está
 * publicado, el bloque no aparece aunque la bandera esté activa.
 */
export const banderas = {
  pruebaRapida: { activa: false, articulo: '' },
};

// ==========================================================
// Propósito y valor para el lector (docs/FLUJO_PROPOSITO_Y_VALOR.md).
// Regla: se promete entender, reconocer y llevarse algo para hacer;
// nunca un cambio en la conducta de quien lee.
// ==========================================================
export const proposito = {
  inicio: {
    lineaBeneficio: 'Para entender por qué tu mente hace lo que hace frente a una pantalla, reconocerlo cuando pasa y decidir con más información.',
    teLlevas: {
      titulo: 'Lo que te llevas de cada artículo',
      tarjetas: [
        ['Reconoces.', 'Ves el mecanismo en algo que ya te pasó: una suscripción que sigues pagando, una notificación que no pudiste ignorar, un mensaje que creíste sin leer.'],
        ['Entiendes.', 'Sabes por qué tu mente reacciona así, y por qué a otras personas les pasa distinto, con la evidencia a la vista y sin jerga.'],
        ['Te llevas algo para hacer.', 'Pasos concretos para ti, si usas tecnología, o para tu equipo, si la diseñas.'],
      ],
    },
    porQueExiste: {
      titulo: 'Por qué existe Umbral',
      parrafos: [
        'Vivimos rodeados de tecnología, y lo que provoca en nosotros no es igual para todas las personas: depende de quién eres, de lo que sabes y del contexto en que la usas. Umbral explica esos fenómenos desde la psicología, con evidencia y con ejemplos que puedes recorrer y probar, para que entiendas por qué actúas como actúas frente a una pantalla.',
        'Y lo hace desde Latinoamérica, donde sobre varios de estos mecanismos casi no hay investigación publicada.',
      ],
      enlace: { texto: 'Conoce el proyecto →', href: '/sobre-mi' },
    },
    hechoPara: {
      titulo: 'Hecho para',
      etiquetas: [
        'Personas que usan tecnología todos los días y quieren entender qué les pasa',
        'Equipos de producto y diseño que buscan decisiones menos dañinas',
        'Estudiantes e investigadores de psicología, HCI y datos',
        'Fundaciones, medios y comunidades que necesitan evidencia local',
      ],
    },
    pasoCuatro: ['Llévate algo para hacer.', 'Cada artículo cierra con pasos concretos: para ti, si usas tecnología, o para tu equipo, si la diseñas.'],
    pruebaRapida: {
      titulo: 'Empieza por una pregunta: ¿cuántas suscripciones pagas sin usar?',
      cierre: 'Así funciona cada artículo: primero lo pruebas, después entiendes por qué pasa.',
      boton: 'Leer el artículo completo →',
      aviso: 'No se guarda nada.',
    },
  },
  pilares: {
    lineaIntro: 'Cada pilar responde una pregunta que te haces sin darte cuenta. Empieza por la que más se parezca a lo que te pasa.',
  },
  articulo: {
    teLlevas: 'Lo que te llevas',
    siTeSirvio: {
      titulo: 'Si te sirvió',
      texto: 'Compártelo con alguien que pueda necesitarlo, o sigue con otro pilar.',
      explorar: 'Explorar los pilares',
    },
  },
  investigacion: {
    porQueMetodo: {
      titulo: 'Por qué mostramos el método',
      texto: 'Para que no tengas que creernos. Cada brief muestra qué se buscó, qué se encontró, qué no se encontró y qué no podemos afirmar. Si algo cambia, se corrige con fecha y a la vista.',
    },
    comoLeer: {
      titulo: 'Cómo leer un brief en dos minutos',
      pasos: [
        'Lee "Qué encontramos": es el hallazgo en una frase.',
        'Mira "Qué no podemos afirmar": son los límites.',
        'Revisa las fuentes: cada afirmación importante tiene la suya.',
      ],
    },
  },
  sobreMi: {
    // BORRADOR: Isabel confirma (es su motivación). En la página pública se ve sin marca.
    porQueCree: {
      titulo: 'Por qué creé Umbral',
      texto: 'Vivimos rodeados de tecnología y pocas veces alguien explica qué nos hace. Lo que vemos, decidimos o sentimos frente a una pantalla tiene causas que se pueden estudiar, y no nos afectan a todas las personas igual. Creé Umbral para explicar esos fenómenos desde la psicología, con evidencia y de una forma que se pueda recorrer y no solo leer. Lo hago desde Latinoamérica, donde sobre varios de estos mecanismos casi no hay investigación publicada.',
    },
    promesas: {
      titulo: 'Mis promesas',
      lista: [
        ['Nada sin fuente.', 'Cada afirmación importante lleva la suya.'],
        ['Siempre una fuente que complique.', 'Busco lo que contradice o matiza el hallazgo.'],
        ['Ningún dato tuyo.', 'El sitio no recoge información de quien lo visita.'],
        ['Correcciones a la vista.', 'Si me equivoco, lo cambio con fecha y lo digo.'],
      ],
    },
  },
  /** Línea "Qué te llevas" de cada tarjeta de Colabora (por título de la tarjeta). */
  colabora: {
    'Fundaciones y sector social': 'Evidencia local en un lenguaje que tu comunidad entiende, abierta y citable.',
    'Empresas y tecnología': 'Una lectura psicológica de un comportamiento que no logras explicar, con evidencia y sin conclusiones a la medida.',
    'Academia y comunidades de HCI': 'Un caso de la región con método declarado, que puedes citar o replicar.',
    'Medios y eventos': 'Una fuente que explica el mecanismo con evidencia y lo ilustra con casos locales.',
  } as Record<string, string>,
};

export const textos = {
  saltar: 'Saltar al contenido',
  sinAnimacion: 'Ver sin animación',
  conAnimacion: 'Ver con animación',
  modoEvidencia: 'Modo evidencia',
  ayudaEvidencia: 'Resalta cada afirmación y muestra su fuente.',
  copiar: 'Copiar',
  copiado: 'Copiado.',
  errorCopiar: 'No se pudo copiar. Selecciona el texto y cópialo.',
  abrirFuente: 'Abrir fuente ↗',
  avisoX: 'Al cargarla, X puede registrar tu visita.',
  proximamente: 'Próximamente',
};

export const nav = [
  { href: '/pilares', texto: 'Pilares' },
  { href: '/investigacion', texto: 'Investigación' },
  { href: '/sobre-mi', texto: 'Sobre mí' },
  { href: '/colabora', texto: 'Colabora' },
];

/** Tipos de interacción (GUIA §2.2 y §3.3). */
export const tiposInteraccion: Record<string, string> = {
  'decision-forzada': 'Decisión forzada',
  'antes-y-despues': 'Antes y después',
  'explorar-datos': 'Explorar datos',
  'simular-interfaz': 'Simular una interfaz',
  'predecir-antes-de-ver': 'Predecir antes de ver',
};

export const formatoFecha = (d: Date) =>
  d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
