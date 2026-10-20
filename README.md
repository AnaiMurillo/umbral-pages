# Umbral

Plataforma de investigación en Behavioral HCI y Human-Centered AI para Latinoamérica, hecha de artículos interactivos.

Sitio estático con **Astro** y componentes interactivos en **Svelte**. Gráficos con **D3**, pasos con **Scrollama** y el hero del Inicio con **GSAP ScrollTrigger**. Se publica en **Cloudflare Workers** (archivos estáticos).

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

```mdx
<Afirmacion fuente="id-de-fuente">una afirmación importante</Afirmacion>

<EscenaFija etiqueta="Nombre de la escena">
  <GraficoMecanismo slot="grafico" client:visible ... />
  <Paso>Texto del paso 1</Paso>
  <Paso>Texto del paso 2</Paso>
</EscenaFija>

<Revelacion hallazgo={frontmatter.hallazgo}>Respaldo breve</Revelacion>
<PullQuote quien="Nombre" contexto="cargo" fuente="id">Cita</PullQuote>
<Llamada titulo="Dato de Colombia" tipo="dato">...</Llamada>   (tipo: dato | ojo)
<LecturaRapida>- punto 1 - punto 2</LecturaRapida>
<Acordeon titulo="Comunicado oficial" meta="Entidad · fecha">...</Acordeon>
<PublicacionX url="https://x.com/..." autor="@cuenta" fecha="2026">Texto</PublicacionX>
```

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

- `--umbral-negro` en `src/styles/tokens.css` es provisional (`#1A1A1A`): reemplazar por el código exacto de Wix.
- Aether: si se puede usar fuera de Wix, poner los archivos en `public/fonts/` y declararla con `@font-face`. Mientras tanto se usa Archivo Black.
- El correo de `colabora.astro` es de relleno.
