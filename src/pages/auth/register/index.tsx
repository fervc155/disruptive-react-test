
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import  RegisterModel  from './register.model';
import { ChangeEvent } from 'react';
import RoleSelect from '../../../components/select/roleSelect';
import { toast } from 'react-toastify';
import RegisterService from './register.service';

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
} from "reactstrap";




function Register() {

  const [registerData, setRegisterData] = useState<any>(new RegisterModel())
  const navigate = useNavigate();


  const gotoLogin=(e:any) =>{
    e.preventDefault()
    navigate('/login')
  }


  const onChangeInputHandler=(  e: ChangeEvent<HTMLInputElement>, key:string)=>{
    setRegisterData({
      ...registerData,
      [key]:e.target.value
    })
  }


  const registerSubmit=()=>{


    for(let k in registerData) {

      let key = registerData[k] as string;

      if(key.trim()=='') {
        return toast.error(k+' Es requerido', { theme: "dark" });
      }
    }

    RegisterService.register(registerData).then(()=>{
      toast.success("Usuario creado correctamente", {theme:"dark"})
      window.location.href=('/home')
    }).catch(()=>{});

  }

  return (
    <>
      <div
        className="section section-image vh-100 align-items-center d-flex"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")",
        }}
      >
        <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
                <h3 className="title mx-auto">Crea tu usuario</h3>
              
                <Form className="register-form">
                  <label>Username</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Username" type="text" onChange={(e)=>onChangeInputHandler(e, 'username')} />
                  </InputGroup>

                  <label>Email</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" onChange={(e)=>onChangeInputHandler(e, 'email')} />
                  </InputGroup>
                  <label>Contraseña</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Contraseña" type="password" onChange={(e)=>onChangeInputHandler(e, 'password')} />
                  </InputGroup>
                  <RoleSelect  onChange={onChangeInputHandler} />
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    onClick={registerSubmit}
                  >
                    Registrarse
                  </Button>
                </Form>

              </Card>
              <div className="col text-center">
                <Button
                  className="btn-round"
                  outline
                  color="neutral"
                  href="/register-page"
                  size="lg"
                  target="_blank"
                  onClick={gotoLogin}
                >
                  Ya tienes cuenta? inicia sesión
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default Register;
