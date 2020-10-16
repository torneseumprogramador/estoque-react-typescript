import React from 'react';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import Router from './router';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      type: 'light',
    },
  });
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
