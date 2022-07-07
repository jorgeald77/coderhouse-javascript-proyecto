console.log("CODERHOUSE - Entregable 04: Primera entrega del proyecto final")

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
let menuGeneros = ''
let peliculasFiltradas = []
let menuPeliculas = ''
let app = true


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



// Construir menu géneros a partir de recorrer el array "generos" para mostrarlo en el Prompt.
generos.forEach( (value, index, array) => {
    menuGeneros += index + ".- " + value + "\n"
})



// Función para construir menu de peliculas segun el género elegido.
function filtrarPeliculasPorGenero(generoElegido) {
    // Dejar variables en blanco o vacias para construir un menu nuevo.
    peliculasFiltradas = []
    menuPeliculas = ''

    // Hacer uso del filter() para obtener las películas segun el genereElegido
    peliculasFiltradas = peliculas.filter((el) => el.genero.includes(generoElegido))

    // Construir menu películas a partir de recorrer el array "peliculasFiltradas" para mostrarlo en el Prompt.
    peliculasFiltradas.forEach( (value, index, array) => {
        menuPeliculas += index + ".- " + value.titulo + "\n"
    })
}



// Finalizar para finalizar el programa y mostrar resultado de los votos en el Prompt.
function finalizar() {
    // Variable para detener el ciclo "Do While"
    app = false

    // Mostrar información el Console.log
    console.log("Cantidad de votos: " + usuario.contarVotos())
    console.log("Gracias por jugar...")

    let msj = usuario.nombre + ", gracias por jugar.\n"

    // Condición para saber si el usuario ha votado por alguna película.
    if (usuario.contarVotos() > 0) {
        msj += "\nVotaste por: \n"

        usuario.votos.forEach(voto => {
            msj += "Título: " + voto.titulo + "\n"
        })
    }

    // Mostrar mensaje por Alert.
    alert(msj)
}



// Crear objeto Usuario.
const usuario = new Usuario(prompt("Cuál es tu nombre?"))
console.log("Bienvenido " + usuario.nombre)



// Ciclo para ejecutar la aplicacion.
do {
    // Mostrar menu de géneros de péliculas
    let genero = parseInt(prompt('\n' + usuario.nombre + ', elige el número del género que deseas listar? \n\n' + menuGeneros + '\n Boton cancelar para salir.'))

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
            let elegiPelicula = parseInt(prompt('\n' + usuario.nombre + ', ¿Elige el número de película tu favorita?\n\n' + menuPeliculas))

            // Validacion
            if (0 <= elegiPelicula && elegiPelicula < peliculasFiltradas.length) {
                usuario.agregarVoto(peliculasFiltradas[elegiPelicula])
                console.log("Votaste por: " + peliculasFiltradas[elegiPelicula].titulo)
            }
        } else {
            console.log("Elige una opción dispobible...")
        }
    }

} while (app)
