window.addEventListener("load", function () {

    let queryString = location.search;
    console.log(queryString)
    let queryStringObj = new URLSearchParams(queryString);
    let filtro = queryStringObj.get("filtro");
    let busqueda = queryStringObj.get("q");
    console.log(filtro);
    console.log(busqueda);
    let primero = document.querySelector("#primero");
    let segundo = document.querySelector("#segundo");
    let tercero = document.querySelector("#tercero");
    let tituloart = document.querySelector("#tituloart");
    let resultadosbusqueda = document.querySelector(".resultadosbusqueda");
    


    if (filtro == "todo" || filtro == null) {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}`)
            .then(function (respuesta) {
                return respuesta.json()
            }).then(function (datos) {
                let todo = datos.data;
                if (todo.length == 0) {
                    resultadosbusqueda.innerText = `No se encontraron resultados para "${busqueda}"`;
                    segundo.style.display = "none";
                    tituloart.style.display = "none";
                    tercero.style.display = "none";
                } else {
                    resultadosbusqueda.innerText = `Resultados para "${busqueda}"`;

                    for (let i = 0; i < 1; i++) {
                        let nombreArt = todo[i].artist.name;
                        let idArt = todo[i].artist.id
                        console.log(idArt);
                        let imagenArtista = todo[i].artist.picture_xl;
                        primero.innerHTML += `<img src="${imagenArtista}" alt="${nombreArt}">
                <div class="titulossearch">
                    <h3 class="electronica"><a href="detail-artist.html?id=${idArt}">${nombreArt}</a></h3>
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
                                        let nomAlb = albom[i].title;
                                        let idAlb = albom[i].id
                                        let fotoAlb = albom[i].cover_xl;
                                        document.querySelector("#segundo").innerHTML +=
                                            `<article class="discos" id="segundo">
                    <img src="${fotoAlb}" alt="${nomAlb}">
                    <div class="titulossearch">
                    <h3 class="electronica"><a href="detail-album.html?id=${idAlb}">${nomAlb}</a></h3>
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
                                            let idTrack = canciones[i].id
                                            tercero.innerHTML += `
                                        <article class="discos">
                                        <img src="${fotoCan}" alt="${nombreCan}">
                                        <div class="titulossearch">
                                        <h3 class="electronica"><a href="detail-track.html?id=${idTrack}">${nombreCan}</a></h3>
                                        <h4>Track</h4>
                                        </div>
                                        </article>`
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    })
                            }
                        }
                    }
                }
            })
            .then(function(){
                tituloart.style.background = "none";
                tituloart.style.height = "auto";
            })
            .catch(function (error) {
                console.log(error)
            })
    } else if (filtro == "artista") {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${busqueda}`)
                    .then(function (respuesta) {
                return respuesta.json();
            })
            .then(function (datos) {
                let nombreArtist = datos.data;

                //console.log(nombreArtist)
                if (nombreArtist.length == 0) {
                    resultadosbusqueda.innerText = `No se encontraron resultados para "${busqueda}"`
                    segundo.style.display = "none";
                    tituloart.style.display = "none";
                    tercero.style.display = "none";
                } else {
                    resultadosbusqueda.innerText = `Resultados para "${busqueda}"`


                    for (let i = 0; i < 1; i++) {
                        let name = nombreArtist[i].name;
                        let idArtist = nombreArtist[i].id
                        let imagenArt = nombreArtist[i].picture_xl;
                        primero.innerHTML += `<img src="${imagenArt}" alt="${name}">
                <div class="titulossearch">
                    <h3 class="electronica"><a href="detail-artist.html?id=${idArtist}">${name}</a></h3>
                    <h4>Artista</h4>
                </div>`
                        segundo.style.display = "none";
                        tercero.style.display = "none";
                    }
                }
            }).then(function () {
                tituloart.style.background = "none";
                tituloart.style.height = "auto";
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
                if (trackArtist == 0) {
                    resultadosbusqueda.innerText = `No se encontraron resultados para "${busqueda}"`

                    segundo.style.display = "none";
                    tituloart.style.display = "none";
                    tercero.style.display = "none";
                } else {
                    resultadosbusqueda.innerText = `Resultados para "${busqueda}"`

                    for (let i = 0; i < 1; i++) {
                        let nameTrack = trackArtist[0].title;
                        let idTrack = trackArtist[0].id
                        let imagenTrack = trackArtist[0].album.cover_xl;
                        tercero.innerHTML += `<article class="discos">
                        <img src="${imagenTrack}" alt="${nameTrack}">
                    <div class="titulossearch">
                        <h3 class="electronica"><a href="detail-track.html?id=${idTrack}">${nameTrack}</a></h3>
                        <h4>Track</h4>
                    </div>
                    <article class="discos">
                    `
                        segundo.style.display = "none";
                        tituloart.style.display = "none";
                    }
                }


            }).then(function () {
                tituloart.style.background = "none";
                tituloart.style.height = "auto";
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
                if (albumArtist.length == 0) {
                    resultadosbusqueda.innerText = `No se encontraron resultados para "${busqueda}"`

                    segundo.style.display = "none";
                    tituloart.style.display = "none";
                    tercero.style.display = "none";
                } else {
                    resultadosbusqueda.innerText = `Resultados para "${busqueda}"`

                    for (let i = 0; i < 1; i++) {
                        let nameAlbum = albumArtist[0].title;
                        let idAlbum = albumArtist[0].id
                        let imagenAlbum = albumArtist[0].cover_xl;
                        segundo.innerHTML += `<article class="discos">
                        <img src="${imagenAlbum}" alt="${nameAlbum}">
                    <div class="titulossearch">
                        <h3 class="electronica"><a href="detail-album.html?id=${idAlbum}">${nameAlbum}</a></h3>
                        <h4>Álbum</h4>
                    </div>
                    <article class="discos">
                    `
                        tercero.style.display = "none";
                        tituloart.style.display = "none";
                    }
                }
            }).then(function () {
                tituloart.style.background = "none";
                tituloart.style.height = "auto";
            })
            .catch(function (error) {
                console.log(error);
            })

    } else if (busqueda == "") {
        console.log("no se encontró resultados")
    }
})