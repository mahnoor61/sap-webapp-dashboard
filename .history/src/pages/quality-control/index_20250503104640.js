import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import AddBoxIcon from '@mui/icons-material/AddBox'
import 'react-datepicker/dist/react-datepicker.css'
import { AuthGuard } from '../../guard/authGuard'
import UserLayout from '../../layouts/UserLayout'
import ArticleIcon from '@mui/icons-material/Article'
import Head from 'next/head'
import AllQuality from 'src/views/Quality Control/AllQuality'
import AddQuality from 'src/views/Quality Control/Printing'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Quality = () => {
  // ** State
  const [value, setValue] = useState('AddJobAssigning')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Head>
        <title>Job | Admin</title>
      </Head>
      {/*<Box sx={{ height:'100%', display:'flex', alignItems:'center', width:'100%'}}>*/}
      <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='AllJobAssigning'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArticleIcon />
                  <TabName>All Job Assigning</TabName>
                </Box>
              }
            />
            <Tab
              value='AddJobAssigning'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AddBoxIcon />
                  <TabName>Add Job Assigning</TabName>
                </Box>
              }
            />
          </TabList>
          <TabPanel sx={{ p: 0 }} value='AllJobAssigning'>
            <AllQuality />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value='AddQuality'>
            <AddQuality />
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
