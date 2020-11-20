import React, { useState, useCallback } from 'react';
import {
  Container,
  Grid,
  FormControl,
  Button,
  makeStyles,
  Link,
  Box,
  TextField,
  Typography,
} from '@material-ui/core';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import User from '../../models/User';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const history = useHistory();

  const useStyles = makeStyles({
    root: {
      marginTop: 30,
      minWidth: 100,
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
    await api.post('/users', {
      name,
      email,
      password,
    });
    history.push('/');
  }, [history, user]);
  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        padding={10}
      >
        <Typography variant="h3">Criar conta</Typography>
        <TextField
          style={{ marginTop: 10, minWidth: 300 }}
          variant="filled"
          label="Nome"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: 10, minWidth: 300 }}
          label="Email"
          name="email"
          variant="filled"
          value={user.email}
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: 10, minWidth: 300 }}
          label="Senha"
          type="password"
          name="password"
          variant="filled"
          onChange={handleChange}
          value={user.password}
        />
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
        <Box display="flex" mt={3} alignItems="center" justifyContent="center">
          <Link style={{ fontSize: 20 }} component={RouterLink} to="/login">
            Já tem conta! Log In!
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
