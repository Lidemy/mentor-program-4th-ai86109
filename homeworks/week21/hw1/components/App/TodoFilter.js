/*eslint-disable*/
import React from 'react';
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

export default function TodoFilter({filter, setFilter, setTodos}) {
  const handleClearAllButton = () => {
    setTodos([])
  }

  return (
    <TodoFilterContainer>
      <TodoFilterButtons>
        {filter === 'all' ? <TodoFilterButtonActive>All</TodoFilterButtonActive> : <TodoFilterButton onClick={() => setFilter('all')}>All</TodoFilterButton>}
        {filter === 'task' ? <TodoFilterButtonActive>Task</TodoFilterButtonActive> : <TodoFilterButton onClick={() => setFilter('task')}>Task</TodoFilterButton>}
        {filter === 'completed' ? <TodoFilterButtonActive>Completed</TodoFilterButtonActive> : <TodoFilterButton onClick={() => setFilter('completed')}>Completed</TodoFilterButton>}
      </TodoFilterButtons>
      <ClearButton onClick={handleClearAllButton}>clear all</ClearButton>
    </TodoFilterContainer>
  )
}