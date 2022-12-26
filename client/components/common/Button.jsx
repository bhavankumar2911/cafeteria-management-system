import React from "react";

function Button({ type, text, classes, clickHandler }) {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={`bg-primary text-white w-full rounded-xl py-2 block font-semibold hover:bg-secondary outline-0 hover:text-primary px-4 ${classes}`}
    >
      {text}
    </button>
  );
}

export default Button;
