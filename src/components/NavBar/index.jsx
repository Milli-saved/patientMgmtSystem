import React, { useContext, useState } from "react";
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import UserPic from "../../assets/Avatar Style 6.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const index = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setUser } = useContext(AuthContext);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const logoutHandler = () => {
    navigate("/signin");
    // setIsLoggedIn(false);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="flex items-center justify-end min-h-20 px-4 bg-blue-900 border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center space-x-4 p-2">
        <button>
          <IoMdNotificationsOutline className="text-xl md:text-2xl text-white " />
        </button>
        <button>
          <IoMdInformationCircleOutline className="text-xl md:text-2xl text-white  " />
        </button>
        <img
          onClick={toggleDropdown}
          alt="user logo"
          src={UserPic}
          className="w-10 h-10 rounded-full"
        />
      </div>
      {dropdownOpen && (
        <div className="absolute right-1 min-h-10 mt-32 w-48 bg-white border border-gray-200 rounded shadow-lg">
          {/* <Link
            to={`/${user?.id}`}
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile
          </Link> */}
          <button
            onClick={logoutHandler}
            className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-start"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default index;
