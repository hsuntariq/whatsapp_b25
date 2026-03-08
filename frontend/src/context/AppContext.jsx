
// create the context

import { createContext, useContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ( { children } ) => {

    const [selectedChat, setSelectedChat] = useState( null )




    return <AppContext.Provider value={{
        selectedChat, setSelectedChat
    }}>
        {children}
    </AppContext.Provider>
}


export const useGlobalContext = () => useContext( AppContext )