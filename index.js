const {
  obtenerRegistros,
  agregarRegistros,
  modificarRegistro,
  eliminarRegistro,
} = require("./consultas");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor levantado en el puerto 3000");
});

app.get("/", (req, res) => {
  res.send("App like me");
});

// Obtener registros
app.get("/posts", async (res, req) => {
  try {
    const registros = await obtenerRegistros();
    res.json(registros);
  } catch ({error, message}) {
    console.error("Error al buscar los registros", error);
    res.status(500).send(message);
  }
});

//agregar registro
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body;
    await agregarRegistros(titulo, img, descripcion, likes);
    res.send("Registro agregado con exito");
  } catch ({error, message}) {
    console.error("Error al agregar el registro", error);
    res.status(500).send(message);
  }
});

//modificar descripcion
app.put("/posts/descripcion/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.query;
    await modificarRegistro(descripcion, id);
    res.send("Descripcion de post modificado con éxito");
  } catch ({error, message}) {
    console.error("Error al modificar la descripcion", error);
    res.status(500).send(message);
  }
});

//eliminar un post
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarRegistro(id);
    res.send("Post eliminado con éxito");
  } catch ({error, message}) {
    console.error("No se pudo eliminar el post", error);
    res.status(500).send(message);
  }
});
