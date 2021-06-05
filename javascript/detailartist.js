window.addEventListener("load", function(){
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/27")
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        let artist = datos;

        for (let i = 0; i < 1; i++) {
            let nombre = artist.name;
let imagen = artist.picture_xl;
let canciones = 

document.querySelector(".infomartin").innerHTML = `<img src="${imagen}" alt="${nombre}">
<h1 class="martingarrixtitulo">${nombre}</h1>`
            }
        })
    
    .catch(function (error) {
        console.log(error);
    })





})