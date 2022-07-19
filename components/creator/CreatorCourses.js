import { getCreator } from '@request/creator';
import React from 'react'
import useSWR from 'swr';


const coursesUrl = `${process.env.apiV2}/ldlms/v2/users/`

function CreatorCourses({creator_id}) {
    const { data: courses, error } = useSWR(`${coursesUrl}${creator_id}&page=1&per_page=4`, getCreator);
    // const isLoading = !courses && !error
    // const mutateCourses= () => {}
    console.log(courses)
  return (
    <div>

    </div>
  )
}

export default CreatorCourses