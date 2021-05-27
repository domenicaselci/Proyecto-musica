window.addEventListener("load", function(){

let topTracks = document.querySelector("#canciones");

fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks`)
.then(function(response){
    return response.json();
})
.then(function(data){
    let tracks = data.data;
    console.log(tracks);
    for(let i = 0; i < 6; i++){
        let tituloTrack = tracks[i].title;
        let artista = tracks[i].artist.name;
        let cover = tracks[i].album.cover;
        topTracks.innerHTML += `
        <article>
                <figure class="cancion"><img src="${cover}" alt="${tituloTrack} - ${artista}">
                </figure>
                <div class="informacion">
                    <h3> <a href="detail-track.html">${tituloTrack}</a></h3>
                    <p><a href="detail-artist.html">${artista}</a></p>
                </div>
                <div class="reproductor">
                    <i class="fas fa-play"></i>
                </div>
            </article>
        `
    }
})
.catch(function(error){
    console.log(error);
})



})