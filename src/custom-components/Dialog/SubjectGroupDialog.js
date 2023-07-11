import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

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

const initialState = {
  sjg_name: null,
  subject_type_name: null,
  subject_type_id: null
}

const initialValidationState = {
  sjg_name: false,
  subject_type_name: false,
  subject_type_id: false
}

const SubjectGroupDialog = ({ open, handleClose, type, row, dropdown }) => {
  const router = useRouter()
  const [state, setState] = useState(initialState)
  const [validationState, setValidationState] = useState(initialValidationState)

  console.log(row)
  useEffect(() => console.log(state), [state])

  useEffect(() => {
    if (type === 'edit') {
      setState(row)
      console.log('type: ', type)
    } else {
      setState(initialState)
      console.log('type: ', type)
    }
  }, [row, type])

  const handleDialogClose = () => {
    handleClose()
    setValidationState(initialValidationState)
    setState(initialState)
    router.replace(router.asPath)
  }

  useEffect(() => {
    console.log('get: ', state)
  }, [state])

  const handleChange = e => {
    const { value } = e.target
    const filterData = ''
    filterData = value.replace(/^[A-Za-z0-9 ]+$/g, '')
    setState({ ...state, [e.target.name]: filterData })
  }

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleDialogClose} sx={{ minWidth: 400 }}>
      <DialogContent>
        <DialogContentText>
          <Card>
            <CardHeader title='Add New Subject Group' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      fullWidth
                      label='Group Name'
                      placeholder='Subject Group Name'
                      name='sjg_name'
                      error={validationState.sjg_name}
                      value={state.sjg_name || ''}
                      onChange={event => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>Subject Type</InputLabel>
                      <Select
                        label='Type'
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                        value={state.subject_type_id || ''}
                        onChange={e => setState(pre => ({ ...pre, subject_type_id: e.target.value }))}
                      >
                        {dropdown.map(subTypes => (
                          <MenuItem
                            key={subTypes.subject_type_id}
                            value={subTypes.subject_type_id}
                            onClick={() => setState(pre => ({ ...pre, subject_type_name: subTypes.subject_type_name }))}
                          >
                            {subTypes.subject_type_name}
                          </MenuItem>
                        ))}
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
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button variant='contained' onClick={handleClose}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubjectGroupDialog
