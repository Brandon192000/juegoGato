const listaPalabras = [
    'caballo', 'oveja', 'cerdo', 'mono', 'dinosaurio',
    'jocotes', 'willirex', 'aleman', 'relsb', 'juanes',
    'martes', 'biggie', 'carlosluis', 'esteban', 'oscar', 'irene'
];
let palabraAdivinar = []; // arreglo para almacenar la palabra
let palabraMostrar = []; // mostrar la palabra
let historialLetrasUsuario = []; // guardar el historial de lo que digita el usuario
let numIntentos = 6; // intentos fallidos que puede tener el usuario
let timerInterval; // Variable para manejar el temporizador
let tiempoRestante = 60;
let btnLimpiar = document.getElementById('btnLimpiar')

const resultado = document.querySelector('#resultado');
const intentos = document.querySelector('#intentos');
const letra = document.querySelector('#letra');
const boton = document.querySelector('#boton');
const dibujo = document.querySelector('#dibujo');
const historialDiv = document.getElementById('historial');

const btnEmpezar = document.getElementById('btnEmpezar');

document.querySelectorAll('.teclado button').forEach(btn => btn.disabled = false); // Habilitar botones

const ahorcado = [
`
    _______
    |     |
          |
          |
          |
          |
    =========`,
`
    _______
    |     |
    O     |
          |
          |
          |
    =========`,
`
    _______
    |     |
    O     |
    |     |
          |
          |
    =========`,
`
    _______
    |     |
    O     |
   /|     |
          |
          |
    =========`,
`
    _______
    |     |
    O     |
   /|\\    |
          |
          |
    =========`,
`
    _______
    |     |
    O     |
   /|\\    |
   /      |
          |
    =========`,
`
    _______
    |     |
    O     |
   /|\\    |
   / \\    |
          |
    =========`
];

//--------------------------------------------------------------------------//
// FUNCIONES
//--------------------------------------------------------------------------//
let juegoActivo = false;//bandera para ver si inicio el juego


function iniciarJuego() {
    juegoActivo = true; // Activar el juego
    // Seleccionar una palabra aleatoria de la lista
    palabraAdivinar = listaPalabras[Math.random() * listaPalabras.length | 0].split('');
    
    // Crear una palabra con guiones
    palabraMostrar = Array(palabraAdivinar.length).fill('_');
    historialLetrasUsuario = [];
    numIntentos = 6;
    tiempoRestante = 60;

    document.querySelectorAll('.teclado button').forEach(button => {
        button.disabled = false; // Habilitar el btn
    });

    historialDiv.innerHTML = '';
    actualizarDibujo();
    actualizar();
    timerDeCronometro();

}

function actualizar() {
    resultado.textContent = palabraMostrar.join(' ');
    intentos.textContent = numIntentos; // Actualiza el contador de intentos en el DOM
}

function actualizarDibujo() {
    dibujo.textContent = ahorcado[6 - numIntentos];
}

function verificarLetraIngresada(letraUsuario) {
    
    letraUsuario = letraUsuario.toLowerCase().trim(); 

    if (historialLetrasUsuario.includes(letraUsuario)) {
        alert(`Ya intentaste con la letra"${letraUsuario}" 🤔. Intenta con otra.`);
        return;
    }

    historialLetrasUsuario.push(letraUsuario); // aquí agrego la letra al array que definí arriba
    
    // Actualizar el contenedor de historial
    const letraSpan = document.createElement('span'); // crea un elemento span
    letraSpan.textContent = letraUsuario.toUpperCase(); // Convertir a mayusculas
    letraSpan.style.marginRight = '10px'; //  espacio entre letras
    letraSpan.style.color = palabraAdivinar.includes(letraUsuario) ? 'green' : 'red';
    historialDiv.appendChild(letraSpan); // se agrega al hsitorial las letras que se ingresan
 
    const button = document.querySelector(`button[data-letra="${letraUsuario}"]`);
    if (button) button.disabled = true; // Deshabilitar el botón

    let acierto = false; // bandera para verificar si está o no
    for (let i = 0; i < palabraAdivinar.length; i++) { // recorro toda la palabra que hay que adivinar
        if (palabraAdivinar[i] === letraUsuario) { // si hay un índice igual a la palabra ingresada
            palabraMostrar[i] = letraUsuario; // va a cambiar el índice de la palabra por la palabra ingresada
            acierto = true; // si está, la bandera es true
        }
    }

    if (!acierto) { // si la palabra no estaba

        numIntentos--; // se le resta al contador
        alert(`La letra "${letraUsuario}" no está en la palabra. Te quedan estos intentos: ${numIntentos}`); // muestra un msj al usuario de que le quedan tantos intentos para que tenga cuidado
        actualizar(); // Actualiza el contador de intentos en el DOM
        
    }

    verificarFinJuego();
    actualizar();
    actualizarDibujo();
}

function verificarFinJuego() {

    if (!palabraMostrar.includes('_')) {
        alert('Has Ganado, Felicidades🥳🥳🥳🥳🥳');
        reiniciar();

    } else if (numIntentos === 0) {
        actualizarDibujo();
        alert(`¡Lo siento, perdiste! La palabra era: ${palabraAdivinar.join('')}`);
        reiniciar();

    }

}

function timerDeCronometro(){

    clearInterval(timerInterval);
    const timerElement = document.querySelector('#timer');

    timerInterval = setInterval(() => {

        if (tiempoRestante > 0) {
            
            tiempoRestante--;
            timerElement.textContent = `Tiempo restante: ${tiempoRestante}s`;

        } else {

            clearInterval(timerInterval);
            alert('Se acabo el tiempo😭');
            reiniciar();

        }

    }, 1000); // Actualiza cada segundo

}

function reiniciar() {

    juegoActivo = false;
    clearInterval(timerInterval);
    btnEmpezar.disabled = false; // Habilita el botón de empezar

    document.querySelectorAll('.teclado button').forEach(button => {
        button.disabled = true; // Deshabilitar botones del teclado
    });

    resultado.textContent = '';
    intentos.textContent = '';
    dibujo.textContent = '';
    historialDiv.innerHTML = '';
    document.querySelector('#timer').textContent = '';

}



btnEmpezar.addEventListener('click', () => {

    btnEmpezar.disabled = true; // Deshabilita el botón una vez que se presiona
    iniciarJuego();

});

// Deshabilitar el teclado al cargar la página
document.querySelectorAll('.teclado button').forEach(button => {

    button.disabled = true; // Deshabilitar botones del teclado hasta que el juego comience

});


