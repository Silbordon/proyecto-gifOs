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
let x = document.getElementById('close-crear')

comenzar.addEventListener('click', () => {
    seccionInstrucciones.classList.add('display-none');
    seccionVideo.classList.remove('display-none');
    getStreamAndRecord();
})

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 1000,
            height: 510,
        }
    })
        .then(function (stream) {
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,

                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });
            video.srcObject = stream;
            video.play();
        }).catch((e) => {
        console.log(e);
    })
}



captura.addEventListener('click', async function f() {
    captura.classList.add('display-none');
    grabando.classList.remove('display-none');
    tituloantes.classList.add('display-none');
    titulocaptura.classList.remove('display-none');
    setInterval(function () {
        mostrar()
    }, 1000)
    // recorder.startRecording();
    // const sleep = m => new Promise(r => setTimeout(r, m));
    // await sleep(3000);
    // console.log("Start recording");
    // recorder.stopRecording(function () {
    //     let blob = recorder.getBlob();
    //     invokeSaveAsDialog(blob);
    // });
})

//Seccion cronometro

let seg = document.getElementById('screen')
mm = 0;
hh = 0;
ss = 0
function mostrar() {
    ss++;
    if (ss == 59) {
        ss = 0;
        mm++;

        if (mm == 59) {
            mm = 0;
            hh++;
        }
    }
    let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    seg.innerHTML = format
}

grabando.addEventListener('click', () => {
    grabando.classList.add('display-none');
    vistaprevia.classList.remove('display-none');
    titulocaptura.classList.add('display-none');
    titulovistaprevia.classList.remove('display-none');
    x.classList.add('display-none');
})

 
 




