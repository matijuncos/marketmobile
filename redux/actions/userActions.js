import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const userActions  ={
  createNewUser: (fdNewUser) => {
    return async (dispatch,getstate) => {
      try{
        console.log(fdNewUser)
        const response = await axios.post('https://gitmusicapp.herokuapp.com/api/user/signup', fdNewUser,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        if (response.data.success){
          dispatch({type:'LOGIN', payload:response.data.response})
        } else{
          //ALERT
        }
        console.log(response)
      }catch(error){
      
      const data ={errores:{details:[{message:'An error occurred'}]}}
      return data
    }}},
    loginUser: userToLogin =>{
        return async (dispatch,getstate) => {
            try{
              const data = await axios.post('https://gitmusicapp.herokuapp.com/api/user/login',userToLogin)
              if (data.data.success){
                
                dispatch({type:'LOGIN', payload:data.data.response})
                return data.data.response
              } else{
              
              return data.data
              }
          }catch(error){
       
            const data ={errores:{details:[{message:'An error occurred'}]}}
            return data
          }}},
    login_AS: (token) =>{
        return async (dispatch,getState) =>{
            try{
              const data = await axios.post('https://gitmusicapp.herokuapp.com/api/user/ls',{token},{
                headers:{
                  Authorization: `Bearer ${token}`
                }
    
              })
              if (data.data.success){
                dispatch({type:'LOGIN', payload:data.data.response})
              }
              
            } catch(error){
              
            if(error.response)
              {if(error.response.status===401){
              AsyncStorage.clear()
                const backToHome ='/'
                return backToHome}
              }else {
              return error}
            }
              
            }
          },
        logout_user:()=>{
          return async (dispatch,getstate) => {
            const clearAll = async () => {
              try {
                await AsyncStorage.clear()
              } catch(e) {
                console.log(e)
              }
            
             
              dispatch({type:'LOGOUT'})}
              clearAll()
            }
           
           
          
        }
       
        
    }
export default userActions