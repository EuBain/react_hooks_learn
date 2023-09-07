import { Tabs, TabsProps } from 'antd';
import React, { useEffect } from 'react'
import { markList } from './constant';
import MarkDownInHTML from '@/components/MarkDownInHTML';
import { Navigate, useNavigate } from 'react-router-dom';

const items: TabsProps['items'] =markList.map((item,index) => ({
    key: (index+1).toString(),
    label: item.name,
    children: <MarkDownInHTML url={item.url}></MarkDownInHTML>
})
)

const Mark = () => {
    const onChange = (key: string) => {
        console.log(key);
      };
      const navigate = useNavigate()

  
  //     function a () {
  //       b()
  //       console.log(3)
  //       return;
  //   }
    
  //   async  function b() {
  //   let i = 10
  //        while(i > 0) {
  //           i -= 1
  //           const ff = await 
  //           new Promise((resolve) => {
  //               setTimeout(() => resolve('2'), 2000)
  //           })
  //           console.log(ff) 
  //       }
  //   }
  //   useEffect(()=>{
  //   return ()=> {
  //     console.log('销毁了')
  //   }
  // })
  return (   
    <div>
          <div onClick={() => navigate('/home')}>mark</div>
    {/* <input type="file" onChange={a}/> */}
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default Mark