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
let interval
let recorder


comenzar.addEventListener('click', getStreamAndRecord);
repetircaptura.addEventListener('click', getStreamAndRecord);
captura.addEventListener('click', startRecording);
grabando.addEventListener('click', stopRecording);

function getStreamAndRecord() {
    //preparo la vista
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
        mostrar()
    }, 1000)
    //Empieza la Grabacion
    recorder.startRecording();
}

function stopRecording() {
    //prepara la vista
    grabando.classList.add('display-none');
    vistaprevia.classList.remove('display-none');
    titulocaptura.classList.add('display-none');
    titulovistaprevia.classList.remove('display-none');
    x.classList.add('display-none');
    video.classList.add('display-none');
    videoGif.classList.remove('display-none');
    //detiene el tiempo
    clearInterval(interval);
    //Stop la grabacion
    recorder.stopRecording(function () {
        videoGif.src = URL.createObjectURL(recorder.getBlob());
    })
//Apagar la camara
    recorder.stream.stop();

    //Barra de progreso
    let pasos = 0;

    id_barra_progreso = setInterval(estadosBarraProgreso, 1000)

    function estadosBarraProgreso() {
        pasos++
        if (pasos <= 15) {
            document.querySelector('#p_' + pasos).classList.remove('libre')
            document.querySelector('#p_' + pasos).classList.add('ocupado')
        } else {
            pasos = 0;
        }
    }
}

//Seccion cronometro

let seg = document.getElementById('screen');
let seg2 = document.getElementById('screen2');
mm = 0;
hh = 0;
ss = 0
let timeSeconds = 0;

function mostrar() {
    ss++;
    timeSeconds++;
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


subirguifo.addEventListener('click', () => {
    vistaprevia.classList.add('display-none');
    titulovistaprevia.classList.add('display-none');
    x.classList.remove('display-none');
    subiendoguifo.classList.remove('display-none');
    titulosubiendoguifo.classList.remove('display-none');
    video.classList.add('display-none');

})
