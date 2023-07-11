import React, { useEffect, useState } from 'react'
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText
} from '@mui/material'

const initialState = {
  subject_type_name: null,
  subject_category_name: null,
  subject_category_id: null
}

const initialValidationState = {
  subject_type_name: false,
  subject_category_name: false,
  subject_category_id: false
}

const SubjectTypeDialog = ({ open, handleClose, type, row, dropdown }) => {
  const router = useRouter()
  const [state, setState] = useState(initialState)
  const [validationState, setValidationState] = useState(initialValidationState)

  console.log(row)
  useEffect(() => console.log(state), [state])

  useEffect(() => {
    if (type === 'edit') {
      setState(pre => ({
        ...pre,
        subject_type_name: row.subject_type_name,
        subject_category_name: row.subject_category_name,
        subject_category_id: row.subject_category_id,
        subject_type_id: row.subject_type_id
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
          .post('http://111.223.38.19/api/method/frappe.API.MasterData.subject_type.insertsubject_type', state)
          .then(res => {
            console.log(res)

            console.log('Insert Successful information')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios
          .put('http://111.223.38.19/api/method/frappe.API.MasterData.subject_type.editsubject_type', state)
          .then(res => {
            console.log(res)

            console.log('Edit Successful information')
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
            {type === 'insert' && <CardHeader title='Add New Subject Type' titleTypographyProps={{ variant: 'h6' }} />}
            {type === 'edit' && <CardHeader title='Edit Subject Type' titleTypographyProps={{ variant: 'h6' }} />}
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      label='Type Name'
                      placeholder='Subject Type Name'
                      name='subject_type_name'
                      value={state.subject_type_name}
                      onChange={e => handleChange(e)}
                      error={validationState.subject_type_name}
                      helperText={validationState.subject_type_name ? 'โปรดกรอกข้อมูล' : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={3}>
                    <FormControl fullWidth error={validationState.subject_category_id}>
                      <InputLabel id='form-layouts-separator-select-label'>Category </InputLabel>
                      <Select
                        label='Country'
                        defaultValue=''
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                        value={state.subject_category_id || ''}
                        onChange={event => setState(pre => ({ ...pre, subject_category_id: event.target.value }))}
                      >
                        {dropdown?.map(list => (
                          <MenuItem
                            key={list.subject_category_id}
                            value={list.subject_category_id}
                            onClick={() =>
                              setState(pre => ({ ...pre, subject_category_name: list.subject_category_name }))
                            }
                          >
                            {list.subject_category_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{validationState.subject_category_id && 'โปรดกรอกข้อมูล'}</FormHelperText>
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

export default SubjectTypeDialog
