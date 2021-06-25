// recup de l'id dans l'url
let searchParam = (new URL(window.location)).searchParams;
// extraire id
let id = searchParam.get("orderId");

    let containerPrixTotal = document.querySelector(".commande_prixTotal");
    let produitLocalStorage = recuperationPanier();
    console.log(produitLocalStorage);
    containerPrixTotal.innerHTML += `
    <h4><u>Prix total de la commande</u> : <strong>${(prixTotalPanier()).toFixed(2)} €</strong></h4>
    `

    let referenceCommande = document.querySelector(".commande_reference");
    let formulaireValeurs = recuperationFormulaire();
    console.log(formulaireValeurs);
    referenceCommande.innerHTML += `
        <div class="recap_commande">
            <h5>Référence de votre commande : <strong>${id}.</strong></h5><br>
            <h5><strong><u>Informations de commande :</u></strong></h5>
            <p><i>Destinataire :</i>  ${formulaireValeurs.lastName} ${formulaireValeurs.firstName}.</p>
            <p><i>Adresse de livraison :</i>  ${formulaireValeurs.address} à ${formulaireValeurs.city}.</p>
            <p><i>E-Mail :</i>  ${formulaireValeurs.email}</p>
        </div>
        `

    // Clear tout le localStorage
    localStorage.clear();