import { useState} from "react";
import {makeStyles, withStyles } from "@material-ui/core/styles";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import FavoriteRounded from "@material-ui/icons/FavoriteBorderOutlined";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import { colorSecond } from "../../Couleurs";
import Badge from "@material-ui/core/Badge";
import { useDispatch,useSelector } from "react-redux";
import { TOGGLE,MENU,OPENDIAGFAVLOG} from "../../actions";
import SearchPage from "./SearchPage";
import Logo from '../../logo.svg';
import MenuDrawer from "./MenuDrawer";
import { withNamespaces } from 'react-i18next';
import { Link,useHistory, useParams } from "react-router-dom";
import LoginFav from "../services/LoginFav";
import DrawerOrder from "./DrawerOrder"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    paddingTop:"10px"
  },
  logo: {
    display: "flex",
    flexFlow: "row wrap",
    flexBasis: "10%",
    alignContent: "center",
    justifyContent: "start",
    paddingLeft:"10px",
    [theme.breakpoints.down("xs")]: {
      display:'none'
     },
    
  },
  navMenu: {
    display: "flex",
    flexFlow: "row wrap",
    flexBasis: "60%",
    alignContent: "center",
    justifyContent: "center",
    [theme.breakpoints.between('xs', 'md')]: {
      display:'none'
    },
  },
  searchNav: {
    display: "flex",
    flexFlow: "row wrap",
    flexBasis: "30%",
    alignContent: "center",
    justifyContent: "flex-end",
    paddingRight: "10px",
    [theme.breakpoints.between('xs', 'md')]: {
      flexBasis: "100%",
    },
  },
  logoImg: {
    maxWidth: "180px",
    height: "auto",
    cursor: "pointer",
    
  },
  menuButton: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    backgroundColor: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#eaeaea",
    },
    borderRadius: "80px",
    marginLeft: 0,
    marginTop: "3px",
    marginBottom: "3px",
    width: "100%",

    [theme.breakpoints.between("xl","sm")]: {
      marginLeft: theme.spacing(1),
      width: "60%",
    },
    [theme.breakpoints.between("xs","xl")]: {
      marginLeft: theme.spacing(1),
      width: "50%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1.8, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  navMenuText:{
    paddingLeft:"12px",
    paddingRight:"12px",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "1.5",
    fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif"
  },
  menuSecond:{
    display:"none",
    [theme.breakpoints.between('xs', 'md')]: {
      display: "flex",
    },
  },
  navLink:{
    textDecoration:'none'
  },
  linkActive:{
    textDecoration:'none',
    paddingBottom: "5px",
    borderBottom: "2px solid orange",
    color: "#757575"
  },
  dialogLog:{
    textAlign:"center",
    color:colorSecond,
   
  },
  btnDialog:{
    color:colorSecond
  },
  btnConex:{
    color:"#000",
    borderColor:"#000"
  },
  btnClose:{
    color:"red"
  }
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    background: colorSecond,
    color: "#fff",
  },
}))(Badge);

 function SecondNav({t}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lang = useParams().lang;
  const history = useHistory();
  const handleClickOpen = () => {
    dispatch(TOGGLE(true));

  };
  const [openDrawOrder,setOpenDrawOrder]= useState(false);

  const handleDrawerOrderClose = () => {
      setOpenDrawOrder(false);
  };
  const handleDrawerOrderOpen = () => {
    setOpenDrawOrder(true);
    
  };
  const handleOrder = ()=>{
    history.push(`/${lang}/order`)
  }
  const goToHome = ()=>{
    history.push(`/${lang}/`)
  }
  const isLog = useSelector((state)=>state.isLogged);
  const favs = useSelector((state)=> state.favProducts);
  const orders = useSelector((state)=>state.orders)

  const openDialogLogFav = () =>{
    dispatch(OPENDIAGFAVLOG(true)); 
  }
 
  const handleClickOpenDrawMenu = () => {
    dispatch(MENU(true)); 
  };

  return (
    <div>
    <div className={classes.root}>
      <div className={classes.logo}>
      <img src={Logo} alt="Logo" className={classes.logoImg} onClick={goToHome} />
      </div>
      <div className={classes.navMenu}>
        <p className={classes.navMenuText}><Link to={`/${lang}/`} className={classes.navLink,classes.linkActive}>{t('translate.header.second.home')}</Link></p>
        <p className={classes.navMenuText}>{t('translate.header.second.epice')}</p>
        <p className={classes.navMenuText}>{t('translate.header.second.the')}</p>
        <p className={classes.navMenuText}>{t('translate.header.second.accessoire')}</p>
        <p className={classes.navMenuText}>{t('translate.header.second.coffret')}</p>
      </div>
      <div className={classes.searchNav}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Rechercher"
            onClick={handleClickOpen}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "t('translate.header.second.search')" }}
          />
        </div>
        {
          (isLog) ?  (<Link to={`/${lang}/favorites`} style={{color:"black"}}>
          <IconButton aria-label="show 17 new notifications" color="inherit" >
          <StyledBadge badgeContent={favs.length}>
            <FavoriteRounded />
          </StyledBadge>
        </IconButton>
        </Link>) : (
          <>
           <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClickOpenDrawMenu} >
           <StyledBadge badgeContent={0}>
             <FavoriteRounded />
           </StyledBadge>
         </IconButton>
         <LoginFav lang />
          </>
        )
        }
       
      <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleOrder}>
        <StyledBadge badgeContent={orders.length}>
          <ShoppingCart />
        </StyledBadge>
      </IconButton>
      </div>
      <IconButton
                aria-label="show more" 
                aria-haspopup="true"
                color="inherit"
                className={classes.menuSecond}
                onClick={handleClickOpenDrawMenu}
              >
                <MoreIcon />
              </IconButton>
      < SearchPage/>         
    </div>
    <MenuDrawer />

    <DrawerOrder openDrawOrder={openDrawOrder}  handleDrawerOrderClose={handleDrawerOrderClose}  />
    </div>
  );
}
export default withNamespaces()(SecondNav);