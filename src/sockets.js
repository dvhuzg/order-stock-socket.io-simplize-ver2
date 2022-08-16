import { v4 as uuid } from "uuid";

let Commands = [];
var a = Array.apply(null, { length: Commands.length });
var b = Array.apply(null, { length: Commands.length });


export default (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("New Socket Connected:", socket.id);

    // Send all messages to the client
    socket.emit("server:loadCommands", Commands);

    socket.on("client:newCommand", (newCommand) => {
      const Command = { ...newCommand, id: uuid() };
      Commands.push(Command);
      io.emit("server:newCommand", Command);

      for (var i = 0; i < Commands.length; i++) {
        for (var j = 0; j < Commands.length; j++) {
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
                b[i]=j;
                b[j]=i;
                socket.emit("server:matchOrder", Commands, a,b);
              }
            }
          }
        }
      }

      console.log(Commands);
    });
    socket.on("client:deleteCommand", (CommandId) => {
      // console.log(CommandId);
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
