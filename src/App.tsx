import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import './App.css'

import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='row container-fluid p-left-right-0 m-left-right-0'>
        <div className='row col-md-9 p-left-right-0 m-left-right-0'>
          <div className='col-md-6 sliderMenu p-30'>
            <TodoInput />
            <TodoList />
          </div>
        </div>
      </div>
    </ApolloProvider>
  )
}

export default App
