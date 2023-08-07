import Axios from "axios";
import { BASE_URL } from "@src/config"
import { Modal, message } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

const axios = Axios.create({
    baseURL: BASE_URL
})


axios.interceptors.response.use(
    (res) => res,
    (err) => {
        const errorMessage = err.ree || err.message
        if (errorMessage === "Request failed with status code 401" || errorMessage === "Network Error") {
            Modal.confirm({
                title: "Session Expired",
                content: "Your session has expired. Please log in again.",
                onOk: () => {
                    removeAxiosToken();
                    { window.location.href = "/auth/signup" }
                },
                onCancel: () => {

                },
            });

        }
        message.error(errorMessage)
        Promise.reject(errorMessage)
    }
)

export const setaxiostoken = (token: string) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`
}

export const removeAxiosToken = () => {
    axios.defaults.headers.Authorization = null
}

export default axios