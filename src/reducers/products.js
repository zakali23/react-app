const productsReducer = (state = [],action) => {
    switch (action.type) {
        case 'PRODUCTS' :
            return state = action.payload;
        default:
            return state;
    }
}
export default productsReducer