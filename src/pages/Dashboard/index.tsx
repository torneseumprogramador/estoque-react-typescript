import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<Balance>({} as Balance);
  useEffect(() => {
    api
      .get('transactions')
      .then(res => {
        setBalance(res.data.balance);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <Container>
      <Box>
        <Typography>Bem vindo {user.email}</Typography>
        <Typography>{balance.total}</Typography>
        <Typography>{balance.income}</Typography>
        <Typography>{balance.outcome}</Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
