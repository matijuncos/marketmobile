import React from 'react'
import {  DrawerItem, DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { ToastAndroid, StyleSheet, Image } from 'react-native';
import { Text, View } from 'react-native';
import {Icon} from 'react-native-elements'

import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomDrawer(props) {
  const {navigation, loggedUser, signOut, googleLog} = props
  const signOutFunction = async () =>{
      const response = await signOut()
      ToastAndroid.showWithGravity(
        "Hasta pronto!",
        ToastAndroid.LONG,
        ToastAndroid.TOP
        ) 
       const res = await AsyncStorage.clear()
       navigation.navigate('Login')
  }
      
  return (
    <DrawerContentScrollView  {...props}>
      {loggedUser ? (
        <>
            <DrawerItem label="Categories" onPress={()=>navigation.navigate('Categories')} icon={() => <Icon name='list-outline' type='ionicon' color='rgb(25, 25, 25)'/>} />
            <DrawerItem label="Sign Out" onPress={signOutFunction} icon={() => <Icon name='log-out-outline' type='ionicon' color='rgb(25, 25, 25)'/>} />
          </>
      ):(
        <>
        <DrawerItem label="Categories" onPress={()=>navigation.navigate('Categories')} icon={() => <Icon name='list-outline' type='ionicon' color='rgb(25, 25, 25)'/>} />
        <DrawerItem label="Sign In" onPress={()=>navigation.navigate('Login')} icon={() => <Icon name='log-in-outline' type='ionicon' color='rgb(25, 25, 25)'/>} />
        <DrawerItem label="Sign Up" onPress={()=>navigation.navigate('SignUp')} icon={() => <Icon name='person-outline' type='ionicon' color='rgb(25, 25, 25)'/>} />
        </>
  )}
    </DrawerContentScrollView>

  );
}
const styles = StyleSheet.create({
  textUser:{
    fontWeight: 'bold'
  },
  viewUser:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
})
const mapStateToProps = state =>{
  return{
    loggedUser: state.user.loggedUser,
    googleLog: state.user.googleLog
  }
}
const mapDispatchToProps = {
  signOut: userActions.logout_user,
  login_AS: userActions.login_AS
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)