// Script.js - AssistPromptBot

// Map of technical headers for each context
const formHeaders = {
  texto:     "🔎 Sugerencia técnica: Define rol experto, tarea, contexto y formato de salida.",
  datos:     "🔎 Sugerencia técnica: Describe datos, rol analítico y tipo de análisis.",
  clinico:   "🔎 Sugerencia técnica: Proporciona rol clínico, datos del caso y pide razonamiento.",
  asistente: "🔎 Sugerencia técnica: Define identidad del bot, audiencia y funciones."
};

// HTML snippets for each context
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
      <div><label>5. Ejemplo de interacción:</label><textarea id="botExample" rows="2" placeholder="E.g.: Usuario: '¿Cómo estructuro un prompt?'"></textarea></div>
      <button onclick="buildPrompt()">Generar Prompt</button>
    </div>
  `
};

// Suggested models and complementary IA
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

// Handle context change
function onContextChange() {
  const type = document.getElementById("tipoPrompt").value;
  document.getElementById("formHeader").innerText    = formHeaders[type] || "";
  document.getElementById("formContainer").innerHTML = contextForms[type] || "";
  document.getElementById("resultado").value         = "";
  document.getElementById("modeloSugerido").textContent = "";
  document.getElementById("sugerenciaIA").textContent = "";

  // Add specialty-specific example for text generator
  if (type === 'texto') {
    const spec = document.getElementById('specialty').value;
    const examples = {
      'Medicina Interna': `Eres un internista experto. Tu tarea es describir el algoritmo diagnóstico completo para el síndrome nefrótico en adultos.
Contexto: Residentes de segundo año de Medicina Interna.
Estilo: Técnico y formal.
Formato: Lista de pasos numerados con criterios de elección de pruebas.`,
      'Pediatría': `Eres un pediatra neonatólogo. Tu tarea es elaborar un plan de nutrición enteral progresiva para prematuros menores de 32 semanas.
Contexto: Médicos en formación en Neonatología.
Estilo: Clínico y conciso.
Formato: Tabla con fases, objetivos y volúmenes de alimentación.`,
      'Anestesiología': `Eres un anestesiólogo. Tu tarea es comparar métodos de sedación (sedación consciente con midazolam vs sedación profunda con propofol vs sedación con ketamina) y describir el manejo de la vía aérea (laringoscopia directa, videolaringoscopio, mascarilla laríngea) en procedimientos quirúrgicos de corta duración.
Contexto: Anestesistas en formación y personal de quirófano.
Estilo: Técnico y conciso.
Formato: Tabla comparativa que incluya dosis recomendadas, ventajas, desventajas y algoritmo de actuación ante vía aérea difícil.`,
      'Cirugía General': `Eres un cirujano general. Tu tarea es describir paso a paso la técnica de apendicectomía laparoscópica.
Contexto: Residentes de Cirugía.
Estilo: Procedimental, paso a paso.
Formato: Lista numerada con recomendaciones perioperatorias.`,
      'Ginecología y Obstetricia': `Eres un obstetra. Tu tarea es describir el manejo de la preeclampsia severa en gestantes de 28–34 semanas.
Contexto: Residentes de Obstetricia.
Estilo: Basado en guías ACOG.
Formato: Protocolo clínico con fases (diagnóstico, estabilización, seguimiento).`,
      'Cuidados Intensivos': `Eres un intensivista. Tu tarea es elaborar un protocolo de sedación y analgesia para pacientes con SDRA en ventilación mecánica.
Contexto: Médicos de UCI.
Estilo: Conciso, orientado a flujos de trabajo.
Formato: Diagrama de toma de decisiones y dosis recomendadas.`,
      'Urgenciología': `Eres un urgenciólogo. Tu tarea es estructurar el algoritmo ABCDE para la valoración inicial de trauma torácico.
Contexto: Médicos de sala de emergencias.
Estilo: Check-list práctico.
Formato: Lista de chequeo con puntos críticos y tiempos.`,
      'Infectología': `Eres un infectólogo. Tu tarea es elaborar el esquema de tratamiento empírico para meningitis bacteriana en adultos.
Contexto: Residentes de Infectología.
Estilo: Basado en guías IDSA.
Formato: Tabla de antibióticos con dosis y duración.`,
      'Nefrología': `Eres un nefrólogo. Tu tarea es comparar indicaciones y contraindicaciones de diálisis peritoneal versus hemodiálisis en insuficiencia renal crónica.
