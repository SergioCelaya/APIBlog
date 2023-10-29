const router = require("express").Router();
const AutoresController = require("../../controllers/autores.controller");
const MiddlewaresAutores = require("../../middlewares/autores.middleware");

//CREATE
router.post("/", MiddlewaresAutores.checkBodyAutor,AutoresController.createAutor);
//GET
router.get("/", AutoresController.getAllAutores);
router.get("/:autorId",MiddlewaresAutores.checkIdIsNumeric, AutoresController.getAutorById);
//UPDATE
router.put("/:autorId", MiddlewaresAutores.checkIdIsNumeric,MiddlewaresAutores.checkAutorId,AutoresController.updateAutorById);
//DELETE
router.delete("/:autorId",MiddlewaresAutores.checkIdIsNumeric,MiddlewaresAutores.checkAutorId, AutoresController.deleteAutorById);

module.exports = router;
