import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, ScrollArea, Modal } from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react';
import classes from '../Table/TableHarmoniums.module.scss'
import { useHarmonium } from '../../../context/DataContext';

function TableDatabase({data}) {

    const {setSelectedHarmonium} = useHarmonium()
    const navigate = useNavigate()

    const [opened, setOpened] = useState(false)
    const [currentImage, setCurrentImage] = useState('')

    const imageDisplay = (event, element) => {
        event.stopPropagation()
        setCurrentImage(element.pictures[0])
        setOpened(true)
    }

    const handleRowClick = (element) => {
        setSelectedHarmonium(element)
        navigate('/detailHarmonium')

    }

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
            <Table.Td className={classes["tableCell"]}>{element.location}</Table.Td>
            <Table.Td className={classes["tableCell"]}>{element.inventoryId}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <ScrollArea
                type="auto"
                scrollbarSize={6}
                scrollHideDelay={500}
                className={classes['scrollArea']}
            >
                <Table
                    stickyHeader
                    horizontalSpacing="xl"
                    verticalSpacing="xs"
                    striped
                    highlightOnHover
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th></Table.Th>
                            <Table.Th>Stavitel</Table.Th>
                            <Table.Th>Typ</Table.Th>
                            <Table.Th>Země původu</Table.Th>
                            <Table.Th>Datace</Table.Th>
                            <Table.Th>Počet manuálu / pedal</Table.Th>
                            <Table.Th>Umístění</Table.Th>
                            <Table.Th>ID</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
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