import React, { useState } from "react";
import Axios from "axios";

function MenuAddForm({ menu, setMenu }) {
  const [formData, setFormData] = useState({
    foodName: "",
    price: "",
    isAvailable: true,
  });

  const handleDataChange = (e) => {
    const field = e.target.name;
    const fieldValue = e.target.value;

    if (field == "foodName") {
      setFormData({ ...formData, foodName: fieldValue });
    } else if (field == "price") {
      setFormData({ ...formData, price: fieldValue });
    } else {
      setFormData({
        ...formData,
        isAvailable: fieldValue == "yes" ? true : false,
      });
    }
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/menu`,
        { ...formData },
        { withCredentials: true }
      );

      setMenu([data.food, ...menu]);
      alert(data.message);
      setFormData({ foodName: "", price: "", isAvailable: true });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <div className="mb-3">
        <label
          htmlFor="foodName"
          className="text-primary font-semibold mb-1 inline-block mr-2"
        >
          Food name
        </label>
        <br />
        <input
          type="text"
          name="foodName"
          value={formData.foodName}
          onChange={handleDataChange}
          className="border-primary border-2 rounded-full py-1 px-3 outline-0 w-[85%]"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="price"
          className="text-primary font-semibold mb-1 inline-block mr-2"
        >
          Price
        </label>
        <br />
        <input
          type="number"
          name="price"
          min={0}
          value={formData.price}
          onChange={handleDataChange}
          className="border-primary border-2 rounded-full py-1 px-3 outline-0 w-[85%]"
        />
      </div>
      <div className="mb-3">
        <label className="text-primary font-semibold mb-1 inline-block mr-2">
          Available
        </label>
        <div>
          <span className="inline-block mr-5">
            <input
              type="radio"
              name="isAvailable"
              value="yes"
              checked={formData.isAvailable}
              onChange={handleDataChange}
            />
            <span className="inline-block ml-2">Yes</span>
          </span>
          <span className="inline-block mr-2">
            <input
              type="radio"
              name="isAvailable"
              value="no"
              checked={!formData.isAvailable}
              onChange={handleDataChange}
            />
            <span className="inline-block ml-2">No</span>
          </span>
        </div>
      </div>
      <button
        type="submit"
        className="rounded-full bg-primary text-white py-2 px-7 uppercase text-sm inline-block outline-0"
      >
        Add
      </button>
    </form>
  );
}

export default MenuAddForm;
