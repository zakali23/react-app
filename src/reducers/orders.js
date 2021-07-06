const ordersReducer = (state = [],action) => {
    switch (action.type) {
        case 'ORDERS' :
            return state = action.payload;
        default:
            return state;
    }
}
export default ordersReducer