Contexto: Residentes de Nefrología.
Estilo: Analítico, basado en evidencia.
Formato: Tabla comparativa con ventajas y desventajas.`,
      'Reumatología': `Eres un reumatólogo. Tu tarea es describir los criterios ACR/EULAR para el diagnóstico de artritis reumatoide y su puntuación.
Contexto: Médicos generales y residentes.
Estilo: Académico, detallado.
Formato: Lista de criterios con puntos asignados.`,
      'Otras Especialidades': `Eres un especialista en [Tu área]. Tu tarea es describir [tema concreto].
Contexto: [Tu audiencia].
Estilo: [Ej. técnico, formal, accesible].
Formato: [Ej. lista numerada, tabla, párrafos breves].`
    };
    const exText = examples[spec] || examples['Otras Especialidades'];
    const exDiv = document.createElement('div');
    exDiv.className = 'form-header';
    exDiv.style.background = '#fff1f2';
    exDiv.style.borderLeft = '4px solid #be185d';
    exDiv.style.marginTop = '1rem';
    exDiv.innerText = '📋 Ejemplo:\n' + exText;
    document.getElementById('formContainer').appendChild(exDiv);
  }
}

// Build the final prompt
function buildPrompt() {
  const specialty = document.getElementById('specialty').value;
  const type      = document.getElementById('tipoPrompt').value;
  let prompt = '';
  let preSpec = specialty !== 'General'
    ? `Eres un especialista en ${specialty}. `
    : '';

  if (type === 'texto') {
    let role = document.getElementById('role').value.trim();
    if (role && !/^Eres/i.test(role)) role = `Eres un ${role}. `;
    const task = document.getElementById('task').value.trim();
    const ctx  = document.getElementById('context').value.trim();
    const style= document.getElementById('style').value.trim();
    const fmt  = document.getElementById('format').value.trim();
    prompt = `${preSpec}${role}Tu tarea es ${task}. Contexto: ${ctx}. Estilo: ${style}. Formato: ${fmt}.`;
  } else if (type === 'datos') {
    let role = document.getElementById('dataRole').value.trim();
    if (role && !/^Actúa/i.test(role)) role = `Actúa como ${role}. `;
    const desc  = document.getElementById('dataDesc').value.trim();
    const task  = document.getElementById('dataTask').value.trim();
    const focus = document.getElementById('dataFocus').value.trim();
    const fmt   = document.getElementById('dataFormat').value.trim();
    prompt = `${preSpec}${role}Datos: ${desc}. Tarea: ${task}. Enfoque: ${focus}. Formato: ${fmt}.`;
  } else if (type === 'clinico') {
    let role = document.getElementById('clinRole').value.trim();
    if (role && !/^Eres/i.test(role)) role = `Eres un ${role}. `;
    const cc   = document.getElementById('clinCase').value.trim();
    const task = document.getElementById('clinTask').value.trim();
    const gui  = document.getElementById('clinGuide').value.trim();
    const fmt  = document.getElementById('clinFormat').value.trim();
    prompt = `${preSpec}${role}Caso: ${cc}. Tarea: ${task}. Guías: ${gui}. Formato: ${fmt}.`;
  } else if (type === 'asistente') {
    let role = document.getElementById('botRole').value.trim();
    if (role && !/^Eres/i.test(role)) role = `Eres ${role}. `;
    const aud = document.getElementById('botAudience').value.trim();
    const tone= document.getElementById('botTone').value.trim();
    const fun = document.getElementById('botFunctions').value.trim();
    const ex  = document.getElementById('botExample').value.trim();
    prompt = `${preSpec}${role}para ${aud}. Personalidad: ${tone}. Funciones: ${fun}. Ejemplo: ${ex}.`;
  }

  document.getElementById('resultado').value           = prompt;
  document.getElementById('modeloSugerido').textContent = modelMap[type] || '';
  document.getElementById('sugerenciaIA').textContent  = iaMap[type]    || '';
}

// Copy prompt to clipboard
function copiarPrompt() {
  const ta = document.getElementById('resultado');
  ta.select();
  document.execCommand('copy');
  alert('✅ Prompt copiado al portapapeles.');
}
