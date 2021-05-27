let pokeArray=[];
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDiUZGmE9Bpb9Mgu1dSP6Pv50RfD6AVFpc",
    authDomain: "pokebd-a465b.firebaseapp.com",
    databaseURL: "https://pokebd-a465b-default-rtdb.firebaseio.com",
    projectId: "pokebd-a465b",
    storageBucket: "pokebd-a465b.appspot.com",
    messagingSenderId: "690342916899",
    appId: "1:690342916899:web:766aa27fc48adb15b8d296"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  ///////////////////////////////////////////////////////////////////

var nombre,apellido;
function ready(){
    nombre=document.querySelector('#nombre').value;
    apellido=document.querySelector('#apellido').value;
}
  ////////////insertar datos///////////
function agregarUsuario(){
    console.log('esta agregando');
    ready();
    console.log(nombre+apellido);
    firebase.database().ref('entrenador/'+nombre).set({
        nombreDB:nombre,
        apellidoDB:apellido,
        listaPokeDB:pokeArray
    });
}
////////sacar la info de la bd/////
const resultado=document.querySelector('#tablaListaEntrenadores tbody');
cargarEntrenadores();
function cargarEntrenadores(){
    document.addEventListener('DOMContentLoaded', () => {
        const userDataRef=firebase.database().ref('entrenador');
        userDataRef.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {             
              var nombre = childSnapshot.val().nombreDB;
              var apellido = childSnapshot.val().apellidoDB;
              var lista=  childSnapshot.val().listaPokeDB;
             // console.log(nombre+lista);
              //muestra en el html
              const  tr=document.createElement('tr');  
              tr.innerHTML=`
                        <td>${nombre}</td>
                        <td>${apellido}</td>
                        <td>${lista}</td>
                        <td ><a href="#" class="eliminarEntrenador" nombreEntrenador="${nombre}">Eliminar</a></td>
              `
              resultado.appendChild(tr);  
              });
            });
   });
}
/////////////////
document.getElementById('enviarInfo').onclick=(e)=>{
    ready();
    if(nombre!=''&&apellido!=''&&pokeArray.length>0){
   // e.preventDefault();
    agregarUsuario();
    pokeArray=[];
    limpiarForm();
    }
    //location.href='./index.html'
}
function limpiarForm(){
    document.querySelector('#nombre').value='';
    document.querySelector('#apellido').value='';

}
////////////////////////////////////AGREGAR pokemon a la db/////////////////
const listaPokemon=document.querySelector('#divlistapokemon');
document.addEventListener('DOMcontentLoaded',obtenerJsonPokemon());
listaPokemon.addEventListener('click',agregarPokemonArray);
function obtenerJsonPokemon(){
    fetch('data/pokemon.json')
    .then(respuesta=>respuesta.json())
    .then(resultado=>{
       // console.log(resultado);
        mostrarListaPokemon(resultado);
    })
}

function mostrarListaPokemon(e){
    while(listaPokemon.firstChild) {
        listaPokemon.removeChild(listaPokemon.firstChild);
    }
    e.forEach(element => {
        const {id,nombre,tipo}=element;
        const row=document.createElement('tr');
        row.innerHTML = `
               <td>${id}</td>
               <td>${nombre}</td>
               <td>${tipo} </td>
                <td>
                    <a href="#" class="atraparPokemon" nombrePokemon="${nombre}" data-id="${id}">Atrapar</a>
                </td>
          `;
          listaPokemon.appendChild(row);
    });

}
function agregarPokemonArray(e){
    if(e.target.classList.contains('atraparPokemon')){
        console.log(e.target.getAttribute('nombrePokemon'));
        pokeArray=[...pokeArray,e.target.getAttribute('nombrePokemon')]
        console.log(pokeArray);
    }
}

///////////////FIN--agregar lista de pokemon a la db///////////////