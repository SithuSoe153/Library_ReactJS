import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import React from 'react'
import { auth } from "../firebase";

let AuthContext = createContext();

let AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        case "AUTHREADY":
            return { ...state, authReady: true };
        default:
            return state;
    }
}



export default function AuthContextProvider({ children }) {

    let [state, dispatch] = useReducer(AuthReducer, { user: null, authReady: false });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            dispatch({ type: "AUTHREADY" })
            if (user) {
                dispatch({ type: "LOGIN", payload: user });
            } else {
                dispatch({ type: "LOGOUT" });
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }
