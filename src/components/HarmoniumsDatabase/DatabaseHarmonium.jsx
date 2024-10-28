import { useState, useEffect } from 'react';
import { Flex, Pagination, Select, Tabs, rem } from '@mantine/core'
import { IconColumns, IconLayoutGrid } from '@tabler/icons-react';
import classes from '../HarmoniumsDatabase/DatabaseHarmonium.module.scss'
import TableDatabase from './Table/TableHarmoniums';

function DatabaseHarmoniums() {

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage, setRecordsPerPage] = useState(5)  // výchozí počet záznamu na stránce

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/harmoniums')
            const jsonData = await response.json()
            setData(jsonData)
        }
        fetchData()
    }, [])

    //výpočet celkového počtu stránek
    const totalPages = Math.ceil(data.length / recordsPerPage)

    //výber dat na základě aktuální stránky a počtu záznamu
    const currentData = data.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    )

    //nastavení velikosti icon
    const iconStyle = { width: rem(14), height: rem(14) };

    return (
        <>
            <Tabs color=' #79875c' defaultValue="gallery" style={{ margin: 30 }}>
                <Tabs.List >
                    <Tabs.Tab value="columns" leftSection={<IconColumns style={iconStyle} />}>
                        Tabulka
                    </Tabs.Tab>
                    <Tabs.Tab value="miniatur" leftSection={<IconLayoutGrid style={iconStyle} />}>
                        Miniatury
                    </Tabs.Tab>

                </Tabs.List>

                <Tabs.Panel value="columns">
                    {/* pole se stránkováním a selektem pro výběr počtu záznamu na stránku */}
                    <Flex
                        align={'center'}
                        justify={'space-between'}
                    >
                        <Select
                            //nastavit výchozí počet zobrazení !!!
                            placeholder={recordsPerPage.toString()}
                            data={['10', '20', '30', '40']}
                            value={recordsPerPage.toString()}
                            onChange={
                                (value) => {
                                    setRecordsPerPage(Number(value))
                                    // po změně stavu se opět nastaví první strana
                                    setCurrentPage(1)
                                }}
                            size='xs'
                            //styly přenést do scss!!!!
                            style={{ margin: 20, displa: 'flex', alignItems: 'center', width: 60 }}
                        />
                        <Pagination
                            size='xs'
                            withEdges
                            color='#79875c'
                            style={{ margin: 20 }}
                            page={currentPage}
                            onChange={setCurrentPage}
                            total={totalPages}
                        />
                    </Flex>

                    {/*importovaná tabulka*/}
                    <TableDatabase data={currentData} />

                </Tabs.Panel>

                <Tabs.Panel value="miniatur" >
                    Messages tab content
                </Tabs.Panel>
            </Tabs>
        </>
    )
}

export default DatabaseHarmoniums