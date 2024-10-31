import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Flex, Pagination, Select, Tabs, rem } from '@mantine/core'
import { IconColumns, IconLayoutGrid } from '@tabler/icons-react';
// import classes from '../HarmoniumsDatabase/DatabaseHarmonium.module.scss'
import TableDatabase from './Table/TableHarmoniums';
import MiniaturCard from './Miniatur/Miniature';
import { useAuth } from '../../context/AuthContext';

function DatabaseHarmoniums() {

    // const navigate = useNavigate()
    const { data, isAuth, lastTab, setLastTab } = useAuth()

    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage, setRecordsPerPage] = useState(5)  // výchozí počet záznamu na stránce

    //výběr karty podle posledního výběru tabulka / miniatury
    const [selectedTab, setSelectedTab] = useState(lastTab || 'columns')

    // Nastavení stavu selectedTab při načtení komponenty
    useEffect(() => {
        setSelectedTab(lastTab);
    }, [lastTab]);

    //výpočet celkového počtu stránek
    const totalPages = Math.ceil(data.length / recordsPerPage)

    // //výber dat na základě aktuální stránky a počtu záznamu
    const currentData = data.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    )

    //nastavení velikosti icon
    const iconStyle = { width: rem(14), height: rem(14) };

    return (
        <>
            {isAuth
                ? <>
                    <Tabs
                        color=' #79875c'
                        value={selectedTab}
                        onChange={(value) => {
                            setSelectedTab(value);  // Aktualizace místního stavu
                            setLastTab(value);      // Uložení poslední vybrané záložky do kontextu
                        }}
                        style={{ padding: 30 }}>
                        <Tabs.List >
                            <Tabs.Tab
                                value="columns"
                                leftSection={<IconColumns style={iconStyle} />}
                            >
                                Tabulka
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="miniatur"
                                leftSection={<IconLayoutGrid style={iconStyle} />}
                            >
                                Miniatury
                            </Tabs.Tab>

                        </Tabs.List>

                        {/* pole se stránkováním a selektem pro výběr počtu záznamu na stránku */}
                        <Flex
                            align={'center'}
                            justify={'space-between'}
                        >
                            <Select
                                //zobrazuje vychozí počet na stránce
                                placeholder={recordsPerPage.toString()}
                                data={['5', '10', '15', '20', '25', '30', '35', '40', '45']}
                                value={recordsPerPage.toString()}
                                onChange={
                                    (value) => {
                                        setRecordsPerPage(Number(value))
                                        // po změně stavu se opět nastaví první strana
                                        setCurrentPage(1)
                                    }}
                                size='xs'
                                //styly přenést do scss!!!!
                                style={{ margin: 20, display: 'flex', alignItems: 'center', width: 60 }}
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

                        <Tabs.Panel value="columns">
                            {/*importovaná tabulka*/}
                            <TableDatabase
                                data={currentData}
                            />
                        </Tabs.Panel>

                        <Tabs.Panel value="miniatur" >
                            {/* importované miniatury */}
                            <MiniaturCard
                                data={currentData}
                            />
                        </Tabs.Panel>
                    </Tabs></>
                : <h1 style={{ padding: 30 }}>Sktánka se zobrazí po přihlášení</h1>}
        </>
    )
}

export default DatabaseHarmoniums