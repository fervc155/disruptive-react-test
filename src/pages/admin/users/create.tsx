import React,{ useState} from 'react';
import UserModel from './user.model';
import {toast} from 'react-toastify';
import UserService from './user.service';

import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  FormGroup, Label
} from "reactstrap";
import RoleSelect from '../../../components/select/roleSelect';




export default function Create(){


const [newUser, setNewUser] = useState<any>(new UserModel);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const createUser = ()=>{

    for(let k in newUser) {

      if(k=='_id') continue;
      let key = newUser[k] as string;


      if(key.trim()=='') {
        return toast.error(k+' Es requerido', { theme: "dark" });
      }
    }

    UserService.save(newUser).then(()=>{
      setNewUser(new UserModel)
      toast.success('Usuario creado correctamente', {theme:"dark"})
    }).catch(()=>{})

  }



          

	return (<>

		<Row className="align-items-end">

		<Col md="6">
        <FormGroup>
          <Label for="name">Username:</Label>
          <Input
            type="text"
            name="username"
            id="name"
            value={newUser.username}
            onChange={handleInputChange}
          />
        </FormGroup>
        </Col>

    <Col md="6">
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="text"
            name="email"
            id="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </FormGroup>
        </Col>

    <Col md="6">
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
        </FormGroup>
        </Col>

        <Col md="6">
        <RoleSelect   full={true} onChange={handleInputChange}/>
        </Col>

        </Row>
        <Button color="primary"  onClick={createUser} className="btn-round mr-1" >Crear usuario</Button>
   
	</>
	)
}