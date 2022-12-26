import React, { useState } from "react";
import Button from "../../components/common/Button";
import Wrapper from "../../components/common/Wrapper";
import Axios from "axios";
import { useRouter } from "next/router";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOST}/reset-password/${router.query.id}`,
        { password },
        { withCredentials: true }
      );

      if (data.success) router.push("/user/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <main>
      <Wrapper>
        <h1 className="text-center text-2xl font-semibold text-primary py-10">
          Reset Password
        </h1>
        <form onSubmit={handleReset}>
          <label
            htmlFor="password"
            className="mb-1 inline-block text-sm font-semibold"
          >
            New Password
          </label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full outline-primary text-sm mb-5"
          />
          <Button type="submit" text="Reset" onClick={handleReset} />
        </form>
      </Wrapper>
    </main>
  );
}

export default ResetPassword;
