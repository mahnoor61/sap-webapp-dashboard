// import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
// import { useRouter } from 'next/router'
// import {
//   CardContent,
//   Card,
//   TextField,
//   Button,
//   Grid,
//   Box,
//   Chip,
//   Stack,
//   Autocomplete,
//   Container,
//   Typography
// } from '@mui/material/'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { useSelector } from 'react-redux'
// import { Editor } from '@tinymce/tinymce-react'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import FormControl from '@mui/material/FormControl'
// import Select from '@mui/material/Select'

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// const CustomInput = forwardRef((props, ref) => {
//   return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
// })

// const Printing = () => {
//   const router = useRouter()
//   const [data, setData] = useState([])
//   const auth = useSelector(state => state.auth)
//   const { id } = router.query
//   const token = auth.token
//   const sectionId = auth.sessionId

//   const fields = [
//     'dust',
//     'sideLay',
//     'frontLay',
//     'registration',
//     'scumming',
//     'setOff',
//     'doubling',
//     'colorVariation',
//     'slur',
//     'ghosting'
//   ]

//   const getInitialValues = () => {
//     const obj = {}
//     fields.forEach(f => {
//       obj[f] = { status: '', reason: '' }
//     })
//     return obj
//   }

//   const getValidationSchema = () => {
//     const shape = {}
//     fields.forEach(f => {
//       shape[f] = Yup.object().shape({
//         status: Yup.string().required('Status is required'),
//         reason: Yup.string().when('status', {
//           is: 'not_okay',
//           then: Yup.string().required('Reason is required'),
//           otherwise: Yup.string().notRequired()
//         })
//       })
//     })
//     return Yup.object().shape({
//       ...shape,
//       dmsFromPlate: Yup.string().required('DMS is required')
//     })
//   }

//   const formik = useFormik({
//     initialValues: {
//       dmsFromPlate: '',
//       ...getInitialValues()
//     },
//     validationSchema: getValidationSchema(),
//     onSubmit: async values => {
//       try {
//         const payload = {
//           id,
//           dmsFromPlate: values.dmsFromPlate,
//           ...fields.reduce((acc, key) => {
//             acc[key] = values[key]
//             return acc
//           }, {})
//         }

//         await axios.post(`${BASE_URL}/api/ap/admin/register`, payload, {
//           headers: { 'x-access-token': token }
//         })

//         toast.success('Submitted successfully.')
//         formik.resetForm()
//       } catch (error) {
//         toast.error(error.response?.data?.msg || 'Error occurred.')
//       }
//     }
//   })

//   return (
//     // <Container>

//     <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 5 }}>
//       <CardContent>
//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={2} sx={{ px: { xs: 2, md: 20 } }}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label='DMS From Plate'
//                 name='dmsFromPlate'
//                 value={formik.values.dmsFromPlate}
//                 onChange={formik.handleChange}
//                 error={formik.touched.dmsFromPlate && Boolean(formik.errors.dmsFromPlate)}
//                 helperText={formik.touched.dmsFromPlate && formik.errors.dmsFromPlate}
//               />
//             </Grid>

//             {fields.map((field, index) => (
//               <Grid item xs={12} md={6} key={field}>
//                 <Autocomplete
//                   options={options}
//                   getOptionLabel={option => option.label}
//                   value={options.find(opt => opt.value === formik.values[field].status) || null}
//                   onChange={(e, value) => {
//                     formik.setFieldValue(`${field}.status`, value?.value || '')
//                     if (value?.value !== 'not_okay') {
//                       formik.setFieldValue(`${field}.reason`, '')
//                     }
//                   }}
//                   renderInput={params => (
//                     <TextField
//                       {...params}
//                       label={field.charAt(0).toUpperCase() + field.slice(1)}
//                       error={Boolean(formik.touched[field]?.status && formik.errors[field]?.status)}
//                       helperText={formik.touched[field]?.status && formik.errors[field]?.status}
//                     />
//                   )}
//                 />

//                 {formik.values[field].status === 'not_okay' && (
//                   <TextField
//                     fullWidth
//                     label='Reason'
//                     value={formik.values[field].reason}
//                     onChange={e => formik.setFieldValue(`${field}.reason`, e.target.value)}
//                     error={Boolean(formik.touched[field]?.reason && formik.errors[field]?.reason)}
//                     helperText={formik.touched[field]?.reason && formik.errors[field]?.reason}
//                     sx={{ mt: 1 }}
//                   />
//                 )}
//               </Grid>
//             ))}

//             <Grid item xs={12}>
//               <Button
//                 variant='contained'
//                 type='submit'
//                 fullWidth
//                 disabled={formik.isSubmitting}
//                 sx={{
//                   backgroundColor: '#0563BB',
//                   '&:hover': {
//                     backgroundColor: '#0AA4D2 !important'
//                   }
//                 }}
//               >
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>

//           {/* <Grid container spacing={1} sx={{ px: 20 }}>
//             <Stack spacing={1} sx={{ width: '100%' }}>
//               <Chip sx={{ textAlign: 'center', mb: 10, width: '100%' }} label='Add Printing ' />
//               {/*<Chip label="Chip Outlined" variant="outlined" />*/}
//           {/* </Stack> */}

