import React from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
const Detail = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const { id } = useParams()
    const { data, error, isLoading } = useSWR(`https://dummyjson.com/users/${id}`, fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    if (!data) return <div>No data found</div>

  return (
    <div>
      detail
        <div className="bg-card-background flex bg-yellow-200 shadow-card-shadow p-4 mb-4 rounded">
            <h2 className="text-xl font-bold">{data.firstName} {data.lastName}</h2>
            <p>{data.id}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            </div>
    </div>
  )
}

export default Detail
