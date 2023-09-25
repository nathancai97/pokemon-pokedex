// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Pokedex from './Pokedex';
import { SquadProvider } from './SquadContext'; // Import the SquadProvider

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <SquadProvider> {/* Wrap your app with the SquadProvider */}
      <Pokedex />
    </SquadProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
