import React, { useState, useContext } from "react";
import StoreContext from '../../Store/Context'
import  {withRouter} from 'react-router-dom'

import { Form, Button } from 'react-bootstrap';
import './style.css';

import api from "../../services/api";
// import axios from "axios";


function Login({ history }){
  const [values, SetValues] = useState({
    usuario:'',
    senha:''
  });
  const { setToken } = useContext(StoreContext);

  function onChange(e){
    const newValues={...values};
    newValues[e.target.name]=e.target.value;
    SetValues(newValues);
    console.log(newValues);
  }

  function onSubmit(e){
    e.preventDefault();
    api
    .post("autenticacao", values)
    .then(res => {
      setToken(res.data.token);
      history.push('/app');
    })
    .catch((err) => {
      SetValues(values);
      console.error("ops! ocorreu um erro" + err);

    });
  };

  return (
    <div className="login-screen">
      <Form onSubmit={onSubmit}>
        <Form.Group >
          <Form.Label className="label">Usuário</Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            placeholder="Digite seu usuário aqui"
            onChange={(e)=>onChange(e)}
            value={values.usuario}
            name="usuario"
            required
          />
        </Form.Group>

        <Form.Group >
          <Form.Label  className="label">Senha</Form.Label>
          <Form.Control
            className="form-input"
            type="password"
            placeholder="Digite sua senha aqui"
            onChange={onChange}
            value={values.senha}
            name="senha"
            required/>
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Login
        </Button>
      </Form>
    </div>
  );

}
export default withRouter(Login);

