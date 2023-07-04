import React from 'react'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

const Path = ({ name, path }) => {
  return (
    <Grid container direction={'row'} item xs={12} spacing={2}>
      <Grid item xs={6}>
        <Typography ml={2} sx={{ fontSize: { xs: 14, md: 14, lg: 16 } }}>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={6} textAlign={'end'}>
        <Typography mr={4} sx={{ fontSize: { xs: 14, md: 14, lg: 16 } }}>
          {path}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Path
