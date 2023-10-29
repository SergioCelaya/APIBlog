//CREATE
const insertPost = ({
  titulo,
  descripcion,
  fecha_creacion,
  categoria,
  autor_id,
}) => {
  return db.query(
    "insert into posts (titulo,descripcion,fecha_creacion,categoria,autor_id) values (?,?,?,?,?)",
    [titulo, descripcion, fecha_creacion, categoria, autor_id]
  );
};
//GET
const selectAllPosts = () => {
  return db.query("select * from posts");
};

const selectPostById = (postId) => {
  return db.query("select * from posts where idpost = ?", [postId]);
};

const selectPostByIdAutor = (autorId) => {
  return db.query("select * from posts where autor_id = ?", [autorId]);
};
//UPDATE
const updatePostById = (
  postId,
  { titulo, descripcion, fecha_creacion, categoria, autor_id }
) => {
  return db.query(
    "update posts set titulo = ?, descripcion = ?, fecha_creacion = ?,categoria = ?,autor_id = ? where idpost = ?",
    [titulo, descripcion, fecha_creacion, categoria, autor_id, postId]
  );
};
//DELETE
const detelePostById = (postId) => {
  return db.query("delete from posts where idpost = ?", postId);
};

const deletePostFromAutorById = (autorId) => {
  return db.query("delete from posts where autor_id = ?", [autorId]);
};

module.exports = {
  selectAllPosts,
  selectPostById,
  insertPost,
  selectPostByIdAutor,
  deletePostFromAutorById,
  updatePostById,
  detelePostById,
};
