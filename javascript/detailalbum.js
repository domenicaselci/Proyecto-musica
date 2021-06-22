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
                let id = albumPrimero.artist.id;
                let generoArtista = albumPrimero.genres.data[0].name;
                //console.log(id)
                let primeraParte = document.querySelector(".primeraparte");
                primeraParte.innerHTML += `
              
                <img src="${imagenAlbum}" alt="${tituloAlbum}">
              
                <div class="listagris">
                    <ul class="albumtim">
                        <li class="album">ALBUM</li>
                        <li class="tim">${tituloAlbum}</li>
                    </ul>
                    <ul class="listaheaven">
                        <li class="artista"><a href="detail-artist.html?id=${id}">${nombreArtista}</a></li>
                        <li>${generoArtista}</li>
                        <li>Fecha de lanzamiento: ${fecha}</li>
                    </ul>
    
            `
                let nuevosTracks = albumPrimero.tracks.data;
                let lista = document.querySelector("#cancionesyalbum ol");

                for (let i = 0; i < nuevosTracks.length; i++) {
                    let idNuevosTracks = albumPrimero.tracks.data[i].id;
                    //console.log(idNuevosTracks);
                    lista.innerHTML += `<li class="cancionesconplay">
                    <div><a href="detail-track.html?id=${idNuevosTracks}"><i class="fas fa-play" title="Play"></i> ${nuevosTracks[i].title}</a></div>
                    <a href="detail-track.html?id=${idNuevosTracks}" title="Más" class="mas"><i class="fas fa-ellipsis-h"></i>
                    </li>`
                    //console.log(nuevosTracks[i].title)
                    
                }

                let segundaParte = document.querySelector("#masde");

                for (let i = 0; i < 1; i++) {
                    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}/top?limit=50`)
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
                                let idTrack = mas[i].id;
                                let nombreCancion = mas[i].title;
                                let img = mas[i].album.cover_big;
                                console.log(img)
                                segundaParte.innerHTML += `
                       <article class="discos">
                           <img src="${img}" alt="${nombreCancion}">
                           <h3 class="albumesmartin"><a href="detail-track.html?id=${idTrack}">${nombreCancion}</a></h3>
                           <h4 class="subtitulosalbum"> Track</h4>
                       </article>
                       `
                            }

                        })
                        
                        
                        .catch(function (error) {
                            console.log(error);
                        })
                }
                let relacionados = document.querySelector("#relacionados");

                for (let i = 0; i < 1; i++) {
                    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}/related`)
                        .then(function (respuesta) {
                            return respuesta.json();
                        })
                        .then(function (datos) {
                            let tres = datos.data;
                            if (tres.length == 0) {
                                relacionados.style.display = "none";
                            }
                            for (let i = 0; i < 3; i++) {
                                let nombreTres = tres[i].name;
                                let imgTres = tres[i].picture_xl;
                                let idArtist = tres[i].id
                                relacionados.innerHTML += `
            <article class="discos">
                <img src="${imgTres}" alt="${nombreTres}" class="imagenesartistas">
                <h3 class="albumesmartin"><a href="detail-artist.html?id=${idArtist}">${nombreTres}</a></h3>
                <h4 class="subtitulosalbum">Artista</h4>
            </article>
            `
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            }
        })
        
        .catch(function (error) {
            console.log(error);
        })

})