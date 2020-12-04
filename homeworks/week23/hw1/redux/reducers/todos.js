/* eslint-disable */
import { ADD_TODO, COMPLETED_TODO, CLEAR_TODOS, DELETE_TODO, UPDATE_TODO } from "../actionType";

let todoId = 0

const initialState = {
  todos: []
}

export default function todosReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, {
          id: todoId++,
          content: action.payload.content,
          completed: false,
        }]
      }
    }
    case COMPLETED_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if(todo.id !== action.payload.id) return todo
          return {
            ...todo,
            completed: !todo.completed,
          }
        })
      }
    }
    case UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if(todo.id !== action.payload.id) return todo
          return {
            ...todo,
            content: action.payload.content,
          }
        })
      }
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      }
    }
    case CLEAR_TODOS: {
      return {
        ...state,
        todos: [],
      }
    }
    default: {
      return state
    }
  }
}