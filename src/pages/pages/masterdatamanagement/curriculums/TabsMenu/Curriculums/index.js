import React, { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'

function CurriculumsTab({ data }) {
  console.log(data)
  if (!data || data.length === 0) {
    return <p>No data available.</p> // Display a message when rows are empty or undefined
  }

  return <CardContent></CardContent>
}

export default CurriculumsTab
