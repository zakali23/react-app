export const SIGN_IN = (islog) => {
return {
    type:'SIGN_IN',
    payload:islog
};
}
export const DRAWERING = (bol) => {
    return {
        type:'DRAWERING',
        payload:bol
    }
    
}
export const NAVHEAD = (index) => {
    return {
        type:'NAVHEAD',
        payload:index
    }
}
export const TOGGLE = (isTogl) => {
    return {
        type:'TOGGLE',
        payload:isTogl
    }
}
export const MENU = (val) => {
    return {
        type:'MENU',
        payload:val
    }
}
export const LANGUE = (lng) => {
    return {
        type:'LANGUE',
        payload:lng
    }
}
export const FAVS = (products) => {
    return {
        type:'FAVS',
        payload:products
    }
}
export const PRODUCTS = (products)=>{
    return {
        type:'PRODUCTS',
        payload:products
    }
}
export const ORDERS = (products)=>{
    return {
        type:'ORDERS',
        payload:products
    }
}
export const OPENDIAGFAVLOG = (open) => {
    return {
        type:'OPENDIAGFAVLOG',
        payload:open
    }
}