import Axios from "axios"
import { message } from "antd"
const baseURL = "http://localhost:2000"

const axios = Axios.create({
    baseURL: baseURL
})

axios.interceptors.response.use(
    (res) => res,
    (err) => {
        const erroMessage = err.response.data.message || err.message
        message.error(erroMessage)
        Promise.reject(erroMessage)
    }
)

export const setaxiostoken = (token: string) => {
    axios.defaults.headers.Autharization = `bearer ${token}`
}

export const removeaxiostoken = () => {
    axios.defaults.headers.Autharization = null
} 
