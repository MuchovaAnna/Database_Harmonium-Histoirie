import { useForm } from '@mantine/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Grid, GridCol, ScrollArea, Title, Button, Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import classes from '../NewHarmonium/New.module.scss'
import BasicInfo from './BasicInfo/BasicInfo';
import DetailInfo from './DetailInfo/DetailInfo';
import InternalInfo from './InternalInfo/InternalInfo';
import GalleryUpload from './GalleryUpload/GalleryUpload';
import { supabase } from '../../supabase/supabase-client';
import { useAuth } from '../../context/AuthContext';
import { useHarmonium } from '../../context/DataContext';

function NewHarmonium() {
    const navigate = useNavigate()
    const location = useLocation()
    const harmoniumData = location.state?.harmoniumData;

    const { isAuth } = useAuth()
    const { isEditing } = useHarmonium()

    const [isLoaded, setIsLoaded] = useState(false)
    const [pictureUrls, setPictureUrls] = useState([])

    //nastavení value jednotlivých položek formuláře
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

    //Volání useEffect při načítání dat detailu harmonia pro úpravu
    useEffect(() => {
        if (harmoniumData) {

            const urls = harmoniumData.pictures.map(picture => picture.split('?')[0]);
            console.log("Načtené URL adresy obrázků:", urls);

            form.setValues({
                name: harmoniumData.name,
                builder: harmoniumData.builder,
                type: harmoniumData.type || "defultSegment",
                model: harmoniumData.model,
                dating: harmoniumData.dating,
                owner: harmoniumData.owner,
                location: harmoniumData.location,
                description: harmoniumData.description,
                size: {
                    width: harmoniumData.size.width,
                    height: harmoniumData.size.height,
                    depth: harmoniumData.size.depth
                },
                materials: harmoniumData.materials || [],
                manuals: harmoniumData.manuals || "defultSegment",
                pedal: harmoniumData.pedal || "defultSegment",
                disposition: {
                    bas: harmoniumData.disposition.bas || [],
                    treble: harmoniumData.disposition.treble || [],
                    pedal: harmoniumData.disposition.pedal || [],
                    couplings: harmoniumData.disposition.couplings || []
                },
                pictures: urls,
                placeOfManufacture: harmoniumData.placeOfManufacture,
                locationFind: harmoniumData.locationFind,
                signMakers: harmoniumData.signMakers,
                inventoryId: harmoniumData.inventoryId
            }
            )
            setPictureUrls(urls)
        }
        setIsLoaded(true)

    }, [harmoniumData])


    //kód pro zobrazení načítání dat před zobrazením komponenty
    if (!isLoaded) {
        return (
            <div
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Loader
                    color='lightGreen'
                />
            </div>
        )
    }

    //funkce pro tlačítko odeslání
    const handleSubmit = async (value, data) => {
        console.log(value);
        console.log(data);

        try {

            if (isEditing && harmoniumData) {
                const { data: updateData, error } = await supabase
                    .from("harmoniums")
                    .update(value)
                    .eq('id', harmoniumData.id)
                    .select()
                if (error) {
                    console.error('Chyba při aktualizaci dat:', error.message);
                } else {
                    console.log("Data byla úspěšně aktualizována");
                    //informace pro uživatele
                    showNotification({
                        title: "Aktualizace dat",
                        message: "Data byla úspěšně aktualizována.",
                        color: "lightGreen",
                        position: "top-center"
                    })
                    navigate("/detailHarmonium", { state: { data: updateData[0] } })
                }

            } else {

                const { data: insertData, error } = await supabase
                    .from('harmoniums')
                    .insert([value])
                    .select()

                if (error !== null) {
                    console.error('Chyba při vkládání dat:', error.message)
                } else {
                    console.log("Data byla úspěšně vložena")

                    showNotification({
                        title: "Uložení dat",
                        message: "Data byla úspěšně odeslána.",
                        color: "lightGreen",
                        position: "top-center"
                    })
                    setTimeout(() => {     
                        navigate("/detailHarmonium", { state: { data: insertData[0] } })
                    }, 1000)
                }
            }
            form.reset()
        } catch (error) {
            console.error('Neočekávaná chyba', error)
        }
    }

    return (
        <>
            {isAuth
                ? <>
                    <Title
                        pt={30}
                        pb={20}
                        size={25}
                        className={classes["title"]}
                    >
                        {isEditing ? "Úprava informací o nástrojí" : "Vložení nového nástroje"}
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
                                    <GalleryUpload form={form} pictureUrls={pictureUrls} id={harmoniumData.id} />

                                </GridCol>
                            </Grid>
                            <div
                                className={classes["btnContainer"]}
                            >
                                <Button
                                    type='submit'
                                    className={classes["btn"]}
                                > {isEditing ? "Uložit změny" : "Odeslat data"}
                                </Button>
                            </div>
                        </form>
                    </ScrollArea>
                </>
                : <h1 style={{ padding: 30 }}>Sktánka se zobrazí po přihlášení</h1>
            }
        </>
    )
}

export default NewHarmonium