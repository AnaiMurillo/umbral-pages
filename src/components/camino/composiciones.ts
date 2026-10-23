// ==========================================================
// Composiciones del camino grueso (DESIGN.md §5b).
// Computador y móvil se dibujan APARTE: cambian el ancho de la cinta,
// la forma de las curvas, el lado de cada criatura y qué objetos aparecen.
// ==========================================================

export type Escena = 'cabecera' | 'gancho' | 'jugable' | 'revelacion' | 'evidencia' | 'que-hacer';
export type NombreCriatura = 'pregunta' | 'sello' | 'ojo' | 'pila' | 'saltarin' | 'empujon' | 'doble';
export type Pilar = 'confianza' | 'persuasion' | 'comprension' | 'atencion' | 'identidad-digital';

/** Cómo se traza la cinta en cada formato. */
export interface ComposicionCamino {
  /** Ancho del trazo en px (computador 220-340, móvil 96-140). */
  ancho: (anchoPantalla: number) => number;
  /** Cuánto se estiran las curvas en vertical (0-1). */
  tension: number;
  /** Cuánto se abre la curva hacia el borde del lado de la criatura (fracción del ancho). */
  vuelo: number;
  /** Punto de partida, en fracción del ancho y px sobre el borde superior. */
  inicio: { x: number; y: number };
  /** Cuánto se hunde la base de la criatura dentro de la cinta (fracción del ancho de cinta). */
  hundir: number;
  /** Altura de la punta del camino en la pantalla (fracción del alto) mientras se dibuja. */
  punta: number;
}

export const camino: Record<'computador' | 'movil', ComposicionCamino> = {
  computador: {
    ancho: (w) => Math.round(Math.min(340, Math.max(220, w * 0.2))),
    tension: 0.62,
    vuelo: 0.16,
    inicio: { x: 0.08, y: -160 },
    hundir: 0.18,
    punta: 0.9,
  },
  movil: {
    // Cinta de 96 a 140 px; se sale de los bordes de la pantalla.
    ancho: (w) => Math.round(Math.min(140, Math.max(96, w * 0.31))),
    tension: 0.5,
    vuelo: 0.55,
    inicio: { x: 1.15, y: -120 },
    hundir: 0.22,
    punta: 0.92,
  },
};

/** Objeto secundario (DESIGN §5b): 3 a 6 por escena; en móvil, máximo 3. */
export interface Objeto {
  tipo: 'estrella' | 'circulo' | 'nota' | 'flecha' | 'estela';
  color: 'a3' | 'a4' | 'line';
  /** Tamaño en px (ancho). */
  tam: number;
  /** Posición relativa a la caja de la criatura, en % (puede salir de 0-100). */
  pc: { x: number; y: number; giro?: number };
  /** Posición en móvil. Sin ella, el objeto no se muestra en móvil. */
  movil?: { x: number; y: number; giro?: number };
  /** Velocidad de parallax (0 = quieto, 1 = rápido). Las estelas se dibujan, no flotan. */
  parallax?: number;
}

export interface ComposicionEscena {
  criatura: NombreCriatura;
  /** Lado de la criatura en computador. En móvil se alinea al mismo lado. */
  lado: 'izq' | 'der';
  objetos: Objeto[];
}

