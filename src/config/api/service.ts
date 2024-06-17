import { AxiosInstance } from 'axios';
import { authAxios, authAxiosMedia } from './axios';

class ApiService<T> {
    protected axiosInstance: AxiosInstance;
    protected authAxiosMedia: AxiosInstance;
    protected endpoint: string;

    constructor(endpoint: string, axiosInstance: AxiosInstance = authAxios) {
        this.endpoint = endpoint;
        this.axiosInstance = axiosInstance;
        this.authAxiosMedia = authAxiosMedia;
    }

    get(params: Record<string, any> = {}): Promise<T[]> {
        return this.axiosInstance.get(this.endpoint, { params })
            .then(response => response.data);
    }

    show(id: string | number): Promise<T> {
        return this.axiosInstance.get(`${this.endpoint}/${id}`)
            .then(response => response.data);
    }

    save(data: Record<string, any>): Promise<T> {
        let newData={} as any;
        for(let k in data){
            if(data[k]!=''){
                newData[k]=data[k]
            }
        }
        return this.axiosInstance.post(this.endpoint, newData)
            .then(response => response.data);
    }

    search(data: any):Promise<T[]>{
       return this.axiosInstance.get(`${this.endpoint}/search`, {params:data})
        .then(response=>response.data)
    }
    saveFile(data: Record<string, any>): Promise<T> {

        let formData =  data;
         
        formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        return this.authAxiosMedia.post(this.endpoint, formData)
            .then(response => response.data);
    }

    delete(id: string | number): Promise<void> {
        return this.axiosInstance.delete(`${this.endpoint}/${id}`)
            .then(response => response.data);
    }
}

export default ApiService;
