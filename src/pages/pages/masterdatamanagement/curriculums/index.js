import Grid from '@mui/material/Grid'
import { Fragment, useState } from 'react'
import HeaderCard from './HeaderCard'
import Tabs from '../curriculums/TabsMenu'

const CurriculumsPage = ({ data }) => {
  console.log(data)

  return (
    <Fragment>
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
    const queryCurriculums = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.curriculum.getAllcurriculums`)
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
  try {
    const querySubjects = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.subject.getAllsubjects`)
    const resSubjects = await querySubjects.json()
    if (!resSubjects) {
      return { notFound: true }
    } else {
      const newRow = resSubjects.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ subjects: newRow })
    }
  } catch (err) {
    return { error: err }
  }
  // try {
  //   const querySubjectGroups = await fetch(
  //     `${process.env.NEXT_PUBLIC_API}.MasterData.subject_groups.getAllsubject_groups`
  //   )
  //   const resSubjectGroups = await querySubjectGroups.json()
  //   if (!resSubjectGroups) {
  //     return { notFound: true }
  //   } else {
  //     const newRow = resSubjectGroups.message.Data.map((row, index) => ({
  //       ...row,
  //       id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
  //     }))
  //     WrapData.push({ subjectgroups: newRow })
  //   }
  // } catch (err) {
  //   return { error: err }
  // }

  WrapData.push({ subjectgroups: [] })

  try {
    const querySubjectTypes = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.subject_type.getAllsubject_type`)
    const resSubjectTypes = await querySubjectTypes.json()
    if (!resSubjectTypes) {
      return { notFound: true }
    } else {
      const newRow = resSubjectTypes.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ subjecttypes: newRow })
    }
  } catch (err) {
    return { error: err }
  }
  try {
    const querySubjectCategories = await fetch(
      `${process.env.NEXT_PUBLIC_API}.MasterData.subject_category.getAllsubject_category`
    )

    const resSubjectCategories = await querySubjectCategories.json()
    if (!resSubjectCategories) {
      return { notFound: true }
    } else {
      const newRow = resSubjectCategories.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ subjectcategories: newRow })
    }
  } catch (err) {
    return { error: err }
  }

  return {
    props: { data: WrapData }
  }
}
