import { useRef, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useHarmonium } from "../../context/DataContext"
import { Grid, GridCol, Button, ScrollArea } from "@mantine/core"
import { supabase } from "../../supabase/supabase-client"
import Gallery from "./Gallery/Gallery"
import Info from "./Info/Info"
// import classes from "../DetailHarmonium/DetailHarmonium.module.scss"

function DetailHarmonium() {
    const { isAuth } = useAuth()
    const { selectedHarmonium, data, setSelectedHarmonium, setIsEditing } = useHarmonium()

    console.log(selectedHarmonium);
    

    const dataHarmonium = selectedHarmonium || {}

    const navigate = useNavigate()
    const location = useLocation()

    //návrat na vyhledávání - tabulka / miniatury
    const handleSeachBack = () => {
        const from = location.state?.from || ""
        const view = from === "columns" ? "columns" : from === "miniature" ? "miniature" : undefined
        navigate('/harmoniums', { state: { view } })
    }

    const currrentIndex = data.findIndex(item => item.id === dataHarmonium.id)

    const viewport = useRef(null);

    const scrollToTop = () => {
        if (viewport.current && viewport.current.scrollTo) {
            viewport.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    //předchozí / následující záznam
    const handleNavigation = (direction) => {
        const newIndex = currrentIndex + direction;
        if (newIndex >= 0 && newIndex < data.length) {
            setSelectedHarmonium(data[newIndex]);
            setTimeout(scrollToTop, 100);
        }
    };

    const handlePrevious = () => handleNavigation(-1);
    const handleNext = () => handleNavigation(1);

    useEffect(() => {
        scrollToTop();
    }, [currrentIndex]);

    //funkce pro přepnutí na úpravy
    const handleUpdate = async (event, id) => {
        event.preventDefault()
        console.log("current id:", dataHarmonium.id);
        setIsEditing(true)
        navigate("/newHarmonium", {state: {harmoniumData: dataHarmonium}})
        
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
    },[location.state, setSelectedHarmonium])

    return (
        <div style={{ margin: "0 auto", maxWidth: "80vw", paddingTop: "30px" }}>
            {isAuth
                ? <>
                    <ScrollArea
                        h={"85vh"}
                        scrollbars="y"
                        viewportRef={viewport}
                    >

                        <Grid grow gutter="xl"
                            p={20}>
                            <GridCol
                                span={{ base: 12, md: 8 }}
                            >
                                <Info data={dataHarmonium} />
                            </GridCol>

                            <GridCol
                                span={{ base: 12, md: 4 }}
                            >
                                <Gallery data={dataHarmonium} />
                            </GridCol>
                        </Grid>

                        <div
                            style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
                        >
                            <Button
                                onClick={(event)=>handleUpdate(event, dataHarmonium.id)}
                                color="lightGreen"
                                style={{ textTransform: "uppercase" }}
                            >Upravit</Button>
                        </div>
                        <hr />
                        <div
                            style={{ display: "flex", gap: 5, justifyContent: "center", padding: 8 }}
                        >
                            <Button
                                onClick={handlePrevious}
                                color="#7b594e"
                                style={{ border: "1px solid black", textTransform: "uppercase", width: "20vw", height: "50px" }}
                                disabled={currrentIndex === 0}
                            >Předchozí záznam</Button>
                            <Button
                                onClick={handleSeachBack}
                                color="#ab9087"
                                style={{ border: "1px solid black", textTransform: "uppercase", width: "20vw", height: "50px" }}>Vrátit se na přehled</Button>
                            <Button
                                onClick={handleNext}
                                color="#7b594e"
                                style={{ border: "1px solid black", textTransform: "uppercase", width: "20vw", height: "50px" }}
                                disabled={currrentIndex === data.length - 1}
                            >Následující záznam</Button>
                        </div>

                    </ScrollArea>
                </>
                : <h1 style={{ margin: 30 }}>Stránka se zobrazí po přihlášení</h1>

            }
        </div>
    )
}

export default DetailHarmonium