import React, { useState, useEffect } from "react";
import Axios from "axios";
import useOrderFormatter from "../../hooks/common/useOrderFormatter";
import Button from "../../components/common/Button";
import Link from "next/link";
import Wrapper from "../../components/common/Wrapper";
import Header from "../../components/common/Header";
import Loader from "../../components/common/Loader";
import { useRouter } from "next/router";
import UserAuthorizationScreen from "../../components/common/UserAuthorizationScreen";
import { useGlobalContext } from "../../context/global";
import { QRCodeSVG } from "qrcode.react";
import CustomOrders from "../../components/profile/CustomOrders";

function Profile() {
  // useForbiddenRedirect();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { resetCart, setUser } = useGlobalContext();

  const formattedOrders = useOrderFormatter(orders, orderDetails);

  const fetchOrders = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/order/own`,
        { withCredentials: true }
      );

      setLoadingOrders(false);
      setOrders([...data.orders]);
      setOrderDetails([...data.orderDetails]);
    } catch (error) {
      // if (error.response && error.response.status == 403)
      //   router.push("/user/login");
    }
  };
  useEffect(fetchOrders, []);

  // delete user account
  const handleAccountDelete = async () => {
    if (confirm("Are you sure? This action is irreversible!")) {
      try {
        await Axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/user`, {
          withCredentials: true,
        });

        resetCart();
        router.push("/");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  // logout out the user
  const handleAccountLogout = async () => {
    try {
      await Axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/user/logout`, {
        withCredentials: true,
      });

      resetCart();
      setUser({ email: "", name: "", phone: "" });
      router.push("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen py-[12vh]">
      <UserAuthorizationScreen />
      <Header />
      <Wrapper>
        <div className="flex flex-col justify-between">
          <section>
            <h2 className="text-2xl font-semibold my-5 text-center">
              My orders
            </h2>
            <Loader loading={loadingOrders} text="Loading your orders" />
            <ul>
              {orders.length && !loadingOrders ? (
                formattedOrders.map((order, index) => (
                  <li
                    key={index}
                    className="bg-white rounded-xl p-3 mb-3 drop-shadow-md text-center"
                  >
                    <span className="flex justify-center py-3">
                      <QRCodeSVG value={order.id} />
                    </span>
                    <p>{order.items}</p>
                    <p>
                      {order.isClosed ? (
                        <span className="rounded-full text-white py-1 px-2 text-xs bg-green-500 mt-2 inline-block">
                          Closed
                        </span>
                      ) : (
                        <span className="rounded-full text-white py-1 px-2 text-xs bg-red-500 mt-2 inline-block">
                          Not closed
                        </span>
                      )}
                    </p>
                  </li>
                ))
              ) : (
                <>
                  {loadingOrders ? (
                    ""
                  ) : (
                    <div className="bg-white rounded-lg p-5 drop-shadow-md">
                      <p className="text-center">You have no orders!</p>
                      <Link href="/">
                        <a>
                          <Button
                            type="button"
                            text="Search Food"
                            classes="mx-auto mt-3"
                          />
                        </a>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </ul>
          </section>
        </div>

        {/* custom orders */}
        <CustomOrders />
      </Wrapper>
      <footer className="flex items-center justify-evenly bg-secondary text-primary fixed bottom-0 w-full h-[30px]">
        <p
          className="hover:underline text-xs cursor-pointer"
          onClick={handleAccountLogout}
        >
          Logout
        </p>
        <p
          className="hover:underline text-xs cursor-pointer"
          onClick={handleAccountDelete}
        >
          Delete Account
        </p>
      </footer>
    </main>
  );
}

export default Profile;
