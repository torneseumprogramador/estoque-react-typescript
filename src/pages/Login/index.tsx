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
  Typography,
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
      minWidth: 100,
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
  }, [signIn, user, history]);
  return (
    <Container>
      <Box
        padding={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography color="primary" variant="h3">
          Login
        </Typography>
        <TextField
          style={{ marginTop: 10, minWidth: 400 }}
          variant="filled"
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: 10, minWidth: 400 }}
          variant="filled"
          label="Senha"
          type="password"
          name="password"
          onChange={handleChange}
          value={user.password}
        />
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
        <Box display="flex" mt={3} alignItems="center" justifyContent="center">
          <Link style={{ fontSize: 20 }} component={RouterLink} to="/signup">
            Não tem conta cadastre-se
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
