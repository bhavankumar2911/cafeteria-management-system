import React, { useState } from "react";
import Axios from "axios";

const inputClasses = "border border-primary";

function Update() {
  const [formData, setFormData] = useState({
    name: "",
    registerNumber: "",
    department: "",
    graduationYear: "",
    username: "",
  });

  const handleDataChange = (e) => {
    const field = e.target.name;
    const fieldValue = e.target.value;

    switch (field) {
      case "name":
        setFormData({ ...formData, name: fieldValue });
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
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOST}/user`,
        { ...formData },
        { withCredentials: true }
      );

      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            className={inputClasses}
            value={formData.name}
            onChange={handleDataChange}
          />
        </div>
        <div>
          <label htmlFor="registerNumber">Exam register number</label>
          <br />
          <input
            type="number"
            name="registerNumber"
            className={inputClasses}
            value={formData.registerNumber}
            onChange={handleDataChange}
          />
        </div>
        <div>
          <label htmlFor="department">Department</label>
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
        <div>
          <label htmlFor="graduationYear">Year of graduation</label>
          <br />
          <input
            type="number"
            name="graduationYear"
            className={inputClasses}
            value={formData.graduationYear}
            onChange={handleDataChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            className={inputClasses}
            value={formData.username}
            onChange={handleDataChange}
          />
        </div>
        <button type="submit">Save changes</button>
      </form>
    </main>
  );
}

export default Update;
