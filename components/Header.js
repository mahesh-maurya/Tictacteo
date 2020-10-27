/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title} allowFontScaling={false}>
          Tic Tac Toe
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3989D4',
    flexDirection: 'row',
    paddingVertical:5
  },
  title: {
    color: '#fff',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  }
})
