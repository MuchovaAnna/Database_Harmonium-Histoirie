import { Fieldset, TextInput } from '@mantine/core'
import classes from '../../NewHarmonium/New.module.scss'

function InternalInfo({form}) {
    return (
        <Fieldset
            legend="Interní informace"
            className={classes["fieldset"]}
        >
            <TextInput
                label="Majitel"
                placeholder='Majitel'
                {...form.getInputProps('owner')}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />
            <TextInput
                label="Umístení"
                placeholder='Umístění'
                {...form.getInputProps('location')}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />
            <TextInput
                label="Místo nálezu"
                placeholder='Místo nálezu'
                {...form.getInputProps('locationFind')}
                classNames={{
                    input: classes.input,
                    label: classes.label,
                }}
            />
        </Fieldset>
    )
}

export default InternalInfo