import React from 'react';
import './App.css';
import { DataGraph } from './components/DataGraph';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <DataGraph />
      </div>
    </LocalizationProvider>
  );
}

export default App;
