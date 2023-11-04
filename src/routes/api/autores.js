const router = require("express").Router();
const AutoresController = require("../../controllers/autores.controller");
const MiddlewaresAutores = require("../../middlewares/autores.middleware");

//GET
router.get("/", AutoresController.getAllAutores);
router.get("/:autorId",MiddlewaresAutores.checkIdIsNumeric, AutoresController.getAutorById);
//CREATE
router.post("/", MiddlewaresAutores.checkBodyAutor,AutoresController.createAutor);
//UPDATE
router.put("/:autorId", MiddlewaresAutores.checkIdIsNumeric,MiddlewaresAutores.checkAutorId,MiddlewaresAutores.checkBodyAutorUpdate,AutoresController.updateAutorById);
//DELETE
router.delete("/:autorId",MiddlewaresAutores.checkIdIsNumeric,MiddlewaresAutores.checkAutorId, AutoresController.deleteAutorById);

module.exports = router;
