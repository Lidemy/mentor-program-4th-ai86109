/* eslint-disable */
import { ADD_TODO, CHANGE_FILTER, COMPLETED_TODO, UPDATE_TODO, DELETE_TODO, CLEAR_TODOS } from './actionType'

export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      content,
    }
  }
}

export function completedTodo(id) {
  return {
    type: COMPLETED_TODO,
    payload: {
      id,
    }
  }
}

export function updateTodo(id, content) {
  return {
    type: UPDATE_TODO,
    payload: {
      id,
      content,
    }
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    }
  }
}

export function clearTodos() {
  return {
    type: CLEAR_TODOS,
  }
}

export function changeFilter(filter) {
  return {
    type: CHANGE_FILTER,
    payload: {
      filter,
    }
  }
}