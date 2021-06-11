console.log(window);
console.log(window.location);
console.log(location.search);
const parametros = new URLSearchParams(location.search);
const idTrack = parametros.get("id");
console.log(idTrack);

fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${idTrack}`)
.then(function (respuesta) {
    return respuesta.json();
})

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