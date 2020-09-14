//----------------------------------------------------------
var productArray = [];
var commentsArray = [];

function showProductInfo() {

    let info = "";
    let imgs = "";
    let comments = "<hr>";

    info += `      
                <h2> ${productArray.name} </h2>
                <p>${productArray.description}</p><hr>
                <p>Precio: ${productArray.cost} ${productArray.currency}</p>
                <p>Cantidad de vendidos: ${productArray.soldCount}</p>
                <p>Categoría: ${productArray.category}</p>
                    
                `;

    imgs += `   
                <img class="img" src="${productArray.images[0]}" width="185px" height="150px" alt="">
                <img class="img" src="${productArray.images[1]}" width="185px" height="150px" alt="">
                <img class="img" src="${productArray.images[2]}" width="185px" height="150px" alt="">
                <img class="img" src="${productArray.images[3]}" width="185px" height="150px" alt="">
                <img class="img" src="${productArray.images[4]}" width="185px" height="150px" alt="">
                
                `;

    commentsArray.forEach(function (comment) {
        let puntaje = "";

        comments += `
                    <strong>${comment.user}</strong> dice:<br>
                    <p>${comment.description}</p>
                    `;

        for (let i = 1; i <= comment.score; i++) {
            puntaje += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            puntaje += `<span class="fa fa-star"></span>`;
        }

        comments += `<sub>${comment.dateTime}</sub><br>`;

        comments += `<div style="text-align: right;">${puntaje}</div><br><hr>`;
    });

    document.getElementById("contenido").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comments;

};
//--------------------------------------------------------------------------------

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    //---------------------------------------------------------------------------------------------------------------------------------------
    let userLogged = localStorage.getItem('User-Logged');
    let userLoggedG = (localStorage.getItem('Name') != undefined || sessionStorage.getItem('Name') != null); //(usuario logeado con google)

    if (userLogged || userLoggedG) {
        document.getElementById("newCommentContent").style = "display: inline-block" && "margin-left:5%";
    }

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
        }

    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productArray = resultObj.data;
            showProductInfo(productArray, commentsArray);
        }

    });

    document.getElementById("enviarComm").addEventListener("click", function () {
        let inputComment = document.getElementById("newComm");
        let today = new Date();
        let dateTime = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
        dateTime += ` ${today.getHours()}:${+ today.getMinutes()}:${today.getSeconds()}`;

        let newComment = {
            score: getRating(),
            description: document.getElementById('newComm').value,
            user: "", //JSON.parse(localStorage.getItem('User-Logged')).email,
            dateTime: dateTime
        };

        if (userLogged) { //para que fumcione con el usuario de login normal
            newComment.user = JSON.parse(localStorage.getItem('User-Logged')).email;
        }

        if (userLoggedG) { //para que funcione con el usuario logeado con google
            newComment.user = localStorage.getItem('Email');
        }

        if (inputComment.value === '') {
            inputComment.classList.add("invalid");
            alert("No puedes envíar un comentario vacío");
            onclick = inputComment.classList.remove("invalid");
        } else {
            commentsArray.push(newComment);
            document.getElementById("newComm").value = "";
            showProductInfo(productArray, commentsArray);
        }

    });

});
//-----------------------------------------------------------------------------------------------