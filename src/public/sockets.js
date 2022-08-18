const socket = io.connect();

/**
 * create a new Order
 * @param {string} title a title for a new Order
 * @param {string} description a description for a new Order
 */
const saveOrder = (code, quantity, price, order_type) => {
  socket.emit("client:newOrder", {
    code,
    quantity,
    price,
    order_type
  });
};

/**
 * delete a Order based on an Id
 * @param {string} id a Order ID
 */
const deleteOrder = (id) => {
  socket.emit("client:deleteOrder", id);
};

/**
 *
 * @param {string} id Order ID
 * @param {string} title Order title
 * @param {string} description Order description
 */
const updateOrder = (id, code, quantity, price, order_type) => {
  socket.emit("client:updateOrder", {
    id,
    code,
    quantity,
    price,
    order_type,
  });
};

socket.on("server:loadOrders", renderOrders);

socket.on("server:newOrder", appendOrder);

socket.on("server:matchOrder", renderOrders);

socket.on("server:selectedOrder", (Order) => {
  const code = document.querySelector("#code");
  const quantity = document.querySelector("#quantity");
  const price = document.querySelector("#price");
  const order_type = document.querySelector("#order_type");

  code.value = Order.code;
  quantity.value = Order.quantity;
  price.value = Order.price;
  order_type.value = Order.order_type;

  savedId = Order.id;
});
