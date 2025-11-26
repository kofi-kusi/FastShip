import { Api } from "Api"

const api = new Api({
    baseURL: "http://127.0.0.1:8000",
    securityWorker: (token) => {
        if (token) {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        } else {
            return {}
        }
    }
})

export default api;