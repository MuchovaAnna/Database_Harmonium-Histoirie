import { useState } from 'react'
import { Fieldset, FileInput, Group } from '@mantine/core'
import RemovableAvatar from '../RemovableAvatar/RemovableAvatar'
import { IconPhotoUp } from '@tabler/icons-react'
import classes from '../../NewHarmonium/New.module.scss'
import { supabase } from '../../../supabase/supabase-client'

function GalleryUpload({ form }) {

    const icon = <IconPhotoUp />

    const [avatars, setAvatars] = useState([])

    const [rowId, setRowId] = useState(null)

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
                const fileName = `harmonia/${Date.now()}_${file.name}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('harmonia')
                    .upload(fileName, file);

                if (uploadError) {
                    console.log("Chyba při nahrávání", error.message)
                    return null
                }

                console.log("Data o nahraném souboru", uploadData);
                console.log("Cesta k nahranému souboru:", uploadData.path);

                //3. získání URL z storage

                if (uploadData && uploadData.path) {
                    const { publicURL, error: urlError } = supabase
                        .storage
                        .from("harmonia")
                        .getPublicUrl(uploadData.path)

                    if (urlError) {
                        console.log("Chyba při získávání URL", urlError.message);
                        return null
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

        // Uložení souborů do state s prozatimní URL adresou
        setAvatars((prev) => [...prev, ...validUrls]);

    }

    const handleRemove = (src) => {
        setAvatars((prevAvatars) => prevAvatars.filter((avatar) => avatar.url !== url));
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
                // {...form.getInputProps('pictures')}
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