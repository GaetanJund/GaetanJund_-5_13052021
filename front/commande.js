fetch('http://localhost:3000/api/furniture/')
.then(response => response.json())
.then(furniture => {

    let container = document.querySelector(".commande .row");
    let produitLocalStorage = recuperationPanier();
    console.log(produitLocalStorage);

    // Affichage de la commande
    let structureCommande = [];

        for (let produit of produitLocalStorage){
           
            structureCommande += `
            <div class="row commande">
                <div class="col-12 text-center commande_thanks">
                    <h2>Merci pour votre commande !</h2>
                    <i class="fas fa-battery-full"></i><br><br>
                    <h6>Toute l'équipe d'Orinoco vous remercie<i class="fas fa-smile"></i></h6>
                </div>
                <div class="col-12 text-center commande_colis">
                    <h6>Votre colis est en cours de préparation et une alerte vous sera envoyé dès que le colis sera en route.</h6>
                </div>
                <div class="col-12 text-center commande_reference">
                    <h6>Référence de la commande : 1111</h6>
                </div>
                <div class="col-12 text-center total_article">
                <h4><i><u>Récapitulatif de commande</u></i></h4><br><br>
                <img src="${produit.image}" alt="${produit.name}" style="width:200px"><br>
                    <h5>${produit.name}</h5>
                    <h6>Quantité : ${produit.quantite}</h6>
                </div>
                <div class="col-12 text-center commande_prix">
                    <h6>Prix total : €</h6>
                </div>
            </div>`;
        };
        container.innerHTML = structureCommande;
});