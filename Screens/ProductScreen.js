import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import { StyleSheet,Text, View, ScrollView, StatusBar, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { Icon as RNEIcon } from 'react-native-elements';
import shoppingCartActions from '../redux/actions/shoppingCartActions';
import { ToastAndroid } from 'react-native';

 function ProductScreen(props) {
   const [visible, setVisible] = useState(false)
   const [rating, setRating] = useState(3)

   useEffect(() => {  
    console.log(props.shoppingCart)
  }, [])

  const addToCart = async (product) =>{
    const filterProductCart = props.shoppingCart.filter(productF => productF.idProduct === product._id)
    if(filterProductCart.length!==0 && (filterProductCart[0].product.stock<(filterProductCart[0].quantity+1))){
      ToastAndroid.showWithGravity(
        `No podes exceder el stock(${filterProductCart[0].product.stock}) de este articulo.`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      )
    }else{
      ToastAndroid.showWithGravity(
        'Agregado al carrito.',
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      )
      const respuesta=await props.addProductShoppingCart({idProduct:product._id,quantity:1, product})
    }
  }
  props.navigation.setOptions({
    title: props.route.params.product.category,
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
      <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={()=>props.navigation.navigate('cart')}>
        <Feather name='shopping-cart' size={24} />
        <View style={[styles.iconCountView, { right: -6 }]}>
          <Text style={styles.iconCountText}>{props.shoppingCart.length}</Text>
        </View>
      </TouchableOpacity>
    ),
  });
  return (
    <View style={{ flex: 1 }}>
      <StatusBar/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={{ height: 300, resizeMode: 'contain' }}
            source={{uri: props.route.params.product.arrayPic[0]}}
            />
        </View>
        <View style={styles.detailsView}>
          <View style={styles.productTitleView}>
            <Text style={styles.productTitle}>{props.route.params.product.name}</Text>
            
          </View>
          <View style={styles.productPriceView}>
            <Text style={styles.discountedPriceText}>${props.route.params.product.price}</Text>
          </View>
          <View style={{ marginTop: 10, flexDirection:'row' }}>
          {[...Array(5)].map((m, i)=>{
                    const ratingValue = i+1
                    return(
                      <RNEIcon
                        name='star'
                        type='font-awesome'
                        size={18}
                        color={ratingValue <= rating ? '#ffc107' : '#8C8C8C'}
                        id={ratingValue}
                        key={'s'+i}
                      />
                    )
                  })}         
         </View>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          <TouchableOpacity style={styles.buyNowButton} onPress={()=>addToCart(props.route.params.product)}>
          <Icon name='cart-outline' type='ionicon' size={26} color='white' />
            <Text style={styles.buttonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
          <TouchableOpacity
            style={styles.productDescriptionHeader}
            onPress={()=>setVisible(!visible)}
            >
            <Text style={{fontSize: 18 }}>
              Características del producto            
            </Text>
            <Icon name={!visible ? 'caret-down-outline' : 'caret-up-outline'} type='ionicon'/>
          </TouchableOpacity>
            {visible && (
              <View style={{ padding: 10 }}>
                {props.route.params.product.arrayDescription.map(text =>  <Text style={{fontSize: 16 }}>{text}</Text>)}
              </View>
                )}
            </View>
         </ScrollView>
    </View>
  );
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
  header: {
    height: 50,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    borderBottomColor: '#dfe4fe',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
  },
  detailsView: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  productTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 24,
  },
  productPriceView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actualPriceText: {
    color: '#222',
    marginLeft: 10,
    textDecorationLine: 'line-through',
    fontSize: 18,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: 'rgba(6, 134, 200, 0.863)',
    paddingVertical: 10,
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  buttonText: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 10
  },
  tag: {
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabel: {
    color: '#333',
  },
  tagSelected: {
    backgroundColor: '#333',
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabelSelected: {
    color: '#FFF',
  },
  productDescriptionHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe4fe',
  },
  moreProductImageView: {
    flex: 1,
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  moreProductName: {
    fontSize: 16,
  },
  moreProductPriceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  moreProductPrice: {
    fontSize: 16,
  },
  moreProductIcon: {
    marginLeft: 10,
  },
  moreProductBuyButton: {
    backgroundColor: '#111',
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreProductBuyButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  
});
const mapStateToProps = state =>{
  return{
      shoppingCart:state.shopping.shoppingCart
  }
}
const mapDispatchToProps={
  addProductShoppingCart:shoppingCartActions.addProductShoppingCart
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductScreen)