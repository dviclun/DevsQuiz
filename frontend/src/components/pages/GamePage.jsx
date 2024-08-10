import { useTheme } from '@emotion/react';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

export const GamePage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const [category, setCategory] = useState('');

    const [preStartCounter, setPreStartCounter] = useState(null);
    const [playingCounter, setPlayingCounter] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);



    const handleStartCounter = () => {
        setPreStartCounter(3);
    }

    useEffect(()=> {
        setTimeout(()=>{
            if(preStartCounter > 0){
                setPreStartCounter(preStartCounter - 1);
            } 
        }, 1000);

        if(preStartCounter == 0){
            setPreStartCounter(null);
            setIsPlaying(true);
        }

        let body = {
            tech: 'css'
        }

        let fetchConf = {
            method: 'POST',
            body: JSON.stringify(body), 
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch("http://localhost:3000/getQuestions", fetchConf)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))

    }, [preStartCounter])

    useEffect(()=> {
       if(isPlaying){
        setTimeout(()=>{
            if(playingCounter > 0){
                setPlayingCounter(playingCounter - 1);
            } 
        }, 1000);
       }
    },[isPlaying, playingCounter]);

    const buttonStyle = {
        backgroundColor: 'transparent', 
        border: `1px solid white`, 
        ':hover': {
            backgroundColor: 'transparent',
            transform: 'scale(102%)',
            boxShadow: '0px 0px 25px -8px rgba(0,230,246,1)'
        }
    }

    useEffect(()=> {
        if(location.state) {
            setCategory(location.state.category);
        } else {
            navigate('/')
        }
    },[])

    return (
    <Grid container className='gameContainer'>
        <Grid item>
            <Typography variant={isExtraSmall ? 'h3' : 'h1'} sx={{ color: theme.palette.mainBlue, textAlign: 'center', fontFamily: 'Fredoka', letterSpacing: '.2rem', marginTop: '20px' }}>{category}</Typography>
            <Typography variant={isExtraSmall ? 'subtitle2' : 'h6'} sx={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Responde el máximo de preguntas posible en 30 segundos</Typography>
        </Grid>
        <Grid item display={'flex'} justifyContent={'center'} sx={{marginTop: '3em'}}>
            {
                (preStartCounter != null) 
                ? <Typography sx={{color: 'white'}}>{preStartCounter}</Typography>
                : (isPlaying)
                    ? <Typography sx={{color: theme.palette.mainBlue}}>{playingCounter}</Typography>
                    : <Button onClick={handleStartCounter} sx={buttonStyle} variant='contained' disableElevation>Comenzar juego</Button>
            } 
        </Grid>
    </Grid>
  )
}