export const escenas: Record<Escena, ComposicionEscena> = {
  // Cabecera del artículo: primera parada; su criatura es la del pilar (Parada la reemplaza).
  cabecera: {
    criatura: 'sello',
    lado: 'der',
    objetos: [
      { tipo: 'estrella', color: 'a3', tam: 54, pc: { x: -8, y: 4 }, movil: { x: 2, y: -6 }, parallax: 0.7 },
      { tipo: 'circulo', color: 'a4', tam: 40, pc: { x: 100, y: 18 }, movil: { x: 88, y: 2 }, parallax: 0.4 },
      { tipo: 'estela', color: 'line', tam: 300, pc: { x: -62, y: 66, giro: -8 } },
      { tipo: 'flecha', color: 'line', tam: 90, pc: { x: 92, y: -14, giro: 10 }, movil: { x: 70, y: -16, giro: 10 } },
    ],
  },
  gancho: {
    criatura: 'pregunta',
    lado: 'izq',
    objetos: [
      { tipo: 'estrella', color: 'a3', tam: 54, pc: { x: -8, y: 4 }, movil: { x: 2, y: -6 }, parallax: 0.7 },
      { tipo: 'circulo', color: 'a4', tam: 40, pc: { x: 100, y: 18 }, movil: { x: 88, y: 2 }, parallax: 0.4 },
      { tipo: 'estela', color: 'line', tam: 300, pc: { x: -62, y: 66, giro: -8 } },
      { tipo: 'circulo', color: 'a3', tam: 20, pc: { x: 30, y: -12 }, parallax: 1 },
      { tipo: 'flecha', color: 'line', tam: 90, pc: { x: 92, y: -14, giro: 10 }, movil: { x: 70, y: -16, giro: 10 } },
    ],
  },
  jugable: {
    criatura: 'sello',
    lado: 'der',
    objetos: [
      { tipo: 'circulo', color: 'a3', tam: 46, pc: { x: 104, y: 6 }, movil: { x: 86, y: -4 }, parallax: 0.6 },
      { tipo: 'nota', color: 'a4', tam: 52, pc: { x: -10, y: 10 }, movil: { x: 2, y: 0 }, parallax: 0.5 },
      { tipo: 'estela', color: 'line', tam: 320, pc: { x: 62, y: 74, giro: 6 }, movil: { x: 30, y: 84, giro: 4 } },
      { tipo: 'estrella', color: 'a3', tam: 30, pc: { x: 20, y: -8 }, parallax: 0.9 },
      { tipo: 'circulo', color: 'a4', tam: 18, pc: { x: 88, y: -10 }, parallax: 1 },
    ],
  },
  revelacion: {
    criatura: 'ojo',
    lado: 'izq',
    objetos: [
      { tipo: 'estrella', color: 'a3', tam: 64, pc: { x: -14, y: 20 }, movil: { x: 0, y: 6 }, parallax: 0.5 },
      { tipo: 'estrella', color: 'a4', tam: 34, pc: { x: 102, y: 4 }, movil: { x: 88, y: -6 }, parallax: 0.8 },
      { tipo: 'estela', color: 'line', tam: 280, pc: { x: -58, y: 60, giro: -14 } },
      { tipo: 'circulo', color: 'a3', tam: 24, pc: { x: 96, y: 62 }, movil: { x: 92, y: 60 }, parallax: 0.3 },
      { tipo: 'flecha', color: 'line', tam: 84, pc: { x: -18, y: -10, giro: 160 } },
      { tipo: 'circulo', color: 'a4', tam: 16, pc: { x: 40, y: -14 }, parallax: 1 },
    ],
  },
  evidencia: {
    criatura: 'pila',
    lado: 'der',
    objetos: [
      { tipo: 'nota', color: 'a3', tam: 48, pc: { x: 100, y: 0 }, movil: { x: 84, y: -8 }, parallax: 0.6 },
      { tipo: 'circulo', color: 'a4', tam: 36, pc: { x: -8, y: 8 }, movil: { x: 0, y: 2 }, parallax: 0.4 },
      { tipo: 'estela', color: 'line', tam: 300, pc: { x: 70, y: 70, giro: 10 }, movil: { x: 34, y: 86, giro: 6 } },
      { tipo: 'estrella', color: 'a3', tam: 28, pc: { x: 36, y: -12 }, parallax: 0.9 },
    ],
  },
  'que-hacer': {
    criatura: 'saltarin',
    lado: 'izq',
    objetos: [
      { tipo: 'estrella', color: 'a3', tam: 46, pc: { x: -6, y: 6 }, movil: { x: 2, y: -2 }, parallax: 0.7 },
      { tipo: 'flecha', color: 'line', tam: 96, pc: { x: 96, y: -12, giro: -20 }, movil: { x: 74, y: -14, giro: -20 } },
      { tipo: 'circulo', color: 'a4', tam: 30, pc: { x: 104, y: 50 }, movil: { x: 90, y: 54 }, parallax: 0.4 },
      { tipo: 'estela', color: 'line', tam: 260, pc: { x: -60, y: 72, giro: -6 } },
      { tipo: 'circulo', color: 'a3', tam: 18, pc: { x: 50, y: -16 }, parallax: 1 },
    ],
  },
};

