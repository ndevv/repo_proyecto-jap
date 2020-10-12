var carritoArray = [];


function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++){
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
    calcEnvio();
}


function calcSubtotal(unitCost, i){

    let count = parseInt(document.getElementById(`cantidad${i}`).value);
    subtotal = count * unitCost;    
    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
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


        content += `
        <div class="card mb-3 card border-dark mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${product.src}" class="card-img" alt="..." style="height: 200px;";>
                </div>
                <div class="col-md-8">
                    <div class="card-header">
                        <h5 style="font-weight:bold">${product.name}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text"> Precio: ${product.unitCost} ${product.currency}</p>
                        <p class="card-text">Cantidad: <input class="form-control" style="width:60px;" onchange="calcSubtotal(${product.unitCost}, ${i})" 
                        type="number" id="cantidad${i}" value="${product.count}" min="1"> </p>
                    </div>
                    <div class="row" style="margin-left:1%;">
                            <div class="col-sm-4">
                                <p>Subtotal</p>
                            </div>    
                            <div class="col-sm-4">
                                <p class="subtotal" id="productSubtotal${i}">${sub}</p>
                            </div>
                            <div class="col-sm-4">
                                <p class"currency">${product.currency}</p>
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

    document.getElementById("costoEnvio").innerHTML = parseInt(total*envio/100);
    document.getElementById("totalEnvio").innerHTML = parseInt(contenido);
    
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //---------------------------------------------------------------------//
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

    
    //---------------------------------------------------------------------//
});
