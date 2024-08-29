import React from 'react'
import { Welcome } from '../atoms/Welcome';
import { Categories } from '../molecules/Categories';
import { Grid } from '@mui/material';

export const HomePage = () => {


    return (
        <>
            <Welcome />
            <Grid container justifyContent={'center'}>
                <Categories />
            </Grid>
        </>
    )
}
