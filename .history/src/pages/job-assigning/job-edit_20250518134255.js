import React, { useContext, useEffect, useState } from 'react'
import { Grid, Card, CardContent, Typography, Button, Box, TextField, Autocomplete } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CardActions from '@mui/material/CardActions'
import DeleteIcon from '@mui/icons-material/Delete'
import { UpdateState } from '../../helpers/filter'
import { Editor } from '@tinymce/tinymce-react'
import { AuthGuard } from '../../guard/authGuard'
import UserLayout from '../../layouts/UserLayout'
import { useSelector } from 'react-redux'
import { mahineContext } from '../../@core/context/getAllMachines'
import { UserContext } from '../../@core/context/user'
import { RouteContext } from '../../@core/context/getAllRoutes'
import { ProductionNoContext } from '../../@core/context/getProductionOrderNo'
import * as yup from 'yup'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const JobEdit = () => {
  const { machine } = useContext(mahineContext)
  const { user } = useContext(UserContext)
  const { route } = useContext(RouteContext)
  const { prodcutionOrder } = useContext(ProductionNoContext)
  const router = useRouter()
  const [jobData, setJobData] = useState(null)
  const [jobId, setJobId] = useState('')
  const auth = useSelector(state => state.auth)
  const token = auth.token

  useEffect(() => {
    const { jobId } = router.query
    if (jobId) {
      setJobId(jobId)

      const getJob = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/ap/admin/odbc/production/order/${jobId}`, {
            headers: { 'x-access-token': token }
          })
          const job = response.data.data

          setJobData(job)
          formik.setValues({
            productionOrderNo: job.productionOrderNo,
            machine: job.machine._id,
            route: job.route._id,
            user: job.user._id
          })
        } catch (error) {
          toast.error(error.response.data.msg)
        }
      }
      getJob()
    }
  }, [router.query])

  console.log('jobData', jobData)

  const formik = useFormik({
    initialValues: {
      productionOrderNo: '',
      ComponentItemCode: '',
      user: '',
      machine: '',
      route: ''
    },
    validationSchema: Yup.object({
      productionOrderNo: yup.string().required('Production order no  is required'),
      user: yup.string().required('User is required'),
      machine: yup.string().required('Machine is required'),
      route: yup.string().required('Route is required')
    }),
    onSubmit: async values => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/ap/admin/update/job/${jobId}`,
          {
            productionOrderNo: values.productionOrderNo,
            ComponentItemCode: values.ComponentItemCode,
            user: values.user,
            machine: values.machine,
            route: values.route
          },
          {
            headers: { 'x-access-token': token }
          }
        )
        toast.success('Job updated successfully.')
        formik.resetForm()
      } catch (error) {
        toast.error(error.response.data.msg)
        formik.resetForm()
      }
    }
  })

  console.log('formik.values.productionOrderNo'), formik.values.productionOrderNo

  return (
    <>
      {jobData && (
        <Card sx={{ pb: 5 }}>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1} sx={{ px: 5 }}>
                <Typography variant='h5' component='div' sx={{ my: 4 }}>
                  Edit Job
                </Typography>

                {/* Production Order */}
                {/* <Autocomplete
                  sx={{mb: 3}}
                  required
                  fullWidth
                  options={prodcutionOrder} // Fetch from prodcutionOrder context
                  getOptionLabel={(option) => option.docNum} // Assuming each option has a DocNum property
                  value={prodcutionOrder.find((order) => order.docNum === formik.values.productionOrderNo) || null}
                  onChange={(event, value) => formik.setFieldValue('productionOrderNo', value ? value.docNum : '')}
                  renderInput={(params) => <TextField {...params} label="Production Order No"/>}
                /> */}

                <Autocomplete
                  fullWidth
                  sx={{ mb: 2 }}
                  options={prodcutionOrder}
                  getOptionLabel={option => (option.docNum ? option.docNum.toString() : '')} // thoda safe banaya
                  isOptionEqualToValue={(option, value) => option.docNum === value.docNum}
                  value={formik.values.productionOrderNo}
                  // value={prodcutionOrder.find(po => po.docNum == formik.values.productionOrderNo) || null}

                  onChange={(event, value) => {
                    if (value) {
                      formik.setFieldValue('productionOrderNo', value.docNum)
                      formik.setFieldValue('ComponentItemCode', value.ComponentItemCode) // yeh naya add kiya
                    } else {
                      formik.setFieldValue('productionOrderNo', '')
                      formik.setFieldValue('ComponentItemCode', '')
                    }
                  }}
                  filterSelectedOptions
                  renderInput={params => <TextField {...params} label='Production Order No' />}
                />

                <Grid container spacing={2}>
                  {jobData && (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', md: 'row' },
                          gap: 2,
                          alignItems: 'center'
                        }}
                      >
                        {/* User */}
                        <Autocomplete
                          fullWidth
                          sx={{ mt: 3, mb: 3 }}
                          options={machine}
                          getOptionLabel={option => option.code} // Display name in dropdown
                          value={machine.find(m => m._id === formik.values.machine) || null} // Find selected role by ID
                          onChange={(event, value) => formik.setFieldValue('machine', value ? value._id : '')} // Set ID in formik
                          renderInput={params => (
                            <TextField
                              {...params}
                              label='Machine'
                              error={Boolean(formik.touched.machine && formik.errors.machine)}
                              helperText={formik.touched.machine && formik.errors.machine}
                            />
                          )}
                        />
                        <Autocomplete
                          fullWidth
                          sx={{ mt: 3, mb: 3 }}
                          options={user}
                          getOptionLabel={option => option.userName} // Display name in dropdown
                          value={user.find(u => u._id === formik.values.user) || null} // Find selected role by ID
                          onChange={(event, value) => formik.setFieldValue('user', value ? value._id : '')} // Set ID in formik
                          renderInput={params => (
                            <TextField
                              {...params}
                              label='User'
                              error={Boolean(formik.touched.user && formik.errors.user)}
                              helperText={formik.touched.user && formik.errors.user}
                            />
                          )}
                        />
                        <Autocomplete
                          fullWidth
                          sx={{ mt: 3, mb: 3 }}
                          options={route}
                          getOptionLabel={option => option.code} // Display name in dropdown
                          value={route.find(r => r._id === formik.values.route) || null} // Find selected role by ID
                          onChange={(event, value) => formik.setFieldValue('route', value ? value._id : '')} // Set ID in formik
                          renderInput={params => (
                            <TextField
                              {...params}
                              label='Route'
                              error={Boolean(formik.touched.route && formik.errors.route)}
                              helperText={formik.touched.route && formik.errors.route}
                            />
                          )}
                        />

                        {/*/!* Route *!/*/}
                        {/*<Autocomplete*/}
                        {/*  fullWidth*/}
                        {/*  sx={{mt: 5}}*/}
                        {/*  options={route}*/}
                        {/*  getOptionLabel={(opt) => opt.code}*/}
                        {/*  value={route.find((r) => r._id === formik.values.assignments[index]?.route) || null}*/}

                        {/*  // value={route.find((r) => r._id === assign.route?._id) || null}*/}
                        {/*  onChange={(event, value) => {*/}
                        {/*    formik.setFieldValue(`assignments[${index}].assignmentId`, assign._id); // Add assignmentId*/}
                        {/*    formik.setFieldValue(`assignments[${index}].route`, value ? value._id : '');*/}
                        {/*  }}*/}
                        {/*  renderInput={(params) => <TextField {...params} label="Route"/>}*/}
                        {/*/>*/}

                        {/*/!* User *!/*/}
                        {/*<Autocomplete*/}
                        {/*  fullWidth*/}
                        {/*  sx={{mt: 5}}*/}
                        {/*  options={user}*/}
                        {/*  getOptionLabel={(opt) => opt.userName}*/}
                        {/*  value={user.find((u) => u._id === formik.values.assignments[index]?.user) || null}*/}

                        {/*  // value={user.find((u) => u._id === assign.user?._id) || null}*/}
                        {/*  onChange={(event, value) => {*/}
                        {/*    formik.setFieldValue(`assignments[${index}].assignmentId`, assign._id); // Add assignmentId*/}
                        {/*    formik.setFieldValue(`assignments[${index}].user`, value ? value._id : '');*/}
                        {/*  }}*/}
                        {/*  renderInput={(params) => <TextField {...params} label="User"/>}*/}
                        {/*/>*/}
                      </Box>
                    </Grid>
                  )}
                </Grid>
                <Button variant='contained' type='submit' sx={{ mt: 4 }}>
                  Update
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default JobEdit
