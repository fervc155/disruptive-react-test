import Home from '../pages/home';
import AdminThemes from '../pages/admin/themes';
import AdminUsers from '../pages/admin/users';
import CreateContent from '../pages/content/create';
import MyContents from '../pages/content';
import ShowContent from '../pages/content/show';
import AdminCategories from '../pages/admin/categories';
import Themes from '../pages/home/themes';
import ThemesShow from '../pages/home/themes/show';


export const loggedRoutes = [
    { path: '/home', Component: Home },
    { path: '/administrar/tematicas', Component: AdminThemes },
    { path: '/administrar/usuarios', Component: AdminUsers },
    { path: '/crear', Component: CreateContent },
    { path: '/mis-contenidos', Component: MyContents },
    { path: '/contenido/:id', Component: ShowContent },
    { path: '/administrar/categorias', Component: AdminCategories },
    { path: '/tematicas', Component: Themes },
    { path: '/tematicas/:id', Component: ThemesShow},

];
