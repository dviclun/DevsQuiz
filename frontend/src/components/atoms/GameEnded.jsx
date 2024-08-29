import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

export const GameEnded = ({correctQuestions, incorrectQuestions, text}) => {

    const navigate = useNavigate();


    const buttonStyle = {
        backgroundColor: 'transparent', 
        border: `1px solid white`, 
        ':hover': {
            backgroundColor: 'transparent',
            transform: 'scale(102%)',
            boxShadow: '0px 0px 25px -8px rgba(0,230,246,1)'
        }
    }

    const handleViewResults = () => {
        const payload = {correctQuestions, incorrectQuestions}

        navigate('/results', {state: payload})
    }

  return (
    <Grid container>
                    <Grid item xs={12}>
                        <Typography sx={{color: 'white', textAlign: 'center'}}>{text}</Typography>
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'} xs={12} sx={{marginTop: '3em'}}>
                        <Button onClick={handleViewResults} variant='contained' sx={buttonStyle}>Ver resultados</Button>
                    </Grid>
                  </Grid>
  )
}
