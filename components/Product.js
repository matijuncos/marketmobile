import React, { useEffect, useState } from 'react';
import {StyleSheet,Text, View, StatusBar,Image,TouchableOpacity,ScrollView} from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';

// npm i react-native-elements
import { Icon as RNEIcon } from 'react-native-elements';



const Product = ({ product })  => {


    if(product){
   
    return (
      <View
        style={{
            marginLeft:2,
          backgroundColor: '#fff',
          marginTop: 10,
          borderBottomColor: '#dfe4ea',
          borderBottomWidth: 1,
          paddingVertical: 10,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {/* Product Image View */}
          <View style={{ flex: 1, paddingHorizontal: 8 }}>
            <Image
              style={{ width: 100, height: 100, resizeMode: 'center' }}
              source={{ uri: product.arrayPic[0] }}
            />
          </View>
          {/* Product Details View */}
          <View style={{ flex: 3 }}>
            {/* -- Ratings View */}
            <View>
              <Text >{product.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff200',
                    alignItems: 'center',
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    borderRadius: 4,
                    marginTop: 4,
                  }}
                >
                  <Text
                    style={{
                      color: '#111',
                      marginRight: 8,
                    
                      fontSize: 16,
                    }}
                  >
                    {product.rating}
                  </Text>
                  <RNEIcon
                    name='star'
                    type='font-awesome'
                    size={12}
                    color={'#111'}
                  />
                </View>
                <Text style={{ marginLeft: 6 }}>
                  ({product.ratingCount})Rating
                </Text>
              </View>
            </View>
            {/* -- Price View */}
            <View style={{ marginTop: 4 }}>
              <Text style={{fontSize: 16 }}>
                {`₹${product.price}  `}
               
              </Text>
            </View>
          </View>
        </View>
        
        {/* Specifications Wrap */}
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {product.arrayDescription.map((spec) => (
            <Text
              style={{
                marginTop: 4,
                marginBottom: 4,
                marginLeft: 4,
                marginRight: 4,
                justifyContent: 'flex-start',
                alignItems: 'center',
                color:'white',
                backgroundColor: '#085694',
                alignSelf: 'baseline',
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              {spec}
            </Text>
          ))}
        </View>
      </View>
    );     
    }else{
        return(
            <Text>Loading...</Text>
        )
    }
  }

  export default Product