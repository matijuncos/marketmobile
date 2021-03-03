import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react'
import React from 'react';
import axios from 'axios'
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import Categories from './screens/Categories'
=======
import Categories from './Screens/Categories';
import ProductScreen1 from './Screens/ProductScreen';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
>>>>>>> 37cf84792723632ffaf7dc26afc6f92087f63482

export default function App() {


  return (
<<<<<<< HEAD
    <View style={styles.container}>
     {/*  <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      <Categories/>
    </View>
=======
      
      <ProductScreen1/>
>>>>>>> 37cf84792723632ffaf7dc26afc6f92087f63482
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
