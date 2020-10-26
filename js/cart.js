var carritoArray = [];

function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++){
        total += parseFloat(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
    //---------------------------------------------------total-en-pesos-----//
    document.getElementById("totalEnPesos").innerHTML = total*40;

    //----------------------------------------------------------------------//
    calcEnvio();
}


function calcSubtotal(unitCost, i){

    let count = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = count * unitCost;    
    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
    //--------------------------------------------------------------------subtotal-en-pesos//
    document.getElementById(`productSubtotalPesos${i}`).innerHTML = subtotal*40;
    //-------------------------------------------------------------------------------------//
    calcTotal();
}


function showProducts(array) {

    let content = "";

    for (let i = 0; i < array.length; i++) {
        
        let product = array[i];

        if(product.currency==="UYU") {
            product.unitCost = product.unitCost/40;
            product.currency = "USD";
        }

        let sub = product.unitCost * product.count;
        let enPesos = parseInt(sub*40);


        content += `
        <div class="card mb-3 card border-dark mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${product.src}" class="card-img" alt="Producto" style="height: 180px; margin-top:39%;">
                </div>
                <div class="col-md-8">
                    <div class="card-header">
                        <h5 style="font-weight:bold">${product.name} </h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text"> Precio: ${product.unitCost} ${product.currency}</p>
                        <p class="card-text">Cantidad: <input class="form-control" style="width:60px;" onchange="calcSubtotal(${product.unitCost}, ${i})" 
                        type="number" id="cantidad${i}" value="${product.count}" min="1"> </p>
                    </div>
                    <div class="row" style="margin-left:1%;">
                            <div class="col-sm-4">
                                <p>Subtotal</p>
                                <p>Subtotal</p>
                            </div>    
                            <div class="col-sm-4">
                                <p class="subtotal" id="productSubtotal${i}">${sub}</p>
                                <p class="subtotalOpuesto" id="productSubtotalPesos${i}">${enPesos}</p>
                            </div>
                            <div class="col-sm-4">
                                <p class"currency">${product.currency}</p>
                                <p class"">UYU <button class= "close" onclick="eliminar(${i})"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button></p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("carrito").innerHTML = content;
        
    }
    calcTotal();
}

function eliminar(i) {
	if (carritoArray.length > 1) {
		carritoArray.splice(i, 1); //el segundo parámetro es la cantidad de objetos que queremos borrar
        showProducts(carritoArray);
	}else{
		document.getElementById("carrito").innerHTML = 
			`                       <div class="alert alert-danger text-center" role="alert" style="width:35%; margin-top:10%;">
										<h2>No hay productos en el carrito</h2>
										<p><a href="products.html"> Ir al listado</a></p>
                                    </div>`;
        document.getElementById("envioTotal").style = "display:none;";                                
	}

}


function calcEnvio(){
    let total = parseInt(document.getElementById("total").innerHTML)
    let envio;

    let elements = document.getElementsByName("envioCustomRadio");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }

    let totalConEnvio = total + (total*envio)/100;

    let contenido = `
        ${totalConEnvio}
    `

    document.getElementById("costoEnvio").innerHTML = parseFloat(total*envio/100);
    document.getElementById("totalEnvio").innerHTML = parseFloat(contenido);
    document.getElementById("totalEnvioModal").innerHTML = parseFloat(contenido);
    //---------------------------------------------------------------------envío-en-pesos--//
    document.getElementById("costoEnvioPesos").innerHTML = parseFloat(total*envio/100)*40;
    document.getElementById("totalEnvioPesos").innerHTML = parseFloat(contenido)*40;
    document.getElementById("totalEnvioPesosModal").innerHTML = parseFloat(contenido)*40;
//-------------------------------------------------------------------------------------//
    
}

function pagoUYU(){
    document.getElementById("enUYU").style = "display: inline-block";
    document.getElementById("enUSD").style = "display: none";
    document.getElementById("modalUYU").style = "display: block";
    document.getElementById("modalUSD").style = "display: none";
}

function pagoUSD(){
    document.getElementById("enUSD").style = "display: inline-block";
    document.getElementById("enUYU").style = "display: none";
    document.getElementById("modalUSD").style = "display: block";
    document.getElementById("modalUYU").style = "display: none";
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //---------------------------------------------------------------------//
    let userLogged = localStorage.getItem('User-Logged');
    let userLoggedG = (localStorage.getItem('Name') != undefined || sessionStorage.getItem('Name') != null);
    if(! (userLogged || userLoggedG) ) {
        loginRequired();
    } else {

            getJSONData(CART_INFO_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    carritoArray = resultObj.data.articles;

                    
                    showProducts(carritoArray);


                    calcEnvio();

                    

                }
            });

            let elements = document.getElementsByName("envioCustomRadio");
            for (var i = 0; i < elements.length; i++) {
                elements[i].addEventListener("change", function(){
                    calcEnvio()
                });
            }

            let metDePago = document.getElementsByName("pago");
            for (var i = 0; i < metDePago.length; i++) {
                metDePago[i].addEventListener("change", function () {
                    seleccionarPago();
                });
            }
        //---------------------------------------------------------------------//


        document.getElementById("metodoDePagoBtn").addEventListener("click", function (e) {
            let passedValidation = true;
            let pais = document.getElementById("pais");
            let ciudad = document.getElementById("ciudad");
            let calle = document.getElementById("calle");
            let nPuerta = document.getElementById("nPuerta");
            let codigoPostal = document.getElementById("cPostal");
            let metodoDePagoBtn = document.getElementById("metodoDePagoBtn");

            if (pais.value === '') {
                pais.classList.add("is-invalid");
                passedValidation = false;
                metodoDePagoBtn.dataset.target = "";
            } else {
                pais.classList.remove("is-invalid");
                pais.classList.add("is-valid");  
            }

            if (ciudad.value === '') {
                ciudad.classList.add("is-invalid");
                passedValidation = false;
                metodoDePagoBtn.dataset.target = "";
            } else {
                ciudad.classList.remove("is-invalid");
                ciudad.classList.add("is-valid");  
            }

            if (calle.value === '') {
                calle.classList.add("is-invalid");
                passedValidation = false;
                metodoDePagoBtn.dataset.target = "";
            } else {
                calle.classList.remove("is-invalid");
                calle.classList.add("is-valid");  
            }

            if (nPuerta.value === '') {
                nPuerta.classList.add("is-invalid");
                passedValidation = false;
                metodoDePagoBtn.dataset.target = "";
            } else {
                nPuerta.classList.remove("is-invalid");
                nPuerta.classList.add("is-valid");  
            }

            if (codigoPostal.value === '') {
                codigoPostal.classList.add("is-invalid");
                passedValidation = false;
                metodoDePagoBtn.dataset.target = "";
            } else {
                codigoPostal.classList.remove("is-invalid");
                codigoPostal.classList.add("is-valid");  
            }

            if (passedValidation) {
                metodoDePagoBtn.dataset.target = "#modalPagar";
            } else {
                    metodoDePagoBtn.onclick =
                    alert("Primero debes completar todos los campos del formulario Envío");    
                    onclick = pais.classList.remove("is-invalid","is-valid"),
                                ciudad.classList.remove("is-invalid","is-valid"),
                                calle.classList.remove("is-invalid","is-valid"),
                                nPuerta.classList.remove("is-invalid","is-valid"),
                                codigoPostal.classList.remove("is-invalid","is-valid");
            }
        });
    }
});


function seleccionarPago() {

    var pagos = document.getElementsByName("pago");
    for (var i = 0; i < pagos.length; i++) {
        if (pagos[i].checked && (pagos[i].value) == "1") {
                                                            // Si paga con tarjeta: 
            document.getElementById("tarjeta").classList.remove("d-none");
            document.getElementById("transferencia").classList.add("d-none");
            document.getElementById("paypal").classList.add("d-none");
            
        } else if (pagos[i].checked && (pagos[i].value) == "2") {
                                                                    // Si paga con transferencia bancaria:
            document.getElementById("tarjeta").classList.add("d-none");
            document.getElementById("transferencia").classList.remove("d-none");
            document.getElementById("paypal").classList.add("d-none");

            let form = document.getElementById('transferencia');

            form.addEventListener('submit', function (e) {
                if (form.checkValidity() === false) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            });

        } else if (pagos[i].checked && (pagos[i].value) === "3") {
                                                                    // Si paga con PayPal: 
            document.getElementById("tarjeta").classList.add("d-none");
            document.getElementById("paypal").classList.remove("d-none");
            document.getElementById("transferencia").classList.add("d-none");
        }
    }
}