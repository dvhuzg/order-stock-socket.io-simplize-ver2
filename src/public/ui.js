const OrdersList = document.querySelector("#Orders");

let savedId = "";

const OrderUI = (Order, a, b, c) => {
  const div = document.createElement("tr");
  div.innerHTML = `
  <td>${c}</td>
  <td>${Order.code}</td>
  <td>${Order.quantity}</td>
  <td>${Order.price}</td>
  <td>${Order.order_type}</td>
  <td>${a === undefined ? "Pending" : a}</td>
  <td>${b == undefined ? "Pending" : b}</td>
`;
  return div;
};

const renderOrders = (Orders, a, b, c) => {
  savedId = "";
  // console.log(a);
  OrdersList.innerHTML = "";
  Orders.forEach((Order, index) =>
    OrdersList.append(OrderUI(Order, a[index], b[index], c[index + 1]))
  );
};

const appendOrder = (Order) => {
  OrdersList.append(OrderUI(Order));
};
