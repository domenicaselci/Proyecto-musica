window.addEventListener("load", function(){

let topTracks = document.querySelector("#canciones");

fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks`)
.then(function(response){
    return response.json();
})
.then(function(data){
    let tracks = data.data;
    // console.log(tracks);
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

let topAlbums = document.querySelector("#album");

fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums`) 
.then(function(response){
    return response.json();
})
.then(function(data){
    // console.log(data);
    let albumes = data.data;
    console.log(albumes);
    for(let i = 0; i < 6; i++){
        let tituloAlbum = albumes[i].title;
        let coverAlbum = albumes[i].cover;
        let artistAlbum = albumes[i].artist.name;
        let artistId = albumes[i].artist.id;
        let albumId = albumes[i].id;
        //falta lista de canciones
        topAlbums.innerHTML += `
        <article>
                <figure><img src="${coverAlbum}" alt="${tituloAlbum}"></figure>
                <div class="informacion">
                    <h3><a href="detail-artist.html?id=${artistId}">${artistAlbum}</a> - <a href="detail-album.html?id=${albumId}">${tituloAlbum}</a></h3>
                    <ol class="cancionesalbum">
                        <li>▷ <a href="detail-track.html">Heaven</a> </li>
                        <li>▷ <a href="detail-track.html">SOS</a></li>
                        <li>▷ <a href="detail-track.html">Tough Love</a></li>
                        <li>▷ <a href="detail-track.html">Bad Reputation</a></li>
                    </ol>
                </div>
            </article>
        `
    }
})
.catch(function(error){
    console.log(error);
})

let topArtist = document.querySelector("#artistas");

fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/artists`)
.then(function(response){
    return response.json();
})
.then(function(data){
    let artists = data.data;
    for(let i = 0; i <6; i++){
        let foto = artists[i].picture;
        let nombre = artists[i].name;
        let artistaId = artists[i].id
        //falta descripcion y genero musical
        topArtist.innerHTML += `
        <article>
                <figure><img src="${foto}" alt="${nombre}"></figure>
                <div class="informacion">
                    <h3><a href="detail-artist.html?id=${artistaId}">${nombre}</a></h3>
                    <p>Género: <a href="detail-genres.html">Electro-Pop</a></p>
                    <p>Avicii es un Dj y Productor sueco muy reconocido mundialmente.</p>
                </div>
            </article>
        `
    }
})
.catch (function(error){
    console.log(error);
})

let planBasic = document.querySelector(`#planBasico`);
let planPremium = document.querySelector(`#planPremium`);
let planPremiumFam = document.querySelector(`#planPremiumFam`);

planBasic.addEventListener("mouseover", function(){
    planBasic.classList.toggle(`planSelec`);
})
planBasic.addEventListener("mouseout", function(){
    planBasic.classList.toggle(`planSelec`);
})

planPremium.addEventListener("mouseover", function(){
    planPremium.classList.toggle(`planSelec`);
})
planPremium.addEventListener("mouseout", function(){
    planPremium.classList.toggle(`planSelec`);
})

planPremiumFam.addEventListener("mouseover", function(){
    planPremiumFam.classList.toggle(`planSelec`);
})
planPremiumFam.addEventListener("mouseout", function(){
    planPremiumFam.classList.toggle(`planSelec`);
})

// planBasic.addEventListener("click", function(){
//     let planSeleccionado = document.querySelectorAll(`.planSelec`);
//     if (planSeleccionado.length === 0){
//         planBasic.classList.toggle(`planSelec`);
//         console.log(planSeleccionado);
//     }else if (planSeleccionado.includes(planBasic) === true && planSeleccionado.length === 1){
//         planBasic.classList.toggle(`planSelec`);
//     }
//     else{
//         alert("Ya tienes seleccionado un plan")
//     }
// })

// planPremium.addEventListener("click", function(){
//     let planSeleccionado = document.querySelectorAll(`.planSelec`);
//     if (planSeleccionado.length === 0){
//         planPremium.classList.toggle(`planSelec`);
//         console.log(planSeleccionado.length);
//     }else if (planSeleccionado.includes(planPremium) === true){
//         planBasic.classList.toggle(`planSelec`);
//     }
//     else {
//         alert("Ya tienes seleccionado un plan")
//     }
// })

// planPremiumFam.addEventListener("click", function(){
//     let planSeleccionado = document.querySelectorAll(`.planSelec`);
//     if (planSeleccionado.length === 0){
//         planPremiumFam.classList.toggle(`planSelec`);
//         console.log(planSeleccionado.length);
//     }else if (planSeleccionado.includes(planPremiumFam) === true && planSeleccionado.length === 1){
//         planBasic.classList.toggle(`planSelec`);
//     }
//     else {
//         alert("Ya tienes seleccionado un plan")
//     }
// })

})