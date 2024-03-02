import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  const handleClickLogout = () => logout();

  return (
    <>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        User Profile
      </Link>
      <Button
        className="flex items-center px-3 font-bold hover:bg-gray-500"
        onClick={handleClickLogout}
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;