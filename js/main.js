console.log("CODERHOUSE - Entregable 10: Fetch en tu proyecto");

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

const genres = JSON.parse(sessionStorage.getItem('genres'));


// Guardar en sessionStorage los catálogos de Géneros
if(sessionStorage.getItem('genres') === null) {
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=46870299310130ffbfbd57d5fd9e6951&language=es')
  .then((response) => response.json())
  .then((data) => {
    sessionStorage.setItem('genres', JSON.stringify(data.genres))
  })
}

// Guardar en sessionStorage los catálogos de Películas
function getPelisByGenere(generoid) {
  if(sessionStorage.getItem(generoid) === null) {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=46870299310130ffbfbd57d5fd9e6951&with_genres=${generoid}&language=es`)
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem(generoid, JSON.stringify(data.results))
    })
  }
}

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
    if (this.votos.some((el) => el.id == peli.id) == false)
      this.votos.push(peli);

      Toastify({
        text: `Votaste por: ${peli.title}`,
        duration: 3000, 
        gravity: 'top',
        position: 'right',
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    this.render();
  }

  // Eliminar pelicula de la votación
  borrarVoto(code) {
    let peli = this.votos.find((el) => el.id == code)

    if (this.votos.some((el) => el.id == code)) {
      this.votos.splice(
        this.votos.findIndex((el) => el.id == code),
        1
      );

      Toastify({
        text: `Eliminaste: ${peli.title}`,
        duration: 3000, 
        gravity: 'top',
        position: 'right',
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }
      }).showToast();
    }

    
    this.render();
  }

  // Renderizar los votos
  render() {
    elementNumVotos.innerText = this.contarVotos();
    tagItemsVotos.innerHTML = "";
    this.votos.forEach((voto) => {
      tagItemsVotos.innerHTML += `<li class='flex justify-start'><button class='mr-1' onclick='votos.borrarVoto("${voto.id}")'><svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4 text-red-500' viewBox='0 0 20 20' fill='currentColor'> <path fill-rule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd' /></svg></button><p>${voto.title}</p></li>`;
    });
  }
}
const votos = new Votos();


// Llenar elemento Select con los géneros de películas
genres.map(function (g) {
  elementGeneros.innerHTML += `<option value="${g.id}"><span class="uppercase">${g.name}</span></option>`;
})

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

  if (e.target.value !== "") {
    this.getPelisByGenere(e.target.value)
    
    JSON.parse(sessionStorage.getItem(e.target.value)).map(function (mov) {
      elementPeliculas.innerHTML += `<button role="button" class="btn-pelicula" aria-gen="${e.target.value}" aria-cod="${mov.id}">${mov.title}</button>`;
    })
  }
});

// Listener click, peliculas
elementPeliculas.addEventListener("click", (e) => {
  votos.agregarVoto(
    JSON.parse(sessionStorage.getItem(e.target.getAttribute("aria-gen"))).find((el) => el.id == e.target.getAttribute("aria-cod"))
  );
});
