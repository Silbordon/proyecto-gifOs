// Constantes en General
let apiKey = '56cTthKcllF5tck39cR59sP4wXo8fp5q';
localStorage.setItem("mode", "light");

// Se ejecuta cuando termina de cargarse la pagina
document.addEventListener('DOMContentLoaded', () => {
    //Funciones generales Sugerencias
    const seccion_Sugerencias = document.getElementById("seccionSugerencias");

    function getSugerencias() {
        fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=4&rating=G`)
            .then(response => {
                return response.json();
            })
            .then(function (json) {
                let trendsHTML = '';
                json.data.forEach(function (obj) {
                    const url = obj.images.fixed_width.url;
                    const url_titulo = obj.username;
                    trendsHTML += `
                                <div class='contenido_busqueda_individual_sugerencias'>
                                    <div class= 'contenedor_titulo_sugerencias'>
                                       <h1 class='titulo_contenidobusquedaindividual'># ${url_titulo}</h1>
                                       <img class='closed' src="/images/close.svg" alt='imagen de x'>
                                    </div>
                                    <img class='img_sugerencias' src= '${url}' width='273px' height='282px'alt='Imagen'>
                                    <button onclick="getSearchResults('${url_titulo}')"class='btn_sugerencias'>Ver más...</button>
                                </div>
                                `;
                })
                seccion_Sugerencias.innerHTML = trendsHTML;
            })
            .catch(error => {
                return error;
            }
            )
    }

    getSugerencias();

    //Funciones Generales Tendencias
    const seccion_Tendencias = document.getElementById("seccionTendencias");

    function getTendencias() {
        fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10&rating=G&offset=5`)
            .then(response => {
                return response.json();
            })
            .then(function (json) {
                let trendsHTML = '';
                let biggerimage = 0;
                json.data.forEach(function (obj) {
                    biggerimage++;
                    const url = obj.images.fixed_width.url;
                    let url_titulo = mostrar_titulo_tendencia(obj.slug);
                    if (biggerimage % 5 == 0) {
                        trendsHTML += `
                        <div class='contenido_busqueda_individual_tendencias'>
                            <img class='img_tendencias' src= '${url}' width='560px' height='280px'alt='Imagen'>
                            <h1 class='titulo_tendenciasindividual'>${url_titulo}</h1>
                        </div>
                        `;
                    } else {
                        trendsHTML += `
                        <div class='contenido_busqueda_individual_tendencias'>
                            <img class='img_tendencias' src= '${url}' width='275px' height='280px'alt='Imagen'>
                            <h1 class='titulo_tendenciasindividual'>${url_titulo}</h1>
                        </div>
                        `;
                    }

                })
                seccion_Tendencias.innerHTML = trendsHTML;
            })
            .catch(error => {
                return error;
            })
    }

    getTendencias();
}
);

function mostrar_titulo_tendencia(entrada) {
    let re = /(\w+)/g;
    let arr = entrada.match(re);
    let result = '';
    for (let i = 0; i < arr.length; i++) {
        if (i == 3) {
            break;
        }
        result += "#" + arr[i] + " ";
    }
    return result;
}


//Selector Tema: claro y oscuro
let selectorTema = document.getElementById("selector_tema");
selectorTema.addEventListener("click", () => {
    let menu = document.getElementById("selectorTema");
    menu.classList.toggle("display-none");
})

let sailorDay = document.getElementById("tema_claro");
sailorDay.addEventListener("click", () => {
    localStorage.setItem("mode", "light");
    let body = document.getElementsByTagName("body");
    body[0].classList.remove("dark");
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "images/gifOF_logo.png");
})

let sailorNight = document.getElementById("tema_oscuro");
sailorNight.addEventListener("click", () => {
    localStorage.setItem("mode", "dark");
    let body = document.getElementsByTagName("body");
    body[0].classList.add("dark");
    let logo = document.getElementById("logo");
    logo.setAttribute("src", "images/gifOF_logo_dark.png");
    let lupa = document.getElementById("boton_busqueda_img");
    if (lupa != null){
        lupa.setAttribute("src", "images/combinedShape.svg");
    }
})


