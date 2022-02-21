import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Game from '../Game/Game';
import SignIn from '../SignIn/SignIn';

function Router() {
  return(
    <Routes>
      <Route path='/' element={<Navigate to='/game' />} />
      <Route path='/game' element={<Game />}/>
      <Route path='/signin' element={<SignIn />}/>
    </Routes>
  );
}

export default Router;