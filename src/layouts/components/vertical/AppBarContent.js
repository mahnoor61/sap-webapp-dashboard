import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import Menu from 'mdi-material-ui/Menu'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react' // top of your file


const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

// navbar in this file

const AppBarContent = props => {
  const [showImage, setShowImage] = useState(true) // inside AppBarContent

  // ** Props
  const {hidden, settings, saveSettings, toggleNavVisibility} = props


  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (

    <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <Box className='actions-left' sx={{mr: 2, display: 'flex', alignItems: 'center'}}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ml: -2.75, ...(hiddenSm ? {} : {mr: 3.5})}}
          >
            <Menu/>
          </IconButton>
        ) : null}
      </Box>
      <Box  sx={{display: 'flex', alignItems: 'center', width:'100%'}}>
        <Box
          component="img"
          width={200}
          height={'auto'}
          viewBox='0 0 30 23'
          sx={{
            display: { xs: 'none', lg: showImage ? 'block' : 'none' },
            pt: 2,
            maxHeight: 50,
            maxWidth: 50,
          }}
          alt="Sapp Webapp Logo"
          src={ `${WEB_URL}/logo.png`}

        />
        <Box className='actions-right' sx={{display:'flex', justifyContent:'flex-end', alignItems:'center', width:'100%'}}>
        <Tooltip title="Expand Navbar" arrow>
        <IconButton
          color='inherit'
          sx={{
            display: {lg:'block', xs:'none'}
          }}
          onClick={() => {
            toggleNavVisibility()
            setShowImage(prev => !prev)
          }}

          // onClick={toggleNavVisibility}
          // sx={{ml: -2.75, ...(hiddenSm ? {} : {mr: 3.5})}}
        >
          <Menu/>
        </IconButton>
        </Tooltip>
        <ModeToggler settings={settings} saveSettings={saveSettings}/>
        {/*<NotificationDropdown />*/}
        <UserDropdown/>
        </Box>
      </Box>
    </Box>
  )
}

export default AppBarContent
