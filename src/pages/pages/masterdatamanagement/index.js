import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

function MaterDataPage() {
  const router = useRouter()
  const currentPath = router.pathname

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <li onClick={() => router.push(`${currentPath}/academics`)}>Academics</li>
      <li onClick={() => router.push(`${currentPath}/curriculums`)}>Curriculums</li>
      <li onClick={() => router.push(`${currentPath}/personnels`)}>Personnels</li>
    </Box>
  )
}

export default MaterDataPage
