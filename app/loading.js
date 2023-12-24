import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const loading = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen z-10'>
      <CircularProgress color="secondary" />
    </div>
  )
}

export default loading
