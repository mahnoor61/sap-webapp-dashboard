import {useEffect, useState} from 'react'
import axios from 'axios';
import {useRouter} from 'next/router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import {styled, useTheme} from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import toast from 'react-hot-toast';
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/website/pages/auth/FooterIllustration'
import Head from "next/head";
import {useDispatch} from "react-redux";
import {login} from "../../slices/auth";

// ** Styled Components
// const Card = styled(MuiCard)(({theme}) => ({
//   [theme.breakpoints.up('sm')]: {width: '28rem'}
// }))
//
// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ResetPassword = () => {
  // ** State
  // const [values, setValues] = useState({
  //   password: '',
  //   confirmPassword: '',
  //   showPassword: false,
  //   showConfirmPassword: false
  // })
  //
  // const dispatch = useDispatch();
  //
  // // ** Hook
  // const router = useRouter()
  //
  // const handleClickShowConfirmPassword = () => {
  //   setValues({...values, showConfirmPassword: !values.showConfirmPassword});
  // };
  //
  //
  // const handleClickShowPassword = () => {
  //   setValues({...values, showPassword: !values.showPassword})
  // }
  //
  // const handleMouseDownPassword = event => {
  //   event.preventDefault()
  // }
  // const {token} = router.query;
  //
  //
  // const formik = useFormik({
  //   initialValues: {
  //     password: '',
  //     confirmPassword: '',
  //   },
  //   validationSchema: Yup.object({
  //     password: Yup.string().required('Password is required'),
  //     confirmPassword: Yup.string()
  //       .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //       .required('Confirm Password is required'),
  //   }),
  //   onSubmit: async (values, helpers) => {
  //     try {
  //       const apiEndpoint = `${BASE_URL}/api/tap/admin/resetPassword/`;
  //       const response = await axios.post(apiEndpoint, {token, ...values});
  //
  //       toast.success(`Password updated successfully!`)
  //       router.push('/login');
  //
  //       dispatch(login(response.data.data));
  //     } catch (err) {
  //       toast.error(err.response.data.msg);
  //       console.error(err)
  //     } finally {
  //       helpers.setSubmitting(false);
  //     }
  //   },
  // });
  //
  // const verifyToken = async () => {
  //   try {
  //
  //     if(!token) {
  //       throw new Error();
  //     }
  //
  //     const response = await axios.post(
  //       BASE_URL + "/api/tap/user/verifyToken",
  //       {
  //         token: token,
  //       }
  //     )
  //
  //     console.log(response)
  //   } catch (error) {
  //     toast.error("Invalid token!");
  //     console.log(error)
  //     router.push(`/error`);
  //   }
  // }
  //
  //
  // useEffect(() => {
  //   if(token) verifyToken();
  // }, [token]);

  return (
    <>
      {/*<Head>*/}
      {/*  <title>Reset Password - {themeConfig.templateName}</title>*/}
      {/*</Head>*/}
      {/*<Box className='content-center'>*/}
      {/*  <Card sx={{zIndex: 1}}>*/}
      {/*    <CardContent sx={{padding: theme => `${theme.spacing(12, 9, 7)} !important`}}>*/}
      {/*      <Box sx={{mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>*/}
      {/*        <Box*/}
      {/*          component="img"*/}
      {/*          width={35}*/}
      {/*          height={'auto'}*/}
      {/*          viewBox='0 0 30 23'*/}
      {/*          sx={{*/}
      {/*            maxHeight: {xs: 233, md: 167},*/}
      {/*            maxWidth: {xs: 350, md: 250},*/}
      {/*          }}*/}
      {/*          alt="Tecshield offical Logo"*/}
      {/*          src="/images/logos/tecLogo.png"*/}
      {/*        />*/}
      {/*        <Typography*/}
      {/*          variant='h6'*/}
      {/*          sx={{*/}
      {/*            ml: 3,*/}
      {/*            lineHeight: 1,*/}
      {/*            fontWeight: 600,*/}
      {/*            textTransform: 'uppercase',*/}
      {/*            fontSize: '1.5rem !important'*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          {themeConfig.templateName}*/}
      {/*        </Typography>*/}
      {/*      </Box>*/}
      {/*      <Box sx={{mb: 6}}>*/}
      {/*        <Typography variant='h5' sx={{fontWeight: 600, marginBottom: 1.5}}>*/}
      {/*          Just one step away! 👋🏻*/}
      {/*        </Typography>*/}
      {/*        <Typography variant='body2'>Set your new password and confirm it.</Typography>*/}
      {/*      </Box>*/}
      {/*      <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>*/}
      {/*        <FormControl fullWidth sx={{pb: 4}}>*/}
      {/*          <InputLabel htmlFor='password'>Password</InputLabel>*/}
      {/*          <OutlinedInput*/}
      {/*            label='Password'*/}
      {/*            id='password'*/}
      {/*            name='password'*/}
      {/*            error={Boolean(formik.touched.password && formik.errors.password)}*/}
      {/*            helperText={formik.touched.password && formik.errors.password}*/}
      {/*            onBlur={formik.handleBlur}*/}
      {/*            onChange={formik.handleChange}*/}
      {/*            value={formik.values.password}*/}
      {/*            type={values.showPassword ? 'text' : 'password'}*/}
      {/*            endAdornment=*/}
      {/*              {*/}
      {/*                <InputAdornment position='end'>*/}
      {/*                  <IconButton*/}
      {/*                    edge='end'*/}
      {/*                    onClick={handleClickShowPassword}*/}
      {/*                    onMouseDown={handleMouseDownPassword}*/}
      {/*                    aria-label='toggle password visibility'*/}
      {/*                  >*/}
      {/*                    {values.showPassword ? <EyeOutline/> : <EyeOffOutline/>}*/}
      {/*                  </IconButton>*/}
      {/*                </InputAdornment>*/}
      {/*              }/>*/}
      {/*        </FormControl>*/}

      {/*        <FormControl fullWidth sx={{pb: 4}}>*/}
      {/*          <InputLabel htmlFor='auth-reset-password'>Confirm Password</InputLabel>*/}
      {/*          <OutlinedInput*/}
      {/*            label='Confirm Password'*/}
      {/*            id='confirmPassword'*/}
      {/*            name='confirmPassword'*/}
      {/*            error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}*/}
      {/*            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}*/}
      {/*            onBlur={formik.handleBlur}*/}
      {/*            onChange={formik.handleChange}*/}
      {/*            value={formik.values.confirmPassword}*/}
      {/*            type={values.showConfirmPassword ? 'text' : 'password'}*/}
      {/*            endAdornment={*/}
      {/*              <InputAdornment position='end'>*/}
      {/*                <IconButton*/}
      {/*                  edge='end'*/}
      {/*                  onClick={handleClickShowConfirmPassword}*/}
      {/*                  onMouseDown={handleMouseDownPassword}*/}
      {/*                  aria-label='toggle confirmPassword visibility'*/}
      {/*                >*/}
      {/*                  {values.showConfirmPassword ? <EyeOutline/> : <EyeOffOutline/>}*/}
      {/*                </IconButton>*/}
      {/*              </InputAdornment>*/}
      {/*            }*/}
      {/*          />*/}
      {/*        </FormControl>*/}

      {/*        <Button fullWidth size='large' variant='contained' sx={{marginBottom: 7}} type='submit'*/}
      {/*                disabled={formik.isSubmitting}>*/}
      {/*          Submit*/}
      {/*        </Button>*/}
      {/*      </form>*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*  <FooterIllustrationsV1/>*/}
      {/*</Box>*/}
    </>
  )
}
ResetPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ResetPassword
