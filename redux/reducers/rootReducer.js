import { combineReducers } from "redux";
import productReducer from './productReducer'
import usersReducer from './usersReducer'
import shoppingCartReducer from './shoppingCartReducer'

const rootReducer = combineReducers({
    product:productReducer,
    user: usersReducer,
    shopping:shoppingCartReducer
})

export default rootReducer