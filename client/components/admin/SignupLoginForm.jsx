import React from "react";
import { useState } from "react";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

function SignupLoginForm({ formType, submissionRoute, redirect }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();

  //   updating form state
  const handleDataChange = (e) => {
    const field = e.target.id;
    const fieldValue = e.target.value;

    if (field == "username") {
      setFormData({ ...formData, username: fieldValue });
      return;
    }

    setFormData({ ...formData, password: fieldValue });
  };

  //   submitting the form data to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}${submissionRoute}`,
        { ...formData },
        { withCredentials: formType == "login" ? true : false }
      );

      router.push(redirect);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  //   template
  return (
    <div className="relative">
      <img
        src="/admin/bg-img.jpg"
        className="absolute h-screen w-screen top-0 left-0 object-cover -z-10 blur-[2px]"
      />
      <div className="mx-auto w-11/12 py-8 flex flex-col justify-between items-center min-h-screen">
        <img src="/admin/vec-logo.png" className="" />
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-70 p-8 rounded-[60px]"
        >
          <div className="mb-5">
            <label
              htmlFor="username"
              className="text-primary inline-block mb-1 pl-1 font-semibold"
            >
              Username
            </label>
            <br />
            <input
              name="username"
              type="text"
              value={formData.username}
              id="username"
              onChange={handleDataChange}
              className="rounded-full border border-primary border-2 py-2 px-3 outline-0 bg-transparent"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="text-primary inline-block mb-1 pl-1 font-semibold"
            >
              Password
            </label>
            <br />
            <input
              type="password"
              value={formData.password}
              id="password"
              onChange={handleDataChange}
              className="rounded-full border border-primary border-2 py-2 px-3 outline-0 bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary text-white py-2 px-7 uppercase text-sm mx-auto block outline-0"
          >
            {formType == "login" ? "Login" : "Sign Up"}
          </button>
          <p className="text-primary font-semibold text-center mt-3 text-sm">
            {formType == "login" ? "New user? " : "Already have an account? "}
            <Link href={formType == "login" ? "/admin/signup" : "/admin/login"}>
              <a>
                <u>{formType == "login" ? "Sign Up" : "Login"}</u>
              </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupLoginForm;
