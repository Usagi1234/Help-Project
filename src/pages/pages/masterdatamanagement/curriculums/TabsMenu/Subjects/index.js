import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import InstructorDialog from 'src/custom-components/Dialog/InstructorDialog'
import ConfirmDeleteDialog from 'src/custom-components/Dialog/ConfirmDeleteDialog'
import axios from 'axios'
import { useRouter } from 'next/router'
import SubjectsDialog from 'src/custom-components/Dialog/SubjectDialog'

function SubjectsTab({ data, subjectGroups }) {
  const [openIns, setOpenIns] = useState(false)

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
            console.log(cellValues.row.sj_id)
            // setValue(cellValues.row)
            // setDeleteId(cellValues.row.ist_id)
            // setOpenConfirmDelete(true)
          }}
        >
          <Typography variant='caption' color={'white'}>
            Delete
          </Typography>
        </Button>
      )
    },
    {
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: cellValues => (
        <Button
          variant='text'
          onClick={() => {
            console.log(cellValues.row)
            // setInstructor(cellValues.row)
            // setOpenEditDialog(true)
          }}
        >
          ...
        </Button>
      )
    },
    {
      field: 'sj_name_th',
      headerName: 'name(TH)',
      width: 120
    },
    { field: 'subject_group_sjg_id', headerName: 'subject group', width: 120 },
    { field: 'sj_theory_credit', headerName: 'theory', width: 120 },
    { field: 'sj_action_credit', headerName: 'action', width: 100 },
    { field: 'sj_ot_credit', headerName: 'ot', width: 100 },
    { field: 'sj_credit', headerName: 'credit', width: 100 },
    { field: 'cur_shot_name_th', headerName: 'curriculum', width: 140 }
  ]

  console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return (
    <CardContent>
      <Box sx={{ mb: 2 }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={() => setOpenIns(true)}>
          + Subject
        </Button>
        <ExportButton
        // isEmpty={data?.length > 0 ? 0 : 1}
        // fileName={tableName + '_' + Date().toLocaleString()}
        // excelData={DataExport}
        />
      </Box>
      {data?.length > 0 && (
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
        />
      )}
      <SubjectsDialog Dialogtype={'insert'} open={openIns} subjectGroups={subjectGroups} handleClose={setOpenIns} />
      {/* <InstructorDialog
        instructor={instructor}
        Dialogtype={'edit'}
        open={openEditDialog}
        handleClose={setOpenEditDialog}
      /> */}
      {/* <ConfirmDeleteDialog
        open={openConfirmDelete}
        value={value.ist_fname_th + ' ' + value.ist_lname_th}
        handleClose={handleClose}
        handleDelete={handleDelete}
      /> */}
    </CardContent>
  )
}

export default SubjectsTab
