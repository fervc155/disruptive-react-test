import ApiService from '../../../config/api/service';
import axios from '../../../config/api/axios';
import Token from '../../../config/api/token';

class RegisterService extends ApiService<any> {
    constructor() {
        super('/register', axios);
    }


    register(data:any){
        return this.save(data).then((res:any)=>{
            Token.set(res.token);
            return res;
        })
    }

    
}

export default new RegisterService();
