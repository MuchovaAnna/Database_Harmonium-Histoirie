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

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [data, setData] = useState([])
    const [selectedHarmonium, setSelectedHarmonium] =useState(data)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3001/harmoniums')
            const jsonData = await response.json()
            setData(jsonData)
        }
        fetchData()
    }, [])

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
            logout,
            data,
            setData,
            selectedHarmonium,
            setSelectedHarmonium
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;