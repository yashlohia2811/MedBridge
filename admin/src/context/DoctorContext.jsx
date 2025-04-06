import { createContext } from "react"

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
    const value = {
        // Your application state and methods go here
    }

    return (
    <DoctorContext.Provider value={value}>
        {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider