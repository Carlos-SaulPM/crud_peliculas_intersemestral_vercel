//Configuración de base de datos
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://saul:110403@webhook.wpsjgqg.mongodb.net/";
const client = new MongoClient(uri);
const dataBase = "Pruebas";
const collectionName = "peliculas";

async function getCollectionAsync() {
  await client.connect();
  const db = client.db(dataBase);
  const collection = db.collection(collectionName);

  return collection;
}

async function obtenerTodos() {
  const collection = await getCollectionAsync();
  var query = {};
  var resultado = await collection.find(query).toArray();

  return resultado;
}

async function obtenerPorId(id) {
  const collection = await getCollectionAsync();
  const pelicula = await collection.findOne({ id: Number(id) });

  return pelicula;
}

async function agregar(pelicula) {
  const collection = await getCollectionAsync();
  pelicula.id = (await collection.countDocuments()) + 1;
  let resultado = await collection.insertOne(pelicula);
  return pelicula.id;
}

/**
 * Actualizar pelicula
 * @param {number} id
 * @param {pelicula} pelicula
 */
async function actualizar(id, pelicula) {
  const collection = await getCollectionAsync();
  const query = { id: Number(id) };
  await collection.updateOne(query, { $set: pelicula });
}

module.exports = {
  obtenerPorId,
  obtenerTodos,
  agregar,
  actualizar,
};
