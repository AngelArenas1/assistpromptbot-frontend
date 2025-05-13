// Ejemplos de Prompt por especialidad y contexto
const ejemplos = {
  texto: {
    'Medicina Interna': `📋 Ejemplo:
Eres un internista experto. Tu tarea es describir el algoritmo diagnóstico completo para el síndrome nefrótico en adultos.
Contexto: Residentes de segundo año de Medicina Interna.
Estilo: Técnico y formal.
Formato: Lista de pasos numerados con criterios de elección de pruebas.`,
    'Pediatría': `📋 Ejemplo:
Eres un pediatra neonatólogo. Tu tarea es elaborar un plan de nutrición enteral progresiva para prematuros menores de 32 semanas.
Contexto: Médicos en formación en Neonatología.
Estilo: Clínico y conciso.
Formato: Tabla con fases, objetivos y volúmenes de alimentación.`,
    'Anestesiología': `📋 Ejemplo:
Eres un anestesiólogo. Tu tarea es comparar métodos de sedación (midazolam vs propofol vs ketamina) y describir el manejo de la vía aérea (laringoscopia directa, videolaringoscopio, mascarilla laríngea) en procedimientos quirúrgicos de corta duración.
Contexto: Anestesistas en formación y personal de quirófano.
Estilo: Técnico y conciso.
Formato: Tabla comparativa con dosis recomendadas, ventajas, desventajas y algoritmo de actuación ante vía aérea difícil.`,
    'Cirugía General': `📋 Ejemplo:
Eres un cirujano general. Tu tarea es describir paso a paso la técnica de apendicectomía laparoscópica.
Contexto: Residentes de Cirugía.
Estilo: Procedimental, paso a paso.
Formato: Lista numerada con recomendaciones perioperatorias.`,
    'Ginecología y Obstetricia': `📋 Ejemplo:
Eres un obstetra. Tu tarea es describir el manejo de la preeclampsia severa en gestantes de 28–34 semanas.
Contexto: Residentes de Obstetricia.
Estilo: Basado en guías ACOG.
Formato: Protocolo clínico con fases (diagnóstico, estabilización, seguimiento).`,
    'Cuidados Intensivos': `📋 Ejemplo:
Eres un intensivista. Tu tarea es elaborar un protocolo de sedación y analgesia para pacientes con SDRA en ventilación mecánica.
Contexto: Médicos de UCI.
Estilo: Conciso, orientado a flujos de trabajo.
Formato: Diagrama de toma de decisiones y dosis recomendadas.`,
    'Urgenciología': `📋 Ejemplo:
Eres un urgenciólogo. Tu tarea es estructurar el algoritmo ABCDE para la valoración inicial de trauma torácico.
Contexto: Médicos de sala de emergencias.
Estilo: Check-list práctico.
Formato: Lista de chequeo con puntos críticos y tiempos.`,
    'Infectología': `📋 Ejemplo:
Eres un infectólogo. Tu tarea es elaborar el esquema de tratamiento empírico para meningitis bacteriana en adultos.
Contexto: Residentes de Infectología.
Estilo: Basado en guías IDSA.
Formato: Tabla de antibióticos con dosis y duración.`,
    'Nefrología': `📋 Ejemplo:
Eres un nefrólogo. Tu tarea es comparar indicaciones y contraindicaciones de diálisis peritoneal versus hemodiálisis en insuficiencia renal crónica.
Contexto: Residentes de Nefrología.
Estilo: Analítico, basado en evidencia.
Formato: Tabla comparativa con ventajas y desventajas.`,
    'Reumatología': `📋 Ejemplo:
Eres un reumatólogo. Tu tarea es describir los criterios ACR/EULAR para el diagnóstico de artritis reumatoide y su puntuación.
Contexto: Médicos generales y residentes.
Estilo: Académico, detallado.
Formato: Lista de criterios con puntos asignados.`,
    'Otras Especialidades': `📋 Ejemplo:
Eres un especialista en [Tu área]. Tu tarea es describir [tema concreto].
Contexto: [Tu audiencia].
Estilo: [Ej. técnico, formal, accesible].
Formato: [Ej. lista numerada, tabla, párrafos breves].`
  },
  datos: {
    'Medicina Interna': `📊 Ejemplo:
Eres un epidemiólogo internista. Tu tarea es analizar datos de 500 pacientes con fallo renal crónico.
Variables: edad, creatinina, FG, HTA.
Tareas: calcular media, mediana y desviación estándar de la creatinina; identificar correlación con HTA.
Formato: Tabla con resultados y sugerencia de gráfico.`,
    'Pediatría': `📊 Ejemplo:
Eres un epidemiólogo pediatra. Tu tarea es analizar datos de 200 recién nacidos prematuros.
Variables: peso al nacer, semanas de gestación, morbimortalidad.
Tareas: estadística descriptiva y regresión logística para mortalidad.
Formato: Lista de insights clave y recomendaciones de visualización.`,
    'Anestesiología': `📊 Ejemplo:
Eres un analista en anestesia. Tu tarea es procesar datos de 150 pacientes sometidos a sedación.
Variables: dosis, tipo de vía aérea, complicaciones.
Tareas: calcular incidencia de complicaciones por tipo de vía aérea.
Formato: Infografía con tasas y recomendaciones.`,
    'Cirugía General': `📊 Ejemplo:
Eres un analista quirúrgico. Tu tarea es examinar datos de 300 apendicectomías.
Variables: tiempo quirúrgico, estancia, complicaciones.
Tareas: estadísticas descriptivas y análisis de riesgo.
Formato: Tabla comparativa de medias y factores de riesgo.`,
    'Ginecología y Obstetricia': `📊 Ejemplo:
Eres un analista obstétrico. Tu tarea es estudiar 250 gestantes con preeclampsia.
Variables: PA, proteinuria, EG.
Tareas: incidencia de preeclampsia severa por trimestre.
Formato: Gráfica de barras y resumen narrativo.`,
    'Cuidados Intensivos': `📊 Ejemplo:
Eres un analista de UCI. Tu tarea es analizar 100 casos de SDRA.
Variables: PaO2/FiO2, sedación, mortalidad.
Tareas: correlación entre nivel de sedación y supervivencia.
Formato: Diagrama de dispersión y tabla resumen.`,
    'Urgenciología': `📊 Ejemplo:
Eres un analista de urgencias. Tu tarea es revisar 200 traumas torácicos.
Variables: aplicación ABCDE, resultados.
Tareas: porcentaje de cumplimiento del protocolo.
Formato: Lista de hallazgos y gráfica de cumplimiento.`,
    'Infectología': `📊 Ejemplo:
Eres un analista en infectología. Tu tarea es procesar datos de 180 meningitis.
Variables: patógeno, esquema antibiótico, evolución.
Tareas: eficacia empírica por patógeno.
Formato: Tabla de sensibilidad y recomendaciones.`,
    'Nefrología': `📊 Ejemplo:
Eres un analista nefrólogo. Tu tarea es comparar 120 diálisis peritoneales vs 120 hemodiálisis.
Variables: supervivencia y complicaciones.
Tareas: análisis de riesgo-beneficio.
Formato: Tabla comparativa con OR e IC.`,
    'Reumatología': `📊 Ejemplo:
Eres un analista reumatólogo. Tu tarea es estudiar 150 artritis reumatoides.
Variables: criterios ACR/EULAR, actividad.
Tareas: descriptiva de criterios.
Formato: Gráfico de radar y tabla.`,
    'Otras Especialidades': `📊 Ejemplo:
Eres un analista en [Tu área]. Datos: [Descripción].
Tareas: [Estadísticas].
Formato: [Formato].`
  },
  clinico: {
    'Medicina Interna': `🩺 Ejemplo:
Eres un internista. Caso: mujer 60 a, edemas, proteinuria 4 g/d.
Tarea: diagnóstico diferencial, pruebas confirmatorias y plan de manejo.
Formato: Lista numerada.`,
    'Pediatría': `🩺 Ejemplo:
Eres un pediatra. Caso: prematuro 30 s con enterocolitis necrotizante.
Tarea: plan médico y quirúrgico.
Formato: Tabla con fases y acciones.`,
    'Anestesiología': `🩺 Ejemplo:
Eres un anestesiólogo. Caso: paciente 45 a, Mallampati III.
Tarea: plan de sedación y manejo vía aérea difícil.
Formato: Flujo de decisiones.`,
    'Cirugía General': `🩺 Ejemplo:
Eres un cirujano. Caso: apendicitis complicada en anciano.
Tarea: plan quirúrgico y postoperatorio.
Formato: Lista de pasos.`,
    'Ginecología y Obstetricia': `🩺 Ejemplo:
Eres un obstetra. Caso: preeclampsia severa 32 s.
Tarea: estabilización y momento de parto.
Formato: Protocolo por fases.`,
    'Cuidados Intensivos': `🩺 Ejemplo:
Eres un intensivista. Caso: SDRA severo, PaO2/FiO2<100.
Tarea: plan de ventilación y sedación.
Formato: Diagrama de flujo.`,
    'Urgenciología': `🩺 Ejemplo:
Eres un urgenciólogo. Caso: neumotórax a tensión.
Tarea: manejo inicial y toracostomía.
Formato: Checklist con tiempos.`,
    'Infectología': `🩺 Ejemplo:
Eres un infectólogo. Caso: meningitis bacteriana.
Tarea: diagnóstico rápido y tratamiento empírico.
Formato: Tabla de antibióticos.`,
    'Nefrología': `🩺 Ejemplo:
Eres un nefrólogo. Caso: hiperpotasemia grave.
Tarea: algoritmo de manejo urgente.
Formato: Lista por prioridad.`,
    'Reumatología': `🩺 Ejemplo:
Eres un reumatólogo. Caso: posible AR temprana.
Tarea: aplicar criterios ACR/EULAR y plan diagnóstico.
Formato: Lista con puntuaciones.`,
    'Otras Especialidades': `🩺 Ejemplo:
Eres un especialista en [Tu área]. Caso: [Tu caso].
Tarea: [Tu tarea].
Formato: [Tu formato].`
  },
  asistente: {
    'Medicina Interna': `🤖 Ejemplo:
Eres InternaBot. Ayudas a residentes de Medicina Interna.
Función: sugerir prompts sobre algoritmos diagnósticos.
Tono: Técnico y respetuoso.
Límites: No reemplazas juicio clínico.`,
    'Pediatría': `🤖 Ejemplo:
Eres PediPrompt. Apoyas en Neonatología.
Función: estructurar prompts de nutrición neonatal.
Tono: Clínico y didáctico.
Límites: Seguir protocolos.`,
    'Anestesiología': `🤖 Ejemplo:
Eres AnesthePrompt. Experto en sedación.
Función: generar prompts de técnicas anestésicas y vía aérea.
Tono: Preciso y formal.
Límites: No prescribir fármacos.`,
    'Cirugía General': `🤖 Ejemplo:
Eres CirugPrompt. Asistes a cirujanos.
Función: prompts sobre técnicas laparoscópicas.
Tono: Paso a paso.
Límites: No reemplazas manuales.`,
    'Ginecología y Obstetricia': `🤖 Ejemplo:
Eres ObGynPrompt. Experto obstetra.
Función: prompts de preeclampsia y ACOG.
Tono: Basado en evidencia.
Límites: Atención presencial necesaria.`,
    'Cuidados Intensivos': `🤖 Ejemplo:
Eres UCIHelper. Apoya a intensivistas.
Función: prompts de sedación y ventilación.
Tono: Directo y fluido.
Límites: Siempre revisar equipo.`,
    'Urgenciología': `🤖 Ejemplo:
Eres UrgPrompt. Experto en emergencias.
Función: prompts ABCDE y triage.
Tono: Conciso y práctico.
Límites: Simulacros de RCP aparte.`,
    'Infectología': `🤖 Ejemplo:
Eres InfectoBot. Experto infección.
Función: prompts de tratamiento antimicrobiano.
Tono: Guías IDSA.
Límites: No sin cultivos.`,
    'Nefrología': `🤖 Ejemplo:
Eres NephroPrompt. IRC y diálisis.
Función: prompts modalidades de diálisis.
Tono: Analítico.
Límites: No sin valoración clínica.`,
    'Reumatología': `🤖 Ejemplo:
Eres ReumaPrompt. AR y criterios.
Función: prompts ACR/EULAR.
Tono: Académico.
Límites: c`  
    // (continúa igual)  
  }
};

