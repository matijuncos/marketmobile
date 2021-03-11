import React, { useEffect, useState } from 'react';
import {StyleSheet,Text, View, StatusBar,Image,TouchableOpacity,ScrollView, ActivityIndicator, Alert} from 'react-native';
import { Icon as RNEIcon } from 'react-native-elements';



const Product = ({ product, navigation })  => {
   
  const [rating, setRating] = useState(3)

  useEffect(()=>{
    if(product.arrayRating.length !== 0){
      var stars = Math.round(product.arrayRating.reduce((a, b) => a.value + b.value) / product.arrayRating.length)
      var suma =Math.round(product.arrayRating.reduce((a, b)=> a += b.value, 0)/product.arrayRating.length)
      setRating(suma)
      console.log(suma)
    }
},[rating])  

  if(!product){
    return <ActivityIndicator/>
  }
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('ProductScreen', {product})}>
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
              <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 8}}>{product.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 4,
                    marginTop: 4,
                  }}
                >
                  {[...Array(5)].map((m, i)=>{
                    const ratingValue = i+1
                    return(
                      <RNEIcon
                        name='star'
                        type='font-awesome'
                        size={18}
                        color={ratingValue <= rating ? '#ffc107' : '#8C8C8C'}
                        key={i+'star'}
                      />
                    )
                  })}
                </View>

              </View>
            </View>
            {/* -- Price View */}
            <View style={{ marginTop: 4, marginLeft: 8 }}>
              <Text style={{fontSize: 16 }}>
                {`$${product.price}  `}
               
              </Text>
            </View>
          </View>
        </View>
      </View> 
      </TouchableOpacity>

    );     
    
  }

const styles = StyleSheet.create({
  
})


  export default Product