const CommandForm = document.querySelector("#CommandForm");
const code = document.querySelector("#code");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");
const order_type = document.querySelector("#order_type");

CommandForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (savedId) {
    updateCommand(savedId, code.value, quantity.value, price.value, order_type.value);
  } else {
    saveCommand(code.value, quantity.value, price.value, order_type.value);
  }

  code.value = "";
  quantity.value = "";
  price.value = "";
  order_type.value = "";
});
