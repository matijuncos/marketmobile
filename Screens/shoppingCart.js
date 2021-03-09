import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet,Text, View, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements'
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { ToastAndroid } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import shoppingCartActions from '../redux/actions/shoppingCartActions';
import {connect} from 'react-redux'
const shoppingCart = ({navigation,shoppingCart,editProductCart,deleteProductCart,clearCart,loggedUser}) => {
    console.log(loggedUser)
    const [state, setstate] = useState([])
    useEffect(() => {
      setstate([
          {product: {"name":"test1","category":"Guitarra","price": 15000,"arrayPic":["https://media.fanaticguitars.com/2021/01/guitarra-clasica-1024x683.jpg","https://media.fanaticguitars.com/2021/01/guitarra-clasica-1024x683.jpg"],"stock":3, "_id":"60412a851950cc0015db878c"},"quantity": 8, "idProduct":"60412a851950cc0015db878c"},
          {product: 
            {
                "name":"test2",
                "category":"Amplificador",
                "price": 38000,
                "arrayPic":["https://media.fanaticguitars.com/2021/01/guitarra-clasica-1024x683.jpg","https://media.fanaticguitars.com/2021/01/guitarra-clasica-1024x683.jpg"],
                "stock":20,
                "_id":"60412a851950cc0015db878c"
            },
            "idProduct":"60412a851950cc0015db878c",
            "quantity": 2, 
        }
      ])
    }, [])
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
    const removeProduct = () =>{
        ToastAndroid.showWithGravity(
            'borrar del carrito',
            ToastAndroid.SHORT,
            ToastAndroid.TOP
        )
    }
    return (
        <SafeAreaView  style={{flex:1}}>
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    {/* <View style={styles.titleContainer}>
                        <Text style={styles.title}>Jewellery</Text>
                    </View> */}
                    <FlatList
                        data={state}
                        renderItem={({ item }) => {
                            console.log(item)
                            return (<View style={styles.itemContainer}>
                                <View style={styles.listItem} onPress={() => this.onPressMoreDetails(item)}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: 'https://media.fanaticguitars.com/2021/01/guitarra-clasica-1024x683.jpg' }}
                                    />
                                    <View style={styles.content}>
                                        <View style={styles.details}>
                                            <Text style={styles.adTitle}>{item.product.name}</Text>
                                            <Text style={styles.adTitle}>${item.product.price}</Text>
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
                                                        value={1}
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
                                            </View>
                                        </View>
                                        <View style={styles.closeBtnWrapper}>
                                            <TouchableOpacity style={styles.closeBtn} onPress={removeProduct}>
                                                <Icon name="trash-outline" type='ionicon'size={35} color="#F44336" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>)
                        }}
                    />
                </View>
                <View>
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
        borderBottomColor: '#c6c6c6'

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
        fontSize: 19,
        margin: 5,
        fontWeight: 'bold'
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
    },
    buyMeButton: {
        backgroundColor: 'rgba(6, 134, 200, 0.863)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        alignItems: 'center',
        padding: 12,
        width: '100%',
        marginBottom: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500'
    },
    spinner:{
        // flex: 1,
		// marginRight: 10,
        // width:'30%',
        // height:20,
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