import React, { useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
  Snackbar
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockOpenOutlined from "@material-ui/icons/LockOpenOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { colorSecond } from "../../Couleurs";
import { useParams } from "react-router-dom";
import verif from "../../services/verifChamps";
import authApi from "../../services/authApi";

const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "& $notchedOutline": {
      borderColor: "black",
    },
    "&:hover $notchedOutline": {
      borderColor: "black",
    },
    "&$focused $notchedOutline": {
      borderLeftWidth: 6,
      padding: "4px !important",
      borderColor: "black",
    },
  },
  focused: {},
  notchedOutline: {},
}));
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
    color: "white",
    marginTop: -45,
  },
  inputLabel: {
    "&$inputFocused": {
      color: "black",
    },
  },
  inputFocused: {},
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Password = ({ history }) => {
  const classes = useStyles();
  const token = useParams().token;
  const outlinedInputClasses = useOutlinedInputStyles();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [repeat, setrepeat] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRep = (e) => {
    setrepeat(e.target.value);
  };
  const [erreur, setErreur] = useState({
    state: false,
    helper: "",
  });
  const[repServ,setRepServ]= useState({
    state:'success',
    helper:''
  });
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const sendEmail = async (event) => {
    event.preventDefault();
    const verification = verif.verifPassword(password);
    setErreur(verification);
    if (!verification.state) {
      if (password === repeat) {
        setLoading(true);
        try {
          const resp = await authApi.ChangePassword({ password, token });
          await setRepServ({
            state:'success',
            helper:resp
          })
           setLoading(false);
          setOpenSnack(true)
         
        } catch (error) {
          await setRepServ({
            state:'error',
            helper:error.response.data.detail
          })
          setLoading(false);
          setOpenSnack(true)
        }
      } else {
        setErreur({
          state: true,
          helper: "Veuillez saisir le meme mot de passe",
        });
      }
    }
  };
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
          Changer votre mot de passe ?
        </Typography>
        <Typography component="h1" variant="body2" className={classes.desc}>
          Saisissez votre nouveau mot de passe
        </Typography>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel
            htmlFor="outlined-adornment-password"
            classes={{ focused: classes.inputFocused }}
            className={classes.inputLabel}
            error={erreur.state}
          >
            nouveau mot de passe *
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            error={erreur.state}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={175}
            classes={outlinedInputClasses}
          />
          {null !== erreur.helper && (
            <FormHelperText error={true}>{erreur.helper}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          variant="outlined"
          size="small"
          fullWidth
          style={{ marginTop: "10px" }}
        >
          <InputLabel
            htmlFor="outlined-adornment-password"
            classes={{ focused: classes.inputFocused }}
            className={classes.inputLabel}
            error={erreur.state}
          >
            confirmer le nouveau mot de passe *
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={repeat}
            onChange={handleChangeRep}
            error={erreur.state}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={270}
            classes={outlinedInputClasses}
          />
          {null !== erreur.helper && (
            <FormHelperText error={true}>{erreur.helper}</FormHelperText>
          )}
        </FormControl>

        <Button
          type="submit"
          fullWidth
          className={classes.submit}
          onClick={sendEmail}
          disabled={loading}
        >
          Valider
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </Container>
  );
};
export default Password;
