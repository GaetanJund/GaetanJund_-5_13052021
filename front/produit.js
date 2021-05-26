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
                <label for="option_produit">Choix de couleurs :</label>
                <select class="choix_couleur" name="colors" id="selection_couleur">
                </select><br><br>

                <label for="option_produit">Quantité :</label>
                <select class="choix_quantite" name="quantite" id="selection_quantite">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                </select><br><br>
            </form>
            <div>
                <h5 class="card-prix">${(furniture.price / 100).toFixed(2)} €</h5><br><br>
            </div>
            <div>
                <button class="ajout_panier" href="panier.html">Ajouter au panier</button>
            </div>
        </div>`;

        // Création selection couleur
        let choixCouleur = furniture.varnish;
        
        choixCouleur.forEach((colors) => {
        let selectionCouleur = document.createElement('option')
        selectionCouleur.setAttribute
        document.querySelector(".choix_couleur").appendChild(selectionCouleur).innerHTML = colors;
        console.log(colors);
        });

        // Message ajout au panier
        let messagePanier = document.querySelector(".ajout_panier");
        messagePanier.addEventListener('click', function(){
            alert("L'article a bien été ajouté à votre panier");
        });

        //  ----------Ajout article au panier----------
        // Recupération des données choisies par l'utilisateur
        let idForm = document.querySelector(".choix_couleur");

        // Choix utilisateur variable
        let btnEnvoyerPanier = document.querySelector(".ajout_panier");

        // Ecouter bouton et envoyer vers le panier
        btnEnvoyerPanier.addEventListener("click", (event) =>{
            event.preventDefault();

                let choixForm = idForm.value;
            // Recuperation valeur des choix de l'utilsateur
                let optionsProduit = {
                    name : furniture.name,
                    id : furniture._id,
                    option_produit : choixForm,
                    price : furniture.price / 100,
                }
                console.log(optionsProduit);
        });
        
});