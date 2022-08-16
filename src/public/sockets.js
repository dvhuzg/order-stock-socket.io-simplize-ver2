const socket = io.connect();

/**
 * create a new Command
 * @param {string} title a title for a new Command
 * @param {string} description a description for a new Command
 */
const saveCommand = (code, quantity, price, order_type) => {
  socket.emit("client:newCommand", {
    code,
    quantity,
    price,
    order_type
  });
};

/**
 * delete a Command based on an Id
 * @param {string} id a Command ID
 */
const deleteCommand = (id) => {
  socket.emit("client:deleteCommand", id);
};

/**
 *
 * @param {string} id Command ID
 * @param {string} title Command title
 * @param {string} description Command description
 */
const updateCommand = (id, code, quantity, price, order_type) => {
  socket.emit("client:updateCommand", {
    id,
    code,
    quantity,
    price,
    order_type,
  });
};

socket.on("server:loadCommands", renderCommands);

socket.on("server:newCommand", appendCommand);

socket.on("server:matchOrder", renderCommands);

socket.on("server:selectedCommand", (Command) => {
  const code = document.querySelector("#code");
  const quantity = document.querySelector("#quantity");
  const price = document.querySelector("#price");
  const order_type = document.querySelector("#order_type");

  code.value = Command.code;
  quantity.value = Command.quantity;
  price.value = Command.price;
  order_type.value = Command.order_type;

  savedId = Command.id;
});
