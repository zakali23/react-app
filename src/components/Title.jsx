import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
root:{
  flexGrow:1,
  alignContent:"center",
  justifyContent:"center",
  textAlign:"center",
  padding:"16px 6px 16px"
}
}));

 const Title = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h3" gutterBottom className={classes.root}>
        {props.text}
      </Typography>
    </div>
  )
}
export default Title;