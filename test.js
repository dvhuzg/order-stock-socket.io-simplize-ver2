var Commands = [
  {
    code: "ACB",
    quantity: 123,
    price: 45,
    order_type: "Buy",
  },
  {
    code: "ACB",
    quantity: 100,
    price: 45,
    order_type: "Sell",
  },
  {
    code: "ACB",
    quantity: 20,
    price: 40,
    order_type: "Sell",
  },
];
var a = Array.apply(null, { length: Commands.length });
      for (var i = 0; i < Commands.length; i++) {
        for (var j = 0; j < Commands.length; j++) {
          if (Commands[i].code === Commands[j].code) {
            if (Commands[i].order_type !== Commands[j].order_type) {
              if (
                (Commands[i].price >= Commands[j].price && Commands[i].order_type === "Buy") ||
                (Commands[j].price >= Commands[i].price && Commands[i].order_type === "Sell")
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
      console.log(Commands);
console.log(a);
