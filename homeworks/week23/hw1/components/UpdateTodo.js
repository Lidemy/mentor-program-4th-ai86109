/* eslint-disable */
import React, { useState } from 'react'
import styled from 'styled-components';

const EditInput = styled.input`
  height: 20px;
  margin-right: 2px;
`;

const TodoListText = styled.div`
  font-size: 18px;
`;

const TodoListTextActive = styled.div`
  font-size: 18px;
  text-decoration: line-through;
  color: rgb(111, 110, 110);
`;

export default function UpdateTodo({todo, updateTodo}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.content)

  const handleUpdateTodo = () => {
    setIsEditing(true)
  }

  const handleKeyPress = (e) => {
    if(e.key !== 'Enter') return
    if(e.target.value === '') return
    updateTodo(todo.id, editValue)
    setIsEditing(false)
  }

  return (
    <>
      {
        isEditing ? 
        <EditInput 
          value={editValue} 
          onChange={(e) => setEditValue(e.target.value)}
          onKeyPress={handleKeyPress}
        /> :
        (todo.completed === true ? 
          <TodoListTextActive onDoubleClick={handleUpdateTodo}>{todo.content}</TodoListTextActive> :
          <TodoListText onDoubleClick={handleUpdateTodo}>{todo.content}</TodoListText>
        )
      }
    </>
  )
}
