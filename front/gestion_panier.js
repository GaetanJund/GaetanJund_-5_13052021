function recuperationPanier() {
    let produitLocalStorage = localStorage.getItem("produit");
    if (!produitLocalStorage) {
        return [];
    }
    else {
        return JSON.parse(produitLocalStorage);
    }
}

function enregistrementProduit(produit) {
    let produitLocalStorage = recuperationPanier();
    console.log(produitLocalStorage);
    let produitPanier = produitLocalStorage.find(p => p.id == produit.id && p.option_produit == produit.option_produit);
    if (!produitPanier) {
        produitLocalStorage.push(produit);
    }
    else{
        produitPanier.quantite += produit.quantite;
    }
    enregistrerPanier(produitLocalStorage);
}

function prixTotalPanier() {
    let produitLocalStorage = recuperationPanier();
    let prixTotal = 0;
    for (let produit of produitLocalStorage){
        prixTotal += produit.price * produit.quantite;
    }
    return prixTotal;
}

function viderPanier () {
    localStorage.removeItem("produit");
}

function enregistrerPanier (panier) {
    localStorage.setItem("produit", JSON.stringify(panier));
}

function supprimerProduit (id,option) {
    let produitLocalStorage = recuperationPanier();
    produitLocalStorage = produitLocalStorage.filter( element => element.id !== id || element.option_produit !== option);
    enregistrerPanier(produitLocalStorage);
}

function recuperationFormulaire() {
    let produitLocalStorage = localStorage.getItem("formulaireValeurs");
    if (!produitLocalStorage) {
        return [];
    }
    else {
        return JSON.parse(produitLocalStorage);
    }
}

function recuperationPanierId() {
    let produitLocalStorage = recuperationPanier();
    return produitLocalStorage.map(produit => produit.id);
}