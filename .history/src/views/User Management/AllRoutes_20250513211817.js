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

const AllRoutes = () => {
  const [users, setUsers] = useState([])
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
      destroyUser(itemToDelete)
      setItemToDelete(null)
      setDialogOpen(false)
    }
  }

  let response

  const destroyUser = async id => {
    try {
      response = await axios.delete(`${BASE_URL}/api/ap/admin/destroy/${id}`, {
        headers: {
          'x-access-token': token
        }
      })
      toast.success('User deleted successfully')
      const updatedUsers = users.filter(row => row._id !== id)
      setUsers(updatedUsers)
    } catch (error) {
      console.log('error in delete user')
      toast.error(error.response.data.msg)
    }
  }

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/admin/all/users`, {
        headers: {
          'x-access-token': token
        }
      })
      setUsers(response.data.data)
      setLoadingComplete(false)
    } catch (error) {
      console.log('error in get all users')
      toast.error(error.response.data.msg)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

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

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='simple table' sx={{ width: '100%' }}>
          <TableHead sx={{ width: '100%' }}>
            <TableRow sx={{ width: '100%' }}>
              <TableCell sx={{ width: '100%' }} colSpan={5}>
                <TextField
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
                />
              </TableCell>
            </TableRow>
            <TableRow sx={{ justifyContent: 'space-between', alignItems: 'left', width: '100%' }}>
              <TableCell>UserName</TableCell>
              {/*<TableCell>Name</TableCell>*/}
              {/* <TableCell>Email</TableCell> */}
              {/*<TableCell>Password</TableCell>*/}
              {/* <TableCell>Role</TableCell>
              <TableCell>Machine</TableCell>
              <TableCell>Action</TableCell> */}
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
                    {data.code}
                  </TableCell>
                  {/*<TableCell component="th" scope="row">*/}
                  {/*  {data.password}*/}
                  {/*</TableCell>*/}
                  {/*<TableCell component="th" scope="row">*/}
                  {/*  {data.name}*/}
                  {/*</TableCell>*/}
                  {/* <TableCell component='th' scope='row'>
                    {data.email}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data.role?.name ? data.role.name : 'No Role'}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {data.machine?.code ? data.machine.code : 'No Machine'}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <IconButton>
                      <DeleteIcon
                        disabled={destroyUser.isSubmitting}
                        onClick={() => {
                          setItemToDelete(data._id)
                          setDialogOpen(true)
                        }}
                      />
                    </IconButton>
                    <NextLink
                      href={{
                        pathname: '/user-management/user-edit',
                        query: { userId: data._id }
                      }}
                      passHref
                    >
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </NextLink>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align='center'>
                  No Routes Found
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

      {/* <ConfirmationDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title='Confirm Delete'
        message='Are you sure you want to delete this User?'
      /> */}
    </>
  )
}

export default AllRoutes
