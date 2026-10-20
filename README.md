# Umbral

Plataforma de investigación en Behavioral HCI y Human-Centered AI para Latinoamérica, hecha de artículos interactivos.

Sitio estático con **Astro** y componentes interactivos en **Svelte**. El camino grueso y el Inicio usan **GSAP ScrollTrigger**; la parada activa, **Scrollama**; lo demás, CSS. Fuentes locales (Bricolage Grotesque y Questrial). Diseño: `docs/DESIGN.md`. Accesibilidad: `docs/ACCESIBILIDAD.md`. Se publica en **Cloudflare Workers** (archivos estáticos).

## Editar contenido (sin tocar código)

| Qué | Dónde |
| --- | --- |
| Los 5 pilares (nombre, mecanismo, teaser) | `src/content/pilares.json` |
| Módulos explorables | `src/content/modulos/*.mdx`, un archivo por módulo (el nombre del archivo es la URL) |
| Research briefs | `src/content/investigacion/*.md` |
| Manifiesto del Inicio | `src/pages/index.astro`, lista `frases` |
| Sobre mí / Colabora | `src/pages/sobre-mi.astro`, `src/pages/colabora.astro` |

**Crear un módulo nuevo:** copia `src/content/modulos/plantilla-ejemplo.mdx`, cámbiale el nombre y edita los campos de arriba (titular, bajada, pregunta, hallazgo, fuentes, recomendaciones) y el texto.

### Componentes que puedes usar en el texto de un módulo

El diseño sigue `docs/DESIGN.md`. Cada módulo es un **camino grueso** con cinco paradas: Gancho y Qué hacer salen del frontmatter; las tres del medio se escriben en el MDX:

```mdx
<Parada escena="jugable" etiqueta="Escena jugable" titulo="Pruébalo tú">
  Texto de la tarjeta, gráficos y decisión.
</Parada>
<Parada escena="revelacion" etiqueta="El hallazgo" titulo={frontmatter.hallazgo}>...</Parada>
<Parada escena="evidencia" etiqueta="La evidencia" titulo="...">...</Parada>

<Afirmacion fuente="id-de-fuente">una afirmación importante</Afirmacion>
<PullQuote quien="Nombre" contexto="cargo" fuente="id">Cita</PullQuote>
<Llamada titulo="Dato de Colombia" tipo="dato">...</Llamada>   (tipo: dato | ojo)
<LecturaRapida>- punto 1 - punto 2</LecturaRapida>
<Acordeon titulo="Comunicado oficial" meta="Entidad · fecha">...</Acordeon>
<PublicacionX url="https://x.com/..." autor="@cuenta" fecha="2026">Texto</PublicacionX>
```

- `color: celeste | rosa` en el frontmatter elige el color del camino.
- En el titular, `*palabra*` se resalta en rosa.
- Las criaturas, sus objetos y la composición de computador y móvil están en `src/components/camino/composiciones.ts`.

Cada `<Afirmacion>` debe apuntar a un `id` de la lista `fuentes` del mismo archivo. Si no existe, la consola del navegador avisa.

## Trabajar en local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/ como en producción
```

Versión estática de cualquier página: agrega `?estatico=1` a la URL (`?estatico=0` para volver).

## Publicación (Cloudflare)

- Configuración: `wrangler.jsonc` (Workers con archivos estáticos, carpeta `dist/`). Wrangler ejecuta `npm run build` antes de publicar.
- Versión de Node: `.node-version` (Astro 7 exige 22.22 o superior).
- Con el repositorio conectado en **Workers Builds**:
  - cada push a `main` publica producción;
  - cada otra rama o pull request crea una **vista previa** con su propia URL.
- Ajustes del proyecto en Cloudflare: comando de build `npm run build`, comando de deploy `npx wrangler deploy`, y para las ramas que no son de producción `npx wrangler preview`.

## Pendientes

- El correo de `colabora.astro` es de relleno.
