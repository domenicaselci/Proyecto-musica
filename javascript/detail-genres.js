window.addEventListener("load", function(){

    let titulo = document.querySelector(`#portada-gen .titulo`);
    console.log(titulo.innerText);
    let portada = document.querySelector(`#portada-gen`);
    let artistas = document.querySelector(`#artistas h2`);
    let canciones = document.querySelector(`#canciones h2`);
    let playlist = document.querySelector(`#playlist h2`);
    let artistasGen = document.querySelector(`#artistas`);

    let queryString = location.search;
    console.log(queryString);
    let queryStringObj = new URLSearchParams(queryString);
    console.log(queryStringObj);
    let generoSeleccionado = queryStringObj.get(`id`);
    console.log(generoSeleccionado);

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${generoSeleccionado}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let genero = data;
        console.log(genero);
        let nombreGenero = genero.name;
        let imagenGenero = genero.picture_xl;
        console.log(imagenGenero);
        titulo.innerText = `${nombreGenero}`;
        portada.style.background_image = `url(${imagenGenero})`;
        artistas.innerText = `Artistas más escuchados en ${nombreGenero}`;
        canciones.innerText = `Lo más escuchado en ${nombreGenero}`;
        playlist.innerText = `Playlist más seguidas de ${nombreGenero}`;

        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${generoSeleccionado}/artists`)
        .then(function(response){
            return response.json();
        })
        .then (function(data){
            let artistasGenero = data.data;
            for (let i = 0; i < 6; i++){
                let nombreArtista = artistasGenero[i].name;
                let imagenArtista = artistasGenero[i].picture;
                let artistaId = artistasGenero[i].id
                artistasGen.innerHTML += `
                <article>
                <figure><img src="${imagenArtista}" alt="${nombreArtista}"></figure>
                <div class="informacion">
                    <h3><a href="detail-artist.html?id=${artistaId}">${nombreArtista}</a></h3>
                    <p>Avicii es un Dj y Productor sueco muy reconocido mundialmente.</p>
                </div>
            </article>
                `
            }
        })
        .catch (function(error){
            console.log(error);
        })
    })
    .catch(function(error){
        console.log(error);
    })


})