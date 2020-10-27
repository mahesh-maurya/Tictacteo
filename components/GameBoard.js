/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, Image } from 'react-native';

import Circle from './Circle';
import Cross from './Cross';
import CircleImage from '../src/assets/images/circle-shape-outline.png';
import ClosImage from '../src/assets/images/close.png';
import ScaleImage from '../src/assets/images/scale.png';
import {
  CENTER_POINTS,
  AREAS,
  CONDITIONS,
  GAME_RESULT_NO,
  GAME_RESULT_USER,
  GAME_RESULT_AI,
  GAME_RESULT_TIE,
} from '../constants/game';
import styles from './styles/gameBoard';
import PromptArea from './PromptArea';

export default class GameBoard extends Component {
  state: {
    AIInputs: number[],
    userInputs: number[],
    result: number,
    round: number,
  };

  constructor() {
    super();
    this.state = {
      AIInputs: [],
      userInputs: [],
      result: GAME_RESULT_NO,
      round: 0,
    };
  }

  restart() {
    const { round } = this.state;
    this.setState({
      userInputs: [],
      AIInputs: [],
      result: GAME_RESULT_NO,
      round: round + 1,
    });
    setTimeout(() => {
      if (round % 2 === 0) {
        this.AIAction();
      }
    }, 5);
  }

  boardClickHandler(e: Object) {
    const { locationX, locationY } = e.nativeEvent;
    const { userInputs, AIInputs, result } = this.state;
    if (result !== -1) {
      return;
    }
    const inputs = userInputs.concat(AIInputs);

    const area = AREAS.find(
      (d) =>
        locationX >= d.startX &&
        locationX <= d.endX &&
        locationY >= d.startY &&
        locationY <= d.endY,
    );

    if (area && inputs.every((d) => d !== area.id)) {
      this.setState({ userInputs: userInputs.concat(area.id) });
      setTimeout(() => {
        this.judgeWinner();
        this.AIAction();
      }, 5);
    }
  }

  AIAction() {
    const { userInputs, AIInputs, result } = this.state;
    if (result !== -1) {
      return;
    }
    while (true) {
      const inputs = userInputs.concat(AIInputs);

      const randomNumber = Math.round(Math.random() * 8.3);
      if (inputs.every((d) => d !== randomNumber)) {
        this.setState({ AIInputs: AIInputs.concat(randomNumber) });
        this.judgeWinner();
        break;
      }
    }
  }

  componentDidMount() {
    this.restart();
  }

  isWinner(inputs: number[]) {
    return CONDITIONS.some((d) =>
      d.every((item) => inputs.indexOf(item) !== -1),
    );
  }

  judgeWinner() {
    const { userInputs, AIInputs, result } = this.state;
    const inputs = userInputs.concat(AIInputs);

    if (inputs.length >= 5) {
      let res = this.isWinner(userInputs);
      if (res && result !== GAME_RESULT_USER) {
        return this.setState({ result: GAME_RESULT_USER });
      }
      res = this.isWinner(AIInputs);
      if (res && result !== GAME_RESULT_AI) {
        return this.setState({ result: GAME_RESULT_AI });
      }
    }

    if (
      inputs.length === 9 &&
      result === GAME_RESULT_NO &&
      result !== GAME_RESULT_TIE
    ) {
      this.setState({ result: GAME_RESULT_TIE });
    }
  }

  render() {
    const { xTranslate, yTranslate, color } = this.props;
    const { userInputs, AIInputs, result } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.score}>
          <View style={styles.scorelist}>
            <Image source={CircleImage} resizeMode="contain" style={{ height: 30 }} />
            <Text allowFontScaling={false} style={[styles.scorecount,{ color:'#3989d4'}]}>4 Wins</Text>
          </View>
          <View style={styles.scorelist}>
            <Image source={ClosImage} resizeMode="contain" style={{ height: 25 }} />
            <Text allowFontScaling={false} style={[styles.scorecount,{ color:'#4EBCD4'}]}>4 Wins</Text>
          </View>
          <View style={styles.scorelist}>
            <Image source={ScaleImage} resizeMode="contain" style={{ height: 30 }} />
            <Text allowFontScaling={false} style={[styles.scorecount,{ color:'#4C6A86'}]}>4 Wins</Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={(e) => this.boardClickHandler(e)}>
          <View style={styles.board}>
            <View style={styles.line} />
            <View
              style={[
                styles.line,
                {
                  width: 3,
                  height: 306,
                  transform: [{ translateX: 200 }],
                },
              ]}
            />
            <View
              style={[
                styles.line,
                {
                  width: 306,
                  height: 3,
                  transform: [{ translateY: 100 }],
                },
              ]}
            />
            <View
              style={[
                styles.line,
                {
                  width: 306,
                  height: 3,
                  transform: [{ translateY: 200 }],
                },
              ]}
            />
            {userInputs.map((d, i) => (
              <Circle
                key={i}
                xTranslate={CENTER_POINTS[d].x}
                yTranslate={CENTER_POINTS[d].y}
                color="#3989d4"
              />
            ))}
            {AIInputs.map((d, i) => (
              <Cross
                key={i}
                xTranslate={CENTER_POINTS[d].x}
                yTranslate={CENTER_POINTS[d].y}
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
        <PromptArea result={result} onRestart={() => this.restart()} />
      </View>
    );
  }
}
