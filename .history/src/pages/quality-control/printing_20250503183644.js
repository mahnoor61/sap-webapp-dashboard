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
// import * as yup from 'yup'
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
//     validationSchema: yup.object({
//       dmsFromPlate: yup.string().required('DMS is required'),
//       text: yup.string().required('Text is required'),
//       dust: yup.string().required('Dust is required'),
//       sideLay: yup.string().required('Side Lay is required'),
//       sideLay: yup.string().required('Side Lay is required'),
//       frontLay: yup.string().required('Front Lay is required'),
//       registration: yup.string().required('Registration Lay is required'),
//       scumming: yup.string().required('Scumming Lay is required'),
//       setOff: yup.string().required('Set Off Lay is required'),
//       doubling: yup.string().required('Doubling Lay is required'),
//       colorVariation: yup.string().required('Color Variation Lay is required')
//     }),
//     onSubmit: async values => {
//       try {
//         const response = await axios.post(
//           `${BASE_URL}/api/ap/admin/register`,
//           {
//             id: id,
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

//         toast.success('User created successfully.')
//         formik.resetForm()
//       } catch (error) {
//         console.log(error)
//         toast.error(error.response.data.msg)
//         formik.resetForm()
//       }
//     }
//   })

//   return (
//     // <Container>

//     <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 5 }}>
//       <CardContent>
//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={1} sx={{ px: 20 }}>
//             <Stack spacing={1} sx={{ width: '100%' }}>
//               <Chip sx={{ textAlign: 'center', mb: 10, width: '100%' }} label='Add Printing ' />
//               {/*<Chip label="Chip Outlined" variant="outlined" />*/}
//             </Stack>

//             <Autocomplete
//               fullWidth
//               sx={{ mb: 7 }}
//               options={roles}
//               getOptionLabel={option => option.name} // Display name in dropdown
//               value={roles.find(role => role._id === formik.values.role) || null} // Find selected role by ID
//               onChange={(event, value) => formik.setFieldValue('role', value ? value._id : '')} // Set ID in formik
//               renderInput={params => (
//                 <TextField
//                   {...params}
//                   label='Role'
//                   error={Boolean(formik.touched.role && formik.errors.role)}
//                   helperText={formik.touched.role && formik.errors.role}
//                 />
//               )}
//             />

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
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </CardContent>
//     </Card>

//     // </Container>
//   )
// }
// export default Printing
