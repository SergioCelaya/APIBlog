const AutorModel = require("../models/autor.model");

const checkAutorId = async (req, res, next) => {
  try {
    const { autorId } = req.params;
    const result = await AutorModel.selectAutorBId(autorId);
    if (result[0].length === 0) {
      return res.json({ fatal: "El autor no existe" });
    }
    next();
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const checkIdIsNumeric = (req, res, next) => {
  const { autorId } = req.params;
  if (isNaN(autorId)) {
    return res.json({ fatal: "El identificador pasado no es numérico" });
  }
  next();
};

// Función para verificar si una cadena es una URL válida
function isValidURL(urlString) {
  try {
    const parsedURL = new URL(urlString);
    return parsedURL.protocol === "http:" || parsedURL.protocol === "https:";
  } catch (error) {
    return false;
  }
}

function isValidEmail(email) {
  const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegExp.test(email);
}


/**
 * Middleware para verificar los valores en el cuerpo de la solicitud (req.body) relacionados con un autor.
 * Este middleware se asegura de que los datos cumplan con ciertas condiciones antes de permitir que la solicitud continúe.
 *
 * @param {object} req - Objeto de solicitud Express.js.
 * @param {object} res - Objeto de respuesta Express.js.
 * @param {function} next - Función para pasar el control al siguiente middleware o ruta.
 *
 */
const checkBodyAutor = (req, res, next) => {
  const body = req.body;
  console.log(body.nombre.length);
  if (typeof body.nombre != "string" || body.nombre.length >45) {
    return res.json({ fatal: "El nombre es incorrecto" });
  }
  if (!isValidEmail(body.email)|| body.email.length >45) {
    return res.json({ fatal: "La direccion de correo no es correcta" });
  }
  if (!isValidURL(req.body.imagen)|| body.email.length >100) {
    return res.json({ fatal: "La url de la imagen no es correcta" });
  }
  next();
};

/**
 * Middleware para verificar los valores en el cuerpo de la solicitud (req.body) relacionados con un autor.
 * Este middleware se asegura de que los datos cumplan con ciertas condiciones antes de permitir que la solicitud continúe.
 *
 * @param {object} req - Objeto de solicitud Express.js.
 * @param {object} res - Objeto de respuesta Express.js.
 * @param {function} next - Función para pasar el control al siguiente middleware o ruta.
 *
 */
const checkBodyAutorUpdate = (req, res, next) => {
  const body = req.body;
  if (body.nombre != undefined && (typeof body.nombre != "string" || body.nombre.length >45)) {
    return res.json({ fatal: "El nombre es incorrecto" });
  }
  if (body.email != undefined && (!isValidEmail(body.email)|| body.email.length >45)) {
    return res.json({ fatal: "La direccion de correo no es correcta" });
  }
  if (body.imagen != undefined && (!isValidURL(body.imagen)|| body.imagen.length >100)) {
    return res.json({ fatal: "La url de la imagen no es correcta" });
  }
  next();
};

module.exports = { checkAutorId,checkBodyAutor,checkIdIsNumeric,checkBodyAutorUpdate };
