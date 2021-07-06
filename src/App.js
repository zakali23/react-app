import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from "./pages/Login";
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Register from "./pages/Register";
import authApi from "./services/authApi";
import Order from './pages/Order'
import {useDispatch} from 'react-redux';
import {SIGN_IN} from './actions';
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Forgot from './pages/password/Forgot'
import Password from './pages/password/Password'
import productsApi from './services/productsApi'
import { withNamespaces } from 'react-i18next';
import {FAVS,ORDERS} from "./actions";
import CheckOrder from "./pages/CheckOrder";
function App({t}) {
  
  const verif = authApi.verificate();
  const dispatch = useDispatch();
  const [prodsFav,setProdsFav] = useState([]);
  const local = (window.navigator.language).substr(0,2);
  
  const getFavs = async ()=>{
   const items = await productsApi.GetFavoriteProducts(local).then(data=>data)
   await dispatch(FAVS([...items]));
   await setProdsFav([...items]);
  }
  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    //const local = (window.navigator.language).substr(0,2);
    const order = window.localStorage.getItem("orders");
    if (order && null!==order) {
      const data = window.localStorage.getItem("orders");
      dispatch(ORDERS(JSON.parse(data)));
    }else{
      window.localStorage.setItem("orders",JSON.stringify([]))
    }


    dispatch(SIGN_IN(verif));
    verif ? getFavs()
          : dispatch(FAVS([]))
  },[]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={props=><Redirect strict to={`/${local}/`} {...props}/> }  />
        <Route path="/login" exact render={props=><Redirect strict to={`/${local}/login`} {...props}/> }  />
        <Route path="/contact" exact render={props=><Redirect strict to={`/${local}/contact`} {...props}/> }  />
        <Route path="/products" exact render={props=><Redirect strict to={`/${local}/products`} {...props}/> }  />
        <Route path="/favorites" exact render={props=><Redirect strict to={`/${local}/favorites`} {...props}/> }  />
        <Route path="/register" exact render={props=><Redirect strict to={`/${local}/register`} {...props}/> }  />
        <Route path="/forgot" exact render={props=><Redirect strict to={`/${local}/forgot`} {...props}/> }  />
        <Route path="/password/:token" exact render={props=><Redirect strict to={`/${local}/password/:token`} {...props}/> }  />
        <Route path="/order" exact render={props=><Redirect strict to={`/${local}/order`} {...props}/> }  />
        <Route path="/checkorder" exact render={props=><Redirect strict to={`/${local}/checkorder`} {...props}/> }  />
        <Route path="/:lang/" exact render={props=><Home  {...props} pf={prodsFav}/>}/>
        <Route path="/:lang/contact" exact render={props=><Contact {...props}/>}/>
        <Route path="/:lang/forgot" exact render={props=><Forgot {...props}/>}/>
        <Route path="/:lang/products" exact render={props=><Products {...props}/>}/>
        <Route path="/:lang/favorites" exact render={props=><Favorites {...props}/>}/>
        <Route path="/:lang/login" exact render={
         //(isLogged)&& (props=><Redirect to="/" {...props}/>) ||  (props=><Login {...props}/>) 
           verif ? props=><Redirect strict to={`/${local}/`} {...props}/> : props=><Login {...props}/>
          }/>
        <Route path="/:lang/register" exact render={props=><Register {...props}/>} />
        <Route path="/:lang/order" exact render={props=><Order {...props}/>} />
        <Route path="/:lang/checkorder" exact render={props=><CheckOrder {...props}/>} />
        <Route path="/:lang/product/:slug" exact render = {props=><Product {...props}/>} />
        <Route path="/:lang/password/:token" exact render = {props=><Password {...props}/>} />
        <Route
          path="/:lang/"
          component={() => {
            return <h1>{t('translate.forbiden')}</h1>;
          }}
        />
      </Switch>
    </Router>
  );
}

export default withNamespaces()(App);
