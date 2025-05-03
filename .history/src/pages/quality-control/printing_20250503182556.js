import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import {
  CardContent,
  Card,
  TextField,
  Button,
  Grid,
  Box,
  Chip,
  Stack,
  Autocomplete,
  Container,
  Typography
} from '@mui/material/'
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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const Printing = () => {
  const [data, setData] = useState([])
  const auth = useSelector(state => state.auth)
  const token = auth.token
  const sectionId = auth.sessionId

  const formik = useFormik({
    initialValues: {
      userName: '',
      name: '',
      role: '',
      password: '',
      email: '',
      machine: ''
    },
    validationSchema: yup.object({
      userName: yup.string().required('User name is required'),
      name: yup.string().required('Name is required'),

      // role: yup.string().required('Role is required'),

      email: yup.string().required('Email is required'),
      password: yup.string().required('Password is required')
    }),
    onSubmit: async values => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/ap/admin/register`,
          {
            userName: values.userName,
            name: values.name,
            email: values.email,
            password: values.password
          },
          {
            headers: {
              'x-access-token': token
            }
          }
        )

        toast.success('User created successfully.')
        formik.resetForm()
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.msg)
        formik.resetForm()
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
              <Chip sx={{ textAlign: 'center', mb: 10, width: '100%' }} label='Add Printing ' />
              {/*<Chip label="Chip Outlined" variant="outlined" />*/}
            </Stack>

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Age</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={age}
                label='Age'
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <Grid item xs={12}>
              <Button
                sx={{
                  backgroundColor: '#0563BB',
                  '&:hover': {
                    backgroundColor: '#0AA4D2 !important' // Updated hover color
                  }
                }}
                variant='contained'
                type='submit'
                disabled={formik.isSubmitting}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>

    // </Container>
  )
}
export default Printing
