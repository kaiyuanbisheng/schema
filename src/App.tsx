import React, { useEffect, useState } from 'react'
import './App.css';
import ListItem from './components/listItem';
import { getUuid } from './utils';
import api from './utils/request';

export default function App() {
  const [data, setData] = useState<any>()
  useEffect(() => {
    api.get('https://systemjs.1688.com/krump/schema/1352.json').then(res => {
      if (res?.status === 200) {
        setData(res.data?.list)
      }
    })
  }, [])
  return (
    <div className='app'>
      <header>1688进货红包</header>
      <div className='concent'>
        {data?.map((item: any) => (
          <ListItem showData={item} key={getUuid()} />
        ))}
      </div>
    </div>
  )
}
