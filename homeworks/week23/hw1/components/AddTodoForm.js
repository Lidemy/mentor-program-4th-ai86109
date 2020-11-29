/* eslint-disable */
import React, { useState } from 'react'
import styled from 'styled-components';

const AddTodoFormBlock = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

const AddTodoInput = styled.input`
  width: 92%;
  height: 32px;
  margin-right: 2px;
`;

const SubmitButton = styled.button`
  padding: 5px 7px;
`;

export default function AddTodoForm({addTodo}) {
  const [value, setValue] = useState("")
  return (
    <AddTodoFormBlock 
      onSubmit={(e) => {
        e.preventDefault()
        addTodo(value)
        setValue("")
      }}
    >
      <AddTodoInput
        value={value} 
        onChange={(e) => setValue(e.target.value)}
      />
      <SubmitButton>新增</SubmitButton>
    </AddTodoFormBlock>
  )
}
