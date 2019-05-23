// IMPORTING DEPENDENCES
import React, { Component } from 'react'
import { Link } from 'react-router-native'
import {View, Text, StyleSheet} from 'react-native'

export default class Label extends Component
{
  render()
  {
    if(!this.props.to)
    {
      return(
        <Text style={this.props.desing}>
          <Text style={styles.vText}>
            {this.props.title}
          </Text>
        </Text>
      )
    }
    else
    {
      return(
        <Link to={`${this.props.to}`}>
          <Text style={this.props.desing}>
            <Text style={styles.vText}>
              {this.props.title}
            </Text>
          </Text>
        </Link>
      )
    }
  }
}

const styles = StyleSheet.create({
  vText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
})