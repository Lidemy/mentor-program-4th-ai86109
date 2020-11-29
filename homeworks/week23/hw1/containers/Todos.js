/* eslint-disable */
import { connect } from 'react-redux'
import { completedTodo, deleteTodo, updateTodo } from '../redux/actions'
import Todos from '../components/Todos'

const mapStateToProps = (store) => {
  return {
    todos: store.todoState.todos,
    filter: store.filterState.filter,
  }
}

const mapDispatchToProps =  {
  completedTodo,
  updateTodo,
  deleteTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)