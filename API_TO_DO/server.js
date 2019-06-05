const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/tareas",{ useNewUrlParser: true });

let db = mongoose.connection;
db.on("errror", console.error.bind(console, "connection error:"));

db.once("open", function () {
    console.log("Estamos conectados");
});
const Tarea = require("./Models/ToDoModel");


app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/tareas",(req,res) => {
    Tarea.find({},(err,tareas)=> {
        if(err){
            return res.send("Error al cargar datos");
        }
        return res.json(tareas);
    })
});
app.post("/tareas",(req,res) => {
    const env = new Tarea(req.body);
    env.save((err,tarea)=> {
        if (err){
            return response.status(500).send({error: "Fallo"});
        }
        return res.json(tarea);
    });
});
app.delete("/tareas/:id",(req,res) =>{
    let id= req.param('id');
    Tarea.findOneAndDelete({_id:id},(err,tarea)=>{
        if(err){
            return res.send({error:"ERROR AL CARGAR DATOS"});
        }
        return res.json(tarea);
    });
});
app.put("/tareas/:id",(req,res) =>{
    let id= req.param('id');
    let update = req.body;
    Tarea.findOneAndUpdate({_id:id},update,(err,tarea)=>{
        if(err){
            return res.send({error:"ERROR AL CARGAR DATOS"});
        }
        return res.json(tarea);
    });
});



app.listen(3000);
