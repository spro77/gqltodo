export interface Todo {
  id: string
  title: string
  completed: boolean
}

export interface TodoInputI {
  title: string
}

export interface ArrayTodoI {
  getAllTodos: Todo[]
}
