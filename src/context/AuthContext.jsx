import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase-client";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password })
}
const logout = async () => {
    return await supabase.auth.signOut()
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(
        () => {
            const { data } = supabase.auth.onAuthStateChange((event, session) => {
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
                data.subscription.unsubscribe()
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