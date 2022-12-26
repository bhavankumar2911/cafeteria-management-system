import React, { useState } from "react";
import Axios from "axios";
import Button from "../../components/common/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import LeftArrow from "../../components/icons/LeftArrow";
import Wrapper from "../../components/common/Wrapper";
import { useGlobalContext } from "../../context/global";

const inputClasses =
  "border border-gray-300 rounded-lg p-2 w-full outline-primary text-sm";
const inputGroupClasses = "mb-3";
const labelClasses = "mb-1 inline-block text-sm font-semibold";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();
  const { setUser } = useGlobalContext();

  const handleDataForm = (e) => {
    const field = e.target.name;
    const fieldValue = e.target.value;

    if (field == "username") setFormData({ ...formData, username: fieldValue });
    else setFormData({ ...formData, password: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/user/login`,
        { ...formData },
        { withCredentials: true }
      );

      setUser({ ...data.user });
      router.push("/user/profile");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleForgotPassword = async () => {
    if (confirm("Are you sure want to reset your password?")) {
      try {
        const { data } = await Axios.post(
          `${process.env.NEXT_PUBLIC_API_HOST}/generate-password-reset-id`,
          { username: formData.username }
        );

        if (data.success) {
          alert(data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <main className="flex flex-col justify-between">
      <div className="flex flex-col justify-start min-h-screen">
        <div>
          <Wrapper>
            <h1 className="text-center text-3xl text-primary font-bold py-5">
              Login
            </h1>
            <form onSubmit={handleSubmit}>
              <div className={inputGroupClasses}>
                <label htmlFor="username" className={labelClasses}>
                  Username
                </label>
                <br />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleDataForm}
                  className={inputClasses}
                />
              </div>
              <div className={inputGroupClasses}>
                <label htmlFor="password" className={labelClasses}>
                  Password
                </label>
                <br />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleDataForm}
                  className={inputClasses}
                />
              </div>
              <span className="pt-3 block">
                <Button type="submit" text="Login" />
              </span>
            </form>
            <div className="flex justify-between my-5">
              <p
                className="text-blue-500 hover:underline text-xs cursor-pointer"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </p>
              <p className="text-center text-xs">
                New user?{" "}
                <Link href="/user/signup">
                  <a className="text-blue-500 hover:underline">Sign up</a>
                </Link>
              </p>
            </div>
          </Wrapper>
        </div>
        <Link href="/">
          <a className="flex mx-auto my-10">
            <LeftArrow />
            <span className="inline-block ml-3">HOME</span>
          </a>
        </Link>
      </div>
    </main>
  );
}

export default Login;
