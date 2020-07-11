//Sección Crear Gifos-Captura VIDEO
let video = document.getElementById('video-inicial');
let comenzar = document.getElementById('comenzar');
let captura = document.getElementById('contenedorcaptura');
let seccionInstrucciones = document.getElementById('contenedor-instrucciones');
let seccionVideo = document.getElementById('contenedor-video');
let grabando = document.getElementById('contenedorlisto');
let tituloantes =document.getElementById('tituloAntes');
let titulocaptura =document.getElementById('tituloCaptura');

comenzar.addEventListener('click', () => {
    seccionInstrucciones.classList.add('display-none');
    seccionVideo.classList.remove('display-none');
    getStreamAndRecord();
})

let recorder

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

captura.addEventListener('click',() => {
    captura.classList.add('display-none');
    grabando.classList.remove('display-none');
    tituloantes.classList.add('display-none');
    titulocaptura.classList.remove('display-none');
    
})

captura.addEventListener('click', async function f() {

    recorder.startRecording();
    console.log("Start recording");
})
   
   /*const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);
    
    recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
    });

});
*/




