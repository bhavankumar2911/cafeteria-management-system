import React from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import User from "../icons/User";
import Axios from "axios";
import Cart from "../icons/Cart";
import { useGlobalContext } from "../../context/global";

function Header() {
  const { cartCount } = useGlobalContext();

  return (
    <div className="fixed w-full top-0 left-0 bg-white h-[12vh] flex items-center justify-center z-10">
      <Wrapper>
        <div className="flex justify-between items-center">
          <Link href="/">
            <a>
              <img src="/admin/vec-logo.png" alt="logo" className="w-[100px]" />
            </a>
          </Link>
          <span className="flex items-center">
            <Link href="/user/profile">
              <a className="cursor-pointer inline-block mr-3 flex items-center text-sm">
                <User />
                <span className="inline-block ml-1">Profile</span>
              </a>
            </Link>
            <Link href="/user/cart">
              <a className="relative mr-[15px] text-sm">
                <span className="bg-primary text-white text-xs w-[20px] h-[20px] flex items-center justify-center rounded-full inline-block absolute -right-3 -top-3">
                  {cartCount()}
                </span>
                <Cart />
              </a>
            </Link>
          </span>
        </div>
      </Wrapper>
    </div>
  );
}

export default Header;
