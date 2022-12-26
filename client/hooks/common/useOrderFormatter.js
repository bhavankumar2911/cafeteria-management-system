function useOrderFormatter(orders, orderDetails) {
  let formattedOrders = [];

  // formatting the orders data for displaying
  orders.forEach((order) => {
    let itemsForEachOrder = [];
    let commaSeparatedItems = "";

    orderDetails.forEach((orderDetail) => {
      if (order.id == orderDetail.orderId) {
        const { foodName, quantity } = orderDetail;
        itemsForEachOrder.push({ foodName, quantity });
      }
    });

    itemsForEachOrder.forEach(
      (item) => (commaSeparatedItems += `, ${item.foodName} ${item.quantity}`)
    );

    formattedOrders.push({
      id: order.id,
      isClosed: order.isClosed,
      orderedBy: order.User.name,
      items: commaSeparatedItems.substring(2),
    });
  });

  return formattedOrders;
}

export default useOrderFormatter;
