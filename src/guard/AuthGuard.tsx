import useAuth from "@src/hooks/useAuth"
import SignUpPage from "@src/pages/auth/signup"
import { ReactNode } from "react"
import { idText } from "typescript"

function AuthGuard({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        return (
            <SignUpPage />
        )

    }
    return children
}
export default AuthGuard