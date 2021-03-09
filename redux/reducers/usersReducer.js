import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState ={
    loggedUser:null
}
async function saveData(nameData,value){
    try {
        await AsyncStorage.setItem(nameData, value)
    } catch (e) {
    }
}
function usersReducer(state= initialState,action){
    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem('token')
        } catch(e) {
        }
      }
    const clearAll =async() => {
        try {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.clear()
        } catch(e) {
        }
    }
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload)
            saveData('firtsName',action.payload.firtsName)
            saveData('pic',action.payload.pic)
            saveData('email',action.payload.email)
            saveData('userId',action.payload.userId)
            saveData('token',action.payload.token)
        return {
            ...state,
            loggedUser:action.payload
        }
    case 'LOGOUT':{
        setTimeout(() => {
            removeValue()
            clearAll()
        }, 5000)
        return{
            ...state,
            loggedUser:null  
        }}
        default:
            return state
    }
}
export default usersReducer
