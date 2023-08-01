import { ReactNode } from "react"
import { MainTopBar } from "./components"
import { Layout } from "antd"

type MainLayoutPropos = {
    children: ReactNode
}

const { Content } = Layout

function MainLayout(props: MainLayoutPropos) {
    const { children } = props

    return (
        <Layout className="h-full">
            <MainTopBar />
            <Content>
                {children}
            </Content>
        </Layout>
    )

}

export default MainLayout