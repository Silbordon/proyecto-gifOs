// Constantes en General
const apiKey = '56cTthKcllF5tck39cR59sP4wXo8fp5q';

//Funciones generales Sugerencias
document.addEventListener('DOMContentLoaded', () => {
const seccion_Sugerencias = document.getElementById("seccionSugerencias");

    function getSugerencias() {
        const apiKey = '56cTthKcllF5tck39cR59sP4wXo8fp5q';
        const found = fetch('https://api.giphy.com/v1/gifs/trending?api_key=56cTthKcllF5tck39cR59sP4wXo8fp5q&limit=4&rating=G')
            .then(response => {
                return response.json();
            })
            .then(function (json) {
                let trendsHTML = '';
                json.data.forEach(function (obj){
                    const url = obj.images.fixed_width.url;
                    trendsHTML += `
                <div class='contenido_busqueda_individual'>
                    <img src= '${url}' width='275px' height='280px'alt='Imagen'>
                </div>
                `;
                })
                seccion_Sugerencias.innerHTML=trendsHTML;
            })
            .catch(error => {
                return error;
            }).then(function () {

            });
        return found;
    }
    getSugerencias();

//Funciones Generales Tendencias

    const seccion_Tendencias = document.getElementById("seccionTendencias");
    function getTendencias() {
        const apiKey = '56cTthKcllF5tck39cR59sP4wXo8fp5q';
        const found = fetch('https://api.giphy.com/v1/gifs/trending?api_key=56cTthKcllF5tck39cR59sP4wXo8fp5q&limit=8&rating=G')
            .then(response => {
                return response.json();
            })
            .then(function (json) {
                let trendsHTML = '';
                json.data.forEach(function (obj){
                    const url = obj.images.fixed_width.url;
                    trendsHTML += `
                <div class='contenido_busqueda_individual'>
                    <img src= '${url}' width='275px' height='280px'alt='Imagen'>
                </div>
                `;
                })
                seccion_Tendencias.innerHTML=trendsHTML;
            })
            .catch(error => {
                return error;
            }).then(function () {

            });
        return found;
    }
    getTendencias();


})

// Elementos de la barra de busqueda
const searchButton = document.getElementById('boton_busqueda');
const searchButtonImg = document.getElementById('boton_busqueda_img');
const searchInput = document.getElementById('input_buscar');


// Contenido
const content = document.getElementById('contenido')

searchInput.addEventListener('input', function (event) {
    // Cambiar el estilo del boton de acuerdo a si hay texto o no
    if (event.target.value.length > 0) {
        searchButton.classList.replace('boton_busqueda_inactive', 'boton_busqueda_active')
        searchButtonImg.setAttribute('src', 'images/lupa.svg');
    } else {
        searchButton.classList.replace('boton_busqueda_active', 'boton_busqueda_inactive')
        searchButtonImg.setAttribute('src', 'images/lupa_inactive.svg');
    }
});

function getSearchResults(search) {
    const found = fetch(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput.value}&limit=16`)
        .then(response => {
            return response.json();
        })
        .then(function (json) {
            let trendsHTML = '';
            json.data.forEach(function (obj){
                const url = obj.images.fixed_width.url;
                trendsHTML += `
                <div class='contenido_busqueda_individual'>
                    <img src= '${url}' width='275px' height='280px'alt='Imagen'>
                </div>
                `;
            })
            content.innerHTML=trendsHTML;
        })
        .catch(error => {
            return error;
        }).then(function () {

        });
    return found;
}