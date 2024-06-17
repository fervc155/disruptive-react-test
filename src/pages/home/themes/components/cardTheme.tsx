import React, {useState, useEffect} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Token from '../../../../config/api/token';
import {useNavigate} from 'react-router-dom';
import moment from 'moment'; 

interface Props {
  theme: any;
}

export default function CardComponent({ theme }: Props) {

  const navigate = useNavigate();

  const gotoContent = () => {
    navigate('/tematicas/' + theme._id);
  }

  const uploadDomain = process.env.REACT_APP_BACK_UPLOADS;



  const fullUrl = `${uploadDomain}/${theme.url}`;


  return (
    <Card>
     
        <img src={fullUrl} alt={theme.title} />
     
      <CardBody>
       
        <CardTitle style={{ cursor: 'pointer' }} onClick={gotoContent}>
          <b className="lead font-weight-bold ">{theme.name}</b>
        </CardTitle>
       
     
     
      </CardBody>
    </Card>
  );
}
