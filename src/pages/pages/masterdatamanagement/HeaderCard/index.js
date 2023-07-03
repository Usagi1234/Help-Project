import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import React from 'react'
import Icon from '@mdi/react'
import { mdiDatabaseCogOutline } from '@mdi/js'

const IconGrid = ({ mdiIcon }) => {
  return (
    <Grid item xs={1.5} minWidth={100}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Icon path={mdiIcon} size={1.5} />
        </CardContent>
      </Card>
    </Grid>
  )
}

const HeaderCard = ({ setSubMenu, setTabValues }) => {
  const changeMenu = event => {
    const { value } = event.target
    setSubMenu(value)
    setTabValues('')
  }

  return (
    <Card sx={{ my: 4, minWidth: 470 }}>
      <CardContent>
        <Grid container item xs={12} spacing={2}>
          <IconGrid mdiIcon={mdiDatabaseCogOutline} />
          <Grid item xs={4} sm={4} md={2} lg={2} mx={{ xs: 2, sm: 4, md: 4, lg: 4 }} my={2}>
            <Typography variant='h6'>Master Data</Typography>
            <Typography variant='body2' sx={{ lineHeight: 1 }}>
              Description
            </Typography>
          </Grid>
          <Grid item xs={3} sm={4} md={6} lg={6} mx={4} my={2}>
            <FormControl>
              <RadioGroup
                onChange={changeMenu}
                row
                defaultValue='academics'
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 18
                  }
                }}
              >
                <FormControlLabel value='academics' control={<Radio />} label={<Typography>academics</Typography>} />
                <FormControlLabel
                  value='curriculums'
                  control={<Radio />}
                  label={<Typography>curriculums</Typography>}
                />
                <FormControlLabel value='personnels' control={<Radio />} label={<Typography>personnels</Typography>} />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default HeaderCard
