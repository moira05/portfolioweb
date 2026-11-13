import type { GridKey } from "./pixelGrids";

export interface IconPhrase {
  key: GridKey;
  label: string;   // accessible name
  phrase: string;  // bubble text
}

export const ICON_PHRASES: IconPhrase[] = [
  { key: "robot",     label: "Robot",               phrase: "¡Hola! Que tengas un lindo día" },
  { key: "jerarquia", label: "Árbol de jerarquía",  phrase: "Todo se ordena, de a un paso" },
  { key: "conejo",    label: "Conejo en galera",    phrase: "Hoy puede pasar algo lindo" },
  { key: "estrella",  label: "Estrella",            phrase: "Hoy brillás vos" },
  { key: "helado",    label: "Helado con cara",     phrase: "Te merecés un heladito" },
  { key: "meta",      label: "Montaña con bandera", phrase: "Un paso más y llegás" },
];
