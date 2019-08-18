import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './Components/HomeScreen.js';
import ResultScreen from './Components/ResultScreen.js';

const UsersManager = createStackNavigator({
  HomeScreen: {screen: HomeScreen},
  ResultScreen: {screen: ResultScreen},
});

const App = createAppContainer(UsersManager)
export default App;