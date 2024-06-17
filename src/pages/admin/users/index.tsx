import React, { useState, useEffect } from 'react';
import HomeNav from '../../../components/Navbars/homeNavbar'
import CreateUser from './create';
import UserModel from './user.model';
import UserService from './user.service';

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
  const [users, setUsers] = useState<UserModel[]>([]);
  const [activeTab, setActiveTab] = useState('1');


  useEffect(()=>{

    UserService.get().then(setUsers).catch(()=>{})
  },[])

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleDeleteUser = (user: UserModel) => {

    UserService.delete(user._id!).then((res)=>{
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u._id !== user._id)
      )
    }).catch(()=>{})
    return console.log(user)
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
              <i className="nc-icon nc-tile-56" /> Usuarios
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => toggleTab('2')}
            >
              <i className="nc-icon nc-simple-add" /> Crear usuario
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    
                    <td>
                      <Button color="danger"  className="btn-round mr-1" onClick={() => handleDeleteUser(user)}> <i className="nc-icon nc-simple-remove" /> Borrar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPane>
          <TabPane tabId="2">
            <CreateUser />
          </TabPane>
        </TabContent>
      </Container>
    </div>
  );
}
