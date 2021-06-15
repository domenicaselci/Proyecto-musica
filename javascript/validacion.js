window.addEventListener("load", function(){
    let formulario = document.querySelector("form");
    let campoBuscar = document.querySelector(".campobuscar");
    let resultadoss = document.querySelector(".resultadosbusqueda");

        formulario.addEventListener("submit", function(event) {
            event.preventDefault();
            if (campoBuscar.value == "") {
                resultadoss.innerText = `El campo no puede estar vacío`;
                
            }
            if (campoBuscar.value.length > 0 && campoBuscar.value.length < 2) {
                resultadoss.innerText = `Por favor ingrese al menos 2 caracteres`
            } else {
               submit();
            }
        })

        campoBuscar.addEventListener("input",function(){
            if (campoBuscar.value == "") {
                resultadoss.innerText = `El campo no puede estar vacío`
            }
            if (campoBuscar.value.length > 0 && campoBuscar.value.length < 2) {
                resultadoss.innerText = `Por favor ingrese al menos 2 caracteres`
            } else {
                resultadoss.innerText = "";
            }
        })
    
})