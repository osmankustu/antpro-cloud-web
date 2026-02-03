import axios from 'axios'
import { setupRequestInterceptor } from '../interceptors/requestInterceptor';
import { setupResponseInterceptor } from '../interceptors/responseInterceptor';

const axiosClient = axios.create({
baseURL:`${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}`,
withCredentials:true,
timeout:10000,
headers:{"Accept-Language": "tr" }
})


setupRequestInterceptor(axiosClient);
setupResponseInterceptor(axiosClient);

export default axiosClient;