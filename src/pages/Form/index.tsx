import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

const Form: React.FC = () => {
  const [date, setDate] = useState(new Date());
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
            variant="filled"
          />
          <TextField
            style={{ marginTop: 10 }}
            name="category"
            label="Categoria"
            variant="filled"
          />
          <TextField
            style={{ marginTop: 10 }}
            name="value"
            label="Valor"
            variant="filled"
          />
          <TextField
            style={{ marginTop: 10 }}
            name="type"
            label="Tipo"
            variant="filled"
            fullWidth
            select
          >
            <MenuItem value="income">Entrada</MenuItem>
            <MenuItem value="outcome">Saída</MenuItem>
          </TextField>
          <DatePicker
            style={{ marginTop: 10 }}
            inputVariant="filled"
            value={date}
            onChange={data => {
              if (data) {
                setDate(data);
              }
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default Form;
