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
import { roleContext } from '../../@core/context/getAllRoles'
import { mahineContext } from '../../@core/context/getAllMachines'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const Printing = () => {
  const [data, setData] = useState([])
  const { roles, handleRolesChange, rolesDrop } = useContext(roleContext)
  const { machine, handleMachineChange, machineDrop } = useContext(mahineContext)
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
            password: values.password,
            role: values.role,
            machine: values.machine
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
              <Chip sx={{ textAlign: 'center', mb: 10, width: '100%' }} label='Add Users ' />
              {/*<Chip label="Chip Outlined" variant="outlined" />*/}
            </Stack>
            {/*<Typography variant='h4' sx={{textAlign: 'center', mb: 5, width: '100%'}}>Add User</Typography>*/}
            <TextField
              fullWidth
              sx={{ mb: 5 }}
              label='UserName'
              name='userName'
              type='text'
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            <TextField
              fullWidth
              sx={{ mb: 5 }}
              label='Name'
              name='name'
              type='text'
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <TextField
              fullWidth
              label='Email'
              sx={{ mb: 5 }}
              name='email'
              type='email'
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <TextField
              fullWidth
              label='Password'
              sx={{ mb: 5 }}
              name='password'
              type='text'
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Autocomplete
              fullWidth
              sx={{ mb: 7 }}
              options={roles}
              getOptionLabel={option => option.name} // Display name in dropdown
              value={roles.find(role => role._id === formik.values.role) || null} // Find selected role by ID
              onChange={(event, value) => formik.setFieldValue('role', value ? value._id : '')} // Set ID in formik
              renderInput={params => (
                <TextField
                  {...params}
                  label='Role'
                  error={Boolean(formik.touched.role && formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                />
              )}
            />

            <Autocomplete
              fullWidth
              sx={{ mb: 7 }}
              options={machine}
              getOptionLabel={option => option.code} // Display code in dropdown
              value={machine.find(m => m._id === formik.values.machine) || null} // Find selected machine by ID
              onChange={(event, value) => formik.setFieldValue('machine', value ? value._id : '')} // Set ID in formikyping
              // freeSolo // Allow typing new values
              renderInput={params => (
                <TextField
                  {...params}
                  label='Machine'
                  error={Boolean(formik.touched.machine && formik.errors.machine)}
                  helperText={formik.touched.machine && formik.errors.machine}
                />
              )}
            />
            {/*<TextField*/}
            {/*  fullWidth*/}
            {/*  label='Role'*/}
            {/*  sx={{mb: 5}}*/}
            {/*  name="role"*/}
            {/*  type="text"*/}
            {/*  error={Boolean(formik.touched.role && formik.errors.role)}*/}
            {/*  helperText={formik.touched.role && formik.errors.role}*/}
            {/*  onBlur={formik.handleBlur}*/}
            {/*  onChange={formik.handleChange}*/}
            {/*  value={formik.values.role}/>*/}
            {/*<TextField*/}
            {/*  fullWidth*/}
            {/*  sx={{mb: 5}}*/}
            {/*  label='Machine Code'*/}
            {/*  name="machineCode"*/}
            {/*  type="text"*/}
            {/*  error={Boolean(formik.touched.machineCode && formik.errors.machineCode)}*/}
            {/*  helperText={formik.touched.machineCode && formik.errors.machineCode}*/}
            {/*  onBlur={formik.handleBlur}*/}
            {/*  onChange={formik.handleChange}*/}
            {/*  value={formik.values.machineCode}/>*/}

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
export default Printing
