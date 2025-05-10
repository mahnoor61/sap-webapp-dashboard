// import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react'
// import { useRouter } from 'next/router'
// import {
//   CardContent,
//   Card,
//   TextField,
//   Button,
//   Grid,
//   Box,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Chip,
//   Stack,
//   Autocomplete,
//   Container,
//   Typography,
//   DialogActions,
//   Dialog,
//   TablePagination,
//   TableContainer,
//   CircularProgress,
//   MenuItem,
//   DialogTitle,
//   DialogContent,
//   DialogContentText
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
// import { FilterHelper, PaginationHelper } from '/src/helpers/filter'
// import SearchIcon from '@mui/icons-material/Search'
// import DoneIcon from '@mui/icons-material/Done'
// import ClearIcon from '@mui/icons-material/Clear'

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// const Printing = () => {
//   const serialRef = useRef(1)
//   const [responses, setResponses] = useState({})

//   const [open, setOpen] = useState(false)
//   const [activeCell, setActiveCell] = useState('')
//   const [reason, setReason] = useState('')

//   const [shift, setShift] = useState('A')
//   const [response, setResponse] = useState('Okay')
//   const [loadingComplete, setLoadingComplete] = useState(true)
//   // const [open, setOpen] = React.useState(false)

//   const router = useRouter()
//   const [userData, setUserData] = useState('')
//   const { id } = router.query
//   const auth = useSelector(state => state.auth)
//   const token = auth.token

//   // function for not okay  dialogue
//   const handleOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }

//   const getData = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/ap/qc/get/data/${id}`, {
//         headers: { 'x-access-token': token }
//       })
//       setUserData(res.data.data)
//     } catch (error) {
//       console.log('error in get data through id in printing', error)
//     }
//   }

//   useEffect(() => {
//     getData()
//   }, [id])

//   console.log('userData', userData)
//   const today = new Date()
//   const formattedDate = today.toLocaleDateString()

//   const handleChange = event => {
//     setShift(event.target.value)
//   }

//   const handleChangeForDropdown = event => {
//     setResponse(event.target.value)
//   }

//   const questions = [
//     '#',
//     'Time',
//     'Quantity',
//     'Text',
//     'color Variation',
//     'doubling',
//     'dust',
//     'set Off',
//     'scumming',
//     'side Lay',
//     'front Lay',
//     'registration',
//     'dmsFromPlate'
//   ]

//   const formatResponseValue = value => {
//     if (!value || !value.status) return ''
//     return value.status === 'Not Okay' && value.reason ? `Not Okay - ${value.reason}` : value.status
//   }

//   const handleSave = async () => {
//     if (!userData || !userData.serialNo) return

