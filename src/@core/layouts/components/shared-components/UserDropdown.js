// ** React Imports
import {useState, Fragment} from 'react'

// ** Next Import
import {useRouter} from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import {logout} from "../../../../slices/auth";
import {useDispatch, useSelector} from "react-redux";

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

// ** Styled Components

const BadgeContentSpan = styled('span')(({theme}) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);


  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const router = useRouter()

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    router.push('/')
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ml: 2, cursor: 'pointer'}}
        badgeContent={<BadgeContentSpan/>}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        <Avatar
          alt='User'
          onClick={handleDropdownOpen}
          sx={{width: 40, height: 40}}
          src={`${WEB_URL}/default.webp`}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{'& .MuiMenu-paper': {width: 230, marginTop: 4}}}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <Box sx={{pt: 2, pb: 3, px: 4}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan/>}
              anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
              <Avatar alt='user name' src={`${WEB_URL}/default.webp`}
                      sx={{width: '2.5rem', height: '2.5rem'}}/>
            </Badge>
            <Box sx={{display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column'}}>
              <Typography sx={{fontWeight: 600}}>{auth.user.name}</Typography>
            </Box>
          </Box>
        </Box>
        <MenuItem sx={{py: 2}} onClick={() => handleLogout()}>
          <LogoutVariant sx={{marginRight: 2, fontSize: '1.375rem', color: 'text.secondary'}}/>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
