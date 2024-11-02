function Info({ data }) {

    if (!data) {
        return <p>Nujsou k dispozici žádná data.</p>;
    }

    return (
        <>
            <div
                style={{ background: "linear-gradient(321deg, #d2c9c6 0%, #ab9087 53%, #896459 100%)", padding: 20, borderRadius: 6, boxShadow: "0px 3px 5px 0 black" }}
            // className={classes["titleSection"]}
            >
                <h2>{data.name}</h2>
                <h1>{data.builder}</h1>
                <p>Datace: {data.dating} </p>
                <p>Typ: {data.type} </p>
                <p>Model: {data.model} </p>
                <p>Místo výroby: {data.placeOfManufacture} </p>
            </div>

            <div style={{ padding: 20 }}>
                <h2>Popis</h2>
                <p>{data.description} </p>
            </div>

            <div style={{ padding: 20 }}>
                <h2>Signatura</h2>
                <p>{data.signMakers}</p>
            </div>

            <div style={{ padding: 20 }}>
                <h2>Rozměry</h2>
                <ul>
                    <li>Výška: {data.size.height}</li>
                    <li>Šířka: {data.size.width}</li>
                    <li>Hloubka: {data.size.depth}</li>
                </ul>
            </div>

            <div style={{ padding: 20 }}>
                <h2>Materiály</h2>
                <ul>
                    <li>{data.materials.join(' , ')}</li>
                </ul>
            </div>

            <div style={{ padding: 20 }}>
                <h2>Dispozice</h2>
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