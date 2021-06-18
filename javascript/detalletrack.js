console.log(window);
console.log(window.location);
console.log(location.search);
const parametros = new URLSearchParams(location.search);
const idTrack = parametros.get("id");
console.log(idTrack);

/// Fetch
fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${idTrack}`)
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        console.log(datos);
        let titulo = document.querySelector('.titulo');
        titulo.innerHTML += datos.title;
        let interprete = document.querySelector('.interprete');
        interprete.innerHTML += '<a href="./detail-artist.html?id=' + datos.data.id + '" >' + datos.data.name + '</a>'
        let album = document.querySelector('.album');
        album.innerHTML += '<a href="./detail-album.html?id=' + datos.data.id + '" >' + datos.data.title + '</a>'
        let player = document.querySelector('iframe');
        player.src = 'https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=tracks&id=' + idTrack + '&app_id=1'



    })

/// boton agregar/quitar de playlist
let playlist = []
let recuperoStorage = localStorage.getItem('playlist');
if (recuperoStorage == null) {
    playlist = [];
} else {
    playlist = JSON.parse(recuperoStorage);
}

if (playlist.includes(idTrack)) {
    document.querySelector('.agregar').innerHTML = 'Quitar de la playlist'
}
let agregar = document.querySelector('.agregar');
agregar.addEventListener('click', function () {
    if (playlist.includes(idTrack)) {
        let indiceEnElArray = playlist.indexOf(idTrack);
        playlist.splice(indiceEnElArray, 1);
        document.querySelector('.agregar').innerHTML = 'Agregar a tu playlist';
        console.log(playlist);
    } else {
        playlist.push(idTrack);
        document.querySelector('.agregar').innerHTML = 'Quitar de tu playlist';

    }
    let playlistParaStorage = JSON.stringify(playlist);
    localStorage.setItem('playlist', playlistParaStorage);
    console.log(localStorage);
})