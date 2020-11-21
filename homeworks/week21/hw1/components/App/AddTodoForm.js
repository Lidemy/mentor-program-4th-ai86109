/*eslint-disable*/
import React from 'react';
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
  padding: 5px 8px;
`;

export default function AddTodoForm({value, handleFormSubmit, handleInputChange}) {
  return (
    <AddTodoFormBlock onSubmit={handleFormSubmit}>
      <AddTodoInput
      value={value} 
      onChange={handleInputChange}
      />
      <SubmitButton>新增</SubmitButton>
    </AddTodoFormBlock>
  )
}