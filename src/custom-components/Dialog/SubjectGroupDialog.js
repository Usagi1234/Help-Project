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
import axios from 'axios'

const initialState = {
  sjg_name: null,
  co_fname_th: null
}

const initialValidationState = {
  sjg_name: false,
  co_fname_th: false
}

const SubjectGroupDialog = ({ open, handleClose, type, row, Dropdown }) => {
  const router = useRouter()
  const [state, setState] = useState(initialState)
  const [validationState, setValidationState] = useState(initialValidationState)

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

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleDialogClose} sx={{ minWidth: 400 }}>
      <DialogContent>
        <DialogContentText>
          {/* //////////////////////////////////////////////////////////////////////////////// */}
          <Card>
            <CardHeader title='Add New Subject Group' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={7}>
                    <TextField fullWidth label='Group Name' placeholder='Subject Group Name' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>Subject Type</InputLabel>
                      <Select
                        label='Type'
                        defaultValue=''
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                      >
                        {Dropdown?.map(subTypes => (
                          <MenuItem key={subTypes.subject_type_id} value={subTypes.subject_type_id}>
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
          {/* /////////////////////////////////////////////////////////////////////////// */}
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
