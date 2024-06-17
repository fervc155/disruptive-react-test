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
import CardContent from './components/cardContent';
import ContentModel from './content.model';
import ContentService from './content.service';

export default function Home() {
  const [contents, setContents] = useState<ContentModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  useEffect(() => {

    ContentService.mine().then(setContents).catch(()=>{})
    
    setContents([]);
  }, []);



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
        <Row>
          <Col md="12">
            <h2>Mis contenidos</h2>
            <p>+{contents.length} contenidos disponibles</p>
          </Col>
        </Row>
        <Row className="mt-5">
          {contents.map((content:ContentModel) => (
            <Col md="4" key={content._id}>
              <CardContent content={content} onDelete={()=>deleteContent(content)}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
