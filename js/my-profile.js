//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let userLogged = localStorage.getItem('User-Logged');
    let userLoggedG = (localStorage.getItem('Name') != undefined || sessionStorage.getItem('Name') != null);
    if(! (userLogged || userLoggedG) ) {
        loginRequired();
    } else { 
        //escribir todo acá
    }

});