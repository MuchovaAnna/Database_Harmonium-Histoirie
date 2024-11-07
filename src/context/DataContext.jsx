import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase-client";
import { showNotification } from "@mantine/notifications";
import { IconSquareRoundedChevronsUpFilled } from "@tabler/icons-react";

const HarmoniumContext = createContext({})

export const useHarmonium = () => useContext(HarmoniumContext)

export const HarmoniumProvider = ({ children }) => {
    const [data, setData] = useState([])

    const [selectedHarmonium, setSelectedHarmonium] = useState(data)
    const [lastTab, setLastTab] = useState('columns')

    const [isEditing, setIsEditing] = useState(false)
    const [initialData, setInitialData] = useState(null)

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
    useEffect(() => {
        fetchData()
    }, [])

    //FUNKCE PRO UPLOAD SOUBORU
    const uploadFile = async (selectedFiles) => {

        if (!selectedFiles || selectedFiles.length === 0) {
            console.log("Soubor nebyl vybrán");
            return []
        }

        console.log("vybraný soubor:", selectedFiles);

        const uploadResult = await Promise.all(
            Array.from(selectedFiles).map(async (file) => {
                console.log("nahrávám soubor:", file.name);

                const fileName = `${Date.now()}_${file.name}`

                const { data: uploadData, error: uploadError } = await supabase
                    .storage
                    .from("harmonia")
                    .upload(fileName, file)

                if (uploadError) {
                    console.log("Chyba při nahrávání:", uploadError.message);
                    return (
                        showNotification({
                            title: "Chyba",
                            message: 'Chyba při nahrávání dat',
                            color: "lightGreen",
                            position: "top-center"
                        })
                    )
                }

                console.log("Data o nahraném souboru", uploadData);
                console.log("Cesta k nahranému souboru:", uploadData.fullPath);

                //ZÍSKÁNÍ URL ADRESY
                const { publicURL, error: urlError } = supabase
                    .storage
                    .from("harmonia")
                    .getPublicUrl(uploadData.fullPath)

                if (urlError) {
                    console.log("Chyba při získávání URL:", urlError.message);
                    return null
                }

                const urlName = uploadData.fullPath
                const finalURL = publicURL || `https://xxsgkdemmzpgwqautakm.supabase.co/storage/v1/object/public/${urlName}`

                console.log("URL obrázku:", finalURL);

                showNotification({
                    title: "Úspěch",
                    message: 'Soubor byl úspěšně nahrán',
                    color: "lightGreen",
                    position: "top-center"
                });

                return finalURL
            })
        )
        return uploadResult.filter(url => url !== null)
    }

    //FUNKCE PRO ODSTRANĚNÍ OBRÁZKU
    const removeFile = async (url) => {
        if (!selectedHarmonium || !selectedHarmonium.id) {
            console.log("Harmonium není vybráno nebo nemá ID.");
            return
        }

        const relativePath = url.replace(`https://xxsgkdemmzpgwqautakm.supabase.co/storage/v1/object/public/harmonia/`, ``)

        const harmoniumId = selectedHarmonium?.id

        console.log("Id harmonia", harmoniumId);
        console.log("Relativní cesta k obrázku:", relativePath);

        //aktualizace záznamu v databázi
        const { data: existingData, error: fetchError } = await supabase
            .from("harmoniums")
            .select("pictures")
            .eq("id", harmoniumId)
            .single()

        if (fetchError) {
            console.log("Chyba při získávání aktuálních obrázku:", fetchError.message);
            return
        }

        console.log("Existující data:", existingData);


        const updatePictures = existingData.pictures.filter(imgUrl => imgUrl !== url)

        console.log("Aktualizovaná data:", updatePictures);


        const { data: updatedData, error: updateError } = await supabase
            .from("harmoniums")
            .update({ pictures: updatePictures })
            .eq("id", harmoniumId)
            .select("pictures")

        if (updateError) {
            console.log("Chyba při aktualizaci obrázků:", updateError.message);
            return
        }

        console.log("Úspěšně aktualizováno v databázi:", updatedData);
        showNotification({
            title: "Úspěch",
            message: 'Obrázek byl úspěšně odstraněn z databáze',
            color: "lightGreen",
            position: "top-center"
        });

        //aktualizace stavu a aplikace
        setData(prevData => prevData.map(harmonium => harmonium.id === harmoniumId ? { ...harmonium, pictures: updatePictures } : harmonium))

        //ODSTRANĚNÍ OBRÁZKU ZE STORAGE
        const { error: deleteError } = await supabase
            .storage
            .from("harmonia")
            .remove([relativePath])
        
        if (deleteError) {
            console.log("Chyba při mazání souboru:", deleteError.message);
        }

        showNotification({
            title: "Úspěch",
            message: 'Obrázek byl úspěšně odstraněn z databáze',
            color: "lightGreen",
            position: "top-center"
        });
    }

    return (
        <HarmoniumContext.Provider value={{
            data,
            setData,
            selectedHarmonium,
            setSelectedHarmonium,
            lastTab,
            setLastTab,
            isEditing,
            setIsEditing,
            initialData,
            setInitialData,
            uploadFile,
            removeFile,
            fetchData
        }}>
            {data ? children : <p>Loading...</p>}
        </HarmoniumContext.Provider>
    )
}