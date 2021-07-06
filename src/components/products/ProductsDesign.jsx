import { useEffect, useState } from 'react';
import {Grid} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import ProductDesign from './ProductDesign';
import { makeStyles } from '@material-ui/core/styles';
import productsApi from "../../services/productsApi";
import { useParams } from 'react-router-dom';
import favorites from "../../services/favorites";
import authApi from "../../services/authApi";
import { useDispatch,useSelector } from "react-redux";
import { PRODUCTS} from "../../actions";
const useStyles = makeStyles((theme) => ({
    main:{
        flexGrow: 1,
        marginTop:theme.spacing(2)
    }
}));
const ProductsDesign = ()=>{
    const classes = useStyles();
    const lang = useParams().lang;
    const dispatch = useDispatch();
    const isLog = authApi.verificate();
    const [loading,setLoading]=useState(true);
    const products = useSelector((state)=> state.products);
    const getAllProd = async ()=>{
        
        const url = `${process.env.REACT_APP_API_PATH}/${lang}/products?order[date]=Desc&priceFinal[gt]=0&priceFinal[lt]=20`;
        const prds = await productsApi.getAllProducts(url).then(data=>data['hydra:member']);
        await dispatch(PRODUCTS(prds));
        setLoading(false)
    }
    const getAllProdIsFav = async ()=>{
        
        const url = `${process.env.REACT_APP_API_PATH}/${lang}/products?order[date]=Desc&priceFinal[gt]=0&priceFinal[lt]=20`;
        const prds = await productsApi.getAllProducts(url).then(data=>data['hydra:member']);
        const favs = await productsApi.GetFavoriteProducts(lang).then(data=>data)
        await prds.map(item=>item.choice = favorites.isFav(favs,item.id));
        await dispatch(PRODUCTS(prds));
        setLoading(false)
    }
    useEffect(()=>{
        isLog ? getAllProdIsFav() : getAllProd()
    },[])
    return (
        <Grid container  className={classes.main}>
           
            {
                (loading) ?(
                    <Grid container className={classes.main}>
                        <Grid item md={3}>
                            <Grid container>
                                <Grid item xs={12}>
                                <Skeleton animation="wave" variant="rect" width={410} height={318}/>
                                </Grid>
                                <Grid item xs={8}>
                                <Skeleton animation="wave" variant="text" width={80} />
                                <Skeleton animation="wave" variant="text"  width={50} />
                                <Skeleton animation="wave" variant="text"  width={80} />
                                </Grid>
                                <Grid item xs={4} >
                                 <Grid container
                                 direction="row"
                                 justify="flex-start"
                                 alignItems="center"
                                 >
                                    <Skeleton animation="wave" variant="circle" width={30} height={30} />
                                    <Skeleton animation="wave" variant="circle" width={30} height={30} /> 
                                </Grid>   
                                
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3}>
                            <Grid container>
                                <Grid item xs={12}>
                                <Skeleton animation="wave" variant="rect" width={410} height={318}/>
                                </Grid>
                                <Grid item xs={8}>
                                <Skeleton animation="wave" variant="text" width={80} />
                                <Skeleton animation="wave" variant="text"  width={50} />
                                <Skeleton animation="wave" variant="text"  width={80} />
                                </Grid>
                                <Grid item xs={4} >
                                 <Grid container
                                 direction="row"
                                 justify="flex-start"
                                 alignItems="center"
                                 >
                                    <Skeleton animation="wave" variant="circle" width={30} height={30} />
                                    <Skeleton animation="wave" variant="circle" width={30} height={30} /> 
                                </Grid>   
                                
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3}>
                            <Grid container>
                                <Grid item xs={12}>
                                <Skeleton animation="wave" variant="rect" width={410} height={318}/>
                                </Grid>
                                <Grid item xs={8}>
                                <Skeleton animation="wave" variant="text" width={80} />
                                <Skeleton animation="wave" variant="text"  width={50} />
                                <Skeleton animation="wave" variant="text"  width={80} />
                                </Grid>
                                <Grid item xs={4} >
                                 <Grid container
                                 direction="row"
                                 justify="flex-start"
                                 alignItems="center"
                                 >
                                    <Skeleton animation="wave" variant="circle" width={30} height={30} />
                                    <Skeleton animation="wave" variant="circle" width={30} height={30} /> 
                                </Grid>   
                                
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3}>
                            <Grid container>
                                <Grid item xs={12}>
                                <Skeleton animation="wave" variant="rect" width={410} height={318}/>
                                </Grid>
                                <Grid item xs={8}>
                                <Skeleton animation="wave" variant="text" width={80} />
                                <Skeleton animation="wave" variant="text"  width={50} />
                                <Skeleton animation="wave" variant="text"  width={80} />
                                </Grid>
                                <Grid item xs={4} >
                                 <Grid container
                                 direction="row"
                                 justify="flex-start"
                                 alignItems="center"
                                 >
                                    <Skeleton animation="wave" variant="circle" width={30} height={30} />
                                    <Skeleton animation="wave" variant="circle" width={30} height={30} /> 
                                </Grid>   
                                
                                </Grid>
                            </Grid>
                        </Grid>
                      
                    </Grid>
                ) :
            (products.map((product)=><Grid item xs={12} sm={3} key={product.id}  ><ProductDesign {...product} /></Grid> ))
            }
        </Grid>
    )
}

export default ProductsDesign;