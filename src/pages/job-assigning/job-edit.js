// import React, {useContext, useEffect, useState} from 'react';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Box,
//   TextField, Autocomplete,
// } from '@mui/material';
// import axios from 'axios';
// import {useRouter} from 'next/router';
// import toast from 'react-hot-toast';
// import {useFormik} from 'formik';
// import * as Yup from 'yup';
// import CardActions from '@mui/material/CardActions';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {UpdateState} from '../../helpers/filter';
// import {Editor} from "@tinymce/tinymce-react";
// import {AuthGuard} from "../../guard/authGuard";
// import UserLayout from "../../layouts/UserLayout";
// import {useSelector} from "react-redux";
// import {mahineContext} from "../../@core/context/getAllMachines";
// import {UserContext} from "../../@core/context/user";
// import {RouteContext} from "../../@core/context/getAllRoutes";
// import {ProductionNoContext} from "../../@core/context/getProductionOrderNo";
//
// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//
// const JobEdit = () => {
//   const {machine, handleMachineChange, machineDrop} = useContext(mahineContext);
//   const {user, handleUserChange, userDrop} = useContext(UserContext);
//   const {route, handleRouteChange, routeDrop} = useContext(RouteContext);
//   const {prodcutionOrder, handleProductionChange, productionDrop} = useContext(ProductionNoContext);
//   const router = useRouter();
//   const [jobData, setJobData] = useState(null);
//   const [jobId, setJobId] = useState('');
//   const auth = useSelector(state => state.auth);
//   const token = auth.token;
//
//   useEffect(() => {
//     const {jobId} = router.query;
//     if (jobId) {
//       setJobId(jobId);
//
//       const getJob = async () => {
//         try {
//           const response = await axios.get(`${BASE_URL}/api/ap/admin/odbc/production/order/${jobId}`, {
//             headers: {
//               "x-access-token": token
//             }
//           });
//           const job = response.data.data;
//           setJobData(job);
//
//           formik.setValues({
//             productionOrderNo: job.productionOrderNo,
//             machine: job.machine,
//             route: job.route,
//             user: job.user,
//           });
//         } catch (error) {
//           console.error('error in read single job:', error);
//           toast.error(error.response.data.msg);
//         }
//       };
//       getJob();
//     }
//   }, [router.query]);
//   console.log("jobData", jobData)
//   //edit expertise
//   const formik = useFormik({
//     initialValues: {
//       productionOrderNo: '',
//       machine: '',
//       routeStage: '',
//       user: '',
//
//     },
//     validationSchema: Yup.object({
//       // productionOrderNo: Yup.string().required('Order No is required'),
//       // machine: Yup.string().required('Machine is required'),
//       // routeStage: Yup.string().required('Route is required'),
//       // user: Yup.string().required('User is required'),
//     }),
//     onSubmit: async (values, helpers) => {
//       try {
//         const response = await axios.post(`${BASE_URL}/api/ap/admin/update/job/${jobId}`, {
//           productionOrderNo: values.productionOrderNo,
//           machine: values.machine,
//           routeStage: values.routeStage,
//           user: values.user,
//         }, {
//           headers: {
//             "x-access-token": token
//           }
//         });
//         toast.success('Job updated successfully.');
//         formik.resetForm();
//       } catch (error) {
//         console.log('error in edit job api');
//         toast.error(error.response.data.msg);
//         formik.resetForm();
//       }
//     },
//   });
//
//   return (
//
//     <>
//       {jobData && (
//
//         // <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
//
//           <Card sx={{display: 'flex', AlignItem: 'center', justifyContent: 'center'}}>
//           <CardContent sx={{width:'100%'}}>
//             <form onSubmit={formik.handleSubmit}>
//               <Grid container spacing={1} sx={{px: 5}}>
//                 <Typography variant="h5" component="div" sx={{my: 4}}>
//                   Edit Job
//                 </Typography>
//                 <Autocomplete
//                   required
//                   fullWidth
//                   sx={{mb: 7}}
//                   options={prodcutionOrder}
//                   getOptionLabel={(option) => option.DocNum}
//                   value={prodcutionOrder.find((role) => role.DocNum === formik.values.productionOrderNo) || null} // Find selected role by ID
//                   onChange={(event, value) => formik.setFieldValue('productionOrderNo', value ? value.DocNum : '')} // Set ID in formik
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Prodcution Order No"
//                       error={Boolean(formik.touched.productionOrderNo && formik.errors.productionOrderNo)}
//                       helperText={formik.touched.productionOrderNo && formik.errors.productionOrderNo}
//                     />
//                   )}
//                 />
//                 <Box sx={{
//                   display: 'flex',
//                   width: '100%',
//                   gap: 3,
//                   flexDirection: {lg: 'row', md: 'column', xs: 'column', sm: 'column'}
//                 }}>
//                   <Autocomplete
//                     required
//                     fullWidth
//                     sx={{mb: 7}}
//                     options={route}
//                     getOptionLabel={(option) => option.code} // Display name in dropdown
//                     value={route.find((role) => role._id === formik.values.route) || null} // Find selected role by ID
//                     onChange={(event, value) => formik.setFieldValue('routeStage', value ? value._id : '')} // Set ID in formik
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Route"
//                         error={Boolean(formik.touched.routeStage && formik.errors.routeStage)}
//                         helperText={formik.touched.routeStage && formik.errors.routeStage}
//                       />
//                     )}
//                   />
//
//                   <Autocomplete
//                     required
//                     fullWidth
//                     sx={{mb: 7}}
//                     options={machine}
//                     getOptionLabel={(option) => option.code} // Display code in dropdown
//                     value={machine.find((m) => m._id === formik.values.machine) || null}
//                     onChange={(event, value) => formik.setFieldValue('machine', value ? value._id : '')}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Machine"
//                         error={Boolean(formik.touched.machine && formik.errors.machine)}
//                         helperText={formik.touched.machine && formik.errors.machine}
//                       />
//                     )}
//                   />
//                   <Autocomplete
//                     required
//                     fullWidth
//                     sx={{mb: 7}}
//                     options={user}
//                     getOptionLabel={(option) => option.userName} // Display code in dropdown
//                     value={user.find((u) => u._id === formik.values.user) || null} // Find selected machine by ID
//                     onChange={(event, value) => formik.setFieldValue('user', value ? value._id : '')} // Set ID in formikyping
//                     // freeSolo // Allow typing new values
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="User"
//                         error={Boolean(formik.touched.user && formik.errors.user)}
//                         helperText={formik.touched.user && formik.errors.user}
//                       />
//                     )}
//                   />
//                 </Box>
//                 <Button
//                   variant="contained"
//                   type="submit"
//                   disabled={formik.isSubmitting}
//                   sx={{
//                     padding: '14px 20px 14px 22px',
//                     borderRadius: '8px',
//                     mr: 5,
//                     mt: 4,
//                     fontSize: '16px',
//                     fontStyle: 'normal',
//                     fontWeight: '400',
//                     backgroundColor: '#0563BB', '&:hover': {
//                       backgroundColor: '#0AA4D2 !important'  // Updated hover color
//                     }
//                   }}
//                 >
//                   Update
//                 </Button>
//               </Grid>
//             </form>
//           </CardContent>
//           </Card>
//
//       // </Box>
//       )}
//     </>
//   );
// };
//
// JobEdit.getLayout = page => (
//   <AuthGuard>
//     <UserLayout>{page}</UserLayout>
//   </AuthGuard>
// )
//
// export default JobEdit;
import React, {useContext, useEffect, useState} from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField, Autocomplete,
} from '@mui/material';
import axios from 'axios';
import {useRouter} from 'next/router';
import toast from 'react-hot-toast';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import {UpdateState} from '../../helpers/filter';
import {Editor} from "@tinymce/tinymce-react";
import {AuthGuard} from "../../guard/authGuard";
import UserLayout from "../../layouts/UserLayout";
import {useSelector} from "react-redux";
import {mahineContext} from "../../@core/context/getAllMachines";
import {UserContext} from "../../@core/context/user";
import {RouteContext} from "../../@core/context/getAllRoutes";
import {ProductionNoContext} from "../../@core/context/getProductionOrderNo";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const JobEdit = () => {
  const { machine } = useContext(mahineContext);
  const { user } = useContext(UserContext);
  const { route } = useContext(RouteContext);
  const { prodcutionOrder } = useContext(ProductionNoContext);
  const router = useRouter();
  const [jobData, setJobData] = useState(null);
  const [jobId, setJobId] = useState('');
  const auth = useSelector(state => state.auth);
  const token = auth.token;

  useEffect(() => {
    const { jobId } = router.query;
    if (jobId) {
      setJobId(jobId);

      const getJob = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/ap/admin/odbc/production/order/${jobId}`, {
            headers: { "x-access-token": token }
          });
          const job = response.data.data;
          setJobData(job);

          formik.setValues({
            productionOrderNo: job.productionOrderNo,
            machine: job.machine,
            routeStage: job.route,
            user: job.user,
          });
        } catch (error) {
          toast.error(error.response.data.msg);
        }
      };
      getJob();
    }
  }, [router.query]);

  const formik = useFormik({
    initialValues: {
      productionOrderNo: '',
      machine: [],
      routeStage: [],
      user: [],
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${BASE_URL}/api/ap/admin/update/job/${jobId}`, {
          productionOrderNo: values.productionOrderNo,
          machine: values.machine,
          routeStage: values.routeStage,
          user: values.user,
        }, {
          headers: { "x-access-token": token }
        });
        toast.success('Job updated successfully.');
        formik.resetForm();
      } catch (error) {
        toast.error(error.response.data.msg);
        formik.resetForm();
      }
    },
  });

  return (
    <>
      {jobData && (
        <Card>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1} sx={{ px: 5 }}>
                <Typography variant="h5" component="div" sx={{ my: 4 }}>
                  Edit Job
                </Typography>

                {/* Production Order */}
                <Autocomplete
                  required
                  fullWidth
                  options={prodcutionOrder} // Fetch from prodcutionOrder context
                  getOptionLabel={(option) => option.docNum} // Assuming each option has a DocNum property
                  value={prodcutionOrder.find((order) => order.docNum === formik.values.productionOrderNo) || null}
                  onChange={(event, value) => formik.setFieldValue('productionOrderNo', value ? value.docNum : '')}
                  renderInput={(params) => <TextField {...params} label="Production Order No" />}
                />

                {/*<Autocomplete*/}
                {/*  required*/}
                {/*  fullWidth*/}
                {/*  options={prodcutionOrder} // Fetch from prodcutionOrder context*/}
                {/*  getOptionLabel={(option) => option.DocNum}*/}
                {/*  value={formik.values.productionOrderNo}*/}
                {/*  onChange={(event, value) => formik.setFieldValue('productionOrderNo', value ? value.DocNum : '')}*/}
                {/*  renderInput={(params) => <TextField {...params} label="Production Order No" />}*/}
                {/*/>*/}

                {/* Render Machines */}
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 3, mt: 3 }}>
                  {formik.values.machine.map((m, index) => (
                    <Autocomplete
                      key={index}
                      fullWidth
                      options={machine} // Fetch from machine context
                      getOptionLabel={(option) => option.code}
                      value={machine.find((m) => m._id === formik.values.machine[index]._id) || null}
                      onChange={(event, value) => {
                        const newMachineValues = [...formik.values.machine];
                        newMachineValues[index] = value ? value : ''; // Store the entire object or its ID if needed
                        formik.setFieldValue('machine', newMachineValues);
                      }}
                      renderInput={(params) => <TextField {...params} label="Machine" />}
                    />
                  ))}
                </Box>

                {/* Render Routes */}
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 3, mt:3 }}>
                  {formik.values.routeStage && Array.isArray(formik.values.routeStage) && formik.values.routeStage.map((r, index) => (
                    <Autocomplete
                      key={index}
                      fullWidth
                      options={route} // Fetch from route context
                      getOptionLabel={(option) => option.code}
                      value={route.find((r) => r._id === formik.values.routeStage[index]._id) || null}
                      onChange={(event, value) => {
                        const newRouteValues = [...formik.values.routeStage];
                        newRouteValues[index] = value ? value : ''; // Store the entire object or its ID if needed
                        formik.setFieldValue('routeStage', newRouteValues);
                      }}
                      renderInput={(params) => <TextField {...params} label="Route" />}
                    />
                  ))}
                </Box>

                {/* Render Users */}
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 3, mt: 3 }}>
                  {formik.values.user.map((u, index) => (
                    <Autocomplete
                      key={index}
                      fullWidth
                      options={user} // Fetch from user context
                      getOptionLabel={(option) => option.userName}
                      value={user.find((u) => u._id === formik.values.user[index]._id) || null}
                      onChange={(event, value) => {
                        const newUserValues = [...formik.values.user];
                        newUserValues[index] = value ? value : ''; // Store the entire object or its ID if needed
                        formik.setFieldValue('user', newUserValues);
                      }}
                      renderInput={(params) => <TextField {...params} label="User" />}
                    />
                  ))}
                </Box>

                <Button variant="contained" type="submit" sx={{ mt: 4 }}>
                  Update
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default JobEdit;


