import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountGroup from 'mdi-material-ui/AccountGroup'
import TableAccount from 'mdi-material-ui/TableAccount'
import SchoolOutline from 'mdi-material-ui/SchoolOutline'
import School from 'mdi-material-ui/School'

// ** Demo Tabs Imports
import AcademicsTab from './Academics'

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

const Tabs = ({ data, subMenu, tabValues }) => {
  const academicsData = data.academics
  const academicsTypeData = data.academictype
  const facultyData = data.faculty

  const [value, setValue] = useState(tabValues)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card sx={{ minWidth: 470 }}>
      <TabContext value={value || 'academics'}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='academics'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <School />
                </IconHidden>
                <TabName>ACADEMICS</TabName>
              </Box>
            }
          />
          <Tab
            value='academic_types'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <SchoolOutline />
                </IconHidden>
                <TabName>ACADEMIC TYPES</TabName>
              </Box>
            }
          />
          <Tab
            value='faculty_institutes'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <AccountGroup />
                </IconHidden>
                <TabName>Faculty Institutes</TabName>
              </Box>
            }
          />
          <Tab
            value='departments'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <TableAccount />
                </IconHidden>
                <TabName>Departments</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='academics'>
          <AcademicsTab data={academicsData} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='academic_types'>
          academic_types
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='faculty_institutes'>
          faculty_institutes
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='departments'>
          departments
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Tabs
