'use client';
import {
  DynamicFormSchema,
  DynamicFormType,
  formDefaultValues,
} from '@/lib/schemas/DynamicFormSchema/dynamic-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircleRounded, DeleteForeverRounded } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import {
  Controller,
  FieldErrors,
  useFieldArray,
  useForm,
} from 'react-hook-form';

function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<DynamicFormType>({
    resolver: zodResolver(DynamicFormSchema),
    defaultValues: formDefaultValues,
  });

  const { fields, remove, replace, append } = useFieldArray({
    control,
    name: 'language',
  });

  const hasWorkExperience = watch('hasWorkExperience');
  const knowsOtherLanguages = watch('knowsOtherLanguages');
  const educationLevel = watch('educationLevel');

  useEffect(() => {
    if (knowsOtherLanguages) {
      replace({ name: '' });
    }
  }, [knowsOtherLanguages, replace]);

  const fullErrors: FieldErrors<
    Extract<DynamicFormType, { hasWorkExperience: true }>
  > &
    FieldErrors<Extract<DynamicFormType, { knowsOtherLanguages: true }>> &
    FieldErrors<
      Extract<DynamicFormType, { educationLevel: 'bachelorsDegree' }>
    > &
    FieldErrors<
      Extract<DynamicFormType, { educationLevel: 'higherSchoolDiploma' }>
    > = errors;

  const formSubmit = (formData: DynamicFormType) => {
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <FormControl sx={{ gap: 2, width: '100%', height: '100%' }}>
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
          <FormControl>
            <FormLabel>Education Level</FormLabel>
            <Controller
              control={control}
              name="educationLevel"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    label="No Formal Education"
                    value="noFormalEducation"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="Higher School Diploma"
                    value="higherSchoolDiploma"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="Bachelors Degree"
                    value="bachelorsDegree"
                    control={<Radio />}
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          {educationLevel === 'higherSchoolDiploma' && (
            <TextField
              {...register('schoolName')}
              label="School Name"
              helperText={fullErrors.schoolName?.message}
              error={!!fullErrors.schoolName}
            />
          )}
          {educationLevel === 'bachelorsDegree' && (
            <TextField
              {...register('universityName')}
              label="University Name"
              helperText={fullErrors.universityName?.message}
              error={!!fullErrors.universityName}
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
