import { Group } from '@mantine/core'
import LoggedIn from './MenuLoggedIn/MenuLoggedIn'
import LoggedOut from './MenuLoggedOut/MenuLoggedOut'
import { useNavigate } from 'react-router-dom'
import classes from './Headers.module.scss'

import { useAuth } from '../../context/AuthContext'

export function Header() {

    const {isAuth } = useAuth()
    const navigate = useNavigate()

    return (
        <>
            <div className={classes['menu']}>

                <Group
                    className={classes['header']}
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    <img src='/Logo.png' alt='Logo' className={classes['logo']} />
                    <div className={classes['title']}>
                        <h1>HARMONIUM - HISTORIE</h1>
                        <h3>první soukromá expozice harmonií v ČR</h3>
                    </div>
                </Group>

                {isAuth
                    ? < LoggedIn />
                    : <LoggedOut />
                }

            </div >
        </>
    )
}
