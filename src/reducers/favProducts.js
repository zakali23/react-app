const favProductsReducer = (state = [],action) => {
    switch (action.type) {
        case 'FAVS' :
            return state = action.payload;
        default:
            return state;
    }
}
export default favProductsReducer