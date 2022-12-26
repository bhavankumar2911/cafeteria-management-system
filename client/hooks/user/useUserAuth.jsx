import Axios from "axios";

function useUserAuth() {
  const authorizeUser = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/user-auth`,
        { withCredentials: true }
      );

      if (!data.success) {
        return { isAuthorized: false };
      }

      return { isAuthorized: true };
    } catch (error) {
      return { isAuthorized: false };
    }
  };

  return authorizeUser;
}

export default useUserAuth;
