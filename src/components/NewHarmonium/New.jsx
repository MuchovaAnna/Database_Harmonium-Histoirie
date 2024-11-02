import { Grid, GridCol, ScrollArea, Title, Button} from '@mantine/core'
import { useForm } from '@mantine/form';
import classes from '../NewHarmonium/New.module.scss'
import BasicInfo from './BasicInfo/BasicInfo';
import DetailInfo from './DetailInfo/DetailInfo';
import InternalInfo from './InternalInfo/InternalInfo';
import GalleryUpload from './GalleryUpload/GalleryUpload';
import { supabase } from '../../supabase/supabase-client';
import { Logger } from 'sass';

function NewHarmonium() {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: "",
            builder: "",
            type: "",
            model: "",
            dating: "",
            owner: "",
            location: "",
            description: "",
            size: {
                width: "",
                height: "",
                depth: ""
            },
            materials: [],
            manuals: "",
            pedal: "",
            disposition: {
                bas: [],
                treble: [],
                pedal: [],
                couplings: []
            },
            pictures: [],
            placeOfManufacture: "",
            locationFind: "",
            signMakers: "",
            inventoryId: ""
        },
        validate: {
            //jsem ve nastavují podmínky pro jednotlivé vstupní informace - např. kontrola jestli je pole povinné atd.
        },
    });

    const handleSubmit = async (value, data) => {
        console.log(value);
        console.log(data);
        
        try {
            const { error } = await supabase
                .from('harmoniums')
                .insert([value])

            if (error !== null) {
                console.error('Chyba při vkládání dat:', error.message)
            } else {
                console.log("Data byla úspěšně vložena")
                form.reset()
            }
            
        } catch (error) {
            console.error('neočekávaná chyba', error)
            
        }
    }

    return (

        <>
            <Title
                pt={30}
                pb={20}
                size={25}
                className={classes["title"]}
            >
                Vložení nového nástroje <br /> ~ <br /> Úprava informací o nástrojích
            </Title>

            <ScrollArea
                h={"76vh"}
                scrollbars="y"
                scrollbarSize={5}
            >
                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                    style={{ padding: "2rem 1rem" }}
                >
                    <Grid>
                        {/* BASIC INFORMATION */}
                        <GridCol
                            span={{ base: 12, sm: 6, lg: 3 }}
                        >
                            <BasicInfo form={form} />

                        </GridCol>

                        {/* DETAIL INFORMATION */}
                        <GridCol
                            span={{ base: 12, sm: 6, lg: 3 }}
                        >
                            <DetailInfo form={form} />

                        </GridCol>

                        {/* INTERNAL INFO */}
                        <GridCol
                            span={{ base: 12, sm: 6, lg: 3 }}
                        >
                            <InternalInfo form={form} />

                        </GridCol>

                        {/* GALLERY UPLOAD */}
                        <GridCol
                            span={{ base: 12, sm: 6, lg: 3 }}
                        >
                            <GalleryUpload form={form}/>

                        </GridCol>
                    </Grid>

                    <Button
                        type='submit'
                       className={classes["btn"]}
                    > Odeslat
                    </Button>
                </form>
            </ScrollArea>
        </>
    )
}

export default NewHarmonium