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

  //? API curriculums
  try {
    const queryCurriculums = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.curriculum.getAllcurriculums`)
    const resCurriculums = await queryCurriculums.json()
    if (!resCurriculums) {
      WrapData.push({ curriculums: [] })
    } else {
      const newRow = resCurriculums.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ curriculums: newRow })
    }
  } catch (err) {
    WrapData.push({ curriculums: [] })
  }

  //? API subjects
  try {
    const querySubjects = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.subject.getAllsubjects`)
    const resSubjects = await querySubjects.json()
    if (!resSubjects) {
      WrapData.push({ subjects: [] })
    } else {
      const newRow = resSubjects.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ subjects: newRow })
    }
  } catch (err) {
    WrapData.push({ subjects: [] })
  }

  //? API subject Groups
  try {
    const querySubjectGroups = await fetch(
      `${process.env.NEXT_PUBLIC_API}.MasterData.subject_groups.getAllsubject_groups`
    )
    const resSubjectGroups = await querySubjectGroups.json()
    if (!resSubjectGroups) {
      WrapData.push({ subjectGroups: [] })
    } else {
      const newRow = resSubjectGroups.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ subjectGroups: newRow })
    }
  } catch (err) {
    WrapData.push({ subjectGroups: [] })
  }

  //? API subjectTypes
  try {
    const querySubjectTypes = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.subject_type.getAllsubject_type`)
    const resSubjectTypes = await querySubjectTypes.json()
    if (!resSubjectTypes) {
      WrapData.push({ subjectTypes: [] })
    } else {
      const newRow = resSubjectTypes.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ subjectTypes: newRow })
    }
  } catch (err) {
    WrapData.push({ subjectTypes: [] })
  }

  //? API subjectCategories
  try {
    const querySubjectCategories = await fetch(
      `${process.env.NEXT_PUBLIC_API}.MasterData.subject_category.getAllsubject_category`
    )
    const resSubjectCategories = await querySubjectCategories.json()
    if (!resSubjectCategories) {
      WrapData.push({ subjectCategories: [] })
    } else {
      const newRow = resSubjectCategories.message.Data.map((row, index) => ({
        ...row,
        id: index + 1 // กำหนด id ใหม่โดยใช้ index + 1 เป็นค่า
      }))
      WrapData.push({ subjectCategories: newRow })
    }
  } catch (err) {
    WrapData.push({ subjectCategories: [] })
  }

  return {
    props: { data: WrapData }
  }
}

// export async function getServerSideProps() {
//   try {
//     const api1 = fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.curriculum.getAllcurriculums`)
//     const api2 = fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.subject.getAllsubjects`)
//     const api3 = fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.subject_groups.getAllsubject_groups`)
//     const api4 = fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.subject_type.getAllsubject_type`)
//     const api5 = fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.subject_category.getAllsubject_category`)

//     const [response1, response2, response3, response4, response5] = await Promise.all([api1, api2, api3, api4, api5])

//     const data1 = response1.ok ? await response1.json() : {}
//     const data2 = response2.ok ? await response2.json() : {}
//     const data3 = response3.ok ? await response3.json() : {}
//     const data4 = response4.ok ? await response4.json() : {}
//     const data5 = response5.ok ? await response5.json() : {}

//     const curriculums = data1.message.Data.map((row, index) => ({
//       ...row,
//       id: index + 1
//     }))

//     const subjects = data2.message.Data.map((row, index) => ({
//       ...row,
//       id: index + 1
//     }))

//     const subjectGroups = data3.message.Data.map((row, index) => ({
//       ...row,
//       id: index + 1
//     }))

//     const subjectTypes = data4.message.Data.map((row, index) => ({
//       ...row,
//       id: index + 1
//     }))

//     const subjectCategory = data5.message.Data.map((row, index) => ({
//       ...row,
//       id: index + 1
//     }))

//     return {
//       props: {
//         data: {
//           curriculums,
//           subjects,
//           subjectGroups,
//           subjectTypes,
//           subjectCategory
//         }
//       }
//     }
//   } catch (error) {
//     return {
//       props: {
//         error: error.message
//       }
//     }
//   }
// }
