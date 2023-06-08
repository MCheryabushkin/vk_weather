import React, { ReactNode, createContext, useContext } from "react";
import createMainStore from "./mainStore";
import { useLocalStore } from "mobx-react";

interface Props {
    children?: ReactNode
}

const MainContext = createContext(null);

export const MainProvider = ({children}: Props) => {
    const MainStore = useLocalStore(createMainStore);

    return(
        <MainContext.Provider value={MainStore}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainStore = () => useContext(MainContext);