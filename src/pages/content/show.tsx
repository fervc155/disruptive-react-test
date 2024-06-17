import React, {useState, useEffect} from 'react';
import { Card, Container, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Token from '../../config/api/token';
import ContentModel from './content.model';
import ContentService from './content.service';
import { useParams } from 'react-router-dom';
import HomeNav from '../../components/Navbars/homeNavbar';

import moment from 'moment'; 


     


export default function CardComponent() {


  const [auth, setAuth] = useState<boolean>(false);

  let { id } = useParams();

  const [content,setContent] = useState<ContentModel>(new ContentModel);

  useEffect(()=>{

    let auth = Token.check()
    if(auth){
      setAuth(true);
    }
   
  },[])


  useEffect(()=>{

     id&& ContentService.show(id).then(setContent).catch(()=>{})
  },[id])

  const uploadDomain = process.env.REACT_APP_BACK_UPLOADS;

  const renderIcon = () => {
    switch (content.type) {
      case 'images':
        return <i className="nc-icon nc-image" />;
      case 'text':
        return <i className="nc-icon nc-caps-small" />;
      case 'videos':
        return <i className="nc-icon nc-button-play " />;
      default:
        return null;
    }
  };

  const fullUrl = `${uploadDomain}/${content.url}`;
 
  const formattedDate = moment(content.createdAt).format('MMMM Do YYYY, h:mm:ss a');

 
  
  return (
    <div>
     <HomeNav />

     <Container>
    <Card>
     
      <CardBody>
        <CardTitle>
        <b className="lead font-weight-bold ">{content.title}</b>
          <br/>
          <i className="nc-icon nc-calendar-60" /> {formattedDate}
        </CardTitle>
       
       <hr/>
        <CardSubtitle>
          <b>{renderIcon()} {content.category?.name}</b> 
          - <i className="nc-icon nc-single-02" /> Escrito por <b>{content.user?.username}</b>
          -  Tematica <b>  <i className="nc-icon nc-tile-56" /> {content.theme.name}</b>
        </CardSubtitle>
        <br/>
      
       {content.type === 'videos' && auth && (
        <video controls className="img-fluid">
          <source src={fullUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {content.type === 'images' && auth && (
        <img className="img-fluid" src={fullUrl} alt={content.title} />
      )}

      {!auth && (content.url) && <p>Contenido restringido</p>}


        {content.text?.length && <p>{content.text}</p>}

      </CardBody>
    </Card>
    </Container>
    </div>
  );
}
