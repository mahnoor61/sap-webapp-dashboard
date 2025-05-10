import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { CardContent, Card, TextField, Button, Grid, Box, Typography, Autocomplete, Container } from '@mui/material/'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Chip, Stack } from '@mui/material'
import { RouteContext } from '../../@core/context/getAllRoutes'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const TINYMCE_API_KEY = process.env.NEXT_PUBLIC_TINYMCE_API_KEY

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const AddMachine = () => {
  const { route } = useContext(RouteContext)
  const auth = useSelector(state => state.auth)
  const token = auth.token

  const formik = useFormik({
    initialValues: {
      machine: ''
    },
    validationSchema: yup.object({
      machine: yup.string().required('Machine is required')
    }),
    onSubmit: async values => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/ap/admin/create/machine`,
          {
            machine: values.machine
          },
          {
            headers: {
              'x-access-token': token
            }
          }
        )
        toast.success('Machine created successfully.')
        formik.resetForm()
      } catch (error) {
        console.log(error)
        formik.resetForm()
        toast.error(error.response.data.msg)
      }
    }
  })

  return (
    // <Container>

    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 5 }}>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1} sx={{ px: 20 }}>
            <Stack spacing={1} sx={{ width: '100%' }}>
              <Chip sx={{ textAlign: 'center', mb: 10, width: '100%' }} label='Add Machines ' />
              {/*<Chip label="Chip Outlined" variant="outlined" />*/}
            </Stack>
            {/*<Typography variant='h4' sx={{textAlign: 'center',mb:5, width: '100%'}}>Add Machine </Typography>*/}
            <TextField
              fullWidth
              sx={{ mb: 5 }}
              label='Machine'
              name='machine'
              type='text'
              error={Boolean(formik.touched.machine && formik.errors.machine)}
              helperText={formik.touched.machine && formik.errors.machine}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.machine}
            />
            <Autocomplete
              fullWidth
              sx={{ mb: 2 }}
              options={route}
              getOptionLabel={option => option.code} // Prevent error if option is undefined
              isOptionEqualToValue={(option, value) => option.code === value.code}
              value={route.find(po => po.cods === formik.values.productionOrderNo) || null}
              onChange={(event, value) => formik.setFieldValue('productionOrderNo', value ? value.docNum : '')}
              filterSelectedOptions // Optional: hides selected value from dropdown
              renderInput={params => <TextField {...params} label='Production Order No' />}
            />
            {/* <Autocomplete
              fullWidth
              options={route}
              getOptionLabel={option => option.code}
              value={newRow.route}
              // onChange={(event, value) => setNewRow({ ...newRow, route: value })}
              // renderInput={params => <TextField {...params} label='Route' />}
            /> */}
            <Grid item xs={12}>
              <Button
                sx={{
                  backgroundColor: '#0563BB',
                  '&:hover': {
                    backgroundColor: '#0AA4D2 !important'
                  }
                }}
                variant='contained'
                type='submit'
                disabled={formik.isSubmitting}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>

    // </Container>
  )
}

export default AddMachine
