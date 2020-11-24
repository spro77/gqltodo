import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { GET_ALL_TODOS } from './TodoList'

// import { Todo, TodoInput } from './interfaces'

const ADD_TODO = gql`
  mutation($todo: TodoInput!) {
    addTodo(todo: $todo) {
      id
      title
      completed
    }
  }
`

const TodoInput = () => {
  const [todoInput, setTodoInput] = useState('')

  const updateCache = (cache: any, { data }: any) => {
    const existingTodos = cache.readQuery({
      query: GET_ALL_TODOS
    })

    const newTodo = data.addTodo

    cache.writeQuery({
      query: GET_ALL_TODOS,
      data: { getAllTodos: [newTodo, ...existingTodos.getAllTodos] }
    })
  }

  const resetInput = () => {
    setTodoInput('')
  }

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache,
    onCompleted: resetInput
  })

  return (
    <form
      className='formInput'
      onSubmit={e => {
        e.preventDefault()
        addTodo({ variables: { todo: { title: todoInput } } })
      }}
    >
      <input
        className='input'
        value={todoInput}
        placeholder='What needs to be done?'
        onChange={e => setTodoInput(e.target.value)}
      />
      <i className='inputMarker fa fa-angle-right' />
    </form>
  )
}

export default TodoInput
