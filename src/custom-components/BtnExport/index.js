import React from 'react'
import { Typography } from '@mui/material'
import { IconButton } from '@mui/material'
import Icon from '@mdi/react'
import { mdiExportVariant } from '@mdi/js'

function ExportButton() {
  return (
    <IconButton sx={{ borderRadius: 2, px: 2 }}>
      <Icon path={mdiExportVariant} size={1} />
      <Typography variant='body2' sx={{ fontWeight: 'bold', mx: 1, mr: 2, pt: 1 }}>
        Export
      </Typography>
    </IconButton>
  )
}

export default ExportButton
