import { useState } from 'react'
import { Fieldset, FileInput, Group } from '@mantine/core'
import RemovableAvatar from '../RemovableAvatar/RemovableAvatar'
import { IconPhotoUp } from '@tabler/icons-react'
import classes from '../../NewHarmonium/New.module.scss'
import { supabase } from '../../../supabase/supabase-client'

function GalleryUpload({ form }) {

    const icon = <IconPhotoUp />

    const [avatars, setAvatars] = useState([])


    const handleFileUpload = async (files) => {
        console.log(files);
        if (!files) return;

        const uploaderUrl = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const fileName = `${Date.now()}_${file.name}`;
            //nahrání souboru do Storage Supabase
            const { data, error } = await supabase.storage
                .from('harmonia')
                .upload(fileName, file)

            if (error) {
                console.error('Chyba při nahrávání souboru', error)
                return
            }

            //získání veřejné URL nahraného souboru
            const { publicURL } = supabase.storage
                .from('harmonia')
                .getPublicUrl(fileName)

            if (publicURL) {
                uploaderUrl.push(publicURL)
            }
        }

        if (uploaderUrl.length > 0) {
            //uložení URL do databáze
            await savePictureUrlToDatabase(uploaderUrl)
        }
    }
    const savePictureUrlToDatabase = async (urls) => {

        const { error } = await supabase
            .from('harmoniums')
            .update({ "pictures": urls })
            .eq('id', form.value.id)

        if (error) {
            console.error("Chybapři nahrávání URL do databáze:", error)
        }
    }

    const handleRemove = (src) => {
        setAvatars((prevAvatars) => prevAvatars.filter((avatar) => avatar !== src));
    }

    return (
        <Fieldset
            legend="Galerie"
            className={classes["fieldset"]}
        >

            <FileInput
                leftSection={icon}
                label="Nahrej fotografie"
                placeholder="Po kliknutí nahrajete fotografie"
                accept='image/jpg, image/jpeg,image/png'
                multiple
                onChange={handleFileUpload}
                // {...form.getInputProps('pictures')}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />

            <Group spacing="sm">
                {avatars.map((src) => (
                    <RemovableAvatar key={src} src={src} onRemove={() => handleRemove(src)} />
                ))}
            </Group>

        </Fieldset>

    );
}

export default GalleryUpload