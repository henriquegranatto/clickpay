// IMPORTING DEPENDENCES
import { Constants } from 'expo'
import React from 'react'
import { View, Image, StyleSheet } from 'react-native';

// IMPORT COMPONENTS
import Label from '../assets/Label'
import Button from '../assets/Button'

// COMPONENT HOME PAGE
export default ({ history }) =>
(
  <View style={styles.container}>
    <View style={styles.img}>
        <Image style={styles.vImage} source={{uri: 'https://www.shareicon.net/download/2016/09/01/822762_user_512x512.png'}} />         
    </View>
    <View style={styles.box}>
        <Label title='1000 pontos' desing={styles.vText}/> 
        <Label title='Henrique Granatto' desing={styles.vText}/>
        <Label title='henrique.ramires.granatto@gmail.com' desing={styles.vEmail}/> 
    </View>
    <View style={styles.button}>    
      <Button title='Editar conta' />
      <Button title='Histórico de Pontos' />
      <Button title='Histórico de Pagamentos' />
    </View>
  </View>
);

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
    marginBottom: 75,
    justifyContent: 'space-between',
  },

  img: 
  {
    height: 70,
    padding: 80,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  
  box: 
  { 
    paddingLeft: 25,
  },

  vImage:
  {
    width: 80, 
    height: 80, 
    paddingTop: 30
  },

  vText:
  {
    fontSize: 17,
    padding: 5,
  },
  
  vEmail:
  {
    fontSize: 17,
    padding: 5,
  }
});  