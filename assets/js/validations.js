// ===== Reglas de validación en JS (sin usar required de HTML) =====

/**
 * Campo requerido: retorna mensaje si está vacío.
 * @param {string} valor
 * @param {string} nombreCampo
 * @returns {string} mensaje de error o cadena vacía
 */
export function requerido(valor, nombreCampo = "Campo") {
  return (!valor || String(valor).trim() === "") ? `${nombreCampo} es requerido` : "";
}

/**
 * Valida correo por formato básico y dominio permitido.
 * Dominios permitidos: duoc.cl, profesor.duoc.cl, gmail.com
 * @param {string} correo
 * @returns {string} mensaje de error o cadena vacía
 */
export function dominioCorreo(correo) {
  if (!correo) return "El correo es requerido";
  if (correo.length > 100) return "El correo excede 100 caracteres";

  // formato básico de email (suficiente para frontend)
  const formatoBasico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoBasico.test(correo)) return "Formato de correo no válido";

  // dominios permitidos
  return /@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com|hotmail\.com)$/i.test(correo)
    ? ""
    : "usa un correo valido (duocuc.cl / profesor.duoc.cl / gmail.com / hotmail.com)";
}

/**
 * Comentario con máximo 500 caracteres (y requerido).
 * @param {string} texto
 * @returns {string} mensaje de error o cadena vacía
 */
export function comentarioMax500(texto) {
  const base = requerido(texto, "Comentario");
  if (base) return base;
  return texto.length > 500 ? "Comentario excede 500 caracteres" : "";
}
