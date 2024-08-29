import { Grid, Typography } from '@mui/material'
import React from 'react'
import GithubIcon from '../../assets/images/icons/github.svg'
import LinkedinIcon from '../../assets/images/icons/linkedin.svg'

export const Footer = () => {
  return (
    <Grid container className='header_bg' sx={{padding: '3em'}}>
        <Grid item xs={12}>
            <Typography sx={{color: 'white', fontStyle: 'italic', textAlign: 'center'}} variant='body2'>Página creada por <a className='footerLink' href="https://dviclun.github.io/portfolio/" target="_blank">Daniel Vicent Luna ©</a></Typography>
        </Grid>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', gap: '1em', marginTop: '1em'}}>
            <a href='https://www.linkedin.com/in/daniel-vicent-luna-090956242/' target='blank' className='footerIconLink'>
                <img src={LinkedinIcon} className='footerIcon footerLinkedinIcon' />
            </a>
            <a href='https://github.com/dviclun' target='blank' className='footerIconLink'>
                <img src={GithubIcon} className='footerIcon' />
              </a>
        </Grid>
    </Grid>
  )
}
