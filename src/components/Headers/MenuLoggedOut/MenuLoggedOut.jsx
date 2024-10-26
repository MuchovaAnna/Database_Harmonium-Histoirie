import { useState } from 'react'
import { Modal, Group } from '@mantine/core'

import classes from '../MenuLoggedOut/LoggedOut.module.scss'
import LoginForm from '../../LoginForm/LoginForm'

function LoggedOut() {

    const [opened, setOpened] = useState(false)

    return (
        <>
            <Group className={classes.nav}>
                <button
                    opened={opened}
                    className={classes.login}
                    onClick={() => setOpened(!opened)} >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round" strokeLinejoin="round"
                        className={classes.icon}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                        <path d="M3 12h13l-3 -3" />
                        <path d="M13 15l3 -3" />
                    </svg>
                    <span className={classes.btnText}>Přihlásit se</span>
                </button>
            </Group>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                position='right'
                size='sm'
                radius="md"
                overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}>
                
                {/* zde se umístí přihlašovací formulář*/}
                <LoginForm/>

            </Modal>
        </>
    )
}

export default LoggedOut