import React, {useState} from 'react'
import {Container, Grid, FormControl, InputLabel, Input, Button, Typography, makeStyles} from '@material-ui/core'
import User from '../../models/User';


const Login: React.FC = () => {

  const useStyles = makeStyles({
    root: {
      marginTop: 30
    },
  });
  const classes = useStyles()

const [user, setUser] = useState<User>({email: '', password: ''})
const handleChange = (e: any) => {
setUser({
...user,
[e.target.name]: e.target.value
})
}
  return (

    <Container>
      <Grid direction="column" container justify="center" alignItems="center">
        <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor="my-label">
              E-mail
            </InputLabel>
            <Input onChange={handleChange} name="email" value={user.email} id="my-label" />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <InputLabel htmlFor="password">
              Senha
            </InputLabel>
            <Input type="password" name="password" onChange={handleChange} value={user.password} id="password" />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <Button className={classes.root} variant="contained" color="primary">Logar</Button>
          </FormControl>
        </Grid>
      </Grid>
      <Typography>{user.email}</Typography>

      <Typography>{user.password}</Typography>
    </Container>
  )
}

export default Login
