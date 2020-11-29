/* eslint-disable */
import React from 'react'
import styled from 'styled-components';

const TodoFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: grey;
  padding: 10px 10px 0 10px;
`;

const TodoFilterButtons = styled.div`
  display: flex;
`;

const TodoFilterButton = styled.div`
  padding: 8px 16px;
  color: white;
  cursor: pointer;
  &:hover {
    background: white;
    color: black;
  }
`;

const TodoFilterButtonActive = styled.div`
  padding: 8px 16px;
  color: white;
  cursor: pointer;
  background: white;
  color: black;
`;

const ClearButton = styled.button`
  color: white;
  background: rgba(0.3, 0.3, 0.3, 0.6);
  margin: 0 0 10px 10px;
`;

export default function TodoFilter({changeFilter, clearTodos, filter}) {
  return (
    <TodoFilterContainer>
      <TodoFilterButtons>
        {filter === 'all' ? <TodoFilterButtonActive>All</TodoFilterButtonActive> : <TodoFilterButton onClick={() => changeFilter('all')}>All</TodoFilterButton>}
        {filter === 'task' ? <TodoFilterButtonActive>Task</TodoFilterButtonActive> : <TodoFilterButton onClick={() => changeFilter('task')}>Task</TodoFilterButton>}
        {filter === 'completed' ? <TodoFilterButtonActive>Completed</TodoFilterButtonActive> : <TodoFilterButton onClick={() => changeFilter('completed')}>Completed</TodoFilterButton>}
      </TodoFilterButtons>
      <ClearButton onClick={() => clearTodos()}>clear all</ClearButton>
    </TodoFilterContainer>
  )
}
