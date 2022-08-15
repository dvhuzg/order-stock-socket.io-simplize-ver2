const CommandsList = document.querySelector("#Commands");

let savedId = "";

const CommandUI = (Command) => {
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
  savedId = "";
  CommandsList.innerHTML = "";
  Commands.forEach((Command) =>
    CommandsList.append(CommandUI(Command))
  );
};

const appendCommand = (Command) => {
  CommandsList.append(CommandUI(Command));
};
