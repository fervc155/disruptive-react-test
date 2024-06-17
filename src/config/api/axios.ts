import axios from 'axios';
import Token from './token';
import interceptors from './interceptors';
export const clienteAxios = axios.create({
    baseURL :  process.env.REACT_APP_BACK_API,
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    }
});

const authAxios= axios.create({
    baseURL : process.env.REACT_APP_BACK_API,
    headers: {
        "Content-type": "application/x-www-form-urlencoded"
    }
});
const authAxiosMedia= axios.create({
    baseURL : process.env.REACT_APP_BACK_API,
    headers: {
      "Content-type": "multipart/form-data"
    }
});

authAxios.defaults.headers.common['Authorization'] ='Bearer '+ Token.get() ;
authAxiosMedia.defaults.headers.common['Authorization'] ='Bearer '+ Token.get() ;



authAxios.interceptors.response.use((response) => response, interceptors.error);
clienteAxios.interceptors.response.use((response) => response, interceptors.error);
authAxiosMedia.interceptors.response.use((response) => response, interceptors.error);



export {
    authAxios,
    authAxiosMedia,
};
export default clienteAxios;
