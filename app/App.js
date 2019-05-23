import React from "react"
import { View } from "react-native"
import { NativeRouter, Switch, Route } from "react-router-native"

import Home from './components/views/Home'
import Index from './components/views/Index'
import Account from './components/views/Account'
import Register from './components/views/Register'
import EarnMoney from './components/views/EarnMoney'

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={{flex:1}}>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/earn" component={EarnMoney} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </View>
      </NativeRouter>
    );
  }
}