import Grid from '@mui/material/Grid'
import { Fragment, useState } from 'react'
import HeaderCard from './HeaderCard'
import Path from './Path'
import Tabs from '../curriculums/TabsMenu'

const CurriculumsPage = ({ data }) => {
  console.log(data)

  return (
    <Fragment>
      <Path name={'test name'} path={'test path'} />
      <Grid container direction={'row'} item xs={12} spacing={2}>
        <Grid item xs={12}>
          <HeaderCard />
          <Tabs data={data} />
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default CurriculumsPage

export async function getServerSideProps(context) {
  const WrapData = []

  try {
    const queryCurriculums = await fetch(
      `${process.env.NEXT_PUBLIC_API}frappe.API.MasterData.curriculum.getAllcurriculums`
    )
    const resCurriculums = await queryCurriculums.json()
    if (!resCurriculums) {
      return { notFound: true }
    } else {
      const newRow = resCurriculums.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ curriculums: newRow })
    }
  } catch (err) {
    return { error: err }
  }

  return {
    props: { data: WrapData }
  }
}
