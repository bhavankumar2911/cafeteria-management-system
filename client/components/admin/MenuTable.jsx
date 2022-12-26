import React from "react";
import Axios from "axios";
import DeleteIcon from "../icons/Delete";
import EditIcon from "../icons/Edit";

function MenuTable({
  menu,
  setMenu,
  setIdOfFoodBeingEdited,
  setShowEditForm,
  setNameOfFoodBeingEdited,
  setPriceOfFoodBeingEdited,
  setIsAvailableOfFoodBeingEdited,
}) {
  const handleFoodDelete = async (e) => {
    const foodId = e.target.dataset.foodId;
    console.log(foodId);

    try {
      await Axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/menu/${foodId}`, {
        withCredentials: true,
      });

      const newMenu = menu.filter((item) => item.id != foodId);

      setMenu([...newMenu]);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleFoodEdit = async (id, name, price, isAvailable) => {
    setIdOfFoodBeingEdited(id);
    setNameOfFoodBeingEdited(name);
    setPriceOfFoodBeingEdited(price);
    setIsAvailableOfFoodBeingEdited(isAvailable);
    setShowEditForm(true);
  };

  return (
    <section>
      <table>
        <thead>
          <tr className="text-primary">
            <th className="border-r border-primary text-center px-1 pb-5">
              Food Name
            </th>
            <th className="border-r border-primary text-center px-1 pb-5">
              Price
            </th>
            <th className="border-r border-primary text-center px-1 pb-5">
              Available
            </th>
            <th className="text-center px-1 pb-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item, index) => {
            const { id, foodName, price, isAvailable } = item;
            return (
              <tr key={index}>
                <td className="border-r border-primary text-left px-1 pb-2">
                  {item.foodName}
                </td>
                <td className="border-r border-primary text-center px-1 pb-2">
                  {item.price}
                </td>
                <td className="border-r border-primary text-center px-1 pb-2">
                  {item.isAvailable ? "Yes" : "No"}
                </td>
                <td className="text-center px-1 pb-2">
                  <button
                    type="button"
                    onClick={(e) =>
                      handleFoodEdit(id, foodName, price, isAvailable)
                    }
                  >
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    data-food-id={item.id}
                    onClick={handleFoodDelete}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default MenuTable;
