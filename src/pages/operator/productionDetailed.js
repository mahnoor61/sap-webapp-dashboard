import React, {useEffect, useState} from 'react';
import {
  Grid,
  Card, TextField,
  CardContent, Box, Button,
  Typography, TableContainer, Table, TableBody, TableRow, TableCell, CircularProgress,
} from '@mui/material';
import axios from 'axios';
import {useRouter} from 'next/router';
import toast from 'react-hot-toast';
import {AuthGuard} from "../../guard/authGuard";
import UserLayout from "../../layouts/UserLayout";
import {useSelector} from "react-redux";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductOrderDetail = () => {
  const [seconds, setSeconds] = useState(0);
  const [open, setOpen] = React.useState(false);

  const [makeTimeSeconds, setMakeTimeSeconds] = useState(0);
  const [makeTimeStarted, setMakeTimeStarted] = useState(false);
  const [productionStarted, setProductionStarted] = useState(false);
  const [productionSeconds, setProductionSeconds] = useState(0);

  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [productionOrderDetail, setProductionOrderDetailBeeData] = useState(null);


  const [pauseReason, setPauseReason] = useState('');
  const [stopImage, setStopImage] = useState(null);


  const router = useRouter();
  const auth = useSelector(state => state.auth);
  const token = auth.token;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const toggleButtonState = () => {
    setDisabled(!disabled);
  };


  // Make Time Timer
  useEffect(() => {
    let interval;
    if (makeTimeStarted && !productionStarted) {
      interval = setInterval(() => {
        setMakeTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [makeTimeStarted, productionStarted]);

// Production Timer
  useEffect(() => {
    let interval;
    if (productionStarted) {
      interval = setInterval(() => {
        setProductionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [productionStarted]);

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleMakeTimeStart = () => {
    setMakeTimeStarted(true);
  };

  const handleStartProduction = async () => {
    try {
      // Stop Make Time timer
      setMakeTimeStarted(false);

      // Save makeTime to backend
      await makeTimeFormik.setFieldValue('makeTime', formatTime(makeTimeSeconds));
      await makeTimeFormik.handleSubmit();

      // Start Production timer
      setProductionStarted(true);
      setMakeTimeSeconds(0); // Reset make time timer if needed
    } catch (error) {
      toast.error('Failed to save make time');
    }
  };



  useEffect(() => {
    const {order} = router.query;

    if (order) {
      // Step 1: Try loading from localStorage
      const localData = localStorage.getItem(`productionData-${order}`);
      if (localData) {
        setProductionOrderDetailBeeData(JSON.parse(localData));
      }

      // Step 2: Always fetch from API in background
      const fetchProductionData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/api/ap/admin/odbc/operator/doc-data/${order}`, {
            headers: {
              "x-access-token": token
            }
          });
          const data = response.data.data;
          setProductionOrderDetailBeeData(data);

          // Step 3: Save fresh data to localStorage
          localStorage.setItem(`productionData-${order}`, JSON.stringify(data));
          setLoading(false);
          // formik.setValues({
          //   recievedByOperator: data.recievedByOperator,
          // });
        } catch (error) {
          console.error('Failed to fetch production order detail API:', error);
          toast.error(error.response?.data?.msg || "Failed to load data");
          setLoading(false);
        }
      };

      fetchProductionData();
    }
  }, [router.query]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      docNum: productionOrderDetail?.docNum || '',
      recievedByOperator: ''
    },
    validationSchema: Yup.object({
      recievedByOperator: Yup.number().required('Received by operator is required!')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${BASE_URL}/api/ap/operator/update/recieved-by-operator`, {
          docNum: productionOrderDetail?.docNum,
          recievedByOperator: values.recievedByOperator,
        }, {
          headers: {"x-access-token": token}
        });
        toast.success('Recieve by operator updated successfully.');
        setProductionOrderDetailBeeData(response.data.data);
        formik.resetForm();
      } catch (error) {
        console.log("error", error)
        toast.error(error.response.data.msg);
        formik.resetForm();
      }
    },
  });

  //update make time:
  const makeTimeFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      docNum: productionOrderDetail?.docNum || '',
      makeTime: ''
    },
    validationSchema: Yup.object({
      // makeTime: Yup.number().required('Received by operator is required!')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${BASE_URL}/api/ap/operator/production/order/update/make-time`, {
          docNum: productionOrderDetail?.docNum,
          makeTime: values.makeTime,
        }, {
          headers: {"x-access-token": token}
        });
        console.log("make time updated successfully", response)
        // toast.success('Recieve by operator updated successfully.');
        // setProductionOrderDetailBeeData(response.data.data);
        formik.resetForm();
      } catch (error) {
        console.log("error", error)
        // toast.error(error.response.data.msg);
        formik.resetForm();
      }
    },
  });

  console.log("productionOrderDetail", productionOrderDetail)


  return (
    <Grid container justifyContent="space-between">
      {/*{loading &&*/}
      {/*  <TableRow align="center">*/}
      {/*    <TableCell colSpan={4} align="center">*/}
      {/*      <CircularProgress/>*/}
      {/*    </TableCell>*/}
      {/*  </TableRow>*/}
      {/*}*/}
      {productionOrderDetail && (
        <>

          {/*<Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%', width:'100%'}}>*/}

          <Card variant="outlined" sx={{
            width: '100%',
            py: 15,
            display: 'flex',
            AlignItem: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            <CardContent>
              <Box sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: 10, mt: 5}}>
                <Card sx={{flex: 1, boxShadow: '0 4px 20px skyblue', pb: 10}}>
                  <CardContent>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: {md: 'row', xs: 'column'},
                      width: '100%', mt: 10, mb: 10
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: {md: 'row', xs: 'column'}, width: '100%', mt: 10, mb: 10 }}>
                        <Box>
                          <Typography variant="h6" sx={{ mb: 2 }}>
                            {productionStarted ? formatTime(productionSeconds) : formatTime(makeTimeSeconds)}
                          </Typography>
                        </Box>

                        <Box>
                          {!makeTimeStarted && !productionStarted && (
                              <Button variant="contained" color="primary" onClick={handleMakeTimeStart}>Make Time</Button>
                          )}
                          {makeTimeStarted && !productionStarted && (
                              <Button variant="contained" color="success" onClick={handleStartProduction}>Start Production</Button>
                          )}
                        </Box>
                        {productionStarted && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                              <Button variant="contained" color="warning" onClick={() => console.log('Pause Production clicked')}>
                                Pause Production
                              </Button>
                              <Button variant="contained" color="error" onClick={() => console.log('Stop Production clicked')}>
                              Stop Production
                            </Button>
                              <Button variant="contained" color="error" onClick={() => console.log('Stop Production clicked')}>
                                DownTime
                              </Button>
                            </Box>
                        )}

                      </Box>

                    </Box>

                    <TableContainer sx={{width: '100%', overflowX: 'auto'}}>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{width: '40%'}}><strong>Production No:</strong></TableCell>
                            <TableCell>{productionOrderDetail.docNum}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>Production Code:</strong></TableCell>
                            <TableCell>{productionOrderDetail.itemCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>Production Name:</strong></TableCell>
                            <TableCell>{productionOrderDetail.prodName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>FG Planned Quantity:</strong></TableCell>
                            <TableCell>{productionOrderDetail.plannedQty}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>UPS:</strong></TableCell>
                            <TableCell>{productionOrderDetail.U_UPS}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>Customer Code:</strong></TableCell>
                            <TableCell>{productionOrderDetail.cardCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>Customer Name:</strong></TableCell>
                            <TableCell>{productionOrderDetail.cardName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>Sales Order:</strong></TableCell>
                            <TableCell>{productionOrderDetail.OriginNum}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: {md: 'column', xs: 'column'},
                      width: '100%',
                      mt: 5,
                      p: 5,
                      alignItems: 'center',
                      gap: 3
                    }}>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                        <Typography variant='body2'>Total Issue For Machine:</Typography>
                        <Typography variant='body2'>{productionOrderDetail.totalIssueForMachie}</Typography>
                      </Box>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                        <Typography variant='body2'>Total Completed Quantity:</Typography>
                        <Typography variant='body2'>{productionOrderDetail.totalCompletedQuantity}</Typography>
                      </Box>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                        <Typography variant='body2'>Total Wasted Quantity:</Typography>
                        <Typography variant='body2'>{productionOrderDetail.totalWastedQuantity}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{flex: 1, boxShadow: '0 4px 20px skyblue', pb: 10}}>
                  <CardContent>
                    <Box sx={{
                      display: 'flex',
                      gap: 3,
                      justifyContent: 'flex-end',
                      flexDirection: {md: 'row', xs: 'column'},
                      width: '100%', mt: 10, mb: 10
                    }}>
                      <Button variant="contained" disabled={disabled} color="warning">Issue For Machine</Button>
                      <Button variant="contained" disabled={disabled} color="success">Add Completed QTY</Button>
                      <Button variant="contained" disabled={disabled} color="primary">Add Wasted QTY</Button>
                      <Button variant="contained" color="error" onClick={handleClickOpen}>Total Recieved QTY</Button>
                    </Box>
                    <TableContainer sx={{width: '100%', overflowX: 'auto'}}>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{width: '40%'}}><strong>Sheet Code:</strong></TableCell>
                            <TableCell>{productionOrderDetail.ComponentItemCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>Sheet Name:</strong></TableCell>
                            <TableCell>{productionOrderDetail.ComponentItemName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><strong>Planned Quantity:</strong></TableCell>
                            <TableCell>{productionOrderDetail.ComponentPlannedQty}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{width: '50%'}}><strong>Transferred Quantity:</strong></TableCell>
                            <TableCell>{productionOrderDetail.TransferredQuantity}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{width: '50%'}}><strong>Recieved By Operator:</strong></TableCell>
                            <TableCell>{productionOrderDetail.recievedByOperator}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{width: '50%'}}><strong>Remaining Quantity:</strong></TableCell>
                            <TableCell>{productionOrderDetail.remainingQuantity}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: {md: 'column', xs: 'column'},
                      width: '100%',
                      mt: 5,
                      p: 5,
                      alignItems: 'center',
                      gap: 3
                    }}>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                        <Typography variant='body2'>Current Pallate No:</Typography>
                        <Typography variant='body2'>{productionOrderDetail.currentPallateNo}</Typography>
                      </Box>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                        <Typography variant='body2'>Issue For Machine:</Typography>
                        <Typography variant='body2'>{productionOrderDetail.issueForMachine}</Typography>
                      </Box>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                        <Typography variant='body2'>Completed Quantity:</Typography>
                        <Typography variant='body2'>{productionOrderDetail.completedQuantity}</Typography>
                      </Box>
                      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                        <Typography variant='body2'>Wasted Quantity:</Typography>
                        <Typography variant='body2'>{productionOrderDetail.wastedQuantity}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>
          {/* Dialog for Adding recived by operator */}
          <React.Fragment>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="alert-dialog-title">
                  {"Recieve by operator"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <TextField fullWidth id="outlined-basic" label="Add" variant="filled"
                               sx={{my: 4, width: '100%'}}
                               label='Add'
                               placeholder='Add '
                               name="recievedByOperator"
                               type="number"
                               error={Boolean(formik.touched.recievedByOperator && formik.errors.recievedByOperator)}
                               helperText={formik.touched.recievedByOperator && formik.errors.recievedByOperator}
                               onBlur={formik.handleBlur}
                               onChange={formik.handleChange}
                               value={formik.values.recievedByOperator}/>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>cancel</Button>
                  <Button type="submit" onClick={handleClose} autoFocus>
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </React.Fragment>
          {/*</Box>*/}


          {/*modal for pause */}
          {/*<Dialog open={phase === 'pause'} onClose={handleClose}>*/}
          {/*  <DialogTitle>Pause Reason</DialogTitle>*/}
          {/*  <DialogContent>*/}
          {/*    <DialogContentText>Select a reason or enter your own:</DialogContentText>*/}
          {/*    <TextField*/}
          {/*      autoFocus*/}
          {/*      margin="dense"*/}
          {/*      label="Reason"*/}
          {/*      fullWidth*/}
          {/*      variant="outlined"*/}
          {/*      value={pauseReason}*/}
          {/*      onChange={(e) => setPauseReason(e.target.value)}*/}
          {/*    />*/}
          {/*  </DialogContent>*/}
          {/*  <DialogActions>*/}
          {/*    <Button onClick={handleClose}>Cancel</Button>*/}
          {/*    <Button onClick={submitPauseReason}>Submit</Button>*/}
          {/*  </DialogActions>*/}
          {/*</Dialog>*/}

        </>
      )}


      {/*// dialgour for stop production*/}
      {/*<Dialog open={phase === 'stop'} onClose={handleClose}>*/}
      {/*  <DialogTitle>Stop Production - Upload Image</DialogTitle>*/}
      {/*  <DialogContent>*/}
      {/*    <input type="file" onChange={(e) => setStopImage(e.target.files[0])}/>*/}
      {/*  </DialogContent>*/}
      {/*  <DialogActions>*/}
      {/*    <Button onClick={handleClose}>Cancel</Button>*/}
      {/*    <Button onClick={submitStopImage}>Submit</Button>*/}
      {/*  </DialogActions>*/}
      {/*</Dialog>*/}
    </Grid>
  )
    ;
};

export default ProductOrderDetail;
