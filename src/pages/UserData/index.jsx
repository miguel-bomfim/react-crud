import React, { useState, useEffect, useContext } from 'react';


import { Badge, Button, Table } from 'react-bootstrap';
import './style.css';

import api from "../../services/api";

import StoreContext from '../../Store/Context';
import  {useHistory} from 'react-router-dom';



function UserData() {
  const history = useHistory();
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

  const { token } = useContext(StoreContext);

  var config = {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  }

  function loadUsers(){
    api.get("/usuarios")
    .then(res => {
      SetUsers(res.data.content);
      console.log(res.data.content);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  useEffect(() => {
    console.log("users loaded")
    loadUsers()
  }, []);

  function deleteUser(id){
    api.delete(`/usuarios/${id}`, config)
    .then(loadUsers)
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  function editUser(id){
    history.push(`/new/${id}`);
  }

  function handleLogout(){
    setToken(null);
    history.push('/');
  }

  function handleNewUser(){
    history.push('/new');
  }


  return (
    <div className="container">
      <header className="header-buttons">
        <Button onClick={handleNewUser} variant="success">Novo</Button>
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
              <Badge
                onClick={()=>editUser(user.id)}
                className="badge-item edit" pill variant="info">
                Editar
              </Badge>
              <Badge
                onClick={()=>deleteUser(user.id)}
                className="badge-item del" pill variant="warning">
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
export default UserData;