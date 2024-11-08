import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase-client";
import { showNotification } from "@mantine/notifications";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (!error) {
        showNotification({
            title: "PŘIHLÁŠENÍ",
            message: "Přihlášení proběhlo úspěšně.",
            color: "lightGreen",
            position: "top-center"
        })
    } else {
        showNotification({
            title: "CHYBA PŘIHLÁŠENÍ",
            message: "Zadaný e-mail nebo heslo jsou chybné.",
            color: "red",
            position: "top-center"
        })
    }
}
const logout = async () => {
    const { error: errorLogout } = await supabase.auth.signOut()
    
    if (!errorLogout) {
        showNotification({
            title: "ODHLÁŠENÍ PROBĚHLO ÚSPĚŠNĚ",
            message: "Byli jste úspěšně odhlášení.",
            color: "lightGreen",
            position: "top-center"
        })
    } else {
        showNotification({
            title: "CHYBA ODHLÁŠENÍ",
            message: "Při odhlášení došlo k chybě.",
            color: "red",
            position: "top-center"
        })
    }
    
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(
        () => {
            const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN') {
                    setIsAuth(true)
                    setUser(session.user)
                }
                if (event === 'SIGNED_OUT') {
                    setIsAuth(false)
                    setUser(null)
                }
            })

            return () => {
                authListener.subscription.unsubscribe()
            }
        },
        []
    )

    return (
        <AuthContext.Provider value={{
            user,
            isAuth,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;