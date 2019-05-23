// IMPORTING DEPENDENCES
import { Constants } from 'expo'
import React, { Component } from 'react'
import { View,  StyleSheet } from 'react-native';

// IMPORT COMPONENTS
import Button from '../assets/Button'
import Profile from '../profile/Profile'

const request = require('../functions/homeFunctions')

// COMPONENT HOME PAGE
export default class Home extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {name: null, points: null};
    this.history = this.props.history;
  }

  getIndexInfo = async () =>
  {
    const data = await request.getIndexInfo()
    this.setState({name: data.name, points: data.points})
  }

  render()
  {  
    this.getIndexInfo()
    
    if(this.state.points != null && this.state.name != null)
    {
      return(
        <View style={styles.container}>
          <Profile name={this.state.name} point={this.state.points} img='https://www.shareicon.net/download/2016/09/01/822762_user_512x512.png'/>
          <View style={styles.button}>    
            <Button title='Minha conta' type='account' history={this.history}/>
            <Button title='Ganhar Dinheiro' type='earn' history={this.history}/>
            <Button title='Receber Dinheiro' />
            <Button title='Sobre o Click Pay' />
            <Button title='Deslogar' />
          </View>
        </View>
      )
    }
    else
    {
      return(
        <View style={styles.container}></View>
      )
    }
  }
}

// CSS COMPONENT
const styles = StyleSheet.create({
  container:
  {
    flex: 1, 
    backgroundColor: '#34495e', 
    paddingTop: Constants.statusBarHeight
  },

  button:
  {
    flex: 1,
    padding: 25,
    marginBottom: 25,
    justifyContent: 'space-between',
  }
});  