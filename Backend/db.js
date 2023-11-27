import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

client.connect().then(function(){
    console.log("Dase conectada");
    const db = client.db("GAMEJAM_BASE");
    
}).catch(function(){
    console.log("No se pudo conectar");
});