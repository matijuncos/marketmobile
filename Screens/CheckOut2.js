import React, {useState, useEffect} from 'react'
import { View, TextInput, StyleSheet,ToastAndroid } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

const CheckOut2 = (props) => {

    const [next,setNext] = useState(false) 
    const [billingAddress, setBillingAddress] = useState({
        nombre:'',
        tipoFactura:'',
        cuitCuilDni:'',
        contacto:''
    })

    
    const validate = async () => {

        if (billingAddress.nombre === '' || billingAddress.cuitCuilDni === '' ||  billingAddress.tipoFactura === '' ||billingAddress.contacto === '') {
            ToastAndroid.showWithGravity('Todos los campos son requieridos', ToastAndroid.LONG, ToastAndroid.TOP)
            return false
            }
           const data = await props.completeUserData("billingAdress",billingAddress)
          if(data.saved){
            ToastAndroid.showWithGravity('Datos guardados', ToastAndroid.LONG, ToastAndroid.TOP)
           setNext(true)
          }
           
       }

       const nextStep = () =>{
        if(next){
            props.navigation.navigate('CheckOut3')
        }else{
            ToastAndroid.showWithGravity('Complete los campos requeridos(*) y guarde', ToastAndroid.LONG, ToastAndroid.TOP)
        }
    }
    return (
        <View style={{flex: 1, backgroundColor: 'rgb(16, 16, 16)', alignItems:'center'}}>
            <View style={{flex: 1}}>
                <ProgressSteps activeStep={1}
                 activeStepIconColor={'rgb(246, 246, 246)'}
                 disabledStepIconColor={'rgba(6, 134, 200, 0.863)'}
                 >
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
                        placeholder='Nombre y apellido'
                        onChangeText={(value)=>setBillingAddress({...billingAddress, nombre: value})}

                        />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='CUIT/CUIL/DNI'
                        onChangeText={(value)=>setBillingAddress({...billingAddress, cuitCuilDni: value})}

                        />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='Teléfono'
                        onChangeText={(value)=>setBillingAddress({...billingAddress, contacto: value})}

                        />
                </View>
                <View style={styles.inputView}>
                <TextInput
                        style={styles.input}
                        placeholder='Tipo de factura'
                        onChangeText={(value)=>setBillingAddress({...billingAddress, tipoFactura: value})}

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
export default connect(mapStateToProps,mapDispatchToProps)(CheckOut2)