//     const dataToSend = {
//       serialNo: userData.serialNo,
//       dmsFromPlate: formatResponseValue(responses[`${userData.serialNo}_printing_dmsFromPlate`]),
//       text: formatResponseValue(responses[`${userData.serialNo}_printing_text`]),
//       dust: formatResponseValue(responses[`${userData.serialNo}_printing_dust`]),
//       sideLay: formatResponseValue(responses[`${userData.serialNo}_printing_sideLay`]),
//       frontLay: formatResponseValue(responses[`${userData.serialNo}_printing_frontLay`]),
//       registration: formatResponseValue(responses[`${userData.serialNo}_printing_registration`]),
//       scumming: formatResponseValue(responses[`${userData.serialNo}_printing_scumming`]),
//       setOff: formatResponseValue(responses[`${userData.serialNo}_printing_setOff`]),
//       doubling: formatResponseValue(responses[`${userData.serialNo}_printing_doubling`]),
//       colorVariation: formatResponseValue(responses[`${userData.serialNo}_printing_colorVariation`])
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/api/ap/qc/printing/${id}`, dataToSend, {
//         headers: { 'x-access-token': token }
//       })

//       toast.success('Submitted successfully')
//       console.log('Submitted successfully', res.data)
//     } catch (err) {
//       console.error('Submission failed', err)
//     }
//   }

//   return (
//     <>
//       <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 5, width: '100%' }}>
//         <CardContent sx={{ width: '100%' }}>
//           <Grid container sx={{ mt: 5 }}>
//             <Grid item lg={12}>
//               <Paper sx={{ padding: 2, overflowX: 'auto' }}>
//                 {/* Top Form Section */}
//                 <Grid container spacing={2} mb={2}>
//                   {/* <Button variant='contained'>Print</Button> */}
//                   <Box
//                     sx={{
//                       bgcolor: '#87CEEB',
//                       width: '100%',
//                       display: 'flex',
//                       justifyContent: 'space-between',

//                       p: 3,
//                       mt: 5,
//                       mb: 3,
//                       borderRadius: '10px'
//                     }}
//                   >
//                     <Box sx={{ display: 'flex', gap: 2 }}>
//                       <Typography variant='subtitle2' sx={{ fontWeight: '900' }}>
//                         Document Code:
//                       </Typography>
//                       <Typography>{userData?.jobId?.productionOrderNo}</Typography>
//                     </Box>

//                     <Typography variant='subtitle2'>UBC/QC/SOR - 1</Typography>

//                     <Box sx={{ display: 'flex', gap: 2 }}>
//                       <Typography variant='subtitle2' sx={{ fontWeight: '900' }}>
//                         Issue Date:
//                       </Typography>
//                       <Typography>{formattedDate}</Typography>
//                     </Box>
//                   </Box>
//                 </Grid>
//                 <TableContainer component={Paper}>
//                   <Table aria-label='simple table' sx={{ width: '100%' }}>
//                     <TableHead sx={{ width: '100%' }}>
//                       <TableRow sx={{ width: '100%' }}>
//                         <TableCell sx={{ width: '100%', p: '0 !important' }} colSpan={13}>
//                           <Box
//                             sx={{
//                               mt: 3,
//                               mb: 5,
//                               display: 'flex',

//                               gap: 3,
//                               justifyContent: 'space-between',
//                               width: '100%',
//                               alignItems: 'center'
//                             }}
//                           >
//                             <Grid item xs={12} lg={3}>
//                               <TextField fullWidth label='Machine' value={userData?.machine?.code} size='small' />
//                             </Grid>
//                             <Grid item xs={12} lg={3}>
//                               <TextField
//                                 fullWidth
//                                 label='Operator Name'
//                                 value={userData?.userId?.userName}
//                                 size='small'
//                               />
//                             </Grid>
//                             <Grid item xs={6} lg={2}>
//                               <TextField
//                                 select
//                                 fullWidth
//                                 label='Shift'
//                                 value={shift}
//                                 onChange={handleChange}
//                                 size='small'
//                               >
//                                 <MenuItem value='A'>A</MenuItem>
//                                 <MenuItem value='B'>B</MenuItem>
//                               </TextField>
//                             </Grid>
//                             <Grid item xs={6} lg={4}>
//                               <TextField fullWidth label='Date' value={formattedDate} size='small' />
//                             </Grid>
//                           </Box>
//                           <Box
//                             sx={{
//                               mt: 3,
//                               mb: 3,
//                               display: 'flex',
//                               gap: 3,
//                               justifyContent: 'space-between',
//                               width: '100%',
//                               alignItems: 'center'
//                             }}
//                           >
//                             <Grid item xs={12}>
//                               <Grid container spacing={5}>
//                                 <Grid item xs={6} lg={3}>
//                                   <TextField
//                                     fullWidth
//                                     label='Job Card No'
//                                     value={userData?.jobData?.docNum}
//                                     size='small'
//                                   />
//                                 </Grid>
//                                 <Grid item xs={6} lg={6}>
//                                   <TextField
//                                     fullWidth
//                                     label='Job Name'
//                                     value={userData?.jobData?.prodName}
//                                     size='small'
//                                   />
//                                 </Grid>
//                                 <Grid item xs={6} lg={3}>
//                                   <TextField
//                                     fullWidth
//                                     label='Sales Order Nbr'
//                                     value={userData?.jobData?.OriginNum}
//                                     size='small'
//                                   />
//                                 </Grid>
//                                 <Grid item xs={6} lg={6}>
//                                   <TextField
//                                     fullWidth
//                                     label='Sheet Name'
//                                     value={userData?.jobData?.ComponentItemName}
//                                     size='small'
//                                   />
//                                 </Grid>

//                                 <Grid item xs={6} lg={3}>
//                                   <TextField
//                                     fullWidth
//                                     label='Received Quantity'
//                                     value={userData?.jobId?.recievedByOperator}
//                                     size='small'
//                                   />
//                                 </Grid>
//                                 <Grid item xs={6} lg={3}>
//                                   <TextField
//                                     fullWidth
//                                     label='Completed Quantity'
//                                     value={userData?.jobId?.totalCompletedQuantity}
//                                     size='small'
//                                   />
//                                 </Grid>
//                               </Grid>
//                             </Grid>
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                       <TableRow sx={{ justifyContent: 'space-between', alignItems: 'left', width: '100%' }}>
//                         {questions.map((question, questionIndex) => (
//                           <TableCell key={question}>
//                             {question} {/* Or use a more user-friendly label here */}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     </TableHead>
//                     <TableBody sx={{ width: '100%' }}>
//                       {userData?.makeTime && userData?.makeTimeStatus ? (
//                         <TableRow sx={{ width: '100%' }}>
//                           <TableCell>1</TableCell> {/* Serial Number */}
//                           <TableCell>{new Date(userData.makeTime).toLocaleTimeString()}</TableCell> {/* Time */}
//                           <TableCell colSpan={11}>
//                             <Box
//                               sx={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 height: '100%',
//                                 py: 2, // Optional: vertical padding
//                                 fontWeight: 'bold',
//                                 color: 'white',
//                                 width: '100%'
//                               }}
//                             >
//                               {userData.makeTimeStatus}
//                             </Box>
//                           </TableCell>
//                         </TableRow>
//                       ) : null}
//                       <TableRow align='center'>
//                         {/* <form onSubmit={formik.handleSubmit}> */}
//                         <TableCell></TableCell>
//                         {/* </form> */}
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, mb: 3 }}>
//                   <Button
//                     onClick={() => {
//                       setResponses(prev => ({
//                         ...prev,
//                         [activeCell]: { answer: 'Not Okay', reason }
//                       }))
//                       setOpen(false)
//                       setReason('')
//                     }}
//                     type='submit'
//                     variant='contained'
//                     // disabled={formik.isSubmitting}
//                     sx={{
//                       backgroundColor: '#0563BB',
//                       '&:hover': { backgroundColor: '#0AA4D2 !important' }
//                     }}
//                   >
//                     Submit
//                   </Button>
//                 </Grid>
//               </Paper>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       <React.Fragment>
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           aria-labelledby='alert-dialog-title'
//           aria-describedby='alert-dialog-description'
//         >
//           {/* <form onSubmit={formik.handleSubmit}> */}
//           <DialogTitle id='alert-dialog-title'>{'Give Reason For Not Okay'}</DialogTitle>
//           <DialogContent>
//             <DialogContentText id='alert-dialog-description'>
//               <TextField
//                 required
//                 fullWidth
//                 id='outlined-basic'
//                 label='Add Reason'
//                 variant='filled'
//                 sx={{ my: 4, width: '100%' }}
//                 placeholder='Add Reason'
//                 name='reason'
//                 type='text'
//                 // error={Boolean(formik.touched.quantity && formik.errors.quantity)}
//                 // helperText={formik.touched.quantity && formik.errors.quantity}
//                 // onBlur={formik.handleBlur}
//                 // onChange={formik.handleChange}
//                 // value={formik.values.quantity}
//               />
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>

//             <Button type='submit' autoFocus>
//               Submit
//             </Button>
//           </DialogActions>
//           {/* </form> */}
//         </Dialog>
//       </React.Fragment>
//     </>
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
  Select,
  Paper,
  Chip,
  Stack,
  Autocomplete,
  Container,
  Typography,
  DialogActions,
  Dialog,
  TablePagination,
  TableContainer,
  CircularProgress,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Icon
} from '@mui/material/'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { FilterHelper, PaginationHelper } from '/src/helpers/filter'
import SearchIcon from '@mui/icons-material/Search'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL

const Printing = () => {
  const theme = useTheme()
  const serialRef = useRef(1)
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [responses, setResponses] = useState({})
  const [currentDate, setCurrentDate] = useState('')
  const [open, setOpen] = useState(false)
  const [activeCell, setActiveCell] = useState('')
  const [reason, setReason] = useState('')

  const [editingCell, setEditingCell] = useState(null)
  const [selections, setSelections] = useState({})

  // const [rowIndex, colIndex] = activeCell.split('_');
  // const serialNo = rows[rowIndex]?.serial;
  // const header = questions[colIndex];

  const [shift, setShift] = useState('A')
  const [response, setResponse] = useState('Okay')
  const [loadingComplete, setLoadingComplete] = useState(true)
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [openDialogue, setOpenDialogue] = useState(false)
  // const [open, setOpen] = React.useState(false)

  const router = useRouter()
  const [userData, setUserData] = useState('')
  const { id } = router.query
  const auth = useSelector(state => state.auth)
  const token = auth.token

  // function for not okay  dialogue
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOpen = transaction => {
    setSelectedTransaction(transaction)
    setOpenDialogue(true)
  }

  const handleClickClose = () => {
    setOpenDialogue(false)
  }

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

  const today = new Date()
  const formattedDate = today.toLocaleDateString()

  const handleChange = event => {
    setShift(event.target.value)
  }

  const handleChangeForDropdown = event => {
    setResponse(event.target.value)
  }

  const questions = [
    // '#',
    'Time',
    'Quantity',
    'text',
    'color Variation',
    'doubling',
    'dust',
    'set Off',
    'scumming',
    'side Lay',
    'front Lay',
    'registration',
    'dmsFromPlate'
  ]

  const rows = [{ id: 1, serial: 1 }]

  const handleCellClick = rowIndex => {
    setEditingCell(rowIndex)
  }

  const handleSelectChange = (rowIndex, value) => {
    setSelections(prev => ({ ...prev, [rowIndex]: value }))
    setEditingCell(null) // Hide dropdown after selection
  }
  useEffect(() => {
    const savedResponses = localStorage.getItem('printing_responses')
    if (savedResponses) {
      const parsed = JSON.parse(savedResponses)
      setResponses(parsed)

      // Restore selections from responses (for single-row case)
      const restoredSelections = {}
      questions.slice(2).forEach((question, colIndex) => {
        if (parsed[question]) {
          const key = `0_${colIndex + 2}` // rowIndex 0, colIndex adjusted for offset
          restoredSelections[key] = parsed[question].answer
        }
      })

      setSelections(restoredSelections)
    }
  }, [userData])

  // useEffect(() => {
  //   const savedResponses = localStorage.getItem('printing_responses')
  //   if (savedResponses) {
  //     const parsed = JSON.parse(savedResponses)
  //     setResponses(parsed)

  //     // Also restore selections from responses
  //     const restoredSelections = {}
  //     Object.entries(parsed).forEach(([header, val]) => {
  //       rows.forEach((row, rowIndex) => {
  //         questions.forEach((question, colIndex) => {
  //           if (question === header && row.serial === val.serialNo) {
  //             const key = `${rowIndex}_${colIndex}`
  //             restoredSelections[key] = val.answer
  //           }
  //         })
  //       })
  //     })
  //     setSelections(restoredSelections)
  //   }
  // }, [userData])

  useEffect(() => {
    if (responses && Object.keys(responses).length > 0) {
      localStorage.setItem('printing_responses', JSON.stringify(responses))
    }
  }, [responses])

  const formatResponseValue = responseObj => {
    // if (!responseObj) return { answer: '', reason: '', serialNo: '' }

    if (!responseObj) return { answer: '', reason: '' }

    return {
      answer: responseObj.answer,
      reason: responseObj.reason || ''

      // serialNo: responseObj.serialNo
    }
  }

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        shift: shift,
        date: formattedDate,

        // serialNo: userData.serialNo,

        dmsFromPlate: formatResponseValue(responses['dmsFromPlate']),
        text: formatResponseValue(responses['text']), // fix case
        dust: formatResponseValue(responses['dust']),
        sideLay: formatResponseValue(responses['side Lay']), // remove space
        frontLay: formatResponseValue(responses['front Lay']), // remove space
        registration: formatResponseValue(responses['registration']),
        scumming: formatResponseValue(responses['scumming']),
        setOff: formatResponseValue(responses['set Off']),
        doubling: formatResponseValue(responses['doubling']),
        colorVariation: formatResponseValue(responses['color Variation'])
      }

      const res = await axios.post(`${BASE_URL}/api/ap/qc/printing/${id}`, dataToSend, {
        headers: { 'x-access-token': token }
      })

      toast.success('Printing form submitted successfully')
      await getAllQcCurrentTableData()
      localStorage.removeItem('printing_responses')
      console.log('Submitted successfully', res.data)
    } catch (err) {
      console.error('Submission printing failed', err)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredUsers = FilterHelper(users, searchQuery, ['userName'])
  const paginatedUsers = PaginationHelper(filteredUsers, page, rowsPerPage)
  const totalCount = filteredUsers.length

  const getAllQcCurrentTableData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/ap/qc/get/qc-data`,
        {
          jobId: userData?.jobId?._id,
          userId: userData?.userId?._id
        },
        {
          headers: {
            'x-access-token': token
          }
        }
      )
      setUsers(response.data.data)
      setLoadingComplete(false)
    } catch (error) {
      console.log('error in qc all current table data', error)
      setLoadingComplete(false)
    }
  }

  useEffect(() => {
    if (userData?.jobId?._id && userData?.userId?._id) {
      getAllQcCurrentTableData()
    }
  }, [userData])

  console.log('users', users)

  // function printReceipt() {
  //   const printContents = document.getElementById('receipt').innerHTML

  //   const styles = `
  //   <style>
  //     @media print {
  //       @page {
  //         margin: 0;
  //       }
  //       body {
  //         margin: 20px;
  //         font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
  //         background-color: #FDE5D1 !important;
  //         zoom: 180%;
  //       }
  //       .print-only {
  //         display: block !important;
  //       }
  //     }
  //     .print-only {
  //       display: none;
  //     }
  //   </style>`

  //   const originalTitle = document.title
  //   document.title = Delivery Receipt-${receiptData.voucherId};

  //   // Create a new iframe element
  //   const iframe = document.createElement('iframe')
  //   iframe.style.position = 'absolute'
  //   iframe.style.width = '0px'
  //   iframe.style.height = '0px'
  //   iframe.style.border = 'none'
  //   document.body.appendChild(iframe)

  //   const doc = iframe.contentWindow.document
  //   doc.open()
  //   doc.write('<html><head><title>Print Receipt</title>')
  //   doc.write(styles) // Inject styles
  //   doc.write('</head><body>')
  //   doc.write(printContents)
  //   doc.write('</body></html>')
  //   doc.close()

  //   iframe.contentWindow.focus()
  //   iframe.contentWindow.print()

  //   // Remove the iframe after printing
  //   iframe.contentWindow.onafterprint = () => {
  //     document.body.removeChild(iframe)
  //     document.title = originalTitle
  //   }
  // }

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 5,

          width: '100%',
          overflowX: 'auto'
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Grid container sx={{ mt: 5, width: '100%' }}>
            <Grid item lg={12}>
              {/* <Paper sx={{ padding: 2, width: '100%', overflowX: 'auto' }}> */}
              {/* Top Form Section */}
              <Grid container spacing={2} mb={2} sx={{ width: '100%', overflowX: 'auto' }}>
                {/* <Button variant='contained'>Print</Button> */}
                <Box
                  sx={{
                    bgcolor: '#87CEEB',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',

                    p: 3,
                    mt: 5,
                    mb: 3,
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
              {/* <Box sx={{}}> */}
              <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table aria-label='simple table' sx={{ width: '100%' }}>
                  <TableHead sx={{ width: '100%' }}>
                    <TableRow sx={{ width: '100%' }}>
                      <TableCell sx={{ width: '100%', p: '0 !important' }} colSpan={13}>
                        <Box
                          sx={{
                            mt: 3,
                            mb: 5,
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
                            <TextField
                              select
                              fullWidth
                              label='Shift'
                              value={shift}
                              onChange={handleChange}
                              size='small'
                            >
                              <MenuItem value='A'>A</MenuItem>
                              <MenuItem value='B'>B</MenuItem>
                            </TextField>
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
                              <Grid item xs={6} lg={3}>
                                <TextField
                                  fullWidth
                                  label='Job Card No'
                                  value={userData?.jobData?.docNum}
                                  size='small'
                                />
                              </Grid>
                              <Grid item xs={6} lg={6}>
                                <TextField
                                  fullWidth
                                  label='Job Name'
                                  value={userData?.jobData?.prodName}
                                  size='small'
                                />
                              </Grid>
                              <Grid item xs={6} lg={3}>
                                <TextField
                                  fullWidth
                                  label='Sales Order Nbr'
                                  value={userData?.jobData?.OriginNum}
                                  size='small'
                                />
                              </Grid>
                              <Grid item xs={6} lg={6}>
                                <TextField
                                  fullWidth
                                  label='Sheet Name'
                                  value={userData?.jobData?.ComponentItemName}
                                  size='small'
                                />
                              </Grid>

                              <Grid item xs={6} lg={3}>
                                <TextField
                                  fullWidth
                                  label='Received Quantity'
                                  value={userData?.jobId?.recievedByOperator}
                                  size='small'
                                />
                              </Grid>
                              <Grid item xs={6} lg={3}>
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
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ justifyContent: 'space-between', alignItems: 'left', width: '100%' }}>
                      {questions.map((question, questionIndex) => (
                        <TableCell key={question}>
                          {question} {/* Or use a more user-friendly label here */}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ width: '100%' }}>
                    {userData?.time && userData?.makeTimeStatus ? (
                      <TableRow sx={{ width: '100%' }}>
                        <TableCell>{new Date(userData.time).toLocaleTimeString()}</TableCell>
                        <TableCell colSpan={11} sx={{ width: '100%' }}>
                          <Box
                            sx={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              py: 2,
                              fontWeight: 'bold'
                            }}
                          >
                            {userData.makeTimeStatus}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : userData?.quantity && userData?.time ? (
                      <TableRow>
                        <TableCell>{new Date(userData.time).toLocaleTimeString()}</TableCell>
                        <TableCell>{userData.quantity}</TableCell>
                        {questions.slice(2).map((question, colIndex) => {
                          const cellKey = `0_${colIndex + 2}`
                          return (
                            <TableCell
                              key={cellKey}
                              sx={{ cursor: 'pointer', color: 'black' }}
                              onClick={() => setEditingCell(cellKey)}
                            >
                              {editingCell === cellKey ? (
                                <Select
                                  sx={{ width: '100px', maxWidth: '100%' }}
                                  value={selections[cellKey] || ''}
                                  onChange={e => {
                                    const value = e.target.value
                                    setSelections(prev => ({ ...prev, [cellKey]: value }))
                                    if (value === 'Not Okay') {
                                      setActiveCell(cellKey)
                                      setOpen(true)
                                    } else {
                                      setResponses(prev => ({
                                        ...prev,
                                        [question]: {
                                          answer: 'Okay',
                                          reason: ''
                                        }
                                      }))
                                    }
                                    setEditingCell(null)
                                  }}
                                  onBlur={() => setEditingCell(null)}
                                  autoFocus
                                  size='small'
                                >
                                  <MenuItem value='Okay'>Okay</MenuItem>
                                  <MenuItem value='Not Okay'>Not Okay</MenuItem>
                                </Select>
                              ) : selections[cellKey] === 'Okay' ? (
                                <DoneIcon sx={{ color: 'green !important' }} />
                              ) : selections[cellKey] === 'Not Okay' ? (
                                <ClearIcon sx={{ color: 'red !important' }} />
                              ) : (
                                ''
                              )}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </TableContainer>

              {!userData?.makeTimeStatus && (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, mb: 3 }}>
                  <Button
                    onClick={() => {
                      setResponses({})
                      setOpen(false)
                      setReason('')
                      setSelections({})
                      handleSubmit()
                    }}
                    type='submit'
                    variant='contained'
                    sx={{
                      backgroundColor: '#0563BB',
                      '&:hover': { backgroundColor: '#0AA4D2 !important' }
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              )}

              {/*display not okay data */}
              {responses && Object.entries(responses).some(([_, val]) => val.answer === 'Not Okay') && (
                <Box
                  mt={4}
                  p={2}

                  // border='1px solid #ccc'
                  // borderRadius='10px'
                  // bgcolor='#f9f9f9' color='black'
                >
                  <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
                    Issues (Not Okay)
                  </Typography>
                  <ul style={{ paddingLeft: '20px' }}>
                    {Object.entries(responses)
                      .filter(([_, value]) => value.answer === 'Not Okay')
                      .map(([key, value], index) => (
                        <li key={index}>
                          <strong>{value.serialNo}</strong> - <strong>{key}</strong>: {value.reason}
                        </li>
                      ))}
                  </ul>
                </Box>
              )}
              {/* </Paper> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ mt: 20 }}>
        <Table aria-label='simple table' sx={{ width: '100%' }}>
          <TableHead sx={{ width: '100%' }}>
            <TableRow sx={{ width: '100%' }}>
              <TableCell sx={{ width: '100%' }} colSpan={13}>
                <Box
                  colspan={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',

                    mt: 5,
                    p: 2
                  }}
                >
                  <Typography
                    variant='h4'
                    sx={{
                      flex: 1,
                      textAlign: { md: 'center', xs: 'left' },
                      fontWeight: 'bold'
                    }}
                  >
                    All Printing Data
                  </Typography>

                  <Button
                    variant='contained'
                    // onClick={printReceipt}
                    sx={{ mr: 2, backgroundColor: '#0563BB', '&:hover': { backgroundColor: '#0AA4D2 !important' } }}
                  >
                    Print
                  </Button>
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
              <TableCell>#</TableCell>

              <TableCell>Time</TableCell>

              <TableCell>Quantity</TableCell>
              <TableCell>Text</TableCell>
              <TableCell>color Variation</TableCell>
              <TableCell>Doubling</TableCell>
              <TableCell>Dust</TableCell>
              <TableCell>Set Off</TableCell>
              <TableCell>Scumming</TableCell>
              <TableCell>Side Lay</TableCell>
              <TableCell>Front Lay</TableCell>
              <TableCell>Registration</TableCell>
              <TableCell>dmsFromPlate</TableCell>

              {/* <TableCell>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: '100%' }}>
            {loadingComplete ? (
              <TableRow align='center'>
                <TableCell colSpan={13} align='center'>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedUsers && paginatedUsers.length > 0 ? (
              paginatedUsers.map((data, index) =>
                data.makeTimeStatus ? (
                  <TableRow key={data._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{new Date(data.time).toLocaleTimeString()}</TableCell>
                    <TableCell colSpan={13} align='center' sx={{ fontWeight: 'bold' }}>
                      {data.makeTimeStatus}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={data._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{new Date(data.time).toLocaleTimeString()}</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>
                      {/* {data?.formId?.text?.answer} */}

                      {data?.formId?.text?.answer === 'Okay' ? (
                        <DoneIcon sx={{ color: 'green' }} />
                      ) : data?.formId?.text?.answer === 'Not Okay' ? (
                        <ClearIcon sx={{ color: 'red' }} />
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell>
                      {/* {data?.formId?.colorVariation?.answer} */}

                      {data?.formId?.colorVariation?.answer === 'Okay' ? (
                        <DoneIcon sx={{ color: 'green' }} />
                      ) : data?.formId?.colorVariation?.answer === 'Not Okay' ? (
                        <ClearIcon sx={{ color: 'red' }} />
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell>
                      {/* {data?.formId?.doubling?.answer} */}

                      {data?.formId?.doubling?.answer === 'Okay' ? (
                        <DoneIcon sx={{ color: 'green' }} />
                      ) : data?.formId?.doubling?.answer === 'Not Okay' ? (
                        <ClearIcon sx={{ color: 'red' }} />
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell>
                      {data?.formId?.dust?.answer === 'Okay' ? (
                        <DoneIcon sx={{ color: 'green' }} />
                      ) : data?.formId?.dust?.answer === 'Not Okay' ? (
                        <ClearIcon sx={{ color: 'red' }} />
                      ) : (
                        ''
                      )}

                      {/* {data?.formId?.dust?.answer} */}
                    </TableCell>
                    <TableCell>
                      {data?.formId?.setOff?.answer === 'Okay' ? (
                        <DoneIcon sx={{ color: 'green' }} />
                      ) : data?.formId?.setOff?.answer === 'Not Okay' ? (
                        <ClearIcon sx={{ color: 'red' }} />
                      ) : (
                        ''
                      )}

                      {/* {data?.formId?.setOff?.answer} */}
                    </TableCell>
                    <TableCell>
                      {/* {data?.formId?.scumming?.answer} */}

                      {data?.formId?.scumming?.answer === 'Okay' ? (
                        <DoneIcon sx={{ color: 'green' }} />
                      ) : data?.formId?.scumming?.answer === 'Not Okay' ? (
                        <ClearIcon sx={{ color: 'red' }} />
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell>
                      {/* {data?.formId?.sideLay?.answer} */}

                      {data?.formId?.sideLay?.answer === 'Okay' ? (
                        <DoneIcon sx={{ color: 'green' }} />
                      ) : data?.formId?.sideLay?.answer === 'Not Okay' ? (
                        <ClearIcon sx={{ color: 'red' }} />
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell>
                      {/* {data?.formId?.frontLay?.answer} */}

                      {data?.formId?.frontLay?.answer === 'Okay' ? (
                        <DoneIcon sx={{ color: 'green' }} />
                      ) : data?.formId?.frontLay?.answer === 'Not Okay' ? (
                        <ClearIcon sx={{ color: 'red' }} />
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell>
                      {/* {data?.formId?.registration?.answer} */}

                      {data?.formId?.registration?.answer === 'Okay' ? (
                        <DoneIcon sx={{ color: 'green' }} />
                      ) : data?.formId?.registration?.answer === 'Not Okay' ? (
                        <ClearIcon sx={{ color: 'red' }} />
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell>
                      {/* {data?.formId?.dmsFromPlate?.answer} */}
                      {data?.formId?.dmsFromPlate?.answer === 'Okay' ? (
                        <DoneIcon sx={{ color: 'green' }} />
                      ) : data?.formId?.dmsFromPlate?.answer === 'Not Okay' ? (
                        <ClearIcon sx={{ color: 'red' }} />
                      ) : (
                        ''
                      )}
                    </TableCell>
                  </TableRow>
                )
              )
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component='div'
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          {/* <form onSubmit={formik.handleSubmit}> */}
          <DialogTitle id='alert-dialog-title'>{'Give Reason For Not Okay'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <TextField
                required
                fullWidth
                id='outlined-basic'
                label='Add Reason'
                variant='filled'
                sx={{ my: 4, width: '100%' }}
                placeholder='Add Reason'
                name='reason'
                type='text'
                value={reason}
                onChange={e => setReason(e.target.value)}
                // error={Boolean(formik.touched.quantity && formik.errors.quantity)}
                // helperText={formik.touched.quantity && formik.errors.quantity}
                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                // value={formik.values.quantity}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            <Button
              type='submit'
              onClick={() => {
                const [rowIndex, colIndex] = activeCell.split('_')
                const serialNo = rows[rowIndex]?.serial
                const header = questions[colIndex]

                setResponses(prev => ({
                  ...prev,
                  [header]: {
                    answer: 'Not Okay',
                    reason,
                    serialNo
                    // header
                  }
                }))
                setOpen(false)
                setReason('')
                toast.success('Reason save successfully!')
              }}
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
          {/* </form> */}
        </Dialog>
      </React.Fragment>

      {/* printing pop up */}
      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={openDialogue}
          onClose={handleClickClose}
          aria-labelledby='responsive-dialog-title'
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: '#FDE5D1'
            }
          }}
        >
          {' '}
          <DialogTitle id='responsive-dialog-title' sx={{ paddingBottom: 0 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Typography variant='h5' sx={{ mb: 2 }}>
                Delivery Receipt
              </Typography>
              <IconButton
              // onClick={printReceipt}
              >
                <Icon icon='eva:download-outline' sx={{ color: '#4d4d4d' }} />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ overflowY: 'hidden' }}>
            <div
              id='receipt'
              className='receipt'
              style={{
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-around',
                backgoundColor: '#FDE5D1'
              }}
            >
              <Typography
                variant='h5'
                sx={{ mb: 2, display: 'none', fontSize: '12px !important' }}
                className='print-only'
              >
                Delivery Receipt
              </Typography>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  paddingBottom: '10px'
                }}
              >
                {/* <img alt="logo" src={${WEB_URL}/logo.png} width="50"/> */}
                {/* <img galt="wendycrash" src={${WEB_URL}/wendycrash.png} width="110"/> */}
              </div>
              <table
                style={{
                  textAlign: 'left',
                  marginBottom: '20px',
                  width: '100%',
                  borderCollapse: 'collapse'
                }}
              >
                <tbody>
                  <tr>
                    <th style={{ padding: '5px' }}>Customer Details</th>
                  </tr>
                  {selectedTransaction && (
                    <>
                      <tr>
                        <td
                          style={{
                            padding: '5px',
                            fontWeight: 500,
                            border: '1px solid #dddddd'
                          }}
                        >
                          Customer Name
                        </td>
                        <td
                          style={{
                            padding: '5px',
                            border: '1px solid #dddddd'
                          }}
                        >
                          {selectedTransaction.name}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            padding: '5px',
                            fontWeight: 500,
                            border: '1px solid #dddddd'
                          }}
                        >
                          Customer Email
                        </td>
                        <td
                          style={{
                            padding: '5px',
                            border: '1px solid #dddddd'
                          }}
                        >
                          {selectedTransaction.user_id.email}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            padding: '5px',
                            fontWeight: 500,
                            border: '1px solid #dddddd'
                          }}
                        >
                          Payment Info
                        </td>
                        <td
                          className='obscured'
                          style={{
                            padding: '5px',
                            border: '1px solid #dddddd'
                          }}
                        >
                          {selectedTransaction.card}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <table style={{ textAlign: 'left', width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <th style={{ padding: '5px' }}>Transaction Details</th>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #dddddd' }}>Voucher ID</td>
                    <td
                      style={{
                        padding: '5px',
                        border: '1px solid #dddddd'
                      }}
                    >
                      {receiptData.voucherId}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: '5px',
                        fontWeight: 500,
                        border: '1px solid #dddddd'
                      }}
                    >
                      Transaction
                      <br /> Amount
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #dddddd' }}>
                      {selectedTransaction && (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ margin: 0 }}>EUR: {selectedTransaction.euro}</p>
                            <Icon icon={currencyEur} width='16' color='#4d4d4d' sx={{ mb: 1 }} />
                          </div>
                          <div>
                            <p style={{ margin: 0 }}>IDR: {receiptData.voucherValue}</p>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #dddddd' }}>Coins</td>
                    <td
                      style={{
                        padding: '5px',
                        border: '1px solid #dddddd'
                      }}
                    >
                      {receiptData?.coins?.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '5px', fontWeight: 500, border: '1px solid #dddddd' }}>Coins Status</td>
                    <td
                      style={{
                        padding: '5px',
                        border: '1px solid #dddddd'
                      }}
                    >
                      {receiptData.voucherStatus}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: '5px',
                        fontWeight: 500,
                        border: '1px solid #dddddd'
                      }}
                    >
                      Delivery Date
                    </td>
                    <td
                      style={{
                        padding: '5px',
                        border: '1px solid #dddddd'
                      }}
                    >
                      {receiptData.deliveryDate}
                    </td>
                  </tr>
                </tbody>
              </table>
              <a
                className='print-only'
                //  href={${WEB_URL}/view?transactionId=${receiptData.voucherId}}
                style={{
                  display: 'none',
                  width: '100%',
                  color: '#AD2F91',
                  marginTop: '10px'
                }}
              >
                View your Coins Delivery here
              </a>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClickClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  )
}

export default Printing
