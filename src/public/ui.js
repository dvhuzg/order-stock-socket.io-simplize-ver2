const CommandsList = document.querySelector("#Commands");

let savedId = "";

const CommandUI = (Command,a) => {
  const div = document.createElement("tr");
  div.innerHTML = `
  <td>${Command.code}</td>
  <td>${Command.quantity}</td>
  <td>${Command.price}</td>
  <td>${Command.order_type}</td>
  <td>${a}</td>
  <td>
  <button class="btn btn-danger delete" data-id="${Command.id}">delete</button>
  <button class="btn btn-secondary update" data-id="${Command.id}">update</button>
  </td>
`;
  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () =>
    deleteCommand(btnDelete.dataset.id)
  );

  btnUpdate.addEventListener("click", () => {
    socket.emit("client:getCommand", btnUpdate.dataset.id);
  });

  return div;
};

const renderCommands = (Commands) => {
  var a = Array.apply(null, { length: Commands.length });

  for (var i = 0; i < Commands.length; i++) {
    for (var j = i + 1; j < Commands.length; j++) {
      if (Commands[i].code === Commands[j].code) {
        if (Commands[i].order_type !== Commands[j].order_type) {
          if (
            (Commands[i].price >= Commands[j].price &&
              Commands[i].order_type === "Buy") ||
            (Commands[j].price >= Commands[i].price &&
              Commands[i].order_type === "Sell")
          ) {
            if (Commands[i].quantity === 0 || Commands[j].quantity === 0) {
              break;
            }
            a[i] = Math.min(Commands[i].quantity, Commands[j].quantity);
            a[j] = a[i];
            Commands[i].quantity = Commands[i].quantity - a[i];
            Commands[j].quantity = Commands[j].quantity - a[i];
          }
        }
      }
    }
  }
  // console.log(a);
  savedId = "";
  CommandsList.innerHTML = "";
  Commands.forEach((Command, index) =>
    CommandsList.append(CommandUI(Command, a[index],index))
  );
};

const appendCommand = (Command) => {
  CommandsList.append(CommandUI(Command));
};
