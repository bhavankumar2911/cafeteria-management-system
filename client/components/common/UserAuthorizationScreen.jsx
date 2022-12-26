import React, { useState, useEffect } from "react";
import useUserAuth from "../../hooks/user/useUserAuth";
import { useRouter } from "next/router";
import Loader from "./Loader";

function UserAuthorizationScreen() {
  const [showScreen, setShowScreen] = useState(true);
  const router = useRouter();

  const authorizeUser = useUserAuth();

  const redirectUser = async () => {
    const { isAuthorized } = await authorizeUser();

    if (isAuthorized) setShowScreen(false);
    else router.push("/user/login");
  };
  useEffect(redirectUser, []);

  if (!showScreen) return null;
  else
    return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-white flex items-center justify-center z-20">
        <Loader loading={showScreen} text="Authorizing" />
      </div>
    );
}

export default UserAuthorizationScreen;
