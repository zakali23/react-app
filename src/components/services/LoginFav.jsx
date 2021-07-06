import React from 'react';
import {makeStyles } from "@material-ui/core/styles";
import {Button,Dialog,DialogContent,DialogContentText,DialogTitle,Slide} from '@material-ui/core';
import { useDispatch,useSelector } from "react-redux";
import { OPENDIAGFAVLOG} from "../../actions";
import { colorSecond } from "../../Couleurs";
import { Link } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  const useStyles = makeStyles((theme) => ({
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
const LoginFav = (props) => {
    const classes = useStyles(); 
    const favLogDialog = useSelector((state)=> state.dialogFavLogin);
    const dispatch = useDispatch();
    const closeDialogLogFav = ()=>{
        dispatch(OPENDIAGFAVLOG(false));
    }
    return (
        <Dialog
        open={favLogDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialogLogFav}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.dialogLog} >"Rejoignez-nous ou s'identifir" </DialogTitle>
        <DialogContent className={classes.dialogLog} >
          <DialogContentText id="alert-dialog-slide-description" >
          Devenez Membre Ecom pour profiter de livraisons rapides et d'autre services gratuites. Rejoignez-nous ou S'identifier
          </DialogContentText  >
          <Link to={`/${props.lang}/login`} className={classes.navLink}>
            <Button variant="outlined"  className={classes.btnConex}  >
              Se connecter
            </Button>
          </Link>
          <Link to={`/${props.lang}/register`} className={classes.navLink}>
            <Button className={classes.btnDialog} >
              S'enregistrer
            </Button>
          </Link>
        </DialogContent>
        
      </Dialog>
          
    )
}
export default LoginFav;