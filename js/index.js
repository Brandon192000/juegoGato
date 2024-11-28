//alt + z
//-----------------------------------------------------------------------------------------------------//


let msj = confirm('💀Bienvenido al juego del AHORCADO☣️');


//-----------------------------------------------------------------------------------------------------//
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
let tiempoRestante = 60;;//timer


const resultado = document.querySelector('#resultado');
const intentos = document.querySelector('#intentos');
const letra = document.querySelector('#letra');
const boton = document.querySelector('#boton');
const dibujo = document.querySelector('#dibujo');
const historialDiv = document.getElementById('historial');

const btnEmpezar = document.getElementById('btnEmpezar');
let btnLimpiar = document.getElementById('btnLimpiar')

document.querySelectorAll('.teclado button').forEach(btn => btn.disabled = false); // Habilitar botones

let juegoActivo = false;//bandera para ver si inicio el juego
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

//--------------------------------------------------------------------------//
//***FUNCIONES***//


function iniciarJuego() {
    juegoActivo = true; 

    palabraAdivinar = listaPalabras[Math.random() * listaPalabras.length | 0].split('');//muestra una palabra randon de la lista de palabras que seran la que se definiran como la palabra a adivinar
    
    
    palabraMostrar = Array(palabraAdivinar.length).fill('_');//aqui la palabra en  _ uso array para crear otra plabra igual a la palabra adividar de tamanio y con el y dicho arreglo nuevo el tamanio se llenara con . fill de _ _ _ _ _
    historialLetrasUsuario = [];//mantengo un historial de las letras utilizadas con este array
    numIntentos = 6;//contador de intentos
    tiempoRestante = 60;//timer

    document.querySelectorAll('.teclado button').forEach(button => {

        button.disabled = false; // Habilitar los btn

    });

    historialDiv.innerHTML = '';
    actualizarDibujo();
    actualizar();
    timerDeCronometro();

}

function actualizar() {
    resultado.textContent = palabraMostrar.join(' ');
    intentos.textContent = numIntentos; // Actualiza el contador de intentos en el html
}

function actualizarDibujo() {
    dibujo.textContent = ahorcado[6 - numIntentos];//para actualizar el dibujo lo que que se hace es que se trae el contenedor donde se va a montra y ahi se va a igualar al array el cual sera de 6 - los numeros de intentos que tiene el contador, mediante va bajando va modificando el array y mostrando los dibujos diferentes
}

function verificarLetraIngresada(letraUsuario) {
    
    letraUsuario = letraUsuario.toLowerCase().trim(); 

    if (historialLetrasUsuario.includes(letraUsuario)) {

        alert(`Ya habias intentado con la letra: <strong>${letraUsuario.toUpperCase()}"</strong> "`);//si la letra ya esta incluida en el historias manda esta alerta
        return;

    }

    historialLetrasUsuario.push(letraUsuario); // aqui agrego la letra al array que defini arriba
    
    // Actualizar el contenedor de historial
    const letraSpan = document.createElement('span'); // crea un elemento span
    letraSpan.textContent = letraUsuario.toUpperCase(); // Convertir a mayusculas
    letraSpan.style.marginRight = '10px'; //  espacio entre letras
    letraSpan.style.color = palabraAdivinar.includes(letraUsuario) ? 'green' : 'red';//aqui lo que hago es que veo si la letra del usuario pertenece o no porque tiene un operador ternario donde puede ser verde = pertence o rojo = no pertenece
    historialDiv.appendChild(letraSpan); // se agrega al hsitorial las letras que se ingresan
 
    const button = document.querySelector(`button[data-letra="${letraUsuario}"]`);
    if (button) button.disabled = true; // desabilita el btn seleccionado

    let acierto = false; // bandera para verificar si esta o no
    for (let i = 0; i < palabraAdivinar.length; i++) { // recorro toda la palabra que hay que adivinar

        if (palabraAdivinar[i] === letraUsuario) { // si hay un indice igual a la palabra ingresada
            palabraMostrar[i] = letraUsuario; // va a cambiar el indice de la palabra por la palabra ingresada
            acierto = true; // si esta la bandera es true
        }

    }

    if (!acierto) { // si la palabra no estaba

        numIntentos--; // se le resta al contador
        alert(`La letra "${letraUsuario}" no está en la palabra. Te quedan estos intentos: ${numIntentos}`);  // muestra un msj al usuario de que le quedan tantos intentos para que tenga cuidado
        actualizar(); // Actualiza el contador de intentos en el html
        
    }

    verificarFinJuego();
    actualizar();
    actualizarDibujo();
}

function verificarFinJuego() {

    if (!palabraMostrar.includes('_')) {//si la palabra no incluye ___ 

        alert('Has Ganado, Felicidades🥳🥳🥳🥳🥳');//da el msj
        reiniciar();//llama funcion de reiniciar

    } else if (numIntentos === 0) {//o si el contador de intentos llega a 0

        actualizarDibujo();//muestra el ultimo bicho del arreglo ahoracado
        alert(`¡Lo siento, perdiste! La palabra era: ${palabraAdivinar.join('')}`);
        reiniciar();//reinicia

    }

}

function timerDeCronometro(){

    clearInterval(timerInterval);///se limpia por si tiene algun residuo de indicador 
    const timerElement = document.querySelector('#timer');

    timerInterval = setInterval(() => {

        if (tiempoRestante > 0) {//si el tiempo restante es mayo a 0
            
            tiempoRestante--;//se le va restando al contador de segundos
            timerElement.textContent = `Tiempo restante: ${tiempoRestante}s`;//va mostrando cuando se va descontando

        } else {

            clearInterval(timerInterval);//limpia cierra el intervalo
            alert('Se acabo el tiempo😭');
            reiniciar();//reinicia

        }

    }, 1000); // Actualiza cada segundo

}

function reiniciar() {

    juegoActivo = false;
    clearInterval(timerInterval);
    btnEmpezar.disabled = false; // Habilita el btn de empezar

    document.querySelectorAll('.teclado button').forEach(button => {

        button.disabled = true;  // deshabilita los botones de las letras hasta que comience el juego
        
    });

    resultado.textContent = '';
    intentos.textContent = '';
    dibujo.textContent = '';
    historialDiv.innerHTML = '';
    document.querySelector('#timer').textContent = '';

}

//----------------------------------------------------------------------------------------------------------//
/***EVENTOS***/

btnEmpezar.addEventListener('click', () => {

    btnEmpezar.disabled = true; // deshabilita el boton apenas se selecciona
    iniciarJuego();

});

// Deshabilitar el teclado al cargar la página
document.querySelectorAll('.teclado button').forEach(button => {//con este deshabilito los botones al recargar la pagina

    button.disabled = true; // deshabilita los botones de las letras hasta que comience el juego

});

//-----------------------------------------------------------------------------------------------------------//