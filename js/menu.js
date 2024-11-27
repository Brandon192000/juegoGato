function mostrarDescripcion(descripcion, imgElemento) {
    const imagenPrincipal = document.getElementById('imagen-principal');
    const descripcionTexto = document.getElementById('descripcion');

    // Cambiar la descripción
    descripcionTexto.textContent = descripcion;

    // Resaltar la imagen seleccionada
    document.querySelectorAll('.menu-img').forEach(img => img.classList.remove('highlight'));//aqui voy a iterar  por todas las imagenes y le voy a quitar el efecto highlight
    imgElemento.classList.add('highlight'); // aqui solo la imagen que esta seleccionada va tener el efecto

    
    imagenPrincipal.src = imgElemento.src; // aqui lo que voy a hacer es voy a cambiar la imagen principal por la seleccionada 
}