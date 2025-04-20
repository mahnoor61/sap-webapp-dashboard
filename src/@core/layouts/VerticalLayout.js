// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Fab from '@mui/material/Fab'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Icons Imports
import ArrowUp from 'mdi-material-ui/ArrowUp'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Components
import AppBar from './components/vertical/appBar'
import Navigation from './components/vertical/navigation'
import Footer from './components/shared-components/footer'
import ScrollToTop from 'src/@core/components/scroll-to-top'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import IconButton from "@mui/material/IconButton";
import Menu from "mdi-material-ui/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

const VerticalLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex'
})

const MainContentWrapper = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const VerticalLayout = props => {
  // const {hidden, settings, saveSettings, toggleNavVisibility} = props

  // ** Hook

  // ** Props
  const { settings, children, scrollToTop } = props
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // ** Vars
  const { contentWidth } = settings
  const navWidth = themeConfig.navigationSize

  // ** States
  const [navVisible, setNavVisible] = useState(false)

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible)

  console.log("toggleNavVisibility", toggleNavVisibility)
  console.log("navVisible", navVisible)
  console.log("navWidth", navWidth)

  return (
    <>
      <VerticalLayoutWrapper className='layout-wrapper'>
        {/*<Box >*/}
        {/*<IconButton*/}
        {/*  color='inherit'*/}
        {/*  sx={{*/}
        {/*    display: {lg:'block', xs:'none'}*/}
        {/*  }}*/}
        {/*  onClick={toggleNavVisibility}*/}
        {/*  // sx={{ml: -2.75, ...(hiddenSm ? {} : {mr: 3.5})}}*/}
        {/*>*/}
        {/*  <Menu/>*/}
        {/*</IconButton>*/}
        {/*</Box>*/}
        <Box
          sx={{
            display: navVisible ? 'block' : 'none'
          }}
        >

        <Navigation
          navWidth={navWidth}
          navVisible={navVisible}
          setNavVisible={setNavVisible}
          toggleNavVisibility={toggleNavVisibility}
          {...props}
        />
        </Box>
        <MainContentWrapper className='layout-content-wrapper'>
          <AppBar toggleNavVisibility={toggleNavVisibility} {...props} />

          <ContentWrapper
            className='layout-page-content'
            sx={{
              ...(contentWidth === 'boxed' && {
                mx: 'auto',
                '@media (min-width:1440px)': { maxWidth: 1440 },
                '@media (min-width:1200px)': { maxWidth: '100%' }
              })
            }}
          >
            {children}
          </ContentWrapper>

          <Footer {...props} />

          <DatePickerWrapper sx={{ zIndex: 11 }}>
            <Box id='react-datepicker-portal'></Box>
          </DatePickerWrapper>
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <ArrowUp />
          </Fab>
        </ScrollToTop>
      )}
    </>
  )
}

export default VerticalLayout
