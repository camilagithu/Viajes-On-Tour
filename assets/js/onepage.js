import { required, emailDomain, commentMax500 } from "./validations.js";

// Scroll suave
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

// Resaltar sección activa
document.addEventListener("DOMContentLoaded", () => {
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

  // Validación del formulario
  const form = document.getElementById("form-contacto");
  if (!form) return;

  const nameEl = document.getElementById("ct-name");
  const mailEl = document.getElementById("ct-email");
  const msgEl  = document.getElementById("ct-msg");

  const errName = document.getElementById("err-ct-name");
  const errMail = document.getElementById("err-ct-email");
  const errMsg  = document.getElementById("err-ct-msg");

  function validateAll() {
    errName.textContent = required(nameEl.value, "Nombre");
    errMail.textContent = emailDomain(mailEl.value);
    errMsg.textContent  = commentMax500(msgEl.value);
    return [errName, errMail, errMsg].every(el => el.textContent === "");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateAll()) {
      alert("Mensaje enviado (demo). ¡Gracias por contactarnos!");
      form.reset();
    }
  });

  [nameEl, mailEl, msgEl].forEach(el => {
    el.addEventListener("input", () => validateAll());
    el.addEventListener("blur",  () => validateAll());
  });
});
