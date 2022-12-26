import React from "react";
import QRCodeScanner from "../../components/admin/QRCodeScanner";

function orders() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-center font-bold pt-10">Close order</h1>
      <div>
        <QRCodeScanner />
      </div>
    </div>
  );
}

export default orders;
