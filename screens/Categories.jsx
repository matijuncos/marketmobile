import React, { useEffect, useState } from 'react';
import Product from '../components/Product'
import axios from 'axios'
import {StyleSheet,Text, View, StatusBar,Image,TouchableOpacity,ScrollView} from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';

// npm i react-native-elements
import { Icon as RNEIcon } from 'react-native-elements';

import { useFonts } from 'expo-font';

/* import SSLight from '../../assets/fonts/SourceSansPro/SourceSansProLight.ttf';
import SSRegular from '../../assets/fonts/SourceSansPro/SourceSansProRegular.ttf';
import SSBold from '../../assets/fonts/SourceSansPro/SourceSansProBold.ttf'; */


export default function Categories({ navigation }) {
    const loaded=true
 /*  const [loaded] = useFonts({
    SSLight,
    SSRegular,
    SSBold,
  });
 */const [arrayProducts,setArrayProducts] = useState([
    {
        name:
          'HP 15s Ryzen 5 Quad Core - (8 GB/1 TB HDD/Windows 10 Home) 15s-GR0009AU',
        arrayPic: ['https://i.imgur.com/FVhuBzL.jpg'],
        arrayRatind:[],
        price: '41,990',
       
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
        arrayDescription: [
          '8 GB/1 TB HDD/Ryzen 5 Quad Core',
          'Windows 10 Pro',
          '14 inch, Transparent Silver',
          'Without Optical Disk Drive',
        ],
      },
    ]);

 useEffect(() =>{
     fetchear()
     .then(console.log('hola'))
    
 },[])

 const fetchear = async () =>{
    try{
       const data = await axios.get('http://192.168.0.3:4000/api/products')
       if(data){
           console.log(data)}

    }catch(error){
        console.log(error)
    }
   

 }


  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

 /*  if (!loaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    ); 
  } else {
    navigation.setOptions({
      title: 'Laptops',
      headerTitleStyle: { fontSize: 22, fontFamily: 'SSBold' },
      headerStyle: { backgroundColor: '#f6e58d' },
      headerLeft: () => (
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <Icon
            name='bar-chart-2'
            size={28}
            style={{ transform: [{ rotate: '90deg' }, { scaleX: -1 }] }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginHorizontal: 10 }}>
          <Icon name='shopping-cart' size={24} />
          <View style={[styles.iconCountView, { right: -6 }]}>
            <Text style={styles.iconCountText}>4</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  } */
  console.warn(arrayProducts)
  if(arrayProducts.length===0){
      return(
          <Text>Loading...</Text>
      )
  }else{
  return (
    <>
      {/* Arrange Products Bar */}
      <View style={styles.arrangeProductsBar}>
        <TouchableOpacity
          style={[
            styles.arrangeProductsBarItemOpacity,
            { borderRightColor: '#dfe4ea', borderRightWidth: 1 },
          ]}
        >
          <RNEIcon name='sort-amount-down' type='font-awesome-5' size={20} />
          <Text style={styles.arrangeProductsBarItemLabel}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrangeProductsBarItemOpacity}>
          <View>
            <RNEIcon name='filter' type='font-awesome-5' size={20} />
            <View style={styles.iconCountView}>
              <Text style={styles.iconCountText}>2</Text>
            </View>
          </View>
          <Text style={styles.arrangeProductsBarItemLabel}>Filter</Text>
        </TouchableOpacity>
      </View>
      {/* Products List */}
      <ScrollView>
        {Array(5)
          .fill(1)
          .map((el) =>
            arrayProducts.map((product) => (
              <TouchableOpacity>
                <Product product={product} />
              </TouchableOpacity>
            ))
          )}
      </ScrollView>
      <View style={{ height: 20 }}></View>
    </>
  )};
}

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