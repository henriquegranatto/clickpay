// IMPORTING DEPENDENCES
import { Constants } from 'expo'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Redirect } from 'react-router-native'


// IMPOTING COMPONENTS
import Label from '../assets/Label'
import Button from '../assets/Button'
import Input from '../assets/TextInput'

const request = require('../functions/indexFunctions')

// PRINCIPAL COMPONENT APP
export default class Index extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {email: "", password: "", isLogged: false}
    this.history = this.props.history;
  }

  email = (value) =>
  {
    this.setState({email: value})
  }

  password = (value) =>
  {
    this.setState({password: value})
  }

  login = async () =>
  {
    if(this.state.email && this.state.password)
    {
      const response = await request.login(this.state.email, this.state.password)
      if(response.message == 2000)
      {
        this.setState({isLogged: true})
      }
    }
  }

  render()
  {
    if(this.state.isLogged)
    {
      return(
      <Redirect to="/home"/>
      )
    }
    else
    {
      return(
        <React.Fragment>
          <View style={styles.container}>
            <Label title='Click Pay' desing={styles.title}/>
            <Input title='Digite seu email' onChangeText={this.email}/>
            <Input title='Digite sua senha' onChangeText={this.password}/>
            <Button title='Entrar' click={this.login}/>
            <Label to='/home' title='Criar uma conta' desing={styles.createAccount}/>
            <Label title='Esqueci minha senha' desing={styles.resetPassword}/>
          </View>
        </React.Fragment>
      )
    }
  }
}

// CSS COMPONENT
const styles = StyleSheet.create({
  container:
  {
    flex: 1, 
    padding: 25,
    backgroundColor: '#34495e', 
    paddingTop: Constants.statusBarHeight
  },

  title:
  {
    fontSize: 30,
    marginTop: 60, 
    marginBottom: 40, 
    textAlign: 'center',  
  },

  createAccount:
  { 
    fontSize: 20,
    marginTop: 40, 
    textAlign: 'center', 
  },

  resetPassword:
  { 
    fontSize: 20,
    marginTop: 20, 
    textAlign: 'center', 
  }
});