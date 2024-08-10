import React from 'react'
import { useTheme } from '@emotion/react'
import { Grid, Typography, useMediaQuery } from '@mui/material'

export const Welcome = () => {

    const theme = useTheme();
    const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Grid container sx={{ marginTop: '5em' }}>
            <Grid item xs={12} sx={{ marginTop: '2em' }}>
                <Typography variant={isExtraSmall ? 'h6' : 'h4'} sx={{ color: 'white', textAlign: 'center' }}>Bienvenid@ a</Typography>
                <Typography variant={isExtraSmall ? 'h3' : 'h1'} sx={{ color: theme.palette.mainBlue, textAlign: 'center', fontFamily: 'Fredoka', letterSpacing: '.2rem', marginTop: '20px' }}>DEVSQUIZ</Typography>
                <Typography variant={isExtraSmall ? 'subtitle2' : 'h6'} sx={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>El juego de preguntas para desarrolladores</Typography>
                <Typography className='blinking-text' variant={isExtraSmall ? 'subtitle2' : 'h6'} sx={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Pulsa en una categoría de abajo para jugar</Typography>
            </Grid>
        </Grid>
    )
}
