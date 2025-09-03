export function required(value, name = "Campo") {
  return (!value || String(value).trim() === "") ? `${name} es requerido` : "";
}

export function emailDomain(email) {
  if (!email) return "El correo es requerido";
  if (email.length > 100) return "El correo excede 100 caracteres";
  return /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(email)
    ? ""
    : "Dominio no permitido (duoc.cl / profesor.duoc.cl / gmail.com)";
}

export function commentMax500(text) {
  const base = required(text, "Comentario");
  if (base) return base;
  return text.length > 500 ? "Comentario excede 500 caracteres" : "";
}
