import React, { useState, useEffect } from 'react';
import HomeNav from '../../../components/Navbars/homeNavbar'
import CreateCategory from './create';
import CategoryModel from './category.model';
import CategoryService from './category.service';

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

export default function Themes(){
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [activeTab, setActiveTab] = useState('1');


  useEffect(()=>{

    CategoryService.get().then(setCategories).catch(()=>{})
  },[])

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleDeleteCategory = (category: CategoryModel) => {

    CategoryService.delete(category._id!).then((res)=>{
      setCategories((prevCategories) =>
        prevCategories.filter((u) => u._id !== category._id)
      )
    }).catch(()=>{})
    return console.log(category)
    ;
  };

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
              <i className="nc-icon nc-tile-56" /> Categorias
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => toggleTab('2')}
            >
              <i className="nc-icon nc-simple-add" /> Crear categoria
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.name}>
                    <td>{category.name}</td>
                    
                    <td>
                      <Button color="danger"  className="btn-round mr-1" onClick={() => handleDeleteCategory(category)}> <i className="nc-icon nc-simple-remove" /> Borrar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="2">
            <CreateCategory />
          </TabPane>
        </TabContent>
      </Container>
    </div>
  );
}
