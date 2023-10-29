//CREATE
const createAutor = ({ nombre, email, imagen }) => {
  return db.query("insert into autores (nombre,email,imagen) values (?,?,?)", [
    nombre,
    email,
    imagen,
  ]);
};
//GET
const selectAutorBId = (idAutor) => {
  return db.query("select * from autores where idautor = ?", [idAutor]);
};

const getAllAutores = () => {
  return db.query("select * from autores");
};
//UPDATE
const updateAutorById = (idAutor, { nombre, email, imagen }) => {
  return db.query(
    "update autores set nombre = ? , email  = ? , imagen = ? where idAutor = ?",
    [nombre, email, imagen, idAutor]
  );
};
//DELETE
const deteleAutorById = (autorId) => {
  return db.query("delete from autores where idAutor = ?", [autorId]);
};

module.exports = {
  selectAutorBId,
  getAllAutores,
  createAutor,
  updateAutorById,
  deteleAutorById,
};
