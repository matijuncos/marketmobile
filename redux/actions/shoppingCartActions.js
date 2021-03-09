import axios from 'axios'
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

async function saveData(nameData,value){
  try {
      await AsyncStorage.setItem(nameData, value)
  } catch (e) {
  }
}

const shoppingCartActions={
  addShoppingCart:(shoppingCart)=>{
    return async (dispatch, getState)=>{
      try {
        const response= await axios.post('https://gitmusicapp.herokuapp.com/api/products/shoppingcart',shoppingCart)
        if(response){
          console.log("Se guardo correctamente")
        }else{
          console.log("error al guardar")
        }
        dispatch({
          type: "SHOPPING_SAVE",
          payload: response.data.response
        })
      } catch (error) {
        return ({success:false,error:"error"})
      }
      return ({success:true,response:"success"})
    }
  },
  addProductShoppingCart:(product)=>{
    return(dispatch,getState)=>{
      try {
      dispatch({
        type: "ADD_PRODUCT_SHOPPING_CART",
        payload:product
      })
      saveData('shoppingCart',JSON.stringify(getState().shopping.shoppingCart))
      console.log(getState())
      return ({success:true,response:getState()})
      } catch (error) {
        return ({success:false,error:error})
      }
      }
  },
  preservedShoppingCart:(shoppingCart)=>{
      return(dispatch,getState)=>{
        try {
          dispatch({
            type: "PRESERVED_SHOPPING_CART",
            payload:JSON.parse(shoppingCart)
          })
          return ({success:true,response:"success"})
        } catch (error) {
          return ({success:false,error:"error"})
        }
    }
  },
  clearCart: () =>{
    return async (dispatch, getState) =>{
      dispatch({
        type: "CLEAR_CART"
      })
      ToastAndroid.show(
        "Carrito Vacio",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      ) 
    }
  },
  editProductCart:(value,product)=>{
    return async (dispatch, getState)=>{
      dispatch({
        type: "EDIT_PRODUCT_CART",
        payload:{value:value,product:product}
      })
      saveData('shoppingCart',JSON.stringify(getState().shopping.shoppingCart))
      ToastAndroid.show(
        "Producto actualizado",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      ) 
    }
  },
  deleteProductCart:(idProduct)=>{
    return async (dispatch, getState)=>{
      dispatch({
        type: "DELETE_PRODUCT_CART",
        payload:{idProduct:idProduct}
      })
      saveData('shoppingCart',JSON.stringify(getState().shopping.shoppingCart))
      ToastAndroid.show(
        "Se elimino el articulo del carrito.",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      ) 
    }
  }
}
export default shoppingCartActions