import React from 'react';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import brLocale from 'date-fns/locale/pt-BR';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Router from './router';
import { AuthProvider } from './contexts/AuthContext';

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date: Date): string {
    return this.format(date, 'd MMM yyyy');
  }
}
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
        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={brLocale}>
          <Router />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
