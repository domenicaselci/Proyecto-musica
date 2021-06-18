window.addEventListener("load", function () {

    let topTracks = document.querySelector("#canciones");
    let loadingTracks = document.querySelector("#loadingTracks");
    let loadingAlbums = document.querySelector("#loadingAlbums");
    let loadingArtistas = document.querySelector("#loadingArtistas");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           loadingTracks.style.display = "none";
           let tracks = data.data;
            // console.log(tracks);
            for (let i = 0; i < 6; i++) {
                let tituloTrack = tracks[i].title;
                let trackId  = tracks[i].id;
                let artista = tracks[i].artist.name;
                let artistaId = tracks[i].artist.id;
                let cover = tracks[i].album.cover;
                let preview = tracks[i].preview;
                topTracks.innerHTML += `
        <article>
        <div>
                <figure class="cancion"><img src="${cover}" alt="${tituloTrack} - ${artista}">
                </figure>
                <div class="informacion">
                    <h3> <a href="detail-track.html?id=${trackId}">${tituloTrack}</a></h3>
                    <p><a href="detail-artist.html?id=${artistaId}">${artista}</a></p>
                </div>
                </div>
                <audio id="audio" src="${preview}" controls></audio>
            </article>
        `;
            }
            let cancionCont = document.querySelectorAll(`#canciones article`)
            let audio = document.querySelectorAll(`#audio`);
            for (let e = 0; e < cancionCont.length; e++) {
                let cancion = cancionCont[e];
                let tema = audio[e];
                cancion.addEventListener("mouseover", function () {
                    tema.style.display = "inline"
                })
                cancion.addEventListener("mouseout", function () {
                    tema.style.display = "none";
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        })

    let topAlbums = document.querySelector("#album");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            loadingAlbums.style.display = "none";
            let albumes = data.data;
            console.log(albumes);
            for (let i = 0; i < 6; i++) {
                let tituloAlbum = albumes[i].title;
                let coverAlbum = albumes[i].cover;
                let artistAlbum = albumes[i].artist.name;
                let artistId = albumes[i].artist.id;
                let albumId = albumes[i].id;

                topAlbums.innerHTML += `
        <article>
                <figure><img src="${coverAlbum}" alt="${tituloAlbum}"></figure>
                <div class="informacion">
                    <h3><a href="detail-artist.html?id=${artistId}">${artistAlbum}</a> - <a href="detail-album.html?id=${albumId}">${tituloAlbum}</a></h3>
                    <ol class="cancionesalbum">
                    </ol>
                </div>
            </article>
            `;
                fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${albumId}/tracks`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        let listaCanciones = document.querySelectorAll(`.cancionesalbum`);
                        let listaFinal = listaCanciones[i];
                        console.log(listaFinal);
                        console.log(listaCanciones);
                        let lista = data.data;
                        for (let o = 0; o < 5; o++) {
                            let cancionNombre = lista[o].title;
                            let cancionId = lista[o].id;
                            listaFinal.innerHTML += `
                    <li>▷ <a href="detail-track.html?id=${cancionId}">${cancionNombre}</a> </li>
                    `
                        }

                    })
            }
        })
        .catch(function (error) {
            console.log(error);
        })

    let topArtist = document.querySelector("#artistas");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/artists`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            loadingArtistas.style.display = "none";
            let artists = data.data;
            for (let i = 0; i < 6; i++) {
                let foto = artists[i].picture;
                let nombre = artists[i].name;
                let artistaId = artists[i].id;
                //falta descripcion y genero musical
                topArtist.innerHTML += `
        <article>
                <figure><img src="${foto}" alt="${nombre}"></figure>
                <div class="informacion">
                    <h3><a href="detail-artist.html?id=${artistaId}">${nombre}</a></h3>
                    <p>${nombre} se unió a MusicCenter y es uno de los artistas más destacados de la época.</p>
                </div>
            </article>
        `
            }
            /* <p>Género: <a href="detail-genres.html">Electro-Pop</a></p> */

        })
        .catch(function (error) {
            console.log(error);
        })

    let planBasic = document.querySelector(`#planBasico`);
    let planPremium = document.querySelector(`#planPremium`);
    let planPremiumFam = document.querySelector(`#planPremiumFam`);

    planBasic.addEventListener("mouseover", function () {
        planBasic.classList.toggle(`planSelec`);
    })
    planBasic.addEventListener("mouseout", function () {
        planBasic.classList.toggle(`planSelec`);
    })

    planPremium.addEventListener("mouseover", function () {
        planPremium.classList.toggle(`planSelec`);
    })
    planPremium.addEventListener("mouseout", function () {
        planPremium.classList.toggle(`planSelec`);
    })

    planPremiumFam.addEventListener("mouseover", function () {
        planPremiumFam.classList.toggle(`planSelec`);
    })
    planPremiumFam.addEventListener("mouseout", function () {
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