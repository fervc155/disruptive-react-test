import React, {useState, useEffect} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Token from '../../../config/api/token';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';

interface Props {
  content: any;
  onDelete?: () => void; 
}

export default function CardComponent({ content, onDelete = () => {} }: Props) {

  const [canDelete, setCanDelete] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    let auth = Token.check();

    if (auth) {
      setAuth(true);
      if (auth.role === 'admin') {
        setCanDelete(true);
      } else if (auth.userId === content.user._id) {
        setCanDelete(true);
      }
    }
  }, []);

  const gotoContent = () => {
    navigate('/contenido/' + content._id);
  }

  const uploadDomain = process.env.REACT_APP_BACK_UPLOADS;

  const renderIcon = () => {
    switch (content.type) {
      case 'images':
        return <i className="nc-icon nc-image" />;
      case 'text':
        return <i className="nc-icon nc-caps-small" />;
      case 'videos':
        return <i className="nc-icon nc-button-play" />;
      default:
        return null;
    }
  };

  const fullUrl = `${uploadDomain}/${content.url}`;

  const formattedDate = moment(content.createdAt).format('MMMM Do YYYY, h:mm:ss a'); 

  return (
    <Card>
      {content.type === 'videos' && auth && (
        <video controls>
          <source src={fullUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {content.type === 'images' && auth && (
        <img src={fullUrl} alt={content.title} />
      )}

      <CardBody>
        {!auth && content.url && <p>Contenido restringido</p>}

        <CardTitle style={{ cursor: 'pointer' }} onClick={gotoContent}>
          <b className="lead font-weight-bold ">{content.title}</b>
          <br/>
          <i className="nc-icon nc-calendar-60" /> {formattedDate}
        </CardTitle>
       
        <hr/>
        <CardSubtitle>
          <b>{renderIcon()} {content.category.name}</b> - <i className="nc-icon nc-single-02" /> Escrito por <b>{content.user?.username}</b>
        </CardSubtitle>
        <CardSubtitle>
          <b>  <i className="nc-icon nc-tile-56" /> {content.theme.name}</b>
        </CardSubtitle>



        {canDelete && (
          <Button
            className="btn-just-icon ml-auto mr-auto"
            color="danger"
            type="button"
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
            }}
            onClick={onDelete}
          >
            <i className="fa fa-trash" />
          </Button>
        )}
      </CardBody>
    </Card>
  );
}
