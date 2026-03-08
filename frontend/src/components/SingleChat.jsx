import React, { useContext, useState } from 'react'
import { AppContext, useGlobalContext } from '../context/AppContext'

const SingleChat = ( { name, image, time, message, id } ) => {

    const { selectedChat, setSelectedChat } = useGlobalContext()


    return (
        <>
            <div onClick={() => setSelectedChat( {
                name, image, id
            } )} className="flex cursor-pointer justify-between my-7">
                <div className="flex gap-3 items-center">
                    <img src={image} className='w-12 h-12 rounded-full' alt="" />
                    <div className="">
                        <h4 className="font-semibold">{name}</h4>
                        <p className="text-gray-600 text-sm">
                            {message}
                        </p>
                    </div>
                </div>
                <p className="text-gray-500 text-sm font-semibold mt-2">
                    {time}
                </p>
            </div>
        </>
    )
}

export default SingleChat