import { useState } from 'react';
import { Table, ScrollArea, Modal } from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react';
import classes from '../Table/TableHarmoniums.module.scss'

function TableDatabase({ data }) {

    const [opened, setOpened] = useState(false)
    const [currentImage, setCurrentImage] = useState('')

    const imageDisplay = (element) => {
        setCurrentImage(element.pictures[0])
        setOpened(true)
    }

    const rows = data.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td
                onClick={()=> imageDisplay(element)}
            >
                {<IconPhoto 
                    className={classes['icon']}
                />}
            </Table.Td>
            <Table.Td>{element.builder}</Table.Td>
            <Table.Td>{element.type}</Table.Td>
            <Table.Td>{element.placeOfManufacture}</Table.Td>
            <Table.Td>{element.dating}</Table.Td>
            <Table.Td>{element.manuals} / {element.pedal}</Table.Td>
            <Table.Td>{element.location}</Table.Td>
            <Table.Td>{element.id}</Table.Td>
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
                    verticalSpacing="sm"
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
                className={classes['windowModal']}
            >
                {currentImage && (
                    <div >
                        <img src={currentImage} alt="Harmonium" className={classes['imgModal']}/>
                    </div>
                )}

            </Modal>
        </>
    )
}

export default TableDatabase