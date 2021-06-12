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
                    let cancion = todo[i].title;
                    let imagenArtista = todo[i].artist.picture_xl;
                    document.querySelector("#primero").innerHTML += `<img src="${imagenArtista}" alt="${nombreArt}">
                <div class="titulossearch">
                    <h3 class="electronica"><a href="detail-artist.html">${nombreArt}</a></h3>
                    <h4>Artista</h4>
                </div>`
                    for (let i = 0; i < 3; i++) {
                        let nomAlb = todo[i].album.title
                        let fotoAlb = todo[i].album.cover_xl
                        document.querySelector("#segundo").innerHTML +=
                    `<article class="discos" id="segundo">
                    <img src="${fotoAlb}" alt="${nomAlb}">
                    <div class="titulossearch">
                    <h3 class="electronica"><a href="genres.html">${nomAlb}</a></h3>
                    <h4>Álbum</h4>
                    </div>
                    </article>`
                    document.querySelector("#tercero").innerHTML += `
                    <article class="discos">
                    <img src="${fotoAlb}" alt="${nomAlb}">
                    <div class="titulossearch">
                    <h3 class="electronica"><a href="genres.html">${cancion}</a></h3>
                    <h4>Track</h4>
                    </div>
                    </article>`
                    }


                }
            }).catch(function (error) {
                console.log(error)
            })
    } else if (filtro == "artista") {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q=${busqueda}`)
            .then(function (respuesta) {
                return respuesta.json()
            }).then(function (datos) {

            }).catch(function (error) {
                console.log(error);
            })
    } else if (filtro == "track") {

    }






})