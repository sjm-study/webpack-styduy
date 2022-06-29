import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import styles from './index.less'
import { Button, Spin, ConfigProvider,Result } from 'antd'
import { isBoolean } from 'lodash'
import { componentDidMound } from './utils/test'
import minStyles from './styles/index.less'
import { Route, BrowserRouter, Routes, useNavigate, Navigate } from 'react-router-dom'
import TestComponents from './components/test.jsx'
// import Home from './pages/home.jsx'
// import List from './pages/list.jsx'

// const Home = lazy(() => import('./pages/home.jsx'))
// const List = lazy(() => import('./pages/list.jsx'))

const Home = lazy(() => import('./pages/home.jsx'))
const List = lazy(() => import('./pages/list.jsx'))

import 'antd/dist/antd.variable.min.css';

const App = () => {

  React.useEffect(() => {
    componentDidMound()
    console.log('lodash', isBoolean(true))
    ConfigProvider.config({
      theme: {
        primaryColor: 'green'
      }
    })

  }, [])

  return (
    <BrowserRouter basename={'https://sjm-study.github.io/webpack-styduy'}>
      <Suspense fallback={<Spin />}>
        <Routes>

          {/* <Route path='/404' element={<NoMatch />} /> */}
          <Route path="/" element={<Redirect />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<List />} />

          {/* 404 */}
          {/* <Route path='/*' element={<NoMatch />} /> */}
          <Route path="/*" element={<NoMatch />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

const NoMatch = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="40411"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => navigate('/home')} >Back Home</Button>}
    />
  )
}

const Redirect = (props) => {
  const navigate = useNavigate()
  // console.log(navigate)

  return (
    <div className={minStyles.wrapper}>
      <h1>Hello World!</h1>
      <TestComponents />
      <Button type='primary' onClick={() => navigate('/home')}>Home</Button>
      <Button type='primary' onClick={() => navigate('/list')}>List</Button>
      <Button type='primary' onClick={() => navigate('/qqq')}>404</Button>
      {/* <Button type='primary'>Home</Button>
      <Button type='primary'>List</Button> */}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
