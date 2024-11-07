import { useState } from 'react'
import { Modal, Group } from '@mantine/core'
import { IconLogin } from '@tabler/icons-react'

import classes from '../MenuLoggedOut/LoggedOut.module.scss'
import LoginForm from '../../LoginForm/LoginForm'

function LoggedOut() {

    const [opened, setOpened] = useState(false)

    return (
        <>
            <Group className={classes['nav']}>
                <button
                    opened={opened ? "true" : " undefined"}
                    className={classes['login']}
                    onClick={() => setOpened(!opened)} >{<IconLogin/>}
                    <span className={classes['btnText']}> Přihlásit se</span>
                </button>
            </Group>

            <Modal
                opened={opened? true : undefined}
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