// Cabeceras técnicas
const formHeaders = {
  texto:     "🔎 Generador de Texto (Revisión de tema, Redacción de artículos, Elaboración de Guías y Manuales etc.)",
  datos:     "🔎 Análisis de Datos Estructurados",
  clinico:   "🔎 Análisis de Casos Clínicos",
  asistente: "🔎 Creación de Asistentes Virtuales Consistentes"
};

// Formularios guiados
const contextForms = {
  texto: `
    <div class="form-window">
      <div><label>1. Rol o experto:</label><input id="role" placeholder="Ej.: Experto en diagnóstico de sepsis" /></div>
      <div><label>2. Tarea específica:</label><input id="task" placeholder="Ej.: Resume la fisiopatología de la sepsis" /></div>
      <div><label>3. Contexto/Detalles:</label><input id="context" placeholder="Ej.: Para estudiantes de postgrado" /></div>
      <div><label>4. Estilo/Tono:</label><input id="style" placeholder="Ej.: Formal, APA" /></div>
      <div><label>5. Formato de salida:</label><input id="format" placeholder="Ej.: 2 párrafos, <150 palabras" /></div>
      <button onclick="buildPrompt()">Generar Prompt</button>
    </div>
  `,
  datos: `
    <div class="form-window">
      <div><label>1. Descripción de datos:</label><textarea id="dataDesc" placeholder="Ej.: CSV con 561 pacientes"></textarea></div>
      <div><label>2. Rol analítico:</label><input id="dataRole" placeholder="Ej.: Actúa como epidemiólogo experto" /></div>
      <div><label>3. Tareas de análisis:</label><input id="dataTask" placeholder="Ej.: Estadísticas descriptivas, regresión" /></div>
      <div><label>4. Enfoque/Criterios:</label><input id="dataFocus" placeholder="Ej.: Identificar factores de riesgo" /></div>
      <div><label>5. Formato de resultados:</label><input id="dataFormat" placeholder="Ej.: Lista de insights clave" /></div>
      <button onclick="buildPrompt()">Generar Prompt</button>
    </div>
  `,
  clinico: `
    <div class="form-window">
      <div><label>1. Rol clínico:</label><input id="clinRole" placeholder="Ej.: Eres internista, cardiólogo, pediatra..." /></div>
      <div><label>2. Presentación del caso:</label><textarea id="clinCase" placeholder="Ej.: Mujer 60a con edemas y proteinuria"></textarea></div>
      <div><label>3. Tarea médica:</label><input id="clinTask" placeholder="Ej.: Diagnóstico diferencial con justificación" /></div>
      <div><label>4. Guías/Evidencia:</label><input id="clinGuide" placeholder="Ej.: Según guías ESC 2021" /></div>
      <div><label>5. Formato de respuesta:</label><input id="clinFormat" placeholder="Ej.: Lista priorizada" /></div>
      <button onclick="buildPrompt()">Generar Prompt</button>
    </div>
  `,
  asistente: `
    <div class="form-window">
      <div><label>1. Identidad del asistente:</label><input id="botRole" placeholder="Ej.: AssistPromptBotMed" /></div>
      <div><label>2. Público objetivo:</label><input id="botAudience" placeholder="Ej.: Médicos residentes" /></div>
      <div><label>3. Personalidad/Tono:</label><input id="botTone" placeholder="Ej.: Empático y directo" /></div>
      <div><label>4. Funciones específicas:</label><input id="botFunctions" placeholder="Ej.: Sugerir plantillas de prompts clínicos" /></div>
      <div><label>5. Ejemplo de interacción:</label><textarea id="botExample" placeholder="Ej.: Usuario: ¿Cómo estructuro un prompt?"></textarea></div>
      <button onclick="buildPrompt()">Generar Prompt</button>
    </div>
  `
};

