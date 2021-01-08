import React, { Component } from 'react';

import { Button, Col, Form } from 'react-bootstrap';
import './style.css'
import api from "../../services/api";
import { withRouter } from "react-router-dom";



class AddUser extends Component {
  state = {
    nome: "",
    email: "",
    telefone: 0 ,
    usuario: "",
    senha: "",
    dataNascimento: "",
    sexo: "",
    perfilId: 1
  };

  handleSignUp = async e => {
    e.preventDefault();
    const {
      nome,
      email,
      telefone,
      usuario,
      senha,
      dataNascimento,
      idade,
      sexo,
      perfilId } = this.state;
    
    try {
      await api.post("/usuarios", { 
        nome,
        email,
        telefone,
        usuario,
        senha,
        dataNascimento,
        idade,
        sexo,
        perfilId
        });
      this.props.history.push("/app");
    } catch (err) {
      console.log(err);
      this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    
  };



  render(){
      return (

      <Form
        onSubmit={this.handleSignUp}
        className="container form-new"
      >
        
        <Form.Row >
          <Form.Group as={Col}>
            <Form.Label className="form-label">Nome</Form.Label>
            <Form.Control
              onChange={e => this.setState({ nome: e.target.value })}
              type="text"
              placeholder="digite seu nome completo"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control
              onChange={e => this.setState({ email: e.target.value })}
              type="email"
              placeholder="seu@email.com"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="form-label">Telefone</Form.Label>
            <Form.Control
              onChange={e => this.setState({ telefone: e.target.value })}
              type="number"
              placeholder="+55"

            />
          </Form.Group>
        </Form.Row>

        <Form.Row >
          <Form.Group as={Col}>
            <Form.Label className="form-label">Usuário</Form.Label>
            <Form.Control
              onChange={e => this.setState({ usuario: e.target.value })}
              type="text"
              placeholder="digite seu nome de usuário"
    
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="form-label">Senha</Form.Label>
            <Form.Control
              onChange={e => this.setState({ senha: e.target.value })}
              type="password"
              placeholder="************"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="form-label">Data de nascimento</Form.Label>
            <Form.Control
              onChange={e => this.setState({ dataNascimento: e.target.value })}
              type="text" 
              placeholder="01-01-0001"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label className="form-label">Idade</Form.Label>
            <Form.Control
              onChange={e => this.setState({ idade: e.target.value })}
              type="number" 
            />
          </Form.Group>
        </Form.Row>
      
      
        <Form.Row >
          <Form.Group as={Col} >
            <Form.Label>Sexo</Form.Label>
            <Form.Control 
              onChange={e => this.setState({ sexo: e.target.value })}
              type="text"
            >
              {/* <option>Choose...</option> */}
              
              {/* <option>Feminino</option> */}
            </Form.Control>
            
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>Perfil</Form.Label>
            <Form.Control
              onChange={e => this.setState({ sexo: e.target.value })} 
              type="text"
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
}

export default withRouter(AddUser);
