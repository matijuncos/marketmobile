import React, { useEffect, useState } from 'react';
import Product from '../components/Product'
import axios from 'axios'
import {StyleSheet,Text, View, StatusBar,Image,TouchableOpacity,ScrollView} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { Icon as RNEIcon } from 'react-native-elements';
import { useFonts } from 'expo-font';
import { Alert } from 'react-native';
import { connect } from 'react-redux';


const  ProductsByCategory = (props)=> {
  const {navigation} = props
  const category = props.route.params.category
    const [products, setProducts] = useState([])
    const [loading,setLoading]=useState(false)
    const [arrayProducts] = useState([
    {
        name:
          'HP 15s Ryzen 5 Quad Core - (8 GB/1 TB HDD/Windows 10 Home) 15s-GR0009AU',
        arrayPic: ['https://i.imgur.com/FVhuBzL.jpg'],
        arrayRatind:[],
        price: '41,990',
       category:'Amplificadores',
        arrayDescription: [
          '8 GB/1 TB HDD',
          'Windows 10 Home',
          '15.6 inch Full HD',
          'Thin and Light Laptop',
        ],
      },
      {
        name:
          'Dell Vostro Core i5 10th Gen - (8 GB/1 TB HDD/256 GB SSD/Windows 10 Home) Vostro 3491',
        arrayPic: ['https://i.imgur.com/XZIJXIq.jpg'],
        price: '53,490',
        category:'Amplificadores',
        arrayDescription: [
          '8 GB/1 TB HDD/256 GB SSD',
          'Windows 10 Home',
          '14 inch Full HD Display',
          'Without Optical Disk Drive',
        ],
      },
      {
        name:
          'Apple MacBook Pro Core i9 9th Gen - (16 GB/1 TB SSD/Mac OS Catalina/4 GB Graphics)',
        arrayPic: ['https://i.imgur.com/1ge8POI.jpg'],
        price: '2,24,900',
        category:'Bajos',
        arrayDescription: [
          '16 GB/1 TB SSD/4 GB Graphics',
          'Mac OS Catalina',
          '16 inch, Silver, 2 kg',
          'IPS Retina Display ',
        ],
      },
      {
        name:
          'Asus Vivobook Ryzen 5 Quad Core - (8 GB/1 TB HDD/Windows 10 Pro) D1401D-EK166',
        arrayPic: ['https://i.imgur.com/UvL33gA.jpg'],
        price: '50,900',
        category:'Bajos',
        arrayDescription: [
          '8 GB/1 TB HDD/Ryzen 5 Quad Core',
          'Windows 10 Pro',
          '14 inch, Transparent Silver',
          'Without Optical Disk Drive',
        ],
      },
    ]);
    
  useEffect(() =>{
    if(props.route.params.allProducts.length !== 0){
       const arrayCategory = props.route.params.allProducts.filter(product=> product.category === props.route.params.category)
      setProducts(arrayCategory)
    }
    header()
 },[])


 const header =  () =>{
   navigation.setOptions({
      title: category,
      headerTitleStyle: { fontSize: 22},
      headerStyle: { backgroundColor: 'rgba(6, 134, 200, 0.863)' },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer() }style={{ marginHorizontal: 10 }}>
          <Icon
            name='bar-chart-2'
            size={28}
            style={{ transform: [{ rotate: '90deg' }, { scaleX: -1 }] }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={()=>{props.navigation.navigate('cart')}}>
          <Icon name='shopping-cart' size={24} />
          <View style={[styles.iconCountView, { right: -6 }]}>
            <Text style={styles.iconCountText}>{props.shoppingCart.length}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
 }





  return (
    <>
      <ScrollView>
        {
            products.length !== 0 && products.map((product, idx) => (
                <Product product={product} navigation={navigation} key={idx+'prod'}/>
            ))
          }
      </ScrollView>
      <View style={{ height: 20 }}>

      </View>
    </>
  )};


const styles = StyleSheet.create({
  arrangeProductsBar: {
    flexDirection: 'row',
    paddingVertical: 14,
    backgroundColor: '#fafafa',
    borderBottomColor: '#dfe4ea',
    borderBottomWidth: 1,
  },
  arrangeProductsBarItemOpacity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrangeProductsBarItemLabel: {
    marginHorizontal: 10,
   
    fontSize: 20,
  },
  iconCountView: {
    position: 'absolute',
    zIndex: 2,
    right: -4,
    top: -4,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  iconCountText: { color: '#fff', fontWeight: 'bold' },
});

const mapStateToProps = state =>{
  return{
    shoppingCart:state.shopping.shoppingCart
  }
}
export default connect(mapStateToProps)(ProductsByCategory)