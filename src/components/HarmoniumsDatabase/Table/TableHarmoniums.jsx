import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, ScrollArea, Modal } from '@mantine/core'
import { IconPhoto, IconSortAscendingLetters, IconSortDescendingLetters, IconSortAscendingNumbers, IconSortDescendingNumbers } from '@tabler/icons-react';
import classes from '../Table/TableHarmoniums.module.scss'
import { useHarmonium } from '../../../context/DataContext';

function TableDatabase({ data }) {

    const {data: dataSort, setData, setSelectedHarmonium, sortOrder, sortData } = useHarmonium()
    const navigate = useNavigate()

    console.log(dataSort);


    const [opened, setOpened] = useState(false)
    const [currentImage, setCurrentImage] = useState('')

    const imageDisplay = (event, element) => {
        event.stopPropagation()
        setCurrentImage(element.pictures[0])
        setOpened(true)
    }

    const handleRowClick = (element) => {
        setSelectedHarmonium(element)
        localStorage.setItem("selectedHarmoniumId", JSON.stringify(element))
        navigate('/detailHarmonium', { state: { selectedHarmonium: element } })

    }

    useEffect(() => {
        const randomData = dataSort.sort(() => 0.5 - Math.random())
        setData(randomData)
    }, [])

    const rows = data.map((element) => (
        <Table.Tr
            key={element.id}
            onClick={() => handleRowClick(element)}
            className={classes["tableRow"]}
        >
            <Table.Td
                onClick={(event) => imageDisplay(event, element)}
                className={classes["tableCell"]}
            >
                {<IconPhoto
                    className={classes['icon']}
                />}
            </Table.Td>
            <Table.Td className={classes["tableCell"]}>{element.builder}</Table.Td>
            <Table.Td className={classes["tableCell"]}>{element.type}</Table.Td>
            <Table.Td className={classes["tableCell"]}>{element.placeOfManufacture}</Table.Td>
            <Table.Td className={classes["tableCell"]}>{element.dating}</Table.Td>
            <Table.Td className={classes["tableCell"]}>{element.manuals} / {element.pedal}</Table.Td>
            <Table.Td className={classes["tableCell"]}>
                {element.location.length > 20 ? `${element.location.slice(0, 20)} ...` : element.location}
            </Table.Td>
            <Table.Td className={classes["tableCell"]}>{element.inventoryId}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <ScrollArea
                type="auto"
                scrollbarSize={4}
                scrollHideDelay={500}
                className={classes['scrollArea']}
            >
                <Table
                    stickyHeader
                    horizontalSpacing="xl"
                    verticalSpacing="md"
                    striped
                    highlightOnHover
                >
                    <Table.Thead>
                        <Table.Tr
                            className={classes["tableHeader"]}
                        >
                            <Table.Th ></Table.Th>
                            <Table.Th
                                className={classes["tableCell"]}
                                onClick={() => sortData("builder")}
                            ><div className={classes["iconContainer"]}>
                                    <span> Stavitel </span>
                                    <div>{sortOrder === "asc" ? (
                                        <IconSortAscendingLetters
                                            className={classes['sortIcon']}
                                        />
                                    ) : (
                                        <IconSortDescendingLetters
                                            className={classes['sortIcon']}
                                        />
                                    )}
                                    </div>
                                </div>
                            </Table.Th>
                            <Table.Th className={classes["tableCell"]}>
                                Typ
                            </Table.Th>
                            <Table.Th className={classes["tableCell"]}>
                                Země původu
                            </Table.Th>
                            <Table.Th
                                className={classes["tableCell"]}
                                onClick={() => sortData("dating")}
                            >
                                <div className={classes["iconContainer"]}>
                                    <span> Datace </span>
                                    <div>{sortOrder === "asc" ? (
                                        <IconSortAscendingNumbers
                                            className={classes['sortIcon']}
                                        />
                                    ) : (
                                        <IconSortDescendingNumbers
                                            className={classes['sortIcon']}
                                        />
                                    )}
                                    </div>
                                </div>
                            </Table.Th>
                            <Table.Th className={classes["columnTitle"]}>
                                ~ Počet manuálu<hr /> ~ Pedal
                            </Table.Th>
                            <Table.Th className={classes["columnTitle"]}>
                                Umístění
                            </Table.Th>
                            <Table.Th
                                onClick={() => sortData("id")}
                            >
                                <div className={classes["iconContainer"]}>
                                    <span> ID </span>
                                    <div>{sortOrder === "asc" ? (
                                        <IconSortAscendingNumbers
                                            className={classes['sortIcon']}
                                        />
                                    ) : (
                                        <IconSortDescendingNumbers
                                            className={classes['sortIcon']}
                                        />
                                    )}
                                    </div>
                                </div>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows}
                    </Table.Tbody>
                </Table>
            </ScrollArea>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                position='center'
                size='xl'
                radius="sm"
                overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
                withCloseButton={false}
                className={classes['windowModal']}
            >
                {currentImage && (
                    <div >
                        <img src={currentImage} alt="Harmonium" className={classes['imgModal']} />
                    </div>
                )}

            </Modal>
        </>
    )
}

export default TableDatabase