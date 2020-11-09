//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let userLogged = localStorage.getItem('User-Logged');
    let userLoggedG = (localStorage.getItem('Name') != undefined || sessionStorage.getItem('Name') != null);
    if(! (userLogged || userLoggedG) ) {
        loginRequired();
    } else {
        
        let perfil = localStorage.getItem('perfil');

    if (perfil) {

        perfil = JSON.parse(perfil);

        if (perfil.imgUrl != "" ){
            document.getElementById("imgPerfil").src = perfil.imgUrl;
            document.getElementById("photo").src = perfil.imgUrl;
        }
        document.getElementById("imgUrl").value = perfil.imgUrl;
        document.getElementById("nombres").value = perfil.nombres;
        document.getElementById("apellidos").value = perfil.apellidos;        
        document.getElementById("edad").value = perfil.edad;
        document.getElementById("email").value = perfil.email;
        document.getElementById("telefono").value = perfil.telefono;
        //-----------------------------------------------------------------
        document.getElementById("name").innerHTML = perfil.nombres;
        document.getElementById("surname").innerHTML = perfil.apellidos;

        if (perfil.edad == "") {
            document.getElementById("ageP").style = "display:none;";
        }else{
            document.getElementById("ageP").style = "display:block;";
            document.getElementById("age").innerHTML = perfil.edad;
        }
                
        document.getElementById("emailp").innerHTML = perfil.email;

        if (perfil.telefono == "") {
            document.getElementById("phoneP").style = "display:none;";
        }else{
            document.getElementById("phoneP").style = "display:block;";
            document.getElementById("phone").innerHTML = perfil.telefono;
        }        
        //------------------------------------------------------------------

    }else{
        changeP();
    }

    document.getElementById("guardar").addEventListener("click", function (e) {
        let passedValidation = true;
        let imgUrl = document.getElementById("imgUrl");
        let nombres = document.getElementById("nombres");
        let apellidos = document.getElementById("apellidos");
        let edad = document.getElementById("edad");
        let email = document.getElementById("email");
        let telefono = document.getElementById("telefono");

        if (nombres.value === '') {
            nombres.classList.add("is-invalid");
            passedValidation = false;
        } else {
            nombres.classList.remove("is-invalid");  
        }

        if (apellidos.value === '') {
            apellidos.classList.add("is-invalid");
            passedValidation = false;
        } else {
            apellidos.classList.remove("is-invalid");  
        }

        if (email.value === '') {
            email.classList.add("is-invalid");
            passedValidation = false;
        } else {
            email.classList.remove("is-invalid");  
        }

        if (passedValidation) {
            localStorage.setItem('perfil', JSON.stringify({
                nombres: nombres.value,
                apellidos: apellidos.value,
                edad: edad.value,
                imgUrl: imgUrl.value,
                email: email.value,
                telefono: telefono.value
            }));

            window.location = "my-profile.html";
            saveP();
        }
    });
    }

});

function saveP() {
    document.getElementById("saveP").style = "display: none";
    document.getElementById("showP").style = "display: block";
}

function changeP() {
    document.getElementById("showP").style = "display: none";
    document.getElementById("saveP").style = "display: block";
}

function clearP() {
    localStorage.removeItem('perfil');
    window.location = "my-profile.html";
}