document.addEventListener('DOMcontentLoaded',obtenerJsonPokemo());
const listaEntrendores=document.querySelector('#tablaListaEntrenadores');
const listapokemonindex=document.querySelector("#listaPokemonIndex tbody");
let arregloAnterior=[];

function obtenerJsonPokemo(){
    fetch('data/pokemon.json')
    .then(respuesta=>respuesta.json())
    .then(resultado=>{
        console.log(resultado);
        mostrarListaPokemonIndex(resultado);
    })
}
function mostrarListaPokemonIndex(e){
    while(listapokemonindex.firstChild) {
        listapokemonindex.removeChild(listapokemonindex.firstChild);
    }
    e.forEach(element => {
        const {id,nombre,tipo}=element;
        const row=document.createElement('tr');
        row.innerHTML = `
               <td>${id}</td>
               <td>${nombre}</td>
               <td>${tipo} </td>
                <td>
                    <a href="#" class="atraparPokemo" nombrePokemon="${nombre}" data-id="${id}">Atrapar</a>
                </td>
          `;
          listapokemonindex.appendChild(row);
    });

}
//.......le pone la marca par sacar los datos del boton de atrapar///   
listapokemonindex.addEventListener('click',agregarElpoke);
//funcion que primero se trae el anterior arreglo y luego lo actualiza///
function sacarArregloAnterior(){
    firebase.database().ref('entrenador/'+document.querySelector('#txNombre').value).on('value',function(snapshot){
        snapshot.val().listaPokeDB.forEach(element=>{
            arregloAnterior.push(element);
        })
    });
}
/////////
function agregarElpoke(e){
    if(document.querySelector('#txNombre').value!=''){
        if(e.target.classList.contains('atraparPokemo')){ 
            sacarArregloAnterior(); 
            console.log(arregloAnterior);          
            arregloAnterior.push(e.target.getAttribute('nombrePokemon'))
            firebase.database().ref('entrenador/'+document.querySelector('#txNombre').value).update({
                listaPokeDB:arregloAnterior
            }); 
            console.log(arregloAnterior);  
            window.location.reload();
        }       
    }
}
///////////////.....metodos para eliminar un entrenador......//
listaEntrendores.addEventListener('click',eliminarEntrendor);
function eliminarEntrendor(e){
    if(e.target.classList.contains('eliminarEntrenador')){
        let nombreEntrenador=e.target.getAttribute('nombreEntrenador');
        firebase.database().ref('entrenador/'+nombreEntrenador).remove();
        window.location.reload();
    }
}