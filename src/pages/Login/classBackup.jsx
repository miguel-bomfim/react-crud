// import { Form, Button } from 'react-bootstrap';
// import './style.css';

// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";

// import api from "../../services/api";
// import { login } from "../../services/auth";


// class Login extends Component {
//   state = {
//     usuario: "",
//     senha: "",
//     error: ""
//   };

//   handleSignIn = async e => {
//     e.preventDefault();
//     const { usuario, senha } = this.state;
//     if (!usuario || !senha) {
//       this.setState({ error: "Preencha e-mail e senha para continuar!" });
//     } else {
//       try {
//         const response = await api.post("/autenticacao", { usuario, senha });
//         login(response.data.token);
//         this.props.history.push("/app");
//       } catch (err) {
//         this.setState({
//           error:
//             "Verifique suas credenciais"
//         });
//       }
//     }
//   };

//   render(){
//     return (
//       <div className="login-screen">
//         <Form onSubmit={this.handleSignIn}>
//           <Form.Group controlId="formBasicEmail">
//             <Form.Label className="label">Usuário</Form.Label>
//             <Form.Control
//               size="lg"
//               className="input"
//               type="text"
//               placeholder="Digite seu usuário aqui"
//               onChange={e => this.setState({ usuario: e.target.value })}
//               required
//             />
//              {this.state.error && <p className="error-label">{this.state.error}</p>}
//           </Form.Group>

//           <Form.Group controlId="formBasicPassword">
//             <Form.Label  className="label">Senha</Form.Label>
//             <Form.Control
//               size="lg"
//               className="input"
//               type="password"
//               placeholder="Digite sua senha aqui"
//               onChange={e => this.setState({ senha: e.target.value })}
//               required/>
//           </Form.Group>
//           <Button  variant="primary" type="submit" block>
//             Login
//           </Button>
//         </Form>
//       </div>
//     );
//   }
// }
// export default withRouter(Login);
  

