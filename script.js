function showForm() {
  const type = document.getElementById("promptType").value;
  const form = document.getElementById("formulario");
  const output = document.getElementById("resultado");
  output.textContent = "";

  const forms = {
    texto: `
      <label>Especialidad o rol experto:</label>
      <input type="text" id="rol" placeholder="Ej: Médico especialista en Pediatría">
      <label>Tarea específica:</label>
      <input type="text" id="tarea" placeholder="Ej: redactar resumen clínico...">
      <label>Contexto o audiencia:</label>
      <input type="text" id="contexto" placeholder="Ej: para estudiantes de medicina">
      <label>Estilo o tono deseado:</label>
      <input type="text" id="tono" placeholder="Ej: académico, claro, formal">
      <label>Formato de salida:</label>
      <input type="text" id="formato" placeholder="Ej: lista con 3 puntos clave">
      <button onclick="generarTexto()">Generar Prompt</button>
    `,
    datos: `
      <label>Rol analítico de la IA:</label>
      <input type="text" id="rol">
      <label>Descripción del conjunto de datos:</label>
      <textarea id="datos"></textarea>
      <label>Tareas de análisis:</label>
      <input type="text" id="tareas">
      <label>Formato de resultados:</label>
      <input type="text" id="formato">
      <button onclick="generarDatos()">Generar Prompt</button>
    `,
    clinico: `
      <label>Rol del profesional:</label>
      <input type="text" id="rol">
      <label>Datos del caso clínico:</label>
      <textarea id="caso"></textarea>
      <label>Tarea clínica solicitada:</label>
      <input type="text" id="tarea">
      <label>Formato de respuesta:</label>
      <input type="text" id="formato">
      <button onclick="generarClinico()">Generar Prompt</button>
    `,
    asistente: `
      <label>Nombre y misión del asistente:</label>
      <input type="text" id="nombre">
      <label>Público objetivo:</label>
      <input type="text" id="publico">
      <label>Personalidad y tono:</label>
      <input type="text" id="tono">
      <label>Reglas de comportamiento:</label>
      <textarea id="reglas"></textarea>
      <button onclick="generarAsistente()">Generar Prompt</button>
    `
  };

  form.innerHTML = forms[type] || "";
}

// Funciones generadoras
function generarTexto() {
  const rol = document.getElementById("rol").value;
  const tarea = document.getElementById("tarea").value;
  const contexto = document.getElementById("contexto").value;
  const tono = document.getElementById("tono").value;
  const formato = document.getElementById("formato").value;
  document.getElementById("resultado").textContent =
    `Eres ${rol}. Tu tarea es ${tarea}. Contexto: ${contexto}. Estilo: ${tono}. Formato: ${formato}.`;
}

function generarDatos() {
  const rol = document.getElementById("rol").value;
  const datos = document.getElementById("datos").value;
  const tareas = document.getElementById("tareas").value;
  const formato = document.getElementById("formato").value;
  document.getElementById("resultado").textContent =
    `${rol}. Base de datos: ${datos}. Tareas: ${tareas}. Formato: ${formato}.`;
}

function generarClinico() {
  const rol = document.getElementById("rol").value;
  const caso = document.getElementById("caso").value;
  const tarea = document.getElementById("tarea").value;
  const formato = document.getElementById("formato").value;
  document.getElementById("resultado").textContent =
    `Actúa como ${rol}. Caso: ${caso}. Tarea: ${tarea}. Formato: ${formato}.`;
}

function generarAsistente() {
  const nombre = document.getElementById("nombre").value;
  const publico = document.getElementById("publico").value;
  const tono = document.getElementById("tono").value;
  const reglas = document.getElementById("reglas").value;
  document.getElementById("resultado").textContent =
    `Eres ${nombre}. Público objetivo: ${publico}. Tono: ${tono}. Comportamiento esperado: ${reglas}.`;
}

function copiarPrompt() {
  const prompt = document.getElementById("resultado").textContent;
  if (!prompt) return;
  navigator.clipboard.writeText(prompt)
    .then(() => alert("✅ Prompt copiado al portapapeles"))
    .catch(() => alert("❌ Error al copiar el prompt"));
}

function sugerirModelo(tipo) {
  const sugerencia = {
    texto: "💡 Modelo sugerido: GPT-4 o GPT-4o, ideal para generación de textos con contexto y estilo.",
    datos: "💡 Modelo sugerido: GPT-4 (para análisis avanzado) o GPT-3.5-turbo para estadísticas básicas.",
    clinico: "💡 Modelo sugerido: GPT-4, con indicaciones clínicas explícitas (usa rol médico especializado).",
    asistente: "💡 Modelo sugerido: GPT-4 o GPT-4o, con memoria activada para mantener coherencia conversacional."
  };
  document.getElementById("sugerenciaIA").textContent = sugerencia[tipo] || "";
}

