import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import CardProduit from "./Products";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
  }));
const Products = () => {
    const classes = useStyles();
  return (
  
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          
        >
          <Grid
            item
            md={3}
            style={{ flexBasis: "auto", paddingBottom:"10px" }}
          >
            <CardProduit />
          </Grid>
          <Grid
            item
            md={3}
            style={{ flexBasis: "auto", paddingBottom:"10px"  }}
          >
            <CardProduit />
          </Grid>
          <Grid
            item
            md={3}
            style={{ flexBasis: "auto" , paddingBottom:"10px" }}
          >
            <CardProduit />
          </Grid>
          <Grid
            item
            md={3}
            style={{ flexBasis: "auto", paddingBottom:"10px"  }}
          >
            <CardProduit />
          </Grid>
        
        </Grid>
      </div>
    
  );
};
export default Products;