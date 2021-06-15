window.addEventListener("load", function () {

    let queryString = location.search;
    console.log(queryString)
    let queryStringObj = new URLSearchParams(queryString);
    let filtro = queryStringObj.get("filtro");
    let busqueda = queryStringObj.get("q");
    console.log(filtro)
    console.log(busqueda)

    if (filtro == "todo" || filtro == null) {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}`)
            .then(function (respuesta) {
                return respuesta.json()
            }).then(function (datos) {
                let todo = datos.data;
                document.querySelector(".resultadosbusqueda").innerText = `Resultados para "${busqueda}"`
                for (let i = 0; i < 1; i++) {
                    let nombreArt = todo[i].artist.name;
                    let imagenArtista = todo[i].artist.picture_xl;
                    document.querySelector("#primero").innerHTML += `<img src="${imagenArtista}" alt="${nombreArt}">
                <div class="titulossearch">
                    <h3 class="electronica"><a href="detail-artist.html">${nombreArt}</a></h3>
                    <h4>Artista</h4>
                </div>`
                    for (let i = 0; i < 1; i++) {
                        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${busqueda}`)
                            .then(function (respuesta) {
                                return respuesta.json()
                            })
                            .then(function (datos) {
                                let albom = datos.data;
                                for (let i = 0; i < 3; i++) {
                                    let nomAlb = albom[i].title
                                    let fotoAlb = albom[i].cover_xl
                                    document.querySelector("#segundo").innerHTML +=
                                        `<article class="discos" id="segundo">
                    <img src="${fotoAlb}" alt="${nomAlb}">
                    <div class="titulossearch">
                    <h3 class="electronica"><a href="detail-album.html">${nomAlb}</a></h3>
                    <h4>Álbum</h4>
                    </div>
                    </article>`
                                }
                            }).catch(function (error) {
                                console.log(error)
                            })
                        for (let i = 0; i < 1; i++) {
                            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=${busqueda}`)
                                .then(function (respuesta) {
                                    return respuesta.json()
                                }).then(function (datos) {
                                    let canciones = datos.data;
                                    for (let i = 0; i < 3; i++) {
                                        let nombreCan = canciones[i].title;
                                        let fotoCan = canciones[i].album.cover_xl;
                                        document.querySelector("#tercero").innerHTML += `
                                        <article class="discos">
                                        <img src="${fotoCan}" alt="${nombreCan}">
                                        <div class="titulossearch">
                                        <h3 class="electronica"><a href="detail-track.html">${nombreCan}</a></h3>
                                        <h4>Track</h4>
                                        </div>
                                        </article>`
                                    }
                                }).catch(function (error) {
                                    console.log(error);
                                })
                        }
                    }
                }
            }).catch(function (error) {
                console.log(error)
            })
    } else if (filtro == "artista") {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${busqueda}`)
            .then(function (respuesta) {
                return respuesta.json();
            })
            .then(function (datos) {
                let nombreArtist = datos.data;
                console.log(nombreArtist)
                document.querySelector(".resultadosbusqueda").innerText = `Resultados para "${busqueda}"`
                for (let i = 0; i < 1; i++) {
                    let name = nombreArtist[0].name;
                    let imagenArt = nombreArtist[0].picture_xl;
                    document.querySelector("#primero").innerHTML += `<img src="${imagenArt}" alt="${name}">
                <div class="titulossearch">
                    <h3 class="electronica"><a href="detail-artist.html">${name}</a></h3>
                    <h4>Artista</h4>
                </div>`
                    document.querySelector("#segundo").style.display = "none";
                    document.querySelector("#tercero").style.display = "none";
                }

            })
            .catch(function (error) {
                console.log(error);
            })


    } else if (filtro == "track") {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=${busqueda}`)
            .then(function (respuesta) {
                return respuesta.json();
            })
            .then(function (datos) {
                let trackArtist = datos.data;
                document.querySelector(".resultadosbusqueda").innerText = `Resultados para "${busqueda}"`
                for (let i = 0; i < 1; i++) {
                    let nameTrack = trackArtist[0].title;
                    let imagenTrack = trackArtist[0].album.cover_xl;
                    document.querySelector("#tercero").innerHTML += `<article class="discos">
                    <img src="${imagenTrack}" alt="${nameTrack}">
                <div class="titulossearch">
                    <h3 class="electronica"><a href="detail-artist.html">${nameTrack}</a></h3>
                    <h4>Track</h4>
                </div>
                <article class="discos">
                `
                    document.querySelector("#segundo").style.display = "none";
                    document.querySelector("#tituloart").style.display = "none";
                }

            })
            .catch(function (error) {
                console.log(error);
            })

    } else if (filtro == "album") {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${busqueda}`)
            .then(function (respuesta) {
                return respuesta.json();
            })
            .then(function (datos) {
                let albumArtist = datos.data;
                document.querySelector(".resultadosbusqueda").innerText = `Resultados para "${busqueda}"`
                for (let i = 0; i < 1; i++) {
                    let nameAlbum = albumArtist[0].title;
                    let imagenAlbum = albumArtist[0].cover_xl;
                    document.querySelector("#segundo").innerHTML += `<article class="discos">
                    <img src="${imagenAlbum}" alt="${nameAlbum}">
                <div class="titulossearch">
                    <h3 class="electronica"><a href="detail-artist.html">${nameAlbum}</a></h3>
                    <h4>Álbum</h4>
                </div>
                <article class="discos">
                `
                    document.querySelector("#tercero").style.display = "none";
                    document.querySelector("#tituloart").style.display = "none";
                }

            })
            .catch(function (error) {
                console.log(error);
            })

    } else if(busqueda == ""){
        console.log("no se encontró resultados")
    }
})