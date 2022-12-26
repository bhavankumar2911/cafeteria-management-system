module.exports = (cart) => {
  //   checking if the cart is an array with atleast 1 product
  if (typeof cart !== "object" || cart.length == 0)
    return {
      isValid: false,
      message: "Please select products to place an order",
    };

  // checking if cart item contains all the properties
  let isValid = true;

  cart.forEach((cartItem) => {
    if (
      !cartItem.id ||
      !cartItem.foodName ||
      !cartItem.isAvailable ||
      !cartItem.amount ||
      !cartItem.price ||
      !cartItem.quantity
    )
      isValid = false;
  });

  if (!isValid)
    return {
      isValid,
      message: "Invalid request. Cannot confirm order",
    };

  return {
    isValid,
    message: "The cart is valid",
  };
};
