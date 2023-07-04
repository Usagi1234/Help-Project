import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
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

const InsertDialog = ({ open, handleClose, handleSubmit, type }) => {
  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
      <DialogContent>
        <DialogContentText>
          <Card>
            {type === 'insert' && <CardHeader title='Add New Instructor' titleTypographyProps={{ variant: 'h6' }} />}
            {type === 'edit' && <CardHeader title='Edit Instructor' titleTypographyProps={{ variant: 'h6' }} />}
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='First Name (TH)*' placeholder='Thai First Name' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Last Name (TH)*' placeholder='Thai Last Name' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='First Name (ENG)*' placeholder='English First Name' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Last Name (ENG)*' placeholder='English Last Name' />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Telephone*' placeholder='+66 98-687-7856' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Email*' placeholder='....@hotmail.com' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>Faculty Institutes</InputLabel>
                      <Select
                        label='Category'
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
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InsertDialog
