window.addEventListener("load", function () {
    console.log(window);
    console.log(window.location);
    console.log(location.search);
    const parametros = new URLSearchParams(location.search);
    const cual = parametros.get("id");
    console.log(cual);

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${cual}`)
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

        .catch(function (error) {
            console.log(error);
        })

    let topisimo = document.querySelector(".topcinco")

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${cual}/top`)
        .then(function (respuesta) {
            return respuesta.json()
        })
        .then(function (datos) {
            let top = datos.data;
            for (let i = 0; i < top.length; i++) {
                let topCinco = top[i].title;
                console.log(topCinco);
                topisimo.innerHTML += `<li class="cancionesconplay">
        <div><a href="#"><i class="fas fa-play" title="Play"></i> ${topCinco}</a></div>
        <div><a href="#" title="Añadir a favoritos" class="mas"><i class="far fa-heart"></i></a></div>
    </li>`
            }
        }).catch(function (error) {
            console.log(error)
        })

    let discos = document.querySelector("#discografiauno")
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${cual}/albums`)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            let discografia = datos.data;
            for (let i = 0; i < 3; i++) {
                let titleDos = discografia[i].title;
                console.log(titleDos);
                let imgDos = discografia[i].cover_xl;
                discos.innerHTML += `<article class="discos">
                <img src="${imgDos}" alt="${titleDos}">
                <h3 class="albumesmartin"><a href="detail-album.html">${titleDos}</a></h3>
                <h4 class="subtitulosalbum">Álbum</h4>
            </article>`
                discos.addEventListener("mouseover", function () {
                    discos.style.color = "gray";
                })

            }


        }).catch(function (error) {
            console.log(error);
        })

    let info = document.querySelector(".informacionmartin article")
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${cual}`)
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
                document.querySelector(".parrafo").innerText = `${numAlbum} álbumes`
                info.style.backgroundImage = `url(${imgMedieum})`;

            }


        })
        .catch(function (error) {
            console.log(error);
        })

        let segundaParte = document.querySelector("#masde");
   
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${cual}/top?limit=50`)
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
    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${cual}/related`)
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