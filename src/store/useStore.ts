import React, { createContext, useContext } from "react";
import Demo from "./Demo";

 const store = createContext({
    demo: Demo
})

const useStore = () => {
    return useContext(store)
}

export default useStore