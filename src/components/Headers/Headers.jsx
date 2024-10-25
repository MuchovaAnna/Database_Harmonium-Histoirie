import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Burger, Drawer, Group } from '@mantine/core'
import classes from './Headers.module.scss'

export function Header() {

    const [opened, setOpened] = useState(false)

    return (
        <>
            <div className={classes.header}>
                <img src='public\Logo.svg' alt='Logo' className={classes.logo} />
                <div className={classes.title}>
                    <h1>HARMONIUM - HISTORIE</h1>
                    <h3>první soukromá expozice harmonií v ČR</h3>
                </div>

                <Group>
                    <NavLink to="/harmoniums">Databáze harmonií</NavLink>
                    <NavLink to="/builders">Databáze stavitelů</NavLink>
                    <NavLink to="/newHarmonium">+ Přidat nový</NavLink>
                </Group>

                <Burger
                    opened={opened}
                    onClick={() => setOpened(!opened)}
                    size='md'
                />

                <Drawer
                    opened={opened}
                    onClose={() => setOpened(false)}
                    position='top'
                //padding="md"
                >
                    <div>
                        <NavLink to="/harmoniums" onClick={()=> setOpened(false)}>Databáze harmonií</NavLink>
                        <NavLink to="/builders" onClick={()=> setOpened(false)}>Databáze stavitelů</NavLink>
                        <NavLink to="/newHarmonium" onClick={()=> setOpened(false)}>+ Přidat nový</NavLink>
                    </div>

                </Drawer>

            </div>
        </>
    )
}
