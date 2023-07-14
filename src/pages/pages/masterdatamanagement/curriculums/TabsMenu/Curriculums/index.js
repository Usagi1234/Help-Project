import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import CurriculumsDialog from 'src/custom-components/Dialog/CurriculumsDialog'
import ConfirmDeleteDialog from 'src/custom-components/Dialog/ConfirmDeleteDialog'
import axios from 'axios'
import { useRouter } from 'next/router'

function CurriculumsTab({ data }) {
  // ตัวแปร เราเตอร์
  const router = useRouter() // Set Router
  const tableName = 'Curriculums'

  // Setstate CurriculumDialog
  const [openInsDialog, setOpenInsDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)

  // Setstate Delete
  const [deleteId, setDeleteId] = useState('') // set delete state
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [value, setValue] = useState('') // use when delete button is clicked

  //รับค่าจากแถวข้อมูล
  const [rowdata, setRowdata] = useState('')

  // console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }
  console.log('Cur: ', data)

  const DataExport = Object.values(data)?.map(val => ({
    NameTH: val.cur_name_th,
    NameEN: val.cur_name_en,
    ShortNameTH: val.cur_shot_name_th,
    ShortNameEN: val.cur_shot_name_en,
    Department: val.dpm_name_th,
    Faculty: val.fi_name_th,
    ReleaseYear: val.release_year
  }))

  // ประกาศ Colum
  const columns = [
    {
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      field: 'delete',
      headerName: 'Delete',
      width: 85,
      renderCell: cellValues => (
        <Button
          variant='contained'
          color='error'
          m={1}
          onClick={() => {
            setValue(cellValues.row)
            setDeleteId(cellValues.row.cur_id)
            setOpenConfirmDelete(true)

            // console.log(cellValues.row)
          }}
        >
          <Typography variant='caption' color={'white'}>
            Delete
          </Typography>
        </Button>
      )
    },
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
    { field: 'cur_name_th', headerName: 'Name(TH)', width: 200 },
    { field: 'cur_name_en', headerName: 'Name(EN)', width: 200 },
    { field: 'cur_shot_name_th', headerName: 'Short Name(TH)', width: 150 },
    { field: 'cur_shot_name_en', headerName: 'Short Name(EN)', width: 150 },
    { field: 'dpm_name_th', headerName: 'Department', width: 120 },
    { field: 'fi_name_th', headerName: 'Faculty', width: 120 },
    { field: 'release_year', headerName: 'Release Year', width: 300 }
  ]

  // ฟังก์ชัน Delete
  const handleClose = () => {
    setOpenConfirmDelete(false)
  }

  const handleDelete = () => {
    if (deleteId !== '') {
      axios
        .post(`http://111.223.38.19/api/method/frappe.API.MasterData.delete_data.delete`, {
          table: 'tabcurriculums',
          primary: deleteId
        })
        .then(function (response) {
          // console.log(response.message)
        })
        .catch(function (error) {
          // console.log(error)
        })
        .finally(() => {
          handleClose()
          router.replace(router.asPath)
        })
    } else {
      // console.log('not have any id to delete')
    }
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
          + Curriculums
        </Button>
        <ExportButton
          isEmpty={data?.length > 0 ? 0 : 1}
          fileName={tableName + '_' + Date().toLocaleString()}
          excelData={DataExport}
        />
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

        // handleSubmit={console.log('Submit!')}
      />

      {/* เปิด Dialog Edit */}
      <CurriculumsDialog
        type={'edit'}
        data={data}
        rowdata={rowdata}
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}

        // handleSubmit={console.log('คาร์บิว')}
      />

      {/* เปิด Dialog Delete */}
      <ConfirmDeleteDialog
        open={openConfirmDelete}
        value={value.cur_name_th + ' ' + value.cur_name_en}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </CardContent>
  )
}

export default CurriculumsTab
