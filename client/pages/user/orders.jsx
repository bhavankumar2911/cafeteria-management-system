import React, { useState, useEffect } from "react";
import Axios from "axios";
import useOrderFormatter from "../../hooks/common/useOrderFormatter";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const formattedOrders = useOrderFormatter(orders, orderDetails);

  const fetchOrders = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/order/own`,
        { withCredentials: true }
      );

      setOrders([...data.orders]);
      setOrderDetails([...data.orderDetails]);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(fetchOrders, []);

  return (
    <div>
      <section>
        {formattedOrders.map((order, index) => (
          <li key={index}>
            <p>{order.items}</p>
            <p>Status: {order.isClosed ? "Closed" : "Pending"}</p>
          </li>
        ))}
      </section>
    </div>
  );
}

export default Orders;
