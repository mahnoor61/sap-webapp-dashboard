import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import toast from 'react-hot-toast'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { useFormik } from 'formik'
import * as yup from 'yup'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/website/pages/auth/FooterIllustration'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { login } from '../../slices/auth'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const CompanyDB = process.env.NEXT_PUBLIC_COMPANY_DB
const Password = process.env.NEXT_PUBLIC_COMPANY_PASSWORD
const UserName = process.env.NEXT_PUBLIC_COMPANY_USERNAME
const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL

const LoginPage = () => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const validationSchema = yup.object({
    userName: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  })

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        const apiEndpoint = `${BASE_URL}/api/ap/admin/login`
        const response = await axios.post(apiEndpoint, values)
        const loginData = response.data.data


        try {
          // const sapResponse = await axios.post(loginUrl, sapLoginData)
          const sapResponse = await axios.post(`${BASE_URL}/api/ap/sap/login`, {
            CompanyDB: CompanyDB,
            Password: Password,
            UserName: UserName
          })
          

          if (!sapResponse.data.data.SessionId) {
            throw new Error('SAP Login Failed: No SessionId received.')
          }
          const sessionId = sapResponse.data.data.SessionId

          // Cookies.set('sessionId', sessionId, {expires: 7, path: '/'});

          loginData.sessionId = sessionId
          dispatch(login(loginData))

          toast.success('Successfully logged in!')
          if (loginData.role === 'admin') {
            router.push('/user-management')
          } else {
            router.push('/account-settings')
          }
        } catch (err) {
          toast.error(err.response?.data?.msg || 'Login failed')
          console.error('Login Error:', err.response?.data.msg)
          formik.resetForm()
        }
      }
  )

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: async (values) => {

  //     try {

  //       const apiEndpoint = `${BASE_URL}/api/ap/admin/login`;
  //       const response = await axios.post(apiEndpoint, values);
  //       const loginData = response.data.data;
  //       toast.success(`Successfully logged in!`)
  //       if (loginData.role === "admin") {
  //                   router.push("/user-management");
  //                 } else {
  //                   router.push("/operator");
  //                 }

  //       dispatch(login(response.data.data));
  //     } catch (err) {
  //       toast.error(err.response.data.msg);
  //       console.error(err)
  //     }
  //   },
  // });

  return (
    <>
      <Head>
        <title>Login - {themeConfig.templateName}</title>
      </Head>
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box
                component='img'
                height={'auto'}
                viewBox='0 0 30 23'
                sx={{
                  maxHeight: { xs: 50, md: 50 },
                  maxWidth: { xs: 100, md: 100 }
                }}
                alt='Logo'
                src='/logo.png'
              />

              <Typography
                variant='h6'
                sx={{
                  ml: 1,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.3rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Welcome to {themeConfig.templateName}! 👋🏻
              </Typography>
              <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
              <TextField
                autoFocus
                fullWidth
                id='userName'
                name='userName'
                label='Username'
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
                sx={{ marginBottom: 4 }}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  id='auth-login-password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box
                sx={{
                  mb: 4,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel control={<Checkbox />} label='Remembe Me' />
                {/*<Link passHref href='/forgot-password'>*/}
                {/*    <LinkStyled>Forgot Password?</LinkStyled>*/}
                {/*</Link>*/}
              </Box>
              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{
                  marginBottom: 7,
                  backgroundColor: '#0563BB',
                  '&:hover': {
                    backgroundColor: '#0AA4D2 !important' // Updated hover color
                  }
                }}
                type='submit'
                disabled={formik.isSubmitting}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
        <FooterIllustrationsV1 />
      </Box>
    </>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
