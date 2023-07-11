import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import axios from 'axios'
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

const CurriculumsDialog = ({ open, handleClose, handleSubmit, type, data, rowdata }) => {
  // ตัวแปร เราเตอร์
  const Route = useRouter()

  // เช็คการรับค่าใน input
  const handleChange = (e, key, type) => {
    const { value } = e.target
    let updatedValue = value
    if (type === 'th') {
      updatedValue = updatedValue.replace(/[^ก-๙เ\s]/g, '')
      setNameTh(updatedValue)
    } else if (type === 'en') {
      updatedValue = updatedValue.replace(/[^a-zA-Z\s]/g, '')
      setNameEn(updatedValue)
    } else if (type === 'shth') {
      updatedValue = updatedValue.replace(/[^ก-๙เ\s]/g, '')
      setShortNameTh(updatedValue)
    } else if (type === 'shen') {
      updatedValue = updatedValue.replace(/[^a-zA-Z\s]/g, '')
      setShortNameEn(updatedValue)
    }
  }

  // set ค่า state ให้กับตัวแปรใน TextField
  const [NameTh, setNameTh] = useState(rowdata?.cur_name_th || '')
  const [NameEn, setNameEn] = useState(rowdata?.cur_name_en || '')
  const [ShortNameTh, setShortNameTh] = useState(rowdata?.cur_shot_name_th || '')
  const [ShortNameEn, setShortNameEn] = useState(rowdata?.cur_shot_name_en || '')
  const [Dpm, setDpm] = useState(rowdata?.dpm_id || '')
  const [Faculty, setFaculty] = useState(rowdata?.faculty_institutes_fi_id || '')
  const [ReleaseYear, setReleaseYear] = useState(rowdata?.release_year || '')

  // กำหนดค่า TextField ทุกครั้งที่มีข้อมูลจาก rowdata หรือมีการเปิด Modal
  useEffect(() => {
    if (open && type === 'edit' && rowdata) {
      setNameTh(rowdata.cur_name_th || '')
      setNameEn(rowdata.cur_name_en || '')
      setShortNameTh(rowdata.cur_shot_name_th || '')
      setShortNameEn(rowdata.cur_shot_name_en || '')
      setDpm(rowdata.dpm_id || '')
      setFaculty(rowdata.faculty_institutes_fi_id || '')
      setReleaseYear(rowdata.release_year || '')
    }
  }, [open, type, rowdata])

  // Set ค่าว่างเมื่อกด cancal
  const handleCancel = () => {
    if (typeof rowdata === 'undefined') {
      setNameTh('')
      setNameEn('')
      setShortNameTh('')
      setShortNameEn('')
      setDpm('')
      setFaculty('')
      setReleaseYear('')
    }
  }

  // ตัวแปรสสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  // เช็ค state เมื่อปิด popup
  useEffect(() => {
    if (!open) {
      setSubmitted(false)
    }
  }, [open])

  //ปิด popup
  const handleCancelAndClose = () => {
    handleClose()
    handleCancel()
  }

  // ฟังก์ชันสำหรับ INSERT DATA
  const handleInsertSubmit = e => {
    e.preventDefault()
    setSubmitted(true)

    // ตรวจสอบค่าว่างใน TextField
    if (!NameTh || !NameEn || !ShortNameTh || !ShortNameEn || !Dpm || !Faculty || !ReleaseYear) {
      alert('ฮานาเงะ')

      return
    }

    const data = {
      cur_name_th: NameTh,
      cur_name_en: NameEn,
      cur_shot_name_th: ShortNameTh,
      cur_shot_name_en: ShortNameEn,
      dpm_id: Dpm,
      faculty_institutes_fi_id: Faculty,
      release_year: ReleaseYear
    }

    console.log(data)
    axios
      .post('http://111.223.38.19/api/method/frappe.API.MasterData.curriculum.insertcurriculum', data)
      .then(response => {
        console.log(response)
        handleClose()

        // window.location.reload()
        Route.replace(Route.asPath, undefined, { scroll: false })
        handleCancel() // รีข้อมูล
      })
      .catch(error => {
        console.log(error)
      })
  }

  // ฟังก์ชันสำหรับ EDIT DATA
  const handleEditSubmit = e => {
    e.preventDefault()
    setSubmitted(true)

    // ตรวจสอบค่าว่างใน TextField
    if (!NameTh || !NameEn || !ShortNameTh || !ShortNameEn || !Dpm || !Faculty || !ReleaseYear) {
      alert('ฮานาเงะ')

      return
    }

    const data = {
      cur_id: rowdata?.cur_id,
      cur_name_th: NameTh,
      cur_name_en: NameEn,
      cur_shot_name_th: ShortNameTh,
      cur_shot_name_en: ShortNameEn,
      dpm_id: Dpm,
      faculty_institutes_fi_id: Faculty,
      release_year: ReleaseYear
    }

    console.log(data)

    axios
      .put('http://111.223.38.19/api/method/frappe.API.MasterData.curriculum.editcurriculum', data)
      .then(response => {
        console.log(response)
        handleClose()

        // window.location.reload()
        Route.replace(Route.asPath, undefined, { scroll: false })
      })
      .catch(error => {
        console.log(error)
      })
    console.log(data)
  }

  return (
    <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} sx={{ minWidth: 400 }}>
      <DialogContent>
        <DialogContentText>
          <Card>
            {type === 'insert' && <CardHeader title='Add New Curriculum' titleTypographyProps={{ variant: 'h6' }} />}
            {type === 'edit' && <CardHeader title='Edit Curriculum' titleTypographyProps={{ variant: 'h6' }} />}
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Thai Name'
                      placeholder='Thai Name'
                      id='cur_name_th'
                      value={NameTh} // กำหนดค่าให้ TextField จาก state nameTh
                      onChange={e => {
                        setNameTh(e.target.value)
                        handleChange(e, 'cur_name_th', 'th')
                      }}
                      error={submitted && !NameTh} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                      helperText={submitted && !NameTh && 'กรุณากรอกข้อมูล'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='English Name'
                      placeholder='English Name'
                      id='cur_name_en'
                      value={NameEn} // กำหนดค่าให้ TextField จาก state nameTh
                      onChange={e => {
                        setNameEn(e.target.value)
                        handleChange(e, 'cur_name_en', 'en')
                      }}
                      error={submitted && !NameEn} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                      helperText={submitted && !NameEn && 'กรุณากรอกข้อมูล'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Thai Short Name'
                      placeholder='Thai Short Name'
                      id='cur_shot_name_th'
                      value={ShortNameTh} // กำหนดค่าให้ TextField จาก state nameTh
                      onChange={e => {
                        setShortNameTh(e.target.value)
                        handleChange(e, 'cur_shot_name_th', 'shth')
                      }}
                      error={submitted && !ShortNameTh} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                      helperText={submitted && !ShortNameTh && 'กรุณากรอกข้อมูล'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='English Short Name'
                      placeholder='English Short Name'
                      id='cur_shot_name_en'
                      value={ShortNameEn} // กำหนดค่าให้ TextField จาก state nameTh
                      onChange={e => {
                        setShortNameEn(e.target.value)

                        handleChange(e, 'cur_shot_name_en', 'shen')
                      }}
                      error={submitted && !ShortNameEn} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                      helperText={submitted && !ShortNameEn && 'กรุณากรอกข้อมูล'}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} lg={3}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>Department</InputLabel>
                      <Select
                        label='Country'
                        defaultValue=''
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                        value={Dpm}
                        onChange={e => {
                          setDpm(e.target.value)
                        }}
                        error={submitted && !Dpm}
                        helperText={submitted && !Dpm && 'กรุณากรอกข้อมูล'}
                      >
                        <MenuItem value='DPM-101'>Computer Engineering</MenuItem>
                        <MenuItem value='DPM-107'>University 2</MenuItem>
                        <MenuItem value='DPM-105'>University 3</MenuItem>
                        <MenuItem value='DPM-104'>University 4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>Faculty institute</InputLabel>
                      <Select
                        label='Country'
                        defaultValue=''
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                        value={Faculty}
                        onChange={e => {
                          setFaculty(e.target.value)
                        }}
                        error={submitted && !Faculty}
                        helperText={submitted && !Faculty && 'กรุณากรอกข้อมูล'}
                      >
                        <MenuItem value='FI-100'>คณะวิศวกรรมศาสตร์</MenuItem>
                        <MenuItem value='FI-102'>University 2</MenuItem>
                        <MenuItem value='FI-103'>University 3</MenuItem>
                        <MenuItem value='FI-104'>University 4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3} lg={3}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>Release year</InputLabel>
                      <Select
                        label='Country'
                        defaultValue=''
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                        value={ReleaseYear}
                        onChange={e => {
                          setReleaseYear(e.target.value)
                        }}
                        error={submitted && !ReleaseYear}
                        helperText={submitted && !ReleaseYear && 'กรุณากรอกข้อมูล'}
                      >
                        <MenuItem value='release_year'>2562</MenuItem>
                        <MenuItem value='release_year'>2563</MenuItem>
                        <MenuItem value='release_year'>2564</MenuItem>
                        <MenuItem value='release_year'>2565</MenuItem>
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
        <Button onClick={handleCancelAndClose}>Cancel</Button>
        {/* Insert Submit */}
        {type === 'insert' && (
          <Button variant='contained' onClick={handleInsertSubmit}>
            Submit
          </Button>
        )}

        {/* Edit Submit */}
        {type === 'edit' && (
          <Button variant='contained' onClick={handleEditSubmit}>
            Update
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default CurriculumsDialog
