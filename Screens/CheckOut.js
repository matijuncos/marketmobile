import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { ToastAndroid } from 'react-native';
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

const CheckOut = (props) => {
    
    const [next,setNext] = useState(false) //CAMBIAR A FALSE!!!!!!!!!!!!!!
    const [address, setaddress] = useState({
        calle:'',
        altura:'',
        barrio:'',
        pisoDpto:'',
        encargadoDeRecibir:'',
        contactoReceptor:''
    })

    const validate = async () => {

        if (address.calle === '' || address.altura === ''  || address.encargadoDeRecibir===''|| address.contactoReceptor === '') {
            ToastAndroid.showWithGravity(
                'Complete los campos requeridos(*)',
                ToastAndroid.LONG,
                ToastAndroid.TOP
                )
                return false
        }
       const data = await props.completeUserData("adress",address)
       if(data.saved){
           ToastAndroid.show('Datos guardados', ToastAndroid.LONG)
           setNext(true)
       }

    }
    const nextStep = () =>{
        if(next){
            props.navigation.navigate('CheckOut2')
        }else{
            ToastAndroid.showWithGravity('Complete los campos requeridos(*) y guarde', ToastAndroid.LONG, ToastAndroid.TOP)
        }
    }
    return (
        <View style={{flex: 1, backgroundColor: 'rgb(16, 16, 16)', alignItems:'center'}}>
            <View style={{flex: 1}}>
                <ProgressSteps 
                    activeStepIconColor={'rgb(246, 246, 246)'}
                    disabledStepIconColor={'rgba(6, 134, 200, 0.863)'}
                    completedStepIconColor={'rgb(246, 246, 246)'}>
                    <ProgressStep >
                        <View style={{ alignItems: 'center' }}>
                        </View>
                    </ProgressStep>
                    <ProgressStep >
                        <View style={{ alignItems: 'center' }}>
                        </View>
                    </ProgressStep>
                    <ProgressStep >
                        <View style={{ alignItems: 'center' }}>
                        </View>
                    </ProgressStep>
                    <ProgressStep >
                        <View style={{ alignItems: 'center' }}>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>
            <View style={styles.bottomView}>
                <View>
                    <Text style={{width: '100%', fontSize:26, fontWeight: 'bold', textAlign: 'center'}}>
                        Datos de envío
                    </Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='Calle *'
                        onChangeText={(value)=>setaddress({...address, calle: value})}
                        />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='Altura *'
                        onChangeText={(value)=>setaddress({...address, altura: value})}

                        />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='Barrio'
                        onChangeText={(value)=>setaddress({...address, barrio: value})}

                        />
                </View>
                <View style={styles.inputView}>
                <TextInput
                        style={styles.input}
                        placeholder='Piso/Dpto'
                        onChangeText={(value)=>setaddress({...address, pisoDpto: value})}

                        />            
                </View>
                <View style={styles.inputView}>
                <TextInput
                        style={styles.input}
                        placeholder='¿Quién lo recibe? *'
                        onChangeText={(value)=>setaddress({...address, encargadoDeRecibir: value})}

                        />            
                </View>
                <View style={styles.inputView}>
                <TextInput
                        style={styles.input}
                        placeholder='Teléfono de quien recibe *'
                        onChangeText={(value)=>setaddress({...address, contactoReceptor: value})}

                        />            
                </View>
                <View style={{width:'90%', alignItems:'center', flexDirection: 'row', justifyContent:'center'}}>
                    <TouchableOpacity style={styles.button} onPress={validate}>
                        <Text style={styles.buttonText}>Guardar Datos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={nextStep}>
                        <Text style={styles.buttonText}>Siguiente</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView:{
        height: 40,
        borderRadius: 10,
        backgroundColor: '#f1f3f6',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width:'90%'
    },
    input:{
        height: 40,
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 10
    },
    bottomView: {
        backgroundColor: '#fff',
        opacity: 0.95,
        position: 'absolute',
        alignItems:'center',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
      },
      button:{
        backgroundColor: 'rgba(6, 134, 200, 0.863)',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        margin: 8

      },
      buttonText:{
        color: '#fff',
        fontSize: 18,

      }
})
const mapStateToProps = state =>{
    return{
        userData: state.user.userData
    }
  }
const mapDispatchToProps={
    completeUserData:userActions.completeUserData
}
export default connect(mapStateToProps,mapDispatchToProps)(CheckOut)