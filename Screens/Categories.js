import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert, Image} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from 'react-native-elements';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import productActions from '../redux/actions/productActions'
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';


const Categories = (props) => {
  const {allProducts,getProducts, navigation, shoppingCart} = props
  useEffect(() => {

    getProducts()

    header()
  },[shoppingCart])
  const categories = [{name: 'Accesorios', pic: 'https://cdn.evance.me/portal/web/296/content/images/guitar-picks/tortex-guitarr-picks.png'},
  {name: 'Amplificadores', pic: 'https://www.wallpaperuse.com/wallp/9-99781_m.jpg'},
  {name: 'Bajos', pic: 'https://cdn.shopify.com/s/files/1/1413/0250/products/yamaha-trbx505tbl-bass-guitar-trans-black_666x518.jpg?v=1555294252'},
  {name: 'Guitarras', pic: 'https://www.gearank.com/sites/default/files/styles/large/public/field/image/Types-of-Acoustic-Guitars.jpg?itok=IITs3aFo'},
  {name: 'Pedales y pedaleras', pic: 'https://i0.wp.com/100lecciones.org/wp-content/uploads/pedal-de-guitarra-2.jpg?fit=800%2C443&ssl=1'}, 
  {name: 'Percusión', pic: 'https://www.worldofmusic.com.au/wp-content/uploads/2019/12/Pearl-Roadshow-Junior-Jet-Black.jpg'}, 
  {name: 'Teclados', pic: 'https://http2.mlstatic.com/D_NQ_NP_768004-MLA41768648746_052020-O.jpg'}, 
  { name: 'Sonido', pic: 'https://files.soniccdn.com/files/2015/07/02/dlive-s3000.png'}];
  
  const header = () =>{
    props.navigation.setOptions({
      title: 'Categorías',
      headerTitleStyle: { fontSize: 22, color:'white'},
      headerStyle: { backgroundColor: 'rgba(6, 134, 200, 0.863)' },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer() }style={{ marginHorizontal: 10 }}>
          <Feather
            name='bar-chart-2'
            size={28}
            style={{ transform: [{ rotate: '90deg' }, { scaleX: -1 }] }}
            color={'white'}

          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={()=>navigation.navigate('cart')}>
          <Feather name='shopping-cart' size={24} color={'white'}/>
          <View style={[styles.iconCountView, { right: -6 }]}>
            <Text style={styles.iconCountText}>{shoppingCart && shoppingCart.length}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }


  return (
    <View style={{backgroundColor: 'rgb(16, 16, 16)', flex: 1}}>
      <StatusBar/>
      <View style={{padding: 30, alignItems:'center'}}>
      <Image source={require('../assets/gitLogo.png')} style={{width: 90, height: 90}}/>
        <Text style={{color: 'white', fontSize: 20}}>Elegí la categoría de tu instrumento</Text>
      </View>
       <FlatList
       style={{backgroundColor: 'rgb(16, 16, 16)'}}
        data={categories}
        keyExtractor={(data, index) => index.toString()}
        renderItem={(data, rowMap) => (
          <TouchableWithoutFeedback
            onPress={() => {
             props.navigation.navigate('ProductsByCategory',{category:data.item.name, allProducts: allProducts})
              ;
            }}>
            <View style={{backgroundColor: '#f1f3f6', paddingVertical: 10, paddingHorizontal: 20, marginVertical: 4, borderRadius: 4, display: 'flex', flexDirection: 'row',  alignItems: 'center' }} >
              <Image source={{uri: data.item.pic}} style={{width: 60, height: 60, resizeMode: 'cover', borderRadius: 60}}/>
              <Text style={{marginLeft: 20,  fontSize: 21, paddingVertical: 10, letterSpacing: 1 }}>
                {data.item.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
})
const mapDispatchToProps = {
  getProducts: productActions.getProducts
  
}

const mapStateToProps = state =>{
  return{
    shoppingCart:state.shopping.shoppingCart,
    allProducts: state.product.allProducts,

   }
 }
 export default connect(mapStateToProps,mapDispatchToProps)(Categories)
 

