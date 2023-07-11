import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'
import axios from 'axios'

const SubjectsDialog = ({ open, handleClose, subject, subjectGroups, Dialogtype, curriculums }) => {
  const router = useRouter()
  // console.log('subjectGroups', subjectGroups)

  const initialState = {
    sj_code: '',
    sj_name_th: '',
    sj_name_en: '',
    sj_theory_credit: '1',
    sj_action_credit: '1',
    sj_ot_credit: '1',
    sj_credit: '3',
    sj_description: 'none',
    subject_group_sjg_id: '',
    curriculums_cur_id: '',
    sj_chiles: 'none',
    sj_parents: 'none'
  }

  const initialStateAlert = {
    sj_code: false,
    sj_name_th: false,
    sj_name_en: false,
    subject_group_sjg_id: false,
    curriculums_cur_id: false,
    sj_description: false
  }

  const [state, setState] = useState(initialState)

  const [stateAlert, setStateAlert] = useState(initialStateAlert)

  const [dropDown, setDropDown] = useState({
    subjectgroups: subjectGroups,
    curriculums: curriculums
  })

  const [tricker, setTricker] = useState(false)

  useEffect(() => {
    if (open) {
      if (Dialogtype === 'insert') {
        setState(initialState)
      } else {
        setState(subject)
      }
      setStateAlert(initialStateAlert)
    }
  }, [open])

  // useEffect(() => {
  //   console.log(state)
  // }, [state])

  useEffect(() => {
    const fetchMenuDropdown = async () => {
      const queryCurriculums = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.curriculum.getAllcurriculums`)
      const resCurriculums = await queryCurriculums.json()
      setDropDown({ ...dropDown, curriculums: resCurriculums.message.Data })
    }
    fetchMenuDropdown()
  }, [])

  // useEffect(() => {
  //   console.log('Dropdown', dropDown)
  // }, [dropDown])

  const handleCloseModi = () => {
    handleClose(false)
    setState(initialState)
    setStateAlert(initialStateAlert)
  }

  const handleChange = (e, type) => {
    const { value } = e.target
    const filterData = ''
    if (type === 'english') {
      filterData = value.replace(/[^a-z]/gi, '')
    } else if (type === 'thai') {
      filterData = value.replace(/^[A-Za-z0-9 ]+$/g, '')
    } else if (type === 'code') {
      filterData = value.replace(/[^a-z0-9]*$/i, '')
    } else {
      filterData = value
    }
    setState({ ...state, [e.target.name]: filterData })
  }

  const handleInsert = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API}.MasterData.subject.insertsubject`, state)
      .then(function (response) {
        // console.log(response.message)
      })
      .catch(function (error) {
        // console.log(error)
      })
      .finally(() => {
        handleCloseModi()
        router.replace(router.asPath, undefined, { sroll: false })
      })
  }

  const handleUpdate = () => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API}.MasterData.subject.editsubject`, state)
      .then(function (response) {
        // console.log(response.message)
      })
      .catch(function (error) {
        // console.log(error)
      })
      .finally(() => {
        handleCloseModi()
        router.replace(router.asPath, undefined, { sroll: false })
      })
  }

  const ValidationsForm = () => {
    if (
      stateAlert.sj_code === false &&
      stateAlert.sj_name_th === false &&
      stateAlert.sj_name_en === false &&
      stateAlert.sj_description === false &&
      stateAlert.subject_group_sjg_id === false &&
      stateAlert.curriculums_cur_id === false
    ) {
      if (Dialogtype === 'insert') {
        handleInsert()
      } else {
        handleUpdate()
      }
    } else {
      // console.log('please fill all!')
    }
  }

  const AlertForm = key => {
    switch (key) {
      case 'sj_code':
        if (state.sj_code !== '') {
          setStateAlert(pre => ({ ...pre, sj_code: false }))
        } else {
          setStateAlert(pre => ({ ...pre, sj_code: true }))
        }
        break
      case 'sj_name_th':
        if (state.sj_name_th !== '') {
          setStateAlert(pre => ({ ...pre, sj_name_th: false }))
        } else {
          setStateAlert(pre => ({ ...pre, sj_name_th: true }))
        }
        break
      case 'sj_name_en':
        if (state.sj_name_en !== '') {
          setStateAlert(pre => ({ ...pre, sj_name_en: false }))
        } else {
          setStateAlert(pre => ({ ...pre, sj_name_en: true }))
        }
        break
      case 'subject_group_sjg_id':
        if (state.subject_group_sjg_id !== '') {
          setStateAlert(pre => ({ ...pre, subject_group_sjg_id: false }))
        } else {
          setStateAlert(pre => ({ ...pre, subject_group_sjg_id: true }))
        }
        break
      case 'curriculums_cur_id':
        if (state.curriculums_cur_id !== '') {
          setStateAlert(pre => ({ ...pre, curriculums_cur_id: false }))
        } else {
          setStateAlert(pre => ({ ...pre, curriculums_cur_id: true }))
        }
        break
      case 'sj_description':
        if (state.sj_description !== '') {
          setStateAlert(pre => ({ ...pre, sj_description: false }))
        } else {
          setStateAlert(pre => ({ ...pre, sj_description: true }))
        }
        break
      default:
      // console.log('Error')
    }
  }

  const handleSubmit = () => {
    Object.keys(stateAlert).forEach(key => {
      // console.log(key)
      AlertForm(key)
    })
    setTricker(true)
  }

  useEffect(() => {
    if (tricker) {
      ValidationsForm()
      setTricker(false)
    }
  }, [tricker])

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleCloseModi} sx={{ minWidth: 400 }}>
      <DialogContent>
        {/* //////////////////////////////////////////////////////////////////////////////// */}
        <Card>
          {Dialogtype === 'insert' ? (
            <CardHeader title='Add New Subject' titleTypographyProps={{ variant: 'h6' }} />
          ) : (
            <CardHeader title='Edit Subject' titleTypographyProps={{ variant: 'h6' }} />
          )}

          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name='sj_code'
                  error={stateAlert.sj_code}
                  value={state.sj_code || ''}
                  onChange={e => handleChange(e, 'code')}
                  fullWidth
                  label='Code'
                  placeholder='Subject Code'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={stateAlert.sj_name_th}
                  name='sj_name_th'
                  value={state.sj_name_th || ''}
                  onChange={e => handleChange(e, 'thai')}
                  fullWidth
                  label='Thai Name'
                  placeholder='Thai Name'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={stateAlert.sj_name_en}
                  name='sj_name_en'
                  value={state.sj_name_en || ''}
                  onChange={e => handleChange(e, 'english')}
                  fullWidth
                  label='English Name'
                  placeholder='English Name'
                />
              </Grid>
              <Grid item xs={12} sm={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel>Credit</InputLabel>
                  <Select
                    name='sj_credit'
                    value={state.sj_credit || ''}
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
              <Grid item xs={12} sm={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel>Theory</InputLabel>
                  <Select
                    name='sj_theory_credit'
                    value={state.sj_theory_credit || ''}
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
              <Grid item xs={12} sm={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel>Action</InputLabel>
                  <Select
                    name='sj_action_credit'
                    value={state.sj_action_credit || ''}
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
              <Grid item xs={12} sm={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel>OverTime</InputLabel>
                  <Select
                    name='sj_ot_credit'
                    value={state.sj_ot_credit || ''}
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
                <FormControl fullWidth error={stateAlert.subject_group_sjg_id}>
                  <InputLabel id='form-layouts-separator-select-label'>Group</InputLabel>
                  <Select
                    name='subject_group_sjg_id'
                    value={state.subject_group_sjg_id || ''}
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={e => setState(pre => ({ ...pre, subject_group_sjg_id: e.target.value }))}
                  >
                    {dropDown?.subjectgroups.map(sjg => (
                      <MenuItem key={sjg.sjg_id} value={sjg.sjg_id}>
                        {sjg.sjg_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <FormControl fullWidth error={stateAlert.curriculums_cur_id}>
                  <InputLabel id='form-layouts-separator-select-label'>Curriculum</InputLabel>
                  <Select
                    name='curriculums_cur_id'
                    value={state.curriculums_cur_id || ''}
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={e => setState(pre => ({ ...pre, curriculums_cur_id: e.target.value }))}
                  >
                    {dropDown?.curriculums.map(curri => (
                      <MenuItem key={curri.cur_id} value={curri.cur_id}>
                        {curri.cur_name_th}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={stateAlert.sj_description}
                  name='sj_description'
                  value={state.sj_description || ''}
                  onChange={e => handleChange(e, '')}
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
        <Button onClick={handleCloseModi}>Cancel</Button>
        <Button variant='contained' onClick={() => handleSubmit()}>
          {Dialogtype === 'insert' ? 'Submit' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubjectsDialog
