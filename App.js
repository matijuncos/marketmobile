import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react'
import React from 'react';
import axios from 'axios'
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './components/Navigation'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer'
// import firebase from 'firebase'
// import firebaseConfig from './config'
// firebase.initializeApp(firebaseConfig)


const myStore = createStore(rootReducer, applyMiddleware(thunk))
/* const App = () => {


    return (
    
      <Provider store={myStore}>
      <Navigation/> 
      </Provider>
      
    <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text> 
        <StatusBar style="auto" />
        <Navigation/>

        <ProductScreen/>
      </View> 
        
        
    )
} */
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