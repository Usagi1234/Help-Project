import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import ExportButton from 'src/custom-components/BtnExport'
import axios from 'axios'
import { useRouter } from 'next/router'
import SubjectGroupDialog from 'src/custom-components/Dialog/SubjectGroupDialog'

function SubjectGroupsTab({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return <CardContent></CardContent>
}

export default SubjectGroupsTab
