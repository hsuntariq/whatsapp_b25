import React from "react";
import { LuMessageSquareText } from "react-icons/lu";
import { RiSteeringFill } from "react-icons/ri";
import { IoChatbubbleEllipsesOutline, IoSettings } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { FaUser } from "react-icons/fa";
const MainPage = () => {
  return (
    <>
      <>
        <div className="grid grid-cols-12 bg-gray-500">
          <div className="col-span-4 min-h-screen flex  ">
            <div className="w-[12%]  justify-between items-center text-4xl py-3 flex flex-col">
              <div className="flex gap-7 flex-col">
                <LuMessageSquareText />
                <RiSteeringFill />
                <IoChatbubbleEllipsesOutline />
                <IoIosPeople />
              </div>
              <div className="flex gap-7 flex-col">
                <IoSettings />
                <FaUser />
              </div>
            </div>
            <div className="w-[88%] bg-cyan-500"></div>
          </div>
          <div className="col-span-8 min-h-screen bg-yellow-500"></div>
        </div>
      </>
    </>
  );
};

export default MainPage;
