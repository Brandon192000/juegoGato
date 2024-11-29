let btnPlay = document.getElementById("play");
let btnSilencio  = document.getElementById("silencio");
let btnExpandirReducir = document.getElementById("expandirReducir");
let video = document.getElementById("video");
let controlVolumen = document.getElementById("controlDeVolumen");
let barraProgreso = document.getElementById("barraProgreso");

let estadoPlay = false;//bandera estadoPlay
let estadoSilencio = false;//bandera estadoSilencio
let estadoVideo = false; //bandera para el estado del video


btnPlay.addEventListener("click", ()=>{

    if (!estadoPlay) {

        video.play();
        estadoPlay = true;

    }else{
        video.pause();
        estadoPlay = false;
    }
});

btnSilencio.addEventListener("click", ()=>{

    if (!estadoSilencio) {

        video.muted = true;
        estadoSilencio = true;


    }else{

        video.muted = false;
        estadoSilencio = false;

    }
});

btnExpandirReducir.addEventListener("click", () => {

    if (!video.fullscreenElement) {

        video.requestFullscreen();// se utiliza para poner un elemento en este caso el video en panlla completa
        
    } else {

        video.exitFullscreen(); //sale de la pantalla completa
        
    }

});

controlVolumen.addEventListener("click", () => {

    video.volume = controlVolumen.value; //. volumen permite controlar el voluemen del video en un rango de 0 a 1


});


video.addEventListener("timeupdate", () => { //evento time update se ejecuta mientras un video se ejecuta

    barraProgreso.value = (video.currentTime / video.duration) * 100; // usp la propiedad de currentTime para el tiempo en el que esta el video y .duration para ver cuanto dura el video *100 para ver el progreso en %

});


barraProgreso.addEventListener("click", () => {//aqui permite usar la barra con evento click

    video.currentTime = (barraProgreso.value / 100) * video.duration; // este sera el tiempo en el que se encuentra la barra de progreso

});