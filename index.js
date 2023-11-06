document.addEventListener("DOMContentLoaded", function () {
  const colombianButton = document.getElementById("colombianButton");
  const paisaButton = document.getElementById("paisaButton");

  let menuData;

  function loadAndShowDishes(category) {
      fetch('dishes.json')
          .then(response => response.json())
          .then(data => {
              menuData = data;
              showDishes(category);
          })
          .catch(error => console.error('Error loading JSON file:', error));
  }

  function showDishes(category) {
      const menuContainer = document.getElementById("menuContainer");
      menuContainer.innerHTML = '';

      if (menuData && menuData[category]) {
          const dishes = menuData[category];
          for (let i = 0; i < dishes.length; i += 2) {
              const row = document.createElement('div');
              row.classList.add('row');

              if (dishes[i]) {
                  row.innerHTML += createDishColumn(dishes[i]);
              }

              
              if (dishes[i + 1]) {
                  row.innerHTML += createDishColumn(dishes[i + 1]);
              }

              menuContainer.appendChild(row);
          }
      } else {
          menuContainer.innerHTML = '<p>No dishes available in this category.</p>';
      }
  }

  function createDishColumn(dish) {
      return `
          <div class="col-md-6 mb-4">
              <div class="card">
                  <img src="${dish.image}" class="card-image" alt="${dish.name}">
                  <div class="card-text">
                      <h5 class="card-title">${dish.name}</h5>
                      <p class="card-body">${dish.description}</p>
                      <p class="card-price">Price: $${dish.price}</p>
                  </div>
              </div>
          </div>
      `;
  }

  colombianButton.addEventListener("click", function () {
      loadAndShowDishes("colombian_food");
  });

  paisaButton.addEventListener("click", function () {
      loadAndShowDishes("paisa_food");
  });
});
