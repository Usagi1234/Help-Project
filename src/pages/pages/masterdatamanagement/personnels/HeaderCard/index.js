import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import Icon from '@mdi/react'
import { mdiDatabaseCogOutline } from '@mdi/js'

const IconGrid = ({ mdiIcon }) => {
  return (
    <Grid item xs={1.5} minWidth={100}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Icon color={'orange'} path={mdiIcon} size={1.5} />
        </CardContent>
      </Card>
    </Grid>
  )
}

const HeaderCard = () => {
  return (
    <Card sx={{ my: 4, minWidth: 470 }}>
      <CardContent>
        <Grid container item xs={12} spacing={2}>
          <IconGrid mdiIcon={mdiDatabaseCogOutline} />
          <Grid item xs={4} sm={4} md={2} lg={2} mx={{ xs: 2, sm: 4, md: 4, lg: 4 }} my={2}>
            <Typography variant='h6'>Personnels</Typography>
            <Typography variant='body2' sx={{ lineHeight: 1 }}>
              Description
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default HeaderCard