// Mapas de modelo e IA
const modelMap = {
  texto:     "GPT-4 (ChatGPT)",
  datos:     "GPT-4 + Code Interpreter",
  clinico:   "GPT-4 (ChatGPT)",
  asistente: "GPT-4 con funciones avanzadas"
};
const iaMap = {
  texto:     "Scispace, Grammarly, Jasper, Notion AI",
  datos:     "Perplexity AI, WolframAlpha, Elicit.org, Dataiku",
  clinico:   "Consensus, EvidenceHunt, OpenRead, Elicit",
  asistente: "Research Rabbit, scite_, LangChain, FlowGPT"
};

function onContextChange() {
  const spec = document.getElementById("specialty").value;
  const type = document.getElementById("tipoPrompt").value;
  document.getElementById("formHeader").innerText    = formHeaders[type] || "";
  document.getElementById("formContainer").innerHTML = contextForms[type] || "";
  document.getElementById("resultado").value         = "";
  document.getElementById("respuestaIA").textContent= "";
  document.getElementById("modeloSugerido").textContent = modelMap[type] || "";
  document.getElementById("sugerenciaIA").textContent  = iaMap[type]    || "";

  // Añade el ejemplo dinámico
  const ej = ejemplos[type] && ejemplos[type][spec];
  if (ej) {
    const div = document.createElement("div");
    div.className = "output-area";
    div.textContent = ej;
    document.getElementById("formContainer").appendChild(div);
  }
}

