import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
      setTransactions(tr => tr.filter(t => t.id !== id));
    }
  }, []);
  return (
    <Container style={{ minHeight: '100%' }}>
      <Box>
        <Typography style={{ textAlign: 'center' }} variant="h3">
          Bem vindo &nbsp;
          {user.name}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>Entrada</TableCell>
                <TableCell>Saída</TableCell>
                <TableCell>Alterar</TableCell>
                <TableCell>Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{formatValue(balance.total)}</TableCell>
                <TableCell>{formatValue(balance.income)}</TableCell>
                <TableCell>{formatValue(balance.outcome)}</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
              {transactions.length &&
                transactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell />
                    <TableCell>
                      {transaction.type === 'income' &&
                        formatValue(transaction.value)}
                    </TableCell>
                    <TableCell>
                      {transaction.type === 'outcome' &&
                        formatValue(transaction.value)}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleUpdate(transaction.id)}
                        variant="contained"
                        color="secondary"
                      >
                        Alterar
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
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
                <TableCell>
                  <Button
                    onClick={handleNew}
                    variant="contained"
                    color="primary"
                  >
                    Novo
                  </Button>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Dashboard;
