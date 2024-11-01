import { useState } from 'react';
import { Fieldset, SegmentedControl, TextInput, Text, Textarea, Grid, GridCol, ScrollArea, Title, TagsInput, FileInput, AvatarGroup, Avatar, Group } from '@mantine/core'
import { IconPhotoUp } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import classes from '../NewHarmonium/New.module.scss'
import RemovableAvatar from './RemovableAvatar/RemovableAvatar';

function NewHarmonium() {

    const icon = <IconPhotoUp />

    const [avatars, setAvatars] = useState([
        "public/harmoniums/harmonium_2.jpg",
        "public/harmoniums/harmonium_3.jpg",
        "public/harmoniums/harmonium_4.jpg",
    ]);

    const handleRemove = (src) => {
        setAvatars((prevAvatars) => prevAvatars.filter((avatar) => avatar !== src));
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (

        <>
            <Title
                pt={30}
                pb={20}
                size={25}
                className={classes["title"]}
            >
                Vložení nového nástroje <br /> ~ <br /> Úprava informací o nástrojích
            </Title>

            <ScrollArea
                h={"76vh"}
                scrollbars="y"
                scrollbarSize={5}
            >
                <form
                    onSubmit={form.onSubmit((values) => console.log(values))}
                    style={{ padding: "2rem 1rem" }}
                >
                    <Grid>
                        <GridCol
                            span={{ base: 12, sm: 6, lg: 3 }}
                        >
                            <Fieldset
                                legend="Základní informace"
                                className={classes["fieldset"]}
                            >
                                <TextInput
                                    label="Nástroj"
                                    placeholder="harmonium, fisharmonika, aj."
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />
                                <TextInput
                                    label="Stavitel"
                                    placeholder='Jan Tuček, Al. Hugo Lhota, aj.'
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />
                                <Text
                                    size='sm'
                                    className={classes["label"]}
                                >Typ
                                </Text>
                                <SegmentedControl
                                    data={["tlakové", "sací"]}
                                    color='lightGreen'
                                    size='xs'
                                    w={"50%"}
                                    className={classes["segmentControl"]}
                                />
                                <TextInput
                                    label="Model"
                                    placeholder='Konkrétní model nástroje'
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />
                                <TextInput
                                    label="Datace"
                                    placeholder='rok výroby / období výroby'
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />
                                <TextInput
                                    label="Místo výroby"
                                    placeholder='stát / město'
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />
                                <TextInput
                                    label="Inventarní číslo"
                                    placeholder=''
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />
                                <TextInput
                                    label="Signatura výrobce"
                                    placeholder='opusové číslo'
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />

                            </Fieldset>
                        </GridCol>

                        <GridCol
                            span={{ base: 12, sm: 6, lg: 3 }}
                        >
                            <Fieldset
                                legend="Detail nástroje"
                                className={classes["fieldset"]}
                            >

                                <Textarea
                                    label="Popis nástroje"
                                    placeholder='Zde můžeš popsat podrobnosti o harmoniu ...'
                                    autosize
                                    minRows={2}
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />

                                <Fieldset
                                    legend="Rozměry"
                                    className={classes["nextFieldset"]}
                                >
                                    <div
                                        className={classes["size"]}
                                    >
                                        <TextInput
                                            label="Výška"
                                            rightSection="cm"
                                            classNames={{
                                                input: classes.input,
                                                label: classes.label,
                                            }}
                                        />
                                        <TextInput
                                            label="Šířka"
                                            rightSection="cm"
                                            classNames={{
                                                input: classes.input,
                                                label: classes.label,
                                            }}
                                        />
                                        <TextInput
                                            label="Hloubka"
                                            rightSection="cm"
                                            classNames={{
                                                input: classes.input,
                                                label: classes.label,
                                            }}
                                        />
                                    </div>
                                </Fieldset>

                                <TagsInput
                                    label="Použité materiály"
                                    placeholder='Druh materiálu'
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                        pill: classes.pill,
                                    }}
                                />

                                <Grid>
                                    <GridCol span={{ base: 6 }}>
                                        <Text
                                            size='sm'
                                            mb={8}
                                            className={classes["label"]}
                                        >Počet manuálu
                                        </Text>
                                        <SegmentedControl
                                            data={["1", "2", "3"]}
                                            color='lightGreen'
                                            size='xs'
                                            className={classes["segmentControl"]}
                                        />
                                    </GridCol>
                                    <GridCol span={{ base: 6 }}>
                                        <Text
                                            size='sm'
                                            mb={8}
                                            className={classes["label"]}
                                        >Pedál
                                        </Text>
                                        <SegmentedControl
                                            data={["ano", "ne"]}
                                            color='lightGreen'
                                            size='xs'
                                            className={classes["segmentControl"]}
                                        />
                                    </GridCol>
                                </Grid>

                                <Fieldset
                                    legend="Dispozice"
                                    className={classes["nextFieldset"]}
                                >
                                    <TagsInput
                                        label="Bas"
                                        placeholder='Napiš jméno rejstříku'
                                        classNames={{
                                            input: classes.input,
                                            label: classes.label,
                                            pill: classes.pill,
                                        }}
                                    />
                                    <TagsInput
                                        label="Diskant"
                                        placeholder='Napiš jméno rejstříku'
                                        classNames={{
                                            input: classes.input,
                                            label: classes.label,
                                            pill: classes.pill,
                                        }}
                                    />
                                    <TagsInput
                                        label="Pedál"
                                        placeholder='Napiš jméno rejstříku'
                                        classNames={{
                                            input: classes.input,
                                            label: classes.label,
                                            pill: classes.pill,
                                        }}
                                    />
                                    <TagsInput
                                        label="Spojky"
                                        placeholder='Napiš jméno rejstříku'
                                        classNames={{
                                            input: classes.input,
                                            label: classes.label,
                                            pill: classes.pill,
                                        }}
                                    />
                                </Fieldset>

                            </Fieldset>
                        </GridCol>

                        <GridCol
                            span={{ base: 12, sm: 6, lg: 3 }}
                        >
                            <Fieldset
                                legend="Interní informace"
                                className={classes["fieldset"]}
                            >

                                <TextInput
                                    label="Majitel"
                                    placeholder='Majitel'
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />
                                <TextInput
                                    label="Umístení"
                                    placeholder='Umístění'
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />
                                <TextInput
                                    label="Místo nálezu"
                                    placeholder='Místo nálezu'
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />

                            </Fieldset>
                        </GridCol>

                        <GridCol
                            span={{ base: 12, sm: 6, lg: 3 }}
                        >
                            <Fieldset
                                legend="Galerie"
                                className={classes["fieldset"]}
                            >

                                <FileInput
                                    leftSection={icon}
                                    label="Nahrej fotografie"
                                    placeholder="Po kliknutí nahrajete fotografie"
                                    classNames={{
                                        input: classes.input,
                                        label: classes.label,
                                    }}
                                />

                                <Group spacing="sm">
                                    {avatars.map((src) => (
                                        <RemovableAvatar key={src} src={src} onRemove={() => handleRemove(src)} />
                                    ))}
                                </Group>

                            </Fieldset>
                        </GridCol>
                    </Grid>


                </form>
            </ScrollArea>
        </>
    )
}

export default NewHarmonium