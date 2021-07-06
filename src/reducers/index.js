import loggedReducer from './isLogged';
import drawerReducer from './drawer';
import {combineReducers} from 'redux';
import hoverReducer from './hover';
import toggleReducer from './toggle';
import menuReducer from './menu';
import langueReducer from './langue';
import favProductsReducer from './favProducts';
import productsReducer from './products';
import  dialogFavLoginReducer from './dialogFavLogin'
import ordersReducer from './orders';
const allReducers = combineReducers({
    isLogged:loggedReducer,
    drawer:drawerReducer,
    hover:hoverReducer,
    toggle:toggleReducer,
    menu:menuReducer,
    langue:langueReducer,
    favProducts:favProductsReducer,
    dialogFavLogin:dialogFavLoginReducer,
    products:productsReducer,
    orders:ordersReducer
});
export default allReducers;