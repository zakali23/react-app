import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import LiveHelpOutlined from '@material-ui/icons/ModeCommentOutlined';
import IconButton from '@material-ui/core/IconButton';
import {colorSecond,grisHeader} from '../Couleurs';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    toTop: {
        zIndex: 2,
        position: 'fixed',
        bottom: '10vh',
        backgroundColor: "#fff",
        color: "#fff",
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: 'black',
            backgroundColor: 'rgb(220,220,220,0.7)'
        },
        [theme.breakpoints.up('xs')]: {
            right: '3%',
            backgroundColor: colorSecond,
        },
        [theme.breakpoints.up('lg')]: {
            right: '1%',
        },
    }
})
);
const ContactUs = ()=> {
   const classes = useStyles();
   const handleClick = () => {
    }

    return (
        <div>

            
                
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.toTop}
                    startIcon={<LiveHelpOutlined  fontSize="meduim"/>}
                    onClick={handleClick}
                >
                    Aide&contact
                </Button>
            
            

    </div>
    )
}

export default ContactUs;