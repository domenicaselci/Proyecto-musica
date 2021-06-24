window.addEventListener("load", function () {
    //cadena de caracteres que tengo que recuperar y transformar en objeto
    //guardo la info en una variable
    let queryString = location.search;
    //console.log(queryString)
    //transformarlo en un objeto literal
    let queryStringObj = new URLSearchParams(queryString);
    let filtro = queryStringObj.get("filtro");
    //de toda la info que podría traer, necesito recuperar el name q
    let busqueda = queryStringObj.get("q");
    console.log(filtro);
    console.log(busqueda);
    let primero = document.querySelector("#primero");
    let segundo = document.querySelector("#segundo");
    let tercero = document.querySelector("#tercero");
    let resultadosbusqueda = document.querySelector(".resultadosbusqueda");

    if (filtro == "todo" || filtro == null) {
        //estrucutra de fetch para consumir Apis
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}`)
            .then(function (respuesta) {
                return respuesta.json()
            })
            .then(function (datos) {
                let todo = datos.data;
                //console.log(todo)
                if (todo.length == 0) {
                    resultadosbusqueda.innerText = `No se encontraron resultados para "${busqueda}"`;
                    segundo.style.display = "none";
                    primero.style.display = "none";
                    tercero.style.display = "none";
                } else {
                    resultadosbusqueda.innerText = `Resultados para "${busqueda}"`;
                    for (let i = 0; i < 1; i++) {
                        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${busqueda}`)
                            .then(function (respuesta) {
                                return respuesta.json()
                            })
                            .then(function (datos) {
                                let nombreArtist = datos.data;
                                if (nombreArtist.length == 0) {
                                    primero.style.display = "none";
                                } else if (nombreArtist.length > 0 && nombreArtist.length <= 2) {
                                    for (let i = 0; i < nombreArtist.length; i++) {
                                        let idArtist = nombreArtist[i].id;
                                        let name = nombreArtist[i].name;
                                        let imagenArt = nombreArtist[i].picture_xl;
                                        primero.innerHTML += `<article class="discos" id="primero">
                                    <img src="${imagenArt}" alt="${name}">
                                    <div class="titulossearch">
                                    <h3 class="electronica"><a href="detail-artist.html?id=${idArtist}">${name}</a></h3>
                                    <h4>Artista</h4>
                                    </div>
                                    </article`
                                    }
                                } else if (nombreArtist.length >= 3) {
                                    for (let i = 0; i < 3; i++) {
                                        let idArtist = nombreArtist[i].id;
                                        let name = nombreArtist[i].name;
                                        let imagenArt = nombreArtist[i].picture_xl;
                                        primero.innerHTML += `<article class="discos" id="primero">
                                <img src="${imagenArt}" alt="${name}">
                                <div class="titulossearch">
                                <h3 class="electronica"><a href="detail-artist.html?id=${idArtist}">${name}</a></h3>
                                <h4>Artista</h4>
                                </div>
                                </article`
                                    }
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    }
                    for (let i = 0; i < 1; i++) {
                        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${busqueda}`)
                            .then(function (respuesta) {
                                return respuesta.json()
                            })
                            .then(function (datos) {
                                let albom = datos.data;
                                if (albom.length == 0) {
                                    segundo.style.display = "none";
                                } else if (albom.length > 0 && albom.length <= 2) {
                                    resultadosbusqueda.innerText = `Resultados para "${busqueda}"`;
                                    for (let i = 0; i < albom.length; i++) {
                                        let nomAlbUno = albom[i].title;
                                        let idAlbUno = albom[i].id;
                                        let fotoAlbUno = albom[i].cover_xl;
                                        document.querySelector("#segundo").innerHTML +=
                                            `<article class="discos" id="segundo">
                                <img src="${fotoAlbUno}" alt="${nomAlbUno}">
                                <div class="titulossearch">
                                <h3 class="electronica"><a href="detail-album.html?id=${idAlbUno}">${nomAlbUno}</a></h3>
                                <h4>Álbum</h4>
                                </div>
                                </article>`
                                    }
                                } else if (albom.length >= 3) {
                                    for (let i = 0; i < 3; i++) {
                                        let nomAlb = albom[i].title;
                                        let idAlb = albom[i].id;
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
                                }
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                        for (let i = 0; i < 1; i++) {
                            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=${busqueda}`)
                                .then(function (respuesta) {
                                    return respuesta.json()
                                })
                                .then(function (datos) {

                                    let canciones = datos.data;
                                    if (canciones.length == 0) {
                                        tercero.style.display = "none";
                                    } else if (canciones.length > 0 && canciones.length <= 2) {
                                        for (let i = 0; i < canciones.length; i++) {
                                            let nombreCan = canciones[i].title;
                                            let fotoCan = canciones[i].album.cover_xl;
                                            let idTrack = canciones[i].id;
                                            tercero.innerHTML += `
                                                        <article class="discos">
                                                        <img src="${fotoCan}" alt="${nombreCan}">
                                                        <div class="titulossearch">
                                                        <h3 class="electronica"><a href="detail-track.html?id=${idTrack}">${nombreCan}</a></h3>
                                                        <h4>Track</h4>
                                                        </div>
                                                        </article>`
                                        }
                                    } else if (canciones.length >= 3) {
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
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                        }
                    }
                }
            })
            .then(function () {
                primero.style.background = "none";
                primero.style.height = "auto";
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
                    primero.style.display = "none";
                    tercero.style.display = "none";
                } else {
                    resultadosbusqueda.innerText = `Resultados para "${busqueda}"`
                    for (let i = 0; i < nombreArtist.length; i++) {
                        let idArtist = nombreArtist[i].id;
                        let name = nombreArtist[i].name;
                        let imagenArt = nombreArtist[i].picture_xl;
                        primero.innerHTML += `<article class="discos" id="primero">
                        <img src="${imagenArt}" alt="${name}">
                        <div class="titulossearch">
                        <h3 class="electronica"><a href="detail-artist.html?id=${idArtist}">${name}</a></h3>
                        <h4>Artista</h4>
                        </div>
                        </article`
                        segundo.style.display = "none";
                        tercero.style.display = "none";
                    }
                }
            })
            .then(function () {
                primero.style.background = "none";
                primero.style.height = "auto";
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
                    primero.style.display = "none";
                    tercero.style.display = "none";
                } else {
                    resultadosbusqueda.innerText = `Resultados para "${busqueda}"`
                    for (let i = 0; i < trackArtist.length; i++) {
                        let nameTrack = trackArtist[i].title;
                        let idTrack = trackArtist[i].id;
                        let imagenTrack = trackArtist[i].album.cover_xl;
                        tercero.innerHTML += `<article class="discos">
                        <img src="${imagenTrack}" alt="${nameTrack}">
                        <div class="titulossearch">
                        <h3 class="electronica"><a href="detail-track.html?id=${idTrack}">${nameTrack}</a></h3>
                        <h4>Track</h4>
                        </div>
                        <article class="discos">
                        `
                        segundo.style.display = "none";
                        primero.style.display = "none";
                    }
                }
            })
            .then(function () {
                primero.style.background = "none";
                primero.style.height = "auto";
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
                console.log(albumArtist);
                if (albumArtist.length == 0) {
                    resultadosbusqueda.innerText = `No se encontraron resultados para "${busqueda}"`
                    segundo.style.display = "none";
                    primero.style.display = "none";
                    tercero.style.display = "none";
                } else {
                    resultadosbusqueda.innerText = `Resultados para "${busqueda}"`
                    for (let i = 0; i < albumArtist.length; i++) {
                        let nameAlbum = albumArtist[i].title;
                        console.log(nameAlbum);
                        let idAlbum = albumArtist[i].id;
                        let imagenAlbum = albumArtist[i].cover_xl;
                        segundo.innerHTML += `<article class="discos">
                        <img src="${imagenAlbum}" alt="${nameAlbum}">
                        <div class="titulossearch">
                        <h3 class="electronica"><a href="detail-album.html?id=${idAlbum}">${nameAlbum}</a></h3>
                        <h4>Álbum</h4>
                        </div>
                        <article class="discos">
                        `
                        tercero.style.display = "none";
                        primero.style.display = "none";
                    }
                }
            })
            .then(function () {
                primero.style.background = "none";
                primero.style.height = "auto";
            })
            .catch(function (error) {
                console.log(error);
            })
    } else if (busqueda == "") {
        console.log("No se encontró resultados");
    }
})