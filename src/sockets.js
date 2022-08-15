import { v4 as uuid } from "uuid";

let Commands = [];

export default (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    socket.emit("server:loadCommands", Commands);

    socket.on("client:newCommand", (newCommand) => {
      const Command = { ...newCommand, id: uuid() };
      Commands.push(Command);
      io.emit("server:newCommand", Command);
    });

    socket.on("client:deleteCommand", (CommandId) => {
      console.log(CommandId);
      Commands = Commands.filter((Command) => Command.id !== CommandId);
      io.emit("server:loadCommands", Commands);
    });

    socket.on("client:getCommand", (CommandId) => {
      const Command = Commands.find((Command) => Command.id === CommandId);
      socket.emit("server:selectedCommand", Command);
    });

    socket.on("client:updateCommand", (updatedCommand) => {
      Commands = Commands.map((Command) => {
        if (Command.id === updatedCommand.id) {
          Command.code = updatedCommand.code;
          Command.quantity = updatedCommand.quantity;
          Command.price = updatedCommand.price;
          Command.order_type = updatedCommand.order_type;
        }
        return Command;
      });
      io.emit("server:loadCommands", Commands);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
