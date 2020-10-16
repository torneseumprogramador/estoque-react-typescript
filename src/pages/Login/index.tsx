import React, { useState, useCallback } from 'react';
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Link,
  Box,
  TextField,
} from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import User from '../../models/User';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const history = useHistory();
  const useStyles = makeStyles({
    root: {
      marginTop: 30,
    },
  });
  const classes = useStyles();

  const [user, setUser] = useState<User>({ email: '', password: '' });

  const { signIn } = useAuth();
  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignIn = useCallback(async () => {
    await signIn(user);
    history.push('/dashboard');
  }, [user.email, user.password, history]);
  return (
    <Container>
      <Grid
        direction="column"
        spacing={2}
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Senha"
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <Button
              className={classes.root}
              variant="contained"
              color="primary"
              onClick={handleSignIn}
            >
              Login
            </Button>
          </FormControl>
        </Grid>
      </Grid>
      <Box display="flex" mt={3} alignItems="center" justifyContent="center">
        <Link component={RouterLink} to="/signup">
          Não tem conta cadastre-se
        </Link>
      </Box>
    </Container>
  );
};

export default Login;
