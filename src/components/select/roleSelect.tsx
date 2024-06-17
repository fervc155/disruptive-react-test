import React, { ChangeEvent } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label } from 'reactstrap';

interface RoleSelectProps {
  onChange: (e: ChangeEvent<HTMLInputElement>, key: string) => void,
  full?:boolean
}

export default function RoleSelect ({ full=false, onChange }: RoleSelectProps) {
  return (
    <>
      <label >Seleccionar Rol</label>
      <InputGroup className="form-group-no-border">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="nc-icon nc-badge" />
          </InputGroupText>
        </InputGroupAddon>
        <Input type="select" name="role" id="roleSelect" onChange={(e)=>onChange(e,'role')}>
          <option value="">Selecciona un rol</option>
          <option value="creator">Creador</option>
          <option value="reader">Lector</option>
          {full &&<option value="admin">Admin</option>}

        </Input>
      </InputGroup>
    </>
  );
};
