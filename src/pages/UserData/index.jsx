import React, { useState, useEffect, useContext } from 'react';


import { Badge, Button, Table } from 'react-bootstrap';
import './style.css';

import api from "../../services/api";

import StoreContext from '../../Store/Context';
import  {withRouter} from 'react-router-dom';

// import { logout } from '../../services/auth';
// import { Redirect } from 'react-router';


function UserData({ history }) {
  const { setToken } = useContext(StoreContext);
  const [users, SetUsers] = useState([{
    id: 0,
    nome: "",
    usuario: "",
    telefone: "",
    dataNascimento:"",
    email: "",
    perfilTipo: ""
  }]);

  useEffect(() => {
    api.get("/usuarios")
    .then(res => {
      SetUsers(res.data.content);
      console.log(res.data.content);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }, []);


  function handleLogout(e){
    e.preventDefault();
    setToken(null);
    history.push('/');
  }

  // function handleNew(e){
  //   e.preventDefault();

  //   SetRender({redirect: "new"});
  // };
  // if(render.redirect === "new") {
  //   console.log('redirecionado');
  //   return <Redirect to="/new" />
  // }

  // function deleteUser(e) {
  //   api.delete(`/usuarios/${users.id}`)
  //   .then(res => {
  //     SetUsers(res.data.content);
  //     console.log(res.data.content);
  //   })
  //   .catch((err) => {
  //     console.error("ops! ocorreu um erro" + err);
  //   });
  // }

  return (
    <div className="container">
      <header className="header-buttons">
        <Button variant="success">Novo</Button>
        <Button onClick={handleLogout} variant="outline-danger">Sair</Button>
      </header>
      <Table striped bordered hover variant="dark">
        <thead className="table-header">
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Telefone</th>
            <th>Nascimento</th>
            <th>Email</th>
            <th colSpan="2">Perfil</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.usuario}</td>
              <td>{user.telefone}</td>
              <td>{user.dataNascimento}</td>
              <td>{user.email}</td>
              <td>{user.perfilTipo}</td>
              <td className="badges">
              <Badge className="badge-item edit" pill variant="info">
                Editar
              </Badge>
              <Badge className="badge-item del" pill variant="warning">
                Deletar
              </Badge>
              </td>
            </tr>
          ))}
          
    
        </tbody>
      </Table>
    </div>
  );
}
export default withRouter(UserData);