// const JobEdit = () => {
//   const { machine } = useContext(mahineContext);
//   const { user } = useContext(UserContext);
//   const { route } = useContext(RouteContext);
//   const { prodcutionOrder } = useContext(ProductionNoContext);
//   const router = useRouter();
//   const [jobData, setJobData] = useState(null);
//   const [jobId, setJobId] = useState('');
//   const auth = useSelector(state => state.auth);
//   const token = auth.token;
//
//   useEffect(() => {
//     const { jobId } = router.query;
//     if (jobId) {
//       setJobId(jobId);
//
//       const getJob = async () => {
//         try {
//           const response = await axios.get(`${BASE_URL}/api/ap/admin/odbc/production/order/${jobId}`, {
//             headers: { "x-access-token": token }
//           });
//           const job = response.data.data;
//           setJobData(job);
//
//           formik.setValues({
//             productionOrderNo: job.productionOrderNo,
//             machine: job.machine,
//             route: job.route,
//             user: job.user,
//           });
//         } catch (error) {
//           toast.error(error.response.data.msg);
//         }
//       };
//       getJob();
//     }
//   }, [router.query]);
//
//   console.log("jobData", jobData);
//
//   const formik = useFormik({
//     initialValues: {
//       productionOrderNo: '',
//       machine: [],
//       routeStage: [],
//       user: [],
//     },
//     validationSchema: Yup.object({}),
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post(`${BASE_URL}/api/ap/admin/update/job/${jobId}`, {
//           productionOrderNo: values.productionOrderNo,
//           machine: values.machine,
//           routeStage: values.routeStage,
//           user: values.user,
//         }, {
//           headers: { "x-access-token": token }
//         });
//         toast.success('Job updated successfully.');
//         formik.resetForm();
//       } catch (error) {
//         toast.error(error.response.data.msg);
//         formik.resetForm();
//       }
//     },
//   });
//
//   return (
//     <>
//       {jobData && (
//         <Card>
//           <CardContent>
//             <form onSubmit={formik.handleSubmit}>
//               <Grid container spacing={1} sx={{ px: 5 }}>
//                 <Typography variant="h5" component="div" sx={{ my: 4 }}>
//                   Edit Job
//                 </Typography>
//
//                 {/* Production Order */}
//                 <Autocomplete
//                   required
//                   fullWidth
//                   options={prodcutionOrder} // Fetch from prodcutionOrder context
//                   getOptionLabel={(option) => option.DocNum}
//                   value={formik.values.productionOrderNo}
//                   onChange={(event, value) => formik.setFieldValue('productionOrderNo', value ? value.DocNum : '')}
//                   renderInput={(params) => <TextField {...params} label="Production Order No" />}
//                 />
//
//                 {/* Render Machines */}
//                 <Box sx={{ display: 'flex', flexDirection: 'column' , width:'100%', gap:3, mt:3}}>
//                   {formik.values.machine.map((m, index) => (
//                     <Autocomplete
//                       key={index}
//                       fullWidth
//                       options={machine} // Fetch from machine context
//                       getOptionLabel={(option) => option.code}
//                       value={machine.find((m) => m._id === formik.values.machine[index].code) || null}
//                       onChange={(event, value) => {
//                         const newMachineValues = [...formik.values.machine];
//                         newMachineValues[index] = value ? value._id : '';
//                         formik.setFieldValue('machine', newMachineValues);
//                       }}
//                       renderInput={(params) => <TextField {...params} label="Machine" />}
//                     />
//                   ))}
//                 </Box>
//
//                 {/* Render Routes */}
//                 <Box sx={{ display: 'flex', flexDirection: 'column' , width:'100%', gap:3, mt:3}}>
//                   {formik.values.route && Array.isArray(formik.values.route) && formik.values.route.map((r, index) => (
//                     <Autocomplete
//                       key={index}
//                       fullWidth
//                       options={route} // Fetch from route context
//                       getOptionLabel={(option) => option.code}
//                       value={route.find((r) => r._id === formik.values.route[index]) || null}
//                       onChange={(event, value) => {
//                         const newRouteValues = [...formik.values.routeStage];
//                         newRouteValues[index] = value ? value._id : '';
//                         formik.setFieldValue('routeStage', newRouteValues);
//                       }}
//                       renderInput={(params) => <TextField {...params} label="Route" />}
//                     />
//                   ))}
//                 </Box>
//
//                 {/* Render Users */}
//                 <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%', gap:3, mt:3 }}>
//                   {formik.values.user.map((u, index) => (
//                     <Autocomplete
//                       key={index}
//                       fullWidth
//                       options={user} // Fetch from user context
//                       getOptionLabel={(option) => option.userName}
//                       value={user.find((u) => u._id === formik.values.user[index]) || null}
//                       onChange={(event, value) => {
//                         const newUserValues = [...formik.values.user];
//                         newUserValues[index] = value ? value._id : '';
//                         formik.setFieldValue('user', newUserValues);
//                       }}
//                       renderInput={(params) => <TextField {...params} label="User" />}
//                     />
//                   ))}
//                 </Box>
//
//                 <Button variant="contained" type="submit" sx={{ mt: 4 }}>
//                   Update
//                 </Button>
//               </Grid>
//             </form>
//           </CardContent>
//         </Card>
//       )}
//     </>
//   );
// };
//
// export default JobEdit;
