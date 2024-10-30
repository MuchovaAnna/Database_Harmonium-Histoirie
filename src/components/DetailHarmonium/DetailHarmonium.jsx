import { useAuth } from "../../context/AuthContext"
import { Grid, GridCol, ButtonGroup, Button, ScrollArea } from "@mantine/core"
import Gallery from "./Gallery/Gallery"
import Info from "./Info/Info"
// import classes from "../DetailHarmonium/DetailHarmonium.module.scss"

function DetailHarmonium() {
    const { selectedHarmonium, isAuth } = useAuth()

    const dataHarmonium = selectedHarmonium || {}

    console.log(dataHarmonium)

    return (

        <div style={{ margin: "30px auto", maxWidth: "80vw" }}>
            {isAuth
                ? <>
                    <ScrollArea
                        h={"85vh"}
                        scrollbars="y"
                    >
                        <Grid grow gutter="xl">

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

                        <ButtonGroup style={{ margin: "30px auto", display: "flex", justifyContent: "center", width: "100%" }}>
                            <Button color="#7b594e" style={{ border: "1px solid black" }}>Předchozí záznam</Button>
                            <Button color="#ab9087" style={{ border: "1px solid black" }}>Vrátit se na přehled</Button>
                            <Button color="#7b594e" style={{ border: "1px solid black" }}>Následující záznam</Button>
                        </ButtonGroup>
                    </ScrollArea>
                </>
                : <h1 style={{ margin: 30 }}>Stránka se zobrazí po přihlášení</h1>

            }
        </div>
    )
}

export default DetailHarmonium