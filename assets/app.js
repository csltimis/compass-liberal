const CONFIG = {
  googleScriptUrl: "https://script.google.com/macros/s/AKfycbx8tygKkWgf41fRsKddCSN9IF4BOVBwGC_G0niqMTLXnWXUjvEfxhq4_8nh77R4-A4tIQ/exec",
  platformVersion: "csl-timis-compass-v1"
};

const LIKERT = [
  { value: -2, score: "-2", label: "Total dezacord" },
  { value: -1, score: "-1", label: "Mai degrabă nu" },
  { value: 0, score: "0", label: "Neutru / nu știu" },
  { value: 1, score: "+1", label: "Mai degrabă da" },
  { value: 2, score: "+2", label: "Total de acord" }
];

const AXES = {
  economy: {
    label: "Economie",
    left: "stat / intervenție",
    right: "piață / inițiativă"
  },
  fiscal: {
    label: "Fiscalitate",
    left: "taxe mari",
    right: "taxe reduse"
  },
  state: {
    label: "Stat",
    left: "aparat mare",
    right: "stat suplu"
  },
  social: {
    label: "Societate",
    left: "progresist / libertarian",
    right: "conservator moderat"
  },
  geo: {
    label: "Geopolitic",
    left: "izolare",
    right: "UE / NATO"
  },
  institutional: {
    label: "Instituțional",
    left: "populism",
    right: "stat de drept"
  }
};

const PARTIES = [
  {
    id: "PSD",
    x: -38,
    y: 32,
    color: "#ef3348",
    logo: "assets/parties/psd.png",
    ideology: "centru-stânga, conservatorism social"
  },
  {
    id: "AUR",
    x: 68,
    y: 74,
    color: "#d3a51c",
    logo: "assets/parties/aur.png",
    ideology: "dreapta național-conservatoare, euroscepticism"
  },
  {
    id: "PNL",
    x: 58,
    y: 42,
    color: "#163579",
    logo: "assets/parties/pnl.png",
    ideology: "centru-dreapta, liberalism conservator"
  },
  {
    id: "USR",
    x: 46,
    y: -26,
    color: "#003b79",
    logo: "assets/parties/usr.png",
    ideology: "centru spre centru-dreapta, liberalism economic"
  },
  {
    id: "UDMR",
    x: 28,
    y: 26,
    color: "#ee1c25",
    logo: "assets/parties/udmr.png",
    ideology: "centru-dreapta, regionalism, europenism"
  },
  {
    id: "SOS RO",
    x: -8,
    y: 94,
    color: "#0f459b",
    logo: "assets/parties/sos.png",
    ideology: "extrema dreaptă, naționalism, populism de dreapta"
  },
  {
    id: "POT",
    x: 24,
    y: 90,
    color: "#4b16b1",
    logo: "assets/parties/pot.png",
    ideology: "extrema dreaptă, suveranism, dreapta creștină"
  }
];

