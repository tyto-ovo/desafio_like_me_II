const pool = require("./conexion");

const obtenerRegistros = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const agregarRegistro = async (titulo, img, descripcion, likes) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, descripcion, likes];
  const result = await pool.query(consulta, values);
  console.log("Registro agregado");
};

const modificarRegistro = async (descripcion, id) => {
  const consulta = "UPDATE posts SET descripcion = $1 WHERE if = $2";
  const values = [descripcion, id];
  const result = await pool.query(consulta, values);
};

const eliminarRegistro = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, id);
};

module.exports = {
  obtenerRegistros,
  agregarRegistro,
  modificarRegistro,
  eliminarRegistro,
};
