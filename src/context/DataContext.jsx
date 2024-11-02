import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase-client";

const HarmoniumContext = createContext({})

export const useHarmonium = () => useContext(HarmoniumContext)

export const HarmoniumProvider = ({ children }) => {
    const [data, setData] = useState([])

    const [selectedHarmonium, setSelectedHarmonium] = useState(data)
    const [lastTab, setLastTab] = useState('columns')

    useEffect(() => {
        const fetchData = async () => {
            const { data: dataHarmonium, error } = await supabase
                .from("harmoniums")
                .select()

            if (error !== null) {
                console.log(error.message);
                return
            }

            setData(dataHarmonium)
        }
        fetchData()
    },
        []
    )

    return (
        <HarmoniumContext.Provider value={{
            data,
            setData,
            selectedHarmonium,
            setSelectedHarmonium,
            lastTab,
            setLastTab }}>
          {data ? children : <p>Loading...</p>}
        </HarmoniumContext.Provider>
    )
}