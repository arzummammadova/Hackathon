import React from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'

const Courses = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const navigate = useNavigate()

  const { data, error, isLoading } = useSWR('https://dummyjson.com/users', fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>


  const handleClick = (id) => {
    navigate(`/courses/${id}`)
  }



  return (
    <div>
      {data.users.map((user) => (
        <div key={user.id} className="bg-card-background  flex bg-yellow-200 shadow-card-shadow p-4 mb-4 rounded">
          <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>

          <p>{user.id}</p>

          <button onClick={() => { handleClick(user.id) }}>Go detail</button>

        </div>
      ))}
    </div>
  )
}

export default Courses
