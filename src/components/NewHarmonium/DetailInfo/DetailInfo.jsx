import { Fieldset, Textarea, TextInput, Grid, GridCol, Text, SegmentedControl, TagsInput } from '@mantine/core'
import classes from '../../NewHarmonium/New.module.scss'

function DetailInfo({ form }) {
    return (
        <Fieldset
            legend="Detail nástroje"
            className={classes["fieldset"]}
        >

            <Textarea
                label="Popis nástroje"
                placeholder='Zde můžeš popsat podrobnosti o harmoniu ...'
                {...form.getInputProps('description')}
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
                        {...form.getInputProps('size.height')}
                        classNames={{
                            input: classes.input,
                            label: classes.label,
                        }}
                    />
                    <TextInput
                        label="Šířka"
                        rightSection="cm"
                        {...form.getInputProps('size.width')}
                        classNames={{
                            input: classes.input,
                            label: classes.label,
                        }}
                    />
                    <TextInput
                        label="Hloubka"
                        rightSection="cm"
                        {...form.getInputProps('size.depth')}
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
                {...form.getInputProps('materials')}
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
                        {...form.getInputProps('manuals')}
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
                        {...form.getInputProps('pedal')}
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
                    {...form.getInputProps('disposition.bas')}
                    classNames={{
                        input: classes.input,
                        label: classes.label,
                        pill: classes.pill,
                    }}
                />
                <TagsInput
                    label="Diskant"
                    placeholder='Napiš jméno rejstříku'
                    {...form.getInputProps('disposition.treble')}
                    classNames={{
                        input: classes.input,
                        label: classes.label,
                        pill: classes.pill,
                    }}
                />
                <TagsInput
                    label="Pedál"
                    placeholder='Napiš jméno rejstříku'
                    {...form.getInputProps('disposition.pedal')}
                    classNames={{
                        input: classes.input,
                        label: classes.label,
                        pill: classes.pill,
                    }}
                />
                <TagsInput
                    label="Spojky"
                    placeholder='Napiš jméno rejstříku'
                    {...form.getInputProps('disposition.couplings')}
                    classNames={{
                        input: classes.input,
                        label: classes.label,
                        pill: classes.pill,
                    }}
                />
            </Fieldset>

        </Fieldset>
    )
}

export default DetailInfo