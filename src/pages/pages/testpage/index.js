import { Box } from '@mui/material'
import React from 'react'
import CurriculumDialog from 'src/custom-components/Dialog/CurriculumDialog'
import SubjectDialog from 'src/custom-components/Dialog/SubjectDialog'
import SubjectGroupDialog from 'src/custom-components/Dialog/SubjectGroupDialog'

function TestPage() {
  return (
    <Box>
      <SubjectDialog open={false} />
      <CurriculumDialog open={false} />
      <SubjectGroupDialog open={true} />
    </Box>
  )
}

export default TestPage
