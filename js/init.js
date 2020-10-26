const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
//--------------------------------------------------------------------2-productos------//
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
//-------------------------------------------------------------------------------------//
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  let userLogged = localStorage.getItem('User-Logged');
  let infoUser = document.getElementById("info-user");
  let user = document.getElementById("user");

  if (userLogged) {
    userLogged = JSON.parse(userLogged);
    user.innerText = user.innerText + 'Usuario: ' + userLogged.email;
    //----------------------------------------
    infoUser.style = "visibility: visible";
    //----------------------------------------
  }
  //---------------------------------------------------------------------------
  document.getElementById("salir").addEventListener("click", function () {
    localStorage.removeItem('User-Logged');
    //window.location = 'index.html';
  })
  //---------------------------------------------------------------------------  
});


document.addEventListener("DOMContentLoaded", function (e) {
  let userLoggedG = localStorage.getItem('Email');
  let infoG = document.getElementById('info-google-user');
  let userG = document.getElementById('user-google');

  if (localStorage.getItem('Name') != undefined || sessionStorage.getItem('Name') != null) {
    userG.innerText = userG.innerText + 'Usuario: ' + userLoggedG;
    //-------------------------------------
    infoG.style = "visibility: visible";
    //-------------------------------------
  }
  //document.getElementById("salir").addEventListener("click", function () {
    //alert("prueba");
    //window.location = 'index.html';
    
  //})

});

function loginRequired() {

  let modal = `
                                                    <!--<div class="alert alert-danger" role="alert" style="width:30%;">
                                                      <h5>Para ver esta página debes <a href="#" class="alert-link" data-toggle="modal" data-target="#loginModal">iniciar sesión</a></h5>
                                                    </div>-->
  
                <div class="modal fade text-center" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content">
                      <div class="modal-header">
                          <h3 class="modal-title" id="exampleModalLabel">Debes iniciar sesión</h3>
                      </div>
                      <div class="modal-body">
                        <form id="loginM" class="needs-validation" novalidate>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Email:</label>
                            <input type="email" class="form-control" id="emailModal" aria-describedby="emailHelp" placeholder="Tu correo electrónico" required>
                            <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
                          </div>
                          <div class="form-group">
                            <label for="exampleInputPassword1">Contraseña:</label>
                            <input type="password" class="form-control" id="passwordModal" placeholder="Tu contraseña" required>
                          </div>
                          <button type="submit" class="btn btn-primary btn-lg">Ingresar</button>
                          <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
                        </form>
                      </div>
                                                        <!--<div class="modal-footer">
                                                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                              <button type="button" class="btn btn-primary">Save changes</button>
                                                            </div>-->
                    </div>
                  </div>
                </div>
                `;
                document.body.innerHTML = modal;
                $('#loginModal').modal({
                  backdrop: 'static',
                  keyboard: false
                });
                $('#loginModal').modal('show');

                let form = document.getElementById('loginM');
                form.addEventListener('submit', function (e) {
                    if (form.checkValidity() === false) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    let email = document.getElementById("emailModal");
                    let password = document.getElementById("passwordModal");
                    if(email.value !== '' && password.value !== '') {
                      localStorage.setItem('User-Logged', JSON.stringify({ email: email.value }));
                    }
                    form.classList.add('was-validated');
                });
                
}
