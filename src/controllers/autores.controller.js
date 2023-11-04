const autorModel = require("../models/autor.model");
const postmodel = require("../models/post.model");

//CREATE
const createAutor = async (req, res) => {
  try {
    const [insertResult] = await autorModel.createAutor(req.body);
    const [result] = await autorModel.selectAutorBId(insertResult.insertId);
    res.json(result[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

//GET
const getAllAutores = async (req, res) => {
  try {
    const result = await autorModel.getAllAutores();
    res.json(result[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getAutorById = async (req, res) => {
  try {
    const [result] = await autorModel.selectAutorBId(req.params.autorId);
    if (result[0] == undefined) {
      res.json({});
    } else {
      res.json(result[0]);
    }
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

//UPDATE
const updateAutorById = async (req, res) => {
  try {
    const { autorId } = req.params;
    const [autor] = await autorModel.selectAutorBId(autorId);
    if (req.body.nombre == undefined) {
      req.body.nombre = autor[0].nombre;
    }
    if (req.body.email == undefined) {
      req.body.email = autor[0].email;
    }
    if (req.body.imagen == undefined) {
      req.body.imagen = autor[0].imagen;
    }
    const [result] = await autorModel.updateAutorById(autorId, req.body);
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

//DELETE
const deleteAutorById = async (req, res) => {
  try {
    const { autorId } = req.params;
    const delPost = await postmodel.deletePostFromAutorById(autorId);
    console.log(delPost);
    const [result] = await autorModel.deteleAutorById(autorId);
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

module.exports = {
  createAutor,
  getAllAutores,
  getAutorById,
  updateAutorById,
  deleteAutorById,
};
