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
import Book from 'mdi-material-ui/Book'
import BookOpenOutline from 'mdi-material-ui/BookOpenOutline'
import TextBoxOutline from 'mdi-material-ui/TextBoxOutline'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import FileDocument from 'mdi-material-ui/FileDocument'

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
  const subjectGroups = data[2].subjectGroups
  const subjectTypes = data[3].subjectTypes
  const subjectCategories = data[4].subjectCategories

  // const { curriculums, subjects, subjectGroups, subjectTypes, subjectCategory } = data

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
                  <Book />
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
                  <BookOpenOutline />
                </IconHidden>
                <TabName>Subjects</TabName>
              </Box>
            }
          />
          <Tab
            value='SubjectsGroups'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <TextBoxOutline />
                </IconHidden>
                <TabName>Subjects Groups</TabName>
              </Box>
            }
          />
          <Tab
            value='SubjectsTypes'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <FileDocumentOutline />
                </IconHidden>
                <TabName>Subjects Types</TabName>
              </Box>
            }
          />
          <Tab
            value='SubjectsCategory'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconHidden>
                  <FileDocument />
                </IconHidden>
                <TabName>Subjects Category</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='curriculums'>
          <CurriculumsTab data={curriculums} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='Subjects'>
          <SubjectsTab data={subjects} subjectGroups={subjectGroups} curriculums={curriculums} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='SubjectsGroups'>
          <SubjectGroupsTab data={subjectGroups} dataDropdown={subjectTypes} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='SubjectsTypes'>
          <SubjectTypesTab data={subjectTypes} dataDropdown={subjectCategories} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='SubjectsCategory'>
          <SubjectCategoriesTab data={subjectCategories} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Tabs
