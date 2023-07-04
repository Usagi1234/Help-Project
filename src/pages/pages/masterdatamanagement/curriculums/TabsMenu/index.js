import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import School from 'mdi-material-ui/School'

// ** Demo Tabs Imports
import CurriculumsTab from './Curriculums'

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
      <TabContext value={value || 'curriculums'}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='curriculums'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <School />
                </IconHidden>
                <TabName>Curriculums</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='curriculums'>
          <CurriculumsTab data={academicsData} />
          curriculums
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Tabs
