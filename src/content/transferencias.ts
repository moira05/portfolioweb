import type { CaseStudy } from "@/types/case";

const transferencias: CaseStudy = {
  slug: "transferencias",
  navTitle: "Transferencias",
  title: "Feedback inmediato en transferencias a",
  titleEm: "otras entidades",
  lede: "Pasamos de más de un minuto de incertidumbre a una confirmación en segundos, sin perder la certeza de qué pasó con el dinero.",
  meta: [
    { label: "Rol",         value: "Product Designer" },
    { label: "Industria",   value: "Fintech, Argentina" },
    { label: "Período",     value: "2022 – 2023" },
    { label: "Plataformas", value: "iOS y Android" },
    { label: "Equipo",      value: "Producto, Diseño, Desarrollo (front y back), QA y Compliance" },
  ],
  sections: [
    {
      heading: "El problema",
      blocks: [
        { type: "paragraph", text: "Cuando una persona transfería a una cuenta de otro banco, tardaba más de un minuto en saber si la operación había salido bien o había sido rechazada. Esa incertidumbre era uno de los principales motivos de contacto al equipo de atención al cliente." },
        { type: "paragraph", text: "El problema aparecía solo en transferencias interbancarias. Entre usuarios de la misma app el flujo ya funcionaba bien." },
        {
          type: "flow",
          before: {
            title: "Antes",
            subtitle: "Más de 1 minuto",
            items: [
              'Pantalla de espera con el mensaje “Danos un minuto”',
              'Confirmación que aclara que “puede demorar unos minutos”',
              "Sin certeza sobre si salió bien o mal",
            ],
          },
          after: {
            title: "Después",
            subtitle: "4 a 7 segundos",
            items: [
              { text: "Pantalla de éxito con monto, destinatario y banco", type: "step" },
              { text: "Compartir comprobante", type: "drop" },
              { text: "Push y mail con el resultado final de la operación", type: "step" },
            ],
          },
        },
      ],
    },
    {
      heading: "Diagnóstico",
      blocks: [
        { type: "paragraph", text: "Arrancamos con un kick-off del equipo, un benchmark y una revisión de los reclamos que llegaban a atención al cliente." },
        {
          type: "facts",
          rows: [
            { label: "Transferencias entre usuarios de la app", value: "5 a 10 segundos" },
            { label: "Transferencias a otras entidades",         value: "30 segundos a más de 1 minuto" },
            { label: "Apps de la competencia",                   value: "2 a 4 segundos" },
          ],
        },
        { type: "paragraph", text: "Ni siquiera en el mejor escenario llegábamos al tiempo de la competencia. Además, el benchmark de 8 apps nos mostró qué ofrecía cada una en cada paso (comprobante compartible, avisos por mail o push, buscador de contactos) y cuánto esfuerzo pedía cada flujo en taps, scrolls y expansiones." },
        {
          type: "benchmark",
          cols: ["Brubank", "Naranja X", "Mercado Pago", "BBVA", "Modo", "Santander", "Galicia", "Nuestra app"],
          highlightCol: 7,
          rows: [
            { label: "Pregunta de satisfacción al final",   values: ["n","n","n","y","n","n","n","n"], total: "1/8" },
            { label: "Escanear CBU desde una imagen",       values: ["y","n","n","n","n","n","n","n"], total: "1/8" },
            { label: "Agendar contacto al transferir",      values: ["y","n","n","y","n","n","n","n"], total: "2/8" },
            { label: "Asignar apodo",                       values: ["y","y","n","n","n","n","n","n"], total: "2/8" },
            { label: "Buscador de contactos",               values: ["y","y","y","y","n","n","n","y"], total: "5/8" },
            { label: "Compartir comprobante al finalizar",  values: ["y","y","y","y","y","y","y","n"], total: "7/8" },
            { label: "Volver a transferir",                 values: ["y","n","n","y","y","n","n","y"], total: "4/8" },
            { label: "Mail por éxito o error",              values: ["n","y","y","n","n","y","n","n"], total: "3/8" },
            { label: "Push con el resultado",               values: ["n","y","n","n","n","n","n","n"], total: "1/8" },
          ],
        },
        { type: "paragraph", text: "Nuestra app no ofrecía comprobante compartible ni avisos por push o mail sobre el resultado, justo lo que la propuesta sumó." },
        { type: "paragraph", text: "Un límite importante: no conocíamos todos los errores que podían ocurrir en una transferencia. Desarrollo trabajó en paralelo en identificarlos y tipificarlos, y diseñamos teniendo en cuenta esas limitaciones técnicas." },
      ],
    },
    {
      heading: "La propuesta",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Mostrar éxito en todas las transferencias",  text: "En lugar de esperar a que la operación se complete en todas las instancias (suele tardar minutos, pero puede demorar hasta 24 o 48 horas), mostramos la pantalla de éxito enseguida." },
            { title: "Avisar el resultado real después",           text: "En una segunda etapa, cuando la red interbancaria aprueba o rechaza la operación, le avisamos al usuario por push y por mail." },
            { title: "Cubrir el caso de error",                    text: "Menos del 2% de las operaciones falla. Esas personas ven la pantalla de éxito y luego reciben un aviso claro: no pudimos completar la transferencia, el dinero volvió a su cuenta y pueden intentarlo de nuevo." },
            { title: "Avisar cuando el sistema bancario falla",    text: "Diseñamos un mensaje preventivo (circuit breaker) para el inicio de la transferencia y el centro de ayuda, que avisa cuando hay inconvenientes con el sistema bancario y la operación puede demorar más." },
          ],
        },
      ],
    },
    {
      heading: "Decisiones de diseño",
      blocks: [
        {
          type: "list",
          items: [
            "Loading: pasó de una pantalla a pantalla completa con \"Danos un minuto\" a un mensaje más directo: \"Estamos enviando tu transferencia\", con la promesa de una notificación cuando esté lista.",
            "Feedback: pasó de un mensaje genérico a un resumen completo de la operación, con el comprobante a un toque.",
            "Notificaciones: definimos push y mail para éxito y para error, con el mismo criterio de claridad, y un recordatorio de seguridad al pie del mail.",
          ],
        },
        { type: "blockquote", text: "Mostrar éxito antes de la confirmación final fue una decisión consciente: aceptamos un caso minoritario de error a cambio de eliminar la incertidumbre para la gran mayoría." },
      ],
    },
    {
      heading: "Resultados",
      blocks: [
        {
          type: "facts",
          rows: [
            { label: "Tiempo mediano de feedback",                       value: "De casi 30 s a 6 s" },
            { label: "Espera en la pantalla de feedback",                value: "De más de 1 min a 4–7 s" },
            { label: "Conversión en transferencias a otras entidades",   value: "De ~60% a ~85%" },
          ],
        },
        { type: "paragraph", text: "Para saber si lo lográbamos, definimos desde el inicio qué medir: tickets en atención al cliente, cantidad de errores, posibilidad de recuperarse del error y tiempo de demora." },
        { type: "paragraph", text: "Como próximo paso, actualizamos la UI con el nuevo Design System." },
      ],
    },
    {
      heading: "Qué me llevo",
      blocks: [
        {
          type: "list",
          items: [
            "A veces el problema no es la velocidad real, sino cuánto tarda el usuario en saber qué pasó.",
            "Compararse con la competencia ayuda a fijar una meta concreta y medible.",
            "Diseñar el caso de error con el mismo cuidado que el caso feliz es lo que hace sostenible una decisión como esta.",
          ],
        },
      ],
    },
  ],
  note: "Por confidencialidad, se omitieron el nombre de la empresa, datos de usuarios, montos y capturas reales de pantalla.",
};

export default transferencias;
