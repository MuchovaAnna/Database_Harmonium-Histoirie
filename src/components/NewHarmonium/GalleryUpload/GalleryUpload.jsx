import { useEffect, useState } from 'react'
import { Fieldset, FileInput, Group } from '@mantine/core'
import RemovableAvatar from '../RemovableAvatar/RemovableAvatar'
import { IconPhotoUp } from '@tabler/icons-react'
import classes from '../../NewHarmonium/New.module.scss'
import { useHarmonium } from '../../../context/DataContext'

function GalleryUpload({ form, pictureUrls }) {

    const icon = <IconPhotoUp />

    const [avatars, setAvatars] = useState([])

    const { selectedHarmonium, uploadFile, removeFile } = useHarmonium()

    //Funkce pro zobrazení avarats při načtení dat stávájícího záznamu
    useEffect(() => {
        if (pictureUrls.length > 0) {
            setAvatars(pictureUrls)
        }
    }, [pictureUrls])

    //Funkce pro nahrání souboru do Storage a získání unikátní url adresy zpět
    const handleFileUpload = async (selectFiles) => {

        const uploadResults = await uploadFile(selectFiles)

        // kontrola výsledku nahrávání
        console.log("Výsledek nahrávání:", uploadResults);

        if (!Array.isArray(uploadResults)) {
            console.error("Očekávalo se pole, ale obdrželo se:", uploadResults);
            return;
        }

        // Zpracování URL adres
        const validUrls = uploadResults.filter(url => url !== null);
        console.log("Nahrané URL adresy:", validUrls);

        // Uložení souborů do state
        setAvatars((prev) => {
            const newAvatars = [...prev, ...validUrls]
            // přidání URL do formuláře
            form.setFieldValue('pictures', newAvatars)
            return newAvatars;
        });
    }

    //odstranění obrázku
    const handleRemove = async (src) => {
        await removeFile(src, selectedHarmonium.id)
        setAvatars((prevAvatars) => {
            const updateAvatars = prevAvatars.filter((avatar) => avatar !== src)

            form.setFieldValue('pictures', updateAvatars)

            return updateAvatars
        });

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