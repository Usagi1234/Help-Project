import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useRouter } from 'next/router'

///////////////////////////////////////////////////////////
// ** React Imports

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

const AcademicDialog = ({ open, handleClose, handleSubmit, type, data, rowdata }) => {
  console.log(data)
  console.log(rowdata)

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
    } else if (type === 'email') {
      updatedValue = updatedValue.replace(/[^A-Za-z0-9.@+-]/g, '')
      setEmail(updatedValue)
    } else if (type === 'tel') {
      updatedValue = updatedValue.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
      setTel(updatedValue)
    } else if (type === 'code') {
      updatedValue = updatedValue.replace(/[^a-zA-Z0-9\s]/g, '')
      setCode(updatedValue)
    } else if (type === 'thc') {
      updatedValue = updatedValue.replace(/[^ก-๙เ\s]/g, '')
      setCampus(updatedValue)
    }
  }

  // set ค่า state ให้กับตัวแปรใน TextField
  const [nameTh, setNameTh] = useState(rowdata?.ac_name_th || '')
  const [nameEn, setNameEn] = useState(rowdata?.ac_name_en || '')
  const [acType, setAcType] = useState(rowdata?.academic_type_ac_type_id || '')
  const [tel, setTel] = useState(rowdata?.ac_tel || '')
  const [address, setAddress] = useState(rowdata?.ac_address || '')
  const [campus, setCampus] = useState(rowdata?.ac_campus || '')

  // กำหนดค่า TextField ทุกครั้งที่มีข้อมูลจาก rowdata หรือมีการเปิด Modal
  useEffect(() => {
    if (open && type === 'edit' && rowdata) {
      setNameTh(rowdata.ac_name_th || '')
      setNameEn(rowdata.ac_name_en || '')
      setAcType(rowdata.academic_type_ac_type_id || '')
      setTel(rowdata.ac_tel || '')
      setAddress(rowdata.ac_address || '')
      setCampus(rowdata.ac_campus || '')
    }
  }, [open, type, rowdata])

  // Set ค่าว่างเมื่อกด cancal
  const handleCancel = () => {
    if (typeof rowdata === 'undefined') {
      setNameTh('')
      setNameEn('')
      setAcType('')
      setTel('')
      setAddress('')
      setCampus('')
    }
  }

  //ปิด popup
  const handleCancelAndClose = () => {
    handleClose()
    handleCancel()
  }

  // ตัวแปรสสถานะปุ่ม Submit
  const [submitted, setSubmitted] = useState(false)

  // เช็ค state เมื่อปิด popup
  useEffect(() => {
    if (!open) {
      setSubmitted(false)
    }
  }, [open])

  // ฟังก์ชันสำหรับ INSERT DATA
  const handleInsertSubmit = e => {
    e.preventDefault()
    setSubmitted(true)

    // ตรวจสอบค่าว่างใน TextField
    if (!nameTh || !nameEn || !acType || !tel || !address || !campus || tel.length !== 12) {
      alert('ฮานาเงะ')

      return
    }

    const data = {
      ac_name_th: nameTh,
      ac_name_en: nameEn,
      academic_type_ac_type_id: acType,
      ac_tel: tel,
      ac_address: address,
      ac_campus: campus
    }

    // console.log(data)
    axios
      .post('http://192.168.1.168:8000/api/method/frappe.help-api.insertacademic', data)
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
    if (!nameTh || !nameEn || !acType || !tel || !address || !campus || tel.length !== 12) {
      alert('ฮานาเงะ')

      return
    }

    const data = {
      ac_id: rowdata?.ac_id,
      ac_name_th: nameTh,
      ac_name_en: nameEn,
      ac_campus: campus,
      ac_address: address,
      ac_tel: tel,
      academic_type_ac_type_id: acType
    }

    axios
      .put('http://192.168.1.168:8000/api/method/frappe.help-api.editacademic', data)
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
        <Card>
          {type === 'insert' && <CardHeader title='Add New Academic' titleTypographyProps={{ variant: 'h6' }} />}
          {type === 'edit' && <CardHeader title='Edit Academic' titleTypographyProps={{ variant: 'h6' }} />}
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Thai Name'
                  placeholder='Thai Name'
                  id='ac_name_th'
                  value={nameTh} // กำหนดค่าให้ TextField จาก state nameTh
                  onChange={e => {
                    setNameTh(e.target.value)
                    handleChange(e, 'ac_name_th', 'th')
                  }}
                  error={submitted && !nameTh} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                  helperText={submitted && !nameTh && 'กรุณากรอกข้อมูล'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='English Name'
                  placeholder='English Name'
                  id='ac_name_en'
                  value={nameEn} // กำหนดค่าให้ TextField จาก state nameEn
                  onChange={e => {
                    setNameEn(e.target.value)
                    handleChange(e, 'ac_name_en', 'en')
                  }}
                  error={submitted && !nameEn} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                  helperText={submitted && !nameEn && 'กรุณากรอกข้อมูล'}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 0 }} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <TextField
                  fullWidth
                  label='Phone No.'
                  placeholder='+1-123-456-8790'
                  id='ac_tel'
                  value={tel}
                  onChange={e => {
                    setTel(e.target.value)
                    handleChange(e, 'ac_tel', 'tel')
                  }}
                  error={submitted && (!tel || tel.length !== 12)}
                  helperText={submitted && (!tel || tel.length !== 12) && 'กรุณากรอกข้อมูลให้ครบ 10 ตัว'}
                  inputProps={{ minLength: 0, maxLength: 10 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <TextField
                  fullWidth
                  label='Campus'
                  placeholder='Soi Saket'
                  id='ac_campus'
                  value={campus} // กำหนดค่าให้ TextField จาก state campus
                  onChange={e => {
                    setCampus(e.target.value)
                    handleChange(e, 'ac_campus', 'thc')
                  }}
                  error={submitted && !campus} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                  helperText={submitted && !campus && 'กรุณากรอกข้อมูล'}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={3}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Academic Type</InputLabel>
                  <Select
                    label='Country'
                    defaultValue=''
                    id='academic_type_ac_type_id'
                    labelId='form-layouts-separator-select-label'
                    value={acType}
                    onChange={e => {
                      setAcType(e.target.value)
                    }}
                    error={submitted && !acType}
                    helperText={submitted && !acType && 'กรุณากรอกข้อมูล'}
                  >
                    {data
                      ?.filter((contentAc, index, self) => {
                        return (
                          index ===
                          self.findIndex(c => c.academic_type_ac_type_id === contentAc.academic_type_ac_type_id)
                        )
                      })
                      .filter(contentAc => {
                        return contentAc.academic_type_ac_type_id !== ''
                      })
                      .map((contentAc, value) => (
                        <MenuItem key={value} value={contentAc.academic_type_ac_type_id}>
                          {contentAc.ac_type_name_th}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label='Address'
                  placeholder='............'
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  id='ac_address'
                  value={address} // กำหนดค่าให้ TextField จาก state address
                  onChange={e => setAddress(e.target.value)} // อัปเดต state address เมื่อมีการเปลี่ยนแปลงใน TextField
                  error={submitted && !address} // แสดงสีแดงเมื่อกดส่งและค่าว่าง
                  helperText={submitted && !address && 'กรุณากรอกข้อมูล'}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
        </Card>
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

export default AcademicDialog
