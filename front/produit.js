// recup de l'id dans l'url
let searchParam = (new URL(window.location)).searchParams;
// extraire id
let id = searchParam.get("products_id");

// Création produit.html
fetch('http://localhost:3000/api/furniture/' + id)
  .then(response => response.json())
  .then(furniture => {

    let container = document.querySelector("#Furniture_produit .row");

        container.innerHTML += `<div class="row produit">
        <div class="col-12 col-md-6 col-xl-6 card-body-1">
            <div class="produit_image">
            <img src="${furniture.imageUrl}" alt="${furniture.name}">
            </div>
        </div>
        <div class="col-12 col-md-6 col-xl-6 card-body-1">
            <div>
                <h3 class="card-title">${furniture.name}</h3><br><br>
            </div>
            <div>
                <h5 class="card-description">${furniture.description}</h5><br><br>
            </div>
            <form>
                <label for="option_produit">Choix du vernis :</label>
                <select class="choix_couleur" name="colors" id="selection_couleur">
                </select><br><br>

                <label for="option_produit">Quantité :</label>
                <select class="choix_quantite" name="quantite" id="selection_quantite">
                </select><br><br>
            </form>
            <div>
                <h5 class="card-prix">${(furniture.price / 100).toFixed(2)} €</h5><br><br>
            </div>
            <div>
                <button class="ajout_panier" href="panier.html">Ajouter au panier</button>
            </div>
        </div>`;

        // Création selection couleur (vernis)
            let choixCouleur = furniture.varnish;
            
            choixCouleur.forEach((colors) => {
                let selectionCouleur = document.createElement('option');
                document.querySelector(".choix_couleur").appendChild(selectionCouleur).innerHTML = colors;
            });
        // Création selection quantité de produit
            let choixQuantite = [1,2,3,4,5];

            choixQuantite.forEach((quantite) => {
                let selectionQuantite = document.createElement('option');
                document.querySelector(".choix_quantite").appendChild(selectionQuantite).innerHTML = quantite;
            });

        //  ----------Ajout article au panier----------
        // Recupération des données choisies par l'utilisateur (options)
        let idForm = document.querySelector(".choix_couleur");
        let idQuantite = document.querySelector(".choix_quantite");

        // Les choix de l'utilisateur dans une variable (bouton d'envoi)
        let btnEnvoyerPanier = document.querySelector(".ajout_panier");

        // Ecouter bouton et envoyer vers le panier
        btnEnvoyerPanier.addEventListener("click", (event) =>{
            event.preventDefault();

                let choixForm = idForm.value;
                let choixQuant = idQuantite.value;
                // Recuperation valeur des choix de l'utilisateur
                let optionsProduit = {
                    name : furniture.name,
                    image : furniture.imageUrl,
                    id : furniture._id,
                    option_produit : choixForm,
                    quantite : parseInt(choixQuant),
                    price : furniture.price / 100,
                }
                // ---------- Local Storage ----------
                // ---------- Stocker la récupération des valeurs du formulaire dans le local storage ----------
                 
                // Variable enregistrement dans le local storage
                enregistrementProduit(optionsProduit);
                window.location.assign("panier.html");

        });
});