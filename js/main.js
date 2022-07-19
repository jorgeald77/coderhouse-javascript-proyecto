console.log("CODERHOUSE - Entregable 07: 2a Entrega del Proyecto Fina")

// Elementos del DOM
const containerUsuario = document.getElementById('container-usuario')
const formUsuario = document.getElementById('form-usuario')
const containerApp = document.getElementById('container-app')

const tagBievendia = document.getElementById('tag-bienvenido')
const tagMisVotos = document.getElementById('tag-misvotos')
const tagItemsVotos = document.getElementById('tag-items-votos')

const elementGeneros = document.getElementById('generos')
const elementPeliculas = document.getElementById('peliculas')
const elementNumVotos = document.getElementById('numvotos')

// Variables necesarias
const generos = ['acción', 'comedia', 'suspenso', 'terror']
const peliculas = [
    {cod: 'A0', titulo: 'Top Gun: Maverick', genero: 'acción'},
    {cod: 'A1', titulo: 'Interceptor', genero: 'acción'},
    {cod: 'A2', titulo: 'Prisioneros de Ghostland', genero: 'acción'},
    {cod: 'A3', titulo: 'Agentes 355', genero: 'acción'},

    {cod: 'C0', titulo: 'Cásate conmigo', genero: 'comedia'},
    {cod: 'C1', titulo: 'Agentes 355', genero: 'comedia'},
    {cod: 'C2', titulo: 'Jackass forever', genero: 'comedia'},
    {cod: 'C3', titulo: 'I want you back', genero: 'comedia'},

    {cod: 'S0', titulo: 'Pienso en el final', genero: 'suspenso'},
    {cod: 'S1', titulo: 'Hannibal', genero: 'suspenso'},
    {cod: 'S2', titulo: 'El juego', genero: 'suspenso'},
    {cod: 'S3', titulo: 'La cabeza de la araña', genero: 'suspenso'},

    {cod: 'T0', titulo: 'La abuela', genero: 'terror'},
    {cod: 'T1', titulo: 'Scream', genero: 'terror'},
    {cod: 'T2', titulo: 'El páramo', genero: 'terror'},
    {cod: 'T3', titulo: 'Black phone', genero: 'terror'},
]
let peliculasFiltradas = []



// Definición de clase
class Usuario {
    constructor(nombre) {
        if (nombre.length > 0)
            this.nombre = nombre.toUpperCase()
        else {
            this.nombre = 'ANÓNIMO'
        }

        this.votos = []
    }

    //  Contar los votos del usuarios
    contarVotos() {
        return this.votos.length
    }

    // Agregar la pelicula por la que el usuario voto, no permitir duplicados
    agregarVoto(peli) {
        if(this.votos.some((el) => el.cod == peli.cod) == false)
            this.votos.push(peli)
    }
}

// Inicializar elemento Select con los géneros disponibles
generos.forEach( (value, index, array) => {
    elementGeneros.innerHTML += `<option value="${value}"><span class="uppercase">${value}</span></option>`
})


// Función para construir menu de peliculas segun el género elegido.
function filtrarPeliculasPorGenero(generoElegido) {
    // Dejar variables en blanco o vacias para construir un menu nuevo.
    peliculasFiltradas = []

    // Hacer uso del filter() para obtener las películas segun el genereElegido
    peliculasFiltradas = peliculas.filter((el) => el.genero.includes(generoElegido))

    // Construir menu películas a partir de recorrer el array "peliculasFiltradas" para mostrarlo en el Prompt.
    peliculasFiltradas.forEach( (value, index, array) => {
        elementPeliculas.innerHTML += `<button role="button" class="btn-pelicula" aria-cod="${value.cod}">${value.titulo}</button>`
    })
}




/*
1.- Solicitar nombre del usuario con Formulario para crear objeto usuario
2.-
3.-
4.-
*/



// Crear objeto Usuario.
//const usuario = new Usuario(prompt("Cuál es tu nombre?"))
formUsuario.addEventListener('submit', (e) => {
    e.preventDefault()
    new Usuario(document.getElementById('username').value)
    // Ocultar el formulario y aparecen películas para votación
    containerUsuario.style.display = 'none'
    containerApp.style.display =  'block'

})

tagBievendia.innerHTML = 'Bienvenido <strong>' + usuario.nombre + '</strong>'


// Evento cuando el elemeto Selecte cambia de opcion.
elementGeneros.addEventListener('change', (e) => {
    elementPeliculas.innerHTML = ''
    if(e.target.value == '') {
        alert("Por favor, seleciona un género de películas.")
    } else {
        filtrarPeliculasPorGenero(e.target.value)
    }
})

// Evento cuando hace click en un boton película para registrar el voto
elementPeliculas.addEventListener("click", (e) => {
    console.log(e.target.getAttribute('aria-cod'))
    usuario.agregarVoto(peliculasFiltradas.find((el) => el.cod == e.target.getAttribute('aria-cod')))
    
    // Contar elemento y manipular con el DOM
    elementNumVotos.innerText = usuario.contarVotos()

    // Mostrar Títulos de peliculas elegidas
    tagItemsVotos.innerHTML = ""
    usuario.votos.forEach(voto => {
        tagItemsVotos.innerHTML += "<li class='ml-1'><p>"+ voto.titulo +"</p></li>"
    })
})