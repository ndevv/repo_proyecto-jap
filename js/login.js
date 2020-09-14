//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("submitBtn").addEventListener("click", function (e) {
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputPassword.value === '') {
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {
            localStorage.setItem('User-Logged', JSON.stringify({ email: inputEmail.value }));
            window.location = 'index2.html';
            notificar();
        } else {
            alert("Debes rellenar ambos campos")
            onclick = inputEmail.classList.remove("invalid");
            onclick = inputPassword.classList.remove("invalid");
        }
    });

});


function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    //var id_token = googleUser.getAuthResponse().id_token;
    localStorage.setItem('Name', profile.getName());

    if (localStorage.getItem('Name') != undefined || sessionStorage.getItem('Name') != null) {
        localStorage.setItem('Name', profile.getGivenName());
        localStorage.setItem('Email', profile.getEmail());
//-------------------
        notificar();
//-------------------        
        window.location.href = "index2.html";
    }
};
//---------------------------------------------------------------------------------------------------------
function notificar() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {

        if (localStorage.getItem('User-Logged')) {

            new Notification("¡Bienvenido!",
                {
                    icon: "img/notificationicon.png",
                    body: JSON.parse(localStorage.getItem('User-Logged')).email
                }
            );
        } else {

            if (localStorage.getItem('Name') != undefined || sessionStorage.getItem('Name') != null) {

                new Notification("¡Bienvenido!",
                    {
                        icon: "img/notificationicon.png",
                        body: localStorage.getItem('Email')
                    }
                )
            };
        }
    }
};
//----------------------------------------------------------------------------------------------------------