// IMPORTING DEPENDENCES
import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Constants } from 'expo';

// BUTTON COMPONENT USED IN APP
export default class Input extends Component
{
  render()
  {
    return(
      <TextInput style={styles.vTextInput} placeholder={this.props.title} onChangeText={this.props.onChangeText}/>
    )
  }
}

// CSS COMPONENT
const styles = StyleSheet.create({
  vTextInput:
  {
    height: 55,
    padding: 15,
    borderRadius: 3,
    color: '#000000',
    marginBottom: 50,
    backgroundColor: '#FFFFFF',
  }
});