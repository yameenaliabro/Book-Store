import { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
const ReactQueryClient = ({ children }: { children: ReactNode }) => {
    const queryclient = new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: true } }
    })
    return (
        <QueryClientProvider client={queryclient}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryClient