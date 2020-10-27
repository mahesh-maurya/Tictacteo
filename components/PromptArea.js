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
} from 'react-native'

import {
  GAME_RESULT_NO,
  GAME_RESULT_USER,
  GAME_RESULT_AI,
  GAME_RESULT_TIE
} from '../constants/game'


export default class Header extends Component {
  generateResultText(result: number) {
    switch (result) {
      case GAME_RESULT_USER:
        return 'You Won The Game Congratulation!'
      case GAME_RESULT_AI:
        return 'Computer won the game!'
      case GAME_RESULT_TIE:
        return 'Tie!'
      default:
        return ''
    }
  }

  render() {
    const { result, onRestart } = this.props
    return (
      <View>
        <Text allowFontScaling={false} style={[styles.text,{textTransform:'capitalize',color:'#4c6a86'}]}>{ this.generateResultText(result) }</Text>
        {
          result !== GAME_RESULT_NO && (
            <TouchableOpacity onPress={() => onRestart()}>
              <Text style={[styles.instructions,{borderColor:'#E3F3F6',borderRadius:30,borderWidth:2,paddingVertical:12}]}>
                Touch here to play again
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 50,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  instructions: {
    marginTop: 20,
    color: '#A4B5B8',
    marginBottom: 5,
    textAlign: 'center',
    fontWeight:'bold',
    fontSize:20
  },
})
