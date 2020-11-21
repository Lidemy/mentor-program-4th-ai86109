/*eslint-disable*/
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import AddTodoForm from './AddTodoForm';
import TodoFilter from './TodoFilter'
import Todo from './Todo'

const FormBox = styled.div`
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

const Todos = styled.div``;

function App() {
  const id = useRef(1);
  const [value, setValue] = useState();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleInputChange = (e) => {
    setValue(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setTodos([
      ...todos,
      {
        id: id.current,
        content: value,
        completed: false,
      }
    ])
    setValue('')
    id.current++
  }

  const handleTodoDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleClearAllButton = () => {
    setTodos([])
  }

  const handleCheckboxButton = (id) => {
    setTodos(todos.map((todo) => {
      if(todo.id !== id) {
        return todo
      }
      return {
        ...todo,
        completed: !todo.completed,
      }
    }))
  }

  return (
    <FormBox>
      <Title>Todolist</Title>
      <AddTodoForm
        value={value}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}   
      />
      <TodoFilter 
        filter={filter}
        setFilter={setFilter}
        handleClearallButton={handleClearAllButton}
      />
      <Todos>
        {todos && todos.filter((todo) => {
          if(filter === 'task') {
            return todo.completed === false
          } else if(filter === 'completed') {
            return todo.completed === true
          } else {
            return todo
          }
        }).map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleTodoDelete={handleTodoDelete}
            handleCheckboxButton={handleCheckboxButton}
          />
        ))}
      </Todos>
    </FormBox>
  );
}

export default App;
