import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory, useParams } from "react-router-dom";
import {
  Typography,
  IconButton,
  Grid,
  Drawer,
  Avatar,
  TextField,
  Button,
  Divider,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import { useDispatch,useSelector } from "react-redux";
import { ORDERS,OPENDIAGFAVLOG} from "../../actions";
import Close from "@material-ui/icons/Close";
import { colorLogo, grisHeader } from "../../Couleurs";
import Logo from "../../logo.svg";
import productsApi from '../../services/productsApi'
import authApi from "../../services/authApi";



const drawerWidth = "100%";
const heightSelect = "150px";
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    padding: theme.spacing(0, 0, 2, 0),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    alignContent: "center",
    justifyContent: "space-between",
  },
  title: {
    padding: theme.spacing(0, 1, 2),
    color: colorLogo,
  },
  closeIcon: {
    margin: theme.spacing(0, 1, 0, 0),
    color: colorLogo,
  },
  products: {
    padding: theme.spacing(0),
    marginBottom: "20px",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2, 2),
    },
  },
  recap:{
    padding: theme.spacing(3),
    maxWidth:"90%",
    marginBottom: "20px",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2, 20),
    },
  },
  cardProduct: {},
  dispayLogo: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  divider: {
    background: "black",
    height: "1px",
    margin: theme.spacing(2, 0),
  },
  logoImg: {
    maxWidth: "180px",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  infoProduct: {
    background: grisHeader,
    height: heightSelect,
    width:"100%",
    minWidth:"500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: theme.spacing(0, 3, 0, 1),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      minWidth:"280px",
    },
  },
  productHead: {},
  productContent: {
    maxWidth: "710px",
  },
  productAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    width: "100%",
  },
  productImg: {
    height: heightSelect,
    width: heightSelect,
    maxHeight: heightSelect,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  titleProduct: {
    textTransform: "capitalize",
    textDecoration: "none",
    color: "#000",
  },
  pricePromo: {
    display: "flex",
    justifyContent: "flex-start",
  },
  priceStd: {
    textDecoration: "none",
    color: "black",
  },
  priceBare: {
    textDecoration: "line-through",
    color: "black",
    marginRight: "7px",
  },
  priceRed: {
    color: "red",
  },
  productDelete: {
    color: "red",
    cursor: "pointer",
  },
  productUnite: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "-20px",
  },
  unite: {
    background: colorLogo,
  },
  signe: {
    fontSize: "2em",
    padding: theme.spacing(0, 1),
    cursor: "pointer",
  },
  btnPromo:{
    margin: "4px 0px 0px 2px",
    padding: "7px"
  },
  btnCheckout:{
    width:"100%"
  },
  quantite:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 40,
  },
  emptyPanier:{
    textAlign:"center"
  }
}));

