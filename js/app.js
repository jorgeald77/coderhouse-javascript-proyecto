function getLocalStorage(item) {
    if (localStorage.getItem(item)) {
        return JSON.parse(localStorage.getItem(item))
    }
    return false
}

function getSessionStorage(item) {
    if (sessionStorage.getItem(item)) {
        return JSON.parse(sessionStorage.getItem(item))
    }
    return false
}

function setLocalStorage(item, objeto) {
    localStorage.setItem(item, JSON.stringify(objeto))
}

function setSessionStorage(item, objeto) {
    sessionStorage.setItem(item, JSON.stringify(objeto))
}

const seccionRegistro = document.getElementById('seccion-registro')
const formRegistro = document.getElementById('form-registro')

const seccionApp = document.getElementById('app')
const usuarioNombre = document.getElementById('usuario-nombre')
const elementoCategorias = document.getElementById('categorias')
const categoriaTitulo = document.getElementById('categoria-seleccionada')
const btnCategorias = document.getElementsByClassName('btn-cat')
const elementoPeliculas = document.getElementById('peliculas')
let usuario;
let categoriaSelecionada;


// Validamos si existen datos del usuario
if (getLocalStorage('usuario')) {
    usuario = getLocalStorage('usuario')
    initApp()
}
if (getSessionStorage('usuario')) {
    usuario = getSessionStorage('usuario')
    initApp()
}


// Guardar en sessionStorage los catálogos de Categorías
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

function renderCategorias() {
    document.getElementById('spinner-cat').classList.add('hidden')

    getSessionStorage('categorias').map(function (category) {
        elementoCategorias.innerHTML += `<li class="my-2">
                <button role="button" class="btn-cat" aria-cat="${category.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    ${category.name}
                </button>
            </li>`;
    });

    categoriaSelecionada = getSessionStorage('categorias')[0]
    loadPeliculas(categoriaSelecionada.id)
}

function loadPeliculas(category) {
    elementoPeliculas.innerHTML = ''
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

function renderPeliculas(category) {
    categoriaTitulo.innerText = categoriaSelecionada.name
    document.getElementById('spinner-mov').classList.add('hidden')

    getSessionStorage(category).map(function (mov) {
        elementoPeliculas.innerHTML += `<button role="button" class="btn-pelicula" aria-gen="${category}" aria-cod="${mov.id}">${mov.title}</button>`;
    });
}

// Función con la que ocultamos el Formulario y Mostramos la App
function initApp() {
    seccionRegistro.classList.add("hidden")
    seccionApp.style.display = 'grid'
    usuarioNombre.innerText = usuario.nombre
    loadCategories()
}

// Evento del formulario de registro
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

// Listener click, categoria
Array.from(btnCategorias).forEach(item => {
    item.addEventListener('click', (event) => {
        // alert(event.target.getAttribute('aria-cat'))
        loadPeliculas(event.target.getAttribute('aria-cat'))
    })
})
