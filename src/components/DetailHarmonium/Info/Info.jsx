import { Button } from "@mantine/core";
import { IconColumns, IconArrowLeft, IconArrowRight, IconEdit } from "@tabler/icons-react";
import { useHarmonium } from "../../../context/DataContext";
import classes from "../Info/Info.module.scss"

function Info({ data, handleSeachBack, handleNavigation, handleUpdate }) {

    const { data: harmoniumData, selectedHarmonium } = useHarmonium()
    
    if (!data || !selectedHarmonium) {
        return <p>Nejsou k dispozici žádná data.</p>;
    }
    
    const currentIndex = harmoniumData.findIndex(item => item.id === selectedHarmonium.id)

    const handlePrevious = () => handleNavigation(-1)
    const handleNext = ()=> handleNavigation (1)

    return (
        <>
            <div className={classes["titleSection"]}>
                <div className={classes["sectionInformation"]}>
                    <h3 className={classes["name"]}>{data.name}</h3>
                    <h1 className={classes["name", "title"]}>{data.builder}</h1>
                    <p>Datace: {data.dating} </p>
                    <p>Typ: {data.type} </p>
                    <p>Model: {data.model} </p>
                    <p>Místo výroby: {data.placeOfManufacture} </p>
                </div>

                <div className={classes["buttonSection"]}>
                    <Button
                        className={classes["btn"]}
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                    >
                        {<IconArrowLeft className={classes["icon"]} />}
                    </Button>
                    <Button
                        className={classes["btn"]}
                        onClick={handleNext}
                        disabled={currentIndex === harmoniumData.length - 1}
                    >
                        {<IconArrowRight className={classes["icon"]} />}
                    </Button>
                    <Button
                        className={classes["btn"]}
                        onClick={()=>handleSeachBack()}
                    >
                        {<IconColumns className={classes["icon"]} />}
                    </Button>
                    <Button
                        className={classes["btn"]}
                        onClick={(e)=>handleUpdate(e, data.id)}
                    >
                        {<IconEdit className={classes["icon"]} />}
                    </Button>
                </div>

            </div>

            <div className={classes["section"]} >
                <h3 className={classes["name"]}>Popis</h3>
                <p>{data.description} </p>
            </div>

            <div className={classes["section"]} >
                <h3 className={classes["name"]}>Signatura</h3>
                <p>{data.signMakers}</p>
            </div>

            <div className={classes["section"]} >
                <h3 className={classes["name"]}>Rozměry</h3>
                <ul>
                    <li>výška: {data.size?.height || 'N/A'}</li>
                    <li>šířka: {data.size?.width || "N/A"}</li>
                    <li>hloubka: {data.size?.depth || "N/A"}</li>
                </ul>
            </div>

            <div className={classes["section"]} >
                <h3 className={classes["name"]}>Materiály</h3>
                <ul>
                    <li> {Array.isArray(data?.materials) ? data.materials.join(', ') : "N/A"}</li>
                </ul>
            </div>

            <div className={classes["section"]} >
                <h3 className={classes["name"]}>Dispozice</h3>
                {data?.disposition?.bas?.length > 0 && (
                    <ul>Bas: {data.disposition.bas.join(', ')}</ul>
                )}
                {data?.disposition?.treble?.length > 0 && (
                    <ul>Diskant: {data.disposition.treble.join(', ')}</ul>
                )}
                {data?.disposition?.pedal?.length > 0 && (
                    <ul>Pedal: {data.disposition.pedal.join(', ')}</ul>
                )}
                {data?.disposition?.couplings?.length > 0 && (
                    <ul>Spojky: {data.disposition.couplings.join(', ')}</ul>
                )}
            </div>
        </>
    )
}

export default Info