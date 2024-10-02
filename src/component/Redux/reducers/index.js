import CartReducer from "./CartReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    Ecommerce: CartReducer,
})

export default rootReducers;