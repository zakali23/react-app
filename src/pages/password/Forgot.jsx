import React,{useState} from "react";
import { Container, Typography,Avatar,TextField,Button,CircularProgress, Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import LockOpenOutlined from "@material-ui/icons/LockOpenOutlined";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import {colorSecond} from '../../Couleurs';
import {useParams} from 'react-router-dom'
import verif from "../../services/verifChamps";
import authAoi from '../../services/authApi';


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
      "&  label.Mui-focused": {
        color: "black",
      },
      "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        padding: "4px !important",
        borderColor: "black", // override inline-style
      },
    },
  })(TextField);
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(9),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: colorSecond,
  },
  title: {
    textAlign: "center",
  },
  desc: {
    margin: theme.spacing(3),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colorSecond,
    color: "white",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  buttonProgress: {
    color: 'white',
    marginTop: -45
  },        
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Forgot = () => {
  const classes = useStyles();
  const local = useParams().lang;
  const[repServ,setRepServ]= useState({
    state:'success',
    helper:''
  });
  const [email,setEmail] = useState("");
  const [loading,setLoading]= useState(false)
  const [erreur,setErreur] = useState({
      state:false,
      helper:''
  });
  const handleChange = (e)=>{
    setEmail(e.target.value);
  }
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const sendEmail = async (event)=>{
    event.preventDefault();
    const verification = verif.verifEmail(email);
    setErreur(verification);
    
    if(!(verification.state)){
        setLoading(true);
        const url = `${process.env.REACT_APP_API_PATH}/${local}/forgotpassword`;
        try{
         const resp = await authAoi.EmailPassword({email:email},url);
         console.log(resp)
         setLoading(false);
        await setRepServ({
           state:'success',
          helper:resp
         });
         setOpenSnack(true)
        }
        catch(error){
          setLoading(false);
          await setRepServ({
            state:'error',
           helper:error.response.data
          })
          setOpenSnack(true)
          
        }
        

    }
   

  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
      <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Alert onClose={handleCloseSnack} severity={repServ.state}>
            {repServ.helper}
          </Alert>
        </Snackbar>
      <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
         Mot de passe oublié ?
        </Typography>
        <Typography component="h1" variant="body2" className={classes.desc}>
          Saisissez votre adresse e-mail pour recevoir les instructions
          expliquant comment réinitialiser votre mot de passe.
        </Typography>
        <ValidationTextField
                value={email}
                onChange={handleChange}
                error={erreur.state}
                helperText={erreur.helper}
                fullWidth
                variant="outlined"
                size="small"
                id="email"
                label="Email *"
                name="email"
                autoComplete="email"
                className={classes.input}
              />
                <Button
                        type="submit"
                        fullWidth
                        className={classes.submit}
                        onClick={sendEmail}
                        disabled={loading}
                    >
                        Valider
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              
      </div>
    </Container>
  );
};
export default Forgot;
