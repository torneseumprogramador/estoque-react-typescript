import React, { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import formatValue from '../../services/formatValue';
import { Transaction } from '../../utils/types';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
const Dashboard: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    api
      .get('transactions')
      .then(res => {
        setBalance(res.data.balance);
        setTransactions(res.data.transactions);
      })
      .catch(err => console.log(err));
  }, []);
  const handleNew = useCallback(() => {
    history.push('/transaction/new');
  }, [history]);
  const handleUpdate = useCallback(
    (id: string) => {
      history.push(`/transaction/${id}`);
    },
    [history],
  );
  const handleDelete = useCallback((id: string) => {
    if (window.confirm('Você quer realmente deletar essa transação?')) {
      api.delete(`transactions/${id}`);
      api
        .get('transactions')
        .then(res => {
          setBalance(res.data.balance);
          setTransactions(res.data.transactions);
        })
        .catch(err => console.log(err));
      setTransactions(tr => tr.filter(t => t.id !== id));
    }
  }, []);
  return (
    <Container style={{ minHeight: '100%' }}>
      <Box>
        <Typography style={{ textAlign: 'center', marginTop: 10 }} variant="h3">
          Bem vindo &nbsp;
          {user.name}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Alterar</TableCell>
                <TableCell>Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length &&
                transactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.title}</TableCell>
                    <TableCell>{formatValue(transaction.value)}</TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        onClick={() => handleUpdate(transaction.id)}
                        variant="contained"
                        color="secondary"
                      >
                        Alterar
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        onClick={() => handleDelete(transaction.id)}
                        variant="outlined"
                        color="primary"
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell>
                  <Button
                    fullWidth
                    onClick={handleNew}
                    variant="contained"
                    color="primary"
                  >
                    Novo
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          mt={10}
        >
          <Typography
            style={{ textAlign: 'center' }}
            color="primary"
            variant="h3"
          >
            TOTAL
          </Typography>
          <Typography style={{ textAlign: 'center' }} variant="h3">
            ENTRADA
          </Typography>
          <Typography
            style={{ textAlign: 'center' }}
            color="secondary"
            variant="h3"
          >
            SAÍDA
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          mt={5}
        >
          <Typography
            style={{ textAlign: 'center' }}
            color="primary"
            variant="h3"
          >
            {formatValue(balance.total)}
          </Typography>
          <Typography style={{ textAlign: 'center' }} variant="h3">
            {formatValue(balance.income)}
          </Typography>
          <Typography
            style={{ textAlign: 'center' }}
            color="secondary"
            variant="h3"
          >
            {formatValue(balance.outcome)}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
