window.addEventListener("load", function () {
    console.log(window);
    console.log(window.location);
    console.log(location.search);
    const parametros = new URLSearchParams(location.search);
    const cualDos = parametros.get("id");
    //console.log(cualDos);

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${cualDos}`)
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
              
                <img src="${imagenAlbum}" alt="${tituloAlbum}">
              
                <div class="listagris">
                    <ul class="albumtim">
                        <li class="album">ALBUM</li>
                        <li class="tim">${tituloAlbum}</li>
                    </ul>
                    <ul class="listaheaven">
                        <li class="artista"><a href="detail-artist.html">${nombreArtista}</a></li>
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
                </li>`
                }
            }
            

            
        })
        .catch(function (error) {
            console.log(error);
        })


})