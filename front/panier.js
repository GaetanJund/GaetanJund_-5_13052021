// Rappel à commande
fetch('http://localhost:3000/api/furniture/')
.then(response => response.json())
.then(furniture => {

  let container = document.querySelector(".panier .row");

      container.innerHTML += `<div class="col-12 recap_commande">
      <h2 class="recap_title">Recapitulatif de commande</h2><br>
      <i class="fas fa-battery-half"></i><br><br>
      <h6>Articles avec un bouton supprimer + Total prix </h6>
        </div>
        <div class="col-12 recap_form">
        <form itemref="form-1">
          <div class="form-group col-12">
              <label for="prenom">Prénom</label>
              <input class="form-control" type="text" placeholder="Votre Prénom" id="prenom" required>
          </div>
          <div class="form-group col-12">
              <label for="nom">Nom</label>
              <input class="form-control" type="text" placeholder="Votre Nom" id="nom" required>
          </div>
          <div class="form-group col-12">
              <label for="adresse">Adresse</label>
              <input class="form-control" type="text" placeholder="Votre Adresse" id="adresse" required>
          </div>
          <div class="form-group col-12">
              <label for="ville">Ville</label>
              <input class="form-control" type="text" placeholder="Votre Ville" id="ville" required>
          </div>
          <div class="form-group col-12">
              <label for="email">Email</label>
              <input class="form-control" type="email" placeholder="Votre Email" id="email" required>
          </div><br>
          <div class="button_space1">
              <a class="button_commande" href="commande.html">
              Commander
              </a>
          </div>
          <div class="button_space">
              <a class="button_commande" href="index.html">
              Continuer à regarder
              </a>
          </div>
        </form>
    </div>
    `

});