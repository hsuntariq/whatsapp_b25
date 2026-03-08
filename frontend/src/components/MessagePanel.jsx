import React from 'react'
import { FaGripVertical, FaPlus, FaSearch, FaVideo } from 'react-icons/fa'
import { useGlobalContext } from '../context/AppContext'
import { BsMic } from "react-icons/bs";

const MessagePanel = () => {
    const { selectedChat } = useGlobalContext()
    return (
        <>

            {/* header */}
            {
                selectedChat && <>
                    <div className="flex border border-zinc-800  bg-primary p-3 justify-between items-center">
                        <div className="flex w-full gap-2">
                            <div className="flex gap-3 items-center">
                                <img src={selectedChat.image} className='w-12 h-12 rounded-full' alt="" />
                                <h4 className="font-semibold">{selectedChat.name}</h4>
                            </div>



                        </div>
                        <div className="flex text-xl  gap-4 items-center">
                            <FaVideo />
                            <FaSearch />
                            <FaGripVertical />
                        </div>
                    </div>


                    {/* chat content */}


                    {/* chat footer */}


                    <div className="flex absolute w-[95%] items-center left-1/2 -translate-x-1/2 bottom-10 p-3 rounded-full bg-zinc-800 shadow shadow-zinc-700 gap-3">
                        <FaPlus />
                        {/* <BsEmojiWink /> */}
                        <input type="text" className='outline-0 w-full' placeholder='Type a message' />
                        <BsMic />
                    </div>
                </>
            }




        </>
    )
}

export default MessagePanel