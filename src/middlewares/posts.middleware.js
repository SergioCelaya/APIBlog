const PostModel = require("../models/post.model");

const checkPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await PostModel.selectPostById(postId);
    if (result[0].length === 0) {
      return res.json({ fatal: "El post no existe" });
    }
    next();
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const checkIdIsNumeric = (req, res, next) => {
  const { postId } = req.params;
  if (isNaN(postId)) {
    return res.json({ fatal: "El identificador pasado no es numérico" });
  }
  next();
};

function isValidDate(dateString) {
  const regExp = /^\d{4}-\d{2}-\d{2}$/;
  return regExp.test(dateString) && !isNaN(Date.parse(dateString));
}

const checkBodyPost = (req, res, next) => {
  const body = req.body;
  try {
    if (typeof body.titulo != "string" || body.titulo.length > 60) {
      return res.json({ fatal: "El título es incorrecto" });
    }
    if (typeof body.descripcion != "string" || body.descripcion.length > 100) {
      return res.json({ fatal: "La descripción es incorrecta" });
    }
    if (!isValidDate(body.fecha_creacion)) {
      return res.json({ fatal: "La fecha de creación es incorrecta" });
    }
    if (typeof body.categoria != "string" || body.categoria.length > 20) {
      return res.json({ fatal: "La categoría es incorrecta" });
    }
    if (isNaN(body.autor_id)) {
      return res.json({ fatal: "El id del autor es incorrecto" });
    }
  } catch (error) {
    return es.json({ fatal: error.message });
  }
  next();
};

module.exports = { checkPostId, checkIdIsNumeric, checkBodyPost };
