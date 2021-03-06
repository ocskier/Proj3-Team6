import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import AUTH from '../../utils/AUTH';
import API from '../../utils/API';

import './LoginForm.css'


const image = './Images/login.jpg'
class SignupForm extends Component {

	constructor() {
    super();
    
		this.state = {
      firstName: '',
      lastName: '',
			username: '',
			password: '',
      confirmPassword: '',
      loginAttempt: false,
			redirectTo: null
		};
  }
  
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
  }
  
	handleSubmit = (event) => {
		event.preventDefault();
		// TODO - validate!
		AUTH.signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      console.log(response);
      API.makeList({
        user: response.data._id ,
        name: response.data.firstName + "'s List"
      })
      .then(response => {
        console.log(response)
      })
      .catch((err) => {console.log(err)});
      if (!response.data.errmsg) {
        console.log('youre good');
        this.setState({
          loginAttempt: false,
          redirectTo: '/'
        });
      } else {
        console.log('duplicate');
      }
    });
  }
  
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo, loginAttempt: this.state.loginAttempt}} />
    }
    
		return (
      <div className="login valign-wrapper" style={{backgroundImage: `url(${image})`}}>
      <Container>
        <Row style={{display: "-webkit-box"}}>
          <Col size="s1 m2 l3"></Col>
          <Col size="s10 m8 l6">
            <Card title="Register for WishList!">
              <form style={{marginTop: 10}}>
                <label htmlFor="username">First name: </label>
                <Input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                <label htmlFor="username">Last name: </label>
                <Input
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                <label htmlFor="username">Username: </label>
                <Input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password: </label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
                <Link to="/">Login</Link>
                <FormBtn onClick={this.handleSubmit}>Register</FormBtn>
              </form>
            </Card>
          </Col>
          <Col size="s1 m2 l3"></Col>
        </Row>
      </Container>
      </div>
		)
	}
}

export default SignupForm;
