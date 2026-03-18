// ===== TRANSLATIONS =====
const translations = {
  fr: {
    accueil: "Accueil", publications: "Recherche, publications", documents: "Documents",
    enseignements: "Enseignements", cv: "CV", contact: "Contact",
    downloadPdf: "Télécharger (PDF)",
    welcome: "Bienvenue sur mon site web !",
    welcomeSub: "Je suis doctorant à l'Université de Lorraine depuis octobre 2025. Ma thèse porte sur l'optimisation de forme appliquée à la conception de stents chirurgicaux. Je suis supervisé par Stéphane Cotin, Yannick Privat et Michel Duprez, et je travaille également avec Raphaël Bulle sur ces sujets.",
    documentsIntro: "Quelques documents relatifs à mon parcours, des curiosités mathématiques ou autre.",
    docName: "Nom du document", docDesc: "Description courte du document.",
    light: "Clair", dark: "Sombre", system: "Système",
  },
  en: {
    accueil: "Home", publications: "Research & Publications", documents: "Documents",
    enseignements: "Teaching (FR)", cv: "CV", contact: "Contact",
    downloadPdf: "Download (PDF)",
    welcome: "Welcome to my personal website!",
    welcomeSub: "I am a PHD student at Université de Lorraine since october 2025. I am working on shape optimization applied to chirurgical stents. My supervisors are Stéphane Cotin, Yannick Privat and Michel Duprez, and I am also working with Raphaël Bulle on these subjects.",
    documentsIntro: "Some documents related to my academic career, mathematic curiosities or other.",
    docName: "Document name", docDesc: "Short document description.",
    light: "Light", dark: "Dark", system: "System",
  }
};

// ===== STATE =====
let currentLang = localStorage.getItem("lang") || (navigator.language.startsWith("fr") ? "fr" : "en");
let currentTheme = localStorage.getItem("theme-mode") || "system";
let currentSection = window.location.hash.replace("#", "") || "accueil";

function t(key) { return translations[currentLang][key] || key; }

