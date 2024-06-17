import React, { useState, useEffect } from 'react';
import HomeNav from '../../components/Navbars/homeNavbar';
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
import CardContent from '../content/components/cardContent';
import ContentModel from '../content/content.model';
import ContentService from '../content/content.service';

import ThemeModel from '../admin/themes/theme.model';
import ThemeService from '../admin/themes/theme.service';
import CounterContents from '../../components/counterContent';

export default function Home() {
  const [contents, setContents] = useState<ContentModel[]>([]);
  const [themes, setThemes] = useState<ThemeModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<any>(null);


  useEffect(() => {

    ContentService.get().then(setContents).catch(()=>{})
    ThemeService.get().then(setThemes).catch(()=>{})
 
  },[])

  const selectTheme=(selectedOption:any)=>{
    setSelectedTheme(selectedOption)
  }


  const onSearch=()=>{
   ContentService.search({
      s:searchTerm,
      theme:selectedTheme?.value||null
    }).then(setContents).catch(()=>{})

  }


  const deleteContent = (content:ContentModel)=>{

    ContentService.delete(content._id).then(()=>{
      let filterContents = contents.filter(c=>c._id!=content._id)
      setContents(filterContents)
    })

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
          <Col md="6" style={{ zIndex: 100 }}>
            <Select
              options={themes.map(theme => ({ value: theme._id, label: theme.name }))}
              value={selectedTheme}
              onChange={(selectedOption)=>selectTheme(selectedOption)}
              placeholder="Seleccionar Temática..."
              isClearable
              isSearchable
            />
          </Col>
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
