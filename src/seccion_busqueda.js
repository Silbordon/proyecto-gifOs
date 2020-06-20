const sugerencias = ["autocompletar", "sugerencia1", "sugerencia2"]

const cont_sugerencias = document.getElementById('contenedor_sugerencias');
const autocompletar = document.getElementById('autocompletar');
const sugerencia1 = document.getElementById('sugerencia1');
const sugerencia2 = document.getElementById('sugerencia2');

// Elementos de la barra de busqueda
const searchButton = document.getElementById('boton_busqueda');
const searchButtonImg = document.getElementById('boton_busqueda_img');
const searchInput = document.getElementById('input_buscar');
const boton_busqueda_span = document.getElementById('boton_busqueda_span')


// Contenido
const resultado_titulo = document.getElementById('resultado_busqueda_titulo');
const content = document.getElementById('contenido');

searchInput.addEventListener('input', (event) => {
    // Cambiar el estilo del boton de acuerdo a si hay texto o no
    if (event.target.value.length > 0) {
        searchButton.classList.replace('boton_busqueda_inactive', 'boton_busqueda_active')
        searchButtonImg.setAttribute('src', 'images/lupa.svg');
        cont_sugerencias.classList.remove('display-none');
        completarSugerencias(event.target.value);
    } else {
        searchButton.classList.replace('boton_busqueda_active', 'boton_busqueda_inactive')
        searchButtonImg.setAttribute('src', 'images/lupa_inactive.svg');
        cont_sugerencias.classList.add('display-none');
    }
});

function getSearchResults(search) {
    const found = fetch(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=16`)
        .then(response => {
            return response.json();
        })
        .then(function (json) {
            resultado_titulo.innerHTML = `<h2 class="titulo_busqueda_resultado"> ${search}&nbsp&nbsp(resultados) </h2>`
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

function completarSugerencias(texto) {
        const found = fetch(`http://api.giphy.com/v1/gifs/search/tags?api_key=56cTthKcllF5tck39cR59sP4wXo8fp5q&q=${texto}`)
            .then(response => {
                return response.json();
            })
            .then(function (json) {
                if (json.data.length == 1) {
                    autocompletar.innerHTML = json.data[0].name;
                    sugerencia1.innerHTML = texto;
                    sugerencia2.innerHTML = texto;
                } else if (json.data.length == 2) {
                    autocompletar.innerHTML = json.data[0].name;
                    sugerencia1.innerHTML = json.data[1].name;
                    sugerencia2.innerHTML = texto;
                } else if (json.data.length > 2) {
                    autocompletar.innerHTML = json.data[0].name;
                    sugerencia1.innerHTML = json.data[1].name;
                    sugerencia2.innerHTML = json.data[2].name;
                } else {
                    autocompletar.innerHTML = texto;
                    sugerencia1.innerHTML = texto;
                    sugerencia2.innerHTML = texto;
                }
            })
            .catch(error => {
                return error;
            });
        return found;
}

autocompletar.addEventListener('click', (e)=>{
    getSearchResults(e.target.textContent)
})
sugerencia1.addEventListener('click', (e)=>{
    getSearchResults(e.target.textContent)
})
sugerencia2.addEventListener('click', (e)=>{
    getSearchResults(e.target.textContent)
})
boton_busqueda_span.addEventListener('click', (e)=>{
    getSearchResults(searchInput.value)
})

