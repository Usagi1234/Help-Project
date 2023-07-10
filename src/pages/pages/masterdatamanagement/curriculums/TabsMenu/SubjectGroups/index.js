import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import axios from 'axios'
import { useRouter } from 'next/router'
import SubjectGroupDialog from 'src/custom-components/Dialog/SubjectGroupDialog'

const columns = [
  {
    field: '',
    headerName: 'Edit',
    width: 100,
    renderCell: cellValues => (
      <Button
        variant='text'
        onClick={() => {
          console.log(cellValues.row)
        }}
      >
        ...
      </Button>
    )
  },
  { field: 'ac_name_th', headerName: 'name(TH)', width: 120 },
  { field: 'ac_name_en', headerName: 'name(EN)', width: 150 },
  { field: 'ac_type_name_th', headerName: 'type(TH)', width: 150 },
  { field: 'ac_type_name_en', headerName: 'type(EN)', width: 150 },
  { field: 'ac_tel', headerName: 'tel', width: 120 },
  { field: 'ac_address', headerName: 'address', width: 300 }
]

if (!data || data.length === 0) {
  return <p>No data available.</p> // Display a message when rows are empty or undefined
}

function SubjectGroupsTab() {
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
        getRowId={row => row.ac_id}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } }
        }}
        pageSizeOptions={[10, 25, 50]}
      />
      <SubjectGroupDialog header={'Insert Form'} open={openInsDialog} handleClose={() => setOpenInsDialog(false)} />
    </CardContent>
  )
}

export default SubjectGroupsTab
