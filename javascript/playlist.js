let recuperoStorage = localStorage.getItem('playlist');
let playlist = JSON.parse(recuperoStorage);

let playlistx = document.querySelector('.playlistx');
console.log(recuperoStorage);
if(recuperoStorage == null || recuperoStorage == "[]"){
    playlist = [];

    playlistx.innerHTML += '<li> No hay canciones en tu playlist </li>';
    console.log(playlistx);
    
} else {

    playlist.forEach(function(idTrack){
        buscarYMostrarTrack(idTrack);
    });
}

