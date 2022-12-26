import React, { useState } from "react";
import Axios from "axios";
import Close from "../icons/Close";

const inputClasses =
  "border-primary border-2 rounded-full py-1 px-3 outline-0 w-full";
const buttonClasses =
  "rounded-full bg-primary text-white py-2 px-7 uppercase text-sm inline-block outline-0 w-full mt-3";

function MenuEditForm({
  menu,
  setMenu,
  idOfFoodBeingEdited,
  nameOfFoodBeingEdited,
  priceOfFoodBeingEdited,
  isAvailableOfFoodBeingEdited,
  setShowEditForm,
}) {
  const [formData, setFormData] = useState({
    foodName: nameOfFoodBeingEdited,
    price: priceOfFoodBeingEdited,
    isAvailable: isAvailableOfFoodBeingEdited,
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

    console.log(
      "from edit form",
      idOfFoodBeingEdited,
      nameOfFoodBeingEdited,
      priceOfFoodBeingEdited,
      isAvailableOfFoodBeingEdited
    );

    try {
      const { data } = await Axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOST}/menu/${idOfFoodBeingEdited}`,
        { ...formData },
        { withCredentials: true }
      );
      const { foodName, price, isAvailable } = formData;

      const newMenu = menu.map((foodItem) => {
        if (foodItem.id == idOfFoodBeingEdited) {
          return {
            ...foodItem,
            foodName: foodName,
            price: price,
            isAvailable: isAvailable,
          };
        } else return foodItem;
      });

      setShowEditForm(false);
      setMenu([...newMenu]);
      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center fixed w-screen h-screen top-0 left-0"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <form
        onSubmit={handleFormSubmission}
        className="bg-white rounded-lg px-3 relative py-5"
      >
        <div
          className="flex justify-end cursor-pointer"
          onClick={() => setShowEditForm(false)}
        >
          <Close />
        </div>
        <div className="mb-3">
          <label
            htmlFor="foodName"
            className="text-primary font-semibold mb-1 inline-block ml-2"
          >
            Food name
          </label>
          <br />
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleDataChange}
            className={inputClasses}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="price"
            className="text-primary font-semibold mb-1 inline-block ml-2"
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
            className={inputClasses}
          />
        </div>
        <div>
          <label className="text-primary font-semibold mb-1 inline-block mr-2">
            Available
          </label>
          <br />
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
        <button type="submit" className={buttonClasses}>
          Update
        </button>
      </form>
    </div>
  );
}

export default MenuEditForm;
