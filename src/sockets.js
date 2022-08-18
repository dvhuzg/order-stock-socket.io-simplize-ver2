import { v4 as uuid } from "uuid";

let Orders = [];
var a = Array.apply(null, { length: Orders.length });
var b = Array.apply(null, { length: Orders.length });
var c = Array.apply(null, { length: Orders.length });

export default (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("New Socket Connected:", socket.id);

    // Send all messages to the client
    socket.emit("server:loadOrders", Orders);

    socket.on("client:newOrder", (newOrder) => {
      const Order = { ...newOrder, id: uuid() };
      Orders.push(Order);
      io.emit("server:newOrder", Order);

      for (var i = 0; i < Orders.length; i++) {
        for (var j = 0; j < Orders.length; j++) {
          if (Orders[i].code === Orders[j].code) {
            if (Orders[i].order_type !== Orders[j].order_type) {
              if (
                (Orders[i].price >= Orders[j].price &&
                  Orders[i].order_type === "Buy") ||
                (Orders[j].price >= Orders[i].price &&
                  Orders[i].order_type === "Sell")
              ) {
                if (Orders[i].quantity === 0 || Orders[j].quantity === 0) {
                  break;
                }
                a[i] = Math.min(Orders[i].quantity, Orders[j].quantity);
                a[j] = a[i];
                Orders[i].quantity = Orders[i].quantity - a[i];
                Orders[j].quantity = Orders[j].quantity - a[i];
                b[i] = j;
                b[j] = i;
                
              }
            }
          }
        }
      }

      for (var o = 0; o < Orders.length; ++o) {
        c[i] = o;
      }
      io.emit("server:matchOrder", Orders, a, b,c);
    });
    socket.on("client:deleteOrder", (OrderId) => {
      // console.log(OrderId);
      Orders = Orders.filter((Order) => Order.id !== OrderId);
      io.emit("server:loadOrders", Orders);
    });

    socket.on("client:getOrder", (OrderId) => {
      const Order = Orders.find((Order) => Order.id === OrderId);
      socket.emit("server:selectedOrder", Order);
    });

    socket.on("client:updateOrder", (updatedOrder) => {
      Orders = Orders.map((Order) => {
        if (Order.id === updatedOrder.id) {
          Order.code = updatedOrder.code;
          Order.quantity = updatedOrder.quantity;
          Order.price = updatedOrder.price;
          Order.order_type = updatedOrder.order_type;
        }
        return Order;
      });
      io.emit("server:loadOrders", Orders);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
