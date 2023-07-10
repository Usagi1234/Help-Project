import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/router'

const SubjectsDialog = ({ open, handleClose, subject, subjectGroups }) => {
  const router = useRouter()
  // console.log('subjectGroups', subjectGroups)

  const initialState = {
    sj_code: '',
    sj_name_th: '',
    sj_name_en: '',
    subject_group_sjg_id: '',
    sj_theory_credit: '1',
    sj_action_credit: '1',
    sj_ot_credit: '1',
    sj_credit: '1',
    sj_description: ''
  }

  const initialStateAlert = {
    sj_code: false,
    sj_name_th: false,
    sj_name_en: false,
    subject_group_sjg_id: false,
    sj_theory_credit: false,
    sj_action_credit: false,
    sj_ot_credit: false,
    sj_credit: false,
    sj_description: false
  }

  const [state, setState] = useState(initialState)
  const [editState, setEditState] = useState(subject)

  const [stateAlert, setStateAlert] = useState({ initialStateAlert })

  const [dropDown, setDropDown] = useState(subjectGroups)

  const [tricker, setTricker] = useState(false)

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
      <DialogContent>
        {/* //////////////////////////////////////////////////////////////////////////////// */}
        <Card>
          <CardHeader title='Add New Subject ( Curriculum 25NN Name)' titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={state.sj_name_th}
                  onChange={e => setState(pre => ({ ...pre, sj_name_th: e.target.value }))}
                  fullWidth
                  label='Thai Name'
                  placeholder='Thai Name'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={state.sj_name_en}
                  onChange={e => setState(pre => ({ ...pre, sj_name_en: e.target.value }))}
                  fullWidth
                  label='English Name'
                  placeholder='English Name'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={state.sj_code}
                  onChange={e => setState(pre => ({ ...pre, sj_code: e.target.value }))}
                  fullWidth
                  label='Code'
                  placeholder='Subject Code'
                />
              </Grid>
              <Grid item xs={12} sm={3} lg={1.5}>
                <FormControl fullWidth>
                  <InputLabel>Credit</InputLabel>
                  <Select
                    value={state.sj_credit || '1'}
                    defaultValue='1'
                    onChange={e => setState(pre => ({ ...pre, sj_credit: e.target.value }))}
                  >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='6'>6</MenuItem>
                    <MenuItem value='7'>7</MenuItem>
                    <MenuItem value='8'>8</MenuItem>
                    <MenuItem value='9'>9</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} lg={1.5}>
                <FormControl fullWidth>
                  <InputLabel>Theory</InputLabel>
                  <Select
                    value={state.sj_theory_credit || '1'}
                    defaultValue='1'
                    onChange={e => setState(pre => ({ ...pre, sj_theory_credit: e.target.value }))}
                  >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='6'>6</MenuItem>
                    <MenuItem value='7'>7</MenuItem>
                    <MenuItem value='8'>8</MenuItem>
                    <MenuItem value='9'>9</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} lg={1.5}>
                <FormControl fullWidth>
                  <InputLabel>Action</InputLabel>
                  <Select
                    value={state.sj_action_credit || '1'}
                    defaultValue='1'
                    onChange={e => setState(pre => ({ ...pre, sj_action_credit: e.target.value }))}
                  >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='6'>6</MenuItem>
                    <MenuItem value='7'>7</MenuItem>
                    <MenuItem value='8'>8</MenuItem>
                    <MenuItem value='9'>9</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} lg={1.5}>
                <FormControl fullWidth>
                  <InputLabel>OverTime</InputLabel>
                  <Select
                    value={state.sj_ot_credit || '1'}
                    defaultValue='1'
                    onChange={e => setState(pre => ({ ...pre, sj_ot_credit: e.target.value }))}
                  >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='6'>6</MenuItem>
                    <MenuItem value='7'>7</MenuItem>
                    <MenuItem value='8'>8</MenuItem>
                    <MenuItem value='9'>9</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Group</InputLabel>
                  <Select
                    value={state.subject_group_sjg_id}
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={e => setState(pre => ({ ...pre, subject_group_sjg_id: e.target.value }))}
                  >
                    {dropDown?.map(sjg => (
                      <MenuItem key={sjg.sjg_id} value={sjg.sjg_id}>
                        {sjg.sjg_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={state.sj_description}
                  onChange={e => setState(pre => ({ ...pre, sj_description: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                  label='Description'
                  placeholder='............'
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
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

export default SubjectsDialog
