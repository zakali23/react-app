import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShopIcon from '@material-ui/icons/AddShoppingCartOutlined';
import MoreVertIcon from '@material-ui/icons/VisibilityOutlined';
import {Link,useParams} from 'react-router-dom';
import { colorSecond } from '../../Couleurs';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: colorSecond,
  },
  price:{
    color:colorSecond,
    fontSize:'1.5em'
  },
  viewIcon:{
    color:colorSecond,

  },
  icon:{
    color:'#000'
  },
  iconActif:{
    color:colorSecond
  }
}));

export default function CardProduit() {
  const classes = useStyles();
  const [expanded] = useState(false);

  const lang = useParams().lang;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            C
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Link to={`/${lang}/product/cumin`} className={classes.viewIcon} >
            <MoreVertIcon />
            </Link>
          </IconButton>
        }
        title="Categorie du produit"
        subheader="Curcula, Inde"
      />
      <CardMedia
        className={classes.media}
        image="https://cdn.webshopapp.com/shops/213602/files/138825629/curcuma-inde.jpg"
        title="CURCUMA , INDE"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" noWrap>
        Rhizome de couleur jaune orangé. Il entre dans la composition du curry et de beaucoup de mélanges. Caractérisé par des arômes poivrés et musqués, cette épice contient énormément de bienfaits. Notamment anti-inflammatoire.
Le curcuma réveille les caris, viandes, sauces, ragoûts, poissons, desserts...
          
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="h5" className={classes.price}>5,00 €</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          aria-label="add to favorites"
        >
          <FavoriteIcon  />
        </IconButton>
          <IconButton aria-label="add to shop" >
          <ShopIcon  />
        </IconButton>
      </CardActions>
    </Card>
  );
}
