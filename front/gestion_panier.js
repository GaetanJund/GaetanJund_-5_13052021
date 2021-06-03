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
    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
}