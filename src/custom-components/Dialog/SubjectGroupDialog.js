import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import axios from 'axios'

// ** MUI Imports
import {
  Card,
  Grid,
  Divider,
  MenuItem,
  TextField,
  CardHeader,
  InputLabel,
  CardContent,
  FormControl,
  Select,
  FormHelperText
} from '@mui/material'

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
      setState(pre => ({
        ...pre,
        sjg_name: row.sjg_name,
        subject_type_name: row.subject_type_name,
        subject_type_id: row.subject_type_id,
        sjg_id: row.sjg_id
      }))
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

  const handleChange = e => {
    const { value } = e.target
    const filterData = ''
    filterData = value.replace(/^[A-Za-z0-9 ]+$/g, '')
    setState({ ...state, [e.target.name]: filterData })
  }

  const handleSubmit = () => {
    const emptyKeys = Object.keys(state).filter(key => state[key] === null || state[key].length === 0)
    if (emptyKeys.length > 0) {
      console.log('incomplete information')
      const updatedInsertState = emptyKeys.reduce((prev, key) => ({ ...prev, [key]: true }), {})
      setValidationState(prevState => ({ ...prevState, ...updatedInsertState }))
    } else {
      if (type === 'insert') {
        axios
          .post('http://111.223.38.19/api/method/frappe.API.MasterData.subject_groups.insertsubject_groups', state)
          .then(res => {
            console.log(res)

            // console.log('Insert Successful information')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios
          .put('http://111.223.38.19/api/method/frappe.API.MasterData.subject_groups.editsubject_groups', state)
          .then(res => {
            console.log(res)

            // console.log('Edit Successful information')
          })
          .catch(err => {
            console.log(err)
          })
      }
      handleDialogClose()
    }
  }

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleDialogClose} sx={{ minWidth: 400 }}>
      <DialogContent>
        <DialogContentText>
          <Card>
            {type === 'insert' && <CardHeader title='Add New Subject Group' titleTypographyProps={{ variant: 'h6' }} />}
            {type === 'edit' && <CardHeader title='Edit Subject Group' titleTypographyProps={{ variant: 'h6' }} />}
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
                      helperText={validationState.sjg_name ? 'โปรดกรอกข้อมูล' : ''}
                      error={validationState.sjg_name}
                      value={state.sjg_name || ''}
                      onChange={event => handleChange(event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={validationState.subject_type_id}>
                      <InputLabel id='form-layouts-separator-select-label'>Subject Type</InputLabel>
                      <Select
                        label='Type'
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                        value={state.subject_type_id || ''}
                        error={validationState.subject_type_id}
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
                      <FormHelperText>{validationState.subject_type_id && 'โปรดกรอกข้อมูล'}</FormHelperText>
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
        <Button variant='contained' onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubjectGroupDialog
