console.log("CODERHOUSE - Entregable 03: Incorporar Arrays")

// Definir variables y array de datos
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
const mis_votos = []
let app = true


// Construir menu géneros a partir de recorrer el array generos:
let menuGeneros = ""
generos.forEach(crearMenuGeneros)

function crearMenuGeneros(value, index, array) {
    menuGeneros += index + ".- " + value + "\n"
}


// Construir menu de peliculas segun el género elegido.
let menuPeliculas = ""

function filtrarPeliculasPorGenero(generoElegido) {
    peliculasFiltradas = []
    menuPeliculas = ""

    for (let pelicula of peliculas) {
        if (pelicula.genero === generoElegido)
            peliculasFiltradas.push(pelicula)
    }

    peliculasFiltradas.forEach(crearMenuPeliculas)

    function crearMenuPeliculas(value, index, array) {
        menuPeliculas += index + ".- " + value.titulo + "\n"
    }
}

function finalizar() {
    app = false
    console.log("Cantidad de votos: " + mis_votos.length)
    console.log("Gracias por jugar...")

    let msj = nombre + ", gracias por jugar.\n"

    if (mis_votos.length > 0) {
        msj += "\nVotaste por: \n"

        mis_votos.forEach(voto => {
            msj += "Título: " + voto.titulo + "\n"
        })
    }

    alert(msj)
}


// Obtener el nombre del usuario
const nombre = prompt('\n' + "Cuál es tu nombre?").toUpperCase()
console.log("Bienvenido " + nombre)

do {
    // Mostrar menu de géneros de péliculas
    let genero = parseInt(prompt('\n' + nombre + ', elige el número del género que deseas listar? \n\n' + menuGeneros + '\n Boton cancelar para salir.'))

    if (isNaN(genero)) {
        finalizar()
    } else {
        // Validación
        if (0 <= genero && genero < generos.length) {
            console.log("Elegiste: " + generos[genero])

            // Filtrar peliculas
            filtrarPeliculasPorGenero(generos[genero])
            console.log(menuPeliculas)

            // Mostrar menú de películas
            let elegiPelicula = parseInt(prompt('\n' + nombre + ', ¿Elige el número de película tu favorita?\n\n' + menuPeliculas))

            // Validacion
            if (0 <= elegiPelicula && elegiPelicula < peliculasFiltradas.length) {
                mis_votos.push(peliculasFiltradas[elegiPelicula])
                console.log("Votaste por: " + peliculasFiltradas[elegiPelicula].titulo)
            }
        } else {
            console.log("Elige una opción dispobible...")
        }
    }

} while (app)
