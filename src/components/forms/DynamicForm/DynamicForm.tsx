'use client';
import {
  DynamicFormSchema,
  DynamicFormType,
} from '@/lib/schemas/DynamicFormSchema/dynamic-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircleRounded, DeleteForeverRounded } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { FieldErrors, useFieldArray, useForm } from 'react-hook-form';

function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<DynamicFormType>({ resolver: zodResolver(DynamicFormSchema) });

  const { fields, remove, replace, append } = useFieldArray({
    control,
    name: 'language',
  });

  const hasWorkExperience = watch('hasWorkExperience');
  const knowsOtherLanguages = watch('knowsOtherLanguages');

  useEffect(() => {
    if (knowsOtherLanguages) {
      replace({ name: '' });
    }
  }, [knowsOtherLanguages, replace]);

  const fullErrors: FieldErrors<
    Extract<DynamicFormType, { hasWorkExperience: true }> &
      Extract<DynamicFormType, { knowsOtherLanguages: true }>
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
          <FormControlLabel
            {...register('knowsOtherLanguages')}
            control={<Checkbox />}
            label="Know Other Languages"
          />

          {knowsOtherLanguages && (
            <>
              {fields.map((field, index) => (
                <div key={index}>
                  <TextField
                    className="w-full"
                    {...register(`language.${index}.name`)}
                    size="small"
                    label="Language"
                    helperText={fullErrors.language?.[index]?.name?.message}
                    error={!!fullErrors.language?.[index]?.name}
                  />
                  <IconButton
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    color="error"
                  >
                    <DeleteForeverRounded />
                  </IconButton>
                </div>
              ))}
              <IconButton
                sx={{ width: 'fit-content' }}
                onClick={() => append({ name: '' })}
                color="success"
              >
                <AddCircleRounded />
              </IconButton>
            </>
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
