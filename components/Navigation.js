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
        headerStyle:{backgroundColor:'rgba(6, 134, 200, 0.863)'}}}>
    <Stack.Screen name='Categories' component={Categories}/>
    <Stack.Screen name='cart' component={shoppingCart}/>
    <Stack.Screen name='CheckOut' component={CheckOut} options={{
          title: 'Ya casi terminamos',
        }}/>
    <Stack.Screen name='CheckOut2' component={CheckOut2} options={{
          title: 'Unos datos más...',
        }}/>
    <Stack.Screen name='CheckOut3' component={CheckOut3} options={{
          title: 'El último pasito',
        }}/>
    <Stack.Screen name='CheckOut4' component={CheckOut4} options={{
          title: 'A rockearla!',
        }}/>
    <Stack.Screen name="ProductsByCategory" component={ProductsByCategory}/>
    <Stack.Screen name='ProductScreen' component={ProductScreen} options={{
          title: 'Excelente elección!',
        }}/>
    <Stack.Screen name='Product' component={Product}/>

  </Stack.Navigator>
  )
} 
const categoriesNavigator=()=>{
  return (
    <Stack.Navigator screenOptions={{
      headerTitleStyle:{color:'white',fontWeight:'bold'},
      headerStyle:{
          backgroundColor:'rgba(6, 134, 200, 0.863)'}}}>
      <Stack.Screen name='Categories' component={Categories}/>
      <Stack.Screen name="ProductsByCategory" component={ProductsByCategory}/>
      <Stack.Screen name='ProductScreen' component={ProductScreen}/>
      <Stack.Screen name='Product' component={Product}/>
    </Stack.Navigator>
  )
}


const Navigation = (props) =>{
const {loggedUser, logout_user, login_AS, preservedShoppingCart} = props

  useEffect(() => {
    getData()
  },[])

  const getData=async()=>{
    //shopping cart
    try {
      if(await AsyncStorage.getItem('shoppingCart')){
        const shoppingCart = await AsyncStorage.getItem('shoppingCart')
        if(shoppingCart!== null||shoppingCart.length!==0) {
          if(Object.entries(shoppingCart).length !== 0){
            preservedShoppingCart(shoppingCart)
          }
        }
      } 
    }catch(error) {console.log('error',error)}
    //token
    try {
      const token = await AsyncStorage.getItem('token')
      if(loggedUser===null && token!== null) {
        login_AS(token)
        .then(respuesta => {
          if(respuesta.success) {
          }
        })
      }else{
      }
    } catch(error) {
    }
  }

    return(
    <NavigationContainer>
      <Drawer.Navigator drawerStyle={{ backgroundColor: 'rgba(55, 164, 184, 0.96)'}}  drawerContent={(props)=><CustomDrawer {...props}/>} >
         {loggedUser ? (
           <Drawer.Screen name="Categories" children={StackNavigator} /> 
         ) : (
           <>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="SignUp" component={SignUp} />

          </>
         )}
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