function showForm() {
  const type = document.getElementById("promptType").value;
  const form = document.getElementById("formulario");
  const output = document.getElementById("resultado");
  const sugerencia = document.getElementById("sugerenciaIA");
  output.textContent = "";
  sugerencia.textContent = "";

  const forms = {
    texto: `
      <label>Especialidad o rol experto:</label>
      <input type="text" id="rol" placeholder="Ej: Médico especialista en Infectología">
      <label>Tarea específica:</label>
      <input type="text" id="tarea" placeholder="Ej: elaborar un resumen de la fisiopatología de la sepsis...">
      <label>Contexto o audiencia:</label>
      <input type="text" id="contexto" placeholder="Ej: para médicos en formación de postgrado">
      <label>Estilo o tono deseado:</label>
      <input type="text" id="tono" placeholder="Ej: tono narrativo técnico, voz neutral">
      <label>Formato de salida:</label>
      <input type="text" id="formato" placeholder="Ej: 2 párrafos de máximo 150 palabras">
      <button onclick="generarTexto()">Generar Prompt</button>
    `,
    datos: `
      <label>Rol analítico de la IA (Ej: Actúa como epidemiólogo experto):</label>
      <input type="text" id="rol">
      <label>Descripción del conjunto de datos (variables, cantidad, grupo poblacional, etc.):</label>
      <textarea id="datos"></textarea>
      <label>Tareas de análisis (Ej: calcular estadísticas, buscar correlaciones):</label>
      <input type="text" id="tareas">
      <label>Formato de resultados esperados (Ej: lista de insights, tabla, resumen por secciones):</label>
      <input type="text" id="formato">
      <button onclick="generarDatos()">Generar Prompt</button>
    `,
    clinico: `
      <label>Rol clínico de la IA (Ej: Eres internista, cardiólogo, pediatra...):</label>
      <input type="text" id="rol">
      <label>Información clínica completa (edad, sexo, síntomas, antecedentes, hallazgos):</label>
      <textarea id="caso"></textarea>
      <label>Qué esperas que haga la IA (Ej: elaborar diagnóstico diferencial, plan de manejo):</label>
      <input type="text" id="tarea">
      <label>Cómo debe responder (Ej: lista priorizada de diagnósticos, tabla, pasos):</label>
      <input type="text" id="formato">
      <button onclick="generarClinico()">Generar Prompt</button>
    `,
    asistente: `
      <label>Define quién es el asistente y qué debe hacer (Ej: Eres PromptDoc, ayudas a estructurar prompts en salud pública):</label>
      <input type="text" id="nombre">
      <label>¿A quién atenderá? (Ej: Médicos generales, estudiantes, especialistas):</label>
      <input type="text" id="publico">
      <label>¿Cómo debe comportarse? (Ej: Empático, técnico, formal, cercano):</label>
      <input type="text" id="tono">
      <label>¿Cómo debe saludar, responder, cerrar? ¿Qué no debe hacer? (Ej: No da consejos médicos reales, siempre ofrece ayuda adicional):</label>
      <textarea id="reglas"></textarea>
      <button onclick="generarAsistente()">Generar Prompt</button>
    `
  };

  form.innerHTML = forms[type] || "";
  sugerirModelo(type);
}

function mostrarEjemplo(tipo) {
  const ejemplos = {
    texto: `📋 Ejemplo:
Eres un médico especialista en Infectología. Tu tarea es resumir las evidencias existentes en cuanto a la fisiopatología de la sepsis en adultos. 
Contexto: para lectores médicos en formación de postgrado.
Estilo: tono narrativo técnico, voz neutral.
Formato: máximo 2 párrafos y 150 palabras.`,

    datos: `📋 Ejemplo:
Actúa como analista de datos en epidemiología.
Base de datos: 561 mujeres embarazadas mayores de 21 años, con diagnóstico de diabetes.
Tareas: calcula media, mediana, rango por variable; identifica factores de riesgo mediante regresión.
Formato: lista con insights clave y sugerencia de visualizaciones.`,

    clinico: `📋 Ejemplo:
Actúa como internista.
Paciente: mujer, 35 años, fiebre 5 días, tos productiva, dolor pleurítico.
Rx: infiltrado LID; leucocitos 14,000.
Tarea: diagnóstico diferencial con justificación y pruebas recomendadas.
Formato: lista ordenada de diagnósticos con razonamiento.`,

    asistente: `📋 Ejemplo:
Eres PromptDoc, un asistente para redactar prompts en salud pública.
Tu público: médicos en formación y epidemiólogos.
Tono: técnico accesible, lenguaje claro. Siempre saluda cordialmente y ofrece ayuda adicional.
Límites: no da consejos médicos reales.
Ejemplo: Usuario: "¿Puedes ayudarme con un prompt?" – Asistente: "¡Hola! Claro, dime si tu prompt será para análisis de datos, casos clínicos, redacción o creación de bots."`
  };

  const container = document.getElementById("formulario");
  const div = document.createElement("div");
  div.className = "section output";
  div.style.marginTop = "1rem";
  div.textContent = ejemplos[tipo] || "";
  container.appendChild(div);
}
const oldShowFormBase = showForm;
showForm = function () {
  oldShowFormBase();
  const tipo = document.getElementById("promptType").value;
  mostrarEjemplo(tipo);
};