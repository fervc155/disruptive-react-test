import React, { useState, useEffect} from 'react';
import HomeNav from '../../../components/Navbars/homeNavbar'
import CreateTheme from './create';
import ThemeModel from './theme.model';
import {toast} from 'react-toastify';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button,
  Table,
  TabContent,
  TabPane,
} from 'reactstrap';


import ThemeService from './theme.service';

export default function Themes(){
  const [themes, setThemes] = useState<ThemeModel[]>([]);
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };


  useEffect(()=>{
    ThemeService.get().then(setThemes).catch(()=>{})
  },[])

  const handleDeleteTheme = (c: ThemeModel) => {
   ThemeService.delete(c._id).then(()=>{
    toast.success('Tematica borrada correctamente', {theme:"dark"})
     setThemes((prevThemes) =>
      prevThemes.filter((theme) => theme._id !== c._id)
    );
   }).catch(()=>{})
  };


  const getUrl=(url:string)=>{
    return process.env.REACT_APP_BACK_UPLOADS+'/'+url;
  }

  return (
    <div>
      <HomeNav />
      <Container>
        <Nav tabs style={{ marginBottom: '20px' }}>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => toggleTab('1')}
            >
              <i className="nc-icon nc-tile-56" /> Tematicas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => toggleTab('2')}
            >
              <i className="nc-icon nc-simple-add" /> Crear Tematica
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Table>
              <thead>
                <tr>
                <th></th>
                  <th>Nombre</th>
                  <th>Images</th>
                  <th>Videos</th>
                  <th>Text</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {themes.map((theme) => (
                  <tr key={theme.name}>
                    <td><img height="50" src={getUrl(theme.url)}/></td>
                    <td>{theme.name}</td>
                    <td>{String(theme.permissions.images)}</td>
                    <td>{String(theme.permissions.videos)}</td>
                    <td>{String(theme.permissions.text)}</td>
                    <td>
                      <Button color="danger"  className="btn-round mr-1" onClick={() => handleDeleteTheme(theme)}> <i className="nc-icon nc-simple-remove" /> Borrar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="2">
            <CreateTheme />
          </TabPane>
        </TabContent>
      </Container>
    </div>
  );
}
