import { Box } from '@mui/material'
import React from 'react'
import CurriculumDialog from 'src/custom-components/Dialog/CurriculumDialog'
import SubjectCategoryDialog from 'src/custom-components/Dialog/SubjectCategoryDialog'
import SubjectDialog from 'src/custom-components/Dialog/SubjectDialog'
import SubjectGroupDialog from 'src/custom-components/Dialog/SubjectGroupDialog'
import SubjectTypeDialog from 'src/custom-components/Dialog/SubjectTypeDialog'

function TestPage() {
  return (
    <Box>
      <SubjectDialog open={false} />
      <CurriculumDialog open={false} />
      <SubjectGroupDialog open={false} />
      <SubjectTypeDialog open={false} />
      <SubjectCategoryDialog open={true} />
    </Box>
  )
}

export default TestPage
