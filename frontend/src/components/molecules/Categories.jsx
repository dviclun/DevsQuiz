import React from 'react'
import { categoriesList } from '../../services/categoriesService'
import { Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

export const Categories = () => {

    const navigate = useNavigate();

    const cardStyle = {
        border: '1px solid white',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '200px',
        cursor: 'pointer',
        borderRadius: '12px',
        ':hover': {
            transform: 'scale(102%)',
            boxShadow: '0px 0px 25px -8px rgba(0,230,246,1)'
        }
    }

    const handleClickCard = (category) => {

        const payload = {category}

        navigate('/play', {state: payload});
    }

    return (
        <Grid container padding={'5em'} spacing={3} sx={{ maxWidth: '1440px', justifyContent: 'center' }}>
            {
                categoriesList.map(category => (
                    <Grid item xs={12} sm={6} md={4} key={category.name}>
                        <Grid item xs={12} sx={cardStyle} onClick={()=>handleClickCard(category.name)}>
                            <img className={category.name === 'Github' ? 'categoryIcon categoryGit' : 'categoryIcon'} src={category.icon} />
                            <Typography sx={{ color: 'white', marginTop: '10px' }}>{category.name}</Typography>
                        </Grid>
                    </Grid>
                ))
            }
        </Grid>
    )
}
