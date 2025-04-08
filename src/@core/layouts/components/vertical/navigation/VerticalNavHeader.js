// ** Next Import
import Link from 'next/link'
import { useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import {styled, useTheme} from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)(({theme}) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;

const VerticalNavHeader = props => {
  // ** Props
  const {verticalNavMenuBranding: userVerticalNavMenuBranding} = props
  const [isClient, setIsClient] = useState(false);

  const theme = useTheme()

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <MenuHeaderWrapper className='nav-header' sx={{pl: 6}}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        // <Link href='/' passHref>
          <StyledLink>
            <Box
              component="img"
              width={200}
              height={'auto'}
              viewBox='0 0 30 23'
              sx={{
                pt: 2,
                maxHeight: 50,
                maxWidth: 50,
              }}
              alt="Sapp Webapp Logo"
              src={window.localStorage.getItem('themeMode') === 'dark' ? `${WEB_URL}/logo.png` : `${WEB_URL}/logo.png`}

            />
            {/*<HeaderTitle variant='h6' sx={{ ml: 3 }}>*/}
            {/*  {themeConfig.templateName}*/}
            {/*</HeaderTitle>*/}
          </StyledLink>
        // </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
