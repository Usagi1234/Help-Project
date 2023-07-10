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
  const queryAcademics = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.academic.getAllAcademics`)
  const queryAcademicType = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.academic_type.getallacademictype`)
  const queryFaculty = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.faculty.getAllfacultys`)
  const querySubjects = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.subject.getAllsubjects`)

  const querySubjectGroups = await fetch(
    `${process.env.NEXT_PUBLIC_API}.MasterData.subject_groups.getAllsubject_groups`
  )
  const querySubjectTypes = await fetch(`${process.env.NEXT_PUBLIC_API}.MasterData.subject_type.getAllsubject_type`)

  const querySubjectCategories = await fetch(
    `${process.env.NEXT_PUBLIC_API}.MasterData.subject_category.getAllsubject_category`
  )

  const resAcademics = await queryAcademics.json()
  const resAcademicType = await queryAcademicType.json()
  const resFaculty = await queryFaculty.json()
  const resSubjects = await querySubjects.json()
  const resSubjectGroups = await querySubjectGroups.json()
  const resSubjectTypes = await querySubjectTypes.json()
  const resSubjectCategories = await querySubjectCategories.json()

  const WrapData = {
    academics: resAcademics.message.Data,
    academictype: resAcademicType.message.Data,
    faculty: resFaculty.message.Data,
    subjects: resSubjects.message.Data,
    subjectgroups: resSubjectGroups.message.Data,
    subjecttype: resSubjectTypes.message.Data,
    subjectcategories: resSubjectCategories.message.Data
  }

  return {
    props: { data: WrapData }
  }
}
