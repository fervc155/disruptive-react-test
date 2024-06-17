import ApiService from '../../../config/api/service';
import ThemeModel from './theme.model';

class ThemeService extends ApiService<ThemeModel> {
    constructor() {
        super('/themes');
    }
    
}

export default new ThemeService();
