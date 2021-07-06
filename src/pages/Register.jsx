import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Link,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormHelperText,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import SupervisedUserCircleOutlined from "@material-ui/icons/AccountCircle";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { colorSecond } from "../Couleurs";
import { useParams } from "react-router-dom";
import authApi from "../services/authApi";
import verif from "../services/verifChamps";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colorSecond,
  },
  title: {
    textAlign: "center",
  },
  desc: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  inputLabel: {
    "&$inputFocused": {
      color: "black",
    },
  },
  inputFocused: {},
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colorSecond,
    color: "white",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

export default function Register(history) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const local = useParams().lang;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    birthday: "",
    password: "",
    country: "",
    news: false,
  });
  const handleChange = (prop) => (event) => {
    setCredentials({ ...credentials, [prop]: event.target.value });
  };
  const handleChangeCheck = (event) => {
    setCredentials({ ...credentials, news: event.target.checked });
  };
  const [stateRegister,setStateRegister]=useState({
    state:'error',
    helper:"",
    position:"bottom"
  });
  const [erreur, setErreur] = useState({
    firstName: {
      state: false,
      helper: "",
    },
    lastName: {
      state: false,
      helper: "",
    },
    email: {
      state: false,
      helper: "",
    },
    phone: {
      state: false,
      helper: "",
    },
    password: {
      state: false,
      helper: "",
    },
    address: {
      state: false,
      helper: "",
    },
    city: {
      state: false,
      helper: "",
    },
    zipCode: {
      state: false,
      helper: "",
    },
    birthday: {
      state: false,
      helper: "",
    }
  });
  const checkForm = (credentials) => {
    let verifs = {
      firstName: {},
      lastName: {},
      email: {},
      phone: {},
      password: {},
      address: {},
      city: {},
      zipCode: {},
      birthday: {},
    };
    let activator = [];
    verifs.firstName = verif.verifFirstName(credentials.firstName, 2);
    activator.push(verifs.firstName.state);
    verifs.lastName = verif.verifLastName(credentials.lastName, 2);
    activator.push(verifs.lastName.state);
    verifs.email = verif.verifEmail(credentials.email);
    activator.push(verifs.email.state);
    verifs.phone = verif.verifPhone(credentials.phone);
    activator.push(verifs.phone.state);
    verifs.password = verif.verifPassword(credentials.password);
    activator.push(verifs.password.state);
    verifs.address = verif.verifAddress(credentials.address, 8, 180);
    activator.push(verifs.address.state);
    verifs.city = verif.verifCity(credentials.city, 2);
    activator.push(verifs.city.state);
    verifs.zipCode = verif.verifZipCode(credentials.zipCode, 5, 5);
    activator.push(verifs.zipCode.state);
    verifs.birthday = verif.verifBirthday(credentials.birthday);
    activator.push(verifs.birthday.state);
    setErreur(verifs);
    return activator.includes(true);
  };
  const registration = async (event) => {
    event.preventDefault();
    const checking = checkForm(credentials);
    console.log(credentials.birthday)
    if (!checking) {
      const url = `${process.env.REACT_APP_API_PATH}/${local}/users`;
      setLoading(true)
      try {
        await authApi.registerUser(credentials, url);
        await setStateRegister ({
          state:'success',
          helper:' votre profil de Membre Ecom à été crée avec succée ',
          position:'top'
         });
         await setCredentials({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          zipCode: "",
          birthday: "",
          password: "",
          country: "",
          news: false,
        })
        await setLoading(false);
        await handleClickSnack();
        console.log(loading);
      }
      catch (error) {
        console.log(error,credentials)
          await setLoading(false);
          await setStateRegister ({
            state:'error',
            helper:error.response.data.violations[0].message,
            position:'bottom'
           })
          
           await handleClickSnack();
           console.log(loading);
        
       
        
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
            vertical: stateRegister.position,
            horizontal: 'center',
          }}
        >
          <Alert onClose={handleCloseSnack} severity={stateRegister.state}>
            {stateRegister.helper}
          </Alert>
        </Snackbar>
        <Avatar className={classes.avatar}>
          <SupervisedUserCircleOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Devenez membre Ecom
        </Typography>
        <Typography component="h1" variant="body2" className={classes.desc}>
          Créez votre profil de Membre Ecom et accédez au meilleur des produits,
          de l'inspiration et de la communauté Ecom en avant-première.
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                value={credentials.firstName}
                onChange={handleChange("firstName")}
                error={erreur.firstName.state}
                helperText={erreur.firstName.helper}
                fullWidth
                variant="outlined"
                size="small"
                id="firstName"
                label="Nom *"
                name="firstName"
                autoComplete="firstName"
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                value={credentials.lastName}
                onChange={handleChange("lastName")}
                error={erreur.lastName.state}
                helperText={erreur.lastName.helper}
                fullWidth
                variant="outlined"
                size="small"
                id="lastName"
                label="Prénom *"
                name="lastName"
                autoComplete="lastName"
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12}>
              <ValidationTextField
                value={credentials.email}
                onChange={handleChange("email")}
                error={erreur.email.state}
                helperText={erreur.email.helper}
                fullWidth
                variant="outlined"
                size="small"
                id="email"
                label="Email *"
                name="email"
                autoComplete="email"
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  classes={{ focused: classes.inputFocused }}
                  className={classes.inputLabel}
                  error={erreur.password.state}
                >
                  Mot de passe *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={handleChange("password")}
                  error={erreur.password.state}
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
                  labelWidth={100}
                  classes={outlinedInputClasses}
                />
                {null !== erreur.password.helper && (
                  <FormHelperText error={true}>
                    {erreur.password.helper}
                  </FormHelperText>
                )}
              </FormControl>
            
            </Grid>
            <Grid item xs={12}>
              <ValidationTextField
                value={credentials.phone}
                onChange={handleChange("phone")}
                error={erreur.phone.state}
                helperText={erreur.phone.helper}
                fullWidth
                variant="outlined"
                size="small"
                id="phone"
                label="Téléphone *"
                name="phone"
                autoComplete="phone"
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12}>
              <ValidationTextField
                value={credentials.Adresse}
                onChange={handleChange("address")}
                error={erreur.address.state}
                helperText={erreur.address.helper}
                fullWidth
                variant="outlined"
                size="small"
                id="address"
                label="Adresse *"
                name="address"
                autoComplete="address"
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <ValidationTextField
                value={credentials.city}
                onChange={handleChange("city")}
                error={erreur.city.state}
                helperText={erreur.city.helper}
                fullWidth
                variant="outlined"
                size="small"
                id="city"
                label="Ville *"
                name="city"
                autoComplete="city"
                className={classes.input}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <ValidationTextField
                value={credentials.zipCode}
                onChange={handleChange("zipCode")}
                error={erreur.zipCode.state}
                helperText={erreur.zipCode.helper}
                fullWidth
                variant="outlined"
                size="small"
                id="zipCode"
                label="Code postal *"
                name="zipCode"
                autoComplete="zipCode"
                className={classes.input}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <ValidationTextField
                value={credentials.country}
                onChange={handleChange("country")}
                fullWidth
                variant="outlined"
                size="small"
                id="country"
                label="Pays"
                name="country"
                autoComplete="country"
                className={classes.input}
              />
            </Grid>
            <Grid item xs={12}>
              <ValidationTextField
                value={credentials.date}
                error={erreur.birthday.state}
                helperText={erreur.birthday.helper}
                onChange={handleChange("birthday")}
                fullWidth
                size="small"
                variant="outlined"
                id="birthday"
                label="Date naissance *"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={credentials.news}
                    name="checked"
                    color="primary"
                    value={credentials.news}
                    onChange={handleChangeCheck}
                  />
                }
                label={
                  <Typography variant="body2">
                    Inscrivez-vous pour recevoir par e-mail les dernières infos
                    sur les produits et offres de Ecom, ainsi que des avantages
                    Membres
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                En créant un compte, vous acceptez de vous conformer à{" "}
                <Link>la Politique de confidentialité</Link> et aux{" "}
                <Link>Conditions générales</Link> de Ecom.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                className={classes.submit}
                onClick={registration}
                disabled={loading}
              >
                Rejoignez-nous
              </Button>
              <Typography variant="body2" className={classes.desc}>
                Déjà membre ?{" "}
                <Link href={`/${local}/login`}>Se connecter.</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
