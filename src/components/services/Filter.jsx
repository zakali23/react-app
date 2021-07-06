import  { useEffect, useState } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {MenuItem,Typography,Grid,Slider,FormControl,Select} from "@material-ui/core/";
import { useParams } from 'react-router-dom';
import { colorSecond } from "../../Couleurs";
import { ThemeProvider } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { PRODUCTS} from "../../actions";
import productsApi  from "../../services/productsApi";



const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: colorSecond,
      },
      track: {
        color: colorSecond,
      },
      rail: {
        color: "black",
      },
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  categories:{
    margin: theme.spacing(1),
    width:"250px",
    [theme.breakpoints.up("lg")]: {
      width:"350px",
    },
  },
  price:{
    margin: theme.spacing(1),
    paddingTop: "34px",
    width:"250px",
    [theme.breakpoints.up("lg")]: {
      width:"450px",
      paddingTop: "34px",
    },
  },
  tri:{
    margin: theme.spacing(1),
    width:"250px",
    [theme.breakpoints.up("lg")]: {
      width:"350px",
    },
  },

  formControl: {
    margin: theme.spacing(1),
    
  },
  selectEmpty: {
   
    marginTop: theme.spacing(2),
  },
  select: {

    "&:before": {
      borderColor: "gray",
    },
    "&:after": {
      borderColor: colorSecond,
    },
  },
}));
const Promo = () => {
  const classes = useStyles();
  const lang = useParams().lang;
  const dispatch = useDispatch();
  const [category, setCategorie] = useState(0);
  const [tri, setTri] = useState(
    {id:0,name:'date',order:'desc',label:'Tri: Plus recent'},
  );
  const [price,setPrice]= useState(20);
  const triChoices = [
    {id:0,name:'date',order:'desc',label:'Tri: Plus recent'},
    {id:1,name:'date',order:'Asc',label:'Tri: Plus Ancien'},
    {id:2,name:'priceFinal',order:'Asc',label:'Prix croissant'},
    {id:3,name:'priceFinal',order:'Desc',label:'Prix décroissant'}
  ]
  const [categories, setCategories] = useState([]);
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 30,
      label: "30",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 80,
      label: "80",
    },
    {
      value: 100,
      label: "100",
    },
  ];
  const [url, setUrl] = useState(`${process.env.REACT_APP_API_PATH}/${lang}/products?order[${tri.name}]=${tri.order}&priceFinal[gt]=0&priceFinal[lt]=${price}`);
  const handleChangeCat = async (e) => {
    if(e.target.value === 0){
    setCategorie(e.target.value);
    setUrl(`${process.env.REACT_APP_API_PATH}/${lang}/products?order[${tri.name}]=${tri.order}&priceFinal[gt]=0&priceFinal[lt]=${price}`);
    console.log(e.target.value)
    }
    else {
      setCategorie(e.target.value);
      setUrl(`${process.env.REACT_APP_API_PATH}/${lang}/products?categories=${category}&order[${tri.name}]=${tri.order}&priceFinal[gt]=0&priceFinal[lt]=${price}`);
    }
   
  };
  const handleChangePrice = (e,value)=> {
    if(category===0){
    setUrl(`${process.env.REACT_APP_API_PATH}/${lang}/products?order[${tri.name}]=${tri.order}&priceFinal[gt]=0&priceFinal[lt]=${value}`);
    setPrice(value);
    }else{
      setUrl(`${process.env.REACT_APP_API_PATH}/${lang}/products?categories=${category}&order[${tri.name}]=${tri.order}&priceFinal[gt]=0&priceFinal[lt]=${value}`);
      setPrice(value);
    }

  }
  const handleChangeTri = (e)=> {
    const data = triChoices.filter(item=>item.id === e.target.value);
    let trier = data[0]
    console.log(trier,e.target.value)
    if(category===0){
      setUrl(`${process.env.REACT_APP_API_PATH}/${lang}/products?order[${trier.name}]=${trier.order}&priceFinal[gt]=0&priceFinal[lt]=${price}`);
    setTri(data[0])
    }else{
     setUrl(`${process.env.REACT_APP_API_PATH}/${lang}/products?categories=${category}&order[${trier.name}]=${trier.order}&priceFinal[gt]=0&priceFinal[lt]=${price}`);
    setTri(data[0])
    }
    
  }
  function valuetext(value) {
    return `${value}°C`;
  }
  const getAllCateg = async ()=>{
    const url = `${process.env.REACT_APP_API_PATH}/${lang}/categories`;
    const items = await productsApi.getAllCategories(url).then(data=>data['hydra:member']);
    setCategories(items)
  }
  const getAllproducts = async(url)=>{
  const prds = await productsApi.getAllProducts(url).then(data=>data['hydra:member']); 
  await dispatch(PRODUCTS(prds));
    
  }
  useEffect(()=>{
    getAllCateg();
  },[])
  useEffect(()=>{
    getAllproducts(url)
  },[url])
  return (
    <Grid container
          spacing={0}
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
          >
            
      <Grid item >
      <FormControl className={classes.categories} >
          <InputLabel id="demo-simple-select-label">Categories</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={handleChangeCat}
            className={classes.select}
          >
            <MenuItem value={0} >{"tous categories"}</MenuItem>
           {categories.map(item=> <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item style={{paddingTop:'24px'}} >
        <Typography id="discrete-slider-custom" gutterBottom>
            Par prix en €
        </Typography>
        <ThemeProvider theme={muiTheme} >
            <Slider
              defaultValue={100}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-custom"
              step={5}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={handleChangePrice}
              className={classes.tri}
            />
          </ThemeProvider>
      </Grid>
      <Grid item>
      <FormControl className={classes.tri}>
          <InputLabel id="demo-simple-select-label">Tri par defaut</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tri.id}
            onChange={handleChangeTri}
            className={classes.select}
          >
            {triChoices.map(item=> <MenuItem value={item.id} key={item.id}>{item.label}</MenuItem>)}
          </Select>
        </FormControl>
      
      </Grid>

    </Grid>
  );
};

export default Promo;
