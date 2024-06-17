import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Home from '../pages/home';
import Themes from '../pages/home/themes';
import ThemesShow from '../pages/home/themes/show';
import ShowContent from '../pages/content/show';


  
export const guestRoutes = [
    { path: '/home', Component: Home },
    { path: '/login', Component: Login },
    { path: '/register', Component: Register },
    { path: '/tematicas', Component: Themes },
    { path: '/tematicas/:id', Component: ThemesShow},
    { path: '/contenido/:id', Component: ShowContent }

];
