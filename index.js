const express = require("express");
const cors = require("cors");
const app = express();

const {
  agregar,
  obtenerPorId,
  obtenerTodos,
  actualizar,
} = require("./pelicula.repositorio");

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.json({ mensaje: "Hola mundo" });
});


app.get("/api/peliculas", async (req, res) => {
  const peliculas = await obtenerTodos();
  res.status(200).json(peliculas);
});


app.get("/api/peliculas/:id", async (req, res) => {
  let pelicula = await obtenerPorId(req.params.id);
  if (pelicula == undefined)
    return res
      .status(404)
      .json({ mensaje: "Pelicula no encontrada con el id: " + req.params.id });
  return res.status(200).json(pelicula);
});


app.post("/api/peliculas/", async (req, res) => {
  let pelicula = {
    titulo: req.body.titulo,
    visto: false,
    resumen: req.body.resumen,
  };
  let id = await agregar(pelicula);
  res.status(201).json(pelicula);
});


app.put("/api/peliculas/:id", async (req, res) => {
  let pelicula = {
    titulo: req.body.titulo,
    visto: false,
    resumen: req.body.resumen,
  };
  let id = req.params.id;
  await actualizar(id, pelicula);
  res.status(202).json(pelicula);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
