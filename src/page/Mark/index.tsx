import { Tabs, TabsProps } from 'antd';
import React from 'react'
import { markList } from './constant';
import MarkDownInHTML from '@/components/MarkDownInHTML';

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
      

  return (   
    <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default Mark