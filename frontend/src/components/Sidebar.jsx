import React, { useEffect, useState } from 'react'
import { FaChartArea, FaSearch, FaTheRedYeti } from 'react-icons/fa'
import { whatsappChats } from '../data/whatsappChats'
import SingleChat from './SingleChat'
import axios from 'axios';
const Sidebar = () => {

    const [selected, setSelected] = useState( 'All' )
    const [chats, setChats] = useState( [] )

    // get all the user from backend

    const myUsers = async () => {
        const response = await axios.get( 'http://localhost:5174/api/auth/get-all-users' );
        setChats( response.data )
    }


    useEffect( () => {
        myUsers()
    }, [] )





    return (
        <>
            <div className="w-[88%] p-5 bg-[#141414] border border-s-0 border-e-0 border-b-0 border-t-0">
                {/* header */}
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">WhatsApp</h2>
                    <div className="flex gap-2">
                        <FaChartArea />
                        <FaTheRedYeti />
                    </div>
                </div>

                {/* search bar */}

                <div className="flex bg-zinc-800 rounded-full p-3 my-4 items-center gap-3">
                    <FaSearch />
                    <input type="text" className="w-full outline-0" placeholder="Search  or start a new chat" />
                </div>

                {/* categories */}

                <div className="flex gap-4">
                    {
                        ['All', 'Unread', 'Groups'].map( ( item, index ) => {
                            return <div onClick={() => setSelected( item )} className={` ${selected == item ? 'bg-green-800 text-white border font-bold border-green-500' : 'bg-zinc-800'} px-4 cursor-pointer text-sm py-2 rounded-full `} key={index}>
                                {item}
                            </div>
                        } )
                    }
                </div>



                {/* chats */}


                {
                    chats.map( ( item, index ) => {
                        return <SingleChat key={index} {...item} />
                    } )
                }





            </div>
        </>
    )
}

export default Sidebar