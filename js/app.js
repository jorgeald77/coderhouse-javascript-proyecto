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
let usuario;

// Función con la que ocultamos el Formulario y Mostramos la App
function initApp() {
    seccionRegistro.classList.add("hidden")
    seccionApp.classList.remove("hidden")
    usuarioNombre.innerText = usuario.nombre
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


// Carga de categorias de películas