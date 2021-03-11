import axios from 'axios'

const productActions = {
  getProducts: () =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get('https://gitmusicapp.herokuapp.com/api/products')
        if(response.data.success){  
        dispatch({type: "ALL_PRODUCTS",payload: response.data.response})
        return response.data.response
        }
        
      }catch(error){
        return({success: false, response: error})
      }
    }
  },
  getProduct: (idProduct) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.get(`https://gitmusicapp.herokuapp.com/api/products/${idProduct}`)
        if(response.data.success){  
        dispatch({type: "GET_PRODUCT",payload: response.data.response})
        return response.data.response
        }
      }catch(error){
        return({success: false, response: error})
      }
    }
  },
  addProduct: (fdNewProduct) =>{
    return async (dispatch, getState) =>{
      try{
        const response = await axios.post('https://gitmusicapp.herokuapp.com/api/products', fdNewProduct,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        if(response.data.success){  
          dispatch({type: "NEW_PRODUCT",payload: response.data.response})}
          return response.data
      }catch(error){
        return({success: false, response: error})
      }
    }
  },
  commentProduct: newComment =>{
    return async(dispatch, getState) =>{
      try{
      const response = await axios.put(`https://gitmusicapp.herokuapp.com/api/products/newcomment`, newComment)
      if(response.data){
        dispatch({type: 'COMMENT_OPTIONS', payload: response.data.response})
        return ({success:true,response:response.data.response})
      }
      }catch(error){
        return({success:false, response: error})
      }
    }
  },
  delComment: del => {
    return async (dispatch,getState) => {
      try{
      const response = await axios.put(`https://gitmusicapp.herokuapp.com/api/products/delcomment`,del)
      if(response.data){
        dispatch({type: 'COMMENT_OPTIONS', payload: response.data.response})
        return ({success:true,response:response.data.response})
      }
    } catch(error){
      return({success: false, response: error})
    }
    }
  },
  updateComment: update => {
    return async (dispatch, getState) => {
      try{
        const response = await axios.put(`https://gitmusicapp.herokuapp.com/api/products/editcomment`,update)
        if(response.data){
          dispatch({type: 'COMMENT_OPTIONS', payload: response.data.response})
          return ({success:true,response:response.data.response})
        }
      }catch(error){
        return({success: false, response: error})
      }
    }
  },
  ratingProduct : (ratingObject) => {
    return async (dispatch,getstate) =>{
      try{
        const response = await axios.put(`https://gitmusicapp.herokuapp.com/api/products/newrating`,{ratingObject})
        if(response.data){
        return({success:true})
      }
      }catch (error){
        return({succes:false, response:error})
      }
    }
  }
}

export default productActions