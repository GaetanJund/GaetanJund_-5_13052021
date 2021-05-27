// Rappel à commande
fetch('http://localhost:3000/api/furniture/')
.then(response => response.json())
.then(furniture => {

  let container = document.querySelector(".panier .row");

    // ------- Récupérer les données du localstorage
    // Variable enregistrement dans le local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    // Si panier est vide, afficher texte panier vide
    if (produitLocalStorage === null) {
    let panierVide = `
        <div class="panier-vide">
            <h2>Le panier est vide</h2>
            <i class="fas fa-battery-empty"></i>
        </div>`;
        container.innerHTML = panierVide;
    }
    else{
        // si panier n'est pas vide, afficher les produits
        let produitPanier = [];

        for (k = 0; k < produitLocalStorage.length; k++){            
            produitPanier = produitPanier + `
            <div class="recapitulatif">
                <div class="produit_image_panier">
                    <img src="${furniture[k].imageUrl}"></img>
                </div>
                <h4>${furniture[k].name}</h4>
                <h5>${furniture[k].price / 100} €</h5>
                <button class="bouton_supprimer">Supprimer</button>
            </div>`;
                container.innerHTML = produitPanier;
        }
    }

    // Bouton suppression d'un article
    let btn_supprimer = document.querySelector(".bouton_supprimer");
    
    // // Création prix total
    // let calculPrixTotal = [];

    //     // Chercher les prix dans le panier
    //     for (let m = 0; m < produitLocalStorage.length; m++){
    //         let prixProduitPanier = produitLocalStorage[m].price;

    //         // Mettre prix des produits dans variable "prixTotal"
    //         calculPrixTotal.push(prixProduitPanier);
    //     }
    //     // Additionner les prix de la variable "prixTotal" avec .reduce
    //     let reducer = (addition, valeuractuelle) => addition + valeuractuelle;
    //     let prixTotal = calculPrixTotal.reduce(reducer);
    //     console.log(prixTotal);
    //     // Html du prix total
    //     let htmlPrixTotal = `
    //     <h4 class="prix_total"><strong><i>Prix total: ${prixTotal}€</strong></i></h4>
    //     `
    //     container.insertAdjacentHTML = ("beforeend", htmlPrixTotal);

});

