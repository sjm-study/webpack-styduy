import React, { useState, useEffect, useRef } from 'react'
import styles from '@/styles/index.less'
import ReactDOM from 'react-dom'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { Button, Spin } from 'antd'

const Home = () => {

  const [loading, setLoading] = useState(true)
  const renderRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      const content = <div className='home_insert'>
        <span>insert</span>
      </div>
      
      //  hydrateRoot(renderRef.current,content)

      const root = createRoot(renderRef.current)
      root.render(content)

      setLoading(false)
    }, 2000);
  }, [])

  return (
    <>
      <h1 className={styles.h1} >Home!!!!!</h1>
      <Button type='primary'>Button</Button>
      <div style={{ color: 'var(--ant-primary-color)' }} >585555</div>

      <Spin spinning={loading}>
        <div ref={renderRef}></div>
      </Spin>

    </>
  )
}

export default Home