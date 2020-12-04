/* eslint-disable */
import { connect } from 'react-redux'
import { changeFilter, clearTodos } from '../redux/actions'
import TodoFilter from '../components/TodoFilter'

const mapStateToProps = (store) => {
  return {
    filter: store.filterState.filter
  }
}

const mapDispatchToProps =  {
  changeFilter,
  clearTodos,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilter)