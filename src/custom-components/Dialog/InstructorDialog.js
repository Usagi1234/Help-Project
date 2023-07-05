import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
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

const InstrcutorDialog = ({ instructor, open, handleClose, handleSubmit, type }) => {
  const [state, setState] = useState({
    ist_fname_th: '',
    ist_lname_th: '',
    ist_fname_en: '',
    ist_lname_en: '',
    ist_email: '',
    ist_tel: '',
    faculty_institutes_fi_id: ''
  })

  const handleChange = (e, type) => {
    const { value } = e.target
    const filterData = ''
    if (type === 'english') {
      filterData = value.replace(/[^a-z]/gi, '')
    }
    if (type === 'thai') {
      filterData = value.replace(/^[A-Za-z0-9 ]+$/g, '')
    }
    if (type === 'email') {
      // ทำต่อถ้ากด Submit ให้เช็คว่า email ถูก format รึเปล่าถ้าไม่ให้เตือนว่าผิด
      // filterData = value.replace(/^w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g, '')
      filterData = value
    }
    if (type === 'tel') {
      filterData = value.replace(/[^\d.-]+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    }

    setState({ ...state, [e.target.name]: filterData })
  }

  if (type === 'edit' && instructor !== undefined) {
    setState(instructor)
  }

  // console.log(state)

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
      <DialogContent>
        <Card>
          {type === 'insert' && <CardHeader title='Add New Instructor' titleTypographyProps={{ variant: 'h6' }} />}
          {type === 'edit' && <CardHeader title='Edit Instructor' titleTypographyProps={{ variant: 'h6' }} />}
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={state.ist_fname_th}
                  fullWidth
                  label='First Name (TH)*'
                  placeholder='Thai First Name'
                  name='ist_fname_th'
                  onChange={e => handleChange(e, 'thai')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={state.ist_lname_th}
                  fullWidth
                  label='Last Name (TH)*'
                  placeholder='Thai Last Name'
                  name='ist_lname_th'
                  onChange={e => handleChange(e, 'thai')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={state.ist_fname_en}
                  fullWidth
                  label='First Name (ENG)*'
                  placeholder='English First Name'
                  name='ist_fname_en'
                  onChange={e => handleChange(e, 'english')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={state.ist_lname_en}
                  fullWidth
                  label='Last Name (ENG)*'
                  placeholder='English Last Name'
                  name='ist_lname_en'
                  onChange={e => handleChange(e, 'english')}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  value={state.ist_tel}
                  fullWidth
                  label='Telephone*'
                  placeholder='+66 98-687-7856'
                  name='ist_tel'
                  onChange={e => handleChange(e, 'tel')}
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={state.ist_email}
                  type='email'
                  fullWidth
                  label='Email*'
                  placeholder='....@hotmail.com'
                  name='ist_email'
                  onChange={e => handleChange(e, 'email')}
                />
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
          <Divider />
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant='contained'
          onClick={() =>
            function () {
              handleSubmit()
            }
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InstrcutorDialog
