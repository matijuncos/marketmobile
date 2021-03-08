import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { ToastAndroid } from 'react-native';

const userActions  ={
  createNewUser: (fdNewUser) => {
    return async (dispatch,getstate) => {
      try{
        const response = await axios.post('http://192.168.0.102:4000/api/user/signup', fdNewUser,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        if(!response.data.succes){  
          var errors=[]
          response.data.errores && response.data.errores.details.map(error=>{
            switch (error.path[0]) {
              case 'firstName':
                errors.push({label:error.context.label,message:"El nombre debe tener minimo 2 caracteres."})
                break;
                case 'lastName':
                errors.push({label:error.context.label,message:"El apellido debe tener minimo 2 caracteres."})
                break;
                case 'email':
                  errors.push({label:error.context.label,message:"El correo tiene que contener un arroba y un dominio como minimo."})
                  break;
              case 'password':
                errors.push({label:error.context.label,message:"La contraseña debe tener al menos 6 a 8 caracteres y una mayuscula y una minuscula."})
                break;
              case 'country':
                errors.push({label:error.context.label,message:"Debes seleccionar algun país."})
                break;
              }
            })
          }
          dispatch({
            type: "LOGIN",
            payload: response.data.response
          })
          ToastAndroid.showWithGravity(
            response.data.response.firstName+', tu cuenta fue creada!',
            ToastAndroid.LONG,
            ToastAndroid.TOP
          )
         }catch(error){
        console.log(console.log(errors))
        return({success: false, response: errors})
    }}},
    loginUser: user =>{
        return async (dispatch,getstate) => {
            try{
              const response = await axios.post('https://gitmusicapp.herokuapp.com/api/user/login',user)
              if (!response.data.success) {
                
                  return response.data
              }
              dispatch({type:'LOGIN', payload: response.data.response})
              console.log(response)
                   ToastAndroid.showWithGravity(
                  "Welcome " + response.data.response.firstName+'!',
                  ToastAndroid.LONG,
                  ToastAndroid.TOP
                )

          }catch(error){
           console.log(error)         
          }}},
    login_AS: (token) =>{
        return async (dispatch,getState) =>{
            try{
              const response = await axios.post('https://gitmusicapp.herokuapp.com/api/user/ls',{token},{
                headers:{
                  Authorization: `Bearer ${token}`
                }
    
              })
              if (data.data.success){
                dispatch({type:'LOGIN', payload:response.data.response})
            
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
        },
      googleLogin:()=>{
        return async (dispatch,getstate) => {
          dispatch({
            type:'GOOGLE',
          })
        }

      }
       
        
    }
export default userActions