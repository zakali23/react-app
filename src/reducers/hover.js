const hoverReducer = (state = 0,action) => {
    switch (action.type) {
        case 'NAVHEAD' :
            return state = action.payload;
        default:
            return state;    
    }
}
export default hoverReducer