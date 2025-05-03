import React, { useEffect, useState, useContext } from 'react'
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
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useFormik } from 'formik'
import * as yup from 'yup'
import CloseIcon from '@mui/icons-material/Close'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const AddQuality = () => {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedMachine, setSelectedMachine] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { machine } = useContext(mahineContext)
  const auth = useSelector(state => state.auth)
  const token = auth.token

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }))

  const [open, setOpen] = React.useState(false)

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
      console.log('response', response)
      setJobs(response.data.data)
      setLoadingComplete(false)
    } catch (error) {
      console.log('error in get all jobs of selected machine in qc', error)
      toast.error(error)
      setLoadingComplete(false)
    }
  }

  
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
      quantity: ''
    },
    validationSchema: yup.object({
      // quantity: yup.string().required('Quantity is required')
    }),
    onSubmit: async values => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/ap/admin/create/role`,
          {
            role: values.role.toLowerCase()
          },
          {
            headers: {
              'x-access-token': token
            }
          }
        )
        toast.success('Quantity added successfully.')
        formik.resetForm()
      } catch (error) {
        console.log('error in add quantity in qc dialogue', error)
        formik.resetForm()
        toast.error(error.response.data.msg)
      }
    }
  })

  return (
    <>
      <Stack spacing={1} sx={{ width: '100%' }}>
        <Chip sx={{ textAlign: 'center', mb: 2, width: '100%', mt: 5 }} label='Printing' />
      </Stack>

      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ width: '100%' }}>
              <TableCell align='center' colSpan={8}>
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

                  <Autocomplete
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
                    // transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'skyblue'

                      // transform: 'scale(1.02)',
                      // overFlow: 'hidden'
                    }
                  }}
                  onClick={() => {
                    setSelectedJob(data)
                    handleClickOpen()
                  }}
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align='center'>
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
      <form onSubmit={formik.handleSubmit}>
        <React.Fragment>
          <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
            <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} id='customized-dialog-title'>
              Add Quantity
            </DialogTitle>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={theme => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500]
              })}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <TextField
                fullWidth
                sx={{ mb: 5, mt: 5 }}
                label='Add Quantity'
                name='quantity'
                type='text'
                error={Boolean(formik.touched.quantity && formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Add Quantity
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </React.Fragment>
      </form>
    </>
  )
}

export default AddQuality
