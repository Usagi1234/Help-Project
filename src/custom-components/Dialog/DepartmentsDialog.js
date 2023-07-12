// ** React Import
import React, { useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Axios Import
import axios from 'axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

const DepartmentsDialog = ({ open, handleClose, type, DataInRow }) => {
  const Route = useRouter()

  // console.log('Data IN ROW', DataInRow)

  // State variables =================================
  const [nameTH, setNameTH] = useState('')
  const [nameEN, setNameEN] = useState('')
  const [faculty, setFaculty] = useState('')

  // State array =====================================
  const [checkError, setCheckError] = useState({})

  const [dropDown, setDropDown] = useState({
    faculty: []
  })

  // handle =========================================
  const handleChange = (e, key, type) => {
    const { value } = e.target
    let updatedValue = value
    if (type === 'th') {
      updatedValue = updatedValue.replace(/[^ก-๙เ\s]/g, '')
      setNameTH(updatedValue)
    } else if (type === 'en') {
      updatedValue = updatedValue.replace(/[^a-zA-Z\s]/g, '')
      setNameEN(updatedValue)
    }
  }

  const handleCheckEmpty = () => {
    // เช็คว่า ตัวแปร เป็นค่าว่าง ถ้า ว่าง = true
    const emptys = {
      nameTH: nameTH.trim() === '',
      nameEN: nameEN.trim() === '',
      faculty: faculty.trim() === ''
    }
    setCheckError(emptys)
  }

  const handleRestore = () => {
    // ปิด Dialog
    {
      handleClose()
    }

    // ทำให้ TextField ไม่แดง ตอนออกจาก Dialog
    setCheckError({
      nameTH: false,
      nameEN: false,
      faculty: false
    })

    // ถ้ากดปุ่ม insert แล้วกดออกจะคืนค่า ช่อง TextField
    {
      type === 'insert' && (setNameTH(''), setNameEN(''), setFaculty(''))
    }

    // ถ้ากดปุ่ม edit แล้วลบข้อความใน TextField แลัว กด Updata แล้วกดออก จะคืนค่า row
    {
      type === 'edit' &&
        (setNameTH(DataInRow.dpm_name_th),
        setNameEN(DataInRow.dpm_name_en),
        setFaculty(DataInRow.faculty_institutes_fi_id))
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    // เช็คว่า TextField ค่าว่างไหม
    handleCheckEmpty()

    // เช็คว่า TextField มีค่าใดค่าหนึ่ง ว่าง จะ return แล้วจบ function
    if (!nameTH || !nameEN || !faculty) {
      return
    }

    // สร้าง Object ข้อมูลที่จะส่ง
    const NewDataDepartments = {
      // ซ้าย ที่อยู่ใน database || ขวา ที่ประกาศ State
      dpm_name_th: nameTH,
      dpm_name_en: nameEN,
      faculty_institutes_fi_id: faculty
    }

    axios
      .post('http://111.223.38.19/api/method/frappe.API.MasterData.department.insertDepartment', NewDataDepartments)
      .then(response => {
        // console.log('NewDepartments Done:', response.data)

        // reset ค่า State หลังจากส่งข้อมูล
        setNameTH('')
        setNameEN('')
        setFaculty('')

        // ปิด Dialog
        handleClose(false)

        // reset display หลังจากส่งข้อมูล
        Route.replace(Route.asPath, undefined, { scroll: false })
      })
      .catch(error => {
        // console.error('ERROR NewDepartments:', error)
      })
  }

  const handleUpdate = () => {
    // เช็คว่า TextField ค่าว่างไหม
    handleCheckEmpty()

    if (!nameTH || !nameEN || !faculty) {
      return
    }

    // สร้าง Object ข้อมูลที่จะส่ง
    const UpdateDataDepartments = {
      // ซ้าย ที่อยู่ใน database || ขวา ที่ประกาศ State
      dpm_id: DataInRow?.dpm_id,
      dpm_name_th: nameTH,
      dpm_name_en: nameEN,
      faculty_institutes_fi_id: faculty
    }

    axios
      .put('http://111.223.38.19/api/method/frappe.API.MasterData.department.editDepartment', UpdateDataDepartments)
      .then(response => {
        // console.log('UpdateDataDepartments Done:', response.data)

        // ปิด Dialog
        handleClose(false)

        // reset display หลังจากส่งข้อมูล
        Route.replace(Route.asPath, undefined, { scroll: false })
      })
      .catch(error => {
        // console.error('ERROR UpdateDataDepartments:', error)
      })
  }

  // useEffect ======================================
  // Check empty <<<<<<<<<<
  useEffect(() => {
    setCheckError(prevErrors => ({
      ...prevErrors,
      nameTH: false
    }))
  }, [nameTH])
  useEffect(() => {
    setCheckError(prevErrors => ({
      ...prevErrors,
      nameEN: false
    }))
  }, [nameEN])
  useEffect(() => {
    setCheckError(prevErrors => ({
      ...prevErrors,
      faculty: false
    }))
  }, [faculty])

  // Check empty >>>>>>>>>>

  useEffect(() => {
    // เมื่อ DataInRow มีการเปลี่ยนแปลง
    if (DataInRow) {
      setNameTH(DataInRow.dpm_name_th)
      setNameEN(DataInRow.dpm_name_en)
      setFaculty(DataInRow.faculty_institutes_fi_id)
    }
  }, [DataInRow])

  useEffect(() => {
    const MenuDropdown = async () => {
      const queryFaculty = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.faculty.getAllfacultys`)
      const resFaculty = await queryFaculty.json()
      setDropDown({ ...dropDown, faculty: resFaculty.message.Data })
    }
    MenuDropdown()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleRestore} sx={{ minWidth: 400 }}>
      <DialogContent>
        <Card>
          {type === 'insert' && <CardHeader title='Add New Departments' titleTypographyProps={{ variant: 'h6' }} />}
          {type === 'edit' && <CardHeader title='Edit Departments' titleTypographyProps={{ variant: 'h6' }} />}
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Thai Name'
                  placeholder='Thai Name'
                  value={nameTH}
                  error={!!checkError.nameTH}
                  onChange={e => {
                    setNameTH(e.target.value)
                    handleChange(e, 'nameTH', 'th')
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='English Name'
                  placeholder='English Name'
                  value={nameEN}
                  error={!!checkError.nameEN}
                  onChange={e => {
                    setNameEN(e.target.value)
                    handleChange(e, 'nameEN', 'en')
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} sx={3}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label' error={!!checkError.faculty}>
                    Faculty Institute{' '}
                  </InputLabel>
                  <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={faculty}
                    error={!!checkError.faculty}
                    onChange={e => setFaculty(e.target.value)}
                  >
                    {dropDown.faculty?.map(facultys => (
                      <MenuItem key={facultys.fi_id} value={facultys.fi_id}>
                        {facultys.fi_name_th}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
        </Card>
      </DialogContent>
      {type === 'insert' && (
        <DialogActions>
          <Button onClick={handleRestore}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      )}
      {type === 'edit' && (
        <DialogActions>
          <Button onClick={handleRestore}>Cancel</Button>
          <Button variant='contained' onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default DepartmentsDialog
