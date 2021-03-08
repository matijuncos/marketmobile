import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState ={
    loggedUser:null,
    
}
 function usersReducer(state= initialState,action){
    switch (action.type) {

            case 'LOGIN':
            console.log("reducer",action.payload)
            //  AsyncStorage.setItem('name',action.payload.name)
            //  AsyncStorage.setItem('token',action.payload.token)
          
            return {
                ...state,
                loggedUser:action.payload,
            
            }
        case 'LOGOUT':
           return{
                ...state,
                loggedUser:null
                
            }
      
      
        default:
            return state


}}

export default usersReducer
