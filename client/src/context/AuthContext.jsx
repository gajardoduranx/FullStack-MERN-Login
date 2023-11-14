import { useState, createContext, useContext } from 'react'
import { registerRequest } from '../api/auth'
// Contexto
export const AuthContext = createContext()
// Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
// Provider del contexto
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
    const signup = async (values) => {
        console.log(values)
        const res = await registerRequest(values)
        const newUser =  await res.data
        setUser(newUser)
    }
    console.log(user)
    return (
        <AuthContext.Provider value={{user, signup}}>
            {children}
        </AuthContext.Provider> 
    )
}