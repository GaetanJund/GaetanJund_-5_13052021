// Rappel à commande
fetch('http://localhost:3000/api/furniture/')
.then(response => response.json())
.then(furniture => {

  let container = document.querySelector(".panier .row");

    // ------- Récupérer les données du localstorage
    // Variable enregistrement dans le local storage
    let produitLocalStorage = recuperationPanier();

    // Si panier est vide, afficher texte 'panier vide'
    if (produitLocalStorage.length == 0) {
        let panierVide = `
            <div class="panier-vide">
                <h2>Le panier est vide !</h2>
                <i class="fas fa-battery-empty"></i>
                <div class="ligne_panier2"></div>
            </div>`;
            container.innerHTML = panierVide;
    }
    else{
        // si panier n'est pas vide, afficher les produits
        let structureProduitPanier = [];

        for (let produit of produitLocalStorage){
           
            structureProduitPanier += `
            <div class="recapitulatif">
                <div class="produit_image_panier">
                    <img src="${produit.image}"></img>
                </div><br>
                <h4><strong>${produit.name}</strong></h4>
                <h6><i>Vernis choisi : ${produit.option_produit}.</i></h6>
                <h6><i>Quantité : ${produit.quantite}</i></h6><br>
                <h5><strong>Prix unité : ${produit.price} €</strong></h5><br>
                <button class="bouton_supprimer" data-id="${produit.id}" data-option="${produit.option_produit}">Supprimer l'article</button>
                <div class="ligne_panier"></div>
            </div>`;
        }
            container.innerHTML = structureProduitPanier;
            console.log(produitLocalStorage);
    }

    // Bouton suppression d'un article
    let btn_supprimer = document.querySelectorAll(".bouton_supprimer");
    console.log(btn_supprimer);

    for (let l = 0; l < btn_supprimer.length; l++){
        btn_supprimer[l].addEventListener("click", (event) => {
            supprimerProduit(event.target.dataset.id,event.target.dataset.option);

            // Message suppression de l'article du panier
            window.location.assign("panier.html");
        });
    }

    // Vider totalement le panier
    // Supprimer tout le localStorage
    let boutonToutSupprimer = document.querySelector(".tout_supprimer_panier");
    boutonToutSupprimer.addEventListener("click", () => {
        // remove.item pour tout vider
        viderPanier();
        // Message tout le panier est vide
        window.location.reload();
    })

    // ---------- Création prix total ----------
    // Html du prix total
    let htmlPrixTotal = `
    <h2 class="prix_total"><strong>Panier :  ${(prixTotalPanier()).toFixed(2)} €</strong></h2>
    `
    container.insertAdjacentHTML("beforeend", htmlPrixTotal);
   

    // ---------- Création formulaire ----------
    // Selection bouton du formulaire
    let formulaire = document.querySelector("#form-1");

    // AddEventListener
    formulaire.addEventListener("submit", (e) =>{
        e.preventDefault();
        if (formulaire.reportValidity()){
        
    // Récuperation des valeurs du formulaire pour les mettre dans une "key"
    let formulaireValeurs = {
        firstName : document.querySelector("#firstName").value,
        lastName : document.querySelector("#lastName").value,
        address : document.querySelector("#address").value,
        city : document.querySelector("#city").value,
        email : document.querySelector("#email").value,
    }

    // Mettre l'objet "formulaireValeurs" dans le localStorage via une key
    localStorage.setItem("formulaireValeurs", JSON.stringify(formulaireValeurs));

    // Valeurs formulaire et produits de l'utilisateurs vers le serveur
    let envoiDonnees = ({
        products : recuperationPanierId(),
        contact : formulaireValeurs
    });
    console.log("Test envoi données");
    console.log(envoiDonnees);

    fetch("http://localhost:3000/api/furniture/order", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(envoiDonnees)
    })
    .then(
        result => result.json()
    )
    .then(
        data => {
            window.location.assign(`commande.html?orderId=${data.orderId}`);
        }
    )
}
   
});

});