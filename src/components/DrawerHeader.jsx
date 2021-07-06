import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import { Link } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HowToReg from '@material-ui/icons/HowToReg';
import Work from '@material-ui/icons/Work';
import FavoriteSharp from '@material-ui/icons/FavoriteSharp';
import Button from '@material-ui/core/Button';
import EnhancedEncryption from '@material-ui/icons/EnhancedEncryption';
import {useSelector,useDispatch} from 'react-redux';
import {DRAWERING} from '../actions';
import { colorPrimary,grisHeader } from "../Couleurs";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
 
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: drawerWidth,
    background:grisHeader,
    
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    alignContent: "center",
    justifyContent: 'space-between',
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  logo:{
    width:"40px",
    height:"40px"
  },
  linkDrawer:{
    fontSize:'0.8em',
    textDecoration:"none",
    color:colorPrimary
  },
  iconList:{
    color:colorPrimary
  },
  aide:{
    margin:"12px 6px 1px",
    border:"solid 1px #f59325",
    color:"#f59325"
  },
  contenu:{
    background:grisHeader,
    padding:"1px 6px 1px"
  }
}));

export default function DrawerHeader() {
  const classes = useStyles();
  const theme = useTheme();
  const open = useSelector(state=>state.drawer);

  const dispatch = useDispatch();
  const handleDrawerClose = () => {
    dispatch(DRAWERING(false))
  };

  const menuItemsDraw = [
    {
      icon:(< HowToReg />),
      link:'/profile',
      text:'Profil'
    },
    {
      icon:(< EnhancedEncryption />),
      link:'/password',
      text:'Mot de passe'
    },
    {
      icon:(< Work />),
      link:'/commande',
      text:'Commandes'
    },
    {
      icon:(< FavoriteSharp />),
      link:'/favorite',
      text:'Favories'
    }
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Drawer
      
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <img src="/logoM.png" className={classes.logo} alt="logo"/>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        
        <Divider />
        <List
        
        >
          {menuItemsDraw.map((item,index) => (
              <ListItem button key={index}>
              <ListItemIcon className={classes.iconList}>
              {item.icon} 
              </ListItemIcon>
              <Link to={item.link} className={classes.linkDrawer}>
                  <ListItemText primary={item.text} />
              </Link>
            </ListItem>
          ))}
        
        </List>
        <Divider />
        <Button variant="outlined" className={classes.aide}>Aide et assistance</Button>
        <div className={classes.contenu}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ut minus commodi ipsa esse natus maxime, iusto, </p>
        </div>
      </Drawer>
      
    </div>
  );
}
