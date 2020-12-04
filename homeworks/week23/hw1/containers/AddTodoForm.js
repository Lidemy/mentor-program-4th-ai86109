/* eslint-disable */
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions'
import AddTodoForm from '../components/AddTodoForm'

const mapStateToProps = (store) => {
  return {
    todos: store.todoState.todos
  }
}

const mapDispatchToProps =  {
  addTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm)