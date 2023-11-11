const PostModel = require("../models/post.model");
const AutorModel = require("../models/autor.model");

//CREATE
const createPost = async (req, res) => {
  try {
    const [result] = await PostModel.insertPost(req.body);
    const [post] = await PostModel.selectPostById(result.insertId);
    res.json(post[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

//GET
//En este caso he añadido los datos del autor agregando el objeto del autor
const getAllPosts = async (req, res) => {
  try {
    const [posts] = await PostModel.selectAllPosts();
    let result = [];
    for (let post of posts) {
      const [autor] = await AutorModel.selectAutorBId(post.autor_id);
      post.autor = autor[0];
      result.push(post);
    }
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};
//En este caso he añadido los datos del autor agregando el objeto del autor
const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const [result] = await PostModel.selectPostById(postId);
    if (result[0] == undefined) {
      res.json({});
    } else {
      const autor = await AutorModel.selectAutorBId(result[0].autor_id);
      result[0].autor = autor[0];
      res.json(result[0]);
    }
  } catch (error) {
    res.json({ fatal: error.message });
  }
};
//Con diferencia al anterior, en este caso he obtenido los datos del autor a través de la query
const getPostByAutorId = async (req, res) => {
  try {
    const [autId] = req.params.autorId;
    const [result] = await PostModel.selectPostByIdAutor(autId);
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

//UPDATE
const updatePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const [result] = await PostModel.updatePostById(postId, req.body);
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

//DELETE
const detelePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const [result] = await PostModel.detelePostById(postId);
    res.json(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  getPostByAutorId,
  updatePostById,
  detelePostById,
};
