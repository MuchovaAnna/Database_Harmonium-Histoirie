import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Grid, GridCol, ButtonGroup, Button, ScrollArea } from "@mantine/core"
import Gallery from "./Gallery/Gallery"
import Info from "./Info/Info"
// import classes from "../DetailHarmonium/DetailHarmonium.module.scss"

function DetailHarmonium() {
    const { selectedHarmonium, isAuth, data, setSelectedHarmonium } = useAuth()

    const dataHarmonium = selectedHarmonium || {}

    const navigate = useNavigate()
    const location = useLocation()

    const currrentIndex = data.findIndex(item => item.id === dataHarmonium.id)
    
    const handleSeachBack = () => {
        const from = location.state?.from || ""
        const view = from === "columns" ? "columns" : from === "miniature" ? "miniature" : undefined
        navigate('/harmoniums', { state: { view } })
    }
       
    const handleNavigation = (direction) => {
        const newIndex = currrentIndex + direction;
        if (newIndex >= 0 && newIndex < data.length) {
            setSelectedHarmonium(data[newIndex]);
        }
    };

    const handlePrevious = () => handleNavigation(-1);
    const handleNext = () => handleNavigation(1);

    return (
        <div style={{ margin: "0 auto", maxWidth: "80vw", paddingTop: "30px" }}>
            {isAuth
                ? <>
                    <ScrollArea
                        h={"85vh"}
                        scrollbars="y"
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
                        style={{display:"flex", gap:10, justifyContent:"center", padding:10}}
                        >
                    
                            <Button
                                onClick={handlePrevious}
                                color="#7b594e"
                                style={{ border: "1px solid black" }}
                                disabled={currrentIndex === 0}
                            >Předchozí záznam</Button>
                            <Button
                                onClick={handleSeachBack}
                                color="#ab9087"
                                style={{ border: "1px solid black" }}>Vrátit se na přehled</Button>
                            <Button
                                onClick={handleNext}
                                color="#7b594e"
                                style={{ border: "1px solid black" }}
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