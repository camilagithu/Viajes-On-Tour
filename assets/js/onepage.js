// ===== One Page + Validación con MODAL =====
import {
  requerido as required,
  dominioCorreo as emailDomain,
  comentarioMax500 as commentMax500
} from "./validations.js";

/* -------- Scroll suave -------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  });
});

/* -------- Menú activo + Validación -------- */
document.addEventListener("DOMContentLoaded", () => {
  // Menú activo
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#']");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove("active"));
        link?.classList.add("active");
      }
    });
  }, { rootMargin: "-50% 0px -50% 0px" });
  sections.forEach(sec => observer.observe(sec));

  // ---------- MODAL ----------
  const overlay  = document.getElementById("popup-overlay");
  const content  = document.getElementById("popup-content");
  const titleEl  = document.getElementById("popup-title");
  const msgEl    = document.getElementById("popup-message");
  const btnClose = document.getElementById("popup-close");

  function showPopup(title, message, type = "error") {
    titleEl.textContent = title;
    msgEl.textContent = message;
    content.classList.remove("success");
    if (type === "success") content.classList.add("success");
    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");
    btnClose?.focus();
  }
  function hidePopup() {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
  }
  btnClose?.addEventListener("click", hidePopup);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) hidePopup();
  });

  // ---------- Validación del formulario ----------
  const form  = document.getElementById("form-contacto");
  if (!form) return;

  const nameEl = document.getElementById("ct-name");
  const mailEl = document.getElementById("ct-email");
  const msgElF = document.getElementById("ct-msg");

  // Aplica error al contenedor .field (para tooltip local)
  function setError(input, message) {
    const field = input.closest(".field");
    if (!field) return;
    if (message) {
      field.classList.add("input-error");
      field.setAttribute("data-error", message);
      input.setAttribute("aria-invalid", "true");
    } else {
      field.classList.remove("input-error");
      field.removeAttribute("data-error");
      input.removeAttribute("aria-invalid");
    }
  }

  function validateAll() {
    const errs = [];
    const nameMsg = required(nameEl.value, "Nombre");
    const mailMsg = emailDomain(mailEl.value);
    const msgMsg  = commentMax500(msgElF.value);

    setError(nameEl, nameMsg);
    setError(mailEl, mailMsg);
    setError(msgElF, msgMsg);

    if (nameMsg) errs.push(nameMsg);
    if (mailMsg) errs.push(mailMsg);
    if (msgMsg)  errs.push(msgMsg);

    return errs;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // no envío nativo
    const errores = validateAll();
    if (errores.length) {
      showPopup("¡Hubo un error!", errores.join("\n"), "error");
      return;
    }
    form.reset();
    [nameEl, mailEl, msgElF].forEach(el => setError(el, ""));
    showPopup("¡Mensaje enviado con éxito!", "Nos pondremos en contacto contigo pronto.", "success");
  });

  // Validación en tiempo real
  [nameEl, mailEl, msgElF].forEach(el => {
    el.addEventListener("input", () => validateAll());
    el.addEventListener("blur",  () => validateAll());
  });
});
