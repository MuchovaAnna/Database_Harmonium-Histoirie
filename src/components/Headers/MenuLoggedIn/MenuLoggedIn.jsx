import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Burger, Drawer, Group } from '@mantine/core'
import { useAuth } from '../../../context/AuthContext'
import { useHarmonium } from '../../../context/DataContext'
import { IconCopyPlus, IconLogout } from '@tabler/icons-react'

import classes from '../MenuLoggedIn/LoggedIn.module.scss'

function LoggedIn() {

    const [opened, setOpened] = useState(false)
    const { logout } = useAuth()
    const navigate = useNavigate()
    const {setIsEditing} = useHarmonium()

    const handleLogOut = async () => {
        const isLoggedOut = await logout()
        if (isLoggedOut) {
            navigate('/')
        }
    }

    return (
        <>
            <Group className={classes['nav']}>
                <NavLink
                    to="/harmoniums"
                    className={classes['link']}>
                    Databáze<br /> harmonií
                </NavLink>
                <NavLink
                    to="/builders"
                    className={classes['link']}>
                    Databáze<br /> stavitelů
                </NavLink>
                <NavLink
                    to="/newHarmonium"
                    onClick={()=>(setIsEditing(false))}
                    className={classes['link']}
                >
                    <IconCopyPlus className={classes["iconStyle"]}/>
                    Přidat<br /> nový
                </NavLink>
                <button
                    className={classes['link']}
                    onClick={handleLogOut}
                    style={{ cursor: 'pointer' }}
                >
                    <IconLogout className={classes["iconStyle"]}/>
                    Odhlásit se
                </button>
            </Group>

            <Burger
                color='brown'
                className={classes['burger']}
                opened={opened ? true : undefined}
                onClick={() => setOpened(!opened)}
                size='md'
            />

            <Drawer
                opened={opened ? true : undefined}
                onClose={() => setOpened(false)}
                position='right'
                size="xs"
                offset={8}
                radius="md"
                overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
            >
                <div>
                    <NavLink
                        to="/harmoniums"
                        onClick={() => setOpened(false)}
                        className={classes['drawerLink']}>
                        Databáze harmonií
                    </NavLink>
                    <NavLink
                        to="/builders"
                        onClick={() => setOpened(false)}
                        className={classes['drawerLink']}>
                        Databáze stavitelů
                    </NavLink>
                    <NavLink
                        to="/newHarmonium"
                        onClick={() => (
                            setOpened(false),
                            setIsEditing(false)
                        )}
                        className={classes.drawerLink}>
                        <IconCopyPlus className={classes["iconStyle"]}/>
                        Přidat  nový
                    </NavLink>
                    <div
                        className={classes['drawerLink']}
                        onClick={handleLogOut} >
                        <IconLogout className={classes["iconStyle"]}/>
                        Odhlásit se
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default LoggedIn