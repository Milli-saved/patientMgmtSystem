import React from "react";
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import UserPic from "../../assets/Avatar Style 6.png";

const index = () => {
  return (
    <div className="flex items-center justify-end min-h-20 px-4 bg-blue-900 border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center space-x-4 p-2">
        <button>
          <IoMdNotificationsOutline className="text-xl md:text-2xl text-white " />
        </button>
        <button>
          <IoMdInformationCircleOutline className="text-xl md:text-2xl text-white  " />
        </button>
        <img alt="user logo" src={UserPic} className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default index;
