import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import MoviesPage from '../../pages/MoviesPage';
import Friends from '../../pages/FriendsPage';
import People from '../../pages/PeoplePage';
import Nav from '../../components/Nav'
import LoginPage from '../../pages/LoginPage';
import ShowsPage from '../../pages/ShowsPage';
import EpisodesPage from '../../pages/EpisodesPage';
import ShowPage from '../../pages/ShowPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movies' element={<MoviesPage />} />
        <Route path='/movies/:id' element={<MoviesPage />} />
        <Route path='/shows' element={<ShowsPage />} />
        <Route path='/shows/:id' element={<ShowPage />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/shows/:id/season/:number' element={<EpisodesPage />} />
        <Route path='/shows/:id/season/:number/episode/:epId' element={<EpisodesPage />} />
        <Route path='/people' element={<People />} />
        {/* path='*' fonctionne si jamais l'url ne correspond a rien de déclaré au dessus */}
        <Route path='*' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}
