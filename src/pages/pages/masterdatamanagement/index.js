import { Box, Link } from '@mui/material'
import React from 'react'

function MaterDataPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <li>
        <Link href='academics'>Academics</Link>
      </li>
      <li>
        <Link href='curriculums'>Curriculums</Link>
      </li>
      <li>
        <Link href='personnels'>Personnels</Link>
      </li>
    </Box>
  )
}

export default MaterDataPage
