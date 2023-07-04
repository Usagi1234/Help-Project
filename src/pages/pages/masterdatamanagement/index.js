import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import React from 'react'

function MaterDataPage() {
  const router = useRouter()
  const currentPath = router.pathname

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }}
        onClick={() => router.push(`${currentPath}/academics`)}
      >
        Academics
      </Typography>
      <Typography
        sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }}

        // onClick={() => router.push(`${currentPath}/curriculums`)}
      >
        Curriculums
      </Typography>
      <Typography
        sx={{ cursor: 'pointer', '&:hover': { color: 'blue' } }}
        onClick={() => router.push(`${currentPath}/personnels`)}
      >
        Personnels
      </Typography>
    </Box>
  )
}

export default MaterDataPage
