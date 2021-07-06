const drawerReducer = (state = false,action) => {
    switch (action.type) {
        case 'DRAWERING' :
            return state = action.payload;
        default:
            return state;
    }
}
export default drawerReducer