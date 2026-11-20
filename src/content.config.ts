import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// ----------------------------------------------------------
// Pilares: src/content/pilares.json (TEXTOS_FINALES.md §3 y §4).
// Las listas vacías ocultan su bloque en la página del pilar.
// ----------------------------------------------------------
const pilares = defineCollection({
  loader: file('./src/content/pilares.json'),
  schema: z.object({
    orden: z.number(),
    numero: z.string(),
    nombre: z.string(),
    color: z.enum(['celeste-v', 'rosa-v', 'mantequilla', 'menta', 'coral']),
    criatura: z.enum(['pregunta', 'sello', 'ojo', 'pila', 'saltarin', 'empujon', 'doble']),
    subtitulo: z.string(),
    frase: z.string(),
    /** "Te pasa si…" bajo la frase destacada (FLUJO §4.2). */
    tePasaSi: z.string().optional(),
    pregunta: z.string(),
    queExplora: z.string(),
    /** "Para qué te sirve este pilar" (FLUJO §4.3). */
    paraQueSirve: z.string().optional(),
    situaciones: z.array(z.string()).default([]),
    enElRadar: z.array(z.string()).default([]),
    glosario: z.array(z.object({
      termino: z.string(),
      definicion: z.string(),
      fuente: z.string(),
      sinFuenteAcademica: z.boolean().default(false),
    })).default([]),
    vacios: z.array(z.string()).default([]),
  }),
});

const fuente = z.object({
  id: z.string(),
  titulo: z.string(),
  url: z.string().optional(),
  // Opcionales: los usa el modo evidencia y la lista de fuentes.
  autor: z.string().optional(),
  anio: z.union([z.number(), z.string()]).optional(),
  tipo: z.enum(['dato', 'paper', 'caso', 'comunicado', 'prensa']).default('paper'),
  latam: z.boolean().default(false),
  /** Nivel de evidencia (GUIA_ARTICULOS §7). Si está, el texto de la fuente ya lo nombra. */
  nivel: z.string().optional(),
});

// ----------------------------------------------------------
// Artículos: un .mdx por artículo en src/content/articulos/
// Frontmatter de GUIA_INTERFAZ_Y_CONTENIDO.md §3.4 (+ campos opcionales).
// ----------------------------------------------------------
const articulos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articulos' }),
  schema: z.object({
    titulo: z.string(),
    bajada: z.string(),
    pilar: reference('pilares'),
    /** Formato anterior (artículo de ejemplo). Los artículos nuevos usan familiaDeMecanismos. */
    mecanismo: z.string().optional(),
    /** GUIA_ARTICULOS §7: migas y chip del hero ("Pilar · Familia"). */
    familiaDeMecanismos: z.string().optional(),
    /** Un tipo (formato anterior) o la lista de interacciones del artículo. */
    tipoInteraccion: z.union([z.string(), z.array(z.string())]),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date(),
    tiempoLectura: z.number(),
    /** borrador y en-revision: solo se construyen en las vistas previas, nunca en producción. */
    estado: z.enum(['publicado', 'en-preparacion', 'borrador', 'en-revision']).default('publicado'),
    /** Texto de "Para llevarte". */
    hallazgoUnaFrase: z.string(),
    casoLocal: z.object({ titulo: z.string(), fuente: z.string() }).optional(),
    matiz: z.object({ titulo: z.string(), fuente: z.string() }).optional(),
    /** Solo informativo: los titulares probados (no se muestra). */
    tituloAlternativas: z.array(z.string()).optional(),
    /** "Cómo se llama esto" (GUIA_ARTICULOS §3 y §4): tarjeta celeste bajo la bajada. */
    comoSeLlama: z.object({
      termino: z.string(),
      ingles: z.string().optional(),
      definicion: z.string(),
      /** Frase que cita la fuente de la definición (se marca para el modo evidencia). */
      citaFuente: z.string().optional(),
      fuente: z.string().optional(),
    }).optional(),
    /** Capa "Cómo lo cuentan por aquí" (registro; no se muestra como cifra ni como tendencia). */
    escuchaSocial: z.record(z.string(), z.any()).optional(),
    /** Nivel de evidencia de cada fuente, por id (copiado del doc del artículo). */
    nivelPorFuente: z.record(z.string(), z.string()).optional(),
    /** Texto propio de "Cómo se hizo" (si falta, se usa el texto fijo). */
    comoSeHizo: z.string().optional(),
    /** Pregunta del llamado a la acción del remate (botón "Escríbeme →" a Colabora). */
    llamado: z.string().optional(),
    briefSlug: z.string().optional(),
    fuentes: z.array(fuente).default([]),
    // Opcionales
    /** Artículo de ejemplo: aviso, sin indexar y fuera de catálogos (TEXTOS_FINALES §5.3). */
    ejemplo: z.boolean().default(false),
    /** Pregunta que responderá (tarjeta "En preparación"). */
    preguntaQueResponde: z.string().optional(),
    /** "Lo que te llevas" (FLUJO §4.4, GUIA_ARTICULOS §4): tres líneas fijas, sin revelar el hallazgo.
     *  Pueden empezar con "Vas a reconocer / entender / poder" o traer solo el resto.
     *  El verbo de "poder" coincide con la interacción de "Qué hacer con esto". */
    llevas: z.object({
      reconocer: z.string(),
      entender: z.string(),
      poder: z.string(),
    }).optional(),
    recomendaciones: z.object({
      producto: z.string(),
      usuarios: z.string(),
      investigacion: z.string(),
    }).optional(),
  }),
});

// ----------------------------------------------------------
// Briefs: un .md o .mdx por brief en src/content/investigacion/
// Cuerpo con las secciones: Contexto · Metodología · Evidencia · Problemas
// encontrados · Oportunidades · Recomendaciones · Fuentes.
// ----------------------------------------------------------
const investigacion = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/investigacion' }),
  schema: z.object({
    titulo: z.string(),
    pilar: reference('pilares'),
    mecanismo: z.string(),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date(),
    tipoFuentes: z.string().default('Fuentes secundarias abiertas'),
    queEncontramos: z.string(),
    numFuentes: z.number(),
    articuloSlug: z.string().optional(),
    vacios: z.array(z.string()).default([]),
  }),
});

export const collections = { pilares, articulos, investigacion };