const QUESTIONS = [
  {
    text: "Taxele mai mici ajută economia să crească.",
    axis: "Economie și taxe",
    axes: { economy: 1, fiscal: 1 }
  },
  {
    text: "Antreprenorii creează prosperitate prin muncă, risc și inovație.",
    axis: "Economie și taxe",
    axes: { economy: 1 }
  },
  {
    text: "Statul ar trebui să controleze prețurile la produsele importante.",
    axis: "Economie și taxe",
    axes: { economy: -1, state: -0.6 }
  },
  {
    text: "Munca trebuie taxată mai puțin.",
    axis: "Economie și taxe",
    axes: { fiscal: 1 }
  },
  {
    text: "Firmele mici trebuie lăsate să crească, nu sufocate de birocrație.",
    axis: "Economie și taxe",
    axes: { economy: 0.8, state: 0.8 }
  },
  {
    text: "Profitul este legitim când vine din muncă și risc.",
    axis: "Economie și taxe",
    axes: { economy: 1 }
  },
  {
    text: "Statul trebuie să protejeze concurența, nu firmele apropiate politic.",
    axis: "Economie și taxe",
    axes: { economy: 0.6, institutional: 1 }
  },
  {
    text: "Salariile cresc sustenabil prin investiții, nu doar prin promisiuni electorale.",
    axis: "Economie și taxe",
    axes: { economy: 0.9, institutional: 0.4 }
  },
  {
    text: "Economia funcționează mai bine cu reguli simple și stabile.",
    axis: "Economie și taxe",
    axes: { economy: 0.6, state: 0.6, institutional: 0.4 }
  },
  {
    text: "Creșterea taxelor este soluția principală pentru buget.",
    axis: "Economie și taxe",
    axes: { fiscal: -1, state: -0.3 }
  },
  {
    text: "România are prea multe instituții inutile.",
    axis: "Stat și administrație",
    axes: { state: 1 }
  },
  {
    text: "Digitalizarea poate reduce corupția și birocrația.",
    axis: "Stat și administrație",
    axes: { state: 0.9, institutional: 0.8 }
  },
  {
    text: "Funcțiile publice trebuie ocupate pe competență.",
    axis: "Stat și administrație",
    axes: { institutional: 1, state: 0.4 }
  },
  {
    text: "Privilegiile speciale trebuie eliminate.",
    axis: "Stat și administrație",
    axes: { institutional: 0.9, state: 0.7 }
  },
  {
    text: "Un stat mai mic poate fi un stat mai eficient.",
    axis: "Stat și administrație",
    axes: { state: 1, fiscal: 0.3 }
  },
  {
    text: "Bugetul trebuie reparat întâi prin reducerea risipei.",
    axis: "Stat și administrație",
    axes: { state: 0.9, fiscal: 0.8 }
  },
  {
    text: "Politicienii trebuie să răspundă pentru banii publici.",
    axis: "Stat și administrație",
    axes: { institutional: 1 }
  },
  {
    text: "Administrația trebuie măsurată prin rezultate.",
    axis: "Stat și administrație",
    axes: { state: 0.8, institutional: 0.7 }
  },
  {
    text: "Libertatea individuală vine cu responsabilitate.",
    axis: "Libertate și societate",
    axes: { social: 0.35, institutional: 0.6 }
  },
  {
    text: "Statul nu trebuie să decidă în locul individului.",
    axis: "Libertate și societate",
    axes: { social: -0.5, state: 0.5 }
  },
  {
    text: "Educația trebuie să formeze oameni liberi și competenți.",
    axis: "Libertate și societate",
    axes: { institutional: 0.7, social: -0.2 }
  },
  {
    text: "Familia rămâne o instituție importantă a societății.",
    axis: "Libertate și societate",
    axes: { social: 1 }
  },
  {
    text: "Tradiția și modernizarea pot merge împreună.",
    axis: "Libertate și societate",
    axes: { social: 0.6, geo: 0.4 }
  },
  {
    text: "Diversitatea opiniilor este esențială într-o democrație.",
    axis: "Libertate și societate",
    axes: { institutional: 0.8, social: -0.2 }
  },
  {
    text: "Cenzura ideilor incomode este periculoasă.",
    axis: "Libertate și societate",
    axes: { institutional: 0.7, social: -0.4 }
  },
  {
    text: "Respectul pentru reguli protejează libertatea.",
    axis: "Libertate și societate",
    axes: { institutional: 1, social: 0.35 }
  },
  {
    text: "România aparține lumii occidentale.",
    axis: "UE, NATO și interes național",
    axes: { geo: 1 }
  },
  {
    text: "Uniunea Europeană este o șansă majoră pentru dezvoltarea României.",
    axis: "UE, NATO și interes național",
    axes: { geo: 1 }
  },
  {
    text: "NATO este esențial pentru securitatea României.",
    axis: "UE, NATO și interes național",
    axes: { geo: 1 }
  },
  {
    text: "Interesul național trebuie apărat în interiorul UE.",
    axis: "UE, NATO și interes național",
    axes: { geo: 0.6, social: 0.25 }
  },
  {
    text: "Izolarea economică ar slăbi România.",
    axis: "UE, NATO și interes național",
    axes: { geo: 1, economy: 0.4 }
  },
  {
    text: "Patriotismul economic nu înseamnă anti-europenism.",
    axis: "UE, NATO și interes național",
    axes: { geo: 0.8, social: 0.25 }
  },
  {
    text: "Modernizarea țării cere parteneriate occidentale puternice.",
    axis: "UE, NATO și interes național",
    axes: { geo: 1 }
  },
  {
    text: "Justiția trebuie să rămână independentă de interesele politice.",
    axis: "Instituții și stat de drept",
    axes: { institutional: 1 }
  },
  {
    text: "Regulile democratice contează și când rezultatul nu ne convine.",
    axis: "Instituții și stat de drept",
    axes: { institutional: 1 }
  },
  {
    text: "Meritul trebuie să fie mai important decât relațiile politice.",
    axis: "Instituții și stat de drept",
    axes: { institutional: 1 }
  },
  {
    text: "Oamenii competenți trebuie încurajați să intre în viața publică.",
    axis: "Instituții și stat de drept",
    axes: { institutional: 0.8 }
  },
  {
    text: "Instituțiile sunt inutile dacă liderul este suficient de puternic.",
    axis: "Instituții și stat de drept",
    axes: { institutional: -1, social: 0.5 }
  },
  {
    text: "Promisiunile simple sunt mai importante decât soluțiile calculate.",
    axis: "Instituții și stat de drept",
    axes: { institutional: -1 }
  },
  {
    text: "Politica trebuie să rămână despre oameni, idei și proiecte.",
    axis: "Instituții și stat de drept",
    axes: { institutional: 0.7 }
  }
];

