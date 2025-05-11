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
// Cabeceras técnicas
const formHeaders = {
  texto:     "🔎 Sugerencia técnica: Define rol experto, tarea, contexto y formato de salida.",
  datos:     "🔎 Sugerencia técnica: Describe datos, rol analítico y tipo de análisis.",
  clinico:   "🔎 Sugerencia técnica: Proporciona rol clínico, datos del caso y pide razonamiento.",
  asistente: "🔎 Sugerencia técnica: Define identidad del bot, audiencia y funciones."
};

// Formularios guiados
const contextForms = {
  texto: `
    <div class="form-window">
      <div><label>1. Rol o experto:</label><input id="role" placeholder="Experto en diagnóstico de sepsis" /></div>
      <div><label>2. Tarea específica:</label><input id="task" placeholder="E.g.: Resume la fisiopatología de la sepsis" /></div>
      <div><label>3. Contexto/Detalles:</label><input id="context" placeholder="E.g.: Para estudiantes de postgrado" /></div>
      <div><label>4. Estilo/Tono:</label><input id="style" placeholder="E.g.: Formal, APA" /></div>
      <div><label>5. Formato de salida:</label><input id="format" placeholder="E.g.: 2 párrafos, <150 palabras" /></div>
      <button onclick="buildPrompt()">Generar Prompt</button>
    </div>
  `,
  datos: `
    <div class="form-window">
      <div><label>1. Descripción de datos:</label><textarea id="dataDesc" rows="2" placeholder="Ej.: CSV con 561 pacientes"></textarea></div>
      <div><label>2. Rol analítico:</label><input id="dataRole" placeholder="Actúa como analista epidemiológico" /></div>
      <div><label>3. Tareas de análisis:</label><input id="dataTask" placeholder="E.g.: Estadísticas descriptivas, regresión" /></div>
      <div><label>4. Enfoque/Criterios:</label><input id="dataFocus" placeholder="E.g.: Identificar factores de riesgo" /></div>
      <div><label>5. Formato de resultados:</label><input id="dataFormat" placeholder="E.g.: Lista de insights clave" /></div>
      <button onclick="buildPrompt()">Generar Prompt</button>
    </div>
  `,
  clinico: `
    <div class="form-window">
      <div><label>1. Rol clínico:</label><input id="clinRole" placeholder="Experto en diagnóstico cardiológico" /></div>
      <div><label>2. Presentación del caso:</label><textarea id="clinCase" rows="2" placeholder="E.g.: Varón 65a con dolor torácico"></textarea></div>
      <div><label>3. Tarea médica:</label><input id="clinTask" placeholder="Ej.: Diagnóstico diferencial con justificación" /></div>
      <div><label>4. Guías/Evidencia:</label><input id="clinGuide" placeholder="E.g.: Según guías ESC 2021" /></div>
      <div><label>5. Formato de respuesta:</label><input id="clinFormat" placeholder="Ej.: Lista priorizada del 1 al 5" /></div>
      <button onclick="buildPrompt()">Generar Prompt</button>
    </div>
  `,
  asistente: `
    <div class="form-window">
      <div><label>1. Identidad del asistente:</label><input id="botRole" placeholder="E.g.: AssistPromptBotMed" /></div>
      <div><label>2. Público objetivo:</label><input id="botAudience" placeholder="E.g.: Médicos residentes" /></div>
      <div><label>3. Personalidad/Tono:</label><input id="botTone" placeholder="E.g.: Empático y directo" /></div>
      <div><label>4. Funciones específicas:</label><input id="botFunctions" placeholder="E.g.: Sugerir plantillas de prompts clínicos" /></div>
      <div><label>5. Ejemplo de interacción:</label><textarea id="botExample" rows="2" placeholder="E.g.: Usuario: ¿Cómo estructuro un prompt?"></textarea></div>
      <button onclick="buildPrompt()">Generar Prompt</button>
    </div>
  `
};

