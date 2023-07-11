import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const CurriculumDialog = ({ open, handleClose }) => {
  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
      <DialogContent>
        {/* //////////////////////////////////////////////////////////////////////////////// */}
        <Card>
          <CardHeader title='Add New Curriculum' titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <form onSubmit={e => e.preventDefault()}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Thai Name' placeholder='Thai Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='English Name' placeholder='English Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Thai Short Name' placeholder='Thai Short Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='English Short Name' placeholder='English Short Name' />
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Department</InputLabel>
                    <Select
                      label='Country'
                      defaultValue=''
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                    >
                      <MenuItem value='Computer Engineering'>Computer Engineering</MenuItem>
                      <MenuItem value='University 2'>University 2</MenuItem>
                      <MenuItem value='University 3'>University 3</MenuItem>
                      <MenuItem value='University 4'>University 4</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Faculty institute</InputLabel>
                    <Select
                      label='Country'
                      defaultValue=''
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                    >
                      <MenuItem value='คณะวิศวกรรมศาสตร์'>คณะวิศวกรรมศาสตร์</MenuItem>
                      <MenuItem value='University 2'>University 2</MenuItem>
                      <MenuItem value='University 3'>University 3</MenuItem>
                      <MenuItem value='University 4'>University 4</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} lg={3}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Release year</InputLabel>
                    <Select
                      label='Country'
                      defaultValue=''
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                    >
                      <MenuItem value='University 1'>2562</MenuItem>
                      <MenuItem value='University 2'>2563</MenuItem>
                      <MenuItem value='University 3'>2564</MenuItem>
                      <MenuItem value='University 4'>2565</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
          </form>
        </Card>
        {/* /////////////////////////////////////////////////////////////////////////// */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleClose}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CurriculumDialog
