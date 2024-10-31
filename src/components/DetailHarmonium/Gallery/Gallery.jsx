import { Flex } from "@mantine/core"

function Gallery({ data }) {

    if (!data) {
        return <p>Nujsou k dispozici žádná data.</p>;
    }

    return (
        <>
            <div
                // style={{margin:20}}
            >
                <h1>Galerie</h1>

                <Flex
                    wrap='wrap'
                    gap={10}
                    justify="center"
                >
                    {data.pictures && data.pictures.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Obrázek ${index + 1}`}
                            style={{ width: '40%' }} />
                    ))}
                </Flex>
            </div>
        </>
    )
}

export default Gallery