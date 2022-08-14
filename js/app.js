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
const elementoCategorias = document.getElementById("categorias")
const btnCategorias = document.getElementById('categorias')
let usuario;

// Guardar en sessionStorage los catálogos de Categorías
if (getSessionStorage('categorias') === false) {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=46870299310130ffbfbd57d5fd9e6951&language=es")
        .then((response) => response.json())
        .then((data) => {
            setSessionStorage('categorias', data.genres);
        });
}

// Función con la que ocultamos el Formulario y Mostramos la App
function initApp() {
    seccionRegistro.classList.add("hidden")
    seccionApp.classList.remove("hidden")
    usuarioNombre.innerText = usuario.nombre

    getSessionStorage('categorias').map(function (category) {
        // TODO dar mejor diseño al botón
        elementoCategorias.innerHTML += `<li><button role="button" class="btn-cat text-xl lowercase" aria-cat="${category.id}">${category.name}</button></li>`;
    });
}

// Validamos si existen datos del usuario
if (getLocalStorage('usuario')) {
    usuario = getLocalStorage('usuario')
    initApp()
}
if (getSessionStorage('usuario')) {
    usuario = getSessionStorage('usuario')
    initApp()
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
btnCategorias.addEventListener('click', (event) => {
    alert(event.target.getAttribute('aria-cat'))
    // TODO Obtener las peliculas de la categoría seleccionada y guardalas en SessionStorage
})