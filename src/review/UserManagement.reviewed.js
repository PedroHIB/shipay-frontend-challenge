// Task 2 - Pull Request Review

import React from "react";

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
      ],
      newUserName: "",
      newUserEmail: "",
    };
  }

  // ❌ PROBLEM: Mutação direta do estado
  handleNameChange(event) {
    this.state.newUserName = event.target.value;
  }

  handleEmailChange(event) {
    this.setState({ newUserEmail: event.target.value });
  }

  addUser() {
    const newUser = {
      // ❌ PROBLEM: Geração de IDs frágeis (pode causar duplicados)
      id: this.state.users.length + 1,
      name: this.state.newUserName,
      email: this.state.newUserEmail,
    };

    // ❌ PROBLEM: Mutação direta do array de usuários
    this.state.users.push(newUser);

    // ❌ PROBLEM: O comando forceUpdate não deveria ser necessário em um gerenciamento de estado adequado.
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <h2>Gerenciamento de Usuários</h2>
        <div>
          <input
            type="text"
            placeholder="Nome do usuário"
            value={this.state.newUserName}
            // ❌ PROBLEM: Está faltando um manipulador onChange aqui.
          />
          <input
            type="email"
            placeholder="Email do usuário"
            value={this.state.newUserEmail}
            onChange={(e) => this.handleEmailChange(e)}
          />
          <button onClick={() => this.addUser()}>Adicionar Usuário</button>
        </div>
        <ul>
          {this.state.users.map((user) => (
            // ❌ PROBLEM: Key ausente
            <li>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserManagement;
