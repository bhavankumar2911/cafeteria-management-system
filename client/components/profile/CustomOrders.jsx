import Axios from "axios";
import { useState, useEffect } from "react";
import APIRequestError from "../../helpers/APIRequestError";
import { QRCodeSVG } from "qrcode.react";

const CustomOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/custom-order/as-user`,
        { withCredentials: true }
      );

      console.log(response);
      setOrders([...response.data.orders]);
    } catch (error) {
      APIRequestError(error, false, true);
    }
  };
  useEffect(fetchOrders, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold my-5 text-center">Custom Orders</h2>
      {orders.length == 0 && (
        <p className="text-center">You have no custom orders</p>
      )}
      <ul>
        {orders.map((order, index) => {
          const { id, description, approvalStatus } = order;

          return (
            <li
              className="bg-white rounded-lg p-2 mb-3 border flex flex-col items-center"
              key={index}
            >
              <div className="py-3">
                <QRCodeSVG value={id} />
              </div>
              <p className="text-center">{description}</p>
              {approvalStatus ? (
                <span className="text-white rounded-[50px] font-semibold bg-green-600 py-1 px-2 text-sm inline-block mt-3">
                  Approved
                </span>
              ) : (
                <span className="text-white rounded-[50px] font-semibold bg-red-500 py-1 px-2 text-sm inline-block mt-3">
                  Not Approved
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CustomOrders;
