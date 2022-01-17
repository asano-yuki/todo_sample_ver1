import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type Todo = {
  id: number,
  name: string
}

interface ITodoState {
  input: string
  list: Todo[]
}

const initialState: ITodoState = {
  input: '',
  list: []
}

const origin = 'http://localhost:3002'

// 全てのTodoを取得する
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const res = await axios.get(`${origin}/todos`)
    return res.data
  }
)

// Todoを登録する
export const registInput = createAsyncThunk(
  'todos/registTodo',
  async (name: string) => {
    const res = await axios.post(`${origin}/todo`, { name })
    return res.data
  }
)

// Todoを削除する
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    axios.delete(`${origin}/todo/${id}`)
    return id
  }
)

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ITodoState['list']>) => {
        state.list = action.payload
      })
      .addCase(registInput.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.list.push(action.payload)
        state.input = ''
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.list = state.list.filter(item => item.id !== action.payload)
      })
  }
})

export const { setInput } = todoSlice.actions

export default todoSlice.reducer