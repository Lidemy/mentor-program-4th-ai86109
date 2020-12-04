/* eslint-disable */
import React from 'react'
import styled from 'styled-components'
import AddTodoForm from './containers/AddTodoForm'
import TodoFilter from './containers/TodoFilter'
import Todos from './containers/Todos'

const TodoBox = styled.div`
  max-width: 700px;
  margin: 20px auto;
  border-radius: 4px;
  position: relative;
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0 25px 0;
`;

function App() {
  return (
    <TodoBox>
      <Title>Todolist</Title>
      <AddTodoForm />
      <TodoFilter />
      <Todos />
    </TodoBox>
  );
}

export default App;
