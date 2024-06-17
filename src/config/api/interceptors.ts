import { toast } from 'react-toastify';
import Token from './token';

interface ErrorResponse {
    response?: {
        status: number;
        data?: {
            message?: string;
            errors?: any;
        };
    };
}

class Interceptors {
    error = (error: ErrorResponse): any => {

        const response = error.response;

        
        if (!response) {
            toast.error('Error desconocido, contacte al administrador', { theme: "dark" });
            return Promise.reject({ message: 'Error desconocido' });
        }


        switch (response.status) {
            case 400:
                if (response.data?.errors) {
                    for (let apiError of response.data?.errors) {
                            toast.error(apiError.msg, { theme: "dark" });                   
                    }
                }
                break;
            case 401:
            case 402:
            case 403:
                if (response.data?.message) {
                    toast.error(response.data?.message, { theme: "dark" });
                }
                break;
            case 404:
                toast.error('El recurso solicitado no existe', { theme: "dark" });
                break;
            case 419:
                if (response.data?.message) {
                    toast.error(response.data?.message, { theme: "dark" });
                }
                Token.destroy();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                break;
            case 500:
            default:
                toast.error('Error de servidor, contacte al administrador', { theme: "dark" });
                break;
        }


        return Promise.reject({
            status: response.status,
            message: response.data?.message || 'Error de servidor',
            errors: response.data?.errors || null,
        });


    };
}

export default new Interceptors();
