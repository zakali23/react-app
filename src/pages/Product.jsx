import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {colorSecond } from "../Couleurs";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import HeaderDesign from "../components/header/HeaderDesign";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import AddShoppingCartOutlined from "@material-ui/icons/AddShoppingCartOutlined";
import FavoriteBorderOutlined from "@material-ui/icons/FavoriteBorderOutlined";
import IconButton from "@material-ui/core/IconButton";
import { withNamespaces } from "react-i18next";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useDispatch,useSelector } from "react-redux";
import { OPENDIAGFAVLOG} from "../actions";


const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "black",
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important",
      borderColor: colorSecond, // override inline-style
    },
  },
})(TextField);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperTitle: {
    padding: theme.spacing(8),
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),

     },
  },
  paperImg: {
    padding:"20px 10px 20px 10px",
    maxWidth:"90%",
    height:"auto",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("md")]: {
      padding:"10px 10px 30px 10px",

     },
  },
  desc:{
    padding:"20px 10px 20px 10px",
    
  },
  paperDesc: {
    padding: "15px 15px 5px 0px",
    color: theme.palette.text.secondary,
  },
  formControl: {
    width: "100%",
    "&:before": {
      borderColor: "black",
    },
    "&:after": {
      borderColor: colorSecond,
    },
  },
  select: {
    width: "100%",
    "&:before": {
      borderColor: "black",
    },
    "&:after": {
      borderColor: colorSecond,
    },
  },
  customSelect:{
    width: "100%",
    "& .MuiOutlinedInput-input": {
      color: "black"
    },
    "& .MuiInputLabel-root": {
      color: "gray"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "black"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "black"
    },
    "&:hover .MuiInputLabel-root": {
      color: "black"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "black"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
     
      color: colorSecond
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: colorSecond
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colorSecond

    }
  },
  iconFav:{
     fontSize: 35, color:"black",
  },
  iconShop:{
    fontSize: 25, color:"black",
 },
  stock:{
    padding: "10px 0px 0px 15px",
    color: "green",
    [theme.breakpoints.down("md")]: {
      padding: "5px,0px,0px 1px",

     },
  },
  typoStock:{
    [theme.breakpoints.down("md")]: {
     fontSize:"12px"

     },
  }
}));

const SingleProduct = ({ t, i18n }) => {
  const classes = useStyles();
  const isLog = useSelector((state)=>state.isLogged);
  const favs = useSelector((state)=> state.favProducts);
  const dispatch = useDispatch();
  const title = useParams().slug;
  const [value, setValue] = React.useState(2);
  const local = useParams().lang;
  const [langue, setLangue] = useState();
  const [unite, setUnite] = React.useState(1);
  const [quantite] = React.useState(10);
  const handleChangeUn = (event) => {
    setUnite(event.target.value);
  };
  const openDialogLogFav = () =>{
    dispatch(OPENDIAGFAVLOG(true)); 
  }
  useEffect(() => {
    setLangue(local);
    i18n.changeLanguage(langue);
  }, [langue]);
  return (
    <>
      <HeaderDesign />
      <div className={classes.root}>
        <Grid container spacing={0} style={{alignItems:"start"}}>
          <Grid item xs={12}>
            <Paper className={classes.paperTitle} elevation={0}>
              <Typography variant="h2" gutterBottom>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" href="/">
                    Accueil
                  </Link>
                  <Typography color="textPrimary">{title}</Typography>
                </Breadcrumbs>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paperImg} elevation={0}>
            <AwesomeSlider animation="cubeAnimation">
              <div data-src="https://cdn.webshopapp.com/shops/213602/files/138825629/curcuma-inde.jpg" />
              <div data-src="https://cdn.webshopapp.com/shops/213602/files/138825629/curcuma-inde.jpg" />
              <div data-src="https://cdn.webshopapp.com/shops/213602/files/138825629/curcuma-inde.jpg" />
            </AwesomeSlider>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} container className={classes.desc}>
            <Grid item xs={8}>
              <Paper elevation={0}>
                <Typography variant="h4" gutterBottom>
                  Titre Produit 
                  {!isLog ?(<IconButton
                    aria-label="upload picture"
                    component="span"
                    onClick={openDialogLogFav}
                  >
                    <FavoriteBorderOutlined className={classes.iconFav} />
                  </IconButton>) : (<IconButton
                    aria-label="upload picture"
                    component="span"
                  >
                    <FavoriteBorderOutlined className={classes.iconFav} />
                  </IconButton>)}
                </Typography>

                <Divider light />
                <Typography variant="h6" gutterBottom>
                  Categorie produit
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={4} container>
              <Grid item xs={8}>
                <Paper elevation={0}>
                  <ValidationTextField
                    id="outlined-basic"
                    label="unité"
                    value={unite}
                    variant="outlined"
                    type="number"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    className={classes.select}
                    onChange={handleChangeUn}
                  />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0} style={{paddingLeft:"10%"}}>
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                  >
                    <AddShoppingCartOutlined className={classes.iconShop} />
                  </IconButton>
                </Paper>
              </Grid>
             

              <Grid item xs={8}>
                <Paper elevation={0}>
                <TextField id="select"
                label="Quantité en g" 
                value={quantite}
                variant="outlined"
                size="small"
                className={classes.customSelect}
                 select>
                  <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                </TextField>
                </Paper>
              </Grid>
              <Grid item xs={4}>
               {/* a modifier */}
               <Paper elevation={0} className={classes.stock}>
               <Typography className={classes.typoStock}>En stock</Typography>
               </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paperDesc} elevation={0}>
                <Typography variant="h6">Description</Typography>
                <Typography variant="body1" gutterBottom>
                  body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                  inventore consectetur, neque doloribus, cupiditate numquam
                  dignissimos laborum fugiat deleniti? Eum quasi quidem
                  quibusdam.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default withNamespaces()(SingleProduct);
