import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Categories from './Screens/Categories';
import ProductScreen1 from './Screens/ProductScreen';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';

export default function App() {
  return (
      
      <ProductScreen1/>
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
