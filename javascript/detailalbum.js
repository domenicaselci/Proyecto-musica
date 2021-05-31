window.addEventListener("load", function () {

    let cancionesAlbum = document.querySelector(".contenidoprincipal");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/302127`)
        .then(function (response) {
            return response.json();
        })
        .then(function (datos) {
            let tracksAvicci = datos.data;
            for (let i = 0; i < tracksAvicci.length; i++) {
                let imagenAlbum = tracksAvicci[0].cover_big;
                let nombreArtista = tracksAvicci[1].contributors.name;
                let tracksDos = tracksAvicci[0].title;
                let nombresCanciones = tracksAvicci[2].tracks.data.title;
                cancionesAlbum.innerHTML += `
            <section>
                           <article class="contenido1">
            <div class="primeraparte">
            <figure>
            <img src="${imagenAlbum}" alt="${tracksDos}">
            </figure>
            <div class="listagris">
                <ul class="albumtim">
                    <li class="album">ALBUM</li>
                    <li class="tim">${tracksDos}</li>
                </ul>
                <ul class="listaheaven">
                    <li class="artista">${nombreArtista}</li>
                    <li>Electrónica</li>
                    <li>Fecha de lanzamiento: 6 de junio de 2019</li>
                </ul>
            </div>
        </div>
            <ul class="fav">
                <li class="icons"><a href="#" title="Añadir a favoritos" class="iconitos"><i
                            class="far fa-heart"></i></a></li>
                <li class="icons"><a href="#" title="Descargar álbum" class="iconitos"><i
                            class="fas fa-angle-double-down"></i></i></i></i></a></li>
                <li class="icons"><a href="playlist.html" title="Ir a mi playlist" class="iconitos"><i
                            class="fas fa-compact-disc"></i></a></i></li>
            </ul>
        </article>         

        <article class="articletim" id= "cancionesalbum">
            <!--<ol>
                <li class="cancionesconplay">
                    <div><a href="#"><i class="fas fa-play" title="Play"></i> ${nombresCanciones}</a></div>
                    <a href="#" title="Añadir a mi playlist" class="mas"><i class="fas fa-ellipsis-h"></i></a>
                </li>
        </section>
            `
            }

        })
        .catch(function (error) {
            console.log(error);
        })



})