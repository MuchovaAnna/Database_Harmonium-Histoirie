import { useRef, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useHarmonium } from "../../context/DataContext"
import { Grid, GridCol, Button, ScrollArea, Loader } from "@mantine/core"
import { supabase } from "../../supabase/supabase-client"
import { IconEdit, IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react"
import Gallery from "./Gallery/Gallery"
import Info from "./Info/Info"
import classes from "../DetailHarmonium/DetailHarmonium.module.scss"

function DetailHarmonium() {
    const { isAuth } = useAuth()
    const { selectedHarmonium, data, setSelectedHarmonium, setIsEditing, fetchData } = useHarmonium()

    const dataHarmonium = selectedHarmonium || {}

    console.log(dataHarmonium);


    const navigate = useNavigate()
    const location = useLocation()

    // console.log(location.state);
    // console.log(dataHarmonium);

    //návrat na vyhledávání - tabulka / miniatury
    const handleSeachBack = async () => {
        await fetchData()
        const from = location.state?.from || ""
        const view = from === "columns" ? "columns" : from === "miniature" ? "miniature" : undefined
        navigate('/harmoniums', { state: { view } })
    }

    const currentIndex = data.findIndex(item => item.id === dataHarmonium.id)

    const viewport = useRef(null);

    const scrollToTop = () => {
        if (viewport.current && viewport.current.scrollTo) {
            viewport.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    //předchozí / následující záznam
    const handleNavigation = (direction) => {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < data.length) {
            const newHarmonium = data[newIndex]

            // localStorage.setItem("selectedHarmoniumId", JSON.stringify(newHarmonium))
            setSelectedHarmonium(newHarmonium);

            setTimeout(scrollToTop, 100);
        }
    };

    // //načtení hodnot z LocalStorage při načtení komponenty
    // useEffect(() => {
    //     if (!selectedHarmonium && data.length > 0) {
    //         const savedHarmonium = localStorage.getItem("selectedHarmoniumId")

    //         console.log(savedHarmonium);
    //         const parsedHarmonium = JSON.parse(savedHarmonium)
    //         setSelectedHarmonium(parsedHarmonium)
    //     }
    // }, [selectedHarmonium, data])

    const handlePrevious = () => handleNavigation(-1);
    const handleNext = () => handleNavigation(1);

    useEffect(() => {
        scrollToTop();
    }, [currentIndex]);

    //funkce pro přepnutí na úpravy
    const handleUpdate = async (event, id) => {
        event.preventDefault()
        console.log("current id:", dataHarmonium.id);
        setIsEditing(true)
        navigate("/newHarmonium", { state: { harmoniumData: dataHarmonium } })

        if (!id) {
            console.error("ID is undefined or null");
            return;
        }

        //načtení údajů o harmoniu podle ID
        const { data, error } = await supabase
            .from("harmoniums")
            .select('*')
            .eq('id', dataHarmonium.id)
            .single()

        console.log("current id:", dataHarmonium.id);

        if (error) {
            console.error('Chyba při načítání:', error.message)
            return
        }
        console.log(data);
    }

    //funkce pro kontrolu editovaných dat
    useEffect(() => {
        if (location.state?.data) {
            setSelectedHarmonium(location.state.data)
        }
    }, [location.state, setSelectedHarmonium])

    if (!dataHarmonium || !data.length) {
        return(
        <Loader
            color="lightGreen"
            />
        )
    }

    return (
        <div className={classes["detailContainer"]}>
            {isAuth
                ? <>
                    <ScrollArea
                        h={"80vh"}
                        scrollbars="y"
                        viewportRef={viewport}
                    >

                        <Grid grow gutter="xl"
                            p={20}>
                            <GridCol
                                span={{ base: 12, md: 8 }}
                            >
                                <Info
                                    data={dataHarmonium}
                                    handleSeachBack={handleSeachBack}
                                    handleNavigation={handleNavigation}
                                    handleUpdate={handleUpdate}
                                    currentIndex={currentIndex}
                                />
                            </GridCol>

                            <GridCol
                                span={{ base: 12, md: 4 }}
                            >
                                <Gallery data={dataHarmonium} />
                            </GridCol>
                        </Grid>

                        <div className={classes["editingButtonSection"]}>
                            <Button
                                onClick={(event) => handleUpdate(event, dataHarmonium.id)}
                                className={classes["editedButton"]}
                            >{<IconEdit className={classes["iconMargin"]} />}
                                Upravit
                            </Button>
                        </div>
                        <hr />
                        <div className={classes["buttonSection"]}>
                            <Button
                                onClick={handlePrevious}
                                className={classes["switchButton"]}
                                disabled={currentIndex === 0}
                            >
                                <span> {<IconArrowNarrowLeft className={classes["iconMargin"]} />}</span>
                                <span>Předchozí</span>
                            </Button>
                            <Button
                                onClick={handleSeachBack}
                                className={classes["switchButton"]}
                            > Zpět na přehled
                            </Button>
                            <Button
                                onClick={handleNext}
                                className={classes["switchButton"]}
                                disabled={currentIndex === data.length - 1}
                            >
                                <span> Následující </span>
                                <span>{<IconArrowNarrowRight className={classes["iconMarginLeft"]} />}</span>
                            </Button>
                        </div>

                    </ScrollArea>
                </>
                : <h1 className={classes["title"]}>Stránka se zobrazí po přihlášení</h1>

            }
        </div>
    )
}

export default DetailHarmonium