import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  TextField,
  Stack,
  Chip,
  CircularProgress,
  Autocomplete,
  Typography,
  Box
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FilterHelper, PaginationHelper } from '/src/helpers/filter'
import { mahineContext } from '../../@core/context/getAllMachines'
import NextLink from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useFormik } from 'formik'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import * as yup from 'yup'
import CloseIcon from '@mui/icons-material/Close'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const Printing = () => {
  const [jobs, setJobs] = useState([])
  const [printingMachine, setPrintingMachine] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedMachine, setSelectedMachine] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { machine } = useContext(mahineContext)
  const auth = useSelector(state => state.auth)
  const router = useRouter()
  const token = auth.token
  const userId = auth.user._id

  const [open, setOpen] = React.useState(false)

  // function for quantity dialogue
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getAllJobsOfSelectedMachine = async machineId => {
    setLoadingComplete(true)
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/qc/get/machine-data/${machineId}`, {
        headers: {
          'x-access-token': token
        }
      })

      setJobs(response.data.data)
      setLoadingComplete(false)
    } catch (error) {
      console.log('error in get all jobs of selected machine in qc', error)
      toast.error(error)
      setLoadingComplete(false)
    }
  }

  useEffect(() => {
    if (selectedJob) {
      handleClickOpen()
    }
  }, [selectedJob])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredJob = FilterHelper(jobs, searchQuery, ['productionOrderNo'])

  const paginatedJob = PaginationHelper(filteredJob, page, rowsPerPage)
  const totalCount = filteredJob.length

  const formik = useFormik({
    initialValues: {
      quantity: '',
      quantityTime: '',

      // userId: '',
      jobId: ''
    },
    validationSchema: yup.object({
      // quantity: yup.string().required('Quantity is required')
    }),
    onSubmit: async values => {
      try {
        const currentTime = new Date().toISOString()
        const response = await axios.post(
          `${BASE_URL}/api/ap/qc/add-quantity`,
          {
            quantity: values.quantity,
            quantityTime: currentTime,

            // userId: userId,
            jobId: formik.values.jobId
          },
          {
            headers: {
              'x-access-token': token
            }
          }
        )
        toast.success('Quantity save successfully.')
        router.push(`/quality-control/printing?id=${response.data.data._id}`)
        handleClose()
        formik.resetForm()
      } catch (error) {
        console.log('error in add quantity in qc dialogue', error)
        formik.resetForm()
        toast.error(error.response.data.msg)
      }
    }
  })


  const handleMakeTimeClick = async () => {
    try {
      // const currentTime = new Date().toLocaleString('en-PK', {
      //   timeZone: 'Asia/Karachi',
      //   hour12: true
      // })

      const currentTime = new Date().toISOString()

      const response = await axios.post(
        `${BASE_URL}/api/ap/qc/add-quantity`,
        {
          makeTime: currentTime,

          // userId,
          jobId: formik.values.jobId
        },
        {
          headers: {
            'x-access-token': token
          }
        }
      )
      toast.success('Make time saved successfully.')
      router.push(`/quality-control/printing?id=${response.data.data._id}`)
      handleClose()
    } catch (error) {
      console.log('Error in saving time', error)
      toast.error(error?.response?.data?.msg || 'Failed to save time')
    }
  }

  const getAllPrintingMachines = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/qc/get/printing-machine`, {
        headers: {
          'x-access-token': token
        }
      })

      setPrintingMachine(response.data.data)
    } catch (error) {
      console.log('error in get all printing machines', error)
      toast.error(error)
    }
  }

  useEffect(() => {
    getAllPrintingMachines()
  }, [])

  return (
    <>
      <Stack spacing={1} sx={{ width: '100%' }}>
        <Chip sx={{ textAlign: 'center', mb: 2, width: '100%', mt: 5 }} label='Printing' />
      </Stack>

      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ width: '100%' }}>
              <TableCell align='center' colSpan={9}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on medium+
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: { md: 2, xs: 5 },
                    width: '100%'
                  }}
                >
                  <Autocomplete
                    sx={{ width: { xs: '100%', md: '30%' } }}
                    fullWidth
                    options={printingMachine}
                    getOptionLabel={option => option?.code || ''} // null safety
                    value={selectedMachine}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    onChange={(event, value) => {
                      setSelectedMachine(value)
                      if (value?._id) {
                        getAllJobsOfSelectedMachine(value._id)
                      }
                    }}
                    renderInput={params => <TextField {...params} label='Machine' />}
                  />

                  {/* <Autocomplete
                    sx={{ width: { xs: '100%', md: '30%' } }}
                    fullWidth
                    options={machine}
                    getOptionLabel={option => option.code}
                    value={selectedMachine}
                    onChange={(event, value) => {
                      setSelectedMachine(value)
                      if (value?._id) {
                        getAllJobsOfSelectedMachine(value._id)
                      }
                    }}
                    renderInput={params => <TextField {...params} label='Machine' />}
                  /> */}
                  <TextField
                    variant='filled'
                    placeholder='Search through production order'
                    sx={{
                      '&::placeholder': {
                        color: 'rgba(71, 85, 105, 1)'
                      },
                      height: '55px',
                      width: { xs: '100%', md: '68%' }, // Full width on mobile, half on desktop
                      borderRadius: 1
                    }}
                    onChange={event => setSearchQuery(event.target.value)}
                    InputProps={{
                      endAdornment: (
                        <Button variant='text' disabled={true} sx={{ background: 'transparent !important' }}>
                          <SearchIcon sx={{ ml: 1.5, color: 'rgba(71, 85, 105, 1)' }} />
                        </Button>
                      )
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>

            <TableRow sx={{ justifyContent: 'space-between', alignItems: 'left' }}>
              <TableCell>Production Orders</TableCell>
              <TableCell>Product Code</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Sheet Code</TableCell>
              <TableCell>Sheet Name</TableCell>
              <TableCell>Quantity of Sheets</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingComplete ? (
              <TableRow align='center'>
                <TableCell colSpan={4} align='center'>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedJob && paginatedJob.length > 0 ? (
              paginatedJob.map(data => (
                <TableRow
                  key={data._id}
                  sx={{
                    cursor: 'pointer',

                    // transition: 'transform 0.2s ease-in-out',

                    '&:hover': {
                      backgroundColor: 'skyblue'

                      // transform: 'scale(1.02)',
                      // overFlow: 'hidden'
                    }
                  }}
                  onClick={() => {
                    setSelectedJob(data)
                    formik.setFieldValue('jobId', data._id)
                  }}

                  // onClick={handleClickOpen}
                >
                  <TableCell component='th' scope='row'>
                    {data.productionOrderNo}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data.ComponentItemCode}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data?.productionOrderDataId?.itemCode}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data?.productionOrderDataId?.ComponentItemCode}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data?.productionOrderDataId?.ComponentItemName}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data?.productionOrderDataId?.ComponentPlannedQty}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data?.productionOrderDataId?.cardName}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Stack direction='row' spacing={1}>
                      <Chip
                        label={data?.status}
                        sx={{
                          backgroundColor:
                            data?.status === 'pending'
                              ? 'grey'
                              : data?.status === 'running'
                              ? 'green'
                              : data?.status === 'pause'
                              ? 'orange'
                              : data?.status === 'downtime'
                              ? 'red'
                              : data?.status === 'make-time'
                              ? 'blue'
                              : data?.status === 'completed'
                              ? 'blue'
                              : 'default',
                          color: '#fff',
                          fontWeight: 'bold'
                        }}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <NextLink
                      href={{
                        pathname: '/quality-control/printing',

                        query: { jobId: data._id }
                      }}
                      passHref
                    >
                      <IconButton>
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align='center'>
                  No Job Found
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
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle id='alert-dialog-title'>{'Add Quantity'}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                <TextField
                  required
                  fullWidth
                  id='outlined-basic'
                  label='Add Quantity'
                  variant='filled'
                  sx={{ my: 4, width: '100%' }}
                  placeholder='Add '
                  name='quantity'
                  type='number'
                  error={Boolean(formik.touched.quantity && formik.errors.quantity)}
                  helperText={formik.touched.quantity && formik.errors.quantity}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.quantity}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <NextLink href='/Quality Control/printing'> */}
              <Button onClick={handleMakeTimeClick}>Make Ready Time</Button>
              {/* </NextLink> */}
              {/* <NextLink href='/Quality Control/printing'> */}
              <Button type='submit' autoFocus>
                Add Quantity
              </Button>
              {/* </NextLink> */}
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    </>
  )
}

export default Printing
