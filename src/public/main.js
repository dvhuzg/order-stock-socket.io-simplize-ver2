const OrderForm = document.querySelector("#OrderForm");
const code = document.querySelector("#code");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");
const order_type = document.querySelector("#order_type");

OrderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (savedId) {
    updateOrder(savedId, code.value, quantity.value, price.value, order_type.value);
  } else {
    saveOrder(code.value, quantity.value, price.value, order_type.value);
  }

  code.value = "";
  quantity.value = "";
  price.value = "";
  order_type.value = "";
});
