window.addEventListener("load", function(){

    let generos = document.querySelector(".generos");
    let loadingGeneros = document.querySelector("#loadingGeneros");

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre`)
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        loadingGeneros.style.display = "none";
        let genres = data.data;
        for(let i = 1; i < genres.length; i++){
            let nombreGenero = genres[i].name;
            let imagenGenero = genres[i].picture_xl;
            let generoId = genres[i].id;
            generos.innerHTML += `
            <article id= "deezerGen" style="background-image: url(${imagenGenero});">
            <h2><a href="detail-genres.html?id=${generoId}">${nombreGenero}</a></h2>
            </article>
            `
        }
    })
    .catch (function(error){
        console.log(error);
    })



})