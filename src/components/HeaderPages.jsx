import React from "react";
import { fade, makeStyles,withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonAdd from "@material-ui/icons/PersonAdd";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import FavoriteRounded from "@material-ui/icons/FavoriteRounded";
import ExitToApp from "@material-ui/icons/ExitToApp";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { DRAWERING, NAVHEAD, SIGN_IN } from "../actions";
import DrawerHeader from "./DrawerHeader";
import authApi from "../services/authApi";
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {colorPrimary,colorSecond} from "../Couleurs";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  colorPrim:{
    color:colorPrimary
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.04),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    marginTop:'3px',
    marginBottom:'3px',
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      color: "black",
      display: "none",
    },
  },
  logoDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  logoMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      color: "black",
      display: "none",
    },
  },

  logoHeader: {
    display: "flex",
    flexFlow: "row wrap",
    flexBasis: "20%",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  menuHeader: {
    display: "flex",
    flexFlow: "row wrap",
    flexBasis: "60%",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  panierHeader: {
    display: "flex",
    flexFlow: "row wrap",
    flexBasis: "20%",
    alignContent: "center",
    justifyContent: "flex-end",
  },
  linkHeader:{
    color:colorPrimary,
    textDecoration:"none"
  }
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    background:colorSecond,
    color:"#fff"
  },
}))(Badge);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 80,
      width: '100%',
      backgroundColor: colorSecond,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(19),
    marginRight: theme.spacing(1),
    color: colorPrimary,
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export default function HeaderPages(history) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const open = useSelector((state) => state.drawer);
  const handleDrawerOpen = () => {
    dispatch(DRAWERING());
  };
  const logOut = () => {
    authApi.logout();
    dispatch(SIGN_IN(false));
  };
  const value = useSelector((state) => state.hover);

  const handleChange = (event, newValue) => {
    dispatch(NAVHEAD(newValue));
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLogged = useSelector((state) => state.isLogged);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const HandleChangePage = (url)=> {
  
    history.history.push(url);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <StyledBadge badgeContent={1}>
            <FavoriteRounded />
          </StyledBadge>
        </IconButton>
        <Link to="/favorites" className={classes.linkHeader} ><p>Favories</p></Link>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 17 new notifications" color="inherit" >
          <StyledBadge badgeContent={1}  >
            <ShoppingCart />
          </StyledBadge>
        </IconButton>
        <Link to="/panier" className={classes.linkHeader}><p>Panier</p></Link>
      </MenuItem>
        {!isLogged && ( 
         <MenuItem>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <StyledBadge badgeContent={0} color="secondary" >
                  <AccountCircle />
              </StyledBadge>
            </IconButton>
            <Link to="/login" className={classes.linkHeader}><p>Login</p></Link>
        </MenuItem>  
        )}
    
     
        {!isLogged && (
        
           <MenuItem>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <StyledBadge badgeContent={0} color="secondary">
                  <PersonAdd /> 
              </StyledBadge>
            </IconButton>
            <Link to="/register" className={classes.linkHeader}><p>S'enregister</p></Link>
            </MenuItem>
          
        )}
     
     {isLogged && (

            <MenuItem>
            <IconButton aria-label="show 17 new notifications" color="inherit" >
              <StyledBadge badgeContent={0} >
                <ExitToApp />
              </StyledBadge>
            </IconButton>
            <p onClick={() => logOut()}>Quitter</p>
            </MenuItem>

)}
        
    
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{
          background: "#fff",
          color:"black",
          boxShadow: "none"
        }}
      >
        <Toolbar>
          
          <div className={classes.logoHeader}>
          
            {isLogged && (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
          
            <img src="/logo.png" alt="Logo" style={{maxWidth:"80%",height:'auto'}} className={classes.logoDesktop}/>
            <img src="/logoM.png" alt="Logo" style={{maxWidth:"100%",height:'auto',padding:'3px'}} className={classes.logoMobile}/>
          </div>
          <div className={classes.menuHeader}>
            <StyledTabs
              value={value}
              indicatorColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
              textColor="inherit"
            >
             <StyledTab label="Home" onClick={()=>HandleChangePage("/")} />
              <StyledTab label="Produits" onClick={()=>HandleChangePage("/produits")} />
              <StyledTab label="Contact"onClick={()=>HandleChangePage("/contact")} />
            </StyledTabs>
          </div>
          <div className={classes.panierHeader}>
          <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <StyledBadge badgeContent={1}>
                  <FavoriteRounded />
                </StyledBadge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <StyledBadge badgeContent={1}>
                  <ShoppingCart />
                </StyledBadge>
              </IconButton>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Chercher..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              {!isLogged && (
                <Tooltip title="se connecter" arrow>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="primary"
                  >
                    <Badge badgeContent={0} >
                      <Link to="/login"  className={classes.linkHeader} >
                        <AccountCircle />
                      </Link>
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
              {!isLogged && (
                <Tooltip title="s'inscrire" arrow>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={0} color="secondary">
                      <Link to="/register"  className={classes.linkHeader} >
                        <PersonAdd />
                      </Link>
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
              {isLogged && (
                <>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="default"
                  >
                    <Badge badgeContent={0} >
                      <ExitToApp onClick={() => logOut()}  />
                    </Badge>
                  </IconButton>
                </>
              )}
            </div>
          </div>
          <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
          </div>
        </Toolbar>
        <DrawerHeader />
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
