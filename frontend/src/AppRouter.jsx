import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage'
import { GamePage } from './components/pages/GamePage'
import { Results } from './components/molecules/Results'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/play' element={<GamePage/>}></Route>
            <Route path='/results' element={<Results/>}></Route>
        </Routes>
    )
}
