import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import {styled, useTheme} from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import toast from 'react-hot-toast';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from "react-redux";
import {AuthGuard} from "../../guard/authGuard";
import UserLayout from "../../layouts/UserLayout";

// ** Styled Components
const Card = styled(MuiCard)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {width: '28rem'}
}));

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const UpdatePassword = () => {
  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
    showOldPassword: false,
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleClickShowOldPassword = () => {
    setValues({...values, showOldPassword: !values.showOldPassword});
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const auth = useSelector(state => state.auth);
  const token = auth.token;

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Old password is required'),
      newPassword: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await axios.post(`${BASE_URL}/api/ap/admin/changePassword`, values, {
          headers: {
            "x-access-token": token
          }
        });

        toast.success(`Password updated successfully!`);
        formik.resetForm();
      } catch (err) {
        toast.error(err.response.data.msg);
        console.error(err);
        formik.resetForm();
      } finally {
        helpers.setSubmitting(false);
        formik.resetForm();
      }
    },
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{py: 15}}>
      {/*<Box sx={{mb: 6}}>*/}
      {/*  <Typography variant='h5' sx={{fontWeight: 600, marginRight: 15}}>*/}
      {/*    Just one step away! 👋🏻*/}
      {/*  </Typography>*/}
      {/*  <Typography variant='body2'>Update your password and confirm it.</Typography>*/}
      {/*</Box>*/}

      <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>

        <FormControl fullWidth sx={{pb: 4}}>
          <InputLabel htmlFor='password'>Old Password</InputLabel>
          <OutlinedInput
            label='oldPassword'
            id='oldPassword'
            name='oldPassword'
            error={Boolean(formik.touched.oldPassword && formik.errors.oldPassword)}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.oldPassword}
            type={values.showOldPassword ? 'text' : 'password'}
            endAdornment=
              {
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    {values.showOldPassword ? <EyeOutline/> : <EyeOffOutline/>}
                  </IconButton>
                </InputAdornment>
              }/>
        </FormControl>

        <FormControl fullWidth sx={{pb: 4}}>
          <InputLabel htmlFor='password'>New Password</InputLabel>
          <OutlinedInput
            label='Password'
            id='newPassword'
            name='newPassword'
            error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            type={values.showPassword ? 'text' : 'password'}
            endAdornment=
              {
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    {values.showPassword ? <EyeOutline/> : <EyeOffOutline/>}
                  </IconButton>
                </InputAdornment>
              }/>
        </FormControl>

        <Button
          fullWidth size='large'
          variant='contained'
          sx={{
            marginBottom: 7, backgroundColor: '#0563BB', '&:hover': {
              backgroundColor: '#0AA4D2 !important'  // Updated hover color
            },
          }}
          type='submit'
          disabled={formik.isSubmitting}>
          Update Password
        </Button>
      </form>
    </Box>
  );
};

UpdatePassword.getLayout = page => (
  <AuthGuard>
    <UserLayout>{page}</UserLayout>
  </AuthGuard>
);

export default UpdatePassword;
