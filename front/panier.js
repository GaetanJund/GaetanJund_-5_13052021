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
                <h2>Le panier est vide</h2>
                <i class="fas fa-battery-empty"></i>
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
                <h6><i>Couleur choisie : ${produit.option_produit}</i></h6>
                <h6><i>Quantité : ${produit.quantite}</i></h6><br>
                <h5><strong>Prix : ${(produit.price).toFixed(2)} €</strong></h5><br>
                <button class="bouton_supprimer">Supprimer l'article</button>
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
            event.preventDefault();

            // Selection de l'id qui va être supprimé au clique
            let selectionSupprimer = produitLocalStorage[l].id;
            console.log(selectionSupprimer);

            // Méthode filter où je selectionne l'élement à garder et l'élement à supprimer (!== : garde tout les élements au lieu d'un seul si on faisait ==)
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
    <div class="vider_panier text-center">
        <button class="tout_supprimer_panier" style="width:300px"> Vider le panier </button>
    </div>
        `;
        // Insérer le bouton pour vider le panier
        container.insertAdjacentHTML("beforeend", supppressionPanierHtml);

    // Supprimer tout le localStorage
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
    let prixTotal = 0;

    // Boucle prixTotal, départ 0 + prix produit -> ainsi de suite
    for (let m = 0; m < produitLocalStorage.length; m++){
        prixTotal = prixTotal + produitLocalStorage[m].price
    }
    // Html du prix total
    let htmlPrixTotal = `
    <h2 class="prix_total"><strong>Prix total:  ${(prixTotal).toFixed(2)} €</strong></h2>
    `
    container.insertAdjacentHTML("beforeend", htmlPrixTotal);
   

    // // ---------- Création formulaire ----------
    // container.innerHTML += `
    //     <div class="col-12 recap_form">
    //         <form itemref="form-1" class="col-12">
    //         <h2 class="final_commande text-center"><u><strong>Finalisation de la commande</u></strong></h2>
    //             <div class="form-group col-12">
    //                 <label for="prenom">Prénom</label>
    //                 <input class="form-control" type="text" placeholder="Votre Prénom" id="prenom" required>
    //             </div>
    //             <div class="form-group col-12">
    //                 <label for="nom">Nom</label>
    //                 <input class="form-control" type="text" placeholder="Votre Nom" id="nom" required>
    //             </div>
    //             <div class="form-group col-12">
    //                 <label for="adresse">Adresse</label>
    //                 <input class="form-control" type="text" placeholder="Votre Adresse" id="adresse" required>
    //             </div>
    //             <div class="form-group col-12">
    //                 <label for="ville">Ville</label>
    //                 <input class="form-control" type="text" placeholder="Votre Ville" id="ville" required>
    //             </div>
    //             <div class="form-group col-12">
    //                 <label for="email">Email</label>
    //                 <input class="form-control" type="email" placeholder="Votre Email" id="email" required>
    //             </div><br>
    //             <div class="button_space1">
    //                 <input type="submit" id="envoi_form" value="Commander" class="button_commande" href="commande.html">
    //             </div>
    //             <div class="button_space">
    //                 <input type="submit" value="Continuer à regarder" class="button_commande" href="index.html">
    //             </div>
    //         </form>
    //     </div>
    //  `
    // // Récupération des valeurs du formulaire
    
    // // Selection bouton pour envoyer le formulaire
    // let envoyerForm = document.querySelector("#envoi_form");
    // // AddEventListener
    // envoyerForm.addEventListener("click", () => {
    //     localStorage.setItem("prenom", document.querySelector("#prenom").value);
    //     localStorage.setItem("nom", document.querySelector("#nom").value);
    //     localStorage.setItem("adresse", document.querySelector("#adresse").value);
    //     localStorage.setItem("ville", document.querySelector("#ville").value);
    //     localStorage.setItem("email", document.querySelector("#email").value);

    //     // Message alerte rediriger vers la partir commande
    //     alert("Votre commande a bien été validé");
    //     window.location.href = "commande.html";
    // // Faire un objet pour y mettre les values du formulaire : comme pour la récuparation des choix de l'utilisateur
    // });
    
});