const state = {
  screen: "intro",
  submissionId: createSubmissionId(),
  profileSubmittedAt: "",
  questionIndex: 0,
  profile: {},
  answers: Array(QUESTIONS.length).fill(null),
  result: null,
  submitted: false
};

const dom = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheDom();
  bindEvents();
  renderScreen("intro");
});

function cacheDom() {
  dom.shell = document.querySelector("[data-quiz-shell]");
  dom.screens = [...document.querySelectorAll("[data-screen]")];
  dom.progressLabel = document.querySelector("[data-progress-label]");
  dom.progressBar = document.querySelector("[data-progress-bar]");
  dom.profileForm = document.querySelector("[data-profile-form]");
  dom.formError = document.querySelector("[data-form-error]");
  dom.questionNumber = document.querySelector("[data-question-number]");
  dom.questionAxis = document.querySelector("[data-question-axis]");
  dom.questionText = document.querySelector("[data-question-text]");
  dom.answerGrid = document.querySelector("[data-answer-grid]");
  dom.pnlScore = document.querySelector("[data-pnl-score]");
  dom.profileName = document.querySelector("[data-profile-name]");
  dom.profileDescription = document.querySelector("[data-profile-description]");
  dom.axisList = document.querySelector("[data-axis-list]");
  dom.valueTags = document.querySelector("[data-value-tags]");
  dom.userDot = document.querySelector("[data-user-dot]");
  dom.partyLayer = document.querySelector("[data-party-layer]");
  dom.syncStatus = document.querySelector("[data-sync-status]");
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;

    if (action === "start-profile") renderScreen("profile");
    if (action === "back-intro") renderScreen("intro");
    if (action === "prev-question") previousQuestion();
    if (action === "next-question") nextQuestion();
    if (action === "print-report") window.print();
    if (action === "restart") restart();
  });

  dom.profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateProfile()) return;
    state.profile = readProfile();
    state.submissionId = state.submissionId || createSubmissionId();
    state.profileSubmittedAt = new Date().toISOString();
    state.questionIndex = 0;
    submitToGoogleSheet(buildProfilePayload(), { silent: true });
    renderScreen("question");
  });
}