export default function DrawerOrder(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  const lang = useParams().lang;
  const orders = useSelector((state)=>state.orders);
  const [priceHt,setPriceHt] = useState(0);
  const deleteProduct = (id)=>{
    const data = productsApi.removeProductInOrder(orders,id);
    dispatch(ORDERS(data));
    window.localStorage.setItem('orders',JSON.stringify(data));
    calculHt()
  }
  const handleChangeQuantite = (event,i)=>{
    let data = orders
    data[i].quantite = event.target.value
    dispatch(ORDERS(data));
    window.localStorage.setItem('orders',JSON.stringify(data));
    calculHt()
  }
  const calculHt = ()=>{
    if(orders.length > 0){
      const res = orders.map(prod=>{
        return prod.priceFinal * prod.quantite
     })
     const reducer = (accumulator, currentValue) => accumulator + currentValue;
     setPriceHt(res.reduce(reducer))
    }
    else{
      setPriceHt(0)
    }
    
  }
  const goToPay = ()=>{
    const isLog = authApi.verificate();
    if(isLog){
      const idUser = authApi.getIdUser()
      const productsOrders = orders.map(item=>{
        return {
          date:new Date(),
          unite:item.quantite,
          price:item.priceFinal,
          product:`api/fr/products/${item.id}`
        }
      })
      const data = {
        priceHT:priceHt,
        priceTTC: priceHt,
        date: new Date(),
        "client":`api/fr/users/${idUser}`,
        productsOrders:productsOrders ,
        "priceLivraison": 0
      }
      window.localStorage.setItem('finalOrder',JSON.stringify(data));
      history.push(`/${lang}/checkorder`);
    }
    else{
      dispatch(OPENDIAGFAVLOG(true)); 
    }
   

  }
  useEffect(()=>{
    calculHt()
  },[orders])
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="top"
        open={props.openDrawOrder}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h6" className={classes.title}>
            Panier
          </Typography>
          <img src={Logo} alt="Logo" className={classes.logoImg} />
          <IconButton
            aria-label="delete"
            onClick={props.handleDrawerOrderClose}
          >
            <Close className={classes.closeIcon} />
          </IconButton>
        </div>
        <Grid container>
          <Grid item lg={6} xs={12}>
          {(orders.length>0) ?
          orders.map((order,index)=><Grid container className={classes.products} key={order.id}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.cardProduct}
              >
                <Grid item className={classes.dispayLogo}>
                  <Avatar
                    variant="square"
                    src={
                      "https://cdn.webshopapp.com/shops/213602/files/138825629/curcuma-inde.jpg"
                    }
                    alt="logo"
                    className={classes.productImg}
                  ></Avatar>
                </Grid>
                <Grid item>
                  <div className={classes.infoProduct}>
                    <div className={classes.productHead}>
                      <Typography variant="h6">{order.name} </Typography>
                      <Typography variant="body2">{order.categories[0].name}</Typography>
                    </div>
                    <div className={classes.productContent}>
                      <Typography variant="caption">
                        {order.description}
                      </Typography>
                    </div>
                    <div className={classes.productAction}>
                      <div className={classes.pricePromo}>
                      {
          order.promo ?(<div className={classes.pricePromo}> <Typography variant="body2" className={classes.priceBare}>{order.price}€</Typography><Typography variant="body2" className={classes.priceRed}>{order.pricePromo}€</Typography></div>) : ( <Typography variant="body2" className={classes.priceStd}>{order.price}€</Typography>)
        }
                      </div>
                      <div className={classes.quantite}>
                        <Typography>Quantité</Typography>
                      <FormControl className={classes.formControl}>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                          value={order.quantite}
                          onChange={(event)=>handleChangeQuantite(event,index)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>

                        </Select>
                        </FormControl>
                      </div>
                      <div className={classes.productDelete}>
                        <Typography onClick={()=>deleteProduct(order.id)}>Suprimer</Typography>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )
        :(<Typography className={classes.emptyPanier}>Il n'y a aucun article dans votre panier.</Typography>)
        }
          </Grid>
          <Grid item lg={6} xs={12}>
            <Grid container  direction="row"
                justify="flex-start"
                alignItems="center" className={classes.recap}>
              <Grid item xs={12} >
                <Typography >Avez-vous un code promotionnel ?</Typography>
              </Grid>
              <Grid item xs={12} >
                <Grid container direction="row" justify="flex-start"
                alignItems="center"> 
                <TextField
                  label="Promo"
                  id="outlined-margin-dense"
                  margin="dense"
                  variant="outlined"
                />

                <Button variant="outlined" className={classes.btnPromo}>Ok</Button>

                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Grid container direction="row" justify="space-between"
                alignItems="center"> 
                <Typography>Sous-total:</Typography>
                <Typography variant="subtitle2">{priceHt} €</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Grid container direction="row" justify="space-between"
                alignItems="center"> 
                <Typography>Frais de livraison:</Typography>
                <Typography variant="subtitle2">0 €</Typography>
                </Grid>
                <Divider variant="middle" className={classes.divider} />
              </Grid>
              <Grid item xs={12} >
                <Grid container direction="row" justify="space-between"
                alignItems="center"> 
                <Typography>Total:</Typography>
                <Typography variant="subtitle2">{priceHt} €</Typography>
                </Grid>
                <Divider variant="middle" className={classes.divider} />
                {(orders.length > 0) ? (<Button variant="outlined" className={classes.btnCheckout} onClick={goToPay}>Paiement</Button>) : <Button variant="outlined" className={classes.btnCheckout}>Nos produits</Button>}
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}
