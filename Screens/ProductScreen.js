import React, { useState, useEffect } from 'react';
import { StyleSheet,Text, View, ScrollView, StatusBar, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements'
import Constants from 'expo-constants';

const Rating = ({ rating, maxRating }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array(rating)
        .fill(1)
        .map((el) => (
          <Icon name='star' size={20} color='gold' />
          ))}
      {Array(maxRating - rating)
        .fill(1)
        .map((el) => (
          <Icon name='star' size={20} color='white' />
          ))}
    </View>
  );
  
};
 function ProductScreen(props) {
   const [visible, setVisible] = useState(false)
   
   useEffect(() => {
     
     console.log(props.route.params)
  }, [])

  const addToCart = () =>{
    
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar/>
      <View style={styles.header}>
        <Icon name='menu' size={30} />
        <Text style={styles.headerTitle}>Productos</Text>
        <Icon name='cart-outline' type='ionicon' size={26} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={{ height: 500, resizeMode: 'cover' }}
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
          <View style={{ marginTop: 10 }}>
            <Rating rating={4} maxRating={5} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          <TouchableOpacity style={styles.buyNowButton} onPress={addToCart}>
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
    fontFamily: 'MontserratBold',
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
    fontFamily: 'MontserratExtraBold',
  },
  productPriceView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPriceText: { fontFamily: 'MontserratBold', fontSize: 20 },
  actualPriceText: {
    color: '#222',
    marginLeft: 10,
    textDecorationLine: 'line-through',
    fontSize: 18,
    fontFamily: 'MontserratRegular',
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
    fontFamily: 'MontserratBold',
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
    fontFamily: 'MontserratBold',
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
    fontFamily: 'MontserratBold',
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
    fontFamily: 'MontserratRegular',
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
    fontFamily: 'MontserratBold',
    fontSize: 18,
  },
});

export default ProductScreen