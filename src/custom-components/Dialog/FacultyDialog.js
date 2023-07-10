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

const FacultyDialog = ({ open, handleClose, type, DataInRow }) => {
  const Route = useRouter()
  console.log('Data IN ROW', DataInRow)

  // State variables =================================
  const [nameTH, setNameTH] = useState('')
  const [nameEN, setNameEN] = useState('')
  const [academic, setAcademic] = useState('')

  // State array =====================================
  const [checkError, setCheckError] = useState({})

  // handle =========================================
  const handleCheckEmpty = () => {
    // เช็คว่า ตัวแปร เป็นค่าว่าง ถ้า ว่าง = true
    const emptys = {
      nameTH: nameTH.trim() === '',
      nameEN: nameEN.trim() === '',
      academic: academic.trim() === ''
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
      academic: false
    })

    // ถ้ากดปุ่ม insert แล้วกดออกจะคืนค่า ช่อง TextField
    {
      type === 'insert' && (setNameTH(''), setNameEN(''), setAcademic(''))
    }

    // ถ้ากดปุ่ม edit แล้วลบข้อความใน TextField แลัว กด Updata แล้วกดออก จะคืนค่า row
    {
      type === 'edit' &&
        (setNameTH(DataInRow.fi_name_th), setNameEN(DataInRow.fi_name_en), setAcademic(DataInRow.academics_ac_id))
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    // เช็คว่า TextField ค่าว่างไหม
    handleCheckEmpty()

    // เช็คว่า TextField มีค่าใดค่าหนึ่ง ว่าง จะ return แล้วจบ function
    if (!nameTH || !nameEN || !academic) {
      return
    }

    // สร้าง Object ข้อมูลที่จะส่ง
    const NewDataFaculty = {
      // ซ้าย ที่อยู่ใน database || ขวา ที่ประกาศ State
      fi_name_th: nameTH,
      fi_name_en: nameEN,
      academics_ac_id: academic
    }

    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.insertfaculty', NewDataFaculty)
      .then(response => {
        console.log('NewFaculty Done:', response.data)

        // reset ค่า State หลังจากส่งข้อมูล
        setNameTH('')
        setNameEN('')
        setAcademic('')

        // ปิด Dialog
        handleClose(false)

        // reset display หลังจากส่งข้อมูล
        Route.replace(Route.asPath, undefined, { scroll: false })
      })
      .catch(error => {
        console.error('ERROR NewFaculty:', error)
      })
  }

  const handleUpdate = () => {
    // เช็คว่า TextField ค่าว่างไหม
    handleCheckEmpty()

    if (!nameTH || !nameEN || !academic) {
      return
    }

    // สร้าง Object ข้อมูลที่จะส่ง
    const UpdateDataFaculty = {
      // ซ้าย ที่อยู่ใน database || ขวา ที่ประกาศ State
      fi_id: DataInRow?.fi_id,
      fi_name_th: nameTH,
      fi_name_en: nameEN,
      academics_ac_id: academic
    }

    axios
      .put('http://192.168.1.168:8000/api/method/frappe.help-api.editfaculty', UpdateDataFaculty)
      .then(response => {
        console.log('UpdateDataFaculty Done:', response.data)

        // ปิด Dialog
        handleClose(false)

        // reset display หลังจากส่งข้อมูล
        Route.replace(Route.asPath, undefined, { scroll: false })
      })
      .catch(error => {
        console.error('ERROR UpdateDataFaculty:', error)
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
      academic: false
    }))
  }, [academic])

  // Check empty >>>>>>>>>>

  useEffect(() => {
    // เมื่อ DataInRow มีการเปลี่ยนแปลง
    if (DataInRow) {
      setNameTH(DataInRow.fi_name_th)
      setNameEN(DataInRow.fi_name_en)
      setAcademic(DataInRow.academics_ac_id)
    }
  }, [DataInRow])

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleRestore} sx={{ minWidth: 400 }}>
      <DialogContent>
        <Card>
          {type === 'insert' && (
            <CardHeader title='Add New Faculty Institute' titleTypographyProps={{ variant: 'h6' }} />
          )}
          {type === 'edit' && <CardHeader title='Edit Faculty Institute' titleTypographyProps={{ variant: 'h6' }} />}
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
                  onChange={e => setNameTH(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='English Name'
                  placeholder='English Name'
                  value={nameEN}
                  error={!!checkError.nameEN}
                  onChange={e => setNameEN(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} sx={3}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label' error={!!checkError.academic}>
                    Academic{' '}
                  </InputLabel>
                  <Select
                    label='Country'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={academic}
                    error={!!checkError.academic}
                    onChange={e => setAcademic(e.target.value)}
                  >
                    {/* {DataInRow.map(() => (
                      <MenuItem key={DataInRow.fi_id} value={DataInRow.ac_id}>
                        {DataInRow.ac_name_th}
                      </MenuItem>
                    ))} */}
                    <MenuItem value='AC-13'>University 1</MenuItem>
                    <MenuItem value='AC-19'>University 2</MenuItem>
                    <MenuItem value='AC-18'>University 3</MenuItem>
                    <MenuItem value='AC-17'>University 4</MenuItem>
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

export default FacultyDialog
