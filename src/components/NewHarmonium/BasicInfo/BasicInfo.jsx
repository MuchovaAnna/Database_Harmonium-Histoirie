import { Fieldset, TextInput, Text, SegmentedControl } from '@mantine/core'
import classes from '../../NewHarmonium/New.module.scss'

function BasicInfo({ form }) {

    return (
        <Fieldset
            legend="Základní informace"
            className={classes["fieldset"]}
        >
            <TextInput
                label="Nástroj"
                placeholder="harmonium, fisharmonika, aj."
                {...form.getInputProps('name')}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />
            <TextInput
                label="Stavitel"
                placeholder='Jan Tuček, Al. Hugo Lhota, aj.'
                {...form.getInputProps('builder')}
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
                data={['tlakové', 'sací']}
                color='lightGreen'
                size='xs'
                w={"50%"}
                className={classes["segmentControl"]}
                {...form.getInputProps('type')}
            />
            <TextInput
                label="Model"
                placeholder='Konkrétní model nástroje'
                {...form.getInputProps('model')}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />
            <TextInput
                label="Datace"
                placeholder='rok výroby / období výroby'
                {...form.getInputProps('dating')}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />
            <TextInput
                label="Místo výroby"
                placeholder='stát / město'
                {...form.getInputProps("placeOfManufacture")}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />
            <TextInput
                label="Inventarní číslo"
                placeholder='Inventaarní číslo'
                {...form.getInputProps('inventoryId')}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />
            <TextInput
                label="Signatura výrobce"
                placeholder='opusové číslo'
                {...form.getInputProps('signMakers')}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />

        </Fieldset>
    )
}

export default BasicInfo