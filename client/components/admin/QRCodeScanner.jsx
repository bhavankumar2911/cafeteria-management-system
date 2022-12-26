import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Axios from "axios";
import Button from "../common/Button";
import Wrapper from "../common/Wrapper";
import Close from "../icons/Close";

function QRCodeScanner() {
  const [showScanner, setShowScanner] = useState(true);
  const [order, setOrder] = useState({ id: "", items: "", orderedBy: "" });

  const handleSuccessfulScan = async (result, error) => {
    if (result) {
      console.log(result.text);
      try {
        const { data } = await Axios.get(
          `${process.env.NEXT_PUBLIC_API_HOST}/order/${result.text}`,
          { withCredentials: true }
        );

        console.log(data.order);
        setOrder({ ...data.order });
        setShowScanner(false);
      } catch (error) {
        alert(error.response.data.message);
      }
    }

    if (error) {
      return;
    }
  };

  const handleCloseOrder = async () => {
    try {
      await Axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOST}/order/${order.id}`,
        {},
        { withCredentials: true }
      );

      setOrder({});
      setShowScanner(true);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Wrapper>
        {showScanner ? (
          <QrReader
            onResult={handleSuccessfulScan}
            style={{ width: "100%" }}
            scanDelay={1000}
            facingMode={"rear"}
          />
        ) : (
          <p className="bg-white rounded-lg px-3 pt-3 pb-5 mt-5">
            <div className="flex justify-end">
              <span
                className="cursor-pointer"
                onClick={() => setShowScanner(true)}
              >
                <Close />
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Ordered by: {order.orderedBy}
            </p>
            <p className="font-semibold my-3">{order.items}</p>
            <Button
              type="button"
              text="Close order"
              clickHandler={handleCloseOrder}
            />
          </p>
        )}
      </Wrapper>
    </main>
  );
}

export default QRCodeScanner;
