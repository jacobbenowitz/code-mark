import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, this page was not found</p>
      <Link to="/">Back to the homepage...</Link>
    </div>
  )
}
