window.addEventListener("load", function () {
    //console.log(window);
    //console.log(window.location);
    //console.log(location.search);
    const parametros = new URLSearchParams(location.search);
    const cualDos = parametros.get("id");
    //console.log(cualDos);

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${cualDos}`)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            let artist = datos;
            for (let i = 0; i < 1; i++) {
                let nombre = artist.name;
                let imagen = artist.picture_xl;
                document.querySelector(".infomartin").innerHTML = `<img src="${imagen}" alt="${nombre}">
            <h1 class="martingarrixtitulo">${nombre}</h1>`
            }
        })
        .then(function () {
            document.querySelector(".infomartin").style.background = "none";
            document.querySelector(".infomartin").style.height = "auto";
        })
        .catch(function (error) {
            console.log(error);
        })

    let topisimo = document.querySelector(".topcinco");
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${cualDos}/top`)
        .then(function (respuesta) {
            return respuesta.json()
        })
        .then(function (datos) {
            let top = datos.data;
            for (let i = 0; i < top.length; i++) {
                let topCinco = top[i].title;
                console.log(topCinco)
                let topCincoId = top[i].id
                topisimo.innerHTML += `<li class="cancionesconplay">
        <div><a href="detail-track.html?id=${topCincoId}"><i class="fas fa-play" title="Play"></i> ${topCinco}</a></div>
        <a href="detail-track.html?id=${topCincoId}" title="Más" class="mas"><i class="fas fa-ellipsis-h"></i>
        </li>
        `
            }

        })
        .catch(function (error) {
            console.log(error)
        })



    let discos = document.querySelector("#discografiauno")
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${cualDos}/albums`)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            let discografia = datos.data;
            for (let i = 0; i < 3; i++) {
                let titleDos = discografia[i].title;
                console.log(titleDos);
                let imgDos = discografia[i].cover_xl;
                let albumId = discografia[i].id;
                discos.innerHTML += `<article class="discos">
        <img src="${imgDos}" alt="${titleDos}">
        <h3 class="albumesmartin"><a href="detail-album.html?id=${albumId}">${titleDos}</a></h3>
        <h4 class="subtitulosalbum">Álbum</h4>
        </article>`


            }
        })
        .catch(function (error) {
            console.log(error);
        })

    //otro
    let info = document.querySelector(".informacionmartin article")
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${cualDos}`)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            let infoFans = datos;
            for (let i = 0; i < 1; i++) {
                let imgMedieum = infoFans.picture_xl
                let fansNum = infoFans.nb_fan;
                let numAlbum = infoFans.nb_album;

                document.querySelector(".martingarrixinfo").innerText = `${fansNum} oyentes`
                document.querySelector(".parrafo").innerText = `${numAlbum} tracks`
                info.style.backgroundImage = `url(${imgMedieum})`;

            }
        })
        .catch(function (error) {
            console.log(error);
        })

})