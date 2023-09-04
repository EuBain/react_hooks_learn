import React, { FC, useEffect } from 'react'
import * as rr from 'react-router-dom'

const Home:FC = () => {
  const navigate = rr.useNavigate()

  
//   function a () {
//     b()
//     console.log(3)
//     return;
// }

// async  function b() {
// let i = 10
//      while(i > 0) {
//         i -= 1
//         const ff = await 
//         new Promise((resolve) => {
//             setTimeout(() => resolve('2'), 2000)
//         })
//         console.log(ff) 
//     }
// }
useEffect(()=>{
return ()=> {
  console.log('销毁了')
}
}, [])
  return (
  <>
    <div onClick={() => navigate('/mark')}>Home</div>
    {/* <input type="file" onChange={a}/> */}
  </>
  )
}

export default Home