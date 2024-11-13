import Container from '@/components/shared/Container';
import { TextField } from '@mui/material';
import React from 'react';

function DynamicForm() {
  return (
    <Container>
      <TextField label="Full Name" />
    </Container>
  );
}

export default DynamicForm;
