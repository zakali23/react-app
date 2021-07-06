import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link as Liens, CircularProgress } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import authApi from "../services/authApi";
import { useDispatch } from "react-redux";
import { SIGN_IN } from "../actions";
import { colorSecond } from "../Couleurs";
import { Link } from "react-router-dom";
authApi.verificate();
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Liens color="inherit" href="/">
        ecom.fr
      </Liens>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperSubmit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colorSecond,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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
    color: "#fff",
    marginTop: -45,
  },
  inputLabel: {
    "&$inputFocused": {
      color: "black",
    },
  },
  inputFocused: {},
  forgot: {
    color: "rgba(0, 0, 0, 0.38)",
    textDecoration: "none",
    "&:hover": {
      color: "black",
      textDecoration: "underline",
    },
  },
  link: {
    color: "#3f51b5",
    textDecoration: "none",
    "&:hover": {
      color: colorSecond,
      textDecoration: "underline",
    },
  },
}));
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
export default function Login(history) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const outlinedInputClasses = useOutlinedInputStyles();
  const local = useParams().lang;
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });
  const [erreur, setErreur] = React.useState({
    state: false,
    helper: "",
  });

  const [open, setOpen] = React.useState(false);

  const [erreurs, setErreurs] = React.useState({
    email: "",
    password: "",
    send: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (prop) => (event) => {
    setCredentials({ ...credentials, [prop]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const sendLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (/.+@.+/.test(credentials.username)) {
        await authApi.authenticate(credentials);
        dispatch(SIGN_IN(true));
        history.history.replace("/");
      } else {
        await setLoading(false);
        setErreur({
          state: true,
          helper: "Email non valid",
        });
      }
    } catch (e) {
      setErreurs({ ...erreurs, ["send"]: "auccun utilisateur " });
      setLoading(false);
      console.log(erreurs);
      setOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ValidationTextField
                variant="outlined"
                value={credentials.email}
                onChange={handleChange("username")}
                fullWidth
                error={erreur.state}
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                helperText={erreur.helper}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  classes={{ focused: classes.inputFocused }}
                  className={classes.inputLabel}
                >
                  Mot de passe*
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={handleChange("password")}
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
                  labelWidth={110}
                  classes={outlinedInputClasses}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" />}
                label="Connexion automatique"
              />
              <Link to={`/${local}/forgot`} className={classes.forgot}>
                Mot de passe oublié
              </Link>
            </Grid>
          </Grid>
          <div className={classes.paperSubmit}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={sendLogin}
              disabled={loading}
            >
              Se connecter
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <br></br>
          <Grid container justify="flex-end" spacing={0}>
            <Grid item>
              <Link
                to={`/${local}/register`}
                variant="body2"
                className={classes.link}
              >
                Vous avez déjà un compte? s'enregistrer
              </Link>
            </Grid>
          </Grid>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert onClose={handleClose} severity="error">
              {erreurs.send}
            </Alert>
          </Snackbar>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
