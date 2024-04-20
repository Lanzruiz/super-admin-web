import React from 'react'

export default function ObjectReader({item}) {
  return (
      <>
          {Array.isArray(item) && console.log("ARRAY",item)}
          { typeof item === 'object' && console.log("OBJECT: ",item)} 
      </>
  )
}
