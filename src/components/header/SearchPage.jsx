import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import Slide from '@material-ui/core/Slide';
import { useSelector,useDispatch } from "react-redux";
import { TOGGLE } from '../../actions';
import {grisHeader,colorPrimary, colorSecond} from '../../Couleurs';
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    boxShadow: "none",
    background:grisHeader,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  headerSearch:{
    color:colorPrimary,
    display: "flex",
    flexFlow: "row nowrap",
  },
  search: {
    position: "relative",
    borderRadius: "80px",
    backgroundColor: "#f5f5f5",
    "&:hover": {
      backgroundColor: "#eaeaea",
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
    display: "flex",
    flexFlow: "row wrap",
    flexBasis: "80%",
    alignContent: "center",
    justifyContent: "center",
  },
  inputInput: {
    padding: theme.spacing(1.8, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    border: "solid 2px #f59325",
    borderRadius: "80px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "60ch",
      },
    },
  },
  iconSearch:{
    display: "flex",
    flexFlow: "row wrap",
    flexBasis: "10%",
    alignContent: "center",
    justifyContent: "center",
  },
  iconClose:{
    display: "flex",
    flexFlow: "row wrap",
    flexBasis: "10%",
    alignContent: "end",
    justifyContent: "end",
  },
  secondColor:{
      color:'red'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchPage(props) {
  const classes = useStyles();
  const open = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const secondaryColor = {
    color: colorSecond
 }

  const handleClose = () => {
    dispatch(TOGGLE(false));
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.headerSearch}>
              <div  className={classes.iconSearch}>
               <IconButton  color="inherit" onClick={handleClose} aria-label="close">
                 <Search />
               </IconButton>
              </div>

            <InputBase
                  placeholder="Chercher..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "Recherche" }}
                />
                <div className={classes.iconClose}>
                    <IconButton  color="inherit" onClick={handleClose} aria-label="Search" >
                    <CloseIcon />
                    </IconButton>
                </div>
              
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" secondaryTypographyProps={{ style: secondaryColor }}  />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" secondaryTypographyProps={{ style: secondaryColor }} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
