import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import { StyleSheet,ToastAndroid,Text, View, ScrollView, StatusBar, TouchableOpacity, Image, RefreshControl} from 'react-native';
import {Icon} from 'react-native-elements'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { Icon as RNEIcon } from 'react-native-elements';
import shoppingCartActions from '../redux/actions/shoppingCartActions';
import Comment from '../components/Comment';
import { TextInput } from 'react-native';
import productActions from '../redux/actions/productActions';
import { useFocusEffect } from '@react-navigation/core';

function ProductScreen(props) {

  const [visible, setVisible] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState({})
  const[commentArray, setCommentArray] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);


  useFocusEffect(
    React.useCallback(()=>{
      console.log('focus')
      props.getProducts()
    },[props.navigation, commentArray])
    )
    
    
    useEffect(() => {  
     setCommentArray(props.route.params.product.arrayComments)
    props.navigation.setOptions({
      title: props.route.params.product.category,
      headerTitleStyle: { fontSize: 22, color:'white'},
      headerStyle: { backgroundColor: 'rgba(6, 134, 200, 0.863)' },
      headerLeft: () => (
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}style={{ marginHorizontal: 10 }}>
          <Feather
            name='bar-chart-2'
            size={28}
            style={{ transform: [{ rotate: '90deg' }, { scaleX: -1 }] }}
            color={'white'}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={()=>props.navigation.navigate('cart')}>
          <Feather name='shopping-cart' size={24} color={'white'}
/>
          <View style={[styles.iconCountView, { right: -6 }]}>
            <Text style={styles.iconCountText}>{props.shoppingCart.length}</Text>
          </View>
        </TouchableOpacity>
      ),
    });


  }, [props.shoppingCart])




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


  const sendComment =  () =>{
    const idUser = {firstName: props.loggedUser.firstName, _id: props.loggedUser.userId }
    commentArray.push({
      comment, idUser
    })

    props.commentProduct({
      idProduct: props.route.params.product._id, idUser: props.loggedUser.userId, comment
    })
    ToastAndroid.showWithGravity(
      'Muchas gracias por tu comentario',
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )  
    setComment('')
onRefresh()  
}
  const del = (id) =>{
    const newArray = commentArray.filter(comm => id !== comm._id)
    setCommentArray(newArray)
    onRefresh()  

  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.getProducts()
    setTimeout(()=>{
      setRefreshing(false);
    },1000)
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <StatusBar/>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      >
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
        <View style={{ marginTop: 10, backgroundColor: '#fff', alignItems:'center', width: '100%'}}>
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
              <View style={{ padding: 10, width: '100%' }}>
                {props.route.params.product.arrayDescription.map((text, i) =>  {
                return(
                  <View key={i+'desc'} style={{width: '100%', flexDirection: 'row', alignItems:'center'}}>
                     <Icon name='checkbox-outline' type='ionicon' color='rgba(6, 134, 200, 0.863)' />
                    <Text style={{fontSize: 16, width: '100%', marginLeft: 10 }}>{text}</Text>
                  </View>
                )
                })}
              </View>
                )}
            <TouchableOpacity
            style={styles.productDescriptionHeader}
            onPress={()=>setShowComments(!showComments)}
            >
            <Text style={{fontSize: 18 }}>
              Ver comentarios ({commentArray.length})          
            </Text>
            <Icon name={!showComments ? 'caret-down-outline' : 'caret-up-outline'} type='ionicon'/>
          </TouchableOpacity>
          {showComments && (
              <View style={{ padding: 10, width: '100%' }}>
                {commentArray.length !== 0 && commentArray.map((comment, i) => {
                  return(
                    <View key={i+'comment'}>
                      <Comment del={del} comment={comment} product={props.route.params.product}/>
                    </View>
                  )
                } )}
              </View>
                )}
                  <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder='Dejá tu comentario!'
                        onChangeText={(value)=>setComment(value)}
                        value={comment.comment}
                        />
                        <TouchableOpacity onPress={sendComment} style={{marginRight: 6}}>
                          <Icon name='send-outline' type='ionicon'/>
                        </TouchableOpacity>
                  </View>
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
  inputView:{
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f6f4f7',
    marginTop: 10,
    marginBottom:15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    width:'95%',
    borderColor: 'black',
    borderWidth: 1

},
input:{
    height: 40,
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 10
}
});
const mapStateToProps = state =>{
  return{
      shoppingCart:state.shopping.shoppingCart,
      loggedUser: state.user.loggedUser,
      allProducts: state.product.allProducts
    }
}
const mapDispatchToProps={
  addProductShoppingCart:shoppingCartActions.addProductShoppingCart,
  commentProduct: productActions.commentProduct,
  getProducts: productActions.getProducts

}

export default connect(mapStateToProps,mapDispatchToProps)(ProductScreen)