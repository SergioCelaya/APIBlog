const router = require("express").Router();

const PostsController = require("../../controllers/posts.controller");
const MiddlewarePosts = require("../../middlewares/posts.middleware");
const MiddlewaresAutores = require("../../middlewares/autores.middleware");

//CREATE
router.post("/",MiddlewarePosts.checkBodyPost, PostsController.createPost);
//GET
router.get("/", PostsController.getAllPosts);
router.get("/:postId",MiddlewarePosts.checkIdIsNumeric, PostsController.getPostById);
router.get("/byAutorId/:autorId",MiddlewaresAutores.checkIdIsNumeric,MiddlewaresAutores.checkAutorId, PostsController.getPostByAutorId);
//UPDATE
router.put("/:postId",MiddlewarePosts.checkIdIsNumeric,MiddlewarePosts.checkBodyPost,MiddlewarePosts.checkPostId,PostsController.updatePostById);
//DELETE
router.delete("/:postId",MiddlewarePosts.checkIdIsNumeric,MiddlewarePosts.checkPostId, PostsController.detelePostById);

module.exports = router;
