import React, { useState, useContext } from 'react';
import  { useHistory } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';
import './style.css';

import api from '../../services/api';
import StoreContext from '../../Store/Context';

export default function Login(){
  const history = useHistory();
  const { setToken } = useContext(StoreContext);
  const [loginValues, setLoginValues] = useState({
    usuario:'',
    senha:''
  });
  const [loginError, setLoginError] = useState(false);

  //pick login values
  function onChange(e){
    const newValues={...loginValues};
    newValues[e.target.name]=e.target.value;
    setLoginValues(newValues);
    setLoginError(false);
  }

  function ErrorComponent(){
    return <span className="span-error">Usuário inexistente ou Senha incorreta</span>
  }

  function onSubmit(e){
    e.preventDefault();
    api
    .post("autenticacao", loginValues)
    .then(res => {
      setToken(res.data.token);
      history.push('/app');
    })
    .catch((err) => {
      setLoginValues(loginValues);
      setLoginError(true);
      console.error("ops! ocorreu um erro" + err);
    });
  };

  return (
    <div className="login-screen">
      <Form
        onSubmit={onSubmit}
        className="form-login"  
      >
        <Form.Group >
          <Form.Label className="label">Usuário</Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            placeholder="Digite seu usuário aqui"
            onChange={(e)=>onChange(e)}
            value={loginValues.usuario}
            name="usuario"
            size="lg"
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
            size="lg"
            required/>
        {loginError && <ErrorComponent/>}
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Login
        </Button>
      </Form>
    </div>
  );
}

