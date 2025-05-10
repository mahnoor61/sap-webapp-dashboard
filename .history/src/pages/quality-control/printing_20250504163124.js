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
// import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import FormControl from '@mui/material/FormControl'
// import FormLabel from '@mui/material/FormLabel'

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

//   const formik = useFormik({
//     initialValues: {
//       id: '',
//       dmsFromPlate: '',
//       text: '',
//       dust: '',
//       sideLay: '',
//       frontLay: '',
//       registration: '',
//       scumming: '',
//       setOff: '',
//       doubling: '',
//       colorVariation: ''
//     },
//     validationSchema: Yup.object({
//       // userName: Yup.string().required('User name is required'),
//     }),
//     onSubmit: async values => {
//       try {
//         const response = await axios.post(
//           `${BASE_URL}/api/ap/qc/printing`,
//           {
//             id: '',
//             dmsFromPlate: '',
//             text: '',
//             dust: '',
//             sideLay: '',
//             frontLay: '',
//             registration: '',
//             scumming: '',
//             setOff: '',
//             doubling: '',
//             colorVariation: ''
//           },
//           {
//             headers: {
//               'x-access-token': token
//             }
//           }
//         )

//         toast.success('Printing data save successfully.')
//         formik.resetForm()
//       } catch (error) {
//         console.log('error in printing qc form', error)
//         toast.error(error.response.data.msg)
//         formik.resetForm()
//       }
//     }
//   })

//   return (
//     <Card
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         py: 5,
//         width: '100%'
//       }}
//     >
//       <CardContent sx={{ width: '100%' }}>
//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={2} sx={{ px: { xs: 2, md: 20 } }}>
//             <Stack spacing={1} sx={{ width: '100%' }}>
//               <Chip sx={{ textAlign: 'center', mb: 10, width: '100%' }} label='Add Printing ' />
//               {/*<Chip label="Chip Outlined" variant="outlined" />*/}
//             </Stack>
//             <Grid item lg={6} xs={12} sx={{ width: '100%' }}>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: 5,
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}
//               >
//                 <FormControl>
//                   <FormLabel id='demo-radio-buttons-group-label' sx={{ fontWeight: '900' }}>
//                     Text
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby='demo-radio-buttons-group-label'
//                     defaultValue='female'
//                     name='radio-buttons-group'
//                   >
//                     <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
//                     <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
//                   </RadioGroup>
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel id='demo-radio-buttons-group-label' sx={{ fontWeight: '900' }}>
//                     Side Lay
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby='demo-radio-buttons-group-label'
//                     defaultValue='female'
//                     name='radio-buttons-group'
//                   >
//                     <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
//                     <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
//                   </RadioGroup>
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel id='demo-radio-buttons-group-label' sx={{ fontWeight: '900' }}>
//                     Scumming
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby='demo-radio-buttons-group-label'
//                     defaultValue='female'
//                     name='radio-buttons-group'
//                   >
//                     <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
//                     <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
//                   </RadioGroup>
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel id='demo-radio-buttons-group-label' sx={{ fontWeight: '900' }}>
//                     Set Off
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby='demo-radio-buttons-group-label'
//                     defaultValue='female'
//                     name='radio-buttons-group'
//                   >
//                     <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
//                     <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
//                   </RadioGroup>
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel id='demo-radio-buttons-group-label' sx={{ fontWeight: '900' }}>
//                     Doubling
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby='demo-radio-buttons-group-label'
//                     defaultValue='female'
//                     name='radio-buttons-group'
//                   >
//                     <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
//                     <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
//                   </RadioGroup>
//                 </FormControl>
//               </Box>
//             </Grid>
//             <Grid item lg={6} xs={12}>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: 5,
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}
//               >
//                 <FormControl>
//                   <FormLabel id='demo-radio-buttons-group-label' sx={{ fontWeight: '900' }}>
//                     Dust
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby='demo-radio-buttons-group-label'
//                     defaultValue='female'
//                     name='radio-buttons-group'
//                   >
//                     <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
//                     <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
//                   </RadioGroup>
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel id='demo-radio-buttons-group-label' sx={{ fontWeight: '900' }}>
//                     Front Lay
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby='demo-radio-buttons-group-label'
//                     defaultValue='female'
//                     name='radio-buttons-group'
//                   >
//                     <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
//                     <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
//                   </RadioGroup>
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel id='demo-radio-buttons-group-label' sx={{ fontWeight: '900' }}>
//                     Registration
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby='demo-radio-buttons-group-label'
//                     defaultValue='female'
//                     name='radio-buttons-group'
//                   >
//                     <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
//                     <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
//                   </RadioGroup>
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel id='demo-radio-buttons-group-label' sx={{ fontWeight: '900' }}>
//                     Color Variation
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby='demo-radio-buttons-group-label'
//                     defaultValue='female'
//                     name='radio-buttons-group'
//                   >
//                     <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
//                     <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
//                   </RadioGroup>
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel id='demo-radio-buttons-group-label' sx={{ fontWeight: '900' }}>
//                     DMS From Plate
//                   </FormLabel>
//                   <RadioGroup
//                     aria-labelledby='demo-radio-buttons-group-label'
//                     defaultValue='female'
//                     name='radio-buttons-group'
//                   >
//                     <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
//                     <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
//                   </RadioGroup>
//                 </FormControl>
//               </Box>
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
//             >
//               <Button
//                 variant='contained'
//                 type='submit'
//                 // fullWidth
//                 disabled={formik.isSubmitting}
//                 sx={{
//                   // display: 'flex',
//                   // justifyContent: 'center',
//                   // alignItems: 'center',
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
//         </form>
//       </CardContent>
//     </Card>
//   )
// }
// export default Printing

