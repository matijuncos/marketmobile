import React,{useState} from 'react'
import { View, TextInput, StyleSheet, Switch, ScrollView } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { CreditCardInput } from "react-native-credit-card-input";
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import shoppingCartActions from '../redux/actions/shoppingCartActions';




const CheckOut3 = (props) => {
    const [values, setValues] = useState({
        number: "",
        expiry: "",
        cvc: "",
        name: "", 
    })
 const readInputs = (formdata) =>{
    setValues(JSON.stringify(formdata.values))

 }
const validateCard = async () =>{
    if (values.number === '' || values.name === '' || values.cvc === '' || values.expiry === '') {
        ToastAndroid.showWithGravity('Complete los campos requeridos(*) y guarde', ToastAndroid.LONG, ToastAndroid.TOP)
        return false
    }
    console.log(values)
    const data = await props.completeUserData("cardFields",values)

    if(data.saved){
        ToastAndroid.showWithGravity('Datos guardados', ToastAndroid.LONG, ToastAndroid.TOP)
//     setFinish(true)
   
    }
}

  const lastStep = () =>{
      props.clearCart()
    props.navigation.navigate('CheckOut4')
  }
    return (
        <View style={{flex: 1, backgroundColor: 'rgb(16, 16, 16)', alignItems:'center'}}>
            <View style={{flex: 1}}>
                <ProgressSteps 
                    activeStep={2}
                    activeStepIconColor={'rgb(246, 246, 246)'}
                    disabledStepIconColor={'rgba(6, 134, 200, 0.863)'}>
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
            <View style={styles.creditCard}>
            </View>
            <View style={styles.bottomView}>
            <CreditCardInput
              autoFocus
              requiresName
              requiresCVC
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              onChange={readInputs} />
                    <View style={{width:'90%', alignItems:'center', flexDirection: 'row', justifyContent:'center'}}>
                        <TouchableOpacity style={styles.button} onPress={validateCard}>
                            <Text style={styles.buttonText}>Guardar Datos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText} onPress={lastStep}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
   )
}

const styles = StyleSheet.create({

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
        paddingBottom: 100,
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
      }})


    const mapDispatchToProps={
        completeUserData:userActions.completeUserData,
        clearCart:shoppingCartActions.clearCart

    }
    export default connect(null,mapDispatchToProps)(CheckOut3)