function renderScreen(screen) {
  state.screen = screen;
  dom.screens.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.screen === screen);
  });

  if (screen === "question") renderQuestion();
  if (screen === "result") renderResult();

  updateProgress();
  if (screen !== "intro") {
    dom.shell.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function updateProgress() {
  let label = "Pregătire";
  let width = 0;

  if (state.screen === "profile") {
    label = "Date și acorduri";
    width = 8;
  }

  if (state.screen === "question") {
    label = `Întrebarea ${state.questionIndex + 1} din ${QUESTIONS.length}`;
    width = 8 + ((state.questionIndex + 1) / QUESTIONS.length) * 84;
  }

  if (state.screen === "result") {
    label = "Raport generat";
    width = 100;
  }

  dom.progressLabel.textContent = label;
  dom.progressBar.style.width = `${width}%`;
}

function validateProfile() {
  dom.formError.textContent = "";

  if (!dom.profileForm.checkValidity()) {
    dom.formError.textContent = "Completează toate câmpurile obligatorii și verifică adresa de email.";
    dom.profileForm.reportValidity();
    return false;
  }

  const data = new FormData(dom.profileForm);
  if (!data.get("consentResult") || !data.get("consentPolitical") || !data.get("consentAge")) {
    dom.formError.textContent = "Acordurile obligatorii trebuie bifate separat pentru a începe testul.";
    return false;
  }

  return true;
}

function readProfile() {
  const data = new FormData(dom.profileForm);
  return {
    lastName: clean(data.get("lastName")),
    firstName: clean(data.get("firstName")),
    phone: clean(data.get("phone")),
    email: clean(data.get("email")),
    birthDate: clean(data.get("birthDate")),
    university: clean(data.get("university")),
    faculty: clean(data.get("faculty")),
    studyYear: clean(data.get("studyYear")),
    specialization: clean(data.get("specialization")),
    source: clean(data.get("source")),
    website: clean(data.get("website")),
    consents: {
      resultProcessing: Boolean(data.get("consentResult")),
      politicalExplicit: Boolean(data.get("consentPolitical")),
      ageConfirmation: Boolean(data.get("consentAge")),
      contact: Boolean(data.get("consentContact"))
    }
  };
}

function renderQuestion() {
  const question = QUESTIONS[state.questionIndex];
  dom.questionNumber.textContent = `Întrebarea ${state.questionIndex + 1} / ${QUESTIONS.length}`;
  dom.questionAxis.textContent = question.axis;
  dom.questionText.textContent = question.text;
  dom.answerGrid.innerHTML = "";

  LIKERT.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.dataset.value = item.value;
    button.setAttribute("aria-pressed", String(state.answers[state.questionIndex] === item.value));
    if (state.answers[state.questionIndex] === item.value) button.classList.add("is-selected");
    button.innerHTML = `<strong>${item.score}</strong><span>${item.label}</span>`;
    button.addEventListener("click", () => {
      state.answers[state.questionIndex] = item.value;
      renderQuestion();
    });
    dom.answerGrid.appendChild(button);
  });

  document.querySelector("[data-action='prev-question']").disabled = false;
  document.querySelector("[data-action='next-question']").textContent =
    state.questionIndex === QUESTIONS.length - 1 ? "Calculează rezultatul" : "Continuă";
}

function previousQuestion() {
  if (state.questionIndex === 0) {
    renderScreen("profile");
    return;
  }
  state.questionIndex -= 1;
  renderScreen("question");
}

function nextQuestion() {
  if (state.answers[state.questionIndex] === null) {
    pulseAnswers();
    return;
  }

  if (state.questionIndex < QUESTIONS.length - 1) {
    state.questionIndex += 1;
    renderScreen("question");
    return;
  }

  state.result = calculateResult();
  state.submitted = false;
  renderScreen("result");
}

function pulseAnswers() {
  dom.answerGrid.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(0)" }
    ],
    { duration: 220, easing: "ease-out" }
  );
}

function calculateResult() {
  const totals = {};
  const maxTotals = {};

  Object.keys(AXES).forEach((axis) => {
    totals[axis] = 0;
    maxTotals[axis] = 0;
  });

  QUESTIONS.forEach((question, index) => {
    const answer = state.answers[index];
    Object.entries(question.axes).forEach(([axis, weight]) => {
      totals[axis] += answer * weight;
      maxTotals[axis] += 2 * Math.abs(weight);
    });
  });

  const axes = {};
  Object.keys(AXES).forEach((axis) => {
    axes[axis] = maxTotals[axis] ? clamp((totals[axis] / maxTotals[axis]) * 100, -100, 100) : 0;
  });

  const dimensions = {
    market: normalizePositive(axes.economy),
    lowTax: normalizePositive(axes.fiscal),
    leanState: normalizePositive(axes.state),
    euroAtlantic: normalizePositive(axes.geo),
    ownershipEntrepreneurship: normalizePositive(axes.economy * 0.7 + axes.institutional * 0.3),
    ruleOfLawMerit: normalizePositive(axes.institutional),
    democraticTradition: clamp(100 - Math.abs(axes.social - 28) * 1.15, 0, 100)
  };

  const pnlCompatibility =
    dimensions.market * 0.25 +
    dimensions.lowTax * 0.2 +
    dimensions.leanState * 0.15 +
    dimensions.euroAtlantic * 0.15 +
    dimensions.ownershipEntrepreneurship * 0.1 +
    dimensions.ruleOfLawMerit * 0.1 +
    dimensions.democraticTradition * 0.05;

  const compass = {
    x: clamp(axes.economy * 0.6 + axes.fiscal * 0.25 + axes.state * 0.15, -100, 100),
    y: clamp(axes.social * 0.65 + axes.institutional * 0.35, -100, 100)
  };

  const compatibilityScore = Math.round(pnlCompatibility);
  const profile = pickProfile(compatibilityScore, axes, compass);
  const values = pickValues(axes, dimensions);

  return {
    axes,
    dimensions,
    pnlCompatibility: compatibilityScore,
    compass,
    profile,
    values,
    band: pickBand(compatibilityScore)
  };
}

