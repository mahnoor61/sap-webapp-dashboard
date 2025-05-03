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
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const AllOperatorData = () => {
  const [allowedOrders, setAllowedOrders] = useState([])
  const [prodctionLists, setProdctionLists] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loadingComplete, setLoadingComplete] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const auth = useSelector(state => state.auth)
  const token = auth.token

  // for operator to show its assign data

  const getAllowedProductionOrders = async () => {
    const userName = auth?.user?.userName
    try {
      const res = await axios.get(`${BASE_URL}/api/ap/operator/production/orders/${userName}`, {
        headers: {
          'x-access-token': token
        }
      })
      setAllowedOrders(res.data.data) // yeh array hona chahiye jaise ['1001', '1002']
    } catch (err) {
      console.error('Error fetching allowed orders of operator', err)
      toast.error('Failed to fetch allowed production orders')
    }
  }

  const getAllProductionList = async () => {
    const localData = localStorage.getItem('productionLists')
    if (localData) {
      const parsedData = JSON.parse(localData)
      setProdctionLists(parsedData)
      setLoadingComplete(false)
    }

    // Fetch fresh data in background and update localStorage
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/admin/odbc/operator/data`, {
        headers: {
          'x-access-token': token
        }
      })

      const latestData = response.data.data
      setProdctionLists(latestData)
      setLoadingComplete(false)

      // Save latest to localStorage
      localStorage.setItem('productionLists', JSON.stringify(latestData))
    } catch (error) {
      console.log('error in get all production list', error)
      toast.error('Failed to fetch latest production data', error)
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
    getAllProductionList()
    if (auth?.user?.role === 'operator') {
      getAllowedProductionOrders()
    }
  }, [])

  // const filteredProductionList = FilterHelper(prodctionLists, searchQuery, ['user.userName', 'machine.code'])

  // console.log('prodctionLists', prodctionLists)

  const roleBasedProductionList =
    auth?.user?.role === 'operator'
      ? FilterHelper(allowedOrders, searchQuery, ['productionOrderNo', 'status'])
      : FilterHelper(prodctionLists, searchQuery, ['productionOrderNo', 'status', 'machine.code', 'route.code'])
  const paginatedProductionList = PaginationHelper(roleBasedProductionList, page, rowsPerPage)
  const totalCount = roleBasedProductionList.length

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ width: '100%' }}>
              <TableCell align='center' colSpan={12}>
                <TextField
                  variant='filled'
                  placeholder='Search through production order no OR status, machine or route'
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
              <TableCell>#</TableCell>
              <TableCell>Production Orders</TableCell>
              {/*<TableCell>Route No</TableCell>*/}
              <TableCell>Product Code</TableCell>
              <TableCell>Product Description</TableCell>
              {auth?.user?.role === 'admin' && <TableCell>Route</TableCell>}
              {auth?.user?.role === 'admin' && <TableCell>Machine</TableCell>}
              <TableCell>Sheet Code</TableCell>
              <TableCell>Sheet Name</TableCell>
              <TableCell>Quantity of Sheets</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Status</TableCell>
              {/*<TableCell sx={{textAlign: 'left'}}>Action</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingComplete ? (
              <TableRow align='center'>
                <TableCell colSpan={4} align='center'>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedProductionList && paginatedProductionList.length > 0 ? (
              paginatedProductionList.map((data, index) => (
                <NextLink href={`/operator/productionDetailed?order=${data._id}`}>
                  <TableRow
                    key={data._id}
                    sx={{
                      // transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'skyblue'

                      }
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {page * rowsPerPage + index + 1} {/* Actual Serial Number */}
                    </TableCell>

                    <TableCell component='th' scope='row'>
                      {data?.productionOrderNo}
                    </TableCell>
                    {/*<TableCell component="th" scope="row">*/}
                    {/*  {data.routeNo ? data.routeNo : ''}*/}
                    {/*</TableCell>*/}
                    <TableCell component='th' scope='row'>
                      {data?.productionOrderDataId?.itemCode}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {data?.productionOrderDataId?.prodName}
                    </TableCell>
                    {auth?.user?.role === 'admin' && <TableCell>{data?.route?.code || '-'}</TableCell>}
                    {auth?.user?.role === 'admin' && <TableCell>{data?.machine?.code || '-'}</TableCell>}
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
                </NextLink>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align='center'>
                  No Production List Found
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
    </>
  )
}

export default AllOperatorData
