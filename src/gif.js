// Constantes en General
const apiKey = '56cTthKcllF5tck39cR59sP4wXo8fp5q';

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
                                    <button class='btn_sugerencias'>Ver más...</button>
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
                json.data.forEach(function (obj) {
                    const url = obj.images.fixed_width.url;
                    let url_titulo = mostrar_titulo_tendencia(obj.slug);
                    trendsHTML += `
                <div class='contenido_busqueda_individual_tendencias'>
                    <img class='img_tendencias' src= '${url}' width='275px' height='280px'alt='Imagen'>
                    <h1 class='titulo_tendenciasindividual'>${url_titulo}</h1>
                </div>
                `;
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

   
