import React, { useState, useEffect, useRef} from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap';
import HomeNav from '../../components/Navbars/homeNavbar'
import ThemeService from '../admin/themes/theme.service';
import ContentService from './content.service';
import CategoryService from '../admin/categories/category.service';
import ThemeModel from '../admin/themes/theme.model';
import {CreateContentModel} from './content.model'
import CategoryModel from '../admin/categories/category.model'
import {toast} from 'react-toastify';

export default function CreateContent() {
  const [formData, setFormData] = useState<CreateContentModel>(new CreateContentModel);
  const [themeSelected, setThemeSelected]= useState<any>({});
  const [themes, setThemes] = useState<ThemeModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<any>(null);

  useEffect(()=>{

    ThemeService.get().then(setThemes).catch(()=>{})
    CategoryService.get().then(setCategories).catch(()=>{})

  },[])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };



  const handleButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if(name=='theme'){

      const theme = themes.find(cat => cat._id === value);
      setThemeSelected(theme)

    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.title || !formData.theme || !formData.type) {
      toast.error('Por favor completa todos los campos obligatorios.', {theme:"dark"});
      return;
    }
   
    const theme = themes.find(cat => cat._id === formData.theme);
   
    console.log('categoria', theme);
    if (!theme) {
      toast.error('La categoría seleccionada no es válida.', {theme:"dark"});
      return;
    }
    if (formData.type === 'images' && !theme.permissions.images) {
      toast.error('La categoría seleccionada no permite imágenes.', {theme:"dark"});
      return;
    }
    if (formData.type === 'videos' && !theme.permissions.videos) {
      toast.error('La categoría seleccionada no permite videos.', {theme:"dark"});
      return;
    }
    if (formData.type === 'text' && !theme.permissions.text) {
      toast.error('La categoría seleccionada no permite texto.', {theme:"dark"});
      return;
    }


    ContentService.saveFile({
      ...formData,
      file
  }).then(()=>{

      setFormData(new CreateContentModel)
      toast.success('Contenido creado correctamente', {theme:"dark"})
    }).catch(()=>{})
   
   
  };

  return (
    <>

      <HomeNav />
    <Container>
      <Row>
        <Col md="8">
          <h2>Crear Contenido</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Título *</Label>
              <Input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="theme">Tematica *</Label>
              <Input type="select" name="theme" id="theme" value={formData.theme} onChange={handleChange} required>
                <option value="">Seleccionar Tematica</option>
                
                {themes.map((c)=><option value={c._id}>{c.name}</option>)}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="theme">Categoria *</Label>
              <Input type="select" name="category" id="category" value={formData.category} onChange={handleChange} required>
                <option value="">Seleccionar categoria</option>
                
                {categories.map((c)=><option value={c._id}>{c.name}</option>)}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="type">Tipo de Contenido *</Label>
              <Input type="select" name="type" id="type" value={formData.type} onChange={handleChange} required>
                <option value="">Seleccionar Tipo de Contenido</option>
               {themeSelected?.permissions?.images && <option value="images">Imagen</option>}
                {themeSelected?.permissions?.videos && <option value="videos">Video</option>}
                {themeSelected?.permissions?.text && <option value="text">Texto</option>}
              </Input>
            </FormGroup>
            {formData.type != 'text' && formData.type!='' &&(

              <FormGroup>
            <Label for="file" className="file-upload-label">Subir archivo:</Label>
            <div className="custom-file-upload">
            <Button color="primary" className="btn-upload" onClick={handleButtonClick}>
              Seleccionar Archivo
            </Button>
            <Input
              hidden
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              innerRef={fileInputRef}
            />
              {file && <span className="file-name ml-5">{file.name}</span>}
            </div>
          </FormGroup>
            )}
           
            {formData.type === 'text' && (
              <FormGroup>
                <Label for="text">Texto</Label>
                <Input type="textarea" name="text" id="text" value={formData.text} onChange={handleChange} />
              </FormGroup>
            )}
            <Button className="btn-round" onClick={handleSubmit} color="primary">Crear Contenido</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
}

