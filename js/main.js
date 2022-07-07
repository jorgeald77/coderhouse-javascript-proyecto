console.log("CODERHOUSE - Desafío complementario 01")

let nombre
let numero
let msj

// Solicitar nombre
nombre = prompt("Escribe tu nombre")
while (nombre.length === 0) {
    alert("El dato ingresado no es válido.")
    nombre = prompt("Escribe tu nombre")
}

// Solicitar número entre 1 y 50 inclusive
numero = parseInt(prompt("ingresa un número entres 1 y 50 y saber si es par o impar"))
while (numero < 1 || numero > 50 || isNaN(numero)) {
    alert("Ingresa un número entre 1 y 50 inclusive")
    numero = parseInt(prompt("ingresa un número entres 1 y 50 y saber si es par o impar"))
}

// Condición, es un número par?
if (numero % 2 === 0) {
    msj = numero + " es un número par."
}

// Condición, es un número impar?
if (numero % 2 !== 0) {
    msj = numero + " es un número impar."
}

// Imprimir salida
console.log(nombre + ', ' + msj)
alert(nombre + ', ' + msj)
