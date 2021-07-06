const dialogFavLoginReducer = (state = false,action) => {
    switch (action.type) {
        case 'OPENDIAGFAVLOG' :
            return state = action.payload;
        default:
            return state;
    }
}
export default dialogFavLoginReducer