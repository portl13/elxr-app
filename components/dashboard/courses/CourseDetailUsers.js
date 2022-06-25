import React from 'react'
import { courseDetailUsersStyle } from './CourseDetailUsers.style'

function CourseDetailUsers({ users }) {
  console.log(
    '🚀 ~ file: CourseDetailUsers.js ~ line 5 ~ CourseDetailUsers ~ users',
    users
  )
  return (
    <div css={courseDetailUsersStyle} className="mt-5">
      <h4 className="text-uppercase">participants ({users?.enrolled_users})</h4>
      <div className='card-courses-users mt-4'>
        {users &&
          users?.users.map((user) => (
            <article className="card-courses-user d-flex flex-column align-items-center mb-4" key={user.id}>
              <div className="card-courses-avatar mb-3">
                <img src={user.avatar} alt={user.display_name} />
              </div>
              <span className="card-courses-title">{user.display_name}</span>
            </article>
          ))}
      </div>
    </div>
  )
}

export default CourseDetailUsers
