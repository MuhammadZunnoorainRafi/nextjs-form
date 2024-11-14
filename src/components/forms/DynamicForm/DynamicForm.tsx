'use client';
import {
  DynamicFormSchema,
  DynamicFormType,
} from '@/lib/schemas/DynamicFormSchema/dynamic-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from '@mui/material';
import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DynamicFormType>({ resolver: zodResolver(DynamicFormSchema) });

  const hasWorkExperience = watch('hasWorkExperience');

  const fullErrors: FieldErrors<
    Extract<DynamicFormType, { hasWorkExperience: true }>
  > = errors;

  const formSubmit = (formData: DynamicFormType) => {
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <FormControl sx={{ gap: 2, width: '100%' }}>
          <TextField
            {...register('name')}
            label="Name"
            helperText={errors.name?.message}
            error={!!errors.name}
            size="small"
          />
          <FormControlLabel
            {...register('hasWorkExperience')}
            control={<Checkbox />}
            label="Work Experience"
          />
          {hasWorkExperience && (
            <TextField
              {...register('companyName')}
              label="Company Name"
              helperText={fullErrors.companyName?.message}
              error={!!fullErrors.companyName}
            />
          )}
          <Button
            variant="contained"
            sx={{ marginX: 'auto', width: 100 }}
            type="submit"
            size="small"
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

export default DynamicForm;
