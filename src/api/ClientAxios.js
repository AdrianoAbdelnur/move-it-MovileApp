import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const clientAxios = axios.create(
    {
        baseURL: "https://move-it-backend-3.onrender.com/api",
     /*    timeout: 20000, */
        headers: {
            "Content-Type": "application/json",
            /* "Access-Control-Allow-Origin" : "*" */
        }
    }
)

clientAxios.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("jwtoken")
    config.headers.Authorization = token ?? ""
    return config
}
)

clientAxios.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if(error.response.status === 401 ) {
           await AsyncStorage.removeItem("jwtoken")
        }
        return Promise.reject(error)
    }
)