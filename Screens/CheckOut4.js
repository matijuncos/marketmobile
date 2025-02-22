import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { Image } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { connect } from 'react-redux';
import shoppingCartActions from '../redux/actions/shoppingCartActions';

const CheckOut4 = (props) => {


    return (
        <View style={{flex: 1, backgroundColor: 'rgb(26, 26, 26)', alignItems:'center', justifyContent:'space-around'}}>
                       <View style={{flex: 1}}>
                <ProgressSteps 
                    activeStep={3}
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
            <View style={styles.bottomView}>
                <Text style={styles.title}>Listo!</Text>
                <Text style={styles.text}>Ahora celebrá y esperá tu pedido!</Text>
                <Image source={{uri: 'https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/source.gif'}} style={{width: 300, height: 300, marginBottom: 20}} />        
                <TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate('Categories')}>
                    <Text style={styles.buttonText}>
                        Ver más productos
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

      text:{
        color: 'rgb(16, 16, 16)',
        fontSize: 22,
        textAlign:'center',
        marginBottom: 35
      },
      title:{
        color: 'rgb(16, 16, 16)',
        fontSize: 22,
        textAlign:'center',
        marginBottom: 10,
        fontWeight: 'bold'
      },
      button:{
        backgroundColor: 'rgba(6, 134, 200, 0.863)',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10
      },
      buttonText:{
        color: '#fff',
        fontSize: 18,
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
      }
})

const mapStateToProps = state =>{
    return{
        loggedUser: state.user.loggedUser,
        userData: state.user.userData,
        shoppingCart: state.shopping.shoppingCart
    }
}

const mapDispatchToProps= {
    emailShopCart:shoppingCartActions.emailShopCart
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckOut4)
