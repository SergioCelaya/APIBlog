const AutorModel = require("../models/autor.model");

const checkAutorId = async (req, res, next) => {
  try {
    const { autorId } = req.params;
    const result = await AutorModel.selectAutorBId(autorId);
    console.log(result[0]);
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

module.exports = { checkAutorId,checkBodyAutor,checkIdIsNumeric };