function pickProfile(score, axes, compass) {
  if (score >= 85) {
    return {
      name: "Liberal pragmatic",
      description:
        "Crezi în libertate economică, inițiativă privată, stat suplu și reguli clare. Pentru tine, dezvoltarea vine prin muncă, investiții, educație și administrație eficientă."
    };
  }

  if (score >= 70 && axes.institutional >= 35) {
    return {
      name: "Liberal civic",
      description:
        "Pui accent pe libertăți, educație, stat de drept și modernizare europeană. Ai o orientare reformistă, pro-occidentală și instituțională."
    };
  }

  if (axes.economy >= 35 && axes.social >= 30) {
    return {
      name: "Conservator economic",
      description:
        "Susții piața liberă, taxe mai mici și antreprenoriatul, dar vezi un rol important al tradiției și al interesului strategic național."
    };
  }

  if (axes.economy < 0 && axes.geo >= 15) {
    return {
      name: "Social-democrat moderat",
      description:
        "Preferi un rol mai activ al statului în economie, dar susții democrația, stabilitatea instituțională și apartenența europeană."
    };
  }

  if (axes.geo < 0 || compass.y > 60) {
    return {
      name: "Suveranist economic",
      description:
        "Pui accent pe interes național, protecție strategică și scepticism față de instituții externe, cu o viziune economică mixtă."
    };
  }

  return {
    name: "Profil mixt",
    description:
      "Răspunsurile tale combină valori din mai multe familii politice. Raportul arată zonele de apropiere și distanță față de liberalismul democratic."
  };
}

function pickBand(score) {
  if (score >= 85) return "Compatibilitate liberală foarte ridicată";
  if (score >= 70) return "Compatibilitate liberală ridicată";
  if (score >= 55) return "Compatibilitate parțială";
  if (score >= 40) return "Compatibilitate mixtă";
  return "Orientare diferită de liberalismul PNL";
}

function pickValues(axes, dimensions) {
  const candidates = [
    { label: "Inițiativă privată", value: dimensions.market },
    { label: "Taxe predictibile", value: dimensions.lowTax },
    { label: "Stat suplu", value: dimensions.leanState },
    { label: "UE și NATO", value: dimensions.euroAtlantic },
    { label: "Merit și competență", value: dimensions.ruleOfLawMerit },
    { label: "Tradiție democratică", value: dimensions.democraticTradition },
    { label: "Libertate individuală", value: 100 - Math.max(0, axes.social) * 0.35 }
  ];

  return candidates
    .sort((a, b) => b.value - a.value)
    .slice(0, 4)
    .map((item) => item.label);
}

function renderResult() {
  const result = state.result;
  if (!result) return;

  dom.pnlScore.textContent = `${Math.round(result.pnlCompatibility)}%`;
  dom.profileName.textContent = `${result.profile.name} · ${result.band}`;
  dom.profileDescription.textContent = result.profile.description;

  renderCompass(result);
  renderAxes(result.axes);
  renderValues(result.values);

  if (!state.submitted) {
    state.submitted = true;
    submitToGoogleSheet(buildPayload(result));
  }
}

function renderCompass(result) {
  dom.partyLayer.innerHTML = "";
  PARTIES.forEach((party) => {
    const dot = document.createElement("span");
    dot.className = "party-dot";
    dot.title = `${party.id} · ${party.ideology}`;
    dot.innerHTML = `<img src="${party.logo}" alt=""><span>${party.id}</span>`;
    dot.style.left = `${toCompassLeft(party.x)}%`;
    dot.style.top = `${toCompassTop(party.y)}%`;
    dot.style.background = party.color;
    dom.partyLayer.appendChild(dot);
  });

  dom.userDot.style.left = `${toCompassLeft(result.compass.x)}%`;
  dom.userDot.style.top = `${toCompassTop(result.compass.y)}%`;
}

function renderAxes(axes) {
  dom.axisList.innerHTML = "";
  Object.entries(AXES).forEach(([key, meta]) => {
    const value = Math.round(axes[key]);
    const row = document.createElement("div");
    row.className = "axis-row";
    const start = value >= 0 ? 50 : 50 + value / 2;
    const width = Math.abs(value) / 2;
    row.innerHTML = `
      <header>
        <span>${meta.label}</span>
        <small>${value > 0 ? "+" : ""}${value}</small>
      </header>
      <div class="axis-bar">
        <span class="axis-fill" style="left:${start}%;width:${width}%"></span>
      </div>
      <div class="axis-copy">
        <span>${meta.left}</span>
        <span>${meta.right}</span>
      </div>
    `;
    dom.axisList.appendChild(row);
  });
}

