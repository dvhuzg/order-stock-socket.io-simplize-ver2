const CommandsList = document.querySelector("#Commands");

let savedId = "";

const CommandUI = (Command,a,b) => {
  const div = document.createElement("tr");
  div.innerHTML = `
  <td>${Command.code}</td>
  <td>${Command.quantity}</td>
  <td>${Command.price}</td>
  <td>${Command.order_type}</td>
  <td>${a===undefined?'Pending':a}</td>
  <td>${b}</td>
  <td>
  <button class="btn btn-danger delete" data-id="${Command.id}">delete</button>

  </td>
`;
  const btnDelete = div.querySelector(".delete");
  // const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () =>
    deleteCommand(btnDelete.dataset.id)
  );

  // btnUpdate.addEventListener("click", () => {
  //   socket.emit("client:getCommand", btnUpdate.dataset.id);
  // });

  return div;
};

const renderCommands = (Commands,a,b) => {
  savedId = "";
  // console.log(a);
  CommandsList.innerHTML = "";
  Commands.forEach((Command,index) =>
    CommandsList.append(CommandUI(Command,a[index],b[index]))
  );
};

const appendCommand = (Command) => {
  CommandsList.append(CommandUI(Command));
};
