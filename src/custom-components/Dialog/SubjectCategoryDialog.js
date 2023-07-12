import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

// ** MUI Imports
import Card from '@mui/material/Card'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'

const SubjectCategoryDialog = ({ open, handleClose, header, rowData, type }) => {
  const router = useRouter()

  const initial = {
    subject_category_name: ''
  }
  const [dataCategory, setDataCategory] = useState(rowData)

  const colorError = {
    subject_category_name: false
  }

  const [colorCsc, setColorCsc] = useState(colorError)

  useEffect(() => {
    if (type === 'insert') {
      setDataCategory(initial)
      // console.log('insert')
    } else {
      setDataCategory(rowData)
      // console.log('edit')
    }
  }, [type, rowData])

  const HandleChangeCsc = (event, type) => {
    if (type === 'subject_category_name') {
      const newStr = event.target.value.replace(/[^ก-๙เ\s]/g, '')
      if (dataCategory.subject_category_name !== '') {
        setColorCsc(pre => ({ ...pre, subject_category_name: false }))
      }
      setDataCategory(pre => ({ ...pre, subject_category_name: newStr }))
    }
  }

  // useEffect(() => {
  //   console.log(dataCategory)
  // }, [dataCategory])

  const HandleOnInsCsc = () => {
    if (dataCategory.subject_category_name !== '') {
      setDataCategory(pre => ({
        ...pre,
        ...dataCategory
      }))
      // console.log('1', dataCategory)
      axios
        .post(
          'http://111.223.38.19/api/method/frappe.API.MasterData.subject_category.insertsubject_category',
          dataCategory
        )
        .then(res => {
          // console.log(res)
          setDataCategory(initial)
          handleClose()
          router.replace(router.asPath)
        })
    }
    if (dataCategory.subject_category_name !== '') {
      // console.log('subject_category_name ไม่ว่าง')
    } else {
      // console.log('ACT_Name_th ว่าง')
      setColorCsc(pre => ({ ...pre, subject_category_name: true }))
    }
  }

  const HandleOnEditCsc = () => {
    if (dataCategory.subject_category_name !== '') {
      axios
        .put(
          'http://111.223.38.19/api/method/frappe.API.MasterData.subject_category.editsubject_category',
          dataCategory
        )
        .then(res => {
          setDataCategory(initial)
          handleClose()
          router.replace(router.asPath)
        })
    }
    if (dataCategory.subject_category_name !== '') {
      // console.log('subject_category_name ไม่ว่าง')
    } else {
      // console.log('subject_category_name ว่าง')
      setColorCsc(pre => ({ ...pre, subject_category_name: true }))
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth={'md'}
      open={open}
      onClose={() => {
        handleClose()
        router.replace(router.asPath)
        setColorCsc(colorError)
        setDataCategory(initial)
      }}
      sx={{ minWidth: 400 }}
    >
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        {/* //////////////////////////////////////////////////////////////////////////////// */}
        <Card>
          {type === 'insert' && (
            <CardHeader title='Add New Subject Category' titleTypographyProps={{ variant: 'h6' }} />
          )}
          {type === 'edit' && <CardHeader title='Edit Subject Category' titleTypographyProps={{ variant: 'h6' }} />}
          <Divider sx={{ margin: 0 }} />
          <form onSubmit={e => e.preventDefault()}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label='Category Name'
                    placeholder='Subject Category Name'
                    onChange={event => HandleChangeCsc(event, 'subject_category_name')}
                    error={colorCsc.subject_category_name}
                    value={dataCategory.subject_category_name}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
          </form>
        </Card>
        {/* /////////////////////////////////////////////////////////////////////////// */}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose()
            router.replace(router.asPath)
            setColorCsc(colorError)
            setDataCategory(initial)
          }}
        >
          Cancel
        </Button>
        {type === 'insert' && (
          <Button variant='contained' onClick={() => HandleOnInsCsc()}>
            Submit
          </Button>
        )}

        {type === 'edit' && (
          <Button variant='contained' onClick={() => HandleOnEditCsc()}>
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default SubjectCategoryDialog
