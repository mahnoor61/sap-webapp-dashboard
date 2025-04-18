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
import {AuthGuard} from "../../guard/authGuard";
import UserLayout from "../../layouts/UserLayout";
import {useSelector} from "react-redux";
import {roleContext} from "../../@core/context/getAllRoles";
import {mahineContext} from "../../@core/context/getAllMachines";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


const UserEdit = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const {roles, handleRolesChange, rolesDrop} = useContext(roleContext);
  const {machine, handleMachineChange, machineDrop} = useContext(mahineContext);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState('');
  const auth = useSelector(state => state.auth);
  const token = auth.token;

  useEffect(() => {
    const {userId} = router.query;
    if (userId) {
      setUserId(userId);

      const ReadUser = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/ap/admin/get/user/${userId}`, {
            headers: {
              "x-access-token": token
            }
          });
          const User = response.data.data;
          setUserData(User);

          formik.setValues({
            name: User.name,
            userName: User.userName,
            email: User.email,
            password: User.password,
            role: User.role,
            machine: User.machine,
          });
        } catch (error) {
          console.error('error in read user:', error);
          toast.error(error.response.data.msg);
        }
      };
      ReadUser();
    }
  }, [router.query]);



  //edit expertise
  const formik = useFormik({
    initialValues: {
      name: '',
      userName: '',
      email: '',
      password: '',
      role: '',
      machine: '',

    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      userName: Yup.string().required('username is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
      role: Yup.string().required('Role is required'),
      machine: Yup.string().required('Machine  is required'),
    }),
    onSubmit: async (values, helpers) => {

      try {
        const response = await axios.post(`${BASE_URL}/api/ap/admin/update/user/${userId}`, {
          name: values.name,
          userName: values.userName,
          email: values.email,
          password: values.password,
          role: values.role,
          machine: values.machine,
        }, {
          headers: {
            "x-access-token": token
          }
        });
        toast.success('User updated successfully.');
        formik.resetForm();
        setContent('')
      } catch (error) {
        console.log('error in edit USER api');
        toast.error(error.response.data.msg);
      }
    },
  });

  return (

    <>
      {userData && (

        // <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>

        <Card sx={{display: 'flex', AlignItem: 'center', justifyContent: 'center'}}>
          <CardContent sx={{width: '100%'}}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1} sx={{px: 5}}>
                <Typography variant="h5" component="div" sx={{my: 4}}>
                  Edit User
                </Typography>

                <TextField
                  fullWidth
                  sx={{my: 4, width: '100%'}}
                  label='Name'
                  placeholder='Name'
                  name="name"
                  type="text"
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <Box sx={{
                  display: 'flex',
                  width: '100%',
                  gap: 3,
                  flexDirection: {lg: 'row', md: 'column', xs: 'column', sm: 'column'}
                }}>
                  <TextField
                    fullWidth
                    sx={{my: 4, width: '100%'}}
                    label='Username'
                    placeholder='Username'
                    name="userName"
                    type="text"
                    error={Boolean(formik.touched.userName && formik.errors.userName)}
                    helperText={formik.touched.userName && formik.errors.userName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                  />
                  <TextField
                    fullWidth
                    sx={{my: 4, width: '100%'}}
                    label='Email'
                    placeholder='Email'
                    name="email"
                    type="email"
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <TextField
                    fullWidth
                    sx={{my: 4, width: '100%'}}
                    label='Reset Password'
                    placeholder='********'
                    name="password"
                    type="password"
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}

                    // value={formik.values.password}
                  />
                </Box>
                <Autocomplete
                  fullWidth
                  sx={{mb: 7}}
                  options={roles}
                  getOptionLabel={(option) => option.name} // Display name in dropdown
                  value={roles.find((role) => role._id === formik.values.role) || null} // Find selected role by ID
                  onChange={(event, value) => formik.setFieldValue('role', value ? value._id : '')} // Set ID in formik
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Role"
                      error={Boolean(formik.touched.role && formik.errors.role)}
                      helperText={formik.touched.role && formik.errors.role}
                    />
                  )}
                />
                <Autocomplete
                  fullWidth
                  sx={{mb: 7}}
                  options={machine}
                  getOptionLabel={(option) => option.code} // Display code in dropdown
                  value={machine.find((m) => m._id === formik.values.machine) || null} // Find selected machine by ID
                  onChange={(event, value) => formik.setFieldValue('machine', value ? value._id : '')} // Set ID in formikyping
                  // freeSolo // Allow typing new values
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Machine"
                      error={Boolean(formik.touched.machine && formik.errors.machine)}
                      helperText={formik.touched.machine && formik.errors.machine}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={formik.isSubmitting}
                  sx={{
                    padding: '14px 20px 14px 22px',
                    borderRadius: '8px',
                    mr: 5,
                    mt: 4,
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    backgroundColor: '#0563BB', '&:hover': {
                      backgroundColor: '#0AA4D2 !important'  // Updated hover color
                    }
                  }}
                >
                  Update
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>

        // </Box>
      )}
    </>
  );
};

UserEdit.getLayout = page => (
  <AuthGuard>
    <UserLayout>{page}</UserLayout>
  </AuthGuard>
)

export default UserEdit;
