import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { useParams, useHistory } from 'react-router-dom';
import { Transaction } from '../../utils/types';
import api from '../../services/api';

const Form: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const [transaction, setTransaction] = useState<Partial<Transaction>>({
    type: 'income',
    title: '',
    category: '',
    value: 0,
    date: new Date(),
  } as Partial<Transaction>);
  const loadTransaction = useCallback(async () => {
    if (id) {
      const response = await api.get(`transactions/${id}`);
      setTransaction(response.data.transaction);
    }
  }, [id]);
  useEffect(() => {
    loadTransaction();
  }, [loadTransaction]);
  const buttonName = useMemo(() => {
    if (id) {
      return 'Alterar';
    }
    return 'Salvar';
  }, [id]);
  const handleTransaction = useCallback(async () => {
    try {
      const { title, value, type, category, date } = transaction;
      if (date) {
        const newDate = new Date(date);
        if (!id) {
          await api.post('transactions', {
            title,
            value,
            type,
            category,
            date: newDate,
          });
        } else {
          await api.put(`transactions/${id}`, {
            title,
            value,
            type,
            category,
            date: newDate,
          });
        }
        setTimeout(() => {
          history.push('/dashboard');
        }, 3000);
      }
    } catch (err) {
      alert(err.message);
    }
  }, [transaction, history]);
  const handleChange = (e: any) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box>
          <Typography variant="h6">Você está na página novo!</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <TextField
            style={{ marginTop: 10 }}
            name="title"
            label="Título"
            value={transaction.title}
            onChange={handleChange}
            variant="filled"
          />
          <TextField
            style={{ marginTop: 10 }}
            name="category"
            value={transaction.category}
            onChange={handleChange}
            label="Categoria"
            variant="filled"
          />
          <TextField
            style={{ marginTop: 10 }}
            value={transaction.value}
            onChange={handleChange}
            name="value"
            label="Valor"
            variant="filled"
          />
          <TextField
            style={{ marginTop: 10 }}
            name="type"
            label="Tipo"
            variant="filled"
            value={transaction.type}
            onChange={handleChange}
            fullWidth
            select
          >
            <MenuItem value="income">Entrada</MenuItem>
            <MenuItem value="outcome">Saída</MenuItem>
          </TextField>
          <DatePicker
            style={{ marginTop: 10 }}
            inputVariant="filled"
            value={transaction.date}
            onChange={data => {
              if (data) {
                setTransaction(tr => ({ ...tr, date: data }));
              }
            }}
          />
          <Button
            style={{ marginTop: 30 }}
            variant="contained"
            color="primary"
            onClick={handleTransaction}
          >
            {buttonName}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default Form;
