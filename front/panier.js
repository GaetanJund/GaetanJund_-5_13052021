// Rappel à commande
fetch('http://localhost:3000/api/furniture/')
.then(response => response.json())
.then(furniture => {

  let container = document.querySelector(".panier .row");

    // ------- Récupérer les données du localstorage
    // Variable enregistrement dans le local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    // Si panier est vide, afficher texte panier vide
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        let panierVide = `
            <div class="panier-vide">
                <h2>Le panier est vide</h2>
                <i class="fas fa-battery-empty"></i>
            </div>`;
            container.innerHTML = panierVide;
    }
    else{
        // si panier n'est pas vide, afficher les produits
        let structureProduitPanier = [];

        for (k = 0; k < produitLocalStorage.length; k++){            
            structureProduitPanier = structureProduitPanier + `
            <div class="recapitulatif">
                <div class="produit_image_panier">
                    <img src="${produitLocalStorage[k].image}"></img>
                </div><br>
                <h4><strong>${produitLocalStorage[k].name}</strong></h4>
                <h6><i>Couleur choisie : ${produitLocalStorage[k].option_produit}</i></h6><br>
                <h5><strong>Prix : ${produitLocalStorage[k].price} €</strong></h5><br>
                <button class="bouton_supprimer">Supprimer</button>
            </div>`;
        }
            if(k == produitLocalStorage.length){
            container.innerHTML = structureProduitPanier;
        }
        console.log(produitLocalStorage);
    }

    // Bouton suppression d'un article
    let btn_supprimer = document.querySelectorAll(".bouton_supprimer");
    console.log(btn_supprimer);

    for (let l = 0; l < btn_supprimer.length; l++){
        btn_supprimer[l].addEventListener("click", (event) => {
            event.preventDefault();

            // Selection de l'id qui va être supprimé au clique
            let selectionSupprimer = produitLocalStorage[l].id;
            console.log(selectionSupprimer);

            // Méthode filter où je selectionne l'élement à garder et l'élement à supprimer
            produitLocalStorage = produitLocalStorage.filter( element => element.id !== selectionSupprimer);
            console.log(produitLocalStorage);

            // envoie vers le localStorage
            // Variable enregistrement dans le local storage
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            // Message suppression de l'article du panier
            alert("Le produit a été supprimé du panier");
            window.location.href = "panier.html";
            });
        }

    // Vider totalement le panier
    let supppressionPanierHtml = `
    <button class="tout_supprimer_panier" style="width:300px"> Vider le panier </button>
    `;
        // Insérer le bouton pour vider le panier
        container.insertAdjacentHTML("beforeend", supppressionPanierHtml);

    // Supprimer tyout le localStorage
    let boutonToutSupprimer = document.querySelector(".tout_supprimer_panier");
    boutonToutSupprimer.addEventListener("click", (event) => {
        event.preventDefault;
        // remove.item pour tout vider
        localStorage.removeItem("produit");
        // Message tout le panier est vide
        alert("Le panier a été vidé");
        window.location.href = "panier.html";
    })
    
    // ---------- Création prix total ----------
    let calculPrixTotal = [];

        // Chercher les prix dans le panier
        for (let m = 0; m < produitLocalStorage.length; m++){
            let prixProduitPanier = produitLocalStorage[m].price;

            // Mettre prix des produits dans variable "calculPrixTotal"
            calculPrixTotal.push(prixProduitPanier)
        }
        // Additionner les prix de la variable "prixTotal" avec .reduce
        let reducer = (accumulator, currentValue) => accumulator + currentValue;
        let prixTotal = calculPrixTotal.reduce(reducer, 0);
        console.log(prixTotal);
        // Html du prix total
        let htmlPrixTotal = `
        <h2 class="prix_total"><strong>Prix total: ${prixTotal}€</strong></h2>
        `
        container.insertAdjacentHTML("beforeend", htmlPrixTotal);

});

