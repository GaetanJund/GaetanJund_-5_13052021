// Création index.html
fetch('http://localhost:3000/api/furniture')
  .then(response => response.json())
  .then(data => {
      let container = document.querySelector("#Furniture .row");
        data.forEach(furniture => {
          container.innerHTML += `<div class="card-body col-12 col-xl-4">
          <img src="${furniture.imageUrl}" alt="${furniture.name}"><br><br>
          <h3 class="card-title">${furniture.name}</h3><br>
          <h6 class="card-text">Couleurs disponibles : ${furniture.varnish}.</h6><br>
          <h5 class="card-text">${(furniture.price / 100).toFixed(2)} €</h5>
          <a class="acces_produit" href="produit.html?products_id=${furniture._id}">Accéder au produit</a>
          </div>`;
    })   
  });