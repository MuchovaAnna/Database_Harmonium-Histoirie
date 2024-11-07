import classes from "../Info/Info.module.scss"

function Info({ data }) {

    if (!data) {
        return <p>Nujsou k dispozici žádná data.</p>;
    }

    return (
        <>
            <div
            className={classes["titleSection"]}
            >
                <h2 className={classes["name"]}>{data.name}</h2>
                <h1 className={classes["name"]}>{data.builder}</h1>
                <p>Datace: {data.dating} </p>
                <p>Typ: {data.type} </p>
                <p>Model: {data.model} </p>
                <p>Místo výroby: {data.placeOfManufacture} </p>
            </div>

            <div className={classes["section"]} >
                <h2 className={classes["name"]}>Popis</h2>
                <p>{data.description} </p>
            </div>

            <div className={classes["section"]} >
                <h2 className={classes["name"]}>Signatura</h2>
                <p>{data.signMakers}</p>
            </div>

            <div className={classes["section"]} >
                <h2 className={classes["name"]}>Rozměry</h2>
                <ul>
                    <li>výška: {data.size?.height || 'N/A'}</li>
                    <li>šířka: {data.size?.width || "N/A"}</li>
                    <li>hloubka: {data.size?.depth || "N/A"}</li>
                </ul>
            </div>

            <div className={classes["section"]} >
                <h2 className={classes["name"]}>Materiály</h2>
                <ul>
                    <li> {Array.isArray(data?.materials) ? data.materials.join(', ') : "N/A"}</li>
                </ul>
            </div>

            <div className={classes["section"]} >
                <h2 className={classes["name"]}>Dispozice</h2>
                {data.disposition.bas.length > 0 && (
                    <ul>Bas: {data.disposition.bas.join(', ')}</ul>
                )}
                {data.disposition.treble.length > 0 && (
                    <ul>Diskant: {data.disposition.treble.join(', ')}</ul>
                )}
                {data.disposition.pedal.length > 0 && (
                    <ul>Pedal: {data.disposition.pedal.join(', ')}</ul>
                )}
                {data.disposition.couplings.length > 0 && (
                    <ul>Spojky: {data.disposition.couplings.join(', ')}</ul>
                )}
            </div>
        </>
    )
}

export default Info