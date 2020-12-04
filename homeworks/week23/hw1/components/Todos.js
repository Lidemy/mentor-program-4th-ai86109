/* eslint-disable */
import React from 'react'
import styled from 'styled-components';
import UpdateTodo from './UpdateTodo';

const TodoListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px 16px;
`;

const TodoListBody = styled.div`
  display: flex;
  height: 24px;
`;

const TodoListCheckbox = styled.div`
  margin: 0 20px 0 0;
  width: 24px;
  height: 24px;
  border: solid 1px black;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;

const TodoListCheckboxActive = styled.div`
  &::after {
    content: 'V';
    font-weight: bold;
    display: block;
    margin: 0 20px 0 0;
    width: 24px;
    height: 24px;
    border: solid 1px black;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }
`;

const TodoListText = styled.div`
  font-size: 18px;
`;

const TodoListTextActive = styled.div`
  font-size: 18px;
  text-decoration: line-through;
  color: rgb(111, 110, 110);
`;

const TodoListDelete = styled.div`
  &:hover {
    color: brown;
    cursor: pointer;
  }
`;

export default function Todos({todos, filter, completedTodo, deleteTodo, updateTodo}) {
  return (
    <>
      {todos.filter((todo) => {
          if(filter === 'task') {
            return todo.completed === false
          } else if(filter === 'completed') {
            return todo.completed === true
          } else {
            return todo
          }
        }).map((todo) => (
        <TodoListContainer>
          <TodoListBody>
            {todo.completed === true ? <TodoListCheckboxActive onClick={() => {
              completedTodo(todo.id)
            }} /> : <TodoListCheckbox onClick={() => {
              completedTodo(todo.id)
            }} />}
            <UpdateTodo todo={todo} updateTodo={updateTodo} />
          </TodoListBody>
          <TodoListDelete onClick={() => {
            deleteTodo(todo.id)
          }}>X</TodoListDelete>
        </TodoListContainer>
      ))}
    </>
  )
}
