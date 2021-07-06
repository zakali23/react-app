import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link,useParams } from "react-router-dom";
import clsx from "clsx";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, useDispatch } from "react-redux";
import { DRAWERING, SIGN_IN } from "../../actions";
import authApi from "../../services/authApi";
import DrawerHeader from "../DrawerHeader";
import Logo from '../../logo.svg';
import { colorPrimary } from "../../Couleurs";
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    container:{
        display:"flex",
        flexFlow: "row wrap",
        background:"#f5f5f5",
        alignContent: "center",
        justifyContent: "space-between"
        
    },
    linkNav:{
       fontSize:'0.9em',
       textDecoration:"none",
       color:colorPrimary,
       fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
       fontWeight: "500",
       lineHeight: "1.5",
       margin:0,
       textTransform: "capitalize",
       [theme.breakpoints.between("0px","285px")]: {
        fontSize:'0.5em',
       },
    },
    firstly:{
      display: "flex",
      flexFlow: "row wrap",
      flexBasis: "50%",
      alignContent: "center",
      justifyContent: "start",
    [theme.breakpoints.down("280px")]: {
      display: "flex",
      maxWidth:"110px",
      flexFlow: "row wrap",
      flexBasis: "50%",
      alignContent: "center",
      justifyContent: "start",
     },
     [theme.breakpoints.between("280px","600px")]: {
      display: "flex",
      flexFlow: "row wrap",
      flexBasis: "50%",
      alignContent: "center",
      justifyContent: "start",
     
     },
     [theme.breakpoints.up("601px")]: {
      display: "flex",
      flexFlow: "row wrap",
      flexBasis: "25%",
      alignContent: "center",
      justifyContent: "start",
     
     },
    },
    secondly:{
      display: "flex",
      flexFlow: "row wrap",
      flexBasis: "50%",
      alignContent: "center",
      justifyContent: "flex-end",
    [theme.breakpoints.down("280px")]: {
      display: "flex",
      flexFlow: "row wrap",
      flexBasis: "50%",
      maxWidth:"110px",
      alignContent: "center",
      justifyContent: "flex-end",
     },
     [theme.breakpoints.between("280px","600px")]: {
      display: "flex",
      flexFlow: "row wrap",
      flexBasis: "50%",
      alignContent: "center",
      justifyContent: "flex-end",
     
     },
     [theme.breakpoints.up("601px")]: {
      display: "flex",
      flexFlow: "row wrap",
      flexBasis: "75%",
      alignContent: "center",
      justifyContent: "flex-end",
     
     },
    },
    menuButton: {
      marginLeft:theme.spacing(0.1),
      marginRight: theme.spacing(0.1),
   },

   logo: { 
    maxWidth:"120px",
    height:"auto",
    paddingLeft:"8px",
    [theme.breakpoints.up("sm")]: {
      display:"none"
     },
    
  },
}));
 function FirstNav({t,i18n}){

    const isLogged = useSelector((state) => state.isLogged);
    const open = useSelector((state) => state.drawer);
    const dispatch = useDispatch();
    const classes = useStyles();
    const local = useParams().lang;
    const changeLanguage = code => {
      i18n.changeLanguage(code);
      
    };
   
    const handleDrawerOpen = () => {
      dispatch(DRAWERING(true));
     
    };
    const logOut = () => {
      authApi.logout();
      dispatch(SIGN_IN(false));
      dispatch(DRAWERING(false));
    };
    return(
        <div className={classes.container}>
         <div className={classes.firstly}>
            {isLogged && (<IconButton
                  color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
              </IconButton>)}
          <img src={Logo} className={classes.logo} alt="logo" />
         </div>  
       <div className={classes.secondly}>
          {!isLogged &&(<ButtonGroup variant="text"  aria-label="text primary button group" >
            <Button style={{margin:'8px 0px'}} ><Link to={`/${local}/login`} className={classes.linkNav}>{t('translate.header.first.login')}</Link></Button>
        <Button style={{margin:'8px 0px'}}><Link to={`/${local}/register`} className={classes.linkNav}>{t('translate.header.first.register')}</Link></Button>
        </ButtonGroup> )}
          {isLogged&&(
            <>
            <MenuItem>
            <Link to="" className={classes.linkNav} onClick={()=>{logOut()}}>{t('translate.header.first.discon')}</Link>
          </MenuItem>
            </>
          )}
          </div>
        <DrawerHeader/>
        </div>
    )
}
export default  withNamespaces()(FirstNav);