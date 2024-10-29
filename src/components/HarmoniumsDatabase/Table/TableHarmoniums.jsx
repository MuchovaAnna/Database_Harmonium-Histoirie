import { Table, ScrollArea, rem} from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react';
import classes from '../Table/TableHarmoniums.module.scss'

function TableDatabase({data}) {

    const rows = data.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{<IconPhoto style={{ width: rem(14), height: rem(14) }} />}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.type}</Table.Td>
            <Table.Td>{element.country}</Table.Td>
            <Table.Td>{element.period}</Table.Td>
            <Table.Td>{element.numberOfRegisters}</Table.Td>
            <Table.Td>{element.id}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <ScrollArea
                h='100%'
                type="auto"
                scrollbarSize={6}
                scrollHideDelay={500}
            >
                <Table
                    stickyHeader
                    horizontalSpacing="sm"
                    verticalSpacing="sm"
                    striped
                    highlightOnHover
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th></Table.Th>
                            <Table.Th>Název</Table.Th>
                            <Table.Th>Typ</Table.Th>
                            <Table.Th>Země</Table.Th>
                            <Table.Th>Období</Table.Th>
                            <Table.Th>Počet her</Table.Th>
                            <Table.Th>ID</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>

        </>
    )

}

export default TableDatabase