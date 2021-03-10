import React from 'react'
import {  DrawerItem, DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { ToastAndroid, StyleSheet, Image } from 'react-native';
import { Text, View } from 'react-native';
import {Icon} from 'react-native-elements'

import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomDrawer(props) {
  const {navigation, loggedUser, signOut } = props

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
    <DrawerContentScrollView {...props}>
      {loggedUser ? (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12}}>
              <Image source={{uri: loggedUser.pic}} style={{width: 30, height: 30, borderRadius: 20}}/>
              <Text style={{marginHorizontal: 25, fontWeight: 'bold'}}>Hola {loggedUser.firstName}!</Text>
            </View>
            <DrawerItem label="Categorías" onPress={()=>navigation.navigate('Categories')} icon={() => <Icon name='list-outline' type='ionicon' color='rgb(10, 10, 10)'/>} labelStyle={{fontWeight:'bold', color:'rgb(10, 10, 10)', fontSize: 16}}/>
            <DrawerItem label="Cerrar sesión" onPress={signOutFunction} icon={() => <Icon name='log-out-outline' type='ionicon' color='rgb(10, 10, 10)'/>} labelStyle={{fontWeight:'bold', color:'rgb(10, 10, 10)', fontSize: 16}}/>
          </>
      ):(
        <>
          <DrawerItem label="Categorías" onPress={()=>navigation.navigate('Categories')} icon={() => <Icon name='list-outline' type='ionicon' color='rgb(10, 10, 10)'/>} />
          <DrawerItem label="Iniciar sesión" onPress={()=>navigation.navigate('Login')} icon={() => <Icon name='log-in-outline' type='ionicon' color='rgb(10, 10, 10)'/>} />
          <DrawerItem label="Registrate" onPress={()=>navigation.navigate('SignUp')} icon={() => <Icon name='person-outline' type='ionicon' color='rgb(10, 10, 10)'/>} />
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