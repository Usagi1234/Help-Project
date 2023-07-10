import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

// ** MUI Imports
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

const SubjectTypeDialog = ({ open, handleClose, header }) => {
  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* //////////////////////////////////////////////////////////////////////////////// */}
          <Card>
            <CardHeader title='Add New Subject Type' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={8}>
                    <TextField fullWidth label='Type Name' placeholder='Subject Type Name' />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={3}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>Category </InputLabel>
                      <Select
                        label='Country'
                        defaultValue=''
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                      >
                        <MenuItem value='University 1'>University 1</MenuItem>
                        <MenuItem value='University 2'>University 2</MenuItem>
                        <MenuItem value='University 3'>University 3</MenuItem>
                        <MenuItem value='University 4'>University 4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider sx={{ margin: 0 }} />
            </form>
          </Card>
          {/* /////////////////////////////////////////////////////////////////////////// */}
        </DialogContentText>
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

export default SubjectTypeDialog
