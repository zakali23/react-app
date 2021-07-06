const langueReducer = (state = 'fr',action) => {
    switch (action.type) {
        case 'LANGUE' :
            return state = action.payload;
        default:
            return state;
    }
}
export default langueReducer