import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  CardContent,
  Card,
  TextField,
  Button,
  Grid,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
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
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const questions = [
  'text',
  'sideLay',
  'scumming',
  'setOff',
  'doubling',
  'dust',
  'frontLay',
  'registration',
  'colorVariation',
  'dmsFromPlate'
]

const Printing = () => {
  const router = useRouter()
  const [userData, setUserData] = useState('')
  const { id } = router.query
  const auth = useSelector(state => state.auth)
  const token = auth.token

  const formik = useFormik({
    initialValues: questions.reduce((acc, q) => {
      acc[q] = { answer: '', reason: '' }

      return acc
    }, {}),
    onSubmit: async values => {
      try {
        // Format the data as needed
        const formattedValues = Object.fromEntries(
          Object.entries(values).map(([key, val]) => [
            key,
            val.answer === 'Not Okay' ? `${val.answer} - ${val.reason}` : val.answer
          ])
        )

        await axios.post(`${BASE_URL}/api/ap/qc/printing/${id}`, formattedValues, {
          headers: { 'x-access-token': token }
        })

        toast.success('Printing data saved successfully.')
        router.push('/quality-control')
        formik.resetForm()
      } catch (error) {
        console.error('error in printing qc form', error)
        toast.error(error.response?.data?.msg || 'Submission failed')
      }
    }
  })

  const tableHeaders = [
    'Sr. No',
    'Time',
    'Quantity',
    'Text',
    'Color Variation',
    'Doubling',
    'Dust',
    'Set Off',
    'Scumming',
    'Side Lay',
    'Front Lay',
    'Misregistration',
    'D/M/S from Plate'
  ]

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/ap/qc/get/data/${id}`, {
        headers: { 'x-access-token': token }
      })
      setUserData(res.data.data)
    } catch (error) {
      console.log('error in get data through id in printing', error)
    }
  }

  useEffect(() => {
    getData()
  }, [id])

  console.log('userData', userData)
  const today = new Date()
  const formattedDate = today.toLocaleDateString()

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 5, width: '100%' }}>
      <CardContent sx={{ width: '100%' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ px: { xs: 2, md: 10 } }}>
            <Stack spacing={1} sx={{ width: '100%' }}>
              <Chip label='Add Printing' sx={{ textAlign: 'center', mb: 5, width: '100%' }} />
            </Stack>

            {questions.map((question, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <FormControl fullWidth>
                  <FormLabel sx={{ fontWeight: '900' }}>{question}</FormLabel>
                  <RadioGroup
                    row
                    name={question}
                    value={formik.values[question].answer}
                    onChange={e =>
                      formik.setFieldValue(question, {
                        answer: e.target.value,
                        reason: ''
                      })
                    }
                  >
                    <FormControlLabel value='Okay' control={<Radio />} label='Okay' />
                    <FormControlLabel value='Not Okay' control={<Radio />} label='Not Okay' />
                  </RadioGroup>
                  {formik.values[question].answer === 'Not Okay' && (
                    <TextField
                      label='Enter reason'
                      variant='outlined'
                      fullWidth
                      value={formik.values[question].reason}
                      onChange={e =>
                        formik.setFieldValue(question, {
                          ...formik.values[question],
                          reason: e.target.value
                        })
                      }
                      sx={{ mt: 1 }}
                    />
                  )}
                </FormControl>
              </Grid>
            ))}

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type='submit'
                variant='contained'
                disabled={formik.isSubmitting}
                sx={{
                  backgroundColor: '#0563BB',
                  '&:hover': { backgroundColor: '#0AA4D2 !important' }
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container sx={{ mt: 5 }}>
          <Grid item lg={12}>
            <Paper sx={{ padding: 2, overflowX: 'auto' }}>
              {/* Top Form Section */}
              <Grid container spacing={2} mb={2}>
                {/* <Button variant='contained'>Print</Button> */}
                <Box
                  sx={{
                    bgcolor: '#87CEEB',
                    width: '100%',
                    display: 'flex',
                    // flexDirection: { md: 'row', xs: 'column' },
                    p: 3,
                    mt: 5,
                    mb: 5,
                    borderRadius: '10px'
                  }}
                >
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography variant='subtitle2' sx={{ fontWeight: '900' }}>
                        Document Code:
                      </Typography>
                      <Typography>{userData?.jobId?.productionOrderNo}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant='subtitle2'>UBC/QC/SOR - 1</Typography>
                    {/* <Typography>UBC/QC/SOR - 1</Typography> */}
                  </Grid>
                  <Grid item xs={12} md={4} textAlign='right'>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography variant='subtitle2' sx={{ fontWeight: '900' }}>
                        Issue Date:
                      </Typography>
                      <Typography>{formattedDate}</Typography>
                    </Box>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    mb: 3,
                    display: 'flex',

                    gap: 3,
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center'
                  }}
                >
                  <Grid item xs={12} lg={3}>
                    <TextField fullWidth label='Machine' value={userData?.machine?.code} size='small' />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField fullWidth label='Operator Name' value={userData?.userId?.userName} size='small' />
                  </Grid>
                  <Grid item xs={6} lg={2}>
                    <TextField fullWidth label='Shift' value='A' size='small' />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <TextField fullWidth label='Date' value={formattedDate} size='small' />
                  </Grid>
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    mb: 3,
                    display: 'flex',
                    gap: 3,
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center'
                  }}
                >
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} lg={3}>
                        <TextField fullWidth label='Job Card No.' value={userData.jobData?.} size='small' />
                      </Grid>
                      {/* {[
                        'Job Card No.',
                        'Job Name',
                        'Sales Order Nbr',
                        'Sheet Name',
                        'Received Qty',
                        'Completed Qty'
                      ].map(label => (
                        <Grid item xs={12} sm={2} key={label}>
                          <TextField fullWidth label={label} size='small' />
                        </Grid> */}
                      {/* ))} */}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Table Section */}
              <Table sx={{ width: '100%' }} size='large'>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map((header, index) => (
                      <TableCell key={index} align='center'>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4].map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {tableHeaders.map((_, colIndex) => (
                        <TableCell key={colIndex} align='center'>
                          {/* You can add dynamic or static content here */}
                          {rowIndex === 0 && colIndex === 1 ? '19:26:31' : ''}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Printing

// import React, { forwardRef, useState } from 'react'
// import { useRouter } from 'next/router'
// import { CardContent, Card, TextField, Button, Grid, Autocomplete } from '@mui/material'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { useSelector } from 'react-redux'

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// const Printing = () => {
//   const router = useRouter()
//   const [data, setData] = useState([])
//   const auth = useSelector(state => state.auth)
//   const { id } = router.query
//   const token = auth.token

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

//   const options = [
//     { label: 'Okay', value: 'okay' },
//     { label: 'Not Okay', value: 'not_okay' }
//   ]

//   const getInitialValues = () => {
//     const obj = {}
//     fields.forEach(f => {
//       obj[f] = { status: '', reason: '' }
//     })
//     return {
//       dmsFromPlate: '',
//       ...obj
//     }
//   }

//   const getValidationSchema = () => {
//     const shape = {
//       dmsFromPlate: Yup.string().required('DMS is required')
//     }

//     fields.forEach(f => {
//       shape[`${f}.status`] = Yup.string().required('Status is required')
//       shape[`${f}.reason`] = Yup.string().when(`${f}.status`, {
//         is: 'not_okay',
//         then: Yup.string().required('Reason is required'),
//         otherwise: Yup.string()
//       })
//     })

//     return Yup.object().shape(shape)
//   }

//   const formik = useFormik({
//     initialValues: getInitialValues(),
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

//             {fields.map(field => (
//               <Grid item xs={12} md={6} key={field}>
//                 <Autocomplete
//                   options={options}
//                   getOptionLabel={option => option.label}
//                   value={options.find(opt => opt.value === formik.values[field]?.status) || null}
//                   onChange={(e, value) => {
//                     formik.setFieldValue(`${field}.status`, value?.value || '')
//                     if (value?.value !== 'not_okay') {
//                       formik.setFieldValue(`${field}.reason`, '')
//                     }
//                   }}
//                   renderInput={params => (
//                     <TextField
//                       {...params}
//                       label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//                       error={Boolean(formik.touched[field]?.status && formik.errors[field]?.status)}
//                       helperText={formik.touched[field]?.status && formik.errors[field]?.status}
//                     />
//                   )}
//                 />

//                 {formik.values[field]?.status === 'not_okay' && (
//                   <TextField
//                     fullWidth
//                     label='Reason'
//                     value={formik.values[field]?.reason || ''}
//                     onChange={e => formik.setFieldValue(`${field}.reason`, e.target.value)}
//                     error={Boolean(formik.touched[field]?.reason && formik.errors[field]?.reason)}
//                     helperText={formik.touched[field]?.reason && formik.errors[field]?.reason}
//                     sx={{ mt: 1 }}
//                   />
//                 )}
//               </Grid>
//             ))}

//             <Grid item xs={12} sx={{ mt: 5 }}>
//               <Button
//                 variant='contained'
//                 type='submit'
//                 // fullWidth
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
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default Printing
