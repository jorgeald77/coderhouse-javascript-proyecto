function getLocalStorage(item) {
    if (localStorage.getItem(item)) {
        return JSON.parse(localStorage.getItem(item))
    }
    return false
}

function setLocalStorage(item, objeto) {
    localStorage.setItem(item, JSON.stringify(objeto))
}

function getSessionStorage(item) {
    if (sessionStorage.getItem(item)) {
        return JSON.parse(sessionStorage.getItem(item))
    }
    return false
}

function setSessionStorage(item, objeto) {
    sessionStorage.setItem(item, JSON.stringify(objeto))
}

class Votos {
    constructor() {
        this.votos = []
    }

    contarVotos() {
        return this.votos.length;
    }

    agregarVoto(peli) {
        if (this.votos.some((el) => el.id == peli.id) == false)
            this.votos.push(peli);

        Toastify({
            text: `Votaste por: ${peli.title}`,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
        this.render();
    }

    borrarVoto(code) {
        let peli = this.votos.find((el) => el.id == code);
        if (this.votos.some((el) => el.id == code)) {
            this.votos.splice(
                this.votos.findIndex((el) => el.id == code),
                1
            );

            Toastify({
                text: `Eliminaste: ${peli.title}`,
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                },
            }).showToast();
        }
        this.render();
    }

    render() {
        // elementNumVotos.innerText = this.contarVotos();
        misVotos.innerHTML = "";
        this.votos.forEach((voto) => {
            misVotos.innerHTML += `<li class='flex justify-start'>
                    <button class='mr-1' onclick='votos.borrarVoto("${voto.id}")'>
                        <svg xmlns='http://www.w3.org/2000/svg' class='h-4 w-4 text-red-500' viewBox='0 0 20 20' fill='currentColor'>
                            <path fill-rule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd' />
                        </svg>
                    </button><p>${voto.title}</p>
                </li>`
        });
    }
}

const seccionRegistro = document.getElementById('seccion-registro')
const formRegistro = document.getElementById('form-registro')
const seccionApp = document.getElementById('app')
const usuarioNombre = document.getElementById('usuario-nombre')
const elementoCategorias = document.getElementById('categorias')
const categoriaTitulo = document.getElementById('categoria-seleccionada')
const btnCategorias = document.getElementsByClassName('btn-cat')
const conteinerPeliculas = document.getElementById('peliculas')
const containerMisVotos = document.getElementById('seccion-misvotos')
const btnMisVotos = document.getElementById('btn-misvotos')
const misVotos = document.getElementById('mis-votos')
let usuario;
let categoriaSelecionada;
const votos = new Votos();

// Validamos si existen datos del usuario.
if (getLocalStorage('usuario')) {
    usuario = getLocalStorage('usuario')
    initApp()
}
if (getSessionStorage('usuario')) {
    usuario = getSessionStorage('usuario')
    initApp()
}

// Guardar en sessionStorage los catálogos de Categorías o de la API.
function loadCategories() {
    if (getSessionStorage('categorias') === false) {
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=46870299310130ffbfbd57d5fd9e6951&language=es")
            .then((response) => response.json())
            .then((data) => {
                setSessionStorage('categorias', data.genres);
                renderCategorias()
            });
    } else {
        renderCategorias()
    }
}

// Obtener datos de una categoría del Storage.
function getCategory(id) {
    categoriaSelecionada = getSessionStorage('categorias').find((item) => item.id == id)
}

// Crear el menu de categorías.
function renderCategorias() {
    document.getElementById('spinner-cat').classList.add('hidden')
    getSessionStorage('categorias').map(function (category) {
        elementoCategorias.innerHTML += `<li class="my-2">
                <button role="button" class="btn-cat" aria-cat="${category.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
                        <path d="M18 11c0-.959-.68-1.761-1.581-1.954C16.779 8.445 17 7.75 17 7c0-2.206-1.794-4-4-4-1.517 0-2.821.857-3.5 2.104C8.821 3.857 7.517 3 6 3 3.794 3 2 4.794 2 7c0 .902.312 1.727.817 2.396A1.994 1.994 0 0 0 2 11v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-2.638l4 2v-7l-4 2V11zm-5-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM6 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM4 19v-8h12l.002 8H4z"></path>
                    </svg>
                    ${category.name}
                </button>
            </li>`
    })
    categoriaSelecionada = getSessionStorage('categorias')[0]
    loadPeliculas(categoriaSelecionada.id)
}

// Cargar las películas del storage o de la API.
function loadPeliculas(category) {
    conteinerPeliculas.innerHTML = ''
    categoriaTitulo.innerText = ''
    document.getElementById('spinner-mov').classList.remove('hidden')

    if (getSessionStorage(category) === false) {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=46870299310130ffbfbd57d5fd9e6951&with_genres=${category}&language=es`)
            .then((response) => response.json())
            .then((data) => {
                setSessionStorage(category, data.results)
            })
            .finally(() => {
                renderPeliculas(category);
            })
    } else {
        renderPeliculas(category);
    }
}

// Mostrar las películas de la categoría elegida.
function renderPeliculas(category) {
    getCategory(category)
    categoriaTitulo.innerText = categoriaSelecionada.name
    document.getElementById('spinner-mov').classList.add('hidden')
    getSessionStorage(category).map(function (mov) {
        conteinerPeliculas.innerHTML += `<div class="movie-box border border-slate-400 shadow-md shadow-slate-200/50">
                <img loading="lazy" src="https://image.tmdb.org/t/p/w500/${mov.poster_path}" class="movie-box-img"/>
                <div class="box-text">
                    <h2 class="font-open-sans text-xl font-extrabold uppercase">${mov.title}</h2>
                    <button role="button" onclick="agregarVoto(${mov.id}, ${category})" class="btn-vote px-3 py-1 mt-2 border border-slate-100 fill-slate-300 hover:bg-slate-100 hover:text-slate-900 hover:fill-slate-900">
                        <span class="text-xs">Vota si te gusta</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" aria-movie="${mov.id}" aria-category="${category}">
                            <path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path>
                        </svg>
                    </button>
               </div>
        </div>`
    })
}

// Función con la que ocultamos el Formulario y Mostramos la App.
function initApp() {
    seccionRegistro.classList.add("hidden")
    seccionApp.style.display = 'grid'
    usuarioNombre.innerText = usuario.nombre
    loadCategories()
}

// Evento del formulario de registro.
formRegistro.addEventListener('submit', (event) => {
    event.preventDefault();
    usuario = {
        nombre: document.getElementById('name').value,
        email: document.getElementById('email').value,
        ultima_visita: new Date(),
    }

    if (document.getElementById('recordar').checked) {
        setLocalStorage('usuario', usuario)
    } else {
        setSessionStorage('usuario', usuario)
    }

    initApp()
})

// Listener categoría elegida.
Array.from(btnCategorias).forEach(item => {
    item.addEventListener('click', (event) => {
        loadPeliculas(event.target.getAttribute('aria-cat'))
    })
})

// Listener para ocultar la seccion mis votos
containerMisVotos.addEventListener('mouseleave', () => {
    containerMisVotos.classList.add('translate-x-full')
})

// Listener para mostrar las seccion mis votos
btnMisVotos.addEventListener('click', () => {
    votos.render()
    containerMisVotos.classList.toggle('translate-x-full')
})

// Función votar por pelicula y registrarla en mis votos.
function agregarVoto(movie, category) {
    votos.agregarVoto(getSessionStorage(category).find((item) => item.id == movie))
}