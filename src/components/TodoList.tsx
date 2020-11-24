import React, { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'

import { Todo, ArrayTodoI } from '../interfaces'
import TodoItem from './TodoItem'
import TodoFilters from './TodoFilters'

export const GET_ALL_TODOS = gql`
  query {
    getAllTodos {
      id
      title
      completed
    }
  }
`

interface TodoListI {
  todos: Todo[]
}

const TodoList = (props: TodoListI) => {
  const { todos } = props

  const [state, setState] = useState({
    filter: 'all',
    clearInProgress: false
  })

  const filterResults = (filter: string) => {
    setState({
      ...state,
      filter: filter
    })
  }

  let filteredTodos = todos
  if (state.filter === 'active') {
    filteredTodos = todos.filter(todo => todo.completed !== true)
  } else if (state.filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed === true)
  }

  const todoList: Array<JSX.Element> = []
  filteredTodos.forEach((todo, index) => {
    todoList.push(<TodoItem key={index} todo={todo} />)
  })

  return (
    <>
      <TodoFilters todos={filteredTodos} currentFilter={state.filter} filterResultsFn={filterResults} />

      <div className='todoListWrapper'>
        <ul>{todoList}</ul>
      </div>
    </>
  )
}

const TodoListQuery = () => {
  const { loading, error, data } = useQuery(GET_ALL_TODOS)

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.error(error)
    return <div>Error!</div>
  }

  return <TodoList todos={data.getAllTodos} />
}
export default TodoListQuery
