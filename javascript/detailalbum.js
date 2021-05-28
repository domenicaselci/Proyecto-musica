window.addEventListener("load", function(){

    let cancionesAlbum = document.querySelector("#cancionesalbum");
    
    fetch("https://cors-anywhere.herokuapp.com/https://developers.deezer.com/api/explorer?url=album/302127")
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        let tracksAvicci = datos.data;
        let lista = document.querySelector(".articletim ol")
        for (let i=0; i<tracksAvicci.length; i ++){
            let tracksDos = tracksAvicci[i].name
            lista.innerHTML = `<li>${tracksDos}</li>`
        }
        
    })
    .catch(function(error){
console.log(error);
})



})