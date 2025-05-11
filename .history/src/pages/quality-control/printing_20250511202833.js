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
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
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

  const handleClickOpen = () => {
    // setSelectedTransaction(transaction)
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

  function printReceipt() {
    const printContents = document.getElementById('receipt')?.innerHTML
    if (!printContents) return

    const styles = `
      <style>
        @media print {
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          html, body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', sans-serif;
            font-size: 9px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-wrapper {
            width: 100%;
          }
          .print-table-container {
            width: 100%;
            min-width: 900px; /* ensure it fits landscape layout */
          }
          table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }
          th, td {
            border: 1px solid #999;
            padding: 4px;
            text-align: center;
            word-break: break-word;
          }
        }
      </style>
    `

    const originalTitle = document.title
    document.title = `QC Report - ${new Date().toLocaleDateString()}`

    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.right = '0'
    iframe.style.bottom = '0'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = 'none'
    document.body.appendChild(iframe)

    const doc = iframe.contentWindow.document
    doc.open()
    doc.write('<html><head><title>Print</title>')
    doc.write(styles)
    doc.write('</head><body>')
    doc.write(`<div class="print-wrapper"><div class="print-table-container">${printContents}</div></div>`)
    doc.write('</body></html>')
    doc.close()

    iframe.contentWindow.focus()
    iframe.contentWindow.print()

    iframe.contentWindow.onafterprint = () => {
      document.body.removeChild(iframe)
      document.title = originalTitle
    }
  }

  const parameters = [
    { key: 'text', label: 'Text' },
    { key: 'colorVariation', label: 'Color Variation' },
    { key: 'doubling', label: 'Doubling' },
    { key: 'dust', label: 'Dust' },
    { key: 'setOff', label: 'Set Off' },
    { key: 'scumming', label: 'Scumming' },
    { key: 'sideLay', label: 'Side Lay' },
    { key: 'frontLay', label: 'Front Lay' },
    { key: 'registration', label: 'Misregistration' },
    { key: 'dmsFromPlate', label: 'D/M/S from Plate' }
  ]

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
                    onClick={handleClickOpen}
                    sx={{
                      mr: 2,
                      backgroundColor: '#0563BB',
                      color: 'white',
                      '&:hover': { backgroundColor: '#0AA4D2 !important' }
                    }}
                  >
                    Print
                  </Button>
                </Box>
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
      <Dialog
        fullScreen={fullScreen}
        open={openDialogue}
        onClose={handleClickClose}
        fullWidth
        maxWidth='lg'

        // sx={{ '& .MuiDialog-paper': { backgroundColor: '#FDE5D1' } }}
      >
        <div id='receipt' className='receipt' style={{ width: '100%', overflowX: 'auto' }}>
          <DialogTitle>
            <div style={{ marginBottom: '20px' }}>
              <table style={{ width: '100%', border: '1px solid #999', borderCollapse: 'collapse' }}>
                <tr>
                  <td colSpan={4} style={{ border: '1px solid #999', fontWeight: 'bold', textAlign: 'center' }}>
                    QC Report For Printing
                  </td>
                  <td rowSpan={4} style={{ border: '1px solid #999', textAlign: 'center', width: '200px' }}>
                    <img src={`${WEB_URL}/white-logo.png`} alt='UBC Logo' width='60' />
                    <br />

                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>UBC Convertec (Pvt) Ltd.</div>
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #999', fontWeight: '500' }}>
                    Document Code : {userData?.jobId?.productionOrderNo}
                  </td>
                  {/* <td style={{ border: '1px solid #999', fontWight: 'bold' }}></td> */}
                  <td style={{ border: '1px solid #999', fontWeight: '500' }}> UBC/QC/SOR-01</td>
                  <td style={{ border: '1px solid #999', fontWeight: 'bold' }}> Issue Date: {formattedDate}</td>
                </tr>
              </table>
            </div>
            {/* <Box mb={2}>
            <Table size='small' sx={{ border: '1px solid #999', width: '100%' }}>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} align='center' sx={{ fontWeight: 'bold', border: '1px solid #999' }}>
                    QC Report For Printing
                  </TableCell>
                  <TableCell rowSpan={4} align='center' sx={{ border: '1px solid #999', width: 200 }}>
                    <img src='/white-logo.png' alt='UBC Logo' width='60' />
                    <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}></Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: '1px solid #999', fontWeight: 500 }}>
                    Document Code: {userData?.jobId?.productionOrderNo}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #999', fontWeight: 'bold' }}>UBC/QC/SOR-01</TableCell>

                  <TableCell sx={{ border: '1px solid #999', fontWeight: 500 }}>Issue Date: {formattedDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box> */}
          </DialogTitle>

          <DialogContent>
            <div

            // style={{ overflowX: 'auto' }}
            >
              <div style={{ minWidth: `${users.length * 100 + 300}px` }}>
                {/* Top Info Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>Machine:</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>{userData?.machine?.code}</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>Operator Name:</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>{userData?.userId?.userName}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>Shift:</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>{shift}</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>Date:</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>{formattedDate}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>Job Name:</td>
                      <td colSpan={3} style={{ textAlign: 'center', padding: '6px', border: '1px solid #ccc' }}>
                        {userData?.jobData?.prodName}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>PRDN. No:</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>{userData?.jobId?.productionOrderNo}</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>S O No:</td>
                      <td style={{ padding: '6px', border: '1px solid #ccc' }}>{userData?.jobData?.OriginNum}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Bottom Quality Table */}
                <table
                  style={{ width: '100%', border: '1px solid #ccc', borderCollapse: 'collapse', marginBottom: '24px' }}
                >
                  <thead style={{ backgroundColor: 'skyblue' }}>
                    <tr>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        Sr. No
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        Time
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        Text
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        Color Variation
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        Doubling
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        Dust
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        Set Off
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        Scumming
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        Side Lay
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        Front Lay
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        registration
                      </th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold', width: '5%' }}>
                        D/M/S from Plate
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user, index) => {
                      if (user.makeTimeStatus) {
                        return (
                          <tr key={user._id}>
                            <td style={{ padding: '6px', border: '1px solid #ccc' }}>{index + 1}</td>
                            <td style={{ padding: '6px', border: '1px solid #ccc' }}>
                              {new Date(user.time).toLocaleTimeString()}
                            </td>
                            <td
                              colSpan={11}
                              style={{
                                padding: '6px',
                                border: '1px solid #ccc',
                                fontWeight: 'bold',

                                // backgroundColor: '#e6f7ff',
                                textAlign: 'center'
                              }}
                            >
                              {user.makeTimeStatus}
                            </td>
                          </tr>
                        )
                      }

                      return (
                        <tr key={user._id}>
                          <td style={{ padding: '6px', border: '1px solid #ccc', width: '5%' }}>{index + 1}</td>
                          <td style={{ padding: '6px', border: '1px solid #ccc', width: '5%' }}>
                            {new Date(user.time).toLocaleTimeString()}
                          </td>
                          {[
                            'text',
                            'colorVariation',
                            'doubling',
                            'dust',
                            'setOff',
                            'scumming',
                            'sideLay',
                            'frontLay',
                            'registration',
                            'dmsFromPlate'
                          ].map(key => {
                            const answer = user?.formId?.[key]?.answer

                            return (
                              <td
                                key={user._id + key}
                                style={{ padding: '6px', border: '1px solid #ccc', textAlign: 'center', width: '5%' }}
                              >
                                {answer === 'Okay' ? (
                                  <span style={{ color: 'green' }}>✓</span>
                                ) : answer === 'Not Okay' ? (
                                  <span style={{ color: 'red' }}>✗</span>
                                ) : (
                                  ''
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {/* Remarks Box */}
                <div style={{ border: '2px solid #ccc', padding: '10px', marginTop: '20px' }}>
                  <h3>Remarks</h3>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {users.map((user, index) => {
                      const fields = [
                        'text',
                        'colorVariation',
                        'doubling',
                        'dust',
                        'setOff',
                        'scumming',
                        'sideLay',
                        'frontLay',
                        'registration',
                        'dmsFromPlate'
                      ]

                      return fields.map(field => {
                        const answer = user?.formId?.[field]?.answer
                        const reason = user?.formId?.[field]?.reason

                        if (answer === 'Not Okay') {
                          return (
                            <li key={`${user._id}-${field}`}>
                              <strong>Sr No {index + 1}:</strong> {field} - <em>{reason || 'No reason provided'}</em>
                            </li>
                          )
                        }
                        return null
                      })
                    })}
                  </ul>
                </div>

                {/* <table
                  style={{ width: '100%', border: '1px solid #ccc', borderCollapse: 'collapse', marginBottom: '24px' }}
                >
                  <thead style={{ backgroundColor: 'skyblue' }}>
                    <tr>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold' }}>Sr. No</th>
                      <th style={{ padding: '6px', border: '1px solid #ccc', fontWeight: 'bold' }}>
                        Quality Parameter
                      </th>
                      {users.map(user => (
                        <th
                          key={user._id}
                          style={{
                            padding: '6px',
                            border: '1px solid #ccc',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
                          }}
                        >
                          Time
                          <br />
                          {new Date(user.time).toLocaleTimeString()}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {parameters.map((param, index) => (
                      <tr key={param.key}>
                        <td style={{ padding: '6px', border: '1px solid #ccc' }}>{index + 1}</td>
                        <td
                          // rowSpan={12}
                          style={{ padding: '6px', border: '1px solid #ccc' }}
                        >
                          {param.label}
                        </td>
                        {users.map(user => {
                          if (user.makeTimeStatus) {
                            return index === 0 ? (
                              <td
                                key={user._id + '_make'}
                                rowSpan={parameters.length}
                                style={{
                                  padding: '6px',
                                  border: '1px solid #ccc',
                                  textAlign: 'center',
                                  backgroundColor: '#e6f7ff',
                                  fontWeight: 'bold'
                                }}
                              >
                                {user.makeTimeStatus}
                              </td>
                            ) : null
                          } else {
                            const answer = user?.formId?.[param.key]?.answer
                            return (
                              <td
                                key={user._id + param.key}
                                style={{ padding: '6px', border: '1px solid #ccc', textAlign: 'center' }}
                              >
                                {answer === 'Okay' ? (
                                  <span style={{ color: 'green' }}>✓</span>
                                ) : answer === 'Not Okay' ? (
                                  <span style={{ color: 'red' }}>✗</span>
                                ) : (
                                  ''
                                )}
                              </td>
                            )
                          }
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table> */}
              </div>
            </div>

            {/* <Box sx={{ overflowX: 'auto' }}>
            <Box sx={{ minWidth: `${users.length * 100 + 300}px` }}>
              <Table size='small' border='1' sx={{ mb: 2 }}>
                <TableBody>
                  <TableRow>
                    <TableCell>Machine:</TableCell>
                    <TableCell>{userData?.machine?.code}</TableCell>
                    <TableCell>Operator Name:</TableCell>
                    <TableCell>{userData?.userId?.userName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Shift:</TableCell>
                    <TableCell>{shift}</TableCell>
                    <TableCell>Date:</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Job Name:</TableCell>
                    <TableCell colSpan={3} align='center'>
                      {userData?.jobData?.prodName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PRDN. No:</TableCell>
                    <TableCell>{userData?.jobId?.productionOrderNo}</TableCell>
                    <TableCell>S O No:</TableCell>
                    <TableCell>{userData?.jobData?.OriginNum}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table size='small' sx={{ border: '1px solid #ccc', mb: 4 }}>
                <TableHead sx={{ bgcolor: 'skyblue' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Sr. No</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Quality Parameter</TableCell>
                    {users.map(user => (
                      <TableCell
                        key={user._id}
                        sx={{
                          fontWeight: 'bold',
                          whiteSpace: 'nowrap',
                          textAlign: 'center'
                        }}
                      >
                        Time
                        <br />
                        {new Date(user.time).toLocaleTimeString()}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {parameters.map((param, index) => (
                    <TableRow key={param.key}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{param.label}</TableCell>
                      {users.map(user => {
                        if (user.makeTimeStatus) {
                          return index === 0 ? (
                            <TableCell
                              key={user._id + '_make'}
                              rowSpan={parameters.length}
                              align='center'
                              sx={{ fontWeight: 'bold', backgroundColor: '#e6f7ff' }}
                            >
                              {user.makeTimeStatus}
                            </TableCell>
                          ) : null
                        } else {
                          const answer = user?.formId?.[param.key]?.answer
                          return (
                            <TableCell key={user._id + param.key} align='center'>
                              {answer === 'Okay' ? (
                                <DoneIcon sx={{ color: 'green' }} />
                              ) : answer === 'Not Okay' ? (
                                <ClearIcon sx={{ color: 'red' }} />
                              ) : (
                                ''
                              )}
                            </TableCell>
                          )
                        }
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box> */}
          </DialogContent>
        </div>
        <DialogActions>
          <Button variant='contained' onClick={handleClickClose}>
            Close
          </Button>
          <Button variant='contained' onClick={printReceipt}>
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Printing
