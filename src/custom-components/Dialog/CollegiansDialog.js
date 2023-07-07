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
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import axios from 'axios'
import { useRouter } from 'next/router'
import { TextField } from '@mui/material'

const initialState = {
  ac_id: null,
  co_fname_th: null,
  co_lname_th: null,
  co_fname_en: null,
  co_lname_en: null,
  co_code: null,
  co_email: null,
  co_tel: null,
  curriculums_cur_id: null,
  faculty_institutes_fi_id: null
}

const initialInsertState = {
  ac_id: false,
  co_fname_th: false,
  co_lname_th: false,
  co_fname_en: false,
  co_lname_en: false,
  co_code: false,
  co_email: false,
  co_tel: false,
  curriculums_cur_id: false,
  faculty_institutes_fi_id: false
}

const CollegianDialog = ({ open, onClose, type, row }) => {
  const router = useRouter()
  const [dataAcademic, setDataAcademic] = useState([])
  const [dataFaculty, setDataFaculty] = useState([])
  const [dataCurriculum, setDataCurriculum] = useState([])
  const [state, setState] = useState(initialState)
  const [academicState, setAcademicState] = useState(true)
  const [insertState, setInsertState] = useState(initialInsertState)

  console.log('datarow: ', row)

  useEffect(() => {
    axios
      .get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllAcademics')
      .then(response => {
        setDataAcademic(response.data.message.Data)
        console.log('dataAC', response.data.message.Data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (type === 'edit') {
      setState(row)
      setAcademicState(false)
      console.log('type: ', type)
    } else {
      setState(initialState)
      setAcademicState(true)
      console.log('type: ', type)
    }
  }, [row, type])

  useEffect(() => {
    if (state.ac_id !== null) {
      const data = {
        ac_id: state.ac_id
      }
      console.log(data)
      axios
        .get('http://192.168.1.168:8000/api/method/frappe.help-api.getAllCurriculumandFacultyinoneacademic', {
          params: data
        })
        .then(res => {
          console.log(res)
          setDataFaculty(res.data.message.FacultyList)
          setDataCurriculum(res.data.message.CurriculumsList)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [state.ac_id])

  useEffect(() => {
    console.log('get: ', state)
  }, [state])

  // * สำหรับ ปิดหน้า Dialog
  const handleClose = () => {
    onClose()
    setInsertState(initialInsertState)
    setState(initialState)
    router.replace(router.asPath)
  }

  const handleChange = (e, type) => {
    const { value } = e.target
    const filterData = ''
    if (type === 'code') {
      filterData = value.replace(/(\d{3})(\d{3})(\d{4})/, '')
    }
    if (type === 'english') {
      filterData = value.replace(/[^a-z]/gi, '')
    }
    if (type === 'thai') {
      filterData = value.replace(/^[A-Za-z0-9 ]+$/g, '')
    }
    if (type === 'email') {
      // filterData = value.replace(/^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/g, '')
      filterData = value
    }
    if (type === 'tel') {
      filterData = value.replace(/[^\d.-]+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    }
    setState({ ...state, [e.target.name]: filterData })
  }

  // * สำหรับ Submit
  const handleSubmit = () => {
    const emptyKeys = Object.keys(state).filter(key => state[key] === null)
    if (emptyKeys.length > 0) {
      console.log('incomplete information')
      const updatedInsertState = emptyKeys.reduce((prev, key) => ({ ...prev, [key]: true }), {})
      setInsertState(prevState => ({ ...prevState, ...updatedInsertState }))
    } else {
      if (type === 'insert') {
        axios
          .post('http://192.168.1.168:8000/api/method/frappe.help-api.insertcollegian', state)
          .then(res => {
            console.log(res)
            console.log('Insert Successful information')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios
          .put('http://192.168.1.168:8000/api/method/frappe.help-api.editcollegian', state)
          .then(res => {
            console.log(res)
            console.log('Edit Successful information')
          })
          .catch(err => {
            console.log(err)
          })
      }
      onClose(false)
      setInsertState(initialInsertState)
      setState(initialState)
      router.replace(router.asPath)
    }
  }

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
      <DialogContent>
        <Card>
          {type === 'insert' && <CardHeader title='Add New Collegian' titleTypographyProps={{ variant: 'h6' }} />}
          {type === 'edit' && <CardHeader title='Edit Collegian' titleTypographyProps={{ variant: 'h6' }} />}
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Academic</InputLabel>
                  <Select
                    error={insertState.ac_id}
                    value={state.ac_id || ''}
                    onChange={e => {
                      setState(pre => ({ ...pre, ac_id: e.target.value }))
                    }}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                  >
                    {dataAcademic.map(data => (
                      <MenuItem key={data.ac_id} value={data.ac_id}>
                        {data.ac_name_th}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-multiple-select-label'>Faculty Institutes</InputLabel>
                  <Select
                    error={insertState.fi_id}
                    disabled={academicState}
                    value={state.fi_id || ''}
                    onChange={e => setState(pre => ({ ...pre, faculty_institutes_fi_id: e.target.value }))}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                  >
                    {dataFaculty?.map(data => (
                      <MenuItem key={data.fi_id} value={data.fi_id}>
                        {data.fi_name_th}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-multiple-select-label'>Curriculum</InputLabel>
                  <Select
                    error={insertState.cur_id}
                    disabled={academicState}
                    value={state.cur_id || ''}
                    onChange={e => setState(pre => ({ ...pre, curriculums_cur_id: e.target.value }))}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                  >
                    {dataCurriculum?.map(data => (
                      <MenuItem key={data.cur_id} value={data.cur_id}>
                        {data.cur_name_th}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Collegian Code'
                  placeholder='0123456789'
                  name='co_code'
                  error={insertState.co_code}
                  value={state.co_code || ''}
                  onChange={() => handleChange(event, 'thai')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='First Name (TH)'
                  name='co_fname_th'
                  placeholder='Leonard'
                  error={insertState.co_fname_th}
                  value={state.co_fname_th || ''}
                  onChange={() => handleChange(event, 'thai')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Last Name (TH)'
                  placeholder='Leonard'
                  name='co_lname_th'
                  error={insertState.co_lname_th}
                  value={state.co_lname_th || ''}
                  onChange={() => handleChange(event, 'thai')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='First Name (EN)'
                  name='co_fname_en'
                  placeholder='Leonard'
                  error={insertState.co_fname_en}
                  value={state.co_fname_en || ''}
                  onChange={() => handleChange(event, 'english')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Last Name (EN)'
                  placeholder='Carter'
                  name='co_lname_en'
                  error={insertState.co_lname_en}
                  value={state.co_lname_en || ''}
                  onChange={() => handleChange(event, 'english')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='carterleonard@gmail.com'
                  name='co_email'
                  error={insertState.co_email}
                  value={state.co_email || ''}
                  onChange={() => handleChange(event, 'email')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Phone No.'
                  placeholder='+1-123-456-8790'
                  name='co_tel'
                  error={insertState.co_tel}
                  value={state.co_tel || ''}
                  onChange={() => handleChange(event, 'tel')}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
        </Card>
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

export default CollegianDialog
