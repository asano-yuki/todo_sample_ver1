import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { fetchTodos, deleteTodo } from '@/features/todoSlice'
import {
  List as MuiList,
  ListItem,
  Button
} from '@material-ui/core'

import styles from './style.module.scss'

const List: React.FC = () => {
  const dispatch = useAppDispatch()
  const { list } = useAppSelector(state => state.todos)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const handleDeleteBtn: React.MouseEventHandler<HTMLButtonElement> = e => {
    const id = Number(e.currentTarget.dataset.id)
    dispatch(deleteTodo(id))
  }

  const items = list.map(item => {
    const { id, name } = item
    return (
      <ListItem key={id} className={styles.item}>
        <p className={styles.label}>・{name}</p>
        <Button
          color='secondary'
          variant='contained'
          size='small'
          data-id={id}
          onClick={handleDeleteBtn}
        >
          削 除
        </Button>
      </ListItem>
    )
  })

  return <MuiList>{items}</MuiList>
}

export default List