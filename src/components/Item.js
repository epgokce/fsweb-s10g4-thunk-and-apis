import React from 'react'


function Item({ data }) {
  return (
    <div className='shadow-md bg-white text-left'>
      <p className='text-2xl p-4'><span className='text-3xl text-blue-700'>Activity: </span>{data.activity}</p>
      <p className='text-2xl p-4'><span className='text-3xl text-blue-700'>Type: </span>{data.type}</p>
    </div>
  )
}

export default Item