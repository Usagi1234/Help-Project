import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'

///////////////////////////////////////////////////////////
// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import axios from 'axios'
import { useRouter } from 'next/router'

const AcademicTypeDialog = ({ open, handleClose, handleSubmit, type, rowData }) => {
  const router = useRouter()

  const initial = {
    ac_type_name_th: '',
    ac_type_name_en: '',
    ac_area: ''
  }
  const [dataAct, setDataAct] = useState(rowData)

  const initialColorCancel = {
    ac_type_name_th: false,
    ac_type_name_en: false,
    ac_area: false
  }

  const [colorOnchange, setColorOnChange] = useState(initialColorCancel)

  useEffect(() => {
    if (type === 'insert') {
      setDataAct(initial)

      // console.log('insert')
    } else {
      setDataAct(rowData)
    }
  }, [type, rowData])

  const HandleChangeIns = (event, type) => {
    if (type === 'ac_type_name_th') {
      const newStr = event.target.value.replace(/[^ก-๙เ\s0-9]/g, '')
      if (dataAct.ac_type_name_th !== '') {
        setColorOnChange(pre => ({ ...pre, ac_type_name_th: false }))
      }
      setDataAct(pre => ({ ...pre, ac_type_name_th: newStr }))
    } else if (type === 'ac_type_name_en') {
      const newStr = event.target.value.replace(/[^a-zA-Z\s0-9]/g, '')
      if (dataAct.ac_type_name_en !== '') {
        setColorOnChange(pre => ({ ...pre, ac_type_name_en: false }))
      }
      setDataAct(pre => ({ ...pre, ac_type_name_en: newStr }))
    } else if (type === 'ac_area') {
      const newStr = event.target.value.replace(/[^ก-๙เ\s]/g, '')
      if (dataAct.ac_area !== '') {
        setColorOnChange(pre => ({ ...pre, ac_area: false }))
      }
      setDataAct(pre => ({ ...pre, ac_area: newStr }))
    }
  }

  const HandleOnIns = () => {
    if (dataAct.ac_type_name_th !== '' && dataAct.ac_type_name_en !== '' && dataAct.ac_area !== '') {
      setDataAct(pre => ({
        ...pre, // เก็บค่าเก่า
        ...dataAct // การจาย ที่เป็นก้อนออก ถ้าสลับข้อมูลจะอยู่ด้านหน้า
      }))
      console.log('a ', dataAct)
      axios
        .post('http://111.223.38.19/api/method/frappe.API.MasterData.academic_type.insertacademictype', dataAct) // back end list มา
        .then(res => {
          // console.log(res)
          setDataAct(initial)
          handleClose()
          router.replace(router.asPath)
        })
        .catch(error => {
          // console.log(error)
        })
    }
    if (dataAct.ac_type_name_th !== '') {
      // console.log('ACT_Name_th ไม่ว่าง')
    } else {
      // console.log('ACT_Name_th ว่าง')
      setColorOnChange(pre => ({ ...pre, ac_type_name_th: true }))
    }

    if (dataAct.ac_type_name_en !== '') {
      // console.log('ACT_Name_en ไม่ว่าง')
    } else {
      // console.log('ACT_Name_en ว่าง')
      setColorOnChange(pre => ({ ...pre, ac_type_name_en: true }))
    }

    if (dataAct.ac_area !== '') {
      // console.log('ACT_area ไม่ว่าง')
    } else {
      // console.log('ACT_area ว่าง')
      setColorOnChange(pre => ({ ...pre, ac_area: true }))
    }
  }

  const HandleOnEdit = () => {
    if (dataAct.ac_type_name_th !== '' && dataAct.ac_type_name_en !== '' && dataAct.ac_area !== '') {
      axios
        .put('http://111.223.38.19/api/method/frappe.API.MasterData.academic_type.editacademictype', dataAct) // back end list มา
        .then(res => {
          setDataAct(initial)
          handleClose()
          router.replace(router.asPath)
        })
        .catch(error => {
          // console.log(error)
        })
    }
    if (dataAct.ac_type_name_th !== '') {
      // console.log('ACT_Name_th ไม่ว่าง')
    } else {
      // console.log('ACT_Name_th ว่าง')
      setColorOnChange(pre => ({ ...pre, ac_type_name_th: true }))
    }

    if (dataAct.ac_type_name_en !== '') {
      // console.log('ACT_Name_en ไม่ว่าง')
    } else {
      // console.log('ACT_Name_en ว่าง')
      setColorOnChange(pre => ({ ...pre, ac_type_name_en: true }))
    }

    if (dataAct.ac_area !== '') {
      // console.log('ACT_area ไม่ว่าง')
    } else {
      // console.log('ACT_area ว่าง')
      setColorOnChange(pre => ({ ...pre, ac_area: true }))
    }
  }

  // useEffect(() => {
  //   console.log(dataAct)
  // }, [dataAct])

  return (
    <Dialog
      fullWidth
      maxWidth={'md'}
      open={open}
      onClose={() => {
        handleClose()
        router.replace(router.asPath)
        setColorOnChange(initialColorCancel)
      }}
      sx={{ minWidth: 400 }}
    >
      <DialogContent>
        <Card>
          {type === 'insert' && <CardHeader title='Add New Academic Type' titleTypographyProps={{ variant: 'h6' }} />}
          {type === 'edit' && <CardHeader title='Edit Academic Type' titleTypographyProps={{ variant: 'h6' }} />}
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Thai Name'
                  placeholder='Thai Name'
                  onChange={event => HandleChangeIns(event, 'ac_type_name_th')}
                  error={colorOnchange.ac_type_name_th}
                  value={dataAct.ac_type_name_th || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='English Name'
                  placeholder='English Name'
                  onChange={event => HandleChangeIns(event, 'ac_type_name_en')}
                  error={colorOnchange.ac_type_name_en}
                  value={dataAct.ac_type_name_en}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 0 }} />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  fullWidth
                  label='Area'
                  placeholder='เชียงใหม่'
                  onChange={event => HandleChangeIns(event, 'ac_area')}
                  error={colorOnchange.ac_area}
                  value={dataAct.ac_area}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose()
            router.replace(router.asPath)
            setColorOnChange(initialColorCancel)
          }}
        >
          Cancel
        </Button>
        {/* insertSubmit */}
        {type === 'insert' && (
          <Button variant='contained' onClick={() => HandleOnIns()}>
            Submit
          </Button>
        )}
        {/* Eidt Submit */}
        {type === 'edit' && (
          <Button variant='contained' onClick={() => HandleOnEdit()}>
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default AcademicTypeDialog
