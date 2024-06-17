import ApiService from '../../../config/api/service';
import UserModel from './user.model';

class UserService extends ApiService<UserModel> {
    constructor() {
        super('/users');
    }
    
}

export default new UserService();
