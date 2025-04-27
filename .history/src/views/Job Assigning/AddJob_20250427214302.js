import React, { useState, useContext } from 'react'
import {
  CardContent,
  Card,
  TextField,
  Button,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Chip,
  Stack,
  Typography
} from '@mui/material/'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { RouteContext } from '../../@core/context/getAllRoutes'
import { mahineContext } from '../../@core/context/getAllMachines'
import { UserContext } from '../../@core/context/user'
import { ProductionNoContext } from '../../@core/context/getProductionOrderNo'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const AddJob = () => {
  const { machine } = useContext(mahineContext)
  const { user } = useContext(UserContext)
  const { route } = useContext(RouteContext)
  const { prodcutionOrder } = useContext(ProductionNoContext)

  const auth = useSelector(state => state.auth)
  const token = auth.token

  const [openDialog, setOpenDialog] = useState(false)
  const [addedRows, setAddedRows] = useState([])
  const [newRow, setNewRow] = useState({ user: null, machine: null, route: null })

  // Handle adding a new row assignment
  const handleAddRow = () => {
    if (newRow.user && newRow.machine && newRow.route) {
      // Build new assignment object with just the IDs
      const assignment = {
        machine: newRow.machine._id,
        route: newRow.route._id,
        user: newRow.user._id
      }

      // Update the formik assignments field
      formik.setFieldValue('assignments', [...formik.values.assignments, assignment])

      // For UI display, store full objects (optional for showing codes/userNames)
      setAddedRows(prev => [...prev, { ...newRow }])

      // Reset newRow and close dialog
      setNewRow({ user: null, machine: null, route: null })
      setOpenDialog(false)
    } else {
      alert('Please select all fields!')
    }
  }

  const formik = useFormik({
    initialValues: {
      productionOrderNo: '',
      ComponentItemCode: '',
      assignments: []
    },
    validationSchema: yup.object({
      productionOrderNo: yup.string().required('Order No is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(`${BASE_URL}/api/ap/admin/assign/job`, values, {
          headers: { 'x-access-token': token }
        })

        toast.success('Job created successfully.')
        formik.resetForm()
        setAddedRows([])
      } catch (error) {
        toast.error(error.response?.data?.msg || 'Error creating job')
      }
    }
  })

  console.log('prodcutionOrder', prodcutionOrder)

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 5 }}>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1} sx={{ px: 5 }}>
            <Stack spacing={1} sx={{ width: '100%' }}>
              <Chip sx={{ textAlign: 'center', mb: 5, width: '100%' }} label='Add Job' />
            </Stack>

            {/* <Autocomplete
              fullWidth
              sx={{ mb: 2 }}
              options={prodcutionOrder}
              getOptionLabel={option => option.docNum || ''} // Prevent error if option is undefined
              isOptionEqualToValue={(option, value) => option.docNum === value.docNum}
              value={prodcutionOrder.find(po => po.docNum === formik.values.productionOrderNo) || null}
              onChange={(event, value) => formik.setFieldValue('productionOrderNo', value ? value.docNum : '')}
              filterSelectedOptions // Optional: hides selected value from dropdown
              renderInput={params => <TextField {...params} label='Production Order No' />}
            /> */}

            {/* Display Added Assignments */}
            {addedRows.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant='h6' sx={{ mb: 5 }}>
                  Added Assignments
                </Typography>
                {addedRows.map((row, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                    <TextField fullWidth value={row.user.userName} disabled />
                    <TextField fullWidth value={row.machine.code} disabled />
                    <TextField fullWidth value={row.route.code} disabled />
                  </Box>
                ))}
              </Box>
            )}

            {/* Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, width: '100%' }}>
              <Button variant='contained' type='submit' disabled={formik.isSubmitting}>
                Create
              </Button>
              <Button onClick={() => setOpenDialog(true)} variant='contained' color='primary'>
                Add Row
              </Button>
            </Box>
          </Grid>
        </form>
      </CardContent>

      {/* Dialog for Adding New Assignment Row */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} sx={{ width: '100%' }}>
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent sx={{ width: '100%' }}>
          <Autocomplete
            sx={{ mb: 3 }}
            fullWidth
            options={user}
            getOptionLabel={option => option.userName}
            value={newRow.user}
            onChange={(event, value) => setNewRow({ ...newRow, user: value })}
            renderInput={params => <TextField {...params} label='User' />}
          />
          <Autocomplete
            sx={{ mb: 3 }}
            fullWidth
            options={machine}
            getOptionLabel={option => option.code}
            value={newRow.machine}
            onChange={(event, value) => setNewRow({ ...newRow, machine: value })}
            renderInput={params => <TextField {...params} label='Machine' />}
          />
          <Autocomplete
            fullWidth
            options={route}
            getOptionLabel={option => option.code}
            value={newRow.route}
            onChange={(event, value) => setNewRow({ ...newRow, route: value })}
            renderInput={params => <TextField {...params} label='Route' />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddRow} variant='contained' color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default AddJob
