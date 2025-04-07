import meny from './info.json' with { type: 'json' };

document.addEventListener("DOMContentLoaded", () => {
  const menuList = document.getElementById("menu-list");
  const orderList = document.getElementById("order-list");
  const orderButton = document.getElementById("submit-order");
  let order = [];

  if (meny && Array.isArray(meny)) {
    meny.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("menu-item");

      const img = document.createElement("img");
      img.src = item.bilde;

      const navn = document.createElement("h3");
      navn.textContent = item.navn;

      const description = document.createElement("p");
      description.textContent = item.beskrivelse;

      const price = document.createElement("p");
      price.innerHTML = `<strong>Pris:</strong> ${item.pris} kr`;

      const button = document.createElement("button");
      button.textContent = "Legg til";
      button.classList.add("add-to-order");
      button.dataset.name = item.navn;
      button.dataset.price = item.pris;

      listItem.appendChild(img);
      listItem.appendChild(navn);
      listItem.appendChild(description);
      listItem.appendChild(price);
      listItem.appendChild(button);

      menuList.appendChild(listItem);
    });
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-order")) {
      const itemName = event.target.dataset.name;
      const itemPrice = parseInt(event.target.dataset.price, 10);

      order.push({ navn: itemName, pris: itemPrice });
      updateOrderList();
    }
  });

  function updateOrderList() {
    orderList.innerHTML = "";
    order.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.navn} - ${item.pris} kr`;
      orderList.appendChild(listItem);
    });
  }

  orderButton.addEventListener("click", () => {
    if (order.length > 0) {
      alert("Bestilling sendt! Takk for din ordre.");
      order = [];
      updateOrderList();
    } else {
      alert("Du har ikke lagt til noen varer i bestillingen.");
    }
  });
});