import React from 'react'
import { Todo } from '../interfaces'

interface TodoFiltersI {
  todos: Todo[]
  currentFilter: string
  filterResultsFn: (filter: string) => void
}

const TodoFilters = (props: TodoFiltersI) => {
  const { todos, currentFilter, filterResultsFn } = props

  const filterResultsHandler = (filter: string) => {
    return () => {
      filterResultsFn(filter)
    }
  }

  const activeTodos = todos.filter(todo => todo.completed !== true)

  let itemCount = todos.length
  if (currentFilter === 'active') {
    itemCount = activeTodos.length
  } else if (currentFilter === 'completed') {
    itemCount = todos.length - activeTodos.length
  }

  return (
    <div className='footerList'>
      <ul>
        <li onClick={filterResultsHandler('all')}>
          <a href='/#' className={currentFilter === 'all' ? 'selected' : ''}>
            All
          </a>
        </li>

        <li onClick={filterResultsHandler('active')}>
          <a href='/#' className={currentFilter === 'active' ? 'selected' : ''}>
            Active
          </a>
        </li>

        <li onClick={filterResultsHandler('completed')}>
          <a href='/#' className={currentFilter === 'completed' ? 'selected' : ''}>
            Completed
          </a>
        </li>
      </ul>
      <span>
        {itemCount} item
        {itemCount !== 1 ? 's' : ''}
      </span>
      <div style={{ width: '200px' }}></div>
    </div>
  )
}

export default TodoFilters
