import React from 'react'
import { Typography } from '@mui/material'
import { IconButton } from '@mui/material'
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import Icon from '@mdi/react'
import { mdiExportVariant } from '@mdi/js'

function ExportButton({ excelData, fileName, isEmpty }) {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' // ระบุประเภทของไฟล์
  const fileExtension = '.xlsx' // กำหนดนามสกุลไฟล์

  const exportToExcel = async () => {
    console.log('sss')
    if (!isEmpty) {
      const ws = XLSX.utils.json_to_sheet(excelData) // ใช้สร้างตัว Sheet ในไฟล์ Excel จากข้อมูลมี่ได้รับมา
      const wb = XLSX.utils.book_new() // ทำการสร้าง Workbook
      // workbook คือ คอนเทนเนอร์ที่ใช้สร้างสำหรับ Excel จะประกอบไปด้วย Sheet เรียงกันเป็นตาราง
      XLSX.utils.book_append_sheet(wb, ws, 'data') // ทำการสร้าง Sheet ใว้ใน workbook
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }) // ทำการแปลงไฟล์ workbook เป็นไฟล์ Excel
      const data = new Blob([excelBuffer], { type: fileType }) // ทำการสร้าง Blob object เพื่อเก็บเป็นไฟล์ Excel
      // Blob object คือ เป็นออบเจ็กต์ที่ใช้สำหรับเก็บข้อมูล ในการสร้างไฟล์หรือบันทึกข้อมูลที่มีรูปแบบเฉพาะ เช่น ไฟล์รูปภาพ ไฟล์เสียง หรือไฟล์เอกสารเป็นต้น
      // โดยกำหนดให้ไฟล์เป็น fileType
      FileSaver.saveAs(data, fileName + fileExtension) // ทำการ Dowlond ไฟล์ Excel โดยใช้ชื่อที่กำหนด
    }
  }

  return (
    <IconButton sx={{ borderRadius: 2, px: 2 }} onClick={exportToExcel}>
      <Icon path={mdiExportVariant} size={1} />
      <Typography variant='body2' sx={{ fontWeight: 'bold', mx: 1, mr: 2, pt: 1 }}>
        Export
      </Typography>
    </IconButton>
  )
}

export default ExportButton
