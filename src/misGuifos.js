let misgifos = document.getElementById('contenido_mis_gifos2');
// Se ejecuta cuando termina de cargarse la pagina
document.addEventListener('DOMContentLoaded', () => {
    getResults();
});


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