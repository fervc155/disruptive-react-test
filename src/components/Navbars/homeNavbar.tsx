import React, {useEffect, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import classnames from "classnames";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import LoginService from '../../pages/auth/login/login.service';
import Token from '../../config/api/token';

function ExamplesNavbar() {
  const [navbarCollapse, setNavbarCollapse] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const navigate= useNavigate();

  useEffect(() => {
    const login = Token.check();
    if (login) {
      setRole(login?.role);
    }
  }, []);

  const logout = () => {
    LoginService.logout();
  }


  const login = () => {
    navigate('/login')
  }
  useEffect(() => {
    const updateNavbarColor = () => {
      if (document.documentElement.scrollTop > 299 || document.body.scrollTop > 299) {
      } else if (document.documentElement.scrollTop < 300 || document.body.scrollTop < 300) {
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, []);

  return (
    <Navbar className={"bg-dark mb-5"} color-on-scroll="300" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/home"
            title="Coded by Creative Tim"
            tag={Link}
          >
            Exporar contenidos
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse className="justify-content-end" navbar isOpen={navbarCollapse}>

          <Nav navbar>
            
              <NavItem>
                <NavLink to="/tematicas" tag={Link}>
                  <i className="nc-icon nc-tile-56" /> Tematicas
                </NavLink>
              </NavItem>
            

            {['creator', 'admin'].includes(role) && (
              <NavItem>
                <NavLink to="/mis-contenidos" tag={Link}>
                  <i className="nc-icon nc-album-2" /> Mis contenidos
                </NavLink>
              </NavItem>
            )}

  {['admin'].includes(role) && (
                    
             <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        caret
                        color="default"
                        data-toggle="dropdown"
                        href="#pablo"
                        id="dropdownMenuButton"
                        nav
                        onClick={(e) => e.preventDefault()}
                        role="button"
                      >
                        ADMINISTRAR
                      </DropdownToggle>
                      <DropdownMenu
                        aria-labelledby="dropdownMenuButton"
                        className="dropdown-info"
                      >

                      <>
                       <DropdownItem to="/administrar/categorias" tag={Link}>
                            <i className="nc-icon nc-button-play" /> Categorias
                          </DropdownItem>
                          <DropdownItem to="/administrar/tematicas" tag={Link}>
                            <i className="nc-icon nc-tile-56" /> Tematicas
                          </DropdownItem>
                          <DropdownItem to="/administrar/usuarios" tag={Link}>
                            <i className="nc-icon nc-single-02" /> Usuarios
                          </DropdownItem>
                      
                      </>

                </DropdownMenu>
              </UncontrolledDropdown>
               )}
  
            
            {['creator', 'admin'].includes(role) && (
              <NavItem>
                <NavLink className="btn btn-round bg-dark color-white" to="/crear" tag={Link}>
                  <i className="nc-icon nc-simple-add"></i> <span className="text-white">Crear contenido</span>
                </NavLink>
              </NavItem>
            )}


            {role=='' ? (
              <NavItem>
              <Button onClick={login} className="btn btn-round btn-primary color-white" to="/login" tag={Link}>
                <i className="nc-icon nc-single-02"></i> <span className="text-white">Inicia sesion</span>
              </Button>
              </NavItem>
              ):(

            <NavItem>
              <Button onClick={logout} className="btn btn-round bg-danger color-white" to="/login" tag={Link}>
                <i className="nc-icon nc-simple-remove"></i> <span className="text-white">Cerrar sesión</span>
              </Button>

            </NavItem>
              )

          }
            
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default ExamplesNavbar;
