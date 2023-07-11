import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import CurriculumsDialog from 'src/custom-components/Dialog/CurriculumsDialog'

function CurriculumsTab({ data }) {
  // Setstate CurriculumDialog
  const [openInsDialog, setOpenInsDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)

  //รับค่าจากแถวข้อมูล
  const [rowdata, setRowdata] = useState('')

  console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  // ประกาศ Colum
  const columns = [
    {
      field: '',
      headerName: 'Edit',
      width: 100,
      renderCell: cellValues => (
        <Button
          variant='text'
          onClick={() => {
            // console.log(cellValues.row)
            setRowdata(cellValues.row)
            setOpenEditDialog(true)
          }}
        >
          ...
        </Button>
      )
    },
    { field: 'cur_name_th', headerName: 'name(TH)', width: 200 },
    { field: 'cur_name_en', headerName: 'name(EN)', width: 200 },
    { field: 'cur_shot_name_th', headerName: 'Short Name(TH)', width: 150 },
    { field: 'cur_shot_name_en', headerName: 'Short Name(EN)', width: 150 },
    { field: 'dpm_id', headerName: 'Department', width: 120 },
    { field: 'faculty_institutes_fi_id', headerName: 'faculty', width: 120 },
    { field: 'release_year', headerName: 'release year', width: 300 }
  ]

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
          + Curriculums
        </Button>
        <ExportButton />
      </Box>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } }
        }}
        pageSizeOptions={[10, 25, 50]}
      />
      {/* เปิด Dialog Insert */}
      <CurriculumsDialog
        type={'insert'}
        data={data}
        open={openInsDialog}
        handleClose={() => setOpenInsDialog(false)}
        handleSubmit={console.log('Submit!')}
      />

      {/* เปิด Dialog Edit */}
      <CurriculumsDialog
        type={'edit'}
        data={data}
        rowdata={rowdata}
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
        handleSubmit={console.log('คาร์บิว')}
      />
    </CardContent>
  )
}

export default CurriculumsTab
