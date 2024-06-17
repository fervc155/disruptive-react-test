import React, { useState, useEffect } from 'react';
import HomeNav from '../../../components/Navbars/homeNavbar';
import Select from 'react-select';
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import 'assets/css/paper-kit.css';
import CardContent from './components/cardTheme';
import ThemeModel from '../../admin/themes/theme.model';
import ThemeService from '../../admin/themes/theme.service';

export default function Home() {
  const [themes, setThemes] = useState<ThemeModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {

    ThemeService.get().then(setThemes).catch(()=>{})
 
  },[])


  const onSearch=()=>{
   ThemeService.search({
      s:searchTerm,
    }).then(setThemes).catch(()=>{})

  }



  return (
    <div>
      <HomeNav />

      <Container>
        <Row>
          <Col md="12">
            <h2>Tematicas disponibles</h2>
            <p>+{themes.length}  disponibles</p>
          </Col>
        </Row>
        <Row className="align-items-end">

          <Col md="6" style={{ zIndex: 1 }}>
            <InputGroup>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar tematica..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button onClick={onSearch} color="primary">Buscar</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-5">
          {themes.map(theme => (
            <Col md="4" key={theme._id}>
              <CardContent theme={theme} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
