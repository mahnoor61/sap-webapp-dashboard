import React, { useEffect, useState } from 'react'
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
  CircularProgress
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FilterHelper, PaginationHelper } from '/src/helpers/filter'
import VisibilityIcon from '@mui/icons-material/Visibility'
import NextLink from 'next/link'
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import ConfirmationDialog from '../ConfirmationDialog'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const AddQuality = () => {
  const [jobs, setJobs] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loadingComplete, setLoadingComplete] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const auth = useSelector(state => state.auth)
  const token = auth.token

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      destroyJob(itemToDelete)
      setItemToDelete(null)
      setDialogOpen(false)
    }
  }

  let response

  const destroyJob = async id => {
    try {
      response = await axios.delete(`${BASE_URL}/api/ap/admin/destroy/job/${id}`, {
        headers: {
          'x-access-token': token
        }
      })
      toast.success('Job deleted successfully')
      const updated = jobs.filter(row => row._id !== id)
      setJobs(updated)
    } catch (error) {
      console.log('error in delete job', error)
      toast.error(error.response.data.msg)
    }
  }
  console.log('jobs', jobs)
  const getAllJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/admin/get/jobs`, {
        headers: {
          'x-access-token': token
        }
      })
      setJobs(response.data.data)
      setLoadingComplete(false)
    } catch (error) {
      console.log('error in get all jobs', error)
      toast.error(error)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    getAllJobs()
  }, [])

  // const filteredJob = FilterHelper(jobs, searchQuery, ['user.userName', 'machine.code'])
  const filteredJob = FilterHelper(jobs, searchQuery, ['productionOrderNo'])

  const paginatedJob = PaginationHelper(filteredJob, page, rowsPerPage)
  const totalCount = filteredJob.length

  console.log('paginatedJob', paginatedJob)

  return (
    <>
      <Stack spacing={1} sx={{ width: '100%' }}>
        <Chip sx={{ textAlign: 'center', mb: 2, width: '100%', mt: 5 }} label='Printing' />
      </Stack>

      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ width: '100%', mt: 5 }}>
              <TableCell align='center' colSpan={5}>
                <TextField
                  variant='filled'
                  placeholder='Search through production order'
                  sx={{
                    '&::placeholder': {
                      color: 'rgba(71, 85, 105, 1)'
                    },
                    height: '55px',
                    width: '100%',
                    flex: '1 0 0',
                    gap: '10px',
                    alignSelf: 'stretch',
                    flexGrow: '3',
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
                />
              </TableCell>
            </TableRow>
            <TableRow sx={{ justifyContent: 'space-between', alignItems: 'left' }}>
              <TableCell>Production Orders</TableCell>
              <TableCell>Sheet Code</TableCell>
              <TableCell>Machine</TableCell>
              <TableCell>Route</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell sx={{ textAlign: 'left' }}>Action</TableCell>
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
                <TableRow key={data._id}>
                  <TableCell component='th' scope='row'>
                    {data.productionOrderNo}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data.ComponentItemCode}
                  </TableCell>
                  {/*<TableCell component="th" scope="row">*/}
                  <TableCell component='th' scope='row'>
                    {data.machine.code}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data.route.code}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data.user.userName}
                  </TableCell>
                  <TableCell component='th' scope='row' sx={{ textAlign: 'left' }}>
                    <IconButton>
                      <DeleteIcon
                        disabled={destroyJob.isSubmitting}
                        onClick={() => {
                          setItemToDelete(data._id)
                          setDialogOpen(true)
                        }}
                      />
                    </IconButton>
                    <NextLink
                      href={{
                        pathname: '/job-assigning/job-edit',
                        query: { jobId: data._id }
                      }}
                      passHref
                    >
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </NextLink>
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

      <ConfirmationDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title='Confirm Delete'
        message='Are you sure you want to delete this job?'
      />
    </>
  )
}

export default AddQuality
