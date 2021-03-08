import React,{useState} from 'react'
import { View, TextInput, StyleSheet, Switch, ScrollView } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

const CheckOut2 = (props) => {
    const [values, setValues] = useState({
        number: "",
        expiry: "",
        cvc: "",
        name: "", 
    })
 const readInputs = (formdata) =>{
    setValues(JSON.stringify(formdata.values))

 }
const validateCard = () =>{
    console.log(values)
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
                <CreditCardInput onChange={readInputs} requiresName/>
                    <View style={{width:'90%', alignItems:'center', flexDirection: 'row', justifyContent:'center'}}>
                        <TouchableOpacity style={styles.button} onPress={validateCard}>
                            <Text style={styles.buttonText}>Guardar Datos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText} onPress={()=>props.navigation.navigate('CheckOut4')}>Siguiente</Text>
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
export default CheckOut2
