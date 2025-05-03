import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
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
import * as Yup from 'yup'
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
  const router = useRouter()
  const [data, setData] = useState([])
  const auth = useSelector(state => state.auth)
  const { id } = router.query
  const token = auth.token
  const sectionId = auth.sessionId

  const options = [
    { label: 'Okay', value: 'okay' },
    { label: 'Not Okay', value: 'not_okay' }
  ]

  const formik = useFormik({
    initialValues: {
      id: '',
      dmsFromPlate: '',
      text: { status: '', reason: '' },
      dust: '',
      sideLay: '',
      frontLay: '',
      registration: '',
      scumming: '',
      setOff: '',
      doubling: '',
      colorVariation: ''
    },
    validationSchema: Yup.object({
      dmsFromPlate: Yup.string().required('DMS is required'),

      text: Yup.lazy(obj =>
        Yup.object({
          status: Yup.string().required('Status is required'),
          reason: Yup.string().when('status', {
            is: 'not_okay',
            then: () => Yup.string().required('Reason is required'),
            otherwise: () => Yup.string().notRequired()
          })
        })
      ),

      //  pauseReason: Yup.string().required('Pause reason is required'),
      //       customPauseReason: Yup.string().when('pauseReason', {
      //         is: val => val === 'Other',
      //         then: schema => schema.required('Please specify the reason'),
      //         otherwise: schema => schema.notRequired()
      //       })
      //     }),
      dust: Yup.string().required('Dust is required'),
      sideLay: Yup.string().required('Side Lay is required'),
      sideLay: Yup.string().required('Side Lay is required'),
      frontLay: Yup.string().required('Front Lay is required'),
      registration: Yup.string().required('Registration Lay is required'),
      scumming: Yup.string().required('Scumming Lay is required'),
      setOff: Yup.string().required('Set Off Lay is required'),
      doubling: Yup.string().required('Doubling Lay is required'),
      colorVariation: Yup.string().required('Color Variation Lay is required')
    }),
    onSubmit: async values => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/ap/admin/register`,
          {
            id: id,
            dmsFromPlate: '',
            text: values.text,
            dust: '',
            sideLay: '',
            frontLay: '',
            registration: '',
            scumming: '',
            setOff: '',
            doubling: '',
            colorVariation: ''
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

            <Grid item xs={12}>
              <Autocomplete
                options={options}
                getOptionLabel={option => option.label}
                value={options.find(opt => opt.value === formik.values.text.status) || null}
                onChange={(e, value) => {
                  formik.setFieldValue('text.status', value?.value || '')
                  if (value?.value !== 'not_okay') {
                    formik.setFieldValue('text.reason', '')
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Text'
                    error={Boolean(formik.touched.text?.status && formik.errors.text?.status)}
                    helperText={formik.touched.text?.status && formik.errors.text?.status}
                  />
                )}
              />

              {formik.values.text.status === 'not_okay' && (
                <TextField
                  fullWidth
                  label='Reason'
                  value={formik.values.text.reason}
                  onChange={e => formik.setFieldValue('text.reason', e.target.value)}
                  error={Boolean(formik.touched.text?.reason && formik.errors.text?.reason)}
                  helperText={formik.touched.text?.reason && formik.errors.text?.reason}
                  sx={{ mt: 2 }}
                />
              )}
            </Grid>

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
