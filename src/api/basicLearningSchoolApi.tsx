import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
// const baseURL = 'http://172.31.16.1:5000/api';
// const baseURL = 'http://192.168.100.40:5000/api'
const baseURL = 'http://192.168.100.34:5000/api';
const basicLearningSchoolApi = axios.create({baseURL});
//Middleware para interceptar las solicitudes
basicLearningSchoolApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            
            (config as any).headers['x-access-token']  = token;
        }
        return config;
    }
)

export default basicLearningSchoolApi;