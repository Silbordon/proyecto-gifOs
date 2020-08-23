// Constantes en General
const apiKey = '56cTthKcllF5tck39cR59sP4wXo8fp5q';
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
let subiendogifconexito = document.getElementById('subiendo-gifconexito');
let titulosubiendoconexito = document.getElementById('titulosubiendo-guifoconexito');
let misgifos = document.getElementById('contenido_mis_gifos');
let copiar_enlace = document.getElementById('copiar-enlace');
let descargar_gif = document.getElementById('descargar-gif');
let interval
let recorder
let barra
let blob
let lastURL


//Pasos
comenzar.addEventListener('click', getStreamAndRecord);
repetircaptura.addEventListener('click', getStreamAndRecord);
captura.addEventListener('click', startRecording);
grabando.addEventListener('click', stopRecording);
subirguifo.addEventListener('click', subirGifo);
copiar_enlace.addEventListener('click', copiarEnlace);
descargar_gif.addEventListener('click', descargarGif);

//Tema-Set mode

if(localStorage.getItem("mode") == "dark"){
    let body = document.getElementsByTagName("body");
    body[0].classList.add("dark");
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "images/gifOF_logo_dark.png");
}

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
        blob = recorder.getBlob();
        videoGif.src = URL.createObjectURL(blob)

    })
    //Apagar la camara
    recorder.stream.stop();

    //Barra de carga
    let final = totalSeconds;
    resetBarra('p');
    pasos = 0;

    function estadosBarraProgreso() {
        if (pasos <= 15) {
            pasos++
            pintarBarra('p', pasos)
        } else {
            pasos = 0;
            resetBarra('p');
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
    //Barra
    let pasos = 0;
    id_barra_progreso = setInterval(estadosBarraProgreso2, 200);


    function estadosBarraProgreso2() {
        pasos++
        if (pasos <= 15) {
            document.querySelector('#q_' + pasos).classList.remove('libre')
            document.querySelector('#q_' + pasos).classList.add('ocupado');
            return
        }
        subiendogifconexito.classList.remove('display-none');
        titulosubiendoconexito.classList.remove('display-none');
        subiendoguifo.classList.add('display-none');
        titulosubiendoguifo.classList.add('display-none');
        videoGif.classList.remove('display-none')
        videoGif.setAttribute('id', 'video-gif2');
        seccionVideo.setAttribute('id', 'contenedor-video2')
        clearInterval(id_barra_progreso)
    }

    let formData = new FormData();
    formData.append('file', blob, 'myGift.gif');
    uploadToServer(formData);
}

function pintarBarra(id, pasos) {
    document.querySelector('#' + id + '_' + pasos).classList.remove('libre');
    document.querySelector('#' + id + '_' + pasos).classList.add('ocupado');
}

function resetBarra(id) {
    for (var j = 1; j <= 15; j++) {
        document.querySelector('#' + id + '_' + j).classList.remove('ocupado');
        document.querySelector('#' + id + '_' + j).classList.add('libre');
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

function uploadToServer(formData) {
    const url = 'https://upload.giphy.com/v1/gifs';
    let request = {
        method: 'POST',
        body: formData,
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
    }
    fetch(url + '?api_key='+apiKey, request)
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            let datos_misGifos = localStorage.getItem("misGifos")
            let misGuifos = []
            if (datos_misGifos != null) {
                misGuifos = JSON.parse(datos_misGifos);
            }
            console.log(json.data.id);
            misGuifos.push(json.data.id);
            localStorage.setItem("misGifos", JSON.stringify(misGuifos));
            //Pintar galeria mis guifos
            getResults();
        }).catch(e => {
        console.log(e)
    });
}

function getResults() {
    let gifsGuardados = JSON.parse(localStorage.getItem("misGifos"))
    const found = fetch('https://api.giphy.com/v1/gifs?api_key=' + apiKey + '&limit=10&ids=' + gifsGuardados.join(','))
        .then(response => {
            return response.json();
        })
        .then(function (json) {
            let trendsHTML = '';
            json.data.forEach(function (obj) {
                const url = obj.images.fixed_width.url;
                lastURL = url
                trendsHTML += `
                <div class='contenido_busqueda_individual'>
                    <img src= '${url}' width='275px' height='280px'alt='Imagen'>
                </div>
                `;
            })
            misgifos.innerHTML = trendsHTML;
        })
        .catch(error => {
            return error;
        });
    return found;
}

function copiarEnlace() {
    let aux = document.createElement("input");
    aux.setAttribute("value", lastURL);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}

function descargarGif() {
    invokeSaveAsDialog(blob);
}


