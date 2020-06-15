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