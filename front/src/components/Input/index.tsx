import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setInput, registInput } from '@/features/todoSlice'
import { Input as MuiInput, Button } from '@material-ui/core'

import styles from './style.module.scss'

const Input: React.FC = () => {
  const input = useAppSelector(state => state.todos.input)
  const dispatch = useAppDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim()
    const val = input.length > 20 ? input.substring(0, 20) : input
    dispatch(setInput(val))
  }

  const handleRegistClick = () => {
    dispatch(registInput(input))
  }

  return (
    <div className={styles.root}>
      <MuiInput
        className={styles.input}
        placeholder='ToDoを入力してください'
        onChange={handleInputChange}
        value={input}
      />
      <Button
        className={styles.btn}
        color='primary'
        variant='contained'
        disabled={!input}
        onClick={handleRegistClick}
      >
        登 録
      </Button>
    </div>
  )
}

export default Input