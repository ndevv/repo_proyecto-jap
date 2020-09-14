//--------------------------------------------------------
const ORDER_ASC_BY_COST = "precio->PRECIO";
const ORDER_DESC_BY_COST = "PRECIO->precio";
const ORDER_DESC_BY_RELEVANCE = "RELEVANCIA->relevancia";
//--------------------------------------------------------

var productsArray = [];
//-----------------------------------------------------------------------------------------------------------------------
var minCost = undefined;
var maxCost = undefined;
var buscar = undefined;

function sortProducts(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_BY_COST) {
        result = array.sort(
            function (a, b) { //es la función de comparación, donde a y b son los elementos del array
                if (a.cost < b.cost) { return -1; } //si retorna -1, (a < b) se sitúa 'a' en un indice menor que 'b'
                if (a.cost > b.cost) { return 1; } //si retorna 1, (a > b) se sitúa 'a' en un indice mayor que 'b'
                return 0; //si retorna 0 (a = b) deja los indices iguales, en la relación entre ellos
            });

    } else if (criterio === ORDER_DESC_BY_COST) {
        result = array.sort(

            function (a, b) {

                if (a.cost > b.cost) {
                    return -1;
                }


                if (a.cost < b.cost) {
                    return 1;
                }

                return 0;

            });

    } else if (criterio === ORDER_DESC_BY_RELEVANCE) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;
}
//------------------------------------------------------------------------------------------------------------------

function showProductsList(array) {

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        //-----------------------------------------------------------------------------------------------
        let buscando = product.name + product.description;

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {
            //-------------------------------------------------------------------------------------------
            //-------------------------------------------------------------------------------------------
            if (buscar == undefined || buscando.toLowerCase().indexOf(buscar) != -1) {
                //-------------------------------------------------------------------------------------------
                contenido += `      
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                        <small class="text-muted">` + product.cost + ` USD</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                </div>
            </div>
        </a>
            ` 
        }

        }


        document.getElementById("listado").innerHTML = contenido;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            //--------------------------------------------------------------
            //Ordeno por defecto por costo ascendente
            productsArray = sortProducts(ORDER_ASC_BY_COST, productsArray);
            //--------------------------------------------------------------

            //Muestro los productos ordenados
            showProductsList(productsArray);
        }
    });

    //------------------------------------------------------------------------------------
    document.getElementById("sortCostAsc").addEventListener("click", function () {
        //Ordeno por costo ascendente
        productsArray = sortProducts(ORDER_ASC_BY_COST, productsArray);

        //Muestro los productos ordenados
        showProductsList(productsArray);
    });

    document.getElementById("sortCostDesc").addEventListener("click", function () {
        //Ordeno por cost descendente
        productsArray = sortProducts(ORDER_DESC_BY_COST, productsArray);

        //Muestro los productos ordenados
        showProductsList(productsArray);
    });

    document.getElementById("sortRelevDesc").addEventListener("click", function () {
        //Ordeno por relevancia descendente
        productsArray = sortProducts(ORDER_DESC_BY_RELEVANCE, productsArray);

        //Muestro los productos ordenados
        showProductsList(productsArray);
    });

    document.getElementById("filtrar").addEventListener("click", function () {

        minCost = document.getElementById("rango-min").value;
        maxCost = document.getElementById("rango-max").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        //Muestro los productos filtrados
        showProductsList(productsArray);
    });

    document.getElementById("limpiar").addEventListener("click", function () {
        document.getElementById("rango-min").value = "";
        document.getElementById("rango-max").value = "";

        minCost = undefined;
        maxCost = undefined;

        //Muestro los productos ordenados
        showProductsList(productsArray);
    });
    //--------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------
    document.getElementById("buscador").addEventListener("input", function () {

        buscar = document.getElementById("buscador").value.toLowerCase();

        showProductsList(productsArray);

    });

    document.getElementById("limpBusc").addEventListener("click", function () {

        document.getElementById("buscador").value = "";

        buscar = undefined;

        showProductsList(productsArray);
    });
    //--------------------------------------------------------------------------------------
});


