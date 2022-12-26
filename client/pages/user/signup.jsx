import React, { useState } from "react";
import Axios from "axios";
import Button from "../../components/common/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import LeftArrow from "../../components/icons/LeftArrow";
import Wrapper from "../../components/common/Wrapper";

const inputClasses =
  "border border-gray-300 rounded-lg p-2 w-full outline-primary text-sm";
const inputGroupClasses = "mb-3";
const labelClasses = "mb-1 inline-block text-sm font-semibold";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+91",
    registerNumber: "",
    department: "",
    graduationYear: "",
    username: "",
    password1: "",
    password2: "",
  });
  const router = useRouter();

  const handleDataChange = (e) => {
    const field = e.target.name;
    let fieldValue = e.target.value;

    switch (field) {
      case "name":
        setFormData({ ...formData, name: fieldValue });
        break;
      case "email":
        setFormData({ ...formData, email: fieldValue });
        break;
      case "phone":
        if (fieldValue.length >= 3 && fieldValue.length <= 13) {
          fieldValue = fieldValue.substring(3);
          setFormData({ ...formData, phone: `+91${fieldValue}` });
        }
        break;
      case "registerNumber":
        setFormData({ ...formData, registerNumber: fieldValue });
        break;
      case "department":
        setFormData({ ...formData, department: fieldValue });
        break;
      case "graduationYear":
        setFormData({ ...formData, graduationYear: fieldValue });
        break;
      case "username":
        setFormData({ ...formData, username: fieldValue });
        break;
      case "password1":
        setFormData({ ...formData, password1: fieldValue });
        break;
      case "password2":
        setFormData({ ...formData, password2: fieldValue });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ ...formData });
    try {
      await Axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/user`, {
        ...formData,
      });

      router.push("/user/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <main>
      <div className="flex flex-col justify-start min-h-screen">
        <div>
          <Wrapper>
            <h1 className="text-center text-3xl text-primary font-bold py-5">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit}>
              <div className={inputGroupClasses}>
                <label htmlFor="name" className={labelClasses}>
                  Name
                </label>
                <br />
                <input
                  type="text"
                  name="name"
                  className={inputClasses}
                  value={formData.name}
                  onChange={handleDataChange}
                />
              </div>
              <div className={inputGroupClasses}>
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  className={inputClasses}
                  value={formData.email}
                  onChange={handleDataChange}
                />
              </div>
              <div className={inputGroupClasses}>
                <label htmlFor="phone" className={labelClasses}>
                  Phone number
                </label>
                <br />
                <div>
                  <input
                    type="text"
                    name="phone"
                    className={inputClasses}
                    value={formData.phone}
                    onChange={handleDataChange}
                  />
                </div>
              </div>
              <div className={inputGroupClasses}>
                <label htmlFor="registerNumber" className={labelClasses}>
                  Exam register number
                </label>
                <br />
                <input
                  type="number"
                  name="registerNumber"
                  className={inputClasses}
                  value={formData.registerNumber}
                  onChange={handleDataChange}
                />
              </div>
              <div className={inputGroupClasses}>
                <label htmlFor="department" className={labelClasses}>
                  Department
                </label>
                <br />
                <select
                  name="department"
                  className={inputClasses}
                  value={formData.department}
                  onChange={handleDataChange}
                >
                  <option value="">Select</option>
                  <option value="Automobile Engineering">
                    Automobile Engineering
                  </option>
                  <option value="Artificial Intelligence and Data Science">
                    Artificial Intelligence and Data Science
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Computer Science and Engineering">
                    Computer Science and Engineering
                  </option>
                  <option value="Electrical and Electronics Engineering">
                    Electrical and Electronics Engineering
                  </option>
                  <option value="Electronics and Communication Engineering">
                    Electronics and Communication Engineering
                  </option>
                  <option value="Electronics and Instrumentation Engineering">
                    Electronics and Instrumentation Engineering
                  </option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Master of Business Administration">
                    Master of Business Administration
                  </option>
                </select>
              </div>
              <div className={inputGroupClasses}>
                <label htmlFor="graduationYear" className={labelClasses}>
                  Year of graduation
                </label>
                <br />
                <input
                  type="number"
                  name="graduationYear"
                  className={inputClasses}
                  value={formData.graduationYear}
                  onChange={handleDataChange}
                />
              </div>
              <div className={inputGroupClasses}>
                <label htmlFor="username" className={labelClasses}>
                  Username
                </label>
                <br />
                <input
                  type="text"
                  name="username"
                  className={inputClasses}
                  value={formData.username}
                  onChange={handleDataChange}
                />
              </div>
              <div className={inputGroupClasses}>
                <label htmlFor="password1" className={labelClasses}>
                  Password
                </label>
                <br />
                <input
                  type="password"
                  name="password1"
                  className={inputClasses}
                  value={formData.password1}
                  onChange={handleDataChange}
                />
              </div>
              <div className={inputGroupClasses}>
                <label htmlFor="password2" className={labelClasses}>
                  Confirm password
                </label>
                <br />
                <input
                  type="password"
                  name="password2"
                  className={inputClasses}
                  value={formData.password2}
                  onChange={handleDataChange}
                />
              </div>
              <span className="pt-3 block">
                <Button type="submit" text="Create Account" />
              </span>
            </form>
            <div className="my-5">
              <p className="text-center text-xs">
                Have an account?{" "}
                <Link href="/user/login">
                  <a className="text-blue-500 hover:underline">Login</a>
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

export default Signup;
