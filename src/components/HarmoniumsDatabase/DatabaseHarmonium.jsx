import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Flex, Pagination, Select, Tabs, Text } from '@mantine/core'
import { IconColumns, IconLayoutGrid } from '@tabler/icons-react';
import classes from '../HarmoniumsDatabase/DatabaseHarmonium.module.scss'
import TableDatabase from './Table/TableHarmoniums';
import MiniaturCard from './Miniatur/Miniature';
import { useAuth } from '../../context/AuthContext';
import { useHarmonium } from '../../context/DataContext';

function DatabaseHarmoniums() {

    // const navigate = useNavigate()
    const { isAuth } = useAuth()
    const { data, lastTab, setLastTab } = useHarmonium()

    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage, setRecordsPerPage] = useState(8)  // výchozí počet záznamu na stránce

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

    return (
        <>
            {isAuth
                ? <>
                    <Tabs
                        color="lightGreen"
                        value={selectedTab}
                        onChange={(value) => {
                            setSelectedTab(value);  // Aktualizace místního stavu
                            setLastTab(value);      // Uložení poslední vybrané záložky do kontextu
                        }}
                        className={classes["tabs"]}
                    >
                        <Tabs.List >
                            <Tabs.Tab
                                value="columns"
                                leftSection={<IconColumns className={classes["iconStyle"]} />}
                            >
                                Tabulka
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="miniatur"
                                leftSection={<IconLayoutGrid className={classes["iconStyle"]} />}
                            >
                                Miniatury
                            </Tabs.Tab>

                        </Tabs.List>

                        {/* pole se stránkováním a selektem pro výběr počtu záznamu na stránku */}
                        <Flex
                            align={'center'}
                            justify={'space-between'}
                            mt={20}
                            mb={20}
                        >
                            <div className={classes["selectSection"]}>
                                <Select
                                    //zobrazuje vychozí počet na stránce
                                    placeholder={recordsPerPage.toString()}
                                    data={['6', '12', '18', '24', '30', '36', '42', '48', '54']}
                                    value={recordsPerPage.toString()}
                                    onChange={
                                        (value) => {
                                            setRecordsPerPage(Number(value))
                                            // po změně stavu se opět nastaví první strana
                                            setCurrentPage(1)
                                        }}
                                    size='xs'
                                    classNames={{
                                        input: classes.select,
                                    }}
                                />
                                <Text className={classes["labelSelect"]}>Počet záznamů na stránce</Text>
                            </div>

                            <Pagination
                                size='xs'
                                withEdges
                                color="lightGreen"
                                className={classes["pagination"]}
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
                : <h1 className={classes["title"]}>Sktánka se zobrazí po přihlášení</h1>}
        </>
    )
}

export default DatabaseHarmoniums