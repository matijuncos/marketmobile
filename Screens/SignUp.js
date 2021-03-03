import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import BackgroundImage from '../assets/hero.jpg'
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';


const SignUp = () => {
  const[picture, setPicture] = useState(null)
  const[newUser, setNewUser] = useState({firstName:'', lastName:'', fileUrlPic:'', email:'', password:'', google:'false'})

    const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Se requiren permisos para acceder a imágenes");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if(pickerResult.cancelled === true){
      return;
    }
    setPicture({...userActions, filUrlPic: pickerResult.uri})
  }

  const validate = () =>{
    const fdNewUser = new FormData()
    fdNewUser.append('firstName', newUser.firstName)
    fdNewUser.append('lastName', newUser.lastName)
    fdNewUser.append('fileUrlPic', newUser.fileUrlPic)
    fdNewUser.append('email', newUser.email)
    fdNewUser.append('password', newUser.password)
    fdNewUser.append('google', newUser.google)

    const res = await SignUp(fdNewUser)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image style={{ flex: 1, width: null }} source={BackgroundImage}/>
      </View>
      <Animatable.Text style={styles.titleText} animation='fadeInDown' delay={1200} >
        GitMusic
      </Animatable.Text>
      <View style={styles.bottomView}>
        <Text style={styles.loginText}>Registrate</Text>
        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name='person' type='ionicons' color='rgba(6, 134, 200, 0.863)'/>
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu nombre'
            autoCapitalize='none'
            onChangeText={(value)=>setNewUser({...newUser, firstName: value})}
          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={styles.inputIcon}
            name='person'
            type='ionicons'
            color='rgba(6, 134, 200, 0.863)'
          />
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu apellido'
            autoCapitalize='none'
            onChangeText={(value)=>setNewUser({...newUser, lastName: value})}

          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={styles.inputIcon}
            name='mail'
            type='ionicons'
            color='rgba(6, 134, 200, 0.863)'
          />
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu email'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            onChangeText={(value)=>setNewUser({...newUser, email: value})}

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
            onChangeText={(value)=>setNewUser({...newUser, password: value})}

          />
        </View>
        <View style={styles.inputView}>
          <Icon
            style={styles.inputIcon}
            name='camera'
            type='ionicons'
            color='rgba(6, 134, 200, 0.863)'
          />
          
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Elige una foto</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Image source={picture && {uri: picture.localUri }} style={styles.thumbnail} />
      </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={validate}>
          <Text style={styles.loginButtonText}>Registrate</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
        Ya tenes cuenta?
          <Text style={{ color: 'rgba(6, 134, 200, 0.863)'}}>
            Inicia sesión
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
    elevation: 26,
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
  thumbnail: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    marginLeft: '50%',
    borderRadius: 25

  }
  
});


const mapDispatchToProps = {
  SignUp: userActions.createNewUser
}
export default connect(null, mapDispatchToProps)(SignUp)
