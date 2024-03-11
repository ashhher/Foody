import { useAuth0 } from "@auth0/auth0-react";
import { Button, UsernameMenu } from "@/components";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleClickLogin = async () => await loginWithRedirect();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link
            to={"/order-status"}
            className="font-bold hover:text-orange-500"
          >
            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={handleClickLogin}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
