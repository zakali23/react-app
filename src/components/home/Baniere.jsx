
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import React from 'react'
import { colorSecond } from '../../Couleurs';
const useStyles = makeStyles((theme) => ({
    container:{
        display:'flex',
        flexFlow: "row wrap",
        background:"#f5f5f5",
        marginTop:"20px"

    },
    centerBan:{
        display: "flex",
        flexFlow: "row wrap",
        alignContent: "center",
        justifyContent: "center",  
        padding:"5%"
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
      },
      avatar:{
        display: "flex",
        flexFlow: "row wrap",
        flexBasis: "40%",
        alignContent: "center",
        justifyContent: "center",
       
      },
      discord:{
        display: "flex",
        flexFlow: "row wrap",
        flexBasis: "60%",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "flex-start",
        
      },
      dividerColor:{
          background:colorSecond,
          height:"3px",
          maxWidth:"30%",
          margin:"10px 2px 20px"
          
      }
}));
export default function Baniere () {
    const classes = useStyles();
    return(
        <div className={classes.container}>
            <div className={classes.centerBan}>
            <div className={classes.avatar}>
            <Avatar alt="President" src="/person.jpg" className={classes.large} />
            </div>  
            <div className={classes.discord}>
            <Typography variant="h3" component="h3" gutterBottom>
                Titre ...
            </Typography>
            <Divider  className={classes.dividerColor} />
            <Typography variant="body2" gutterBottom>
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
         </div> 
         </div>
        </div>
    )
}