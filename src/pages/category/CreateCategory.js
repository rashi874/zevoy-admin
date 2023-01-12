import { Box, Button, Container, Grid, Input, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { API_URL } from '../../constant/defaultValues';

function CreateCategory() {
  const CreateCategorySchema = Yup.object().shape({
    name: Yup.string().required(),
    // image: Yup.object(),
  });
  const formik = useFormik({
    initialValues: { name: '', image: '' },
    validationSchema: CreateCategorySchema,
    onSubmit: (values) => {
      console.log(values);
      const formdata = new FormData();
      formdata.append('name', values.name);
      formdata.append('category', values.image);
      axios.post(`${API_URL}/api/v1/category`, formdata, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
    },
  });
  const { getFieldProps, errors, touched, handleSubmit, values, setFieldValue } = formik;
  const handleFileUpload = useCallback(
    (files) => {
      if (files) {
        const file = files[0];
        file.url = URL.createObjectURL(file);
        setFieldValue('image', file);
      }
    },
    [setFieldValue]
  );
  return (
    <>
      <Helmet>
        <title> Dashboard: Create Category | Minimal UI </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Create Category
        </Typography>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item md={6}>
                <Stack spacing={2}>
                  <TextField
                    label="Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <label htmlFor="raised-button-file">
                    <Stack direction={'row'} alignItems="center" spacing={2}>
                      <input
                        accept="image/*"
                        className={'raised-button-file'}
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                      <Box  width={100} height={100} component={'img'} src={values.image.url} alt="image" />
                      <Button variant="contained" component="span">
                        Image
                      </Button>
                      {touched.image && errors.image ? (
                        <Typography variant="caption" color="error">
                          {errors.image}
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </label>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </>
  );
}

export default CreateCategory;
