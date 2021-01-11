import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button, Col, Form } from 'react-bootstrap';
import './style.css';

import api from '../../services/api';
import StoreContext from '../../Store/Context';

export default function AddEditUser(){
  const history = useHistory();//helps navigate between end-points
  const {id} = useParams(); //pick id param from url
  const { token } = useContext(StoreContext);//pick token value from context
  const [newUser, SetNewUser] = useState({
    nome: "",
    usuario: "",
    email: "",
    senha: "",
    telefone: "" ,
    dataNascimento: "",
    sexo: "",
    idade: "",
    perfilId: 1,
  });
  
  //pick user values
  function onChange(e){
    const newValues={...newUser};
    newValues[e.target.name]=e.target.value;
    SetNewUser(newValues);
  }
  //header authetication
  var config = {
    headers: { 
      'Authorization': `Bearer ${token}` 
    }
  }
  
  async function pickUser(id){
    const response = await api.get(`usuarios/${id}`)
    SetNewUser(response.data)
  }
  useEffect(()=> {
    if (id !== undefined){
      pickUser(id)
    }
  },[]);

  function onSubmit(e){
    e.preventDefault();

    if (id !== undefined){
      api
      .put(`/usuarios/${id}`, newUser, config)
      .then(history.push('/app'));
    }else{
      api
      .post("/usuarios", newUser, config)
      .then(res => {
        history.push('/app');
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="container form-new"
    >
      <Form.Row >
        <Form.Group as={Col}>
          <Form.Label className="form-label">Nome</Form.Label>
          <Form.Control
            onChange={(e)=>onChange(e)}
            name="nome"
            value={newUser.nome}
            type="text"
            placeholder="digite seu nome completo"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            name="email"
            value={newUser.email}
            onChange={(e)=>onChange(e)}
            type="email"
            placeholder="seu@email.com"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label className="form-label">Telefone</Form.Label>
          <Form.Control
            name="telefone"
            value={newUser.telefone}
            onChange={(e)=>onChange(e)}
            type="number"
            placeholder="+55"
          />
        </Form.Group>
      </Form.Row>

      <Form.Row >
        <Form.Group as={Col}>
          <Form.Label className="form-label">Usuário</Form.Label>
          <Form.Control
            name="usuario"
            value={newUser.usuario}
            onChange={(e)=>onChange(e)}
            type="text"
            placeholder="digite seu nome de usuário"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label className="form-label">Senha</Form.Label>
          <Form.Control
            name="senha"
            value={newUser.senha}
            onChange={(e)=>onChange(e)}
            type="password"
            placeholder="**********"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label className="form-label">Data de nascimento</Form.Label>
          <Form.Control
            name="dataNascimento"
            value={newUser.dataNascimento}
            onChange={(e)=>onChange(e)}
            type="text" 
            placeholder="DD-MM-AAAA"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label className="form-label">Idade</Form.Label>
          <Form.Control
            name="idade"
            value={newUser.idade}
            onChange={(e)=>onChange(e)}
            type="number" 
            placeholder="digite sua idade"
          />
        </Form.Group>
      </Form.Row>
    
    
      <Form.Row >
        <Form.Group as={Col} >
          <Form.Label>Sexo</Form.Label>
          <Form.Control
            as="select" 
            name="sexo"
            value={newUser.sexo}
            onChange={(e)=>onChange(e)}
            type="text"
          > 
            <option>Select...</option>
            <option>MASCULINO</option>
            <option>FEMININO</option>
          </Form.Control>
          
        </Form.Group>

        <Form.Group as={Col} id="perfil-id" >
          <Form.Label>Perfil</Form.Label>
          <Form.Control
            name="perfilId"
            value={newUser.perfilId}
            onChange={(e)=> onChange(e)} 
            type="number"
          >
            {/* <option>Choose...</option> */}
            
            {/* <option>Aluno</option> */}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Button block variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}