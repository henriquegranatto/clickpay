// IMPORTING DEPENDENCES
import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Label from '../assets/Label'

// PROFILE COMPONENT USED WHEN LOGGED
export default class Profile extends Component {
  render() {
    return (
        <View>
          <View style={styles.img}>
            <Image style={styles.vImage} source={{uri: `${this.props.img}`}} />         
          </View>
          <View style={styles.box}>
            <Label title={this.props.name} desing={styles.vText}/>
            <Label title={`${this.props.point} pontos`} desing={styles.vText}/> 
          </View>
        </View>   
    );
  }
}

// CSS COMPONENT
const styles = StyleSheet.create({
  img: 
  {
    height: 70,
    padding: 50,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  
  box: 
  { 
    height: 70,
    alignItems: 'center'
  },

  vImage:
  {
    width: 50, 
    height: 50, 
    paddingTop: 10
  },

  vText:
  {
    fontSize: 17,
    padding: 5,
  }
});   