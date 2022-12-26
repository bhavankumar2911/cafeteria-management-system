import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/global";
import Axios from "axios";
import { useRouter } from "next/router";
import Header from "../../components/common/Header";
import Wrapper from "../../components/common/Wrapper";
import Button from "../../components/common/Button";
import Link from "next/link";
import TakeAwayLocation from "../../components/cart/TakeAwayLocation";

function Cart() {
  const router = useRouter();
  const { resetCart, cartCount } = useGlobalContext();
  let orderId = "";
  const [location, setLocation] = useState("");

  const {
    cart,
    handleQuantityIncrement,
    handleQuantityDecrement,
    cartTotal,
    loadCartFromStorage,
    user,
  } = useGlobalContext();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  // Step 3 in payment
  const saveOrderDetails = async (response) => {
    try {
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/order`,
        {
          cart: loadCartFromStorage(),
          razorpayOrderId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          takeawayLocation: location,
        },
        { withCredentials: true }
      );

      orderId = "";
      router.push("/user/profile");
      resetCart();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Step 2 in payment
  const proceedPayment = (orderData) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RP_TEST_KEY_ID,
      currency: orderData.currency,
      amount: orderData.amount,
      name: "Vec Canteen",
      description: "You are paying to VEC canteen to place your order",
      image: `/vec-logo-small.png`,
      order_id: orderData.orderId,
      handler: saveOrderDetails,
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone.substring(3),
      },
      theme: {
        color: "#642611",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Step 1 in payment
  const createRPOrder = async () => {
    // location validation
    if (!location) {
      alert("Kindly select a takeaway location");
      return;
    }

    // after validating location
    try {
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/payment/order`,
        { cart: loadCartFromStorage() },
        { withCredentials: true }
      );

      orderId = data.orderId;
      proceedPayment(data);
    } catch (error) {
      if (error.response.status == 403) return router.push("/user/login");
      alert(error.response.data.message);
    }
  };

  return (
    <main className="pt-[12vh] bg-gray-50 min-h-screen">
      <Wrapper>
        <Header />
        {cartCount() > 0 ? (
          <>
            <h1 className="text-2xl font-semibold my-5 text-center">My Cart</h1>

            {/* take away locations */}
            <TakeAwayLocation location={location} setLocation={setLocation} />

            <ul>
              {cart.map((cartItem, index) => (
                <li
                  key={index}
                  className="bg-white rounded-xl drop-shadow-md mb-3 flex items-center justify-between overflow-hidden p-2"
                >
                  <div>
                    <p className="font-semibold">{cartItem.foodName}</p>
                    <p>
                      Rs.{" "}
                      {new Intl.NumberFormat("en-IN").format(cartItem.amount)}
                    </p>
                  </div>
                  <div className="flex min-w-[50px] justify-between border rounded-xl overflow-hidden">
                    <button
                      data-food-id={cartItem.id}
                      onClick={(e) =>
                        handleQuantityDecrement(
                          parseInt(e.target.dataset.foodId)
                        )
                      }
                      className="border-r p-1 w-[25px] text-center inline-block cursor-pointer hover:bg-red-500 hover:text-white"
                    >
                      -
                    </button>
                    <p className="border-r p-1 w-[25px] text-center inline-block">
                      {cartItem.quantity}
                    </p>
                    <button
                      data-food-id={cartItem.id}
                      onClick={(e) =>
                        handleQuantityIncrement(
                          parseInt(e.target.dataset.foodId)
                        )
                      }
                      className=" p-1 w-[25px] text-center inline-block cursor-pointer hover:bg-green-500 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-center my-5 text-lg font-semibold">
              Total{" "}
              <span>
                Rs. {new Intl.NumberFormat("en-IN").format(cartTotal())}
              </span>
            </p>
            <span onClick={createRPOrder}>
              <Button type="button" text="Proceed to pay" />
            </span>
          </>
        ) : (
          <div className="text-center absolute top-1/2 left-0 right-0 px-5 -translate-y-1/2">
            <h2 className="my-5">Your cart is empty!</h2>
            <Link href="/">
              <a>
                <Button type="button" text="Search for food" />
              </a>
            </Link>
          </div>
        )}
      </Wrapper>
    </main>
  );
}

export default Cart;
