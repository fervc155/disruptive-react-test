import React, { useState, useRef } from 'react';
import { CreateThemeModel } from './theme.model';
import { toast } from 'react-toastify';
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
  FormGroup, 
  Label
} from "reactstrap";
import ThemeService from './theme.service';

export default function Create() {
  const [newTheme, setNewTheme] = useState<CreateThemeModel>(new CreateThemeModel);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<any>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTheme((prevTheme:any) => ({
      ...prevTheme,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewTheme((prevTheme:any) => ({
      ...prevTheme,
      [name]: checked,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };



  const handleButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };


  const handleAddTheme = () => {
    if (newTheme.name.trim() === '') {
      return toast.error('Name Es requerido', { theme: "dark" });
    }

  


    ThemeService.saveFile({
      ...newTheme,
      file:imageFile
    }).then(() => {
      setNewTheme(new CreateThemeModel);
      setImageFile(null);
      toast.success("Categoria guardada correctamente", { theme: "dark" });
    }).catch(() => {});
  };

  return (
    <>
      <Row className="align-items-end">
        <Col md="6">
          <FormGroup>
            <Label for="name">Nombre:</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={newTheme.name}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="images"
                checked={newTheme.images}
                onChange={handleCheckboxChange}
              />
              Images <span className="form-check-sign" />
            </Label>
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="videos"
                checked={newTheme.videos}
                onChange={handleCheckboxChange}
              />
              Videos <span className="form-check-sign" />
            </Label>
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="text"
                checked={newTheme.text}
                onChange={handleCheckboxChange}
              />
              Text <span className="form-check-sign" />
            </Label>
          </FormGroup>
        </Col>
          <Col md="6">
            <FormGroup>
            <Label for="imageFile" className="file-upload-label">Subir Imagen:</Label>
            <div className="custom-file-upload">
            <Button color="primary" className="btn-upload" onClick={handleButtonClick}>
              Seleccionar Archivo
            </Button>
            <Input
              hidden
              type="file"
              name="imageFile"
              id="imageFile"
              onChange={handleFileChange}
              innerRef={fileInputRef} 
            />
              {imageFile && <span className="file-name ml-5">{imageFile.name}</span>}
            </div>
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary" className="btn-round mr-1" onClick={handleAddTheme}>
        Crear tematica
      </Button>
    </>
  );
}
