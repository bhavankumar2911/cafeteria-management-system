import React from "react";

function Wrapper({ children }) {
  return <div className="w-11/12 mx-auto sm:max-w-[700px]">{children}</div>;
}

export default Wrapper;
