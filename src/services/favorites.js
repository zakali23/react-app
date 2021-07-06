const isFav = (favorites,id) => {
return favorites.some(product => product.id === id);
}

export default {
    isFav
}