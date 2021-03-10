import React, { useState, useEffect, useRef} from 'react';
import { FlatList, StyleSheet,Text, View, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements'
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { ToastAndroid } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import shoppingCartActions from '../redux/actions/shoppingCartActions';
import {connect} from 'react-redux'
import { color } from 'react-native-reanimated';

const shoppingCart = ({navigation,shoppingCart,editProductCart,deleteProductCart,clearCart,loggedUser}) => {
    var total=shoppingCart.reduce((obj,data)=>{obj += (data.quantity*data.product.price); return obj; }, 0)
    useEffect(() => {
        navigation.setOptions({
            title: 'Tu Carrito!',
            headerTitleStyle: { fontSize: 22},
            headerStyle: { backgroundColor: 'rgba(6, 134, 200, 0.863)' },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.toggleDrawer() }style={{ marginHorizontal: 10 }}>
                <Feather
                  name='bar-chart-2'
                  size={28}
                  style={{ transform: [{ rotate: '90deg' }, { scaleX: -1 }] }}
                />
              </TouchableOpacity>
            ),
    
          });
    }, [])
    
    const manageQuantityForStock=(value,product)=>{
        editProductCart(value,product)
    }
    const removeProduct = (idProduct) =>{
        deleteProductCart(idProduct)
        ToastAndroid.showWithGravity(
            'Articulo eliminado.',
            ToastAndroid.SHORT,
            ToastAndroid.BUTTON
        )
    }
    return (
        <SafeAreaView  style={{flex:1}}>
            <View style={styles.container}>
                <View style={{flex: 1,height:'100%'}}>
                    <FlatList
                        data={shoppingCart}
                        keyExtractor={(data, index) =>index.toString()}
                        renderItem={({ item }) => {
                            return (<View style={styles.itemContainer}>
                                <View style={styles.listItem} onPress={() => this.onPressMoreDetails(item)}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item.product.arrayPic[0] }}
                                    />
                                    <View style={styles.content}>
                                        <View style={styles.details}>
                                            <Text style={styles.adTitle}>{item.product.name}</Text>
                                            <Text style={{color:'green',fontSize:16,fontWeight:'bold',marginBottom:5}}>${item.product.price}</Text>
                                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                                <InputSpinner
                                                        skin="modern"
                                                        shadow= {true}
                                                        fontSize={14}
                                                        buttonFontSize={16}
                                                        colorMax={"#f04048"}
                                                        colorMin={"rgba(6, 134, 200, 0.863)"}
                                                        style={{width: '10%', height:30}}
                                                        min={1}
                                                        max={item.product.stock}
                                                        height={50}
                                                        color={'rgba(6, 134, 200, 0.863)'}
                                                        value={item.quantity}
                                                        onChange={(num) => {
                                                            manageQuantityForStock(num,item);
                                                        }}
                                                        onMax={(max)=>{
                                                            ToastAndroid.showWithGravity(
                                                                `No podes exceder el stock(${max}) del articulo.`,
                                                                ToastAndroid.SHORT,
                                                                ToastAndroid.TOP
                                                            );
                                                        }}
                                                        onMin={(min)=>{
                                                            ToastAndroid.showWithGravity(
                                                                `Debes tener almenos 1.`,
                                                                ToastAndroid.SHORT,
                                                                ToastAndroid.TOP
                                                            );
                                                        }}
                                                    />     
                                                    <View style={styles.closeBtnWrapper}>
                                                        <TouchableOpacity style={styles.closeBtn} onPress={()=>removeProduct(item.idProduct)}>
                                                            <Icon name="trash-outline" type='ionicon'size={35} color="#F44336" />
                                                        </TouchableOpacity>
                                                    </View>                          
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>)
                        }}
                    />
                </View>
                <View style={{flexDirection:'row', alignItems: 'center', width:'100%', height:'8%', justifyContent:'space-between',backgroundColor:'·f8f8f8'}}>
                    <TouchableOpacity onPress={() => clearCart()} style={styles.buttonClear}>
                        <Text style={styles.buttonText}>Vaciar C</Text>
                    </TouchableOpacity>
                    <View style={{height:'100%',width:'30%',backgroundColor:'black'}}><Text style={styles.total}>Total </Text><Text style={styles.total}>${total}</Text></View>
                    <TouchableOpacity onPress={() => navigation.navigate('CheckOut')} style={styles.buyMeButton}>
                        <Text style={styles.buttonText}>Terminar compra</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 29,
        color: '#fff'
    },
    listItem: {
        margin: 4,
        flexDirection: 'row',
    },
    image: {
        flex: 1,
        borderRadius: 40,
        resizeMode: 'center'
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#c6c6c6',
        marginVertical:5
    },
    content: {
        flex: 2,
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    details: {
        flex: 2,
    },
    closeBtnWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtn: {
        height: 50,
        width: 50,
        borderRadius: 90,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    qty: {
        fontWeight: '400',
        fontSize: 15,
    },
    price: {
        fontWeight: '400',
        fontSize: 15,
        color: 'red'
    },
    adTitle: {
        fontWeight: '600',
        fontSize: 17,
        margin: 5,
        fontWeight: 'bold',
        textAlign:'center'
    },
    input: {
        borderColor: 'rgb(16,16,16)',
        borderWidth: 1,
        width: '30%',
        marginVertical: 6,
        paddingVertical:0,
        paddingLeft: 4,
        marginHorizontal: 8

    },
    buttonContainer: {

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent:'space-between'
    },
    buyMeButton: {
        height:'100%',
        width:'35%',
        backgroundColor: 'green',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius:2
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        textAlign:'center',
        fontWeight:'bold',
        borderRadius:2
    },
    buttonClear:{
        height:'100%',
        width:'35%',
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems: 'center',
    },
    spinner:{
        // flex: 1,
		// marginRight: 10,
        // width:'30%',
        // height:20,
    },
    total:{
        color:'white',
        fontWeight:'bold',
        fontSize:16,
        textAlign:'center'
    }
})
const mapStateToProps = state =>{
    return{
        shoppingCart:state.shopping.shoppingCart,
        loggedUser:state.user.loggedUser
    }
}
const mapDispatchToProps={
    editProductCart:shoppingCartActions.editProductCart,
    deleteProductCart:shoppingCartActions.deleteProductCart,
    clearCart:shoppingCartActions.clearCart
}
export default connect(mapStateToProps,mapDispatchToProps)(shoppingCart)