import React from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { useDispatch,useSelector } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { MENU } from "../../actions";

const useStyles = makeStyles({
    fullList: {
        display:"flex",
        flexDirection:"column",
        flexFlow: "row wrap",
        alignContent:"center",
        justifyContent:"center",
        textAlign:"center"
      },
  
    list: {
    display:"flex",
    flexDirection:"column",
    flexFlow: "row wrap",
    alignContent:"center",
    justifyContent:"center",
    textAlign:"center"
  },
  items:{
      textAlign:"center",
      fontSize:"1em"
  }
  
});

export default function MenuDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const open = useSelector((state)=>state.menu);
    const items = ["Accueil","Epices", "Thés & infusions", "Accessoires", "Coffrets & cadeaux"];

    const handleDrawerClose = () => {
        dispatch(MENU(false))
      };
  return (
    <div>
      <Drawer anchor="top" open={open} onClose={handleDrawerClose} >
          <div className={classes.fullList}>
            <List className={classes.list}>
                {items.map((text, index) => (
                <ListItem button key={text} className={classes.items}>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
          </div>
          <IconButton onClick={handleDrawerClose} className={classes.list}>
                    {theme.direction === 'ltr' ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
    </Drawer>
    </div>
  );
}
