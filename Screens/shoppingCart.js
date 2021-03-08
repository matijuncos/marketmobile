import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet,Text, View, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements'
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { ToastAndroid } from 'react-native';
import InputSpinner from "react-native-input-spinner";

const shoppingCart = (props) => {

    const [state, setstate] = useState([])

    useEffect(() => {
      setstate([
          {name: "Guitarra", price: 15000, quantity: 8},
          {name: "Amplificador", price: 60000, quantity: 2}
      ])
    }, [])

    props.navigation.setOptions({
        title: 'Tu Carrito!',
        headerTitleStyle: { fontSize: 22},
        headerStyle: { backgroundColor: 'rgba(6, 134, 200, 0.863)' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => props.navigation.toggleDrawer() }style={{ marginHorizontal: 10 }}>
            <Feather
              name='bar-chart-2'
              size={28}
              style={{ transform: [{ rotate: '90deg' }, { scaleX: -1 }] }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity style={{ marginHorizontal: 10 }}>
            <Feather name='shopping-cart' size={24} />
            <View style={[styles.iconCountView, { right: -6 }]}>
              <Text style={styles.iconCountText}>4</Text>
            </View>
          </TouchableOpacity>
        ),
      });
    const removeProduct = () =>{
        ToastAndroid.showWithGravity(
            'borrar del carrito',
            ToastAndroid.SHORT,
            ToastAndroid.TOP
          );    }
    return (
        <SafeAreaView  style={{flex:1}}>
                <View style={styles.container}>
                <View style={{flex: 1}}>
                    {/* <View style={styles.titleContainer}>
                        <Text style={styles.title}>Jewellery</Text>
                    </View> */}
                    <FlatList
                        data={state}
                        extraData={props}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <View style={styles.listItem} onPress={() => this.onPressMoreDetails(item)}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: 'https://media.fanaticguitars.com/2021/01/guitarra-clasica-1024x683.jpg' }}
                                    />
                                    <View style={styles.content}>
                                        <View style={styles.details}>
                                            <Text style={styles.adTitle}>{item.name}</Text>
                                            <Text style={styles.adTitle}>${item.price}</Text>
                                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                                <InputSpinner
                                                        skin="modern"
                                                        shadow= {true}
                                                        fontSize={14}
                                                        max={10}
                                                        buttonFontSize={16}
                                                        colorMax={"#f04048"}
                                                        colorMin={"rgba(6, 134, 200, 0.863)"}
                                                        style={{width: '10%', height:30}}
                                                        min={1}
                                                        height={50}
                                                        color={'rgba(6, 134, 200, 0.863)'}
                                                        value={1}
                                                        onChange={(num) => {
                                                            console.log(num);
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
                            </View>
                        )}
                    />
                </View>
                <View>
                <TouchableOpacity onPress={() => this._onPressCheckoutProducts(state)} style={styles.buyMeButton}>
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
export default shoppingCart