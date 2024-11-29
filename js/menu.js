const imagenPrincipal = document.getElementById('imagen-principal');
const descripcionTexto = document.getElementById('descripcion');
const imagenesMenu = document.querySelectorAll('.menu-img');
const numeroImagen = document.getElementById('numero-imagen');
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");

const descripciones = [//descripciones
    'Hamburguesa clásica con papas fritas.',
    'Delicioso pescado empanizado con ensalada.',
    'Pescado al ajillo con verduras.',
    'Pasta italiana con salsa marinara.',
    'Tacos mexicanos Full picante como ellos lo fomentaron.',
    'Pizza artesanal deliciosa.'
];

let indiceActual = 0;//indice actual
let contador;//contador img
let intervalo = setInterval(cambiarImagenAutomatica, 5000);//interval

// Mostrar imagen seleccionada y actualizar descripción
function mostrarDescripcion(index) {

    descripcionTexto.textContent = descripciones[index]; // muetra la descripcion
    imagenPrincipal.classList.add('fade-out');//agrega animacion

    setTimeout(() => {

        imagenPrincipal.src = imagenesMenu[index].src; // cambia imagen principal

        
        contador = index + 1;//actualiza el contador

        numeroImagen.textContent = `Imagen numero: ${contador}`;; // muestra num de imagen

        setTimeout(() => {
            imagenPrincipal.classList.remove('fade-out');//elimina animacion
        }, 1000);//1s

        imagenesMenu.forEach(img => img.classList.remove('highlight'));
        imagenesMenu[index].classList.add('highlight');

    }, 1000);//1s
}


function cambiarImagenAutomatica() {
    mostrarDescripcion(indiceActual); // mjuestra la imagen seleccionada con su descripciion
    indiceActual = (indiceActual + 1) % imagenesMenu.length; // ciclo de las imagenes
}


imagenesMenu.forEach((img, index) => {
    img.addEventListener('click', () => {
        clearInterval(intervalo); // limpia y para el intervalo
        mostrarDescripcion(index);
        indiceActual = index; // actualiza el indice
        intervalo = setInterval(cambiarImagenAutomatica, 5000); // reinicia
    });
});



