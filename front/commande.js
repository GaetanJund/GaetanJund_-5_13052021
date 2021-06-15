fetch('http://localhost:3000/api/furniture')
.then(response => response.json())
.then(furniture => {

    let containerPrixTotal = document.querySelector(".commande_prixTotal");
    let produitLocalStorage = recuperationPanier();
    console.log(produitLocalStorage);
    containerPrixTotal.innerHTML += `
    <h4><u>Prix total de la commande :</u> <strong>${(prixTotalPanier()).toFixed(2)} €</strong></h4>
    `

    let referenceCommande = document.querySelector(".commande_reference");
    let formulaireValeurs = recuperationFormulaire();
    console.log(formulaireValeurs);
    referenceCommande.innerHTML += `
        <div class="recap_commande">
            <h5>Référence de votre commande : <strong>orderID</strong></h5><br>
            <h5><strong><u>Informations de commande :</u></strong></h5>
            <p><i>Destinataire :</i>  ${formulaireValeurs.nom} ${formulaireValeurs.prenom}.</p>
            <p><i>Adresse de livraison :</i>  ${formulaireValeurs.adresse} à ${formulaireValeurs.ville}.</p>
            <p><i>E-Mail :</i>  ${formulaireValeurs.email}</p>
        </div>
        
        `
})