import { useAuth } from "../../context/AuthContext"
import { Flex, Grid, Group, ButtonGroup, Button } from "@mantine/core"

function DetailHarmonium() {
    const {selectedHarmonium, isAuth } = useAuth()

    if (!selectedHarmonium) {
        return <h1 style={{ margin: 30 }}>Záznam nebyl nalezen.</h1>;
    }

    const dataHarmonium = selectedHarmonium

    console.log(dataHarmonium)

    return (

        <>
                {isAuth
                    ? <>
                        <Flex style={{ margin: 30 }}>
                            <Grid>
                                <h1>Galerie</h1>
                            </Grid>

                            <Group>
                                <div>
                                    <h1>{dataHarmonium.name}</h1>
                                    <h2>{dataHarmonium.builder}</h2>
                                </div>
                            </Group>
                        </Flex>



                        <ButtonGroup style={{ margin: 30 }}>
                            <Button color="#7b594e" style={{ border: "1px solid black" }}>Předchozí záznam</Button>
                            <Button color="#ab9087" style={{ border: "1px solid black" }}>Vrátit se na přehled</Button>
                            <Button color="#7b594e" style={{ border: "1px solid black" }}>Následující záznam</Button>
                        </ButtonGroup>

                    </>
                    : <h1 style={{ margin: 30 }}>Stránka se zobrazí po přihlášení</h1>

                }
        </>
    )
}

export default DetailHarmonium