import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Burger, Drawer, Group, Modal } from '@mantine/core'

import classes from '../MenuLoggedIn/LoggedIn.module.scss'

function LoggedIn() {

    const [opened, setOpened] = useState(false)
    const navigate = useNavigate()

    return (
        <>
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
                <button
                    className={classes.link}
                    onClick={()=>navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={classes.icon}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                    Odhlásit se</button>
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
                    <div
                        className={classes.drawerLink}
                        onClick={() => setOpened(false)} >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={classes.icon}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" />
                        </svg>
                        Odhlásit se
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default LoggedIn