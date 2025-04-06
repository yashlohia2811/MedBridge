import { createContext } from "react"

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const value = {
        // Your application state and methods go here
    }

    return (
    <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider