import Wrapper from "../../components/common/Wrapper";
import { useState, useEffect } from "react";
import Axios from "axios";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import UserAuthorizationScreen from "../../components/common/UserAuthorizationScreen";
import Header from "../../components/common/Header";

const CustomOrder = () => {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [errorOnLoading, setErrorOnLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const fetchLocations = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/location`
      );

      setLoading(false);
      setLocations(data.locations);
    } catch (error) {
      console.log(error.config);
      setLoading(false);
      setErrorOnLoading(true);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage("No response from server. Try sometime later");
      } else {
        setErrorMessage("Something went wrong. Try sometime later");
      }
    }
  };
  useEffect(fetchLocations, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // validation
    if (!(description && location))
      return alert("Description and takeaway location are required.");

    try {
      const res = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/custom-order`,
        { description, takeawayLocation: location },
        { withCredentials: true }
      );

      setDescription("");
      alert(res.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        alert("No response from server. Try sometime later");
      } else {
        alert("Something went wrong. Try sometime later");
      }
    }
  };

  return (
    <main className="pt-20">
      <UserAuthorizationScreen />
      <Wrapper>
        <Header />
        <h1 className="text-center font-bold text-primary text-3xl my-10">
          Custom Order
        </h1>

        <Loader loading={loading} text="" />

        {/* after loading and there is an error */}
        {!loading && errorOnLoading && (
          <p className="text-center mb-5 font-semibold text-red-500">
            {errorMessage}
          </p>
        )}

        {/* after loading and no errors */}
        {!loading && !errorOnLoading && (
          <form action="#" onSubmit={placeOrder}>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block font-semibold text-primary mb-2"
              >
                Description
              </label>
              <textarea
                placeholder="Write a brief description about the order"
                name="description"
                id="description"
                className="border border-primary rounded-lg outline-0 p-2 w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-5">
              <label
                htmlFor="location"
                className="block font-semibold text-primary mb-2"
              >
                Select a takeaway location
              </label>
              <select
                value={location}
                onChange={handleLocationChange}
                name="location"
                id="location"
                className="border border-primary rounded-lg outline-0 p-2 w-full"
              >
                <option value="">Select a takeaway location</option>
                {locations.map((location, index) => {
                  return (
                    <option value={location.name} key={index}>
                      {location.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <Button
              text="Place Order"
              clickHandler={placeOrder}
              type="button"
            />
          </form>
        )}
      </Wrapper>
    </main>
  );
};

export default CustomOrder;
