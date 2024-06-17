import ApiService from '../../../config/api/service';
import axios from '../../../config/api/axios';
import Token from '../../../config/api/token';

class LoginService extends ApiService<any> {
    constructor() {
        super('/login', axios);
    }


    login(data:any){
        return this.save(data).then((res:any)=>{
            Token.set(res.token);
            return res;
        })
    }

    logout() {
        localStorage.clear();
        window.location.href='/home'
    }

    
}

export default new LoginService();
