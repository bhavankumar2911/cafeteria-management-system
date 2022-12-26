import React from "react";
import Heart from "../icons/Heart";

function Footer() {
  return (
    <div className="text-sm text-center py-5">
      Made with{" "}
      <span className="text-red-500 inline-block translate-y-1">
        <Heart />
      </span>{" "}
      by{" "}
      <a
        href="https://www.linkedin.com/in/bhavan-kumar-599562223/"
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Bhavan,{" "}
      </a>
      <a
        href="https://www.linkedin.com/in/kuralovian-c-180777226/"
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Kural,{" "}
      </a>
      and{" "}
      <a
        href="https://www.linkedin.com/in/shakthi-k-0b2102225/"
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Shakthi
      </a>
    </div>
  );
}

export default Footer;
