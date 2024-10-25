import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Burger, Drawer, Group } from '@mantine/core'
import classes from './Headers.module.scss'

export function Header() {

    const [opened, setOpened] = useState(false)

    return (
        <>
            <div className={classes.menu}>
                <div className={classes.header}>
                    <img src='public\Logo.png' alt='Logo' className={classes.logo} />
                    <div className={classes.title}>
                        <h1>HARMONIUM - HISTORIE</h1>
                        <h3>první soukromá expozice harmonií v ČR</h3>
                    </div>
                </div>

                <Group className={classes.nav}>
                    <NavLink to="/harmoniums" className={classes.link}>Databáze<br /> harmonií</NavLink>
                    <NavLink to="/builders" className={classes.link}>Databáze<br /> stavitelů</NavLink>
                    <NavLink to="/newHarmonium" className={classes.link}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={classes.icon}>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                            <path d="M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                            <path d="M11 14h6" />
                            <path d="M14 11v6" />
                        </svg>
                        Přidat<br /> nový</NavLink>
                </Group>

                <Burger
                    className={classes.burger}
                    opened={opened}
                    onClick={() => setOpened(!opened)}
                    size='md'
                />

                <Drawer
                    opened={opened}
                    onClose={() => setOpened(false)}
                    position='right'
                    size="xs"
                    offset={8}
                    radius="md"
                    overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
                    //padding="md"
                >
                    <div>
                        <NavLink to="/harmoniums" onClick={() => setOpened(false)} className={classes.drawerLink}>Databáze  harmonií</NavLink>
                        <NavLink to="/builders" onClick={() => setOpened(false)} className={classes.drawerLink}>Databáze stavitelů</NavLink>
                        <NavLink to="/newHarmonium" onClick={() => setOpened(false)} className={classes.drawerLink}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={classes.icon}>
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                            <path d="M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                            <path d="M11 14h6" />
                            <path d="M14 11v6" />
                        </svg>
                            Přidat  nový</NavLink>
                    </div>

                </Drawer>

            </div>
        </>
    )
}
