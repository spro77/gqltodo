import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { GET_ALL_TODOS } from './TodoList'
import { Todo, ArrayTodoI } from '../interfaces'

interface TodoItemI {
  todo: Todo
}

const TodoItem = (props: TodoItemI) => {
  const { todo } = props
  const REMOVE_TODO = gql`
    mutation($id: ID) {
      removeTodo(id: $id) {
        id
        title
        completed
      }
    }
  `

  const [removeTodoMutation] = useMutation(REMOVE_TODO)

  const removeTodo = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeTodoMutation({
      variables: { id: todo.id },
      optimisticResponse: true,

      update: cache => {
        const existingTodos: ArrayTodoI | null = cache.readQuery({ query: GET_ALL_TODOS })

        const newTodos = existingTodos && existingTodos.getAllTodos.filter((t: Todo) => t.id !== todo.id)

        cache.writeQuery({
          query: GET_ALL_TODOS,
          data: { getAllTodos: newTodos }
        })
      }
    })
  }

  const UPDATE_TODO = gql`
    mutation($id: ID!) {
      updateTodo(id: $id) {
        title
        completed
      }
    }
  `
  const [updateTodoMutation] = useMutation(UPDATE_TODO)

  const updateTodo = () => {
    updateTodoMutation({
      variables: { id: todo.id },
      optimisticResponse: true,
      update: cache => {
        const existingTodos: ArrayTodoI | null = cache.readQuery({ query: GET_ALL_TODOS })

        const newTodos =
          existingTodos &&
          existingTodos.getAllTodos.map((t: Todo) => {
            if (t.id === todo.id) {
              return { ...t, completed: !t.completed }
            } else {
              return t
            }
          })
        cache.writeQuery({
          query: GET_ALL_TODOS,
          data: { getAllTodos: newTodos }
        })
      }
    })
  }

  return (
    <li>
      <div className='view'>
        <div className='round'>
          <input checked={todo.completed} type='checkbox' id={todo.id} onChange={updateTodo} />
          <label htmlFor={todo.id} />
        </div>
      </div>

      <div className={'labelContent' + (todo.completed ? ' completed' : '')}>
        <div>{todo.title}</div>
      </div>

      <button className='closeBtn' onClick={removeTodo}>
        x
      </button>
    </li>
  )
}

export default TodoItem
