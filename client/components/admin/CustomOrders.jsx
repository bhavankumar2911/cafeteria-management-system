import Axios from "axios";
import { useEffect, useState } from "react";
import APIRequestError from "../../helpers/APIRequestError";
import Loader from "../common/Loader";
import Wrapper from "../common/Wrapper";
import DeleteIcon from "../icons/Delete";

const CustomOrders = () => {
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [err, setErr] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/custom-order/as-admin`,
        { withCredentials: true }
      );

      setLoading(false);
      const { data } = response;
      const { orders } = data;

      setApproved([...orders.filter((order) => order.approvalStatus)]);
      setRejected([...orders.filter((order) => !order.approvalStatus)]);
    } catch (error) {
      setLoading(false);
      setErr(true);
      setErrMsg(APIRequestError(error, true, false));
    }
  };
  useEffect(fetchOrders, []);

  const handleApprovalStatus = async (id, currentStatus) => {
    try {
      const response = await Axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOST}/custom-order/${id}`,
        { approvalStatus: !currentStatus },
        { withCredentials: true }
      );

      fetchOrders();
    } catch (error) {
      APIRequestError(error, true, true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(
        `${process.env.NEXT_PUBLIC_API_HOST}/custom-order/as-admin/${id}`,
        { withCredentials: true }
      );

      setRejected([...rejected.filter((order) => order.id !== id)]);
    } catch (error) {
      APIRequestError(error, false, true);
    }
  };

  // console.log("approved", approved);
  // console.log("rejected", rejected);

  return (
    <section className="mt-10">
      <Wrapper>
        <h1 className="text-center font-bold text-primary text-2xl mb-5">
          Custom orders
        </h1>
        {/* loading */}
        <Loader loading={loading} text="Loading custom orders." />

        {/* after loading error */}
        {!loading && err && <p>{errMsg}</p>}

        {/* after loading no error */}
        {!loading && !err && (
          <div>
            <h2 className="font-semibold mb-3">Approved</h2>
            {/* empty message */}
            {approved.length == 0 && (
              <p className="text-sm text-center text-gray-500">
                No approved orders to show
              </p>
            )}
            <ul className="mb-5">
              {approved.map((order, index) => {
                const { id, approvalStatus, description } = order;
                return (
                  <li
                    key={index}
                    className="bg-gray-100 p-2 border rounded-md mb-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">Order ID: {id}</p>
                      <button
                        className="text-sm text-white bg-red-600 p-2 rounded-md hover:drop-shadow-lg"
                        onClick={(e) =>
                          handleApprovalStatus(id, approvalStatus)
                        }
                      >
                        Reject
                      </button>
                    </div>
                    <p className="text-sm mt-3">{description}</p>
                  </li>
                );
              })}
            </ul>
            <h2 className="font-semibold mb-3">Not approved</h2>
            {/* empty message */}
            {rejected.length == 0 && (
              <p className="text-sm text-center text-gray-500">
                No rejected orders to show
              </p>
            )}
            <ul>
              {rejected.map((order, index) => {
                const { id, approvalStatus, description } = order;
                return (
                  <li
                    key={index}
                    className="bg-gray-100 p-2 border rounded-md mb-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">Order ID: {id}</p>
                      <button
                        className="text-sm text-white bg-green-600 p-2 rounded-md hover:drop-shadow-lg"
                        onClick={(e) =>
                          handleApprovalStatus(id, approvalStatus)
                        }
                      >
                        Approve
                      </button>
                    </div>
                    <div className="flex items-end mt-3 justify-between">
                      <p className="text-sm text-justify">{description}</p>
                      <button
                        type="button"
                        className="ml-5"
                        onClick={(e) => handleDelete(id)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Wrapper>
    </section>
  );
};

export default CustomOrders;
