console.log("CODERHOUSE - Entregable 08: Optimizando el proyecto final");

// Guardar en LocalStorage los catálogos de Películas y Géneros
localStorage.setItem(
  "generos",
  JSON.stringify(["acción", "comedia", "suspenso", "terror"])
);
localStorage.setItem(
  "peliculas",
  JSON.stringify([
    { cod: "A0", titulo: "Top Gun: Maverick", genero: "acción" },
    { cod: "A1", titulo: "Interceptor", genero: "acción" },
    { cod: "A2", titulo: "Prisioneros de Ghostland", genero: "acción" },
    { cod: "A3", titulo: "Agentes 355", genero: "acción" },

    { cod: "C0", titulo: "Cásate conmigo", genero: "comedia" },
    { cod: "C1", titulo: "Agentes 355", genero: "comedia" },
    { cod: "C2", titulo: "Jackass forever", genero: "comedia" },
    { cod: "C3", titulo: "I want you back", genero: "comedia" },

    { cod: "S0", titulo: "Pienso en el final", genero: "suspenso" },
    { cod: "S1", titulo: "Hannibal", genero: "suspenso" },
    { cod: "S2", titulo: "El juego", genero: "suspenso" },
    { cod: "S3", titulo: "La cabeza de la araña", genero: "suspenso" },

    { cod: "T0", titulo: "La abuela", genero: "terror" },
    { cod: "T1", titulo: "Scream", genero: "terror" },
    { cod: "T2", titulo: "El páramo", genero: "terror" },
    { cod: "T3", titulo: "Black phone", genero: "terror" },
  ])
);

// Elementos del DOM
const containerUsuario = document.getElementById("container-usuario");
const formUsuario = document.getElementById("form-usuario");

const containerApp = document.getElementById("container-app");
const tagBievendia = document.getElementById("tag-bienvenido");

const tagMisVotos = document.getElementById("tag-misvotos");
const tagItemsVotos = document.getElementById("tag-items-votos");

const elementGeneros = document.getElementById("generos");
const elementPeliculas = document.getElementById("peliculas");
const elementNumVotos = document.getElementById("numvotos");

// Obtener datos de LocalStorage
const generos = JSON.parse(localStorage.generos);
const peliculas = JSON.parse(localStorage.peliculas);

let peliculasFiltradas = [];

// Definición de clase
class Usuario {
  constructor(nombre = "") {
    if (nombre.length > 0) {
      this.nombre = nombre.toUpperCase();
    } else {
      this.nombre = "ANÓNIMO";
    }
  }
}
const usuario = new Usuario();

class Votos {
  constructor() {
    this.votos = [];
  }

  //  Contar los votos
  contarVotos() {
    return this.votos.length;
  }

  // Agregar la pelicula por la que el usuario voto, no permitir duplicados
  agregarVoto(peli) {
    if (this.votos.some((el) => el.cod == peli.cod) == false)
      this.votos.push(peli);

    this.render();
  }

  // Eliminar pelicula de la votación
  borrarVoto(code) {
    if (this.votos.some((el) => el.cod === code))
      this.votos.splice(
        this.votos.findIndex((el) => el.cod === code),
        1
      );

    this.render();
  }

  // Renderizar los votos
  render() {
    elementNumVotos.innerText = this.contarVotos();
    tagItemsVotos.innerHTML = "";
    this.votos.forEach((voto) => {
      tagItemsVotos.innerHTML += `<li class='flex justify-start'><button class='mr-1' onclick='votos.borrarVoto("${voto.cod}")'><svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4 text-red-500' viewBox='0 0 20 20' fill='currentColor'> <path fill-rule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd' /></svg></button><p>${voto.titulo}</p></li>`;
    });
  }
}
const votos = new Votos();

// Llenar elemento Select con los géneros de películas
generos.forEach((value, index, array) => {
  elementGeneros.innerHTML += `<option value="${value}"><span class="uppercase">${value}</span></option>`;
});

// Función para construir menu de peliculas segun el género elegido.
function filtrarPeliculasPorGenero(generoElegido) {
  // Dejar variables en blanco o vacias para construir un menu nuevo.
  peliculasFiltradas = [];

  // Hacer uso del filter() para obtener las películas segun el genereElegido
  peliculasFiltradas = peliculas.filter((el) =>
    el.genero.includes(generoElegido)
  );

  // Construir menu películas a partir de recorrer el array "peliculasFiltradas" para mostrarlo en el Prompt.
  peliculasFiltradas.forEach((value, index, array) => {
    elementPeliculas.innerHTML += `<button role="button" class="btn-pelicula" aria-cod="${value.cod}">${value.titulo}</button>`;
  });
}

// Listener submit, formulario
formUsuario.addEventListener("submit", (e) => {
  e.preventDefault();
  usuario.nombre = document.getElementById("username").value;
  containerUsuario.classList.add("hidden");
  containerApp.classList.remove("hidden");
  tagBievendia.innerText = usuario.nombre;
});

// Listener change, select generos
elementGeneros.addEventListener("change", (e) => {
  elementPeliculas.innerHTML = "";

  e.target.value !== ""
    ? filtrarPeliculasPorGenero(e.target.value)
    : (elementPeliculas.innerHTML = "");
});

// Listener click, peliculas
elementPeliculas.addEventListener("click", (e) => {
  votos.agregarVoto(
    peliculasFiltradas.find((el) => el.cod == e.target.getAttribute("aria-cod"))
  );
});