function buildPrompt() {
  const spec = document.getElementById("specialty").value;
  const type = document.getElementById("tipoPrompt").value;
  let pre = spec !== "Otras Especialidades" ? `Eres un especialista en ${spec}. ` : "";
  let prompt = "";

  if (type === "texto") {
    let role = document.getElementById("role").value.trim();
    if (role && !/^Eres/i.test(role)) role = `Eres ${role}. `;
    const task = document.getElementById("task").value.trim();
    const ctx  = document.getElementById("context").value.trim();
    const style= document.getElementById("style").value.trim();
    const fmt  = document.getElementById("format").value.trim();
    prompt = `${pre}${role}Tu tarea es ${task}. Contexto: ${ctx}. Estilo: ${style}. Formato: ${fmt}.`;
  }
  else if (type === "datos") {
    let role = document.getElementById("dataRole").value.trim();
    if (role && !/^Actúa/i.test(role)) role = `Actúa como ${role}. `;
    const desc  = document.getElementById("dataDesc").value.trim();
    const task  = document.getElementById("dataTask").value.trim();
    const focus = document.getElementById("dataFocus").value.trim();
    const fmt   = document.getElementById("dataFormat").value.trim();
    prompt = `${pre}${role}Datos: ${desc}. Tarea: ${task}. Enfoque: ${focus}. Formato: ${fmt}.`;
  }
  else if (type === "clinico") {
    let role = document.getElementById("clinRole").value.trim();
    if (role && !/^Eres/i.test(role)) role = `Eres ${role}. `;
    const cc   = document.getElementById("clinCase").value.trim();
    const task = document.getElementById("clinTask").value.trim();
    const gui  = document.getElementById("clinGuide").value.trim();
    const fmt  = document.getElementById("clinFormat").value.trim();
    prompt = `${pre}${role}Caso: ${cc}. Tarea: ${task}. Guías: ${gui}. Formato: ${fmt}.`;
  }
  else if (type === "asistente") {
    let role = document.getElementById("botRole").value.trim();
    if (role && !/^Eres/i.test(role)) role = `Eres ${role}. `;
    const aud = document.getElementById("botAudience").value.trim();
    const tone= document.getElementById("botTone").value.trim();
    const fun = document.getElementById("botFunctions").value.trim();
    const ex  = document.getElementById("botExample").value.trim();
    prompt = `${pre}${role}Para ${aud}. Personalidad: ${tone}. Funciones: ${fun}. Ejemplo: ${ex}.`;
  }

  document.getElementById("resultado").value = prompt;
}

function copiarPrompt() {
  const ta = document.getElementById("resultado");
  ta.select();
  document.execCommand("copy");
  alert("✅ Prompt copiado al portapapeles");
}
