

import { Grid,TextField, Typography} from "@material-ui/core";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { grisHeader,colorSecond } from "../../Couleurs";

const ValidationTextField = withStyles((theme)=>({
    root: {
        width:"30%",
        margin:"2% 0%",
      "& input:valid + fieldset": {
        borderColor: "black",
        borderRadius: "0",
        borderWidth: 1,
      },
      '& label, label.Mui-focused': {
        color: "black",
      },
      "& input:invalid + fieldset": {
        borderColor: "red",
        borderWidth: 2,
      },
      "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        padding: "4px !important",
        borderColor: "black", // override inline-style
      },
      [theme.breakpoints.down("md")]: {
        width:"96%",
        margin:"2% 2%",
      }, 
    },
  }))(TextField);
const useStyles = makeStyles((theme) => ({
    main:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:grisHeader,
        padding:"35px 0px",
        [theme.breakpoints.down("md")]: {
            padding:"15px 0px",
            display:"grid",
            gridTemplateRows: "repeat(2, auto)"
          },

    },
    title:{
        textAlign:"center",
        margin:theme.spacing(2)
    },
    button: {
        width:"15%",
        marginLeft:"8px",
        padding:"15px ",
        color:"black",
        background:"transparent",
        border:"1px solid black",
        borderRadius: "0",
        textTransform:"capitalize",
        "&:hover":{
            color:colorSecond,
            background:"transparent",
            border:`1px solid ${colorSecond}`,
            borderRadius: "10",
            textTransform:"capitalize"
        },
        [theme.breakpoints.down("md")]: {
            width:"96%",
            margin:"10% 2%"
          },
      },
}));
const Newsletter = ()=>{
    const classes = useStyles();
    return(
        <Grid container className={classes.main}>
            <Grid xs={12} className={classes.title} item>
            <Typography variant="h3">S'abonner pour recevoir plus d'informations</Typography>
            </Grid>

                 <ValidationTextField id="outlined-basic" label="Email" variant="outlined" className={classes.input} />
                 <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                >
                    S'abonner
                </Button>
        </Grid>
    )
}
export default Newsletter;