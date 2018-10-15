import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Form, Button } from 'semantic-ui-react';

import './style.css';

/**
 * Fake login.
 */
class Login extends Component {
  constructor() {
    super();

    this.state = {
      logged: false
    }

    this.login = this.login.bind(this);
  }

  login() {
    this.setState({ logged: true });
  }

  render() {
    if (this.state.logged) {
      return <Redirect to="/" />;
    } 

    const loginForm = (
      <Form>
        <Form.Field>
          <input placeholder="Username" name="username" value="admin" />
        </Form.Field>

        <Form.Field>
          <input type="password" placeholder="Password"  name="password" value="admin" />
        </Form.Field>

        <Button type="submit" onClick={this.login}>Sign in</Button>
      </Form>
    );

    return (
      <div className="Login">
        <Header as="h1">Welcome ;)</Header>
        {loginForm}
      </div>
    );
  };
}

export default Login;