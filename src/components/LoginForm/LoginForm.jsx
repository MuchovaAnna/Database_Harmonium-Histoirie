import { Group, Input, PasswordInput, Button, Text } from "@mantine/core";
import { useState, } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import classes from '../LoginForm/LoginForm.module.scss';

function LoginForm() {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Přihlašuji...', userName, password);
        
        const { error } = login(userName, password)
        
        if (error) {
            return
        }

        navigate('/harmoniums')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
            <Group
                justify="center"
            >
                <div>
                    <Text
                        size="md"
                        className={classes.label}>Přihlašovací jméno</Text>
                    <Input
                        placeholder="Přihlašovací jméno"
                        variant="unstyled"
                        value={userName}
                        onChange={ e => setUserName(e.currentTarget.value)}
                        size="md"
                        className={classes.input}
                    />
                </div>

                <div>
                    <Text
                        size="md"
                        className={classes.label}>Heslo</Text>
                    <PasswordInput
                        placeholder="Heslo"
                        variant="unstyled"
                        size="md"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={classes.input}
                    />
                </div>

                <Button
                    type="submit"
                    className={classes.button}
                >
                    Odeslat
                </Button>

                </Group>
            </form>
        </>
    )
}

export default LoginForm