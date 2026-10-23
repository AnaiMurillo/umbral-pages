// ==========================================================
// Datos y textos globales del sitio (TEXTOS_FINALES.md §1).
// LinkedIn: pega aquí el enlace de tu perfil. Mientras esté vacío,
// el botón de LinkedIn no aparece (pie, Sobre mí y Colabora).
// ==========================================================
export const sitio = {
  nombre: 'Umbral',
  autora: 'Ana Isabel Murillo Murillo',
  correo: 'psi.anamurillo@gmail.com',
  linkedin: '', // ← p. ej. 'https://www.linkedin.com/in/tu-perfil'
  lema: 'Behavioral HCI y Human-Centered AI para Latinoamérica.',
  avisoPie: 'Este sitio no recoge datos de lectores. Las simulaciones corren solo en tu navegador.',
  licencia: 'Creative Commons BY-NC 4.0',
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
