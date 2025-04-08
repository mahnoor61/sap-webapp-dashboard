// import React, {useState, useRef, useEffect, useContext} from 'react';
// import {
//   CardContent,
//   Card,
//   TextField,
//   Button,
//   Grid,
//   Box,
//   FormControl,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from '@mui/material/';
// import {useFormik} from 'formik';
// import * as yup from 'yup';
// import axios from "axios";
// import toast from "react-hot-toast";
// import {useSelector} from "react-redux";
// import InfoIcon from "@mui/icons-material/Info";
// import dynamic from "next/dynamic";
// import {RouteContext} from "../../@core/context/getAllRoutes";
// import {mahineContext} from "../../@core/context/getAllMachines";
// import {UserContext} from "../../@core/context/user";
// import {ProductionNoContext} from "../../@core/context/getProductionOrderNo";
// import {Autocomplete, Chip, Stack} from "@mui/material";
//
// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//
//
// const AddJob = () => {
//
//   const {machine, handleMachineChange, machineDrop} = useContext(mahineContext);
//   const {user, handleUserChange, userDrop} = useContext(UserContext);
//   const {route, handleRouteChange, routeDrop} = useContext(RouteContext);
//   const {prodcutionOrder, handleProductionChange, productionDrop} = useContext(ProductionNoContext);
//
//
//   const auth = useSelector(state => state.auth);
//   const token = auth.token;
//
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);
//
//   const [newRow, setNewRow] = useState({user: [], machine: [], route: []});
//   const [addedRows, setAddedRows] = useState({user: [], machine: [], route: []});
//
//   const handleAddRow = () => {
//     if (newRow.user.length && newRow.machine.length && newRow.route.length) {
//       setAddedRows(prevRows => ({
//         user: [...prevRows.user, ...newRow.user],
//         machine: [...prevRows.machine, ...newRow.machine],
//         route: [...prevRows.route, ...newRow.route]
//       }));
//
//       // Formik values update karein
//       formik.setValues(prevValues => ({
//         ...prevValues,
//         user: [...prevValues.user, ...newRow.user],
//         machine: [...prevValues.machine, ...newRow.machine],
//         routeStage: [...prevValues.routeStage, ...newRow.route]
//       }));
//
//       setNewRow({ user: [], machine: [], route: [] });
//       setOpenDialog(false);
//     } else {
//       alert("Please select all fields!");
//     }
//   };
//
//
//
//   const formik = useFormik({
//     initialValues: {
//       productionOrderNo: '',
//       machine: [],
//       routeStage: [],
//       user: [],
//     },
//
//     validationSchema: yup.object({
//       productionOrderNo: yup.string().required('Order No  is required'),
//
//       // machine: yup.array().min(1, 'Select at least one machine'),
//       // routeStage: yup.array().min(1, 'Select at least one route'),
//       // user: yup.array().min(1, 'Select at least one user'),
//     }),
//     onSubmit: async (values, {resetForm}) => {
//       try {
//         const response = await axios.post(`${BASE_URL}/api/ap/admin/assign/job`, {
//           productionOrderNo: values.productionOrderNo,
//           machine: values.machine,
//           routeStage: values.routeStage,
//           user: values.user,
//         }, {
//           headers: {
//             "x-access-token": token
//           }
//         });
//         console.log("response", response)
//         toast.success('Job created successfully.')
//         formik.resetForm();
//         setNewRow({ user: [], machine: [], route: [] });
//       } catch (error) {
//         console.log('error in create job')
//         toast.error(error.response.data.msg);
//         formik.resetForm();
//       }
//     }
//   });
//   console.log("addedRows", addedRows)
//
//   return (
//     <Card sx={{display: 'flex', AlignItem: 'center', justifyContent: 'center', py: 5}}>
//       <CardContent>
//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={1} sx={{px: 5}}>
//             <Stack spacing={1} sx={{width: '100%'}}>
//               <Chip sx={{textAlign: 'center', mb: 10, width: '100%'}} label="Add Job "/>
//               {/*<Chip label="Chip Outlined" variant="outlined" />*/}
//             </Stack>
//             <Autocomplete
//               fullWidth
//               sx={{mb: 7}}
//               options={prodcutionOrder}
//               getOptionLabel={(option) => option.DocNum} // Display name in dropdown
//               value={prodcutionOrder.find((role) => role.DocNum === formik.values.productionOrderNo) || null} // Find selected role by ID
//               onChange={(event, value) => formik.setFieldValue('productionOrderNo', value ? value.DocNum : '')} // Set ID in formik
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Prodcution Order No"
//                   error={Boolean(formik.touched.productionOrderNo && formik.errors.productionOrderNo)}
//                   helperText={formik.touched.productionOrderNo && formik.errors.productionOrderNo}
//                 />
//               )}
//             />
//             <Box sx={{
//               display: 'flex',
//               width: '100%',
//               gap: 3,
//               flexDirection: {lg: 'row', md: 'column', xs: 'column', sm: 'column'}
//             }}>
//               {/*<Autocomplete*/}
//               {/*  fullWidth*/}
//               {/*  sx={{mb: 7}}*/}
//               {/*  options={route}*/}
//               {/*  getOptionLabel={(option) => option.code} // Display name in dropdown*/}
//               {/*  value={route.find((role) => role._id === formik.values.routeStage) || null} // Find selected role by ID*/}
//               {/*  onChange={(event, value) => formik.setFieldValue('routeStage', value ? [value._id] : [])} // Set ID in formik*/}
//               {/*  renderInput={(params) => (*/}
//               {/*    <TextField*/}
//               {/*      {...params}*/}
//               {/*      label="Route"*/}
//               {/*      error={Boolean(formik.touched.routeStage && formik.errors.routeStage)}*/}
//               {/*      helperText={formik.touched.routeStage && formik.errors.routeStage}*/}
//               {/*    />*/}
//               {/*  )}*/}
//               {/*/>*/}
//
//               {/*<Autocomplete*/}
//               {/*  fullWidth*/}
//               {/*  sx={{mb: 7}}*/}
//               {/*  options={machine}*/}
//               {/*  getOptionLabel={(option) => option.code} // Display code in dropdown*/}
//               {/*  value={machine.find((m) => m._id === formik.values.machine) || null} // Find selected machine by ID*/}
//               {/*  onChange={(event, value) => formik.setFieldValue('machine', value ? [value._id] : [])} // Set ID in formikyping*/}
//               {/*  // freeSolo // Allow typing new values*/}
//               {/*  renderInput={(params) => (*/}
//               {/*    <TextField*/}
//               {/*      {...params}*/}
//               {/*      label="Machine"*/}
//               {/*      error={Boolean(formik.touched.machine && formik.errors.machine)}*/}
//               {/*      helperText={formik.touched.machine && formik.errors.machine}*/}
//               {/*    />*/}
//               {/*  )}*/}
//               {/*/>*/}
//
//               {/*<Autocomplete*/}
//               {/*  fullWidth*/}
//               {/*  sx={{mb: 7}}*/}
//               {/*  options={user}*/}
//               {/*  getOptionLabel={(option) => option.userName} // Display code in dropdown*/}
//               {/*  value={user.find((m) => m._id === formik.values.user) || null} // Find selected machine by ID*/}
//               {/*  onChange={(event, value) => formik.setFieldValue('user', value ? value._id : '')} // Set ID in formikyping*/}
//               {/*  // freeSolo // Allow typing new values*/}
//               {/*  renderInput={(params) => (*/}
//               {/*    <TextField*/}
//               {/*      {...params}*/}
//               {/*      label="User"*/}
//               {/*      error={Boolean(formik.touched.user && formik.errors.user)}*/}
//               {/*      helperText={formik.touched.user && formik.errors.user}*/}
//               {/*    />*/}
//               {/*  )}*/}
//               {/*/>*/}
//               <Autocomplete
//                 multiple
//                 fullWidth
//                 options={user}
//                 getOptionLabel={(option) => option.userName}  // Displaying userName in dropdown
//                 onChange={(event, value) => setNewRow({
//                   ...newRow,
//                   user: value.map(v => v._id)  // Storing _id instead of userName
//                 })}
//                 renderInput={(params) => <TextField {...params} label="User"/>}
//               />
//
//               <Autocomplete
//                 multiple
//                 fullWidth
//                 options={machine}
//                 getOptionLabel={(option) => option.code}  // Displaying machine code in dropdown
//                 onChange={(event, value) => setNewRow({
//                   ...newRow,
//                   machine: value.map(v => v._id)  // Storing _id instead of code
//                 })}
//                 renderInput={(params) => <TextField {...params} label="Machine"/>}
//               />
//
//               <Autocomplete
//                 multiple
//                 fullWidth
//                 options={route}
//                 getOptionLabel={(option) => option.code}  // Displaying route code in dropdown
//                 onChange={(event, value) => setNewRow({
//                   ...newRow,
//                   route: value.map(v => v._id)  // Storing _id instead of code
//                 })}
//                 renderInput={(params) => <TextField {...params} label="Route"/>}
//               />
//
//
//             </Box>
//             <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt:5,width: '100%'}}>
//               <Button
//                 sx={{
//                   backgroundColor: '#0563BB', '&:hover': {
//                     backgroundColor: '#0AA4D2 !important'  // Updated hover color
//                   }
//                 }}
//                 variant='contained'
//                 type='submit'
//                 disabled={formik.isSubmitting}>
//                 Create
//               </Button>
//               <Button onClick={() => setOpenDialog(true)}
//                       sx={{
//                         backgroundColor: '#0563BB', '&:hover': {
//                           backgroundColor: '#0AA4D2 !important'  // Updated hover color
//                         }
//                       }} variant='contained' color='primary'>Add Row</Button>
//             </Box>
//           </Grid>
//         </form>
//       </CardContent>
//       {/* Dialog (Popup) */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Add User, Machine & Route</DialogTitle>
//         <DialogContent>
//           <Autocomplete
//             fullWidth
//             options={user}
//             getOptionLabel={(option) => option.userName}
//             onChange={(event, value) =>
//               setNewRow({...newRow, user: value ? value._id : ""})
//             }
//             renderInput={(params) => <TextField {...params} label="User"/>}
//           />
//           <Autocomplete
//             fullWidth
//             options={machine}
//             getOptionLabel={(option) => option.code}
//             onChange={(event, value) =>
//               setNewRow({...newRow, machine: value ? value._id : ""})
//             }
//             renderInput={(params) => <TextField {...params} label="Machine"/>}
//           />
//           <Autocomplete
//             fullWidth
//             options={route}
//             getOptionLabel={(option) => option.code}
//             onChange={(event, value) =>
//               setNewRow({...newRow, route: value ? value._id : ""})
//             }
//             renderInput={(params) => <TextField {...params} label="Route"/>}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button onClick={handleAddRow} variant="contained">
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//       {/* Dialog for adding new row */}
//       {/*<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>*/}
//       {/*  <DialogTitle>Add User, Machine & Route</DialogTitle>*/}
//       {/*  <DialogContent>*/}
//       {/*    <Autocomplete*/}
//       {/*      fullWidth*/}
//       {/*      options={user}*/}
//       {/*      getOptionLabel={(option) => option.userName}*/}
//       {/*      onChange={(event, value) => setNewRow({ ...newRow, user: value ? value._id : '' })}*/}
//       {/*      renderInput={(params) => <TextField {...params} label='User' />}*/}
//       {/*    />*/}
//       {/*    <Autocomplete*/}
//       {/*      fullWidth*/}
//       {/*      options={machine}*/}
//       {/*      getOptionLabel={(option) => option.code}*/}
//       {/*      onChange={(event, value) => setNewRow({ ...newRow, machine: value ? value._id : '' })}*/}
//       {/*      renderInput={(params) => <TextField {...params} label='Machine' />}*/}
//       {/*    />*/}
//       {/*    <Autocomplete*/}
//       {/*      fullWidth*/}
//       {/*      options={route}*/}
//       {/*      getOptionLabel={(option) => option.code}*/}
//       {/*      onChange={(event, value) => setNewRow({ ...newRow, route: value ? value._id : '' })}*/}
//       {/*      renderInput={(params) => <TextField {...params} label='Route' />}*/}
//       {/*    />*/}
//       {/*  </DialogContent>*/}
//       {/*  <DialogActions>*/}
//       {/*    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>*/}
//       {/*    <Button onClick={handleAddRow} variant='contained'>Add</Button>*/}
//       {/*  </DialogActions>*/}
//       {/*</Dialog>*/}
//     </Card>
//   );
// };
//
// export default AddJob;
import React, {useState, useContext} from 'react';
import {
  CardContent, Card, TextField, Button, Grid, Box, Dialog, DialogTitle,
  DialogContent, DialogActions, Autocomplete, Chip, Stack, Typography
} from '@mui/material/';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from "axios";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {RouteContext} from "../../@core/context/getAllRoutes";
import {mahineContext} from "../../@core/context/getAllMachines";
import {UserContext} from "../../@core/context/user";
import {ProductionNoContext} from "../../@core/context/getProductionOrderNo";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AddJob = () => {
  const {machine} = useContext(mahineContext);
  const {user} = useContext(UserContext);
  const {route} = useContext(RouteContext);
  const {prodcutionOrder} = useContext(ProductionNoContext);

  const auth = useSelector(state => state.auth);
  const token = auth.token;

  const [openDialog, setOpenDialog] = useState(false);
  const [newRow, setNewRow] = useState({user: [], machine: [], route: []});
  const [addedRows, setAddedRows] = useState({user: [], machine: [], route: []});

  // const handleAddRow = () => {
  //   if (newRow.user.length && newRow.machine.length && newRow.route.length) {
  //     setAddedRows(prevRows => ({
  //       user: [...prevRows.user, ...newRow.user],
  //       machine: [...prevRows.machine, ...newRow.machine],
  //       route: [...prevRows.route, ...newRow.route]
  //     }));
  //
  //     formik.setValues(prevValues => ({
  //       ...prevValues,
  //       user: [...prevValues.user, ...newRow.user],
  //       machine: [...prevValues.machine, ...newRow.machine],
  //       routeStage: [...prevValues.routeStage, ...newRow.route]
  //     }));
  //
  //     setNewRow({user: [], machine: [], route: []});
  //     setOpenDialog(false);
  //   } else {
  //     alert("Please select all fields!");
  //   }
  // };
  const handleAddRow = () => {
    if (newRow.user.length && newRow.machine.length && newRow.route.length) {
      setAddedRows(prevRows => ({
        user: [...prevRows.user, ...newRow.user],
        machine: [...prevRows.machine, ...newRow.machine],
        route: [...prevRows.route, ...newRow.route]
      }));

      formik.setValues(prevValues => ({
        ...prevValues,
        user: [...prevValues.user, ...newRow.user],
        machine: [...prevValues.machine, ...newRow.machine],
        routeStage: [...prevValues.routeStage, ...newRow.route]
      }));

      setNewRow({ user: [], machine: [], route: [] });
      setOpenDialog(false);
    } else {
      alert("Please select all fields!");
    }
  };

  // const handleAddRow = () => {
  //   if (newRow.user.length && newRow.machine.length && newRow.route.length) {
  //     const newUserRows = newRow.user.map(userId => {
  //       const user = user.find(u => u._id === userId);
  //       return user ? user.userName : '';
  //     });
  //
  //     const newMachineRows = newRow.machine.map(machineId => {
  //       const machine = machine.find(m => m._id === machineId);
  //       return machine ? machine.code : '';
  //     });
  //
  //     const newRouteRows = newRow.route.map(routeId => {
  //       const route = route.find(r => r._id === routeId);
  //       return route ? route.code : '';
  //     });
  //
  //     setAddedRows(prevRows => ({
  //       user: [...prevRows.user, ...newUserRows],
  //       machine: [...prevRows.machine, ...newMachineRows],
  //       route: [...prevRows.route, ...newRouteRows],
  //     }));
  //
  //     // Formik values update
  //     formik.setValues(prevValues => ({
  //       ...prevValues,
  //       user: [...prevValues.user, ...newRow.user],
  //       machine: [...prevValues.machine, ...newRow.machine],
  //       routeStage: [...prevValues.routeStage, ...newRow.route]
  //     }));
  //
  //     setNewRow({ user: [], machine: [], route: [] });
  //     setOpenDialog(false);
  //   } else {
  //     alert("Please select all fields!");
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      productionOrderNo: '',
      machine: [],
      routeStage: [],
      user: [],
    },
    validationSchema: yup.object({
      productionOrderNo: yup.string().required('Order No is required'),
    }),
    onSubmit: async (values, {resetForm}) => {
      try {
        const response = await axios.post(`${BASE_URL}/api/ap/admin/assign/job`, values, {
          headers: {"x-access-token": token}
        });

        toast.success('Job created successfully.');
        formik.resetForm();
        setAddedRows({user: [], machine: [], route: []});
      } catch (error) {
        toast.error(error.response?.data?.msg || "Error creating job");
      }
    }
  });
  return (
    <Card sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', py: 5}}>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1} sx={{px: 5}}>
            <Stack spacing={1} sx={{width: '100%'}}>
              <Chip sx={{textAlign: 'center', mb: 5, width: '100%'}} label="Add Job"/>
            </Stack>

            {/* Production Order Selection */}
            <Autocomplete
              fullWidth sx={{mb: 2}}
              options={prodcutionOrder}
              getOptionLabel={(option) => option.docNum}
              value={prodcutionOrder.find((po) => po.docNum === formik.values.productionOrderNo) || null}
              onChange={(event, value) => formik.setFieldValue('productionOrderNo', value ? value.docNum : '')}
              renderInput={(params) => <TextField {...params} label="Production Order No"/>}
            />

            {/* Added Rows Display */}
            {addedRows.user.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 5 }}>Added Rows</Typography>
                {addedRows.user.map((u, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      value={u.userName}  // Display userName here
                      disabled
                    />
                    <TextField
                      fullWidth
                      value={addedRows.machine[index].code}  // Display machine code here
                      disabled
                    />
                    <TextField
                      fullWidth
                      value={addedRows.route[index].code}  // Display route code here
                      disabled
                    />
                  </Box>
                ))}
              </Box>
            )}


            {/* Buttons */}
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, width: '100%'}}>
              <Button variant='contained' type='submit' disabled={formik.isSubmitting}>Create</Button>
              <Button onClick={() => setOpenDialog(true)} variant='contained' color='primary'>Add Row</Button>
            </Box>
          </Grid>
        </form>
      </CardContent>

      {/* Dialog for Adding New Row */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} sx={{width: '100%'}}>
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent sx={{width: '100%'}}>
          <Autocomplete
            sx={{mb: 3}}
            multiple fullWidth options={user}
            getOptionLabel={(option) => option.userName}
            // onChange={(event, value) => setNewRow({ ...newRow, user: value.map(v => v._id) })}
            onChange={(event, value) =>
              setNewRow({
                ...newRow,
                user: value.map(v => ({
                  _id: v._id,       // Store the ID
                  userName: v.userName // Store the userName
                }))
              })
            }
          renderInput={(params) => <TextField {...params} label="User"/>}
          />
          <Autocomplete
            sx={{mb: 3}}
            multiple fullWidth options={machine}
            getOptionLabel={(option) => option.code}
            // onChange={(event, value) => setNewRow({ ...newRow, machine: value.map(v => v._id) })}
            onChange={(event, value) =>
              setNewRow({
                ...newRow,
                machine: value.map(v => ({
                  _id: v._id,        // Store the ID
                  code: v.code       // Store the code
                }))
              })
            }
            renderInput={(params) => <TextField {...params} label="Machine"/>}
          />
          <Autocomplete
            multiple fullWidth options={route}
            getOptionLabel={(option) => option.code}
            // onChange={(event, value) => setNewRow({ ...newRow, route: value.map(v => v._id) })}
            onChange={(event, value) =>
              setNewRow({
                ...newRow,
                route: value.map(v => ({
                  _id: v._id,       // Store the ID
                  code: v.code      // Store the code
                }))
              })
            }
            renderInput={(params) => <TextField {...params} label="Route"/>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddRow} variant='contained' color='primary'>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AddJob;
