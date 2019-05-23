// IMPORTING DEPENDENCES
import { Constants } from 'expo'
import React from 'react'
import { View, StyleSheet } from 'react-native'

// IMPOTING COMPONENTS
import Label from '../assets/Label'
import Button from '../assets/Button'
import Input from '../assets/TextInput'

// PRINCIPAL COMPONENT APP
export default ({ history }) =>
(
  <View style={styles.container}>
    <Label title='Crie sua conta' desing={styles.title}/>
    <Input title='Digite seu nome'/>
    <Input title='Digite seu email'/>
    <Input title='Digite sua senha'/>
    <Button title='Cadastrar' type='login' history={history}/>
  </View>
)

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
  });