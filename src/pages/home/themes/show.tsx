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
import CardContent from '../../content/components/cardContent';
import ContentModel from '../../content/content.model';
import ContentService from '../../content/content.service';

import ThemeModel from '../../admin/themes/theme.model';
import ThemeService from '../../admin/themes/theme.service';
import CounterContents from '../../../components/counterContent';
import {useParams} from 'react-router-dom';


export default function Home() {
  const [contents, setContents] = useState<ContentModel[]>([]);
  const [theme, setTheme] = useState<ThemeModel>(new ThemeModel);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const {id} = useParams()

  useEffect(() => {

    id &&ThemeService.show(id)
      .then(setTheme)
      .then(onSearch).catch(()=>{})
 
  },[id])



  const onSearch=()=>{
   ContentService.search({
      s:searchTerm,
      theme:id|| ''
    }).then(setContents).catch(()=>{})

  }



  return (
    <div>
      <HomeNav />

      <Container>
      <CounterContents contents={contents}/>
        <Row>
          <Col md="12">
            <h2>Contenidos Disponibles</h2>
            <p>+{contents.length} contenidos disponibles</p>
          </Col>
        </Row>
        <Row className="align-items-end">
          <Col md="6" style={{ zIndex: 1 }}>
            <InputGroup>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre de contenido..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button onClick={onSearch} color="primary">Buscar</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-5">
          {contents.map(content => (
            <Col md="4" key={content._id}>
              <CardContent content={content} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
