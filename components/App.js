/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import CircleImage from '../src/assets/images/circle-shape-outline.png';
import ClosImage from '../src/assets/images/close.png';
import Header from './Header'
import GameBoard from './GameBoard'

export default class App extends Component {
  state: {
    gameStarted: boolean
  };

  constructor() {
    super()
    this.state = { gameStarted: false }
  }

  startGame() {
    this.setState({ gameStarted: true })
  }

  render() {
    const { gameStarted } = this.state
    return (
      <View style={styles.container}>
        <Header />
        {
          gameStarted ? (
            <GameBoard />
          ) : (
              <View style={{marginHorizontal:20}}>
                <Text style={styles.welcome}>
                  Which one you always choose ?
              </Text>
                <View style={styles.intro}>
                  <View>
                  <TouchableOpacity onPress={() => this.startGame()}>
                    <Image source={CircleImage} resizeMode="contain" style={{ height: 80 }} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text allowFontScaling={false} style={{fontSize:22}}>or</Text>
                  </View>
                  <View>
                  <TouchableOpacity onPress={() => this.startGame()}>
                    <Image source={ClosImage} resizeMode="contain" style={{ height: 70 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 50,
    marginTop: 50,
    textAlign:'center',
    color:'#4C6A86',
    fontWeight:'bold'
  },
  instructions: {
    textAlign: 'center',
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
  },
  intro:{
    flexDirection:'row',alignItems:'center',justifyContent:"space-evenly",marginTop:30,width:'70%',alignSelf:'center'
  }
})
