import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import {styled} from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import AddBoxIcon from '@mui/icons-material/AddBox'
import 'react-datepicker/dist/react-datepicker.css'
import {AuthGuard} from '../../guard/authGuard'
import UserLayout from '../../layouts/UserLayout'
import ArticleIcon from '@mui/icons-material/Article'
import Head from 'next/head'
import AllQuality from 'src/views/Quality Control/AllQuality'
import Printing from 'src/views/Quality Control/Printing'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DieCutting from "../../views/Quality Control/DieCutting";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import LayersIcon from '@mui/icons-material/Layers';
import Laminating from "../../views/Quality Control/Laminating";
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Pasting from "../../views/Quality Control/Pasting";
import Food from "../../views/Quality Control/Food";
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

const Tab = styled(MuiTab)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({theme}) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Quality = () => {
  // ** State
  const [value, setValue] = useState('Printing')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Head>
        <title>Job | Admin</title>
      </Head>
      {/*<Box sx={{ height:'100%', display:'flex', alignItems:'center', width:'100%'}}>*/}
      <Card sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%'}}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{borderBottom: theme => `1px solid ${theme.palette.divider}`}}
          >
            {/* <Tab
              value='AllQuality'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArticleIcon />
                  <TabName>All</TabName>
                </Box>
              }
            /> */}
            <Tab
              value='Printing'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <AddCircleOutlineIcon/>
                  <TabName sx={{fontSize: '12px'}}>Printing</TabName>
                </Box>
              }
            />
            <Tab
              value='Die Cutting'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <ContentCutIcon/>
                  <TabName sx={{fontSize: '12px'}}>Die Cutting</TabName>
                </Box>
              }
            />
            <Tab
              value='Laminating'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <LayersIcon/>
                  <TabName sx={{fontSize: '12px'}}>Laminating</TabName>
                </Box>
              }
            />
            <Tab
              value='Pasting'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <ContentPasteGoIcon/>
                  <TabName sx={{fontSize: '12px'}}>Pasting</TabName>
                </Box>
              }
            />
            <Tab
              value='Food'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <LocalPharmacyIcon/>
                  <TabName sx={{fontSize: '12px'}}>Food</TabName>
                </Box>
              }
            />
          </TabList>
          <TabPanel sx={{p: 0}} value='AllQuality'>
            <AllQuality/>
          </TabPanel>
          <TabPanel sx={{p: 0}} value='Printing'>
            <Printing/>
          </TabPanel>
          <TabPanel sx={{p: 0}} value='Die Cutting'>
            <DieCutting/>
          </TabPanel>
          <TabPanel sx={{p: 0}} value='Laminating'>
            <Laminating/>
          </TabPanel>
          <TabPanel sx={{p: 0}} value='Pasting'>
           <Pasting/>
          </TabPanel>
          <TabPanel sx={{p: 0}} value='Food'>
           <Food/>
          </TabPanel>
        </TabContext>
      </Card>
      {/*</Box>*/}
    </>
  )
}

Quality.getLayout = page => (
  <AuthGuard>
    <UserLayout>{page}</UserLayout>
  </AuthGuard>
)

export default Quality
