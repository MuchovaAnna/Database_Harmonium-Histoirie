import { useNavigate } from 'react-router-dom';
import { Card, Image, Text, Button, Group, Grid, ScrollArea } from '@mantine/core';
import { IconSortAscendingLetters, IconSortAscendingNumbers, IconSortDescendingLetters, IconSortDescendingNumbers } from '@tabler/icons-react';
import { useHarmonium } from '../../../context/DataContext';
import classes from '../Miniatur/Miniatur.module.scss'

function MiniaturCard({ data }) {

    const { data: dataSort, setData, setSelectedHarmonium, sortOrder, sortData } = useHarmonium()
    const navigate = useNavigate()

    const handleDetailClick = (element) => {
        setSelectedHarmonium(element)
        localStorage.setItem("selectedHarmoniumId", JSON.stringify(element))
        navigate('/detailHarmonium', { state: { selectedHarmonium: element } })
    }

    return (
        <>
            <div>
                <button
                    className={classes["sortButton"]}
                    onClick={() => sortData("builder")}
                >
                    <div className={classes["iconContainer"]}>
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
                </button>
                <button
                    className={classes["sortButton"]}
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
                </button>
                <button
                    className={classes["sortButton"]}
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
                </button>
            </div>

            <ScrollArea
                scrollbarSize={6}
                scrollHideDelay={500}
                scrollbars="y"
                className={classes['scrollArea']}
            >
                <Grid>
                    {data.map((element) => (
                        <Grid.Col
                            key={element.id}
                            span={{ base: 12, xs: 6, sm: 4, md: 3, lg: 2 }}
                        >
                            <Card
                                shadow="xs"
                                padding="md"
                                radius="md"
                                key={element.id}
                                withBorder
                                className={classes["cardSection"]}
                                onClick={() => handleDetailClick(element)}
                            >
                                <Card.Section>
                                    <Image
                                        src={element.pictures[0]}
                                        height={160}
                                        mt={-3}
                                        alt={element.builder}
                                    />
                                </Card.Section>

                                <Group mt="md" mb="xs">
                                    <Text className={classes["titleCard"]} >
                                        {element.builder}
                                    </Text>
                                </Group>
                                <Group className={classes['textContainer']}>
                                    <Text size="sm" c="dimmed">Místo výroby: {element.placeOfManufacture}</Text>
                                    <Text size="sm" c="dimmed">Datace: {element.dating}</Text>
                                    <Text size="sm" c="dimmed">Počet manuálu: {element.manuals} / pedál: {element.pedal}</Text>
                                    <Text size="sm" c="dimmed"></Text>
                                </Group>

                                <Button
                                    fullWidth mt="md"
                                    className={classes["btn"]}
                                >
                                    Detail
                                </Button>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </ScrollArea>
        </>
    )
}

export default MiniaturCard