window.addEventListener("load", function(){

    let titulo = document.querySelector(`#portada-gen .titulo`);
    console.log(titulo.innerText);
    let portada = document.querySelector(`#portada-gen`)

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
        let nombreGenero = genero.name;
        let imagenGenero = genero.picture_xl;
        titulo.innerText = `${nombreGenero}`;
        portada.style.background_image = `url(${imagenGenero})`
        console.log(imagenGenero);
        
        console.log(genero);
    })
    .catch(function(error){
        console.log(error);
    })


})