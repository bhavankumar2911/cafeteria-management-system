import Link from "next/link";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Loader from "../../components/common/Loader";
import CustomOrders from "../../components/admin/CustomOrders";
import APIRequestError from "../../helpers/APIRequestError";

function Dashboard() {
  const [loadingOrderCount, setLoadingOrderCount] = useState(true);
  const [quantityOfEachItem, setQuantityOfEachItem] = useState({});
  const [allOrdersClosed, setAllOrdersClosed] = useState(false);

  const fetchOrdersCount = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/order/count`,
        {
          withCredentials: true,
        }
      );

      const { orderDetails } = data;

      if (orderDetails.length > 0) {
        let tempQuantity = { ...quantityOfEachItem };
        orderDetails.forEach((detail) => {
          const { foodName, quantity } = detail;
          if (!tempQuantity.hasOwnProperty(foodName))
            tempQuantity[foodName] = quantity;
          else tempQuantity[foodName] = tempQuantity[foodName] + quantity;
        });

        setQuantityOfEachItem({ ...tempQuantity });
      } else {
        setAllOrdersClosed(true);
      }
      setLoadingOrderCount(false);
    } catch (error) {
      APIRequestError(error, true, true);
    }
  };
  useEffect(fetchOrdersCount, []);

  const displayCount = () => {
    let UI = [];
    for (const item in quantityOfEachItem) {
      UI.push(
        <tr className="border-b last:border-0">
          <td className="py-1 px-2">{item}</td>
          <td className="py-1 px-2">{quantityOfEachItem[item]}</td>
        </tr>
      );
    }

    return [...UI];
  };

  return (
    <div className="relative bg-gray-50">
      <img
        src="/admin/pizza.jpg"
        className="w-screen h-screen object-cover absolute -z-10"
      />
      <div className="mx-auto w-11/12 pt-14">
        <h1 className="text-primary opacity-80 rounded-lg text-2xl font-bold text-center py-3">
          Dashboard
        </h1>

        <h2 className="text-lg py-5 text-center">Total number of orders</h2>
        {loadingOrderCount ? (
          <Loader text="Loading number of orders" loading={loadingOrderCount} />
        ) : (
          <>
            {allOrdersClosed ? (
              <p className="text-center">All orders are closed!</p>
            ) : (
              <table className="mx-auto w-full bg-white rounded-lg overflow-hidden drop-shadow-md">
                <thead className="border-b bg-primary text-white">
                  <tr>
                    <th className="!text-left py-3 px-2 !font-semibold">
                      Food
                    </th>
                    <th className="!text-left py-3 px-2 !font-semibold">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>{displayCount()}</tbody>
              </table>
            )}
          </>
        )}

        {/* custom orders */}
        <CustomOrders />

        <ul
          className="rounded-3xl px-3 py-5 flex flex-col items-center mt-10"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <li className="bg-primary text-white py-3 px-4 rounded-full mb-4 w-3/4 text-center">
            <Link href="/admin/orders">
              <a>Close orders</a>
            </Link>
          </li>
          <li className="bg-primary text-white py-3 px-4 rounded-full mb-4 w-3/4 text-center">
            <Link href="/admin/menu">
              <a>Manage menu</a>
            </Link>
          </li>
          <li className="bg-primary text-white py-3 px-4 rounded-full mb-4 w-3/4 text-center">
            <Link href="#">
              <a>Edit profile</a>
            </Link>
          </li>
          <button className="bg-primary text-white py-3 px-4 rounded-full w-3/4 text-center">
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
