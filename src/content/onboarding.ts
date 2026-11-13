import type { CaseStudy } from "@/types/case";

const onboarding: CaseStudy = {
  slug: "onboarding",
  navTitle: "BIMS",
  title: "Rediseño del onboarding de",
  titleEm: "BIMS",
  lede: "Un alta de 6 pasos y mucho acompañamiento de implementación se rediseñó como un flujo autogestionado de 3 pasos, iterado con entrevistas y test de usabilidad con clientes reales.",
  meta: [
    { label: "Rol",      value: "Product Designer" },
    { label: "Industria", value: "ERP para MiPyMEs, Paraguay" },
    { label: "Período",  value: "2026" },
    { label: "Equipos",  value: "Diseño, Producto, Implementación y Soporte" },
    { label: "Alcance",  value: "Landing, registro, alta de empresa y primeros pasos" },
  ],
  sections: [
    {
      heading: "Entrevistas",
      headingAccent: "exploratorias.",
      eyebrow: "Discovery",
      blocks: [
        {
          type: "discovery",
          countInterviews: 9,
          countCompanies: 7,
          caption: "Muestra cualitativa: no es generalizable, muestra patrones.",
          quote: "Tenía un Ferrari, pero lo usaba como un escarabajo.",
          findings: [
            "La confianza en el sistema es baja en la operación diaria",
            "Dependencia de procesos manuales: Excel, WhatsApp y controles a mano",
            "Falta de acompañamiento en la configuración inicial: sin hoja de ruta ni guía paso a paso",
            "El riesgo del error recae sobre el usuario, no sobre el sistema",
            "La experiencia con soporte influye en la percepción del sistema",
          ],
          takeaway: "El desafío principal está en el onboarding y la usabilidad, no en la propuesta de valor.",
        },
      ],
    },
    {
      heading: "Onboarding con foco en",
      headingAccent: "la autogestión.",
      eyebrow: "Brief",
      blocks: [
        {
          type: "brief-context",
          contextParagraph: "BIMS es un ERP para MiPyMEs. El onboarding actual demanda mucha intervención del equipo de implementación y soporte: eleva los costos y limita la capacidad de escalar.",
          numbersBullets: [
            "87% de drop-off en el proceso de alta",
            "La mayoría no completa los 30 días de prueba",
            "~6 semanas de implementación y ~21 hs de reuniones por implementador por cliente",
          ],
          tension: "La tensión: el ERP promete orden y eficiencia, pero un usuario multitarea y poco digitalizado puede no sentir el dolor lo suficiente como para atravesar un onboarding complejo y autogestionado.",
          hypothesisIntro: "Si guiamos el alta y la configuración inicial de forma progresiva, vamos a:",
          hypothesisBullets: [
            "Reducir el abandono",
            "Bajar la dependencia del acompañamiento de implementación",
            "Acercar el despliegue de 6 semanas a 24 hs",
          ],
        },
      ],
    },
    {
      heading: "Qué se testeó y",
      headingAccent: "qué encontramos.",
      eyebrow: "Test de usabilidad",
      blocks: [
        {
          type: "usability-test",
          descriptionParagraphs: [
            "Test cualitativo moderado de la landing y del onboarding (registro, RUC, plan y primeros pasos con timbrado por OCR) sobre prototipo, en mayo 2026.",
            "Se hicieron 2 sesiones con clientes actuales de BIMS:",
          ],
          participants: [
            { role: "Dueño de 4 foodtrucks", detail: "Plan básico, venía de no usar ningún sistema." },
            { role: "Gerente de una sala de realidad virtual", detail: "9 años de experiencia en BIMS." },
          ],
          results: [
            { tag: "g", label: "Funcionó", text: "El flujo de crear cuenta, la verificación de mail, la pantalla de cuenta fondo, el checklist final de primeros pasos y la oferta de 30 días gratis." },
            { tag: "r", label: "Fricción", text: "Pedir el timbrado antes de generar confianza (“no te conozco, es una demo”), el RUC sin contexto, la cantidad de pasos y la pregunta “¿tenés sistema?” que aparece tarde." },
            { tag: "y", label: "Landing", text: "Se percibía orientada solo a gastronomía y pedía más foco en el problema-solución, con video." },
          ],
        },
      ],
    },
    {
      heading: "Iteramos según resultados del",
      headingAccent: "test de usabilidad.",
      eyebrow: "Ideation",
      blocks: [
        {
          type: "versions",
          versions: [
            {
              n: "01/",
              title: "Primera versión",
              sub: "6 pasos antes de ingresar a BIMS",
              src: "/onboarding/antes.png",
              alt: "Primera versión: paso 2 de 6, ingreso del RUC",
              width: 2578,
              height: 1449,
            },
            {
              n: "02/",
              title: "Iteración",
              sub: "3 pasos para ingresar a BIMS",
              src: "/onboarding/despues.png",
              alt: "Iteración: paso 2 de 3, RUC con ayuda y empresa encontrada",
              width: 1640,
              height: 923,
            },
          ],
        },
      ],
    },
    {
      heading: "Principios para un onboarding que se pueda",
      headingAccent: "autogestionar.",
      eyebrow: "Decisiones de diseño",
      blocks: [
        {
          type: "design-principles",
          lead: "A partir de las entrevistas, creemos que hay ciertos principios que podemos seguir para incrementar la efectividad del onboarding.",
          rule: "Ningún dato se pide si no es necesario para la primera transacción real.",
          principles: [
            { title: "Valor antes que compromiso", text: "Tiempo del trial visible desde el inicio y un copy que no suene a contrato." },
            { title: "Una pantalla, una tarea", text: "Cada paso resuelve una sola tarea y cada campo tiene una razón funcional." },
            { title: "Checklist, no wizard", text: "El usuario empieza por lo que le resulta familiar, sin un orden forzado." },
            { title: "Mínimo viable de configuración", text: "Solo lo que habilita la primera operación de valor." },
          ],
        },
      ],
    },
    {
      heading: "Del primer clic al",
      headingAccent: "primer día de uso.",
      eyebrow: "El flujo",
      blocks: [
        {
          type: "carousel",
          slides: [
            { src: "/onboarding/landing.webp",          alt: "Landing",           width: 1025, height: 577,  title: "Landing",           description: "Entrada al flujo: la promesa y el botón para empezar gratis." },
            { src: "/onboarding/registro.webp",         alt: "Registro",          width: 1600, height: 1226, title: "Registro",           description: "Crear la cuenta y probar 30 días gratis." },
            { src: "/onboarding/verificar-correo.webp", alt: "Verificar correo",  width: 1600, height: 900,  title: "Verificar correo",   description: "Pantalla de espera con reenvío y opción de corregir el correo." },
            { src: "/onboarding/email-bienvenida.webp", alt: "Email bienvenida",  width: 651,  height: 1146, title: "Email de bienvenida", description: "Un solo llamado a la acción y qué se puede hacer con la cuenta activa." },
            { src: "/onboarding/paso-1.webp",           alt: "Paso 1 de 3",       width: 1600, height: 900,  title: "Paso 1 de 3",        description: "Cómo administra hoy su empresa, para personalizar el plan." },
            { src: "/onboarding/paso-2.webp",           alt: "Paso 2 de 3",       width: 1600, height: 900,  title: "Paso 2 de 3",        description: "Validación de la empresa con el RUC, con ayuda para encontrarlo." },
            { src: "/onboarding/paso-3.webp",           alt: "Paso 3 de 3",       width: 1366, height: 839,  title: "Paso 3 de 3",        description: "Rubro, módulos de interés y facturación electrónica." },
            { src: "/onboarding/plan.webp",             alt: "Plan elegido",      width: 1366, height: 989,  title: "Plan elegido",       description: "Qué incluye el plan y aviso de que no hay cargos durante la prueba." },
            { src: "/onboarding/inicio.webp",           alt: "Inicio",            width: 1600, height: 900,  title: "Inicio",             description: "Lista de configuraciones pendientes para empezar a vender." },
          ],
        },
      ],
    },
    {
      heading: "Criterio de",
      headingAccent: "éxito.",
      eyebrow: "Criterio de éxito",
      blocks: [
        {
          type: "metrics-grid",
          main: {
            label: "Métrica principal",
            title: "Reducir el abandono en el proceso de alta",
            goals: [
              { label: "Punto de partida", value: "87%" },
              { label: "Meta en los primeros 3 meses", value: "< 50%" },
            ],
          },
          metrics: [
            {
              label: "1 · Autogestión",
              title: "Altas completadas sin acompañamiento",
              goals: [{ label: "Meta", value: "7 de 10" }],
              note: "Clientes que completan el alta sin ayuda de implementación. Muestra si el flujo logra autogestión.",
            },
            {
              label: "2 · Costo de implementación",
              title: "Horas de implementación por cliente",
              goals: [
                { label: "Hoy", value: "~21 hs" },
                { label: "Meta", value: "0 hs" },
              ],
              note: "Eliminar las reuniones y bajar el despliegue de 6 semanas a 24 hs.",
            },
            {
              label: "3 · Tiempo a valor",
              title: "Tiempo hasta la primera factura",
              goals: [{ label: "Meta", value: "2 días desde el alta" }],
              fullWidth: true,
            },
          ],
          measure: {
            title: "Qué se dejó para medir",
            text: "Al momento del diseño no había tagueo ni baseline en el onboarding. Lo que dejé definido para medir desde el día 1: abandono y tiempo por cada paso, si el alta tuvo acompañamiento o no, fecha de alta y fecha de la primera factura.",
          },
        },
      ],
    },
  ],
  note: "Por confidencialidad, se omitieron datos de clientes y usuarios. Las imágenes mostradas corresponden al prototipo.",
};

export default onboarding;