// Mapas de modelo e IA
const modelMap = {
  texto:     "GPT-4 (ChatGPT)",
  datos:     "GPT-4 + Code Interpreter",
  clinico:   "GPT-4 (ChatGPT) / Claude",
  asistente: "GPT-4 con funciones avanzadas"
};
const iaMap = {
  texto:     "Scispace, Grammarly, Jasper, Notion AI",
  datos:     "Perplexity AI, WolframAlpha, Elicit.org, Dataiku",
  clinico:   "Consensus, EvidenceHunt, OpenRead, Elicit",
  asistente: "Research Rabbit, scite_, LangChain, FlowGPT"
};

// Al cambiar el tipo de prompt
function onContextChange() {
  const type = document.getElementById("tipoPrompt").value;
  document.getElementById("formHeader").innerText    = formHeaders[type] || "";
  document.getElementById("formContainer").innerHTML = contextForms[type] || "";
  document.getElementById("resultado").value         = "";
  document.getElementById("modeloSugerido").textContent = "";
  document.getElementById("sugerenciaIA").textContent = "";
}

// Construye el prompt
function buildPrompt() {
  const specialty = document.getElementById("specialty").value;
  const type      = document.getElementById("tipoPrompt").value;
  let prompt = "";
  let preSpec = specialty !== "General"
    ? `Eres un especialista en ${specialty}. `
    : "";

  if (type === "texto") {
    let role = document.getElementById("role").value.trim();
    if (role && !/^Eres/i.test(role)) role = `Eres un ${role}. `;
    const task = document.getElementById("task").value.trim();
    const ctx  = document.getElementById("context").value.trim();
    const style= document.getElementById("style").value.trim();
    const fmt  = document.getElementById("format").value.trim();
    prompt = `${preSpec}${role}Tu tarea es ${task}. Contexto: ${ctx}. Estilo: ${style}. Formato: ${fmt}.`;
  }
  else if (type === "datos") {
    let role = document.getElementById("dataRole").value.trim();
    if (role && !/^Actúa/i.test(role)) role = `Actúa como ${role}. `;
    const desc  = document.getElementById("dataDesc").value.trim();
    const task  = document.getElementById("dataTask").value.trim();
    const focus = document.getElementById("dataFocus").value.trim();
    const fmt   = document.getElementById("dataFormat").value.trim();
    prompt = `${preSpec}${role}Datos: ${desc}. Tarea: ${task}. Enfoque: ${focus}. Formato: ${fmt}.`;
  }
  else if (type === "clinico") {
    let role = document.getElementById("clinRole").value.trim();
    if (role && !/^Eres/i.test(role)) role = `Eres un ${role}. `;
    const cc   = document.getElementById("clinCase").value.trim();
    const task = document.getElementById("clinTask").value.trim();
    const gui  = document.getElementById("clinGuide").value.trim();
    const fmt  = document.getElementById("clinFormat").value.trim();
    prompt = `${preSpec}${role}Caso: ${cc}. Tarea: ${task}. Guías: ${gui}. Formato: ${fmt}.`;
  }
  else if (type === "asistente") {
    let role = document.getElementById("botRole").value.trim();
    if (role && !/^Eres/i.test(role)) role = `Eres ${role}. `;
    const aud = document.getElementById("botAudience").value.trim();
    const tone= document.getElementById("botTone").value.trim();
    const fun = document.getElementById("botFunctions").value.trim();
    const ex  = document.getElementById("botExample").value.trim();
    prompt = `${preSpec}${role}para ${aud}. Personalidad: ${tone}. Funciones: ${fun}. Ejemplo: ${ex}.`;
  }

  document.getElementById("resultado").value           = prompt;
  document.getElementById("modeloSugerido").textContent = modelMap[type] || "";
  document.getElementById("sugerenciaIA").textContent  = iaMap[type]    || "";
}

// Copiar prompt
function copiarPrompt() {
  const ta = document.getElementById("resultado");
  ta.select();
  document.execCommand("copy");
  alert("✅ Prompt copiado al portapapeles.");
}