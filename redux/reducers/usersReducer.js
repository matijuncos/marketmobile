import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState ={
    loggedUser:null,
    googleLog: null
}
 function usersReducer(state= initialState,action){
    switch (action.type) {

            case 'LOGIN':
<<<<<<< HEAD
            console.log("reducer",action.payload)
=======
>>>>>>> c77e406596fea7f19162e768c2a6c356bc489616
            //  AsyncStorage.setItem('name',action.payload.name)
            //  AsyncStorage.setItem('token',action.payload.token)
            return {
                ...state,
                loggedUser:action.payload,
            
            }
        case 'LOGOUT':
           return{
                ...state,
                loggedUser:null,
                googleLog: null
                
            }
         case 'GOOGLE':
             return{
                 ...state,
                 googleLog: true
             }
      
        default:
            return state


}}

export default usersReducer
