import { useTheme } from '@emotion/react';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { GameBoard } from '../molecules/GameBoard';

export const GamePage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const [category, setCategory] = useState('');

    const [preStartCounter, setPreStartCounter] = useState(null);
    const [playingCounter, setPlayingCounter] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [timeFinished, setTimeFinished] = useState(false);



    const handleStartGame = () => {

        setLoadingQuestions(true);

        let body = {
            tech: location.state.category
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
            .then(data => {
                setQuestions(data);
                setLoadingQuestions(false);
                setPreStartCounter(3);
            })
            .catch(error => console.log(error))

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

    }, [preStartCounter])

    useEffect(()=> {
       if(isPlaying){
        setTimeout(()=>{
            if(playingCounter > 0){
                setPlayingCounter(playingCounter - 1);
            } 
        }, 1000);
       }

       if(playingCounter === 0) {
        setTimeFinished(true);
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
        <Grid item sx={{marginTop: '4em'}}>
            <Typography variant={isExtraSmall ? 'h3' : 'h1'} sx={{ color: theme.palette.mainBlue, textAlign: 'center', fontFamily: 'Fredoka', letterSpacing: '.2rem', marginTop: '20px' }}>{category}</Typography>
            {
                (!isPlaying)
                ? <Typography variant={isExtraSmall ? 'subtitle2' : 'h6'} sx={{ color: 'white', textAlign: 'center', marginTop: '20px', padding: '1em' }}>Responde el máximo de preguntas posible en un minuto</Typography>
                : <></>
            }
        </Grid>
        <Grid item display={'flex'} justifyContent={'center'} sx={{marginTop: '3em', minWidth: '80%'}}>
            {
                (preStartCounter != null) 
                ? <Typography variant='h5' sx={{color: 'white'}}>{preStartCounter}</Typography>
                : (isPlaying)
                    ? <GameBoard questions={questions} playingCounter={playingCounter} timeFinished={timeFinished}/>
                    : (loadingQuestions)
                      ? <Typography sx={{color: theme.palette.mainBlue}}>Loading...</Typography>
                      : <Button onClick={handleStartGame} sx={buttonStyle} variant='contained' disableElevation>Comenzar juego</Button>
            } 
        </Grid>
    </Grid>
  )
}
