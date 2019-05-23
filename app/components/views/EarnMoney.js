// IMPORTING DEPENDENCES
import React, { Component } from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { Constants, AdMobInterstitial, AdMobBanner } from 'expo'

import Label from '../assets/Label'
import Button from '../assets/Button'

AdMobInterstitial.setAdUnitID('ca-app-pub-2144981913765370/8941091803');

export default class EarnMoney extends Component
{
  constructor(props)
  {
    super(props)
    this.history = this.props.history;
    this.state = {points: 1000}
  }

  componentDidMount()
  {
    AdMobInterstitial.addEventListener("interstitialDidClose", () =>
      this.setState({points: this.state.points + 1000})
    );
  }

  admob = async () => {
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };

  render()
  {
    return(
      <React.Fragment>
        <View style={styles.container}>
          <Label title={`${this.state.points} pontos`} desing={styles.vText}/>
          <TouchableOpacity style={styles.vTouchableOpacity} onPress={this.admob}> 
            <Text style={styles.vTextButton}>Ver propaganda</Text>
          </TouchableOpacity>
          <Button title='Voltar' type='home' history={this.history}/>
        </View>
        <View style={styles.banner}>
          <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-2144981913765370/1497145234"
              onDidFailToReceiveAdWithError={this.bannerError} />
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1, 
    justifyContent: 'center',
    padding: 25,    
    backgroundColor: '#34495e', 
    paddingTop: Constants.statusBarHeight
  },

  vText:
  {
    fontSize: 35,
    marginBottom: 50,
    textAlign: 'center'
  },

  vTouchableOpacity:
  {
    marginBottom: 10,
    backgroundColor: '#e67e22',
  },

  vTextButton:
  {
    padding: 15,
    fontSize: 17,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  banner:
  {
    alignItems: "center",
    backgroundColor: '#34495e', 
  }
})