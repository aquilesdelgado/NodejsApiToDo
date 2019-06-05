let lista = document.querySelector(".Todo__ul");
let dbsId =[];
function recorrer() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    fetch("http://localhost:3000/tareas")
        .then(res => {
            return res.json();
        })
        .then(e => {
            pintar(e);
        });

    function pintar(datos) {
        for (let i in datos) {


            let fila = document.createElement("li");
            let boton = document.createElement("button");
            let boton1 = document.createElement("button");


            fila.innerText = datos[i].tarea;
            fila.id = "prueba"+datos[i]._id;


            console.log(fila.id);

            boton.innerText = ("Editar");
            boton.id = "prueba"+datos[i]._id;
            boton.className = "Todo__boton";
            boton.addEventListener("click", editar, false);

            boton1.innerText = ("Eliminar");
            boton1.id = "botton"+datos[i]._id;
            boton1.className = "Todo__boton1";
            boton1.addEventListener("click", borrar, false);

            fila.appendChild(boton);
            fila.appendChild(boton1);
            lista.appendChild(fila);
            console.log(typeof boton.id,boton1.id);
        }
    }
}

let focus = document.querySelector(".Todo__input");
focus.addEventListener("focus", activarBoton,false);

function activarBoton() {

    let botonGuardar = document.querySelector(".Todo__boton2");
    botonGuardar.addEventListener("click", guardar, false);

}
        function guardar() {

            let input = document.querySelector(".Todo__input");
            input = input["value"];
            let json = JSON.stringify({tarea : input});
            let post = {
                method: "POST",
                headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                body: json
            };
            fetch("http://localhost:3000/tareas", post)
                .then(res=> {
                    return res.json();
                    // recorrer();
                })
                .then(datos=> {
                    recorrer();
                    let botonGuardar = document.querySelector(".Todo__boton2");
                    botonGuardar.removeEventListener("click", guardar, false);

                });

        }


        function borrar(event) {
            let idClick = event.target.id;
            idClick= idClick.slice(-24);
            let init = {method: 'delete',
                headers:{
                    'Content-Type': 'application/json'
                }};
            fetch("http://localhost:3000/tareas/"+idClick,init)
                .then(res=> {
                    return res.json();
                })
                .then(datos=>{recorrer();})
        }

        function editar(event) {

            let botonActualizar = document.querySelector(".Todo__boton2");
            botonActualizar.addEventListener("click",actualizar,false);
            botonActualizar.innerText = ("Actualizar");


            let id = event.target.id;
            let input = document.querySelector(".Todo__input");
            let valor = document.querySelector(`#${id}`);
            console.log(valor);
            valor = valor.childNodes[0];
            input["value"] = valor.textContent;
            id= id.slice(-24);
            console.log(id);





            function actualizar() {

            let input2 = document.querySelector(".Todo__input");
            input2 = input2["value"];
            let botonActualizar = document.querySelector(".Todo__boton2");
            botonActualizar.removeEventListener("click",guardar,false);
            let json = JSON.stringify({"tarea": input2});
            let put = {
                method: "PUT",
                headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                body: json
            };
            fetch("http://localhost:3000/tareas/"+id, put)
                .then(res=> {
                    return res.json();
                })
                .then(datos=>{
                    recorrer();
                });

                    botonActualizar.removeEventListener("click",actualizar,false);
                    botonActualizar.innerText = ("Guardar");
            }

        }
recorrer();


