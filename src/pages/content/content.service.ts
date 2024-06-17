import ApiService from '../../config/api/service';
import ContentModel from './content.model';

class ContentService extends ApiService<ContentModel> {
    constructor() {
        super('/contents');
    }


    mine():Promise<ContentModel[]>{
       return this.axiosInstance.get('/contents/mine').then(response=>response.data)
    }

    
}

export default new ContentService();
