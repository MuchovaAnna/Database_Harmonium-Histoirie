import { useEffect, useState } from 'react'
import { Fieldset, FileInput, Group } from '@mantine/core'
import RemovableAvatar from '../RemovableAvatar/RemovableAvatar'
import { IconPhotoUp } from '@tabler/icons-react'
import classes from '../../NewHarmonium/New.module.scss'
import { supabase } from '../../../supabase/supabase-client'

function GalleryUpload({ form, pictureUrls }) {

    const icon = <IconPhotoUp />

    const [avatars, setAvatars] = useState([])
    //Funkce pro zobrazení avarats při načtení dat stávájícího záznamu
    useEffect(() => {
        if (pictureUrls.length > 0) {
            setAvatars(pictureUrls)
        }
    },[pictureUrls])

    //Funkce pro nahrání souboru do Storage a získání unikátní url adresy zpět
    const handleFileUpload = async (selectFiles) => {

        if (!selectFiles || selectFiles.length === 0) {
            console.log("Soubor není vybrán");
            return;
        }
        //2. Nahrávání souboru do Supabase
        if (selectFiles.length === 0) {
            return
        }

        const uploadResults = await Promise.all(
            Array.from(selectFiles).map(async (file) => {
                console.log("Nahrávám soubor:", file.name);
                const fileName = `${Date.now()}_${file.name}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('harmonia')
                    .upload(fileName, file);

                if (uploadError) {
                    console.log("Chyba při nahrávání", uploadError.message)
                    return null
                }

                console.log("Data o nahraném souboru", uploadData);
                console.log("Cesta k nahranému souboru:", uploadData.fullPath);

                //3. získání URL z storage
                if (uploadData && uploadData.fullPath) {
                    const { publicURL, error: urlError } = supabase
                        .storage
                        .from("harmonia")
                        .getPublicUrl(uploadData.fullPath)

                    if (urlError) {
                        console.log("Chyba při získávání URL", urlError.message);
                        return null
                    }

                    const fileName = uploadData.fullPath; // mělo by být ve formátu "harmonia/1730661299413_harmonium_2.jpg"
                    const manualPublicUrl = `https://xxsgkdemmzpgwqautakm.supabase.co/storage/v1/object/public/${fileName}`;

                    if (!publicURL) {
                        console.log("Používám manuální URL");
                        // pokud publicURL není dostupná, vrátí se manuálně vytvořená URL
                        return manualPublicUrl;
                    }

                    console.log('Veřejná URL:', publicURL);

                    return publicURL
                }
                return null
            })
        )
        //kontrola výsledku nahrávání
        console.log("Výsledek nahrávání:", uploadResults);

        // Zpracování URL adres
        const validUrls = uploadResults.filter(url => url !== null);
        console.log("Nahrané URL adresy:", validUrls);

        // Uložení souborů do state
        setAvatars((prev) => {
            const newAvatars = [...prev, ...validUrls]
            //přidání URL do formuláře
            form.setFieldValue('pictures', newAvatars)
            return newAvatars;
        });

    }

    const handleRemove = (src) => {
        setAvatars((prevAvatars) => prevAvatars.filter((avatar) => avatar !== src));
    };

    return (
        <Fieldset
            legend="Galerie"
            className={classes["fieldset"]}
        >

            <FileInput
                leftSection={icon}
                label="Nahrej fotografie"
                placeholder="Po kliknutí nahrajete fotografie"
                accept='image/jpg, image/jpeg, image/png'
                multiple
                onChange={handleFileUpload}
                // onChange={(e) => handleFileUpload(e.target.files)}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />

            <Group spacing="sm">
                {avatars.map((src, index) => (
                    <RemovableAvatar key={index} src={src} onRemove={() => handleRemove(src)} />
                ))}
            </Group>

        </Fieldset>

    );
}

export default GalleryUpload