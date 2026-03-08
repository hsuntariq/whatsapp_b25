import React from "react";
import { LuMessageSquareText } from "react-icons/lu";
import { RiSteeringFill } from "react-icons/ri";
import { IoChatbubbleEllipsesOutline, IoSettings } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { FaChartArea, FaGripVertical, FaSearch, FaTheRedYeti, FaUser, FaVideo, FaWaveSquare } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import MessagePanel from "../components/MessagePanel";
import { useGlobalContext } from "../context/AppContext";
const MainPage = () => {

  const { selectedChat } = useGlobalContext()

  return (
    <>
      <>
        <div className="grid grid-cols-12 bg-[#242625] text-white">
          <div className="col-span-4 min-h-screen flex  ">
            <div className="w-[12%]  justify-between items-center text-2xl py-3 flex flex-col">
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
            {/* sidebar */}

            <Sidebar />

          </div>
          <div className="col-span-8 border relative border-zinc-800 min-h-screen" style={{
            backgroundImage: selectedChat ? 'url(https://i.pinimg.com/736x/d3/6b/cc/d36bcceceaa1d390489ec70d93154311.jpg)' : 'url(https://cdn.wallpapersafari.com/81/61/L9AWtI.jpg)',
            backgroundSize: 'contain'
          }}>

            {/* messages component */}
            <MessagePanel />



          </div>
        </div>
      </>
    </>
  );
};

export default MainPage;
