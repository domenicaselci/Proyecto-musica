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
        let portada = datos.album.cover_xl;
        let imagen = document.querySelector('.imagen')
        imagen.innerHTML += `<div class="imagen"><img src="${portada}"></div>`;
        let titulo = document.querySelector('.titulo');
        titulo.innerHTML += datos.title;
        let interprete = document.querySelector('.interprete');
        interprete.innerHTML += '<a href="./detail-artist.html?id=' + datos.artist.id + '" >' + datos.artist.name + '</a>'
        let album = document.querySelector('.album');
        album.innerHTML += '<a href="./detail-album.html?id=' + datos.album.id + '" >' + datos.album.title + '</a>'
        let player= document.querySelector('.cositodedeezer')
        player.innerHTML+=`<iframe title="deezer-widget" src="https://widget.deezer.com/widget/dark/track/${idTrack}" width="100%" height="150" frameborder="0" allowtransparency="true" allow="encrypted-media; clipboard-write"></iframe>`;

    })//``
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