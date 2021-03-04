import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import BackgroundImage from '../assets/hero.jpg'
import * as Animatable from 'react-native-animatable';
import {GoogleSignin, GoogleSigninButton} from '@react-native-community/google-signin'

GoogleSignin.configure({
  webClientId: '225799266122-gmus3gf7k57dp86h5togfcjlni8os3fr.apps.googleusercontent.com',
  offlineAccess: true
})

const SignIn = () => {

const [userGoogleInfo, setUserGoogleInfo] = useState({})
const [loaded, setLoaded] = useState(false)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image
          style={{ flex: 1, width: '100%' }}
          source={BackgroundImage}
        />
      </View>
      <Animatable.Text
        style={styles.titleText}
        animation='fadeInDown'
        delay={1200}
      >
        GitMusic
      </Animatable.Text>
      <View style={styles.bottomView}>
        <Text style={styles.loginText}>Inicia sesión</Text>
        <View style={styles.inputView}>
          <Icon
            style={styles.inputIcon}
            name='person'
            type='ionicons'
            color='rgba(6, 134, 200, 0.863)'
          />
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu email'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={styles.inputIcon}
            name='lock'
            type='ionicons'
            color='rgba(6, 134, 200, 0.863)'
          />
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu contraseña'
            secureTextEntry={true}
            autoCapitalize='none'
          />
        </View>
        <Text style={styles.fpText}>Olvidaste tu contraseña?</Text>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
        Aún no tenes cuenta?
          <Text style={{ color: 'rgba(6, 134, 200, 0.863)'}}>
            Registrate
          </Text>
        </Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.1,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  bottomView: {
    backgroundColor: '#fff',
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f3f6',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: 'rgba(6, 134, 200, 0.863)',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
  },
  registerText: {
    alignSelf: 'center',
    marginTop: 12,
    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontSize: 16,
    color: 'rgba(6, 134, 200, 0.863)',
  },
});

export default SignIn
