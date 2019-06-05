const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
let tareas = {
    "tarea-1": "Pasear al perro",

    "tarea-2": "Practicar fagot",

    "tarea-3": "Lavar la taza del café",

    "tarea-4": "Preguntarle a Roberto como va con los ejercicios de esta semana",

    "tarea-5": "Escuchar el consejo de mi preciosa",

    "tarea-6": "Practicar el trabalenguas SCSS",

    "tarea-7": "Seguir los consejos de mi preciosa"

};

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/tareas",(req,res) => {
    res.json(tareas);
});

app.get("/tareas/:id",(req,res) => {
    let datosMovie = movie[req.param("id")];
    console.log(req)

    res.json(datosMovie);
});

app.post("/tareas",(req, res) => {
    let idNew = Object.keys(tareas).length;
    idNew = (idNew+1);
    idNew = "tarea-"+idNew.toString();
    console.log(req);
    tareas[idNew] = req.body;
    res.json(tareas);
    console.log(tareas[idNew]);

});

// app.put("/tareas/:id",(req,res) =>{
//     let id = req.param("id");
//     movie[id] = {...movie[id],...req.body};
//     res.json(movie);
// });
//
app.delete("/tareas/:id",(req,res) => {
    delete tareas[req.param("id")];
    res.json(tareas);
});


app.listen(3000);