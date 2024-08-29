import { useTheme } from '@emotion/react';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';

export const Results = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [corrects, setCorrects] = useState(null);
    const [incorrects, setIncorrects] = useState(null);

    const theme = useTheme();
    const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(()=> {
        if(location.state && location.state.correctQuestions && location.state.incorrectQuestions) {
            setCorrects(location.state.correctQuestions);
            setIncorrects(location.state.incorrectQuestions);
        } else {
            navigate('/')
        }
    },[])

    const buttonStyle = {
        backgroundColor: 'transparent', 
        border: `1px solid white`, 
        ':hover': {
            backgroundColor: 'transparent',
            transform: 'scale(102%)',
            boxShadow: '0px 0px 25px -8px rgba(0,230,246,1)'
        }
    }


  return (
    (corrects && incorrects) && 
    <Grid container sx={{marginTop: '3em', padding:'2em'}}>
        <Grid item xs={12}>
            <Typography variant={isExtraSmall ? 'h3' : 'h1'} sx={{ color: theme.palette.mainBlue, textAlign: 'center', fontFamily: 'Fredoka', letterSpacing: '.2rem', marginTop: '20px' }}>{corrects[0].category.toUpperCase()}</Typography>
        </Grid>
        <Grid item display={'flex'} justifyContent={'center'} xs={12} sx={{marginTop: '1em'}}>
            <Button onClick={()=>navigate('/')} variant='contained' sx={buttonStyle}>Volver a jugar</Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{padding: '1em'}}>
            <Typography sx={{color: 'white', textAlign: 'center', borderBottom: '1px solid white'}} className='correctText'>Respuestas correctas: {corrects.length}</Typography>
            {
                corrects.map((correct, index)=>(
                    <Grid key={index} item xs={12} className='correctAnswerResults' sx={{marginTop: '1em', border: '1px solid white', padding:'1em', borderRadius: '10px'}}>
                        <Typography sx={{color: 'white', fontWeight: 'bold'}}><span className='blueBoldText'>-</span> {correct.question}</Typography>
                        <Typography sx={{color: 'white'}}>{correct.correct}</Typography>
                    </Grid>
                ))
            }
        </Grid>
        <Grid item xs={12} md={6} sx={{padding: '1em'}}>
            <Typography sx={{color: 'white', textAlign: 'center', borderBottom: '1px solid white'}} className='incorrectText'>Respuestas incorrectas: {incorrects.length}</Typography>
            {
                incorrects.map((incorrect, index)=>(
                    <Grid key={index} item xs={12} className='incorrectAnswerResults' sx={{marginTop: '1em', border: '1px solid white', padding:'1em', borderRadius: '10px'}}>
                        <Typography sx={{color: 'white', fontWeight: 'bold'}}> <span className='blueBoldText'>-</span> {incorrect.question}</Typography>
                        <Typography sx={{color: 'white'}}>Tu respuesta: {incorrect.yourAnswer}</Typography>
                        <Typography sx={{color: 'white'}}>Respuesta correcta: {incorrect.correct}</Typography>

                    </Grid>
                ))
            }
        </Grid>
    </Grid>
  )
}
