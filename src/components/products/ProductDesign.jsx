import {useState} from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ShopIcon from "@material-ui/icons/EnhancedEncryptionRounded";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavIcon from "@material-ui/icons/Favorite";
import { Link, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { OPENDIAGFAVLOG,FAVS, ORDERS} from "../../actions";
import productsApi from "../../services/productsApi";
import {colorSecond} from '../../Couleurs'
const useStyles = makeStyles((theme) => ({
  main: {
    background: "#f5f5f5",
    padding: "5px 35px",
    [theme.breakpoints.down("ms")]: {
      padding: "5px 25px",
      maxWidth: "100%",
    },
  },
  image: {
    minWidth: "100%",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    marginBottom: "15px",
  },
  iconStyle: {
    display: "flex",
    justifyContent: "flex-end",
    color: "#000",
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",
    },
  },
  button: {
    padding: "0px",
    borderRadius: "0px",
  },
  icon: {
    color: "#000",
    fontSize: "25px",
    [theme.breakpoints.down("ms")]: {
      fontSize: "15px",
    },
  },
  removeFavIcon:{
    color:colorSecond
  },
  title: {
    textTransform: "capitalize",
    textDecoration: "none",
    color: "#000",
  },
  pricePromo:{
    display: "flex",
    justifyContent: "flex-start"
  },
  priceStd:{
    textDecoration: "none",
    color:"black"
  },
  priceBare:{
    textDecoration: "line-through",
    color:"black",
    marginRight: '7px'
  },
  priceRed :{
    color:'red'
  }
}));
const ProductDesign = (props) => {
  const classes = useStyles();
  const lang = useParams().lang;
  const isLog = useSelector((state)=>state.isLogged);
 const [isFav,setIsFav] = useState(props.choice);
  const dispatch = useDispatch();
  const openDialogLogFav = () =>{
    dispatch(OPENDIAGFAVLOG(true)); 
    
  }
  const addFav = async ()=> {
    setIsFav(true)
   const prods =  await productsApi.addProductFav(lang,{id:props.id}).then(data=>data);
  dispatch(FAVS(prods['hydra:member']))
   

  }
  const removeFav = async ()=> {
    setIsFav(false)
    const removeFavProducts = await productsApi.removeProductFav(lang,{id:props.id}).then(data=>data);
    dispatch(FAVS(removeFavProducts['hydra:member']));

  }
  const addOrder = ()=>{
    const orders = JSON.parse(window.localStorage.getItem("orders"));
    let product = [props].map((item) => 
    Object.assign({}, item, {quantite:1}))
   const data = productsApi.addProductInOrder(orders,...product);
    dispatch(ORDERS(data));
    window.localStorage.setItem('orders',JSON.stringify(data));
    
  }

  return (
    <Grid container className={classes.main}>
      <img
        src={props.image}
        className={classes.image}
        alt={props.title}
      />
      <Grid item xs={12} md={8}>
        <Typography variant="h6">
          <Link to={`/${lang}/product/${props.slug}`} className={classes.title}>
            {props.name} 
          </Link>
        </Typography>
        <Typography variant="body2">{props.categories[0].name}</Typography>
      </Grid>
      <Grid item xs={12} md={4} className={classes.iconStyle}>
        <IconButton aria-label="add to shop" className={classes.button} onClick={addOrder}>
          <ShopIcon className={classes.icon} />
        </IconButton>
        {
        !isLog
         ?
         (<IconButton aria-label="add to favorite" className={classes.button} onClick={openDialogLogFav}>
          <FavoriteIcon className={classes.icon} />
        </IconButton>)
         :
          (<>
          {isFav ? (<IconButton aria-label="add to favorite" className={classes.button} onClick={removeFav}><FavIcon className={classes.removeFavIcon}  /></IconButton>): (<IconButton aria-label="add to favorite" className={classes.button}  onClick={addFav}><FavoriteIcon className={classes.icon} /></IconButton>)}
        </>)
        }
      </Grid>
      <Grid item xs={12}>
        {
          props.promo ?(<div className={classes.pricePromo}> <Typography variant="body2" className={classes.priceBare}>{props.price}€</Typography><Typography variant="body2" className={classes.priceRed}>{props.pricePromo}€</Typography></div>) : ( <Typography variant="body2" className={classes.priceStd}>{props.price}€</Typography>)
        }
       
        
      </Grid>
      <Grid item xs={12}>
        <Rating
          name="half-rating-read"
          value={props.rating}
          precision={0.5}
          readOnly
        />
      </Grid>
     
    </Grid>
  
  )
};

export default ProductDesign;
