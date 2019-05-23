// IMPORTING DEPENDENCES
import React, { Component } from 'react'
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native'

// BUTTON COMPONENT USED IN APP
export default class Button extends Component
{
  constructor(props)
  {
    super(props);
    
    if(this.props.type)
    {
      switch(this.props.type)
      {
        case 'home':
          this.click = this.home
        break;

        case 'earn':
          this.click = this.earn
        break;

        case 'account':
          this.click = this.account
        break;
      }
    }
    else
    {
      this.click = this.props.click
    }
  }

  earn = () => this.props.history.push("/earn");
  home = () => this.props.history.push("/home");
  account = () => this.props.history.push("/account");

  render()
  {
    return(
      <TouchableOpacity style={styles.vTouchableOpacity} onPress={this.click}> 
        <Text style={styles.vText}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

// CSS COMPONENT
const styles = StyleSheet.create({
  vTouchableOpacity:
  {
    backgroundColor: '#e67e22',
  },

  vText:
  {
    padding: 15,
    fontSize: 17,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});