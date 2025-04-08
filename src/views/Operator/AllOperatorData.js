import React, {useEffect, useState} from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import toast from 'react-hot-toast';
import axios from 'axios';
import {FilterHelper, PaginationHelper} from '/src/helpers/filter'
import VisibilityIcon from "@mui/icons-material/Visibility";
import NextLink from "next/link";
import {useSelector} from "react-redux";
import IconButton from "@mui/material/IconButton";
import ConfirmationDialog from "../ConfirmationDialog";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AllOperatorData = () => {
  const [allowedOrders, setAllowedOrders] = useState([]);
  const [prodctionLists, setProdctionLists] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loadingComplete, setLoadingComplete] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const auth = useSelector(state => state.auth);
  const token = auth.token;

  // const handleDeleteConfirm = () => {
  //   if (itemToDelete) {
  //     destroyJob(itemToDelete);
  //     setItemToDelete(null);
  //     setDialogOpen(false);
  //   }
  // };

  let response;



  // const destroyJob = async (id) => {
  //   try {
  //     response = await axios.delete(`${BASE_URL}/api/ap/admin/destroy/job/${id}`, {
  //       headers: {
  //         "x-access-token": token
  //       }
  //     });
  //     toast.success('Job deleted successfully');
  //     const updated = jobs.filter((row) => row._id !== id);
  //     setJobs(updated);
  //   } catch (error) {
  //     console.log('error in delete job', error);
  //     toast.error(error.response.data.msg);
  //   }
  // };
// if(auth.user.role === 'admin'){
//
// }
  // for operator to show its assign data

  const getAllowedProductionOrders = async () => {
    const userName = auth?.user?.userName;
    try {
      const res = await axios.get(`${BASE_URL}/api/ap/operator/production/orders/${userName}`, {
        headers: {
          "x-access-token": token
        }
      });
      setAllowedOrders(res.data.data); // yeh array hona chahiye jaise ['1001', '1002']
    } catch (err) {
      console.error('Error fetching allowed orders of operator', err);
      toast.error('Failed to fetch allowed production orders');
    }
  };

  const getAllProductionList = async () => {
    const localData = localStorage.getItem('productionLists');
    if (localData) {
        const parsedData = JSON.parse(localData);
        setProdctionLists(parsedData);
        setLoadingComplete(false);
    }

    // Fetch fresh data in background and update localStorage
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/admin/odbc/operator/data`, {
        headers: {
          "x-access-token": token
        }
      });

      const latestData = response.data.data;
      setProdctionLists(latestData);
      setLoadingComplete(false);

      // Save latest to localStorage
      localStorage.setItem('productionLists', JSON.stringify(latestData));
    } catch (error) {
      console.log('error in get all production list', error);
      toast.error('Failed to fetch latest production data', error);
    }
  };


  // const getAllProductionList = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/api/ap/admin/odbc/operator/data`, {
  //       headers: {
  //         "x-access-token": token
  //       }
  //     });
  //     setProdctionLists(response.data.data);
  //     setLoadingComplete(false)
  //
  //   } catch (error) {
  //     console.log('error in get all production list', error);
  //     toast.error(error);
  //   }
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getAllProductionList();
    if (auth?.user?.role === 'operator') {
      getAllowedProductionOrders();
    }
  }, []);


  const filteredProductionList = FilterHelper(prodctionLists, searchQuery, ['user.userName', 'machine.code'])

  // const paginatedProductionList = PaginationHelper(filteredProductionList, page, rowsPerPage);
  // const totalCount = filteredProductionList.length;


  const roleBasedProductionList = auth?.user?.role === 'operator'
    ? filteredProductionList.filter(item => allowedOrders.includes(item.docNum))
    : filteredProductionList;

  const paginatedProductionList = PaginationHelper(roleBasedProductionList, page, rowsPerPage);
  const totalCount = roleBasedProductionList.length;

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            {/*<TableRow sx={{width: '100%'}}>*/}
            {/*  <TableCell align="center" colSpan={5}>*/}
            {/*    <TextField*/}
            {/*      variant="filled"*/}
            {/*      placeholder="Search through username and machine"*/}
            {/*      sx={{*/}
            {/*        '&::placeholder': {*/}
            {/*          color: 'rgba(71, 85, 105, 1)',*/}
            {/*        },*/}
            {/*        height: '55px',*/}
            {/*        width: '100%',*/}
            {/*        flex: '1 0 0',*/}
            {/*        gap: '10px',*/}
            {/*        alignSelf: 'stretch',*/}
            {/*        flexGrow: '3',*/}
            {/*        borderRadius: 1*/}
            {/*      }}*/}
            {/*      onChange={event => setSearchQuery(event.target.value)}*/}
            {/*      InputProps={{*/}
            {/*        endAdornment: (*/}
            {/*          <Button variant="text" disabled={true} sx={{*/}
            {/*            background:'transparent !important'*/}
            {/*          }}>*/}
            {/*            <SearchIcon sx={{ml: 1.5, color: 'rgba(71, 85, 105, 1)'}}/>*/}
            {/*          </Button>*/}
            {/*        ),*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  </TableCell>*/}
            {/*</TableRow>*/}
            <TableRow sx={{justifyContent: 'space-between', alignItems: 'left'}}>
              <TableCell>#</TableCell>
              <TableCell>Production Orders</TableCell>
              <TableCell>Product Code</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Sheet Code</TableCell>
              <TableCell>Sheet Name</TableCell>
              <TableCell>Quantity of Sheets</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Status</TableCell>
              {/*<TableCell sx={{textAlign: 'left'}}>Action</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingComplete ?
              <TableRow align="center">
                <TableCell colSpan={4} align="center">
                  <CircularProgress/>
                </TableCell>
              </TableRow> :
              (roleBasedProductionList && roleBasedProductionList.length > 0 ? (
                paginatedProductionList.map((data, index) => (
                  <NextLink href={`/operator/productionDetailed?order=${data.docNum}`}>
                    <TableRow key={data._id} sx={{
                      // transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'skyblue',

                        // transform: 'scale(1.02)',
                        // overFlow: 'hidden'
                      }
                    }}>
                      <TableCell component="th" scope="row">
                        {page * rowsPerPage + index + 1} {/* Actual Serial Number */}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.docNum}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.itemCode}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.prodName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.ComponentItemCode}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.ComponentItemName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.ComponentPlannedQty}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.cardName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Stack direction="row" spacing={1}>
                          <Chip label={data.status}/>
                        </Stack>
                      </TableCell>
                      {/*  <TableCell component="th" scope="row" sx={{textAlign: 'left'}}>*/}
                      {/*    <IconButton>*/}
                      {/*      <DeleteIcon*/}
                      {/*        disabled={destroyJob.isSubmitting}*/}
                      {/*        onClick={() => {*/}
                      {/*          setItemToDelete(data._id);*/}
                      {/*          setDialogOpen(true);*/}
                      {/*        }}*/}
                      {/*      />*/}
                      {/*    </IconButton>*/}
                      {/*    <NextLink*/}
                      {/*      href={{*/}
                      {/*        pathname: '/job-assigning/job-edit',*/}
                      {/*        query: {jobId: data._id}*/}
                      {/*      }}*/}
                      {/*      passHref*/}
                      {/*    >*/}
                      {/*      <IconButton>*/}
                      {/*        <EditIcon/>*/}
                      {/*      </IconButton>*/}
                      {/*    </NextLink>*/}
                      {/*  </TableCell>*/}
                    </TableRow>
                  </NextLink>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Production List Found
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/*<ConfirmationDialog*/}
      {/*  open={isDialogOpen}*/}
      {/*  onClose={() => setDialogOpen(false)}*/}
      {/*  onConfirm={handleDeleteConfirm}*/}
      {/*  title="Confirm Delete"*/}
      {/*  message="Are you sure you want to delete this job?"*/}
      {/*/>*/}

    </>
  );
};

export default AllOperatorData;
