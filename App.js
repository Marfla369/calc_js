/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default class App extends Component {
  constructor() {
    super();

    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      display: '0',
      operation: '',
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };

    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  buttonPressed(text) {
    if (text == '=' && this.state.display.includes(' ')) {
      return this.doTheMath();
    } else if (text !== '=') {
      if (this.state.display == '0') {
        this.setState({
          display: text,
        });
      } else {
        this.setState({
          display: this.state.display.toString() + text,
        });
      }
    }
  }

  handleOperation(text) {
    if (text == 'AC') {
      this.setState({
        display: '0',
      });
    } else if (this.state.operation == '') {
      this.setState({
        display: this.state.display + ' ' + text,
        operation: text,
      });
    }
  }

  doTheMath() {
    //=
    const array = this.state.display.split(' ');
    let [first, second] = array;
    second = second.substring(1);
    let res = 0;
    switch (this.state.operation) {
      case '+':
        res = parseFloat(first) + parseFloat(second);
        break;
      case '-':
        res = parseFloat(first) - parseFloat(second);
        break;
      case '/':
        res = parseFloat(first) / parseFloat(second);
        break;
      case '*':
        res = parseFloat(first) * parseFloat(second);
        break;
      case 'x^2':
        res = parseFloat(first);
        res = res * res;
        break;
      case 'x^3':
        res = parseFloat(first);
        res = res * res * res;
        break;
      case 'sqrt':
        res = Math.sqrt(parseFloat(first));
        break;
      case 'log10':
        res = Math.log10(parseFloat(first));
        break;
      case 'ln':
        res = Math.log(parseFloat(first));
        break;
      default:
        res = this.state.display;
    }
    this.setState({
      display: res.toFixed(6).toString(),
      operation: '',
    });
  }

  render() {
    let key = 0;
    let rows = [];
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={key}
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>,
        );
        key++;
      }
      rows.push(
        <View key={key} style={styles.row}>
          {row}
        </View>,
      );
      key++;
    }

    let operation = [];
    let ops = [];
    let ops2 = [];
    let operation2 = [];

    if (this.state.orientation === 'portrait') ops = ['AC', '+', '-', '*', '/'];
    else {
      ops = ['AC', '+', '-', '*', '/'];
      ops2 = ['ln', 'sqrt', 'log10', 'x^2', 'x^3'];
    }

    for (let i = 0; i < ops.length; i++) {
      operation.push(
        <TouchableOpacity
          key={key}
          onPress={() => this.handleOperation(ops[i])}
          style={styles.btn}>
          <Text style={[styles.btnText, styles.white]}>{ops[i]}</Text>
        </TouchableOpacity>,
      );
      key++;

      operation2.push(
        <TouchableOpacity
          key={key}
          onPress={() => this.handleOperation(ops2[i])}
          style={styles.btn}>
          <Text style={[styles.btnText, styles.white]}>{ops2[i]}</Text>
        </TouchableOpacity>,
      );
      key++;
    }
    if (this.state.orientation === 'portrait') {
      return (
        <View style={styles.container}>
          <View style={styles.result}>
            <Text style={styles.display}>{this.state.display}</Text>
          </View>
          <View style={styles.buttons}>
            <View style={styles.numbers}>{rows}</View>

            <View style={styles.operations}>{operation}</View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.result}>
            <Text style={styles.display}>{this.state.display}</Text>
          </View>
          <View style={styles.buttons_land}>
            <View style={styles.numbers_land}>{rows}</View>

            <View style={styles.operation_parent}>
              <View style={styles.operations_land}>{operation}</View>
              <View style={styles.operations_land}>{operation2}</View>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  white: {
    color: 'white',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 30,
  },
  result: {
    flex: 2,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  display: {
    fontSize: 55,
    color: 'white',
  },
  calculationText: {
    fontSize: 24,
    color: 'white',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numbers: {
    flex: 3,
    backgroundColor: 'red',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    alignItems: 'stretch',
  },
  buttons_land: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  numbers_land: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'stretch',
  },
  operations_land: {
    flex: 2,
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    alignItems: 'center',
  },
  operation_parent: {
    flex: 1,
    alignContent: 'stretch',
    flexDirection: 'row',
  },
});
