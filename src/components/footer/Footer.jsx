import react from "react";
import { makeStyles } from "@material-ui/core/styles";
import Facebook from "@material-ui/icons/Facebook";
import Instagram from "@material-ui/icons/Instagram";
import { Grid, Divider } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    background: "black",
    width: "100%",
    padding: "2% 10%",
    color: "orange",
  },
  socialIcon: {
    margin: "5px",
    padding: "5px",
    backgroundColor: "#7e7e7e",
    color: "black",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "black",
      backgroundColor: "white",
    },
  },
  list: {
    color: "#fff",
    listStyleType: "none",
    margin: "0px",
    padding: "12px 0px",
  },
  divider: {
    display: "flex",
    justifyContent: "center",
    background: "#6a6a6a",
    margin: "14px 2px",
    height: "1px",
    width: "100%",
  },
  copyright: {
    color: "#6a6a6a",
    fontSize: "1em",
  },
  politique: {
    display: "flex",
    justifyContent: "space-between",
    listStyleType: "none",
    margin: "0",
    padding: "0px 5px",
    color: "#6a6a6a",
    fontSize: "1em",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Grid className={classes.service} container>
        <Grid
          xs={12}
          md={6}
          container
          direction="row"
          justify="flex-start"
          item
        >
          <Grid xs={12} md={4} item>
            Service
            <ul className={classes.list}>
              <li>Partenaires</li>
              <li>Conditions générales</li>
              <li>Clause de non-responsabilité</li>
              <li>Politique des données personnelles</li>
              <li>Expédition et retours</li>
              <li>Service à la clientèle</li>
              <li>Plan du site</li>
            </ul>
          </Grid>
          <Grid xs={12} md={4} item>
            Contact & aide
            <ul className={classes.list}>
              <li>Aide</li>
              <li>Contact</li>
              <li>Adresse: 13 a rue machin 67170 Strasbourg</li>
              <li>Télephone : 03 88 88 88 88</li>
              <li>Email: contact@email.com</li>
            </ul>
          </Grid>
          <Grid xs={12} md={4} item>
            Actualitées
            <ul className={classes.list}>
              <li>Nos offres</li>
              <li>Nouveaux produits</li>
              <li>Produits</li>
            </ul>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          md={6}
          direction="row"
          justify="flex-end"
          alignItems="baseline"
          container
          item
        >
          <IconButton
            aria-label="facebook"
            component="span"
            color="secondary"
            className={classes.socialIcon}
          >
            <Facebook fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="facebook"
            component="span"
            color="secondary"
            className={classes.socialIcon}
          >
            <Instagram fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="facebook"
            component="span"
            color="secondary"
            className={classes.socialIcon}
          >
            <WhatsApp fontSize="small" />
          </IconButton>
        </Grid>
        <Divider className={classes.divider}></Divider>
        <Grid xs={12} md={6} item className={classes.copyright}>
          © Copyright 2020 CITRON SAFRAN - Tous droits réservés
        </Grid>
        <Grid xs={12} md={6} item>
          <ul className={classes.politique}>
            <li>Politique en matière de confidentialité et de cookies</li>
            <li>Paramètres de cookies</li>
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
