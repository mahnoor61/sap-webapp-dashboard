import axios from 'axios';
import {useRouter} from 'next/router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import {styled, useTheme} from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import toast from 'react-hot-toast';
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/website/pages/auth/FooterIllustration'
import Head from "next/head";
import {useDispatch} from "react-redux";
import {useFormik} from 'formik';
import * as yup from 'yup';

// ** Styled Components
const Card = styled(MuiCard)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {width: '28rem'}
}))

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ForgotPassword = () => {
  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //   },
  //   validationSchema: yup.object({
  //     email: yup.string().required('Email is required'),
  //   }),
  //   onSubmit: async (values, helpers) => {
  //     const loading = toast.loading('Sending reset password link...')
  //
  //     try {
  //       const apiEndpoint = `${BASE_URL}/api/tap/admin/forgetPassword`;
  //       await axios.post(apiEndpoint, values);
  //       toast.success(`Email successfully sent to: ${values.email}`)
  //     } catch (err) {
  //       toast.error("user not found");
  //       console.error(err)
  //       console.log(values)
  //     }
  //     toast.dismiss(loading);
  //   }
  // });

  return (
    <>
      {/*<Head>*/}
      {/*  <title>Forgot Password - {themeConfig.templateName}</title>*/}
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
      {/*          Don't Worry! Just 👋🏻*/}
      {/*        </Typography>*/}
      {/*        <Typography variant='body2'>Enter your registered email address and get a reset Password token on your email.</Typography>*/}
      {/*      </Box>*/}
      {/*      <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>*/}
      {/*        <TextField*/}
      {/*          autoFocus*/}
      {/*          fullWidth*/}
      {/*          id='email'*/}
      {/*          name='email'*/}
      {/*          label='Email'*/}
      {/*          value={formik.values.email}*/}
      {/*          onChange={formik.handleChange}*/}
      {/*          error={formik.touched.email && Boolean(formik.errors.email)}*/}
      {/*          helperText={formik.touched.email && formik.errors.email}*/}
      {/*          sx={{marginBottom: 4}}*/}
      {/*        />*/}
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
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
