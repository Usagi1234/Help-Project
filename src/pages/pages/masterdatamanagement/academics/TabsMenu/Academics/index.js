import React, { useState } from 'react'
import axios from 'axios'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import ExportButton from '../../../../../../custom-components/BtnExport'
import AcademicDialog from 'src/custom-components/Dialog/AcademicsDialog'
import ConfirmDeleteDialog from 'src/custom-components/Dialog/ConfirmDeleteDialog'
import { useRouter } from 'next/router'

function AcademicsTab({ data }) {
  const router = useRouter() // Set Router

  // Setstate AcademicDialog
  const [openInsDialog, setOpenInsDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)

  // Setstate Delete
  const [deleteId, setDeleteId] = useState('') // set delete state
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [value, setValue] = useState('') // use when delete button is clicked

  //รับค่าจากแถวข้อมูล
  const [rowdata, setRowdata] = useState('')
  const tableName = 'Academics'

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
            setDeleteId(cellValues.row.ac_id)
            setOpenConfirmDelete(true)
            console.log(cellValues.row)
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
    { field: 'ac_name_th', headerName: 'name(TH)', width: 200 },
    { field: 'ac_name_en', headerName: 'name(EN)', width: 200 },
    { field: 'ac_type_name_th', headerName: 'type(TH)', width: 150 },
    { field: 'ac_type_name_en', headerName: 'type(EN)', width: 150 },
    { field: 'ac_tel', headerName: 'tel', width: 120 },
    { field: 'ac_campus', headerName: 'campus', width: 120 },
    { field: 'ac_address', headerName: 'address', width: 300 }
  ]

  const DataExport = data?.map(val => ({
    AcademicNameTH: val.ac_name_th,
    AcademicNameEN: val.ac_name_en,
    AcademicTypeTH: val.ac_type_name_th,
    AcademicTypeEN: val.ac_type_name_en,
    AcademicTel: val.ac_tel,
    Campus: val.ac_campus,
    Address: val.ac_address
  }))

  // ฟังก์ชัน Delete
  const handleClose = () => {
    setOpenConfirmDelete(false)
  }

  const handleDelete = () => {
    if (deleteId !== '') {
      axios
        .post(`${process.env.NEXT_PUBLIC_API}.MasterData.delete_data.delete`, {
          table: 'tabacademics',
          primary: deleteId
        })
        .then(function (response) {
          // console.log(response.message)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
          handleClose()
          router.replace(router.asPath)
        })
    } else {
      console.log('not have any id to delete')
    }
  }

  if (!data || data.length === 0) {
    return (
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
            + Academic
          </Button>
        </Box>
        <AcademicDialog type={'insert'} data={data} open={openInsDialog} handleClose={() => setOpenInsDialog(false)} />
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <img
            src='https://cdn.dribbble.com/users/634336/screenshots/2246883/media/21b6eeac8c36a79c6b4b2a1930bd89a6.png'
            alt='Image'
          />
        </Box>
      </CardContent>
    ) // Display a message when rows are empty or undefined
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenInsDialog(true)}>
          + Academic
        </Button>
        <ExportButton
          isEmpty={data?.length > 0 ? 0 : 1}
          fileName={tableName + '_' + Date().toLocaleString()}
          excelData={DataExport}
        />
      </Box>
      {data.length > 0 && (
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } }
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      )}

      {/* เปิด Dialog Insert */}
      <AcademicDialog
        type={'insert'}
        data={data}
        open={openInsDialog}
        handleClose={() => setOpenInsDialog(false)}

        // handleSubmit={console.log('Submit!')}
      />

      {/* เปิด Dialog Edit */}
      <AcademicDialog
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
        value={value.ac_name_th + ' ' + value.ac_name_en}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </CardContent>
  )
}

export default AcademicsTab
