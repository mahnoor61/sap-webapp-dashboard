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
  Typography,
  TablePagination,
  TableContainer,
  CircularProgress
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
import { FilterHelper, PaginationHelper } from '/src/helpers/filter'
import SearchIcon from '@mui/icons-material/Search'

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
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loadingComplete, setLoadingComplete] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // const filteredUsers = FilterHelper(users, searchQuery, ['userName'])
  // const paginatedUsers = PaginationHelper(filteredUsers, page, rowsPerPage)
  // const totalCount = filteredUsers.length

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
                    justifyContent: 'space-between',
                    // flexDirection: { md: 'row', xs: 'column' },
                    p: 3,
                    mt: 5,
                    mb: 5,
                    borderRadius: '10px'
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant='subtitle2' sx={{ fontWeight: '900' }}>
                      Document Code:
                    </Typography>
                    <Typography>{userData?.jobId?.productionOrderNo}</Typography>
                  </Box>

                  <Typography variant='subtitle2'>UBC/QC/SOR - 1</Typography>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant='subtitle2' sx={{ fontWeight: '900' }}>
                      Issue Date:
                    </Typography>
                    <Typography>{formattedDate}</Typography>
                  </Box>
                </Box>
              </Grid>
              <TableContainer component={Paper}>
                <Table aria-label='simple table' sx={{ width: '100%' }}>
                  <TableHead sx={{ width: '100%' }}>
                    <TableRow sx={{ width: '100%' }}>
                      <TableCell sx={{ width: '100%' }} colSpan={10}>
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
                            <TextField
                              fullWidth
                              label='Operator Name'
                              value={userData?.userId?.userName}
                              size='small'
                            />
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
                            <Grid container spacing={5}>
                              <Grid item xs={6} lg={4}>
                                <TextField
                                  fullWidth
                                  label='Job Card No'
                                  value={userData?.jobData?.cardCode}
                                  size='small'
                                />
                              </Grid>
                              <Grid item xs={6} lg={4}>
                                <TextField
                                  fullWidth
                                  label='Job Name'
                                  value={userData?.jobData?.cardName}
                                  size='small'
                                />
                              </Grid>
                              <Grid item xs={6} lg={4}>
                                <TextField
                                  fullWidth
                                  label='Sales Order Nbr'
                                  value={userData?.jobData?.cardName}
                                  size='small'
                                />
                              </Grid>
                              <Grid item xs={6} lg={4}>
                                <TextField
                                  fullWidth
                                  label='Sheet Name'
                                  value={userData?.jobData?.cardName}
                                  size='small'
                                />
                              </Grid>

                              <Grid item xs={6} lg={4}>
                                <TextField
                                  fullWidth
                                  label='Received Quantity'
                                  value={userData?.jobId?.recievedByOperator}
                                  size='small'
                                />
                              </Grid>
                              <Grid item xs={6} lg={4}>
                                <TextField
                                  fullWidth
                                  label='Completed Quantity'
                                  value={userData?.jobId?.totalCompletedQuantity}
                                  size='small'
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                        {/* <TextField
                          variant='filled'
                          placeholder='Search through username...'
                          sx={{
                            '&::placeholder': {
                              color: 'rgba(71, 85, 105, 1)'
                            },
                            height: '55px',
                            width: '100%',
                            flex: '1 0 0',
                            gap: '10px',
                            alignSelf: 'stretch',
                            flexGrow: 1,
                            borderRadius: 1
                          }}
                          onChange={event => setSearchQuery(event.target.value)}
                          InputProps={{
                            endAdornment: (
                              <Button
                                variant='text'
                                disabled={true}
                                sx={{
                                  background: 'transparent !important'
                                }}
                              >
                                <SearchIcon sx={{ ml: 1.5, color: 'rgba(71, 85, 105, 1)' }} />
                              </Button>
                            )
                          }}
                        /> */}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ justifyContent: 'space-between', alignItems: 'left', width: '100%' }}>
                 
                 
                      <TableCell>UserName</TableCell>
                
                      <TableCell>Email</TableCell>
              
                      <TableCell>Role</TableCell>
                      <TableCell>Machine</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ width: '100%' }}>
                    {loadingComplete ? (
                      <TableRow align='center'>
                        <TableCell colSpan={4} align='center'>
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : paginatedUsers && paginatedUsers.length > 0 ? (
                      paginatedUsers.map(data => (
                        <TableRow key={data._id}>
                          <TableCell component='th' scope='row'>
                            {data.userName}
                          </TableCell>

                          <TableCell component='th' scope='row'>
                            {data.email}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {data.role?.name ? data.role.name : 'No Role'}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {data.machine?.code ? data.machine.code : 'No Machine'}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align='center'>
                          No Users Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component='div'
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}

              {/* <Table sx={{ width: '100%' }} size='large'>
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
              {/* {rowIndex === 0 && colIndex === 1 ? '19:26:31' : ''} */}
              {/* </TableCell> */}
              {/* ))} */}
              {/* </TableRow> */}
              {/* ))} */}
              {/* </TableBody> */}
              {/* </Table> */}
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Printing