//           {/* <Grid item xs={12}>
//               <Autocomplete
//                 options={options}
//                 getOptionLabel={option => option.label}
//                 value={options.find(opt => opt.value === formik.values.text.status) || null}
//                 onChange={(e, value) => {
//                   formik.setFieldValue('text.status', value?.value || '')
//                   if (value?.value !== 'not_okay') {
//                     formik.setFieldValue('text.reason', '')
//                   }
//                 }}
//                 renderInput={params => (
//                   <TextField
//                     {...params}
//                     label='Text'
//                     error={Boolean(formik.touched.text?.status && formik.errors.text?.status)}
//                     helperText={formik.touched.text?.status && formik.errors.text?.status}
//                   />
//                 )}
//               />

//               {formik.values.text.status === 'not_okay' && (
//                 <TextField
//                   fullWidth
//                   label='Reason'
//                   value={formik.values.text.reason}
//                   onChange={e => formik.setFieldValue('text.reason', e.target.value)}
//                   error={Boolean(formik.touched.text?.reason && formik.errors.text?.reason)}
//                   helperText={formik.touched.text?.reason && formik.errors.text?.reason}
//                   sx={{ mt: 2 }}
//                 />
//               )}
//             </Grid>

//             <Grid item xs={12}>
//               <Button
//                 sx={{
//                   backgroundColor: '#0563BB',
//                   '&:hover': {
//                     backgroundColor: '#0AA4D2 !important' // Updated hover color
//                   }
//                 }}
//                 variant='contained'
//                 type='submit'
//                 disabled={formik.isSubmitting}
//               >
//                 Submit
//               </Button> */}
//           {/* </Grid> */}
//           {/* </Grid> */}
//         </form>
//       </CardContent>
//     </Card>

//     // </Container>
//   )
// }
// export default Printing

import React, { forwardRef, useState } from 'react'
import { useRouter } from 'next/router'
import { CardContent, Card, TextField, Button, Grid, Autocomplete } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const Printing = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const auth = useSelector(state => state.auth)
  const { id } = router.query
  const token = auth.token

  const fields = [
    'dust',
    'sideLay',
    'frontLay',
    'registration',
    'scumming',
    'setOff',
    'doubling',
    'colorVariation',
    'slur',
    'ghosting'
  ]

  const options = [
    { label: 'Okay', value: 'okay' },
    { label: 'Not Okay', value: 'not_okay' }
  ]

  const getInitialValues = () => {
    const obj = {}
    fields.forEach(f => {
      obj[f] = { status: '', reason: '' }
    })
    return {
      dmsFromPlate: '',
      ...obj
    }
  }

  const getValidationSchema = () => {
    const shape = {}
    fields.forEach(f => {
      shape[f] = Yup.object().shape({
        status: Yup.string().required('Status is required'),
        reason: Yup.string().when('status', {
          is: 'not_okay',
          then: Yup.string().required('Reason is required'),
          otherwise: Yup.string()
        })
      })
    })

    return Yup.object().shape({
      dmsFromPlate: Yup.string().required('DMS is required'),
      ...shape
    })
  }

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(),
    onSubmit: async values => {
      try {
        const payload = {
          id,
          dmsFromPlate: values.dmsFromPlate,
          ...fields.reduce((acc, key) => {
            acc[key] = values[key]
            return acc
          }, {})
        }

        await axios.post(`${BASE_URL}/api/ap/admin/register`, payload, {
          headers: { 'x-access-token': token }
        })

        toast.success('Submitted successfully.')
        formik.resetForm()
      } catch (error) {
        toast.error(error.response?.data?.msg || 'Error occurred.')
      }
    }
  })

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 5 }}>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ px: { xs: 2, md: 20 } }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='DMS From Plate'
                name='dmsFromPlate'
                value={formik.values.dmsFromPlate}
                onChange={formik.handleChange}
                error={formik.touched.dmsFromPlate && Boolean(formik.errors.dmsFromPlate)}
                helperText={formik.touched.dmsFromPlate && formik.errors.dmsFromPlate}
              />
            </Grid>

            {fields.map(field => (
              <Grid item xs={12} md={6} key={field}>
                <Autocomplete
                  options={options}
                  getOptionLabel={option => option.label}
                  value={options.find(opt => opt.value === formik.values[field]?.status) || null}
                  onChange={(e, value) => {
                    formik.setFieldValue(`${field}.status`, value?.value || '')
                    if (value?.value !== 'not_okay') {
                      formik.setFieldValue(`${field}.reason`, '')
                    }
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      error={Boolean(formik.touched[field]?.status && formik.errors[field]?.status)}
                      helperText={formik.touched[field]?.status && formik.errors[field]?.status}
                    />
                  )}
                />

                {formik.values[field]?.status === 'not_okay' && (
                  <TextField
                    fullWidth
                    label='Reason'
                    value={formik.values[field]?.reason || ''}
                    onChange={e => formik.setFieldValue(`${field}.reason`, e.target.value)}
                    error={Boolean(formik.touched[field]?.reason && formik.errors[field]?.reason)}
                    helperText={formik.touched[field]?.reason && formik.errors[field]?.reason}
                    sx={{ mt: 1 }}
                  />
                )}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant='contained'
                type='submit'
                fullWidth
                disabled={formik.isSubmitting}
                sx={{
                  backgroundColor: '#0563BB',
                  '&:hover': {
                    backgroundColor: '#0AA4D2 !important'
                  }
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default Printing
