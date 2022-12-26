import { useState, useEffect } from "react";
import Axios from "axios";
import Loader from "../common/Loader";

const TakeAwayLocation = ({ location, setLocation }) => {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [errorOnLoading, setErrorOnLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <div>
      <Loader loading={loading} text="Loading takeaway locations" />

      {/* after loading and there is an error */}
      {!loading && errorOnLoading && (
        <p className="text-center mb-5 font-semibold text-red-500">
          {errorMessage}
        </p>
      )}

      {/* after loading and no errors */}
      {!loading && !errorOnLoading && (
        <center>
          {/* <label htmlFor="location">Select a takeaway location</label> */}
          <select
            value={location}
            onChange={handleLocationChange}
            name="location"
            id="location"
            className="border-primary border-b-2 p-1 mb-5 outline-0"
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
        </center>
      )}
    </div>
  );
};

export default TakeAwayLocation;
