import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => <div>
  <h1 style={{ textAlign: 'center', marginTop: 100 }}>Page Not Found</h1>
  <Link to='/posts'><p style={{ textAlign: 'center' }}>Posts Home</p></Link>
</div>