function renderValues(values) {
  dom.valueTags.innerHTML = "";
  values.forEach((value) => {
    const tag = document.createElement("span");
    tag.textContent = value;
    dom.valueTags.appendChild(tag);
  });
}

function buildPayload(result) {
  return {
    version: CONFIG.platformVersion,
    stage: "result",
    submissionId: state.submissionId,
    profileSubmittedAt: state.profileSubmittedAt,
    submittedAt: new Date().toISOString(),
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    profile: state.profile,
    consents: state.profile.consents,
    answers: QUESTIONS.map((question, index) => ({
      index: index + 1,
      question: question.text,
      category: question.axis,
      answer: state.answers[index]
    })),
    scores: {
      pnlCompatibility: round(result.pnlCompatibility),
      band: result.band,
      profileName: result.profile.name,
      axes: mapRound(result.axes),
      dimensions: mapRound(result.dimensions),
      compass: mapRound(result.compass),
      values: result.values
    }
  };
}

function buildProfilePayload() {
  return {
    version: CONFIG.platformVersion,
    stage: "profile",
    submissionId: state.submissionId,
    submittedAt: state.profileSubmittedAt || new Date().toISOString(),
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    profile: state.profile,
    consents: state.profile.consents
  };
}

function submitToGoogleSheet(payload, options = {}) {
  const silent = Boolean(options.silent);

  if (!CONFIG.googleScriptUrl || CONFIG.googleScriptUrl.includes("PASTE")) {
    if (!silent) {
      setSyncStatus(
        "Trimiterea automată nu este activă momentan. Te rugăm să contactezi echipa CSL Timiș pentru înregistrarea rezultatului.",
        "warn"
      );
    }
    console.warn("Google Sheets endpoint missing. Configure CONFIG.googleScriptUrl in assets/app.js.");
    return;
  }

  if (payload.profile.website) {
    if (!silent) setSyncStatus("Trimitere ignorată de filtrul anti-spam.", "warn");
    return;
  }

  try {
    if (!silent) setSyncStatus("Se trimite rezultatul către Google Sheets...", "");
    const frameName = `google-sheet-transport-${payload.stage || "sync"}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const frame = document.createElement("iframe");
    frame.name = frameName;
    frame.title = "Google Sheets transport";
    frame.className = "transport-frame";
    document.body.appendChild(frame);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = CONFIG.googleScriptUrl;
    form.target = frameName;
    form.style.display = "none";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "payload";
    input.value = JSON.stringify(payload);
    form.appendChild(input);
    document.body.appendChild(form);

    let acknowledged = false;
    const cleanup = () => {
      form.remove();
      frame.remove();
    };

    frame.onload = () => {
      if (acknowledged) return;
      acknowledged = true;
      if (!silent) setSyncStatus("Rezultat trimis către Google Sheets.", "ok");
      cleanup();
    };

    form.submit();

    window.setTimeout(() => {
      if (!acknowledged) {
        if (!silent) setSyncStatus("Trimiterea a fost lansată. Verifică rândul actualizat în Google Sheets.", "warn");
        cleanup();
      }
    }, 4500);
  } catch (error) {
    if (!silent) setSyncStatus("Trimiterea către Google Sheets a eșuat local. Verifică URL-ul Web App.", "warn");
  }
}

function setSyncStatus(message, type) {
  dom.syncStatus.textContent = message;
  dom.syncStatus.classList.toggle("is-ok", type === "ok");
  dom.syncStatus.classList.toggle("is-warn", type === "warn");
}

function restart() {
  state.submissionId = createSubmissionId();
  state.profileSubmittedAt = "";
  state.questionIndex = 0;
  state.answers = Array(QUESTIONS.length).fill(null);
  state.result = null;
  state.submitted = false;
  dom.profileForm.reset();
  renderScreen("intro");
}

function toCompassLeft(value) {
  return clamp((value + 100) / 2, 9, 91);
}

function toCompassTop(value) {
  return clamp((100 - value) / 2, 17, 83);
}

function normalizePositive(value) {
  return clamp((value + 100) / 2, 0, 100);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round(value) {
  return Math.round(value * 10) / 10;
}

function mapRound(object) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, round(value)]));
}

function clean(value) {
  return String(value || "").trim();
}

function createSubmissionId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `csl-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
