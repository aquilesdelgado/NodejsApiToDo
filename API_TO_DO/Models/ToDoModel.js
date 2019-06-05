const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/tareas",{ useNewUrlParser: true });

const TareaSchema = new mongoose.Schema({
    tarea: String
});

const Tarea = mongoose.model("Tarea",TareaSchema);
module.exports= Tarea;
