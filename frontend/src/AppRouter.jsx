import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage'
import { GamePage } from './components/pages/GamePage'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/play' element={<GamePage/>}></Route>
        </Routes>
    )
}
