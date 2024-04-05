import { useAuth0 } from "@auth0/auth0-react";

const useLogout = () => {
  const { logout: auth0Logout } = useAuth0();

  const logoutCallbackUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: logoutCallbackUri } });

  return logout;
};

export default useLogout;
