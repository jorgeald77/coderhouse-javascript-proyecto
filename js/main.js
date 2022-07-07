console.log("CODERHOUSE - Entregable 02: Simulador interactivo")

const nombre = prompt("Cuál es tu nombre?").toUpperCase()
console.log("Bienvenido " + nombre)

function menuGenero() {
    return "1 - Acción\n" +
        "2 - Comedia\n" +
        "3 - Suspenso\n" +
        "4 - Terror\n" +
        "5 - Terminar votación\n"
}

function menuAccion() {
    return "1 - Top Gun: Maverick\n" +
        "2 - Interceptor\n" +
        "3 - Prisioneros de Ghostland\n" +
        "4 - Agentes 355\n"
}

function menuSuspenso() {
    return "1 - Pienso en el final\n" +
        "2 - Hannibal\n" +
        "3 - El juego\n" +
        "4 - La cabeza de la araña\n"
}

function menuTerror() {
    return "1 - La abuela\n" +
        "2 - Scream\n" +
        "3 - El páramo\n" +
        "4 - Black phone\n"
}

function menuComedia() {
    return "1 - Cásate conmigo\n" +
        "2 - Jackass forever\n" +
        "3 - I want you back\n" +
        "4 - Red\n"
}

function votoAccion(pelicula) {
    let voto
    switch (pelicula) {
        case '1':
            voto = 'Top Gun: Maverick\n'
            break
        case '2':
            voto = 'Interceptor\n'
            break
        case '3':
            voto = 'Prisioneros de Ghostland\n'
            break
        case '4':
            voto = 'Agentes 355\n'
            break
    }
    return voto
}

function votoSuspenso(pelicula) {
    let voto
    switch (pelicula) {
        case '1':
            voto = 'Pienso en el final\n'
            break
        case '2':
            voto = 'Hannibal\n'
            break
        case '3':
            voto = 'El juego\n'
            break
        case '4':
            voto = 'La cabeza de la araña\n'
            break
    }
    return voto
}

function votoTerror(pelicula) {
    let voto
    switch (pelicula) {
        case '1':
            voto = 'La abuela\n'
            break
        case '2':
            voto = 'Scream\n'
            break
        case '3':
            voto = 'El páramo\n'
            break
        case '4':
            voto = 'Black phone\n'
            break
    }
    return voto
}

function votoComedia(pelicula) {
    let voto
    switch (pelicula) {
        case '1':
            voto = 'Cásate conmigo\n'
            break
        case '2':
            voto = 'Jackass forever\n'
            break
        case '3':
            voto = 'I want you back\n'
            break
        case '4':
            voto = 'Red\n'
            break
    }
    return voto
}

let mis_votos = ""

let app = true

do {
    let genero = prompt(nombre + ', elije el número del género que deseas listar? \n\n' + menuGenero())

    switch (genero) {
        case '1':
            voto = prompt(nombre + '¿Cuál es tu favorita?\n\n' + menuAccion())
            if (voto != '')
                mis_votos += votoAccion(voto)
            break
        case '2':
            voto = prompt(nombre + '¿Cuál es tu favorita?\n\n' + menuSuspenso())
            if (voto != '')
                mis_votos += votoSuspenso(voto)
            break
        case '3':
            voto = prompt(nombre + '¿Cuál es tu favorita?\n\n' + menuTerror())
            if (voto != '')
                mis_votos += votoTerror(voto)
            break
        case '4':
            voto = prompt(nombre + '¿Cuál es tu favorita?\n\n' + menuComedia())
            if (voto != '')
                mis_votos += votoComedia(voto)
            break
        case '5':
            app = false
            break
        default:
            app = false
            alert('Hemos terminado, vuelve pronto.')
            break
    }
} while (app)

if (mis_votos.length > 0) {
    alert("Tus votos son para: \n\n" + mis_votos)
} else {
    alert("Esperamos que la próxima votes por una película")
}
