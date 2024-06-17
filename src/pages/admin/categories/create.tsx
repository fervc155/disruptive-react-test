import React,{ useState} from 'react';
import CategoryModel from './category.model';
import {toast} from 'react-toastify';
import CategoryService from './category.service';

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
  FormGroup, Label
} from "reactstrap";




export default function Create(){


const [newCategory, setNewCategory] = useState<any>(new CategoryModel);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const createCategory = ()=>{

    for(let k in newCategory) {

      if(k=='_id') continue;
      let key = newCategory[k] as string;


      if(key.trim()=='') {
        return toast.error(k+' Es requerido', { theme: "dark" });
      }
    }

    CategoryService.save(newCategory).then(()=>{
      setNewCategory(new CategoryModel)
      toast.success('Categoria creada correctamente', {theme:"dark"})
    }).catch(()=>{})

  }



          

	return (<>

		<Row className="align-items-end">

		<Col md="6">
        <FormGroup>
          <Label for="name">Nombre:</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={newCategory.name}
            onChange={handleInputChange}
          />
        </FormGroup>
        </Col>

      

        </Row>
        <Button color="primary"  onClick={createCategory} className="btn-round mr-1" >Crear categoria</Button>
   
	</>
	)
}