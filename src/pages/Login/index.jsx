import React, { useState, useContext, useEffect } from "react";
import StoreContext from '../../Store/Context'
import  {useHistory} from 'react-router-dom'

import { Form, Button } from 'react-bootstrap';
import './style.css';

import api from "../../services/api";
// import axios from "axios";


function Login(){
  const history = useHistory();
  const [loginValues, SetLoginValues] = useState({
    usuario:'',
    senha:''
  });
  const { setToken } = useContext(StoreContext);
  
  useEffect(()=>{
    setToken(null)
  }, []);

  function onChange(e){
    const newValues={...loginValues};
    newValues[e.target.name]=e.target.value;
    SetLoginValues(newValues);
  }

  function onSubmit(e){
    e.preventDefault();
    api
    .post("autenticacao", loginValues)
    .then(res => {
      setToken(res.data.token);
      console.log(res.data.token);
      history.push('/app');
    })
    .catch((err) => {
      SetLoginValues(loginValues);
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
            value={loginValues.usuario}
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
            value={loginValues.senha}
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
export default Login;

