import { Splash } from "@src/compoenents"
import { firebaseAuth } from "@src/services"
import { AuthContext, LoginProps, SignUpProps } from "@src/types/auth"
import { removeAxiosToken, setaxiostoken } from "@src/utils/axios"
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
} from "firebase/auth"
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react"

const AuthContextProvider = createContext<AuthContext | null>(null)

function AuthProvider({ children }: { children: ReactNode }) {
    const [loading, setloading] = useState(true)
    const [user, setuser] = useState<User | null>(null)
    const [istoken, settoken] = useState<string | null>(null)
    const [isAuthenticated, setisAuthenticated] = useState(false)

    const login = useCallback(async ({ email, password }: LoginProps) => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password)
        } catch (error) {
            console.log("🚀 ~ file: AuthContext.tsx:12 ~ login ~ error:", error)
        }
    }, [])

    const signup = useCallback(async ({ email, password, username, image }: SignUpProps) => {
        try {
            const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            updateProfile(user, {
                displayName: username,
                photoURL: image
            })

        } catch (error) {
        }
    }, [])

    const signout = useCallback(async () => {
        try {
            await signOut(firebaseAuth)

        } catch (error) {
            console.log(error)

        }
    }, [])

    const checkAuth = useCallback(() => {
        onAuthStateChanged(firebaseAuth, async (_user) => {
            setloading(true)
            setuser(_user)
            setisAuthenticated(!!_user)
            if (_user) {
                const token = await user?.getIdToken()
                if (token) {
                    setaxiostoken(token)
                }
                settoken(token!)
            }
            else {
                settoken(null)
                removeAxiosToken()
            }
            setloading(false)

        })
    }, [user])

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    const value = useMemo(() => ({
        login,
        signup,
        signout,
        isAuthenticated,
        user,
    }), [
        login,
        signup,
        signout,
        isAuthenticated,
        user,
    ])

    return (
        <div>
            <AuthContextProvider.Provider value={value}>
                {loading ? <Splash /> : children}
            </AuthContextProvider.Provider>

        </div>
    )
}
export { AuthContextProvider, AuthProvider }