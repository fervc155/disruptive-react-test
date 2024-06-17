import ApiService from '../../../config/api/service';
import CategoryModel from './category.model';

class CategoryService extends ApiService<CategoryModel> {
    constructor() {
        super('/categories');
    }
    
}

export default new CategoryService();
