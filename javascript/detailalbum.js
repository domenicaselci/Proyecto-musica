window.addEventListener("load", function () {

    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/302127")
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            let tracksAlbum = datos;

            for (let i = 0; i < 1; i++) {
                let albumPrimero = tracksAlbum;
                let tituloAlbum = albumPrimero.title
                //console.log(tituloAlbum);
                let imagenAlbum = albumPrimero.cover_xl;
                let nombreArtista = albumPrimero.artist.name;
                let fecha = albumPrimero.release_date;
                let primeraParte = document.querySelector(".primeraparte")
                primeraParte.innerHTML += `
                <figure>   
                <img src="${imagenAlbum}" alt="${tituloAlbum}">
                </figure>
                <div class="listagris">
                    <ul class="albumtim">
                        <li class="album">ALBUM</li>
                        <li class="tim">${tituloAlbum}</li>
                    </ul>
                    <ul class="listaheaven">
                        <li class="artista">${nombreArtista}</li>
                        <li>Electrónica</li>
                        <li>Fecha de lanzamiento: ${fecha}</li>
                    </ul>
    
            `
                let nuevosTracks = albumPrimero.tracks.data;
                let lista = document.querySelector("#cancionesyalbum ol");
                for (let i = 0; i < nuevosTracks.length; i++) {
                    lista.innerHTML += `<li class="cancionesconplay">
                    <div><a href="#"><i class="fas fa-play" title="Play"></i> ${nuevosTracks[i].title} </a></div>
                    <a href="#" title="Añadir a favoritos" class="mas"><i class="far fa-heart"></i></a>
                </li>
                   `
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        })

    let segundaParte = document.querySelector("#masde");
    //console.log(segundaParte)
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/27/top?limit=50")
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            let mas = datos.data;
            let nombreDos = mas[0].contributors[0].name;
                console.log(nombreDos)
                let nombreMas = document.querySelector("#masde")
                nombreMas.innerHTML += `<h1 class="titulodiscografia"> Más de ${nombreDos}</h1>`
            for (let i = 0; i < 3; i++) {
                
                let nombreCancion = mas[i].title;
                let img = mas[i].album.cover_xl;
                segundaParte.innerHTML += `
                <article class="discos">
                    <img src="${img}" alt="${nombreCancion}">
                    <h3 class="albumesmartin"><a href="detail-track.html">${nombreCancion}</a></h3>
                    <h4 class="subtitulosalbum"> Track</h4>
                </article>
                `
            }

        })
        .catch(function (error) {
            console.log(error);
        })

    let terceraParte = document.querySelector("#relacionados")
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/27/related")
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            let tres = datos.data;

            for (let i = 0; i < 3; i++) {
                let nombreTres = tres[i].name;
                let imgTres = tres[i].picture_xl;
                terceraParte.innerHTML += `
                <article class="discos">
                    <img src="${imgTres}" alt="${nombreTres}" class="imagenesartistas">
                    <h3 class="albumesmartin"><a href="detail-artist.html">${nombreTres}</a></h3>
                    <h4 class="subtitulosalbum">Artista</h4>
                </article>
                `
            }
        })
        .catch(function (error) {
            console.log(error);
        })
})