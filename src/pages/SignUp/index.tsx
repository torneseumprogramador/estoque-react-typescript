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
import { useHistory, Link as RouterLink } from 'react-router-dom';
import User from '../../models/User';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const history = useHistory();

  const useStyles = makeStyles({
    root: {
      marginTop: 30,
    },
  });
  const classes = useStyles();

  const [user, setUser] = useState<User>({ name: '', email: '', password: '' });
  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const signUp = useCallback(async () => {
    const { name, email, password } = user;
    const response = await api.post('/users', {
      name,
      email,
      password,
    });
    alert(JSON.stringify(response.data));
    setTimeout(() => {
      history.push('/');
    }, 3000);
  }, [history, user]);
  return (
    <Container>
      <Grid
        direction="column"
        spacing={2}
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <TextField
            label="Nome"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Senha"
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <Button
              className={classes.root}
              variant="contained"
              color="primary"
              onClick={signUp}
            >
              Cadastrar
            </Button>
          </FormControl>
        </Grid>
      </Grid>
      <Box display="flex" mt={3} alignItems="center" justifyContent="center">
        <Link component={RouterLink} to="/login">
          Já tem conta! Log In!
        </Link>
      </Box>
    </Container>
  );
};

export default SignUp;
