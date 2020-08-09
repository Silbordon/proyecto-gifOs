//Sección Crear Gifos-Captura VIDEO
let video = document.getElementById('video-inicial');
let comenzar = document.getElementById('comenzar');
let captura = document.getElementById('contenedorcaptura');
let seccionInstrucciones = document.getElementById('contenedor-instrucciones');
let seccionVideo = document.getElementById('contenedor-video');
let grabando = document.getElementById('contenedorlisto');
let tituloantes = document.getElementById('tituloAntes');
let titulocaptura = document.getElementById('tituloCaptura');
let vistaprevia = document.getElementById('contenedor-vistaprevia');
let titulovistaprevia = document.getElementById('titulovistaprevia');
let x = document.getElementById('close-crear');
let repetircaptura = document.getElementById('repetircaptura');
let subirguifo = document.getElementById('subirguifo');
let subiendoguifo = document.getElementById('subiendo-gif');
let titulosubiendoguifo = document.getElementById('titulosubiendo-guifo');
let videoGif = document.getElementById('video-gif');
let seg = document.getElementById('screen');
let seg2 = document.getElementById('screen2');
let interval
let recorder
let barra


//Pasos
comenzar.addEventListener('click', getStreamAndRecord);
repetircaptura.addEventListener('click', getStreamAndRecord);
captura.addEventListener('click', startRecording);
grabando.addEventListener('click', stopRecording);
subirguifo.addEventListener('click', subirGifo);

function getStreamAndRecord() {
    //Init cronometro
    mm = 0;
    hh = 0;
    ss = 0;
    format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    seg.innerHTML = format;
    totalSeconds = 0;



    //preparo la vista
    captura.classList.remove('display-none');
    tituloantes.classList.remove('display-none');
    grabando.classList.add('display-none');
    titulocaptura.classList.add('display-none');
    vistaprevia.classList.add('display-none');
    titulovistaprevia.classList.add('display-none');
    x.classList.remove('display-none');
    subiendoguifo.classList.add('display-none');
    titulosubiendoguifo.classList.add('display-none');
    video.classList.remove('display-none');
    videoGif.classList.add('display-none');
    seccionInstrucciones.classList.add('display-none');
    seccionVideo.classList.remove('display-none');
    //Se prende la camara
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 1000,
            height: 510,
        }
    })
        .then(function (stream) {
            recorder = new RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,

                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });
            recorder.stream = stream;
            video.srcObject = stream;
            video.play();
        }).catch((e) => {
        console.log(e);
    })
}

function startRecording() {
    //preparo la vista
    captura.classList.add('display-none');
    grabando.classList.remove('display-none');
    tituloantes.classList.add('display-none');
    titulocaptura.classList.remove('display-none');
    //contador del tiempo
    interval = setInterval(function () {
        mostrarCronometro()
    }, 1000)
    //Empieza la Grabacion
    recorder.startRecording();
}

function stopRecording() {
    //detiene el tiempo
    clearInterval(interval);
    clearInterval(barra);
    //prepara la vista
    grabando.classList.add('display-none');
    vistaprevia.classList.remove('display-none');
    titulocaptura.classList.add('display-none');
    titulovistaprevia.classList.remove('display-none');
    x.classList.add('display-none');
    video.classList.add('display-none');
    videoGif.classList.remove('display-none');
    //Stop la grabacion y prender video gif
    recorder.stopRecording(function () {
        videoGif.src = URL.createObjectURL(recorder.getBlob());
    })
    //Apagar la camara
    recorder.stream.stop();

    //Barra de carga
    let final = totalSeconds;
    resetBarra();
    pasos= 0;
    function estadosBarraProgreso() {
        if (pasos <= 15) {
            pasos++
            pintarBarra(pasos)
        } else {
            pasos = 0;
            resetBarra();
        }
    }

    barra = setInterval(estadosBarraProgreso, final * 1000 / 18);
}

function subirGifo() {
    //Prepara la vista
    vistaprevia.classList.add('display-none');
    titulovistaprevia.classList.add('display-none');
    x.classList.remove('display-none');
    subiendoguifo.classList.remove('display-none');
    titulosubiendoguifo.classList.remove('display-none');
    video.classList.add('display-none');
    videoGif.classList.add('display-none');
}

function pintarBarra(pasos) {
    document.querySelector('#p_' + pasos).classList.remove('libre');
    document.querySelector('#p_' + pasos).classList.add('ocupado');
}

function resetBarra() {
    for (var j = 1; j <= 15; j++) {
        document.querySelector('#p_' + j).classList.remove('ocupado');
        document.querySelector('#p_' + j).classList.add('libre');
    }
}

//Init Cronometro
mm = 0;
hh = 0;
ss = 0
let totalSeconds = 0;
let pasos = 0;

function mostrarCronometro() {
    ss++;
    totalSeconds++;
    if (ss == 59) {
        ss = 0;
        mm++;

        if (mm == 59) {
            mm = 0;
            hh++;
        }
    }
    let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    seg.innerHTML = format;
    seg2.innerHTML = format;
}






