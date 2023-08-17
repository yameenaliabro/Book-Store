import { DashboardLayout, MainLayout } from '@src/layouts'
import '@src/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ConfigProvider } from "antd"
import { AuthProvider, CartProvider } from '@src/context'
import { ReactQueryClient } from '@src/services'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()

  if (asPath.includes("dashboard")) {
    return (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    )
  }

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default function App(props: AppProps) {
  return (
    <ConfigProvider componentSize='large' >
      <ReactQueryClient>
        <CartProvider>
          <AuthProvider>
            <ReactQueryDevtools />
            <MyApp {...props} />
          </AuthProvider>
        </CartProvider>
      </ReactQueryClient>
    </ConfigProvider>

  )
}
