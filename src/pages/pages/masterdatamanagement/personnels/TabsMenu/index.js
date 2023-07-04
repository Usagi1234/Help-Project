import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountTie from 'mdi-material-ui/AccountTie'
import Account from 'mdi-material-ui/Account'
import CollegiansTab from './Collegians'
import InstructorsTab from './Instructors'

// ** Demo Tabs Imports

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const IconHidden = styled('span')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.775rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    fontSize: '0.575rem'
  }
}))

const Tabs = ({ data }) => {
  const collegiansData = data.collegians
  const instructorsData = data.instructors

  const [value, setValue] = useState('collegians')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card sx={{ minWidth: 470 }}>
      <TabContext value={value || 'collegians'}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='collegians'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <Account />
                </IconHidden>
                <TabName>Collegians</TabName>
              </Box>
            }
          />
          <Tab
            value='instructors'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <AccountTie />
                </IconHidden>
                <TabName>Instructors</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='collegians'>
          <CollegiansTab data={collegiansData} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='instructors'>
          <InstructorsTab data={instructorsData} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Tabs
