
import React, {useState} from "react";
import LoginModel from './login.model';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import LoginService from './login.service';

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




function Login() {

  const [loginData, setLoginData] = useState<any>(new LoginModel())

  const navigate = useNavigate();
  const gotoRegister=(e:any) =>{
    e.preventDefault()
    return navigate('/register')
  }


  const onChangeInputHandler=(  e: ChangeEvent<HTMLInputElement>, key:string)=>{
    setLoginData({
      ...loginData,
      [key]:e.target.value
    })
  }


  const loginSubmit=()=>{


    for(let k in loginData) {

      let key = loginData[k] as string;

      if(key.trim()=='') {
        return toast.error(k+' Es requerido', { theme: "dark" });
      }
    }

    LoginService.login(loginData).then(()=>{
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
                <h3 className="title mx-auto">Iniciar sesión</h3>
              
                <Form className="register-form">
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
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    onClick={loginSubmit}
                  >
                    Entrar
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
                  onClick={gotoRegister}
                >
                  ¿No tienes cuenta? Registrate
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default Login;
