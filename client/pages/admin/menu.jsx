import React, { useEffect, useState } from "react";
import Axios from "axios";
import MenuTable from "../../components/admin/MenuTable";
import MenuAddForm from "../../components/admin/MenuAddForm";
import MenuEditForm from "../../components/admin/MenuEditForm";
import EditIcon from "../../components/icons/Edit";
import DeleteIcon from "../../components/icons/Delete";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [idOfFoodBeingEdited, setIdOfFoodBeingEdited] = useState(null);
  const [nameOfFoodBeingEdited, setNameOfFoodBeingEdited] = useState("");
  const [priceOfFoodBeingEdited, setPriceOfFoodBeingEdited] = useState("");
  const [isAvailableOfFoodBeingEdited, setIsAvailableOfFoodBeingEdited] =
    useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");

  const fetchMenu = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/menu`,
        { withCredentials: true }
      );

      setMenu(data.menu);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  useEffect(fetchMenu, []);

  const fetchLocations = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/location`
      );

      setLocations(data.locations);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  useEffect(fetchLocations, []);

  const handleLocationAddition = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/location`,
        { name: newLocation }
      );

      setLocations([res.data.location, ...locations]);
      setNewLocation("");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleLocationDelete = async (id) => {
    try {
      const res = await Axios.delete(
        `${process.env.NEXT_PUBLIC_API_HOST}/location/${id}`
      );

      setLocations([...locations.filter((location) => location.id !== id)]);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="pb-10">
      <div className="w-11/12 mx-auto">
        <h1 className="text-center text-primary text-center font-bold text-2xl my-8">
          Manage menu
        </h1>

        <section className="grid grid-cols-3">
          <div className="relative">
            <span className="block w-[250px] h-[250px] rounded-full bg-primary -translate-x-[140px]"></span>
            <h2 className="absolute text-white font-bold text-3xl top-1/2 -translate-y-1/2">
              ADD FOOD
            </h2>
          </div>
          <div className="col-span-2 text-right">
            <MenuAddForm menu={menu} setMenu={setMenu} />
          </div>
        </section>

        {showEditForm && (
          <section>
            <h2>Edit food</h2>
            <MenuEditForm
              menu={menu}
              setMenu={setMenu}
              idOfFoodBeingEdited={idOfFoodBeingEdited}
              nameOfFoodBeingEdited={nameOfFoodBeingEdited}
              priceOfFoodBeingEdited={priceOfFoodBeingEdited}
              isAvailableOfFoodBeingEdited={isAvailableOfFoodBeingEdited}
              setShowEditForm={setShowEditForm}
            />
          </section>
        )}

        <h3 className="text-2xl font-bold text-primary uppercase text-center my-6">
          menu list
        </h3>
        <MenuTable
          menu={menu}
          setMenu={setMenu}
          setIdOfFoodBeingEdited={setIdOfFoodBeingEdited}
          setNameOfFoodBeingEdited={setNameOfFoodBeingEdited}
          setPriceOfFoodBeingEdited={setPriceOfFoodBeingEdited}
          setIsAvailableOfFoodBeingEdited={setIsAvailableOfFoodBeingEdited}
          setShowEditForm={setShowEditForm}
        />

        <h3 className="text-2xl font-bold text-primary uppercase text-center my-6">
          take away locations
        </h3>

        <form action="#" onSubmit={handleLocationAddition}>
          <center>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Enter a location to add"
              className="border-primary border-2 rounded-full py-1 px-3 outline-0 mr-5"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
            <input
              type="submit"
              value="add"
              className="rounded-full bg-primary text-white py-2 px-7 uppercase text-sm inline-block outline-0 cursor-pointer"
              onClick={handleLocationAddition}
            />
          </center>
        </form>

        {locations.length == 0 ? (
          <p className="text-center mt-3">No locations added</p>
        ) : (
          <ul>
            {locations.map((location, index) => (
              <li key={index} className="flex mt-3 bg-gray-100 p-2 rounded">
                <p className="mr-3">{location.name}</p>
                <button
                  type="button"
                  onClick={(e) => handleLocationDelete(location.id)}
                >
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Menu;
