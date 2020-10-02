import React, {useState, FormEvent} from 'react';
import {ThemeProvider, Checkbox, createMuiTheme, CssBaseline, FormControl, InputLabel, Input, Container, Button, Box, Grid, makeStyles, Typography} from '@material-ui/core'
import Router from './router';
function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'light'
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
      </ThemeProvider>
  );
}

export default App;
