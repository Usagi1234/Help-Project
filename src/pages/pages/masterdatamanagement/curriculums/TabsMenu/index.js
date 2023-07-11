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
import SubjectsTab from './Subjects'
import SubjectGroupsTab from './SubjectGroups'
import SubjectTypesTab from './SubjectTypes'
import SubjectCategoriesTab from './SubjectCategories'

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
  const curriculums = data[0].curriculums
  const subjects = data[1].subjects
  const subjectgroups = data[2].subjectgroups
  const subjecttypes = data[3].subjecttypes
  const subjectcategories = data[4].subjectcategories

  const [value, setValue] = useState('')

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
          <Tab
            value='Subjects'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <School />
                </IconHidden>
                <TabName>Subjects</TabName>
              </Box>
            }
          />
          <Tab
            value='Subjects-Groups'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <School />
                </IconHidden>
                <TabName>Subjects Groups</TabName>
              </Box>
            }
          />
          <Tab
            value='Subjects-Types'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <School />
                </IconHidden>
                <TabName>Subjects Types</TabName>
              </Box>
            }
          />
          <Tab
            value='Subjects-Category'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <School />
                </IconHidden>
                <TabName>Subjects Category</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='curriculums'>
          <CurriculumsTab data={curriculums} />
          curriculums
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='Subjects'>
          <SubjectsTab data={subjects} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='Subjects-Groups'>
          <SubjectGroupsTab data={subjectgroups} />
          subjects groups
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='Subjects-Types'>
          <SubjectTypesTab data={subjecttypes} />
          subjects types
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='Subjects-Category'>
          <SubjectCategoriesTab data={subjectcategories} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Tabs