// ===== THEME =====
function applyTheme() {
  const isDark = currentTheme === "dark" || (currentTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem("theme-mode", currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains("dark");
  document.getElementById("theme-icon").innerHTML = isDark
    ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="none"/>'
    : '<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/><g stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></g>';
  // Update active states
  document.querySelectorAll(".theme-opt").forEach(el => {
    el.classList.toggle("active", el.dataset.mode === currentTheme);
  });
}

function setTheme(mode) { currentTheme = mode; applyTheme(); }

// ===== LANGUAGE =====
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  updateLangIcon();
  renderNav();
  renderSection();
}

function updateLangIcon() {
  const btn = document.getElementById("lang-icon");
  btn.innerHTML = currentLang === "fr"
    ? '<svg viewBox="0 0 36 24" class="flag"><rect width="12" height="24" fill="#002395"/><rect x="12" width="12" height="24" fill="#fff"/><rect x="24" width="12" height="24" fill="#ED2939"/></svg>'
    : '<svg viewBox="0 0 60 30" class="flag"><clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="t2"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t2)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>';
  document.querySelectorAll(".lang-opt").forEach(el => {
    el.classList.toggle("active", el.dataset.lang === currentLang);
  });
}

// ===== NAVIGATION =====
function navigate(section) {
  currentSection = section;
  window.location.hash = section;
  renderNav();
  renderSection();
  window.scrollTo(0, 0);
}

function renderNav() {
  const sections = ["accueil", "publications", "documents", "enseignements", "cv"];
  const ul = document.getElementById("nav-links");
  ul.innerHTML = sections.map(s =>
    `<li><a class="${s === currentSection ? 'active' : ''}" onclick="navigate('${s}')">${t(s)}</a></li>`
  ).join("");
}

// ===== SECTIONS CONTENT =====
const iconMail = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
const iconPhone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
const iconPin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';

const pdfSvg = '<svg viewBox="0 0 32 32" style="width:24px;height:24px"><path d="M6 0C4.9 0 4 .9 4 2v28c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8l-8-8H6z" fill="#E2574C"/><path d="M20 0v8h8" fill="#B53629"/><path d="M20 0l8 8h-8z" fill="#F28C82"/><text x="16" y="23" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#fff" font-family="Arial,sans-serif">PDF</text></svg>';
const halSvg = '<svg viewBox="0 0 100 32" style="height:24px;width:auto"><defs><linearGradient id="hal-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2B3990"/><stop offset="50%" stop-color="#7B2D8E"/><stop offset="100%" stop-color="#E84E1B"/></linearGradient></defs><rect rx="4" width="100" height="32" fill="url(#hal-g)"/><text x="50" y="22" text-anchor="middle" font-size="17" font-weight="bold" fill="#fff" font-family="Arial,sans-serif" letter-spacing="2">HAL</text></svg>';

function renderSection() {
  const main = document.getElementById("content");
  switch (currentSection) {
    case "accueil": main.innerHTML = renderAccueil(); break;
    case "publications": main.innerHTML = renderPublications(); break;
    case "documents": main.innerHTML = renderDocuments(); break;
    case "enseignements": main.innerHTML = renderEnseignements(); break;
    case "cv": main.innerHTML = renderCV(); break;
    default: main.innerHTML = renderAccueil();
  }
}

function renderAccueil() {
  return `<section>
    <div class="accueil-grid">
      <div class="text">
        <h1>Louis Ducongé</h1>
        <p class="subtitle">${t("welcome")}<br><br>${t("welcomeSub")}</p>
      </div>
      <img src="https://placehold.co/192x192/e2e8f0/94a3b8?text=Photo" alt="Photo" class="photo">
    </div>
    <div class="contact-card">
      <h2>${t("contact")}</h2>
      <div class="contact-row">${iconMail}<span>louis (dot) duconge (at) univ-lorraine (dot) fr</span></div>
      <div class="contact-row">${iconPin}<span>Institut Élie Cartan (équipe-projet Inria SPHINX) - Université de Lorraine - Bureau 302 - 54500 Vandoeuvre-lès-Nancy</span></div>
      <div class="contact-row">${iconPin}<span>Équipe-projet Inria MIMESIS - 2, rue Marie Hamn 67000 Strasbourg</span></div>
    </div>
  </section>`;
}

function renderPublications() {
  const data = {
    "2026": [{ title: "/", article: "#", pdf: "#", hal: "https://arxiv.org/abs/2206.04357" }],
  };
  const years = Object.keys(data).sort((a, b) => b - a);
  return `<section>
    <h2 class="section-title">${t("publications")}</h2>
    ${years.map(y => `<div class="year-group"><h3>${y}</h3>${data[y].map(p => `
      <div class="pub-item">
        <a href="${p.article}" class="title">${p.title}</a>
        <div class="pub-icons">
          ${p.pdf ? `<a href="${p.pdf}" title="PDF">${pdfSvg}</a>` : ""}
          ${p.hal ? `<a href="${p.hal}" title="HAL">${halSvg}</a>` : ""}
        </div>
      </div>`).join("")}</div>`).join("")}
  </section>`;
}

function renderDocuments() {
  return `<section>
    <h2 class="section-title">${t("documents")}</h2>
    <p style="color:var(--muted)">${t("documentsIntro")}</p>
    <div style="margin-top:1.5rem">
      <div class="item-block">
        <p class="item-title">${t("docName")}</p>
        <p class="item-desc">${t("docDesc")}</p>
        <a href="#" class="doc-link">${t("downloadPdf")} →</a>
      </div>
    </div>
  </section>`;
}

function renderEnseignements() {
  const data = {
    "2025-2026 (Mines de Nancy)": [{ niveau: "L3/1ère année", titre: "TD : Probabilités (40h)", desc: "TD de Probabilités mesures (de probabilité), intégrale de Lebesgue, vecteurs gaussiens." },
                                   { niveau: "L3/1ère année", titre: "TD : Recherche opérationnelle (20h)", desc: "Minimisation d'une fonctionnelle linéaire sous contraintes linéaires, algorithmes (du simplexe, ...), utilisation de AMPL."},
                                   { niveau: "M2/3ème année", titre: "Encadrement de projet 3A", desc: "Sujet : Une méthode éléments finis des frontières immergées : φ-FEM."}],
  };
  const years = Object.keys(data).sort((a, b) => b.localeCompare(a));
  return `<section>
    <h2 class="section-title">${t("enseignements")}</h2>
    ${years.map(y => `<div class="year-group"><h3>${y}</h3>${data[y].map(e => `
      <div class="item-block">
        <p class="label-small">${e.niveau}</p>
        <p class="item-title">${e.titre}</p>
        <p class="item-desc">${e.desc}</p>
      </div>`).join("")}</div>`).join("")}
  </section>`;
}

function renderCV() {
  return `<section>
    <h2 class="section-title">${t("cv")}</h2>
    <div class="year-group">
      <h3>${t("CV en Français")}</h3>
      <div class="item-block">
        <p class="item-title">À venir</p>
      </div>
    </div>
    <div class="year-group">
      <h3>${t("CV in English")}</h3>
      <div class="item-block">
        <p class="item-title">Soon</p>
      </div>
    </div>
  </section>`;
}

// ===== INIT =====
window.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  updateLangIcon();
  renderNav();
  renderSection();
  document.documentElement.lang = currentLang;

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (currentTheme === "system") applyTheme();
  });
});
