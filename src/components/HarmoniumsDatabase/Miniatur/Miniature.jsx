import { useNavigate } from 'react-router-dom';
import { Card, Image, Text, Button, Group, Grid, ScrollArea } from '@mantine/core';
import { useHarmonium } from '../../../context/DataContext';
import classes from '../Miniatur/Miniatur.module.scss'

function MiniaturCard({ data }) {

    const { setSelectedHarmonium } = useHarmonium()
    const navigate = useNavigate()

    const handleDetailClick = (element) => {
        setSelectedHarmonium(element)
        navigate('/detailharmonium')
    }

    return (
        <>
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
                                shadow="xs" padding="lg" radius="md"
                                key={element.id}
                                withBorder
                                onClick={() => handleDetailClick(element)}
                            >
                                <Card.Section>
                                    <Image
                                        src={element.pictures[0]}
                                        height={160}
                                        alt={element.nazev}
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