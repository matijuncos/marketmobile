import React,{useEffect, useState} from 'react'
import { Button, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import BackgroundImage from '../assets/hero.jpg'
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions'
import { ToastAndroid } from 'react-native';
import * as Google from 'expo-google-app-auth'

const SignIn = (props) => {
  const {loginUser, loggedUser} = props
  const [errores, setErrores] = useState('')
  const [user, setUser] = useState({email: '', password: ''})

  const validate = async e => {
    if (user.email ==='' || user.password === '') {
        setErrores('Todos los campos son requeridos')
        ToastAndroid.showWithGravity(
          errores,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
        return false
    }
    const response = await loginUser(user)
    if (response && !response.success) {
        setErrores(response.error)
        ToastAndroid.showWithGravity(
          errores,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        )
        setUser({email: '', password: ''})
    }else{
      console.log(response)
      //props.navigation.navigate('Categories')
    }
  }
  const signInWithGoogle = async () =>{
    try {
      const response = await Google.logInAsync({
        androidClientId:
        '225799266122-c20j29i4k2ra4sbipb2ngc00lud2pv06.apps.googleusercontent.com',
        scopes: ["profile", "email"]
      })
      if (response.type === "success") {
        const response2 = await loginUser({"email":response.user.email,"password":`Aa${response.user.id}`})
        if (response2 && !response2.success) {
            setErrores(response2.error)
            ToastAndroid.showWithGravity(
              errores,
              ToastAndroid.SHORT,
              ToastAndroid.TOP
            )
            setUser({email: '', password: ''})
        }else{
          console.log(response2)
        }
        props.navigation.navigate('Categories')
      } else {
        ToastAndroid.showWithGravity(
          'Cancelado por el usuario',
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        )
      }
    } catch (e) {
      ToastAndroid.showWithGravity(
        `Error: ${e}`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      )
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
          <Image source={require('../assets/gitLogo.png')} style={{width: 120, height: 120, position: 'absolute', zIndex: 999, top: '25%', left: '34%'}}/>
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
              onChangeText={(value) => setUser({...user, email: value})}
              value={user.email}
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
              onChangeText={(value) => setUser({...user, password: value})}
              value={user.password}
            />
          </View>
          <Text style={styles.fpText}>Olvidaste tu contraseña?</Text>
          <TouchableOpacity style={styles.loginButton} onPress={validate}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={signInWithGoogle}>
            <Text style={styles.loginButtonText}>Inicia sesión con Google</Text>
          </TouchableOpacity>
          <Text style={styles.registerText} onPress={()=> props.navigation.navigate('SignUp')}>
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
const mapStateToProps = state => {
  return{
    loggedUser: state.user.loggedUser
  }
}
const mapDispatchToProps = {
  loginUser: userActions.loginUser
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
