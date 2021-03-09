import React, {useState,useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text,TouchableWithoutFeedback, View, ToastAndroid} from 'react-native';
import Login from '../Screens/SignIn';
import SignUp from '../Screens/SignUp'
import Categories from '../Screens/Categories'
import ProductsByCategory from '../Screens/ProductsByCategory'
import ProductScreen from '../Screens/ProductScreen'
import {connect}from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer' 
import userActions from '../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawer from './CustomDrawer';
import Product from './Product';
import shoppingCart from '../Screens/shoppingCart';
import CheckOut from '../Screens/CheckOut';
import CheckOut2 from '../Screens/CheckOut2';
import CheckOut3 from '../Screens/CheckOut3';
import CheckOut4 from '../Screens/CheckOut4';
import shoppingCartActions from '../redux/actions/shoppingCartActions';

const Stack = createStackNavigator()
const Drawer= createDrawerNavigator()

const StackNavigator= () =>{
  return(
  <Stack.Navigator screenOptions={{
        headerTitleStyle:{color:'white',fontWeight:'bold'},
        headerStyle:{
            backgroundColor:'rgba(6, 134, 200, 0.863)'}}}>
    <Stack.Screen name='Categories' component={Categories}/>
    <Stack.Screen name="ProductsByCategory" component={ProductsByCategory}/>
    <Stack.Screen name='ProductScreen' component={ProductScreen}/>
    <Stack.Screen name='Product' component={Product}/>
    <Stack.Screen name='cart' component={shoppingCart}/>
    <Stack.Screen name='CheckOut' component={CheckOut}/>
    <Stack.Screen name='CheckOut2' component={CheckOut2}/>
    <Stack.Screen name='CheckOut3' component={CheckOut3}/>
    <Stack.Screen name='CheckOut4' component={CheckOut4}/>
  </Stack.Navigator>
  )
} 


const Navigation = (props) =>{
const {loggedUser, logout_user, login_AS, preservedShoppingCart} = props

  useEffect(() => {
    getData()
    console.log('navigation')
  },[])

  const getData=async()=>{
    //shopping cart
    try {
      console.log("shopping cart")
      if(await AsyncStorage.getItem('shoppingCart')){
        const shoppingCart = await AsyncStorage.getItem('shoppingCart')
          console.log(shoppingCart)
        if(shoppingCart!== null||shoppingCart.length!==0) {
          if(Object.entries(shoppingCart).length !== 0){
            preservedShoppingCart(shoppingCart)
          }
        }
      } 
    }catch(error) {console.log('error',error)}
    //token
    try {
      console.log("token")
      const token = await AsyncStorage.getItem('token')
      if(loggedUser===null && token!== null) {
        login_AS(token)
        .then(respuesta => {
          if(respuesta.success) {
            console.log(props)
          }
        })
      }else{
      }
    } catch(error) {
    }
  }

    return(
    <NavigationContainer>
      <Drawer.Navigator drawerStyle={{ backgroundColor: 'rgba(6, 134, 200, 0.95)'}}  drawerContent={(props)=><CustomDrawer {...props}/>} >
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="SignUp" component={SignUp} />
          <Drawer.Screen name="Categories" children={StackNavigator} /> 
      </Drawer.Navigator>
    </NavigationContainer>
    )
}
const styles =StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
  })
  const mapStateToProps = state => {
    return{
      loggedUser: state.user.loggedUser
    }
  }
  const mapDispatchToProps={
    logout_user:userActions.logout_user,
    login_AS:userActions.login_AS,
    preservedShoppingCart:shoppingCartActions.preservedShoppingCart
  }
export default connect(mapStateToProps,mapDispatchToProps)(Navigation)