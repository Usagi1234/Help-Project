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
import { FormHelperText } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'

const InstrcutorDialog = ({ instructor, open, handleClose, Dialogtype }) => {
  const router = useRouter()

  const initialState = {
    ist_fname_th: '',
    ist_lname_th: '',
    ist_fname_en: '',
    ist_lname_en: '',
    ist_email: '',
    ist_tel: '',
    faculty_institutes_fi_id: ''
  }
  const [state, setState] = useState(initialState)
  const [editState, setEditState] = useState(instructor)

  const [stateAlert, setStateAlert] = useState({
    ist_fname_th: false,
    ist_lname_th: false,
    ist_fname_en: false,
    ist_lname_en: false,
    ist_email: false,
    ist_tel: false,
    faculty_institutes_fi_id: false
  })

  const [dropDown, setDropDown] = useState({
    faculty: []
  })

  useEffect(() => {
    const fetchMenuDropdown = async () => {
      const queryFaculty = await fetch(`${process.env.NEXT_PUBLIC_API}frappe.help-api.getAllfacultys`)
      const resFaculty = await queryFaculty.json()
      setDropDown({ ...dropDown, faculty: resFaculty.message.Data })
    }
    fetchMenuDropdown()
  }, [])

  useEffect(() => {
    console.log('Dropdown', dropDown)
  }, [dropDown])

  const handleInsert = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API}frappe.help-api.insertinstructors`, state)
      .then(function (response) {
        console.log(response.message)
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(() => {
        handleCloseModi()
        router.replace(router.asPath, undefined, { sroll: false })
      })
  }

  const handleUpdate = () => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API}frappe.help-api.editinstructor`, editState)
      .then(function (response) {
        console.log(response.message)
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(() => {
        handleCloseModi()
        router.replace(router.asPath, undefined, { sroll: false })
      })
  }

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
    if (Dialogtype === 'insert') {
      setState({ ...state, [e.target.name]: filterData })
    } else {
      setEditState({ ...editState, [e.target.name]: filterData })
    }
  }

  const handleChangeDropdown = e => {
    if (Dialogtype === 'insert') {
      setState({ ...state, faculty_institutes_fi_id: e.target.value })
    } else {
      setEditState({ ...editState, faculty_institutes_fi_id: e.target.value })
    }
  }

  const handleCloseModi = () => {
    handleClose(false)
    setState(initialState)
  }

  const ValidationsForm = () => {
    if (
      stateAlert.ist_fname_th === false ||
      stateAlert.ist_lname_th === false ||
      stateAlert.ist_fname_en === false ||
      stateAlert.ist_lname_en === false ||
      stateAlert.ist_email === false ||
      stateAlert.ist_tel === false ||
      stateAlert.faculty_institutes_fi_id === false
    ) {
      if (Dialogtype === 'insert') {
        handleInsert()
      } else {
        handleUpdate()
      }
    } else {
      console.log('please fill all!')
    }
  }

  const AlertForm = key => {
    if (Dialogtype === 'insert') {
      switch (key) {
        case 'ist_fname_th':
          if (state.ist_fname_th !== '') {
            setStateAlert(pre => ({ ...pre, ist_fname_th: false }))
          } else {
            setStateAlert(pre => ({ ...pre, ist_fname_th: true }))
          }
          break
        case 'ist_lname_th':
          if (state.ist_lname_th !== '') {
            setStateAlert(pre => ({ ...pre, ist_lname_th: false }))
          } else {
            setStateAlert(pre => ({ ...pre, ist_lname_th: true }))
          }
          break
        case 'ist_fname_en':
          if (state.ist_fname_en !== '') {
            setStateAlert(pre => ({ ...pre, ist_fname_en: false }))
          } else {
            setStateAlert(pre => ({ ...pre, ist_fname_en: true }))
          }
          break
        case 'ist_lname_en':
          if (state.ist_lname_en !== '') {
            setStateAlert(pre => ({ ...pre, ist_lname_en: false }))
          } else {
            setStateAlert(pre => ({ ...pre, ist_lname_en: true }))
          }
          break
        case 'ist_tel':
          if (state.ist_tel !== '' && state.ist_tel.length === 12) {
            setStateAlert(pre => ({ ...pre, ist_tel: false }))
          } else {
            setStateAlert(pre => ({ ...pre, ist_tel: true }))
          }
          break
        case 'ist_email':
          if (state.ist_email !== '') {
            if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(state.ist_email)) {
              setStateAlert(pre => ({ ...pre, ist_email: true }))
            } else {
              setStateAlert(pre => ({ ...pre, ist_email: false }))
            }
          } else {
            setStateAlert(pre => ({ ...pre, ist_email: true }))
          }
          break
        case 'faculty_institutes_fi_id':
          if (state.faculty_institutes_fi_id !== '') {
            setStateAlert(pre => ({ ...pre, faculty_institutes_fi_id: false }))
          } else {
            setStateAlert(pre => ({ ...pre, faculty_institutes_fi_id: true }))
          }
          break
        default:
          console.log('Error')
      }
    } else {
      switch (key) {
        case 'ist_fname_th':
          if (editState.ist_fname_th !== '') {
            setStateAlert(pre => ({ ...pre, ist_fname_th: false }))
          } else {
            setStateAlert(pre => ({ ...pre, ist_fname_th: true }))
          }
          break
        case 'ist_lname_th':
          if (editState.ist_lname_th !== '') {
            setStateAlert(pre => ({ ...pre, ist_lname_th: false }))
          } else {
            setStateAlert(pre => ({ ...pre, ist_lname_th: true }))
          }
          break
        case 'ist_fname_en':
          if (editState.ist_fname_en !== '') {
            setStateAlert(pre => ({ ...pre, ist_fname_en: false }))
          } else {
            setStateAlert(pre => ({ ...pre, ist_fname_en: true }))
          }
          break
        case 'ist_lname_en':
          if (editState.ist_lname_en !== '') {
            setStateAlert(pre => ({ ...pre, ist_lname_en: false }))
          } else {
            setStateAlert(pre => ({ ...pre, ist_lname_en: true }))
          }
          break
        case 'ist_tel':
          if (editState.ist_tel !== '' && editState.ist_tel.length === 12) {
            setStateAlert(pre => ({ ...pre, ist_tel: false }))
          } else {
            setStateAlert(pre => ({ ...pre, ist_tel: true }))
          }
          break
        case 'ist_email':
          if (editState.ist_email !== '') {
            if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(editState.ist_email)) {
              setStateAlert(pre => ({ ...pre, ist_email: true }))
            } else {
              setStateAlert(pre => ({ ...pre, ist_email: false }))
            }
          } else {
            setStateAlert(pre => ({ ...pre, ist_email: true }))
          }
          break
        case 'faculty_institutes_fi_id':
          if (editState.faculty_institutes_fi_id !== '') {
            setStateAlert(pre => ({ ...pre, faculty_institutes_fi_id: false }))
          } else {
            setStateAlert(pre => ({ ...pre, faculty_institutes_fi_id: true }))
          }
          break
        default:
          console.log('Error')
      }
    }
  }

  const handleSubmit = () => {
    Object.keys(state).forEach(key => {
      // console.log(key)
      AlertForm(key)
    })
    ValidationsForm()
  }

  useEffect(() => {
    setEditState(instructor)
  }, [instructor])

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleCloseModi} sx={{ minWidth: 400 }}>
      <DialogContent>
        <Card>
          {Dialogtype === 'insert' && (
            <CardHeader title='Add New Instructor' titleTypographyProps={{ variant: 'h6' }} />
          )}
          {Dialogtype === 'edit' && <CardHeader title='Edit Instructor' titleTypographyProps={{ variant: 'h6' }} />}
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  helperText={stateAlert.ist_fname_th && 'Please fill first name'}
                  error={stateAlert.ist_fname_th}
                  value={Dialogtype === 'insert' ? state.ist_fname_th : editState.ist_fname_th}
                  fullWidth
                  label='First Name (TH)*'
                  placeholder='Thai First Name'
                  name='ist_fname_th'
                  onChange={e => handleChange(e, 'thai')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  helperText={stateAlert.ist_lname_th && 'Please fill last name'}
                  error={stateAlert.ist_lname_th}
                  value={Dialogtype === 'insert' ? state.ist_lname_th : editState.ist_lname_th}
                  fullWidth
                  label='Last Name (TH)*'
                  placeholder='Thai Last Name'
                  name='ist_lname_th'
                  onChange={e => handleChange(e, 'thai')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  helperText={stateAlert.ist_fname_en && 'Please fill first name'}
                  error={stateAlert.ist_fname_en}
                  value={Dialogtype === 'insert' ? state.ist_fname_en : editState.ist_fname_en}
                  fullWidth
                  label='First Name (ENG)*'
                  placeholder='English First Name'
                  name='ist_fname_en'
                  onChange={e => handleChange(e, 'english')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  helperText={stateAlert.ist_lname_en && 'Please fill last name'}
                  error={stateAlert.ist_lname_en}
                  value={Dialogtype === 'insert' ? state.ist_lname_en : editState.ist_lname_en}
                  fullWidth
                  label='Last Name (ENG)*'
                  placeholder='English Last Name'
                  name='ist_lname_en'
                  onChange={e => handleChange(e, 'english')}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  helperText={stateAlert.ist_tel && 'Please fill tell'}
                  error={stateAlert.ist_tel}
                  value={Dialogtype === 'insert' ? state.ist_tel : editState.ist_tel}
                  fullWidth
                  label='Telephone*'
                  placeholder='098-687-7856'
                  name='ist_tel'
                  onChange={e => handleChange(e, 'tel')}
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  helperText={stateAlert.ist_email && 'Invalid email format'}
                  error={stateAlert.ist_email}
                  value={Dialogtype === 'insert' ? state.ist_email : editState.ist_email}
                  type='email'
                  fullWidth
                  label='Email*'
                  placeholder='....@hotmail.com'
                  name='ist_email'
                  onChange={e => handleChange(e, 'email')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={stateAlert.faculty_institutes_fi_id}>
                  <InputLabel id='form-layouts-separator-select-label'>Faculty Institutes</InputLabel>
                  <Select
                    value={
                      Dialogtype === 'insert' ? state.faculty_institutes_fi_id : editState.faculty_institutes_fi_id
                    }
                    label='Category'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    onChange={handleChangeDropdown}
                  >
                    {dropDown.faculty?.map(faculty => (
                      <MenuItem key={faculty.fi_id} value={faculty.fi_id}>
                        {faculty.fi_name_th + '(' + faculty.ac_name_th + ' ' + faculty.ac_campus + ')'}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{stateAlert.faculty_institutes_fi_id && 'Please select faculty'}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
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

export default InstrcutorDialog
