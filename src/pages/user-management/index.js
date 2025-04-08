import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import {styled} from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import AddBoxIcon from '@mui/icons-material/AddBox';
import 'react-datepicker/dist/react-datepicker.css'
import {AuthGuard} from "../../guard/authGuard";
import UserLayout from "../../layouts/UserLayout";
import ArticleIcon from "@mui/icons-material/Article";
import Head from "next/head";
import AddUser from "../../views/User Management/AddUser";
import AddRole from "../../views/User Management/AddRole";
import AddMachine from "../../views/User Management/AddMachine";
import AllUsers from "../../views/User Management/AllUser";
import AddRoutes from "../../views/User Management/AddRoutes";


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

const Users = () => {
  // ** State
  const [value, setValue] = useState('AddUser')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Head>
        <title>
          Users | Admin
        </title>
      </Head>
      {/*<Box sx={{ height:'100%', display:'flex', alignItems:'center', width:'100%'}}>*/}
      <Card sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%'}}>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{borderBottom: theme => `1px solid ${theme.palette.divider}`}}
          >
            <Tab
              value='AddUser'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <ArticleIcon/>
                  <TabName>Add Users</TabName>
                </Box>
              }
            />
            <Tab
              value='AllUser'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <ArticleIcon/>
                  <TabName>All Users</TabName>
                </Box>
              }
            />
            <Tab
              value='AddRoles'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <ArticleIcon/>
                  <TabName>Add Roles</TabName>
                </Box>
              }
            />
            <Tab
              value='AddMachines'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <ArticleIcon/>
                  <TabName>Add Machines</TabName>
                </Box>
              }
            />
            <Tab
              value='AddRoutes'
              label={
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <ArticleIcon/>
                  <TabName>Add Routes</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{p: 0}} value='AddUser'>
            <AddUser/>
          </TabPanel>
          <TabPanel sx={{p: 0}} value='AllUser'>
            <AllUsers/>
            {/*<AddUser/>*/}
          </TabPanel>
          <TabPanel sx={{p: 0}} value='AddRoles'>
            <AddRole/>
          </TabPanel>
          <TabPanel sx={{p: 0}} value='AddMachines'>
            <AddMachine/>
          </TabPanel>
          <TabPanel sx={{p: 0}} value='AddRoutes'>
            <AddRoutes/>
          </TabPanel>
        </TabContext>
      </Card>
      {/*</Box>*/}
    </>
  )
}

Users.getLayout = page => (
  <AuthGuard>
    <UserLayout>{page}</UserLayout>
  </AuthGuard>
)

export default Users
