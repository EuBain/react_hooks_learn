import React, { FC } from 'react'
import * as rr from 'react-router-dom'

const Home:FC = () => {
  const navigate = rr.useNavigate()

  const a = {foo: '232' ,bar: {biz: '1'}}
  const b = a 
  b.bar.ccc = [2]
  console.log(Object.is(b,a),'a',a,'b',b)
  return (
    <div>Home</div>
  )
}

export default Home