// ----------------------------------------------------------
// Camino de los pilares (Inicio y /pilares): una parada por pilar.
// Cada criatura representa el mecanismo del pilar.
// ----------------------------------------------------------
export const pilares: Record<Pilar, ComposicionEscena> = {
  confianza: {
    criatura: 'sello',
    lado: 'der',
    objetos: [
      { tipo: 'estrella', color: 'a3', tam: 52, pc: { x: -8, y: 2 }, movil: { x: 2, y: -6 }, parallax: 0.7 },
      { tipo: 'circulo', color: 'a4', tam: 38, pc: { x: 102, y: 20 }, movil: { x: 88, y: 4 }, parallax: 0.4 },
      { tipo: 'estela', color: 'line', tam: 300, pc: { x: -62, y: 70, giro: -8 } },
      { tipo: 'flecha', color: 'line', tam: 88, pc: { x: 90, y: -14, giro: 10 }, movil: { x: 70, y: -16, giro: 10 } },
      { tipo: 'circulo', color: 'a3', tam: 18, pc: { x: 34, y: -12 }, parallax: 1 },
    ],
  },
  persuasion: {
    criatura: 'empujon',
    lado: 'izq',
    objetos: [
      { tipo: 'flecha', color: 'line', tam: 96, pc: { x: 96, y: 6, giro: 0 }, movil: { x: 74, y: -10, giro: 0 } },
      { tipo: 'circulo', color: 'a4', tam: 44, pc: { x: -10, y: 8 }, movil: { x: 2, y: -2 }, parallax: 0.5 },
      { tipo: 'estela', color: 'line', tam: 320, pc: { x: 60, y: 74, giro: 6 }, movil: { x: 30, y: 86, giro: 4 } },
      { tipo: 'estrella', color: 'a3', tam: 30, pc: { x: 26, y: -10 }, parallax: 0.9 },
      { tipo: 'circulo', color: 'a3', tam: 18, pc: { x: 86, y: -8 }, parallax: 1 },
    ],
  },
  comprension: {
    criatura: 'pila',
    lado: 'der',
    objetos: [
      { tipo: 'nota', color: 'a3', tam: 48, pc: { x: -10, y: 4 }, movil: { x: 2, y: -6 }, parallax: 0.6 },
      { tipo: 'circulo', color: 'a4', tam: 34, pc: { x: 102, y: 10 }, movil: { x: 90, y: 0 }, parallax: 0.4 },
      { tipo: 'estela', color: 'line', tam: 280, pc: { x: -58, y: 66, giro: -12 }, movil: { x: 10, y: 88, giro: -4 } },
      { tipo: 'estrella', color: 'a3', tam: 28, pc: { x: 40, y: -14 }, parallax: 0.9 },
    ],
  },
  atencion: {
    criatura: 'ojo',
    lado: 'izq',
    objetos: [
      { tipo: 'estrella', color: 'a3', tam: 62, pc: { x: 100, y: 18 }, movil: { x: 86, y: 4 }, parallax: 0.5 },
      { tipo: 'estrella', color: 'a4', tam: 32, pc: { x: -12, y: 4 }, movil: { x: 0, y: -6 }, parallax: 0.8 },
      { tipo: 'estela', color: 'line', tam: 300, pc: { x: 64, y: 70, giro: 10 } },
      { tipo: 'circulo', color: 'a3', tam: 22, pc: { x: -6, y: 62 }, movil: { x: 4, y: 64 }, parallax: 0.3 },
      { tipo: 'flecha', color: 'line', tam: 84, pc: { x: 94, y: -12, giro: 160 } },
    ],
  },
  'identidad-digital': {
    criatura: 'doble',
    lado: 'der',
    objetos: [
      { tipo: 'circulo', color: 'a4', tam: 42, pc: { x: -8, y: 10 }, movil: { x: 2, y: -4 }, parallax: 0.6 },
      { tipo: 'estrella', color: 'a3', tam: 40, pc: { x: 100, y: -6 }, movil: { x: 86, y: -8 }, parallax: 0.7 },
      { tipo: 'estela', color: 'line', tam: 300, pc: { x: -60, y: 72, giro: -6 }, movil: { x: 20, y: 88, giro: -4 } },
      { tipo: 'nota', color: 'a4', tam: 34, pc: { x: 40, y: -14 }, parallax: 0.9 },
    ],
  },
};

/** Todas las paradas posibles: escenas de artículo y pilares. */
export const paradas: Record<Escena | Pilar, ComposicionEscena> = { ...escenas, ...pilares };

/** Si la criatura de una escena es la misma del pilar, se usa esta otra. */
export const alternativa: Record<NombreCriatura, NombreCriatura> = {
  sello: 'empujon', empujon: 'pila', pila: 'sello', ojo: 'doble', doble: 'ojo', pregunta: 'saltarin', saltarin: 'pregunta',
};
