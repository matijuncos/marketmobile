import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react'
import React from 'react';
import axios from 'axios'
import { StyleSheet, LogBox } from 'react-native';
import Navigation from './components/Navigation'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer'

LogBox.ignoreAllLogs();

const myStore = createStore(rootReducer, applyMiddleware(thunk))

const App= () =>{

  return (
    <Provider store={myStore}>
      <Navigation/> 
    </Provider>
  )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App