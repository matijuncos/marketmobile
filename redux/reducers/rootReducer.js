import { combineReducers } from "redux";
import productReducer from './productReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
    product:productReducer,
    user: usersReducer 
 
})

export default rootReducer