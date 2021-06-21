let recuperoStorage = localStorage.getItem('playlist');
let playlist = JSON.parse(recuperoStorage);

let playlistx = document.querySelector('.playlistx');
console.log(recuperoStorage);
if (recuperoStorage == null || recuperoStorage == "[]") {
    playlist = [];

    playlistx.innerHTML += '<li> No hay canciones en tu playlist </li>';
    console.log(playlistx);

} else {

    playlist.forEach(function (idTrack) {
        buscarYMostrarTrack(idTrack);
    });
}
// mostrar tracks en la playlist

function buscarYMostrarTrack(idTrack) {
    const parametros = new URLSearchParams(location.search);
    const Trackid = parametros.get("id");
    console.log(Trackid);
 
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${Trackid}`)
        .then(function (respuesta) {
            return respuesta.json();
        })
        
        .then(function (track) {
            playlistx.innerHTML += '<li>' + '<a href="detail-track.html?id=' + track.id + '">' + track.title + '</a></li>'
        })
        .catch(function (errors) {
            console.log(errors);

        })
}