
const imagenPrincipal = document.getElementById('imagen-principal');//agarro el id de la imagen principal
const descripcionTexto = document.getElementById('descripcion');//tambien la de la descripcion

function mostrarDescripcion(descripcion, imgElemento) {

    descripcionTexto.textContent = descripcion;//aqui cambio la descripcion por la que solicitan

   
    document.querySelectorAll('.menu-img').forEach(img => img.classList.remove('highlight'));//aqui voy a iterar  por todas las imagenes y le voy a quitar el efecto highlight
    imgElemento.classList.add('highlight'); // aqui solo la imagen que esta seleccionada va tener el efecto

    imagenPrincipal.classList.add('fade-out');
    
    setTimeout(() => {

        imagenPrincipal.src = imgElemento.src; // aqui lo que voy a hacer es voy a cambiar la imagen principal por la seleccionada 
        imagenPrincipal.classList.remove('fade-out'); // Quitar clase que tiene la animacion para volver a aparecer 
        
    }, 500);

}