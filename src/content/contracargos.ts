import type { CaseStudy } from "@/types/case";

const contracargos: CaseStudy = {
  slug: "contracargos",
  navTitle: "Contracargos",
  title: "Rediseño de la defensa de",
  titleEm: "contracargos",
  lede: "Un proceso manual de tres pasos pasó a ser una carga de comprobante dentro de la propia plataforma, validada con merchants reales y con equipos de seis áreas.",
  meta: [
    { label: "Rol",       value: "Product Designer" },
    { label: "Industria", value: "E-commerce y pagos, LATAM" },
    { label: "Período",   value: "Julio – septiembre 2025" },
    { label: "Equipos",   value: "Diseño, Producto, Desarrollo, Riesgo, Operaciones, Marketing y Soporte" },
    { label: "Alcance",   value: "Funcionalidad cross-país (Argentina, México y Brasil)" },
  ],
  sections: [
    {
      heading: "Contexto",
      blocks: [
        { type: "paragraph", text: "Cuando un cliente desconoce una compra, el merchant tiene que defenderse presentando documentación. Hoy ese proceso es manual: depende de que el merchant adjunte los comprobantes y de que el equipo de riesgo los cargue en un backend externo." },
        { type: "paragraph", text: "Lo más llamativo: le pedíamos al merchant información que ya teníamos en nuestro administrador, como capturas de pantalla de la orden." },
        {
          type: "flow",
          before: {
            title: "Antes",
            subtitle: "3 pasos fuera de la plataforma",
            items: [
              "Completar un formulario externo",
              "Sacar una captura de la venta desde el administrador de la tienda",
              "Unir todo en un solo PDF con un peso específico",
            ],
          },
          after: {
            title: "Después",
            subtitle: "1 paso, dentro del flujo",
            items: [
              { text: "El aviso de contracargo muestra motivo y fecha límite", type: "step" },
              { text: "Cargar comprobante (PDF, JPG o PNG)", type: "drop" },
              { text: "Los datos de la venta ya los tiene la plataforma", type: "step" },
            ],
          },
        },
        { type: "paragraph", text: "El problema pega más en los merchants grandes, que pueden enfrentar hasta 8 contracargos por semana. En las entrevistas lo señalaron como una de sus principales preocupaciones." },
      ],
    },
    {
      heading: "Hipótesis",
      blocks: [
        { type: "paragraph", text: "Si mejoramos la carga de documentación, vamos a:" },
        {
          type: "list",
          items: [
            "reducir el tiempo de resolución de contracargos,",
            "bajar la carga operativa del equipo de riesgo,",
            "aumentar la tasa de defensa exitosa.",
          ],
        },
      ],
    },
    {
      heading: "Proceso de diseño en equipo",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Wireframe", text: "Con Desarrollo y Producto validamos el alcance y las preguntas abiertas antes de diseñar en alta fidelidad." },
            { title: "Design critique V1", text: "Al ser una funcionalidad cross-país, la validamos con los Product Designers de México y Brasil." },
            { title: "Test de usabilidad no moderado", text: "Lo armamos en Maze y lo compartimos con merchants activos que ya habían tenido contracargos." },
            { title: "Design critique V2", text: "Iteramos y debatimos la versión final con Diseño, Operaciones, Riesgo, Marketing, Soporte y Producto. Exploramos varias opciones de ubicación para la acción principal antes de decidir." },
          ],
        },
      ],
    },
    {
      heading: "Lo que nos dijo el test",
      blocks: [
        { type: "paragraph", text: "El escenario: \"Sos parte del equipo administrativo y estás gestionando tus cobros. Recibiste una alerta de contracargo y querés resolverlo cuanto antes. ¿Cómo lo harías?\". Después sumamos preguntas abiertas sobre qué información les hubiera dado más seguridad al cargar el comprobante." },
        {
          type: "facts",
          rows: [
            { label: "Respuestas",                        value: "Casi 200" },
            { label: "Completaron la tarea correctamente", value: "Cerca de 4 de cada 10" },
            { label: "Duración promedio",                  value: "Menos de 1 minuto" },
          ],
        },
        { type: "paragraph", text: "Con esa tasa de éxito, el test dejó claro que la acción principal no era lo bastante visible ni el paso a seguir lo bastante claro. Esa fue la base para rediseñar la pantalla y comparar opciones en la segunda ronda de critique." },
      ],
    },
    {
      heading: "La versión final",
      blocks: [
        {
          type: "list",
          items: [
            "El aviso de contracargo muestra el motivo y la fecha de vencimiento, con el botón para cargar el comprobante a la vista.",
            "Los datos del cliente y de la venta aparecen en la misma pantalla, sin pedirlos de nuevo.",
            "Se acepta PDF, JPG o PNG, así que ya no hay que armar un PDF único.",
            "Las condiciones de carga (formatos y peso máximo) se explican antes de subir el archivo.",
            "Un enlace a información sobre contracargos queda a mano para resolver dudas sin salir del flujo.",
          ],
        },
      ],
    },
    {
      heading: "Cómo medimos el éxito",
      blocks: [
        { type: "paragraph", text: "La métrica principal es disminuir los contactos a soporte por contracargos." },
        {
          type: "goals",
          items: [
            { n: "−30 %", title: "Consultas por estado y contracargos pendientes", text: "Comparado con el mes anterior al lanzamiento. Si el flujo da más feedback en tiempo real, baja la incertidumbre sobre si el proceso avanza." },
            { n: "−25 %", title: "Consultas de información general",               text: "En el primer mes posterior al lanzamiento. Indican que el merchant no entiende el proceso, y la propuesta debería resolverlo." },
          ],
        },
      ],
    },
    {
      heading: "Cómo usé IA en el proceso",
      blocks: [
        { type: "paragraph", text: "Armé asistentes propios para acompañar cada etapa y llegar a las reuniones con más claridad." },
        {
          type: "tools",
          items: [
            { title: "Product Coach",         text: "Para arrancar: me ayudó a reflexionar sobre el brief antes de actuar." },
            { title: "Data Sensei",           text: "Para conversar los resultados del test y transformarlos en hallazgos accionables." },
            { title: "UX Writing Assistant", text: "Para iterar el contenido de todas las pantallas." },
            { title: "Prototipado en baja",  text: "Prototipos con Lovable o v0 para generar alineación temprana con el equipo y desarrollo." },
          ],
        },
      ],
    },
    {
      heading: "Qué me llevo",
      blocks: [
        {
          type: "list",
          items: [
            "Antes de pedirle algo al usuario, conviene revisar si ya lo tenemos.",
            "Testear con quienes ya vivieron el problema da evidencia que ninguna opinión interna reemplaza.",
            "Involucrar a Riesgo, Operaciones y Soporte desde la crítica evita sorpresas después del lanzamiento.",
          ],
        },
      ],
    },
  ],
  note: "Por confidencialidad, se omitieron nombres de la empresa y del producto, datos de clientes, montos y capturas reales de pantalla.",
};

export default contracargos;
