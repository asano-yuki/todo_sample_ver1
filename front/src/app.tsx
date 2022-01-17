import React from 'react'
import { hot } from 'react-hot-loader/root'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider } from '@material-ui/core/styles'
import Input from '@/components/Input'
import List from '@/components/List'

import styles from './app.module.scss'

const App = () => {
  return (
    <>
      <CssBaseline />
      <StylesProvider injectFirst>
        <div className={styles.root}>
          <Input />
          <div className={styles.list}>
            <List />
          </div>
        </div>
      </StylesProvider>
    </>
  )
}

